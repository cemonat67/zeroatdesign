/**
 * Zero@Design — Master CSV Integration
 * Reads:
 *  - /static/data/Urun_Kumas_CO2_Listesi.csv  (fabric_type, co2_kg_per_kg, ...)
 *  - /static/data/models.csv                  (optional)
 *  - /static/data/Master_Konfeksiyon_summary.csv (category,name,unit,avg_co2_kg,...)
 *
 * Expects on page (if available):
 *  - LIB (object)                : fiber emission library (kgCO2e/kg)
 *  - refreshFiberList()          : rebuild fiber datalist from LIB keys
 *  - addFiberRow(row)            : add a fiber row {fiber,pct,ef,weight,note}
 *  - addProcRow(row)             : add a process row {name,type,factor,unit,note}
 *  - calcAll()                   : recalc KPIs
 *
 * Safe to include multiple times; functions check existence.
 */

(function(){
  // ---------- Helpers ----------
  async function loadCSV(url){
    try{
      const res = await fetch(url, {cache:"no-store"});
      if(!res.ok) throw new Error("HTTP "+res.status);
      const text = await res.text();
      const lines = text.split(/\r?\n/).filter(Boolean);
      if(!lines.length) return [];
      const head = lines.shift().split(",").map(h=>h.trim().replace(/^"|"$/g,""));
      return lines.map(line=>{
        const cols = line.split(",").map(v=>v.trim().replace(/^"|"$/g,""));
        const o = {}; cols.forEach((v,i)=>o[head[i]] = v); return o;
      });
    }catch(e){
      console.warn("[Zero@Design] CSV load failed:", url, e.message);
      return [];
    }
  }
  function clampFactor(x){
    const v = parseFloat(x);
    if(isNaN(v) || v < 0) return 0;
    return v;
  }
  function safe(fn){ try{ fn && fn(); }catch(e){ console.warn("[Zero@Design] fn error:", e.message); } }

  // ---------- State ----------
  window.ZD = window.ZD || {};
  ZD.PROC_DICT = ZD.PROC_DICT || [];

  // ---------- Populate Fabrics & LIB ----------
  async function populateFabrics(){
    const fabrics = await loadCSV("/static/data/Urun_Kumas_CO2_Listesi.csv");
    const fabricList = document.getElementById("fabricList");
    const set = new Set();
    fabrics.forEach(r=>{
      const name = r.fabric_type || r.Fabric || r["Kumaş"] || r.Kumas;
      const co2  = parseFloat(r.co2_kg_per_kg || r["kgCO2e/kg"] || r.CO2 || r["CO₂"]);
      if(name){
        set.add(name);
        if(window.LIB && !isNaN(co2) && co2 > 0){ window.LIB[name] = co2; }
      }
    });
    if(fabricList){
      fabricList.innerHTML = [...set].sort().map(x=>`<option value="${x}"></option>`).join("");
    }
    if(typeof window.refreshFiberList === "function") window.refreshFiberList();
  }

  // ---------- Populate Models (optional) ----------
  async function populateModels(){
    const models = await loadCSV("/static/data/models.csv");
    if(!models.length) return;
    const modelList = document.getElementById("modelList");
    if(!modelList) return;
    const set = new Set();
    models.forEach(m=>{
      const name = m.model || m.name || m.Style || m.Model;
      if(name) set.add(name);
    });
    modelList.innerHTML = [...set].sort().map(x=>`<option value="${x}"></option>`).join("");
  }

  // ---------- Populate Process/Accessory Dictionary ----------
  async function populateProcDict(){
    const master = await loadCSV("/static/data/Master_Konfeksiyon_summary.csv");
    ZD.PROC_DICT = master.map(r=>{
      const cat  = r.category || "";
      const name = r.name || r.type || "";
      const unit = (r.unit || "").toLowerCase();  // e.g., kgCO2e_per_unit / kgCO2e_per_kg
      const avg  = clampFactor(r.avg_co2_kg || r.avg || r.value);
      return {cat, name, unit, avg};
    }).filter(x=>x.name);

    // Build datalist
    const dl = document.getElementById("procDict");
    if(dl){
      dl.innerHTML = ZD.PROC_DICT
        .map(p=>`<option value="${p.cat ? (p.cat + " — ") : ""}${p.name}${p.unit ? (" ("+p.unit+")") : ""}"></option>`)
        .join("");
    }
  }

  // ---------- Smart Fill for Process Rows ----------
  function wireProcSmartFill(tr){
    if(!tr) return;
    const pname = tr.querySelector(".pname");
    const ptype = tr.querySelector(".ptype");
    const pfac  = tr.querySelector(".pfactor");
    const punit = tr.querySelector(".punit");
    if(!pname) return;
    pname.setAttribute("list","procDict");
    pname.addEventListener("change", ()=>{
      const val = pname.value || "";
      const found = (window.ZD && Array.isArray(ZD.PROC_DICT)) ? ZD.PROC_DICT.find(p => val.includes(p.name)) : null;
      if(found){
        const unit = (found.unit || "").toLowerCase();
        if(punit){ punit.value = unit.includes("per_kg") ? "kgCO2e/kg" : "kgCO2e/adet"; }
        if(ptype){
          if(unit.includes("per_kg")) ptype.value = "process";
          else ptype.value = "accessory"; // per_unit → accessory-like
        }
        if(pfac){ pfac.value = (found.avg && found.avg > 0) ? found.avg : (ptype && ptype.value === "process" ? 0.1 : 0.05); }
      }
      if(typeof window.calcAll === "function") window.calcAll();
    });
  }

  // Patch addProcRow to auto-wire
  if(typeof window.addProcRow === "function"){
    const original = window.addProcRow;
    window.addProcRow = function(data){
      original(data);
      const last = document.querySelector("#procTable tbody tr:last-child");
      wireProcSmartFill(last);
    };
  } else {
    // Fallback: bind when rows appear later (MutationObserver)
    const tbody = document.querySelector("#procTable tbody");
    if(tbody && "MutationObserver" in window){
      const mo = new MutationObserver(muts=>{
        muts.forEach(m=>{
          m.addedNodes && [...m.addedNodes].forEach(n=>{
            if(n.nodeType===1) wireProcSmartFill(n);
          });
        });
      });
      mo.observe(tbody, {childList:true});
    }
  }

  // ---------- Fabric-driven fiber seeding (optional heuristic) ----------
  function seedFiber(rows){
    const tbody = document.querySelector("#fiberTable tbody");
    if(!tbody || typeof window.addFiberRow !== "function") return;
    tbody.innerHTML = "";
    rows.forEach(r=> window.addFiberRow(r));
    if(typeof window.calcAll === "function") window.calcAll();
  }
  document.addEventListener("DOMContentLoaded", ()=>{
    const fabricInput = document.getElementById("fabricType");
    if(fabricInput){
      fabricInput.addEventListener("change", ()=>{
        const v = (fabricInput.value || "").toLowerCase();
        const C = (window.LIB && window.LIB["Cotton"]) || 2.7;
        const E = (window.LIB && window.LIB["Elastane"]) || 9.0;
        if(v.includes("jersey")){
          seedFiber([{fiber:"Cotton", pct:95, ef:C, weight:160},
                     {fiber:"Elastane", pct:5,  ef:E, weight:8}]);
        } else if(v.includes("denim")){
          seedFiber([{fiber:"Cotton", pct:98, ef:C, weight:520},
                     {fiber:"Elastane", pct:2,  ef:E, weight:10}]);
        }
      });
    }
  });

  // ---------- Bootstrap ----------
  document.addEventListener("DOMContentLoaded", async ()=>{
    await Promise.all([populateFabrics(), populateModels(), populateProcDict()]);
    console.log("[Zero@Design] Master CSV integration ready.");
  });
})();