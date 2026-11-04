// CORE (team lead): shared state, SRS vocabulary, helpers and the action registry
const $=i=>document.getElementById(i);
const TYPES={medical:'Medical',evacuation:'Evacuation',food:'Food & Water',other:'Other'};   // FR-1 emergency types (SRS)
const CARE={bedridden:'Bedridden',infant:'Infant',elderly:'Elderly'};                            // stable keys, labels in one place
const zero=()=>Object.fromEntries(Object.keys(CARE).map(k=>[k,0]));
const FLOW=['Submitted','Verified','Dispatched','Rescued'],EXITS=['Unreachable','Canceled'];              // FR-5 case status flow (SRS)
const REASONS=['Phone not answered','Victim already evacuated','False report','Duplicate request'];
const isActive=r=>!['Rescued',...EXITS].includes(r.status);   // closed cases leave the Active view but stay in the case log
const isPhone=p=>/^[0-9+\-\s]{8,15}$/.test(p||'');
const S={type:'medical',n:1,counts:zero(),pos:null,locOk:false,acc:null,online:true,fail:false,att:0,retryIn:30,mine:null,
 flt:'All',F:{type:'All',status:'Active',care:'All'},q:[],db:[]};   // q = phone queue, db = "server"
const ACT={};  // every module registers its click handlers here: ACT.name=(element,value,event)=>{...}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));  // never insert raw user text
const nextId=()=>Math.max(0,...S.db.map(r=>r.id))+1;
const hm=t=>new Date(t).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
function ago(t){const m=Math.max(0,Math.round((Date.now()-t)/60000));return m<1?'just now':m<60?m+' min ago':Math.floor(m/60)+' h ago'}
function toast(t){const e=$('toast');e.textContent=t;e.classList.remove('hide');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.add('hide'),2200)}
function tab(v){$('vv').classList.toggle('hide',!v);$('cv').classList.toggle('hide',!!v);
 document.querySelectorAll('.seg button').forEach((b,i)=>b.classList.toggle('on',v?i==0:i==1));if(!v)draw()}
ACT.tv=()=>tab(1);ACT.tc=()=>tab(0);
