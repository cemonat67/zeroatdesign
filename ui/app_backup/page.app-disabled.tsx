'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [health, setHealth] = useState<'loading'|'ok'|'error'>('loading');
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/health`;
    fetch(url, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { setHealth('ok'); setDetail(d); })
      .catch(() => setHealth('error'));
  }, []);

  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'48px',fontFamily:'ui-sans-serif,system-ui'}}>
      <div style={{maxWidth:880,width:'100%',background:'#0b1220',color:'#fff',padding:32,borderRadius:20,boxShadow:'0 10px 30px rgba(0,0,0,.25)'}}>
        <h1 style={{fontSize:36,margin:0}}>Zero@Design — UI</h1>
        <p style={{opacity:.85,marginTop:8}}>Production build served from <code>app.onatltd.com</code></p>

        <section style={{marginTop:24,display:'grid',gap:12}}>
          <a href="/dashboard/" style={{display:'inline-block',padding:'12px 16px',borderRadius:12,background:'#f9ba00',color:'#111',fontWeight:700,textDecoration:'none'}}>Open Dashboard →</a>
          <div style={{marginTop:8,background:'#0f172a',border:'1px solid #1f2937',borderRadius:12,padding:16}}>
            <div style={{fontWeight:700,marginBottom:8}}>API Health ({process.env.NEXT_PUBLIC_API_URL}/health)</div>
            <div>Status: {health === 'loading' ? 'Loading…' : health === 'ok' ? 'OK' : 'ERROR'}</div>
            {detail && <pre style={{marginTop:12,whiteSpace:'pre-wrap',wordBreak:'break-word',background:'#0b1220',padding:12,borderRadius:8}}>
{JSON.stringify(detail, null, 2)}
            </pre>}
          </div>
        </section>
      </div>
    </main>
  );
}
