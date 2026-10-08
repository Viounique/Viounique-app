// FR-3 Coordinator Live Map with Filters (member 4)
function draw(){const cnt=k=>S.db.filter(r=>r.score==k).length;
 $('stats').innerHTML=['Red','Yellow','Green'].map(k=>`<div class="stat ${k} ${S.flt==k?'on':''}" data-a="flt" data-v="${k}"><b>${cnt(k)}</b><span>${k}</span></div>`).join('');
 const rows=S.db.filter(r=>S.flt=='All'||r.score==S.flt).sort((a,b)=>RANK[a.score]-RANK[b.score]);
 $('map').innerHTML='<path d="M0 40 Q25 30 45 38 T100 28 V34 Q70 42 45 44 T0 46Z" fill="#7fb2f0" opacity=".6"/>'+[20,40,60,80].map(x=>`<path d="M${x} 0V56" stroke="#fff" opacity=".35" stroke-width=".3"/>`).join('')+
  rows.map(r=>{const x=Math.min(96,Math.max(4,(r.lon-100.70)/.14*100)),y=Math.min(52,Math.max(4,(1-(r.lat-18.70)/.14)*56)),c={Red:'#e5383b',Yellow:'#f4a300',Green:'#12a150'}[r.score];
  return `<circle class="dot" cx="${x}" cy="${y}" r="3.2" fill="${c}" stroke="#fff" stroke-width=".8"/>`}).join('');
 $('ls').innerHTML=rows.map(r=>`<div class="card req ${r.score}" data-a="pick" data-id="${r.id}"><div class="rt"><b>#${r.id} ${r.name}</b><span class="pill st-${r.status.replace(' ','')}">${r.status}</span></div>
  <div class="sub">${r.type} · ${r.ppl} people</div><div class="sub">${r.care.join(' ')||'No care flag'} · ${r.score} priority</div></div>`).join('')||'<div class="sub">No requests yet.</div>'}
ACT.flt=(t,v)=>{S.flt=S.flt==v?'All':v;draw()};
