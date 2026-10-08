// FR-1 Victim Request Logging (member 1)
function chips(){$('types').innerHTML=TYPES.map(t=>`<button class="chip ${S.type==t?'on':''}" data-a="type" data-v="${t}">${t}</button>`).join('');
 $('care').innerHTML=CARE.map(t=>`<button class="chip ${S.care.includes(t)?'on':''}" data-a="care" data-v="${t}">${t}</button>`).join('')}
function send(){if(!S.pos){$('ms').textContent='⚠️ Please capture your GPS first.';return}
 const c=S.care.slice();S.q.push({id:S.db.length+S.q.length+1,name:$('nm').value||'Unknown',phone:$('ph').value,type:S.type,ppl:S.n,care:c,lat:S.pos[0],lon:S.pos[1],status:'New',score:score(S.type,S.n,c)});
 $('ms').textContent=S.online?'':'📴 Offline: saved on device, will sync automatically.';sync();toast(S.online?'Request sent!':'Saved offline')}
ACT.type=(t,v)=>{S.type=v;chips()};
ACT.care=(t,v)=>{S.care=S.care.includes(v)?S.care.filter(x=>x!=v):[...S.care,v];chips()};
ACT.minus=()=>{S.n=Math.max(1,S.n-1);$('n').textContent=S.n};
ACT.plus=()=>{S.n++;$('n').textContent=S.n};
ACT.gps=()=>{S.pos=[18.72+Math.random()*.1,100.72+Math.random()*.1];$('pin').className='pin ok';$('gt').textContent=`${S.pos[0].toFixed(4)}, ${S.pos[1].toFixed(4)}`;$('gs').textContent='Location captured ✓'};
ACT.send=send;
