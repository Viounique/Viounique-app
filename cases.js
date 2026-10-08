// FR-5 Contact Victim & Case Status (member 5)
function pick(id){const r=S.db.find(x=>x.id==id);$('sh').classList.remove('hide');
 $('shb').innerHTML=`<b style="font-size:16px">#${r.id} ${r.name} — ${r.score}</b><div class="sub">${r.phone||'no phone'}</div>`+['📞 Call','Verified','Dispatched','Rescued','False report'].map(a=>`<button data-a="act" data-v="${a}" data-id="${id}">${a}</button>`).join('')+'<button class="cl" data-a="close">Close</button>'}
ACT.pick=t=>pick(t.dataset.id);
ACT.act=(t,v)=>{const r=S.db.find(x=>x.id==t.dataset.id);$('sh').classList.add('hide');if(v=='📞 Call')toast('📞 Dialing '+(r.phone||'(no number)'));else{r.status=v;toast('Status → '+v)}draw()};
ACT.close=(t,v,e)=>{if(t.id=='sh'&&e.target.closest('#shb'))return;$('sh').classList.add('hide')};
