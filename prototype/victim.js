// FR-1 Victim Request Logging (member 1)
const careTotal=()=>Object.values(S.counts).reduce((a,b)=>a+b,0);   // total people needing special care
function chips(){$('types').innerHTML=Object.entries(TYPES).map(([k,l])=>`<button class="chip ${S.type==k?'on':''}" aria-pressed="${S.type==k}" data-a="type" data-v="${k}">${l}</button>`).join('');careRows()}
function careRows(){$('care').innerHTML=Object.keys(CARE).map(k=>{const c=S.counts[k];
 return `<div class="crow"><span>${CARE[k]}</span><div class="stp"><button aria-label="Fewer ${k}" data-a="cminus" data-v="${k}" ${c<=0?'disabled':''}>−</button><b>${c}</b><button aria-label="More ${k}" data-a="cplus" data-v="${k}">+</button></div></div>`}).join('')
 +`<div class="crow tot"><span>Total needing care</span><b>${careTotal()}</b></div>`}
function setN(n){S.n=Math.max(1,n,careTotal());$('n').textContent=S.n;careRows()}   // total people is never less than the people needing care
function step(k,d,a){S.counts[k]=Math.max(0,S.counts[k]+d);setN(S.n);
 const b=document.querySelector(`[data-a="${a}"][data-v="${k}"]:not(:disabled)`);if(b)b.focus()}
function resetForm(){$('nm').value='';$('ph').value='';$('lmk').value='';S.counts=zero();setN(1)}
// Location: real browser GPS first; if denied/unavailable, a clearly labelled SIMULATED location + landmark box (SRS FR-1 AC-3: "location unverified")
function setLoc(pos,ok,acc,why){S.pos=pos;S.locOk=ok;S.acc=acc;$('pin').className=ok?'pin ok':'pin warn';
 $('gt').textContent=`${pos[0].toFixed(4)}, ${pos[1].toFixed(4)}`;
 $('gs').textContent=ok?`GPS location${acc?' (±'+acc+' m)':''}`:`Simulated location (${why}). Type a nearby landmark below.`;
 $('lmk').classList.toggle('hide',ok)}
function locate(){$('gs').textContent='Locating…';
 const sim=why=>setLoc([18.72+Math.random()*.1,100.72+Math.random()*.1],false,null,why);
 try{if(!navigator.geolocation){sim('GPS not available');return}
  navigator.geolocation.getCurrentPosition(p=>setLoc([p.coords.latitude,p.coords.longitude],true,Math.round(p.coords.accuracy)),
   e=>sim(e&&e.code==1?'permission denied':'GPS unavailable'),{timeout:8000,enableHighAccuracy:true})}catch(e){sim('GPS unavailable')}}
function send(){const name=$('nm').value.trim(),phone=$('ph').value.trim(),m=$('ms');
 if(!name){m.textContent='Please enter a name.';return}
 if(!isPhone(phone)){m.textContent='Enter a valid phone number (8–15 digits).';return}
 if(!S.pos){m.textContent='Please capture your location first.';return}
 const cid='REQ-'+Math.random().toString(36).slice(2,6).toUpperCase();   // client-generated ID: retries reuse it, so no duplicates (FR-2)
 S.q.push({cid,name,phone,type:S.type,ppl:S.n,counts:{...S.counts},lat:S.pos[0],lon:S.pos[1],locOk:S.locOk,acc:S.acc,landmark:$('lmk').value.trim(),t:Date.now()});
 S.mine=cid;saveQ();m.textContent='';sync();resetForm();toast(S.online&&!S.fail?'Request sent!':'Saved – will send automatically')}
ACT.type=(t,v)=>{S.type=v;chips()};
ACT.cminus=(t,v)=>step(v,-1,'cminus');
ACT.cplus=(t,v)=>step(v,1,'cplus');
ACT.minus=()=>setN(S.n-1);
ACT.plus=()=>setN(S.n+1);
ACT.gps=locate;
ACT.send=send;
