const cards = [
  { title: "DPP", desc: "Digital Product Passport", href: "https://dpp.onatltd.com", color: "#005530" },
  { title: "HSP", desc: "Health Sustainability Passport", href: "https://hsp.onatltd.com", color: "#02154e" },
  { title: "TexYard", desc: "Sourcing & Suppliers", href: "https://texyard.onatltd.com", color: "#D51635" },
  { title: "Agents", desc: "n8n & LLM Orchestration", href: "https://agents.onatltd.com", color: "#f9ba00", dark: true },
  { title: "API Health", desc: "Status endpoint", href: "https://api.onatltd.com/health", color: "#0f172a" },
  { title: "Home", desc: "← Back to landing", href: "/", color: "#0f172a" },
];

export default function Dashboard() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'40px',fontFamily:'ui-sans-serif,system-ui'}}>
      <div style={{width:'min(1100px,100%)'}}>
        <h1 style={{marginTop:0,fontSize:36}}>Dashboard</h1>
        <div style={{display:'grid',gap:16,gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))'}}>
          {cards.map((c)=>(
            <a key={c.title} href={c.href}
               style={{textDecoration:'none',padding:20,borderRadius:16,border:'1px solid #1f2937',
                       background:c.color,color:c.dark?'#111':'#fff',boxShadow:'0 8px 24px rgba(0,0,0,.2)'}}>
              <h3 style={{margin:'0 0 6px 0'}}>{c.title}</h3>
              <p style={{margin:0,opacity:.9}}>{c.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
