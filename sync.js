// FR-2 Offline Capture & Automatic Sync (member 2)
function sync(){if(!S.online||!S.q.length)return;S.db.push(...S.q);S.q=[];$('ms').textContent='✅ Request received by coordinators.';draw()}
ACT.net=(t,v,e)=>{e.preventDefault();S.online=!S.online;t.classList.toggle('on',S.online);$('nl').textContent=S.online?'Online':'Offline';sync();toast(S.online?'Back online':'Offline mode')};
