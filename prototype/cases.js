// FR-5 Contact Victim & Case Status (member 5) — flow: Submitted → Verified → Dispatched → Rescued; exits: Unreachable, Canceled (with reason)
const NEXT={Submitted:'Verified',Verified:'Dispatched',Dispatched:'Rescued'},COORD='Coordinator A';
function setStatus(r,s,reason){r.status=s;if(reason)r.reason=reason;r.log.push({s,t:Date.now(),by:COORD,reason})}   // status + time + coordinator name are kept
function pick(id,exit){const r=S.db.find(x=>x.id==id);$('sh').classList.remove('hide');
 const loc=r.locOk?'Location confirmed':`Location not confirmed${r.landmark?' · near '+esc(r.landmark):''}`;
 const call=isPhone(r.phone)?`<a class="callbtn" href="tel:${esc(r.phone.replace(/\s/g,''))}" data-a="call" data-v="${esc(r.phone)}">Call ${esc(r.phone)}</a>`
  :'<button class="callbtn off" disabled title="No valid number">Call (no valid number)</button>';
 const body=exit?`<div class="sub">Why is this case ${exit}?</div>`+REASONS.map(x=>`<button data-a="reason" data-v="${x}" data-id="${id}" data-s="${exit}">${x}</button>`).join('')
  :isActive(r)?(NEXT[r.status]?`<button class="nx" data-a="next" data-id="${id}">Mark as ${NEXT[r.status]} →</button>`:'')+EXITS.map(x=>`<button data-a="exit" data-v="${x}" data-id="${id}">${x}…</button>`).join('')
  :`<div class="sub">Case closed (${r.status}${r.reason?' – '+esc(r.reason):''}). It stays in the case log.</div>`;
 $('shb').innerHTML=`<b style="font-size:16px">#${r.id} ${esc(r.name)} — ${r.score}${needsReview(r)?'<span class="tag">needs review</span>':''}</b><div class="sub">${TYPES[r.type]} · ${r.ppl} people · ${careText(r)}</div><div class="sub">${loc}</div>`
  +call+body+`<div class="hist">${r.log.map(l=>`${l.s} · ${hm(l.t)} · ${esc(l.by)}${l.reason?' ('+esc(l.reason)+')':''}`).join('<br>')}</div><button class="cl" data-a="close">Close</button>`}
const done=(r,msg)=>{$('sh').classList.add('hide');toast(msg);draw();renderMy()};
ACT.pick=t=>pick(t.dataset.id);
ACT.call=(t,v)=>toast('Dialer opened for '+v+' (simulated on desktop)');
ACT.next=t=>{const r=S.db.find(x=>x.id==t.dataset.id);if(!NEXT[r.status])return;setStatus(r,NEXT[r.status]);done(r,'Status → '+r.status)};
ACT.exit=(t,v)=>pick(t.dataset.id,v);
ACT.reason=(t,v)=>{const r=S.db.find(x=>x.id==t.dataset.id);setStatus(r,t.dataset.s,v);done(r,'Status → '+r.status)};
ACT.close=(t,v,e)=>{if(t.id=='sh'&&e.target.closest('#shb'))return;$('sh').classList.add('hide')};
