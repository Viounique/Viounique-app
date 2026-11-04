// FR-2 Offline Capture, Automatic Sync and Retry (member 2)
const QKEY='fa_queue';   // the phone queue survives a page reload (NFR-4)
function saveQ(){try{localStorage.setItem(QKEY,JSON.stringify(S.q))}catch(e){}}
function loadQ(){try{const q=JSON.parse(localStorage.getItem(QKEY)||'[]');if(Array.isArray(q))S.q=q.filter(r=>r&&r.counts&&r.cid)}catch(e){}}
function renderQ(){const b=$('qb'),n=S.q.length;b.classList.toggle('hide',!n);if(!n)return;
 b.innerHTML=!S.online?`<span>${n} request(s) not sent yet – will send automatically.</span>`
  :S.att>0?`<span>Upload failed (attempt ${S.att}). Retrying in ${S.retryIn} s…</span><button class="chip" data-a="retry">Retry now</button>`
  :`<span>Sending ${n} request(s)…</span>`}
function renderMy(){const e=$('my'),c=S.mine;if(!c){e.classList.add('hide');return}
 const r=S.db.find(x=>x.cid==c),st=r?r.status:S.q.some(x=>x.cid==c)?'Offline – pending':null;
 if(!st){e.classList.add('hide');return}
 e.classList.remove('hide');e.innerHTML=`<div class="lbl">Your request</div><b>${esc(c)}</b> · ${st}`}
function sync(){if(!S.online||!S.q.length){renderQ();renderMy();return}
 for(const r of S.q)if(!S.db.some(x=>x.cid==r.cid)){const t=Date.now();   // idempotent: exactly one copy per client ID
  S.db.push({...r,id:nextId(),status:'Submitted',score:score(r.type,r.counts,r.locOk),log:[{s:'Submitted',t,by:'System'}]})}
 S.q=[];S.att=0;saveQ();$('ms').textContent='Request received by coordinators.';renderQ();renderMy();draw()}
function tick(){if(S.q.length&&S.online){S.retryIn--;if(S.retryIn<=0){S.retryIn=30;sync()}renderQ()}}
setInterval(tick,1000);
ACT.net=(t,v,e)=>{e.preventDefault();S.online=!S.online;t.classList.toggle('on',S.online);$('nl').textContent=S.online?'Online':'Offline';sync();toast(S.online?'Back online':'Offline mode')};
ACT.fail=t=>{S.fail=!S.fail;t.textContent=S.fail?'Server error: ON':'Server OK';t.classList.toggle('on',S.fail);toast(S.fail?'Simulating server errors':'Server back to normal');renderQ()};
ACT.retry=()=>sync();
