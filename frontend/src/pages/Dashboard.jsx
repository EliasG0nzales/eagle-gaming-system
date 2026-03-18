import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const COLORS = ["#6c63ff","#34d399","#fbbf24","#f472b6","#22d3ee","#fb923c","#a78bfa","#4ade80","#38bdf8","#e879f9","#f87171","#60a5fa"];
const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Mono:wght@300;400;500&display=swap");
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; font-family: "DM Mono", monospace; }
  .dash-root { display: flex; min-height: 100vh; background: #0a0a0f; }
  .sidebar { width: 220px; min-height: 100vh; background: #13131a; border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; padding: 24px 0; position: fixed; top: 0; left: 0; z-index: 100; }
  .sidebar-brand { display: flex; align-items: center; gap: 10px; padding: 0 20px 28px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 16px; }
  .sidebar-brand__icon { font-size: 20px; color: #a78bfa; }
  .sidebar-brand__name { font-family: "Syne", sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #e8e8f0; }
  .sidebar-nav { display: flex; flex-direction: column; gap: 4px; padding: 0 12px; flex: 1; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: #6b6b80; transition: all .2s; border: none; background: none; width: 100%; text-align: left; }
  .nav-item:hover { background: rgba(255,255,255,0.04); color: #e8e8f0; }
  .nav-item.active { background: rgba(108,99,255,0.15); color: #a78bfa; }
  .nav-item__icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-footer { padding: 16px 12px 0; border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto; }
  .logout-btn { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: #ff5e6c; background: none; border: none; width: 100%; transition: background .2s; }
  .logout-btn:hover { background: rgba(255,94,108,0.08); }
  .dash-main { margin-left: 220px; flex: 1; padding: 32px; }
  .dash-header { margin-bottom: 28px; }
  .dash-header h1 { font-family: "Syne", sans-serif; font-size: 22px; font-weight: 700; color: #e8e8f0; }
  .dash-header p { font-size: 12px; color: #6b6b80; margin-top: 4px; }
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 14px; margin-bottom: 28px; }
  .stat-card { background: #13131a; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px 20px; border-left: 3px solid; }
  .stat-card__label { font-size: 11px; color: #6b6b80; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; }
  .stat-card__value { font-family: "Syne", sans-serif; font-size: 28px; font-weight: 700; color: #e8e8f0; }
  .stat-card__sub { font-size: 11px; color: #6b6b80; margin-top: 4px; }
  .table-section { background: #13131a; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
  .table-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .table-header h2 { font-family: "Syne", sans-serif; font-size: 15px; font-weight: 600; color: #e8e8f0; }
  .table-actions { display: flex; gap: 8px; }
  .btn { padding: 7px 14px; border-radius: 7px; font-size: 12px; cursor: pointer; border: none; font-family: "DM Mono", monospace; transition: all .2s; }
  .btn-primary { background: #6c63ff; color: #fff; }
  .btn-primary:hover { background: #7c74ff; }
  .btn-outline { background: transparent; color: #6b6b80; border: 1px solid rgba(255,255,255,0.1); }
  .btn-outline:hover { color: #e8e8f0; border-color: rgba(255,255,255,0.2); }
  .btn-outline:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-print { background: transparent; color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
  .btn-print:hover { background: rgba(52,211,153,0.08); }
  .btn-danger { background: transparent; color: #ff5e6c; border: 1px solid rgba(255,94,108,0.2); padding: 3px 8px; font-size: 11px; }
  .btn-danger:hover { background: rgba(255,94,108,0.08); }
  .search-bar { display: flex; gap: 10px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); }
  .search-input { flex: 1; background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono",monospace; font-size: 13px; padding: 9px 14px; outline: none; }
  .search-input:focus { border-color: #6c63ff; }
  .search-input::placeholder { color: rgba(255,255,255,0.2); }
  .filter-select { background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono",monospace; font-size: 13px; padding: 9px 14px; outline: none; min-width: 180px; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead th { padding: 10px 16px; text-align: left; font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #6b6b80; border-bottom: 1px solid rgba(255,255,255,0.06); }
  tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); transition: background .15s; }
  tbody tr:hover { background: rgba(255,255,255,0.02); }
  tbody td { padding: 11px 16px; color: #c8c8d8; }
  tbody td input { background: transparent; border: 1px solid transparent; border-radius: 4px; color: #e8e8f0; font-family: "DM Mono", monospace; font-size: 13px; padding: 3px 6px; width: 100%; transition: border-color .2s; }
  tbody td input:focus { outline: none; border-color: #6c63ff; background: rgba(108,99,255,0.08); }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; }
  .badge-gpu { background: rgba(108,99,255,0.15); color: #a78bfa; }
  .badge-monitor { background: rgba(52,211,153,0.12); color: #34d399; }
  .badge-cpu { background: rgba(251,191,36,0.12); color: #fbbf24; }
  .badge-ram { background: rgba(236,72,153,0.12); color: #f472b6; }
  .badge-other { background: rgba(107,107,128,0.15); color: #9ca3af; }
  .prov-form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .prov-input { background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono", monospace; font-size: 13px; padding: 10px 14px; outline: none; }
  .prov-input:focus { border-color: #6c63ff; }
  .prov-input::placeholder { color: rgba(255,255,255,0.2); }
  .mov-form { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .mov-select { background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono", monospace; font-size: 13px; padding: 10px 14px; outline: none; }
  .chart-card { background: #13131a; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; }
  .chart-card h3 { font-family: "Syne",sans-serif; font-size: 14px; font-weight: 600; color: #e8e8f0; margin-bottom: 4px; }
  .chart-card p { font-size: 11px; color: #6b6b80; margin-bottom: 14px; }
  .toast { position: fixed; top: 24px; right: 24px; z-index: 999; background: #13131a; border: 1px solid rgba(52,211,153,0.3); border-radius: 10px; padding: 14px 18px; font-size: 13px; color: #34d399; box-shadow: 0 8px 32px rgba(0,0,0,0.4); animation: toastIn .3s ease; max-width: 320px; line-height: 1.6; }
  .toast.error { border-color: rgba(255,94,108,0.3); color: #ff5e6c; }
  @keyframes toastIn { from { opacity:0; transform: translateY(-12px); } to { opacity:1; transform: none; } }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 300; display: flex; align-items: center; justify-content: center; animation: fadeIn .2s ease; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .modal { background: #13131a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; width: 100%; max-width: 500px; box-shadow: 0 32px 80px rgba(0,0,0,0.6); animation: slideUp .25s cubic-bezier(.16,1,.3,1); }
  @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: none; } }
  .modal h2 { font-family: "Syne",sans-serif; font-size: 18px; font-weight: 700; color: #e8e8f0; margin-bottom: 6px; }
  .modal-subtitle { font-size: 12px; color: #6b6b80; margin-bottom: 24px; }
  .modal-form { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .modal-field { display: flex; flex-direction: column; gap: 6px; }
  .modal-field label { font-size: 11px; color: #6b6b80; letter-spacing: .06em; text-transform: uppercase; }
  .modal-input { background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono",monospace; font-size: 13px; padding: 10px 14px; outline: none; }
  .modal-input:focus { border-color: #6c63ff; box-shadow: 0 0 0 3px rgba(108,99,255,0.15); }
  .modal-input::placeholder { color: rgba(255,255,255,0.2); }
  .modal-select { background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono",monospace; font-size: 13px; padding: 10px 14px; outline: none; width: 100%; }
  .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
  .chatbot { position: fixed; bottom: 24px; right: 24px; z-index: 200; }
  .chat-toggle { width: 52px; height: 52px; border-radius: 50%; background: #6c63ff; border: none; cursor: pointer; font-size: 22px; box-shadow: 0 4px 24px rgba(108,99,255,0.4); transition: transform .2s; display: flex; align-items: center; justify-content: center; }
  .chat-toggle:hover { transform: scale(1.08); }
  .chat-window { position: absolute; bottom: 64px; right: 0; width: 320px; background: #13131a; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); animation: chatIn .25s cubic-bezier(.16,1,.3,1); }
  @keyframes chatIn { from { opacity:0; transform: translateY(12px) scale(.97); } to { opacity:1; transform: none; } }
  .chat-head { padding: 14px 16px; background: #1c1c26; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px; }
  .chat-head span { font-family: "Syne", sans-serif; font-size: 14px; font-weight: 600; color: #e8e8f0; }
  .chat-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; }
  .chat-messages { height: 240px; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
  .chat-msg { max-width: 85%; padding: 8px 12px; border-radius: 10px; font-size: 12px; line-height: 1.5; }
  .chat-msg.bot { background: #1c1c26; color: #c8c8d8; align-self: flex-start; border-bottom-left-radius: 3px; }
  .chat-msg.user { background: #6c63ff; color: #fff; align-self: flex-end; border-bottom-right-radius: 3px; }
  .chat-input-row { display: flex; gap: 8px; padding: 12px; border-top: 1px solid rgba(255,255,255,0.06); }
  .chat-input { flex: 1; background: #1c1c26; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #e8e8f0; font-family: "DM Mono", monospace; font-size: 12px; padding: 8px 12px; outline: none; }
  .chat-input:focus { border-color: #6c63ff; }
  .chat-send { background: #6c63ff; border: none; border-radius: 8px; color: #fff; cursor: pointer; padding: 8px 12px; font-size: 14px; transition: background .2s; }
  .chat-send:hover { background: #7c74ff; }
  @media print {
    .sidebar, .chatbot, .table-actions, .toast, .search-bar { display: none !important; }
    .dash-main { margin-left: 0; padding: 16px; }
    body { background: #fff; color: #000; }
    table { color: #000; }
    thead th, tbody td { color: #000; border-color: #ccc; }
  }
`;

const inventarioInicial = [
  { id:1,  categoria:"Tarjeta de Video", marca:"ASUS",     modelo:"Radeon RX 9070 XT OC",  precio:3299, stock:5  },
  { id:2,  categoria:"Tarjeta de Video", marca:"GIGABYTE", modelo:"RTX 5070 WINDFORCE OC", precio:2920, stock:3  },
  { id:3,  categoria:"Procesadores",     marca:"AMD",      modelo:"Ryzen 5 5600GT",         precio:569,  stock:8  },
  { id:4,  categoria:"Procesadores",     marca:"Intel",    modelo:"Core i5-12400F",         precio:890,  stock:6  },
  { id:5,  categoria:"Monitores",        marca:"ASUS",     modelo:"XG27AQDMG",              precio:2899, stock:2  },
  { id:6,  categoria:"Monitores",        marca:"MSI",      modelo:"MAG 276CXF",             precio:539,  stock:7  },
  { id:7,  categoria:"RAM",              marca:"CORSAIR",  modelo:"Vengeance DDR4 16GB",    precio:1000, stock:12 },
  { id:8,  categoria:"Disco SSD",        marca:"KINGSTON", modelo:"NV3 1TB",                precio:495,  stock:9  },
  { id:9,  categoria:"Placa Madre",      marca:"GIGABYTE", modelo:"Z790 Gaming X AX",       precio:1080, stock:4  },
  { id:10, categoria:"Case",             marca:"ANTRYX",   modelo:"FX 650 ARGB",            precio:280,  stock:6  },
];

const badgeClass = (cat) => {
  if (!cat) return "badge badge-other";
  if (cat.includes("Video"))    return "badge badge-gpu";
  if (cat.includes("Monitor"))  return "badge badge-monitor";
  if (cat.includes("Procesad")) return "badge badge-cpu";
  if (cat.includes("RAM"))      return "badge badge-ram";
  return "badge badge-other";
};

const gridOpts = {
  x:{ ticks:{color:"#6b6b80",font:{size:10}}, grid:{color:"rgba(255,255,255,0.04)"} },
  y:{ ticks:{color:"#6b6b80"}, grid:{color:"rgba(255,255,255,0.04)"} }
};

function Graficos({ datos }) {
  const chartsRef = useRef({});
  const mk = (id, config) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (chartsRef.current[id]) chartsRef.current[id].destroy();
    chartsRef.current[id] = new Chart(el, config);
  };
  useEffect(() => {
    if (!datos.length) return;
    const cats    = [...new Set(datos.map(d => d.categoria))];
    const counts  = cats.map(c => datos.filter(d=>d.categoria===c).length);
    const stocks  = cats.map(c => datos.filter(d=>d.categoria===c).reduce((a,b)=>a+(b.stock||0),0));
    const valores = cats.map(c => datos.filter(d=>d.categoria===c).reduce((a,b)=>a+(b.precio||0)*(b.stock||0),0));
    const precios = cats.map(c => Math.max(...datos.filter(d=>d.categoria===c).map(d=>d.precio||0)));
    const precMin = cats.map(c => Math.min(...datos.filter(d=>d.categoria===c).map(d=>d.precio||0)));
    const maxS = Math.max(...stocks)||1, maxP = Math.max(...precios)||1;
    const avg  = cats.map(c=>{ const p=datos.filter(d=>d.categoria===c); return Math.round(p.reduce((a,b)=>a+(b.precio||0),0)/p.length); });
    let ac=0; const acum = valores.map(v=>{ac+=v;return ac;});
    const top5 = [...datos].sort((a,b)=>((b.precio||0)*(b.stock||0))-((a.precio||0)*(a.stock||0))).slice(0,5);
    mk("g1",{ type:"bar", data:{ labels:cats, datasets:[{ data:counts, backgroundColor:COLORS, borderRadius:8 }] }, options:{ plugins:{legend:{display:false}}, scales:gridOpts } });
    mk("g2",{ type:"doughnut", data:{ labels:cats, datasets:[{ data:stocks, backgroundColor:COLORS, borderWidth:0, hoverOffset:8 }] }, options:{ plugins:{ legend:{ position:"right", labels:{color:"#9ca3af",font:{size:10},padding:8} } }, cutout:"65%" } });
    mk("g6",{ type:"pie", data:{ labels:cats, datasets:[{ data:counts, backgroundColor:COLORS, borderWidth:0 }] }, options:{ plugins:{ legend:{ position:"bottom", labels:{color:"#9ca3af",font:{size:9},padding:8} } } } });
    mk("g3",{ type:"bar", data:{ labels:cats, datasets:[{ data:valores, backgroundColor:COLORS, borderRadius:6 }] }, options:{ indexAxis:"y", plugins:{legend:{display:false}}, scales:gridOpts } });
    mk("g4",{ type:"line", data:{ labels:cats, datasets:[{ label:"Precio máx", data:precios, borderColor:"#6c63ff", backgroundColor:"rgba(108,99,255,0.1)", fill:true, tension:0.4, pointBackgroundColor:"#6c63ff", pointRadius:5 }] }, options:{ plugins:{legend:{display:false}}, scales:gridOpts } });
    mk("g9",{ type:"bar", data:{ labels:cats, datasets:[{ data:avg, backgroundColor:COLORS.map(c=>c+"99"), borderColor:COLORS, borderWidth:2, borderRadius:8 }] }, options:{ plugins:{legend:{display:false}}, scales:gridOpts } });
    mk("g16",{ type:"line", data:{ labels:cats, datasets:[ { label:"Mín", data:precMin, borderColor:"#34d399", fill:false, tension:0.4, pointRadius:4 }, { label:"Máx", data:precios, borderColor:"#f472b6", fill:false, tension:0.4, pointRadius:4 } ] }, options:{ plugins:{legend:{labels:{color:"#9ca3af",font:{size:10}}}}, scales:gridOpts } });
    mk("g5",{ type:"radar", data:{ labels:cats, datasets:[ { label:"Stock %", data:stocks.map(s=>Math.round(s/maxS*100)), borderColor:"#34d399", backgroundColor:"rgba(52,211,153,0.15)", pointBackgroundColor:"#34d399" }, { label:"Precio %", data:precios.map(p=>Math.round(p/maxP*100)), borderColor:"#f472b6", backgroundColor:"rgba(244,114,182,0.15)", pointBackgroundColor:"#f472b6" } ] }, options:{ plugins:{legend:{labels:{color:"#9ca3af",font:{size:10}}}}, scales:{ r:{ ticks:{color:"#6b6b80",backdropColor:"transparent"}, grid:{color:"rgba(255,255,255,0.08)"}, pointLabels:{color:"#9ca3af",font:{size:9}} } } } });
    mk("g7",{ type:"bar", data:{ labels:cats, datasets:[ { label:"Precio mín", data:precMin, backgroundColor:"rgba(52,211,153,0.7)", borderRadius:4 }, { label:"Diferencia", data:precios.map((p,i)=>p-precMin[i]), backgroundColor:"rgba(108,99,255,0.7)", borderRadius:4 } ] }, options:{ plugins:{legend:{labels:{color:"#9ca3af",font:{size:10}}}}, scales:{x:{...gridOpts.x,stacked:true},y:{...gridOpts.y,stacked:true}} } });
    mk("g11",{ type:"bar", data:{ labels:cats, datasets:[ { label:"Stock actual", data:stocks, backgroundColor:"rgba(108,99,255,0.8)", borderRadius:6 }, { label:"Mínimo (5)", data:stocks.map(()=>5), backgroundColor:"rgba(255,94,108,0.5)", borderRadius:6 } ] }, options:{ plugins:{legend:{labels:{color:"#9ca3af",font:{size:10}}}}, scales:gridOpts } });
    mk("g13",{ type:"polarArea", data:{ labels:cats, datasets:[{ data:stocks, backgroundColor:COLORS.map(c=>c+"bb"), borderWidth:0 }] }, options:{ plugins:{ legend:{ position:"right", labels:{color:"#9ca3af",font:{size:10},padding:8} } }, scales:{ r:{ ticks:{color:"#6b6b80",backdropColor:"transparent"}, grid:{color:"rgba(255,255,255,0.08)"} } } } });
    mk("g8",{ type:"line", data:{ labels:cats, datasets:[ { label:"Stock", data:stocks, borderColor:"#fbbf24", backgroundColor:"rgba(251,191,36,0.1)", fill:true, tension:0.4, yAxisID:"y" }, { label:"Valor÷1000", data:valores.map(v=>Math.round(v/1000)), borderColor:"#22d3ee", backgroundColor:"rgba(34,211,238,0.1)", fill:true, tension:0.4, yAxisID:"y1" } ] }, options:{ plugins:{legend:{labels:{color:"#9ca3af",font:{size:10}}}}, scales:{ y:{ type:"linear", position:"left", ticks:{color:"#6b6b80"}, grid:{color:"rgba(255,255,255,0.04)"} }, y1:{ type:"linear", position:"right", ticks:{color:"#6b6b80"}, grid:{drawOnChartArea:false} }, x:{ ticks:{color:"#6b6b80",font:{size:10}}, grid:{color:"rgba(255,255,255,0.04)"} } } } });
    mk("g10",{ type:"doughnut", data:{ labels:cats, datasets:[{ data:valores, backgroundColor:COLORS, borderWidth:0, hoverOffset:10 }] }, options:{ plugins:{ legend:{ position:"right", labels:{color:"#9ca3af",font:{size:10},padding:8} } }, cutout:"60%" } });
    mk("g12",{ type:"line", data:{ labels:cats, datasets:[{ label:"Acumulado", data:acum, borderColor:"#a78bfa", backgroundColor:"rgba(167,139,250,0.15)", fill:true, tension:0.4, pointBackgroundColor:"#a78bfa", pointRadius:5 }] }, options:{ plugins:{legend:{display:false}}, scales:gridOpts } });
    mk("g14",{ type:"bubble", data:{ datasets:datos.slice(0,12).map((d,i)=>({ label:d.modelo, data:[{ x:d.precio||0, y:d.stock||0, r:Math.max(4,Math.round(((d.precio||0)*(d.stock||0))/5000)) }], backgroundColor:COLORS[i%COLORS.length]+"aa", borderColor:COLORS[i%COLORS.length] })) }, options:{ plugins:{legend:{display:false}}, scales:{ x:{ticks:{color:"#6b6b80"},grid:{color:"rgba(255,255,255,0.04)"},title:{display:true,text:"Precio S/",color:"#6b6b80"}}, y:{ticks:{color:"#6b6b80"},grid:{color:"rgba(255,255,255,0.04)"},title:{display:true,text:"Stock",color:"#6b6b80"}} } } });
    mk("g15",{ type:"bar", data:{ labels:top5.map(d=>(d.modelo||"").substring(0,12)+"..."), datasets:[{ data:top5.map(d=>(d.precio||0)*(d.stock||0)), backgroundColor:["#6c63ff","#34d399","#fbbf24","#f472b6","#22d3ee"], borderRadius:8 }] }, options:{ plugins:{legend:{display:false}}, scales:gridOpts } });
    return () => Object.values(chartsRef.current).forEach(c=>c.destroy());
  }, [datos]);
  const card = (id, title, sub, col="auto") => (
    <div key={id} className="chart-card" style={{gridColumn:col}}>
      <h3>{title}</h3><p>{sub}</p><canvas id={id}></canvas>
    </div>
  );
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px"}}>
      {card("g1","📊 Productos por categoría","Cantidad de SKUs")}
      {card("g2","🍩 Stock por categoría","Proporción de unidades")}
      {card("g6","🥧 Distribución categorías","Vista circular")}
      {card("g3","📈 Valor total horizontal","Total en soles S/","1/-1")}
      {card("g4","📉 Precio máximo","Tendencia precios altos")}
      {card("g9","💰 Precio promedio","Media por categoría")}
      {card("g16","📐 Rango de precios","Mínimo vs Máximo")}
      {card("g5","🕸 Radar Stock vs Precio","Comparativa normalizada","1/-1")}
      {card("g7","📦 Precios apilados","Base + diferencia")}
      {card("g11","⚠️ Stock vs mínimo","Alerta stock bajo")}
      {card("g13","🌐 Polar Stock","Vista polar")}
      {card("g8","📊 Stock y Valor doble eje","Stock izq · Valor der","1/-1")}
      {card("g10","💎 Valor doughnut","Capital en stock")}
      {card("g12","📈 Valor acumulado","Crecimiento acumulado")}
      {card("g14","🫧 Burbuja Precio vs Stock","Tamaño = valor total","1/-1")}
      {card("g15","🏆 Top 5 más valiosos","Mayor valor en stock","1/-1")}
    </div>
  );
}

export default function Dashboard() {
  const { token, user, logout } = useContext(AuthContext);
  const [seccion,       setSeccion]       = useState("inventario");
  const [datos,         setDatos]         = useState(inventarioInicial);
  const [chat,          setChat]          = useState(false);
  const [msgs,          setMsgs]          = useState([{ from:"bot", text:"¡Hola! Soy el asistente Eagle Gaming 🎮" }]);
  const [input,         setInput]         = useState("");
  const [importando,    setImportando]    = useState(false);
  const [toast,         setToast]         = useState(null);
  const [busqueda,      setBusqueda]      = useState("");
  const [filtrocat,     setFiltrocat]     = useState("Todas");
  const [modalAgregar,  setModalAgregar]  = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ categoria:"", marca:"", modelo:"", precio:"", stock:"" });
  const [proveedores,   setProveedores]   = useState([
    { id:1, nombre:"TecnoDistrib SAC", producto:"GPUs",         precio:"2500-3000", entrega:"3-5 días", contacto:"ventas@tecnodistrib.com" },
    { id:2, nombre:"PC Masters Perú",  producto:"Procesadores", precio:"500-1200",  entrega:"1-2 días", contacto:"pedidos@pcmasters.pe"    },
  ]);
  const [nuevoProv,     setNuevoProv]     = useState({ nombre:"", producto:"", precio:"", entrega:"", contacto:"" });
  const [movimientos,   setMovimientos]   = useState([
    { id:1, fecha:"2026-03-10", producto:"RTX 5070 WINDFORCE OC", tipo:"Entrada", cantidad:3, costo:2920, responsable:"Admin" },
    { id:2, fecha:"2026-03-12", producto:"Ryzen 5 5600GT",        tipo:"Salida",  cantidad:2, costo:569,  responsable:"Admin" },
  ]);
  const [nuevoMov, setNuevoMov] = useState({ fecha:"", producto:"", tipo:"Entrada", cantidad:"", costo:"", responsable:"" });

  useEffect(() => {
    const cargar = async () => {
      try {
        const res  = await fetch(`${API}/api/excel/productos`, { headers:{ Authorization:`Bearer ${token}` } });
        const data = await res.json();
        if (res.ok && data.productos?.length) {
          setDatos(data.productos.map((p,i) => ({
            id:        i+1,
            categoria: p.sheet_name || p.categoria || "—",
            marca:     String(p.categoria||"").split(" ")[0] || "—",
            modelo:    p.modelo || "—",
            precio:    Number(p.precio_venta) || 0,
            stock:     Number(p.cantidad) || 0,
          })));
        }
      } catch { console.log("Sin productos en BD"); }
    };
    cargar();
  }, [token]);

  const showToast = (msg, tipo="ok") => { setToast({msg,tipo}); setTimeout(()=>setToast(null),4000); };

  const handleImportarExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportando(true);
    try {
      const fd = new FormData();
      fd.append("excel", file);
      const res = await fetch(`${API}/api/excel/importar`, { method:"POST", headers:{Authorization:`Bearer ${token}`}, body:fd });
      const data = await res.json();
      if (res.ok) {
        showToast(`✅ ${data.total} productos importados`);
        const r2 = await fetch(`${API}/api/excel/productos`, { headers:{Authorization:`Bearer ${token}`} });
        const d2 = await r2.json();
        if (r2.ok && d2.productos?.length) {
          setDatos(d2.productos.map((p,i)=>({ id:i+1, categoria:p.sheet_name||p.categoria||"—", marca:String(p.categoria||"").split(" ")[0]||"—", modelo:p.modelo||"—", precio:Number(p.precio_venta)||0, stock:Number(p.cantidad)||0 })));
        }
      } else { showToast("❌ Error: "+data.message,"error"); }
    } catch { showToast("❌ Error al conectar","error"); }
    finally { setImportando(false); e.target.value=""; }
  };

  const handleEdit = (id,campo,valor) => setDatos(datos.map(d=>d.id===id?{...d,[campo]:valor}:d));
  const handlePrint = () => window.print();
  const eliminarProducto = async (id) => {
  try {
    const res = await fetch(`${API}/api/excel/eliminar/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      setDatos(datos.filter(d => d.id !== id));
      showToast("🗑 Producto eliminado");
    }
  } catch {
    showToast("❌ Error al eliminar", "error");
  }
};

  const agregarProducto = async () => {
  if (!nuevoProducto.categoria || !nuevoProducto.modelo) return;
  try {
    const res = await fetch(`${API}/api/excel/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(nuevoProducto)
    });
    const data = await res.json();
    if (res.ok) {
      const nuevo = {
        id:        data.id,
        categoria: nuevoProducto.categoria,
        marca:     nuevoProducto.marca || "—",
        modelo:    nuevoProducto.modelo,
        precio:    Number(nuevoProducto.precio) || 0,
        stock:     Number(nuevoProducto.stock)  || 0,
      };
      setDatos([...datos, nuevo]);
      setModalAgregar(false);
      setNuevoProducto({ categoria:"", marca:"", modelo:"", precio:"", stock:"" });
      showToast("✅ Producto guardado en la base de datos");
    } else {
      showToast("❌ Error: " + data.message, "error");
    }
  } catch {
    showToast("❌ Error al conectar con el servidor", "error");
  }
};

  const agregarProveedor = () => {
    if (!nuevoProv.nombre) return;
    setProveedores([...proveedores, {...nuevoProv, id:Date.now()}]);
    setNuevoProv({ nombre:"", producto:"", precio:"", entrega:"", contacto:"" });
    showToast("✅ Proveedor agregado");
  };

  const agregarMovimiento = () => {
    if (!nuevoMov.producto || !nuevoMov.cantidad) return;
    setMovimientos([...movimientos, {...nuevoMov, id:Date.now(), cantidad:Number(nuevoMov.cantidad), costo:Number(nuevoMov.costo)}]);
    setNuevoMov({ fecha:"", producto:"", tipo:"Entrada", cantidad:"", costo:"", responsable:"" });
    showToast("✅ Movimiento registrado");
  };

  const botRespuestas = {
    "hola":       "¡Hola! Soy el asistente de Eagle Gaming 🎮 ¿En qué te ayudo?",
    "inventario": `Tenemos ${datos.length} productos en ${[...new Set(datos.map(d=>d.categoria))].length} categorías.`,
    "precio":     `Precios desde S/ ${Math.min(...datos.map(d=>d.precio||0))} hasta S/ ${Math.max(...datos.map(d=>d.precio||0))}.`,
    "stock":      `Stock total: ${datos.reduce((a,b)=>a+(b.stock||0),0)} unidades. Valor: S/ ${datos.reduce((a,b)=>a+(b.precio||0)*(b.stock||0),0).toLocaleString()}.`,
    "proveedor":  `Tenemos ${proveedores.length} proveedores registrados.`,
    "movimiento": `Hay ${movimientos.length} movimientos registrados.`,
    "default":    "Puedo ayudarte con inventario, precios, stock, proveedores y movimientos.",
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim().toLowerCase();
    setMsgs(m=>[...m,{from:"user",text:input.trim()}]);
    setInput("");
    setTimeout(()=>{ const key=Object.keys(botRespuestas).find(k=>userMsg.includes(k))||"default"; setMsgs(m=>[...m,{from:"bot",text:botRespuestas[key]}]); },600);
  };

  const categoriasList = ["Todas", ...new Set(datos.map(d=>d.categoria))];
  const datosFiltrados = datos.filter(d => {
    const matchCat = filtrocat==="Todas" || d.categoria===filtrocat;
    const matchQ   = busqueda==="" || (d.modelo||"").toLowerCase().includes(busqueda.toLowerCase()) || (d.marca||"").toLowerCase().includes(busqueda.toLowerCase()) || (d.categoria||"").toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchQ;
  });

  const totalProductos = datos.length;
  const totalStock     = datos.reduce((a,b)=>a+(b.stock||0),0);
  const valorTotal     = datos.reduce((a,b)=>a+(b.precio||0)*(b.stock||0),0);
  const totalCats      = [...new Set(datos.map(d=>d.categoria))].length;

  const navItems = [
    { id:"inventario",  icon:"📦", label:"Inventario"       },
    { id:"graficos",    icon:"📊", label:"Gráficos"         },
    { id:"entradas",    icon:"📥", label:"Entradas/Salidas" },
    { id:"proveedores", icon:"🏢", label:"Proveedores"      },
  ];

  return (
    <>
      <style>{styles}</style>
      {toast && <div className={`toast ${toast.tipo==="error"?"error":""}`}>{toast.msg}</div>}

      {/* MODAL AGREGAR */}
      {modalAgregar && (
        <div className="modal-overlay" onClick={e=>e.target.className==="modal-overlay"&&setModalAgregar(false)}>
          <div className="modal">
            <h2>➕ Agregar producto</h2>
            <p className="modal-subtitle">Completa los datos del nuevo producto</p>
            <div className="modal-form">
              <div className="modal-field" style={{gridColumn:"1/-1"}}>
                <label>Categoría</label>
                <select className="modal-select" value={nuevoProducto.categoria} onChange={e=>setNuevoProducto({...nuevoProducto,categoria:e.target.value})}>
                  <option value="">Selecciona una categoría</option>
                  {["Tarjeta de Video","Procesadores","Monitores","RAM","Disco SSD","Placa Madre","Case","Fuente de poder","Laptops","Estabilizador","Perifericos"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label>Marca</label>
                <input className="modal-input" placeholder="Ej: ASUS" value={nuevoProducto.marca} onChange={e=>setNuevoProducto({...nuevoProducto,marca:e.target.value})}/>
              </div>
              <div className="modal-field">
                <label>Modelo</label>
                <input className="modal-input" placeholder="Ej: RTX 4060" value={nuevoProducto.modelo} onChange={e=>setNuevoProducto({...nuevoProducto,modelo:e.target.value})}/>
              </div>
              <div className="modal-field">
                <label>Precio venta (S/)</label>
                <input className="modal-input" type="number" placeholder="0" value={nuevoProducto.precio} onChange={e=>setNuevoProducto({...nuevoProducto,precio:e.target.value})}/>
              </div>
              <div className="modal-field">
                <label>Stock</label>
                <input className="modal-input" type="number" placeholder="0" value={nuevoProducto.stock} onChange={e=>setNuevoProducto({...nuevoProducto,stock:e.target.value})}/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={()=>setModalAgregar(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={agregarProducto}>✅ Guardar producto</button>
            </div>
          </div>
        </div>
      )}

      <div className="dash-root">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <span className="sidebar-brand__icon">◈</span>
            <span className="sidebar-brand__name">Eagle Gaming</span>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(n=>(
              <button key={n.id} className={`nav-item ${seccion===n.id?"active":""}`} onClick={()=>setSeccion(n.id)}>
                <span className="nav-item__icon">{n.icon}</span>{n.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={logout}><span>🚪</span> Cerrar sesión</button>
          </div>
        </aside>

        <main className="dash-main">
          <div className="dash-header">
            <h1>
              {seccion==="inventario"  && "📦 Inventario"}
              {seccion==="graficos"    && "📊 Gráficos"}
              {seccion==="entradas"    && "📥 Entradas y Salidas"}
              {seccion==="proveedores" && "🏢 Proveedores"}
            </h1>
            <p>Bienvenido, {user?.name||"Administrador"} · Eagle Gaming System</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card" style={{borderColor:"#6c63ff"}}><div className="stat-card__label">Productos</div><div className="stat-card__value">{totalProductos}</div><div className="stat-card__sub">en inventario</div></div>
            <div className="stat-card" style={{borderColor:"#34d399"}}><div className="stat-card__label">Stock total</div><div className="stat-card__value">{totalStock}</div><div className="stat-card__sub">unidades</div></div>
            <div className="stat-card" style={{borderColor:"#fbbf24"}}><div className="stat-card__label">Valor total</div><div className="stat-card__value">S/ {valorTotal.toLocaleString()}</div><div className="stat-card__sub">en stock</div></div>
            <div className="stat-card" style={{borderColor:"#f472b6"}}><div className="stat-card__label">Categorías</div><div className="stat-card__value">{totalCats}</div><div className="stat-card__sub">tipos</div></div>
          </div>

          {/* ── INVENTARIO ── */}
          {seccion==="inventario" && (
            <div className="table-section">
              <div className="table-header">
                <h2>Productos registrados ({datosFiltrados.length})</h2>
                <div className="table-actions">
                  <button className="btn btn-print" onClick={handlePrint}>🖨 Imprimir</button>
                  <input type="file" id="inputExcel" accept=".xlsx,.xls" style={{display:"none"}} onChange={handleImportarExcel}/>
                  <button className="btn btn-outline" disabled={importando} onClick={()=>document.getElementById("inputExcel").click()}>
                    {importando?"⏳ Importando...":"⬆ Importar Excel"}
                  </button>
                  <button className="btn btn-primary" onClick={()=>setModalAgregar(true)}>+ Agregar</button>
                </div>
              </div>
              <div className="search-bar">
                <input className="search-input" placeholder="🔍 Buscar por modelo, marca o categoría..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
                <select className="filter-select" value={filtrocat} onChange={e=>setFiltrocat(e.target.value)}>
                  {categoriasList.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>#</th><th>Categoría</th><th>Marca</th><th>Modelo</th><th>Precio (S/)</th><th>Stock</th><th>Valor total</th><th>Acción</th></tr></thead>
                  <tbody>
                    {datosFiltrados.map(d=>(
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td><span className={badgeClass(d.categoria)}>{d.categoria}</span></td>
                        <td>{d.marca}</td>
                        <td><input value={d.modelo||""} onChange={e=>handleEdit(d.id,"modelo",e.target.value)}/></td>
                        <td><input type="number" value={d.precio||0} onChange={e=>handleEdit(d.id,"precio",Number(e.target.value))}/></td>
                        <td><input type="number" value={d.stock||0} onChange={e=>handleEdit(d.id,"stock",Number(e.target.value))}/></td>
                        <td>S/ {((d.precio||0)*(d.stock||0)).toLocaleString()}</td>
                        <td><button className="btn btn-danger" onClick={()=>eliminarProducto(d.id)}>🗑</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {seccion==="graficos" && <Graficos datos={datos}/>}

          {/* ── ENTRADAS Y SALIDAS ── */}
          {seccion==="entradas" && (
            <div className="table-section">
              <div className="table-header">
                <h2>Registro de movimientos</h2>
                <div className="table-actions"><button className="btn btn-print" onClick={handlePrint}>🖨 Imprimir</button></div>
              </div>
              <div className="mov-form">
                <input className="prov-input" placeholder="Fecha" value={nuevoMov.fecha} onChange={e=>setNuevoMov({...nuevoMov,fecha:e.target.value})}/>
                <input className="prov-input" placeholder="Producto" value={nuevoMov.producto} onChange={e=>setNuevoMov({...nuevoMov,producto:e.target.value})}/>
                <select className="mov-select" value={nuevoMov.tipo} onChange={e=>setNuevoMov({...nuevoMov,tipo:e.target.value})}><option>Entrada</option><option>Salida</option></select>
                <input className="prov-input" placeholder="Cantidad" type="number" value={nuevoMov.cantidad} onChange={e=>setNuevoMov({...nuevoMov,cantidad:e.target.value})}/>
                <input className="prov-input" placeholder="Costo S/" type="number" value={nuevoMov.costo} onChange={e=>setNuevoMov({...nuevoMov,costo:e.target.value})}/>
                <input className="prov-input" placeholder="Responsable" value={nuevoMov.responsable} onChange={e=>setNuevoMov({...nuevoMov,responsable:e.target.value})}/>
                <button className="btn btn-primary" style={{gridColumn:"1/-1"}} onClick={agregarMovimiento}>+ Registrar movimiento</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Fecha</th><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Costo S/</th><th>Responsable</th></tr></thead>
                  <tbody>
                    {movimientos.map(m=>(
                      <tr key={m.id}>
                        <td>{m.fecha}</td><td>{m.producto}</td>
                        <td><span className={`badge ${m.tipo==="Entrada"?"badge-monitor":"badge-gpu"}`}>{m.tipo}</span></td>
                        <td>{m.cantidad}</td><td>S/ {(m.costo||0).toLocaleString()}</td><td>{m.responsable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PROVEEDORES ── */}
          {seccion==="proveedores" && (
            <div className="table-section">
              <div className="table-header">
                <h2>Proveedores registrados</h2>
                <div className="table-actions"><button className="btn btn-print" onClick={handlePrint}>🖨 Imprimir</button></div>
              </div>
              <div className="prov-form">
                <input className="prov-input" placeholder="Nombre proveedor" value={nuevoProv.nombre}   onChange={e=>setNuevoProv({...nuevoProv,nombre:e.target.value})}/>
                <input className="prov-input" placeholder="Producto"         value={nuevoProv.producto} onChange={e=>setNuevoProv({...nuevoProv,producto:e.target.value})}/>
                <input className="prov-input" placeholder="Precio rango"     value={nuevoProv.precio}   onChange={e=>setNuevoProv({...nuevoProv,precio:e.target.value})}/>
                <input className="prov-input" placeholder="Tiempo entrega"   value={nuevoProv.entrega}  onChange={e=>setNuevoProv({...nuevoProv,entrega:e.target.value})}/>
                <input className="prov-input" placeholder="Contacto / email" value={nuevoProv.contacto} onChange={e=>setNuevoProv({...nuevoProv,contacto:e.target.value})} style={{gridColumn:"1/-1"}}/>
                <button className="btn btn-primary" style={{gridColumn:"1/-1"}} onClick={agregarProveedor}>+ Agregar proveedor</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>#</th><th>Proveedor</th><th>Producto</th><th>Precio</th><th>Entrega</th><th>Contacto</th></tr></thead>
                  <tbody>
                    {proveedores.map((p,i)=>(
                      <tr key={p.id}>
                        <td>{i+1}</td><td>{p.nombre}</td><td>{p.producto}</td>
                        <td>{p.precio}</td><td>{p.entrega}</td><td>{p.contacto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        <div className="chatbot">
          {chat && (
            <div className="chat-window">
              <div className="chat-head"><div className="chat-dot"/><span>Asistente Eagle Gaming</span></div>
              <div className="chat-messages">
                {msgs.map((m,i)=>(<div key={i} className={`chat-msg ${m.from}`}>{m.text}</div>))}
              </div>
              <div className="chat-input-row">
                <input className="chat-input" placeholder="Pregunta sobre el inventario..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSend()}/>
                <button className="chat-send" onClick={handleSend}>➤</button>
              </div>
            </div>
          )}
          <button className="chat-toggle" onClick={()=>setChat(!chat)}>{chat?"✕":"🤖"}</button>
        </div>
      </div>
    </>
  );
}