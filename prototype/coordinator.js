// FR-3 Coordinator Live Map with Filters (member 4)
const F=S.F;
const match=r=>(F.type=='All'||r.type==F.type)&&(F.status=='All'||(F.status=='Active'?isActive(r):r.status==F.status))
 &&(F.care=='All'||(F.care=='any'?hasCare(r.counts):r.counts[F.care]>0));
const careText=r=>Object.keys(CARE).filter(k=>r.counts[k]>0).map(k=>CARE[k].split(' ')[0]+'×'+r.counts[k]).join(' ')||'No care flag';
function initFilters(){
 $('fty').innerHTML='<option value="All">All types</option>'+Object.entries(TYPES).map(([k,l])=>`<option value="${k}">${l}</option>`).join('');
 $('fst').innerHTML=['Active','All',...FLOW,...EXITS].map(s=>`<option value="${s}">${s=='Active'?'Active cases':s=='All'?'All statuses':s}</option>`).join('');
 $('fca').innerHTML='<option value="All">All care</option><option value="any">Any care flag</option>'+Object.entries(CARE).map(([k,l])=>`<option value="${k}">${l}</option>`).join('');
 [['fty','type'],['fst','status'],['fca','care']].forEach(([id,k])=>{$(id).onchange=()=>{F[k]=$(id).value;draw()}})}
function syncFilterUI(){$('fty').value=F.type;$('fst').value=F.status;$('fca').value=F.care}
function draw(){const base=S.db.filter(match),cnt=k=>base.filter(r=>r.score==k).length;
 $('stats').innerHTML=['Red','Yellow','Green'].map(k=>`<div class="stat ${k} ${S.flt==k?'on':''}" role="button" tabindex="0" aria-pressed="${S.flt==k}" data-a="flt" data-v="${k}"><b>${cnt(k)}</b><span>${k}</span></div>`).join('');
 const act=S.db.filter(isActive),tot=k=>act.reduce((a,r)=>a+r.counts[k],0);   // people still needing care (active cases only)
 $('care-sum').innerHTML=Object.keys(CARE).map(k=>`<div><b style="font-size:22px">${tot(k)}</b><div class="sub">${CARE[k]}</div></div>`).join('')
  +`<div><b style="font-size:22px">${Object.keys(CARE).reduce((a,k)=>a+tot(k),0)}</b><div class="sub">Total</div></div>`;
 const rows=base.filter(r=>S.flt=='All'||r.score==S.flt).sort((a,b)=>RANK[a.score]-RANK[b.score]||a.t-b.t);   // Red → Yellow → Green, oldest first
 const dirty=F.type!='All'||F.status!='Active'||F.care!='All'||S.flt!='All';
 $('fcount').innerHTML=`${rows.length} matching request${rows.length==1?'':'s'}`+(dirty?' <button class="chip" data-a="clearf">Clear filters</button>':'');
 $('map').innerHTML='<path d="M0 40 Q25 30 45 38 T100 28 V34 Q70 42 45 44 T0 46Z" fill="#7fb2f0" opacity=".6"/>'+[20,40,60,80].map(x=>`<path d="M${x} 0V56" stroke="#fff" opacity=".35" stroke-width=".3"/>`).join('')+
  rows.map(r=>{const x=Math.min(96,Math.max(4,(r.lon-100.70)/.14*100)),y=Math.min(52,Math.max(4,(1-(r.lat-18.70)/.14)*56)),c={Red:'#e5383b',Yellow:'#f4a300',Green:'#12a150'}[r.score];
  return `<circle class="dot" cx="${x}" cy="${y}" r="3.2" fill="${c}" stroke="${r.locOk?'#fff':'#14161c'}" ${r.locOk?'':'stroke-dasharray="1.2 .8"'} stroke-width=".8"><title>${r.locOk?esc(r.name):'Location not confirmed'}</title></circle>`}).join('');   // dashed = unverified location
 $('ls').innerHTML=rows.map(r=>`<div class="card req ${r.score}" role="button" tabindex="0" data-a="pick" data-id="${r.id}"><div class="rt"><b>#${r.id} ${esc(r.name)}${needsReview(r)?'<span class="tag">needs review</span>':''}</b><span class="pill st-${r.status}">${r.status}</span></div>
  <div class="sub">${TYPES[r.type]} · ${r.ppl} people · ${ago(r.t)}</div><div class="sub">${careText(r)} · ${r.score} priority</div></div>`).join('')
  ||'<div class="card sub">No matching requests.<br><button class="chip" data-a="clearf" style="margin-top:8px">Clear filters</button></div>'}
ACT.flt=(t,v)=>{S.flt=S.flt==v?'All':v;draw()};
ACT.clearf=()=>{Object.assign(F,{type:'All',status:'Active',care:'All'});S.flt='All';syncFilterUI();draw()};
