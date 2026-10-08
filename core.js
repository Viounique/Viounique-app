// CORE (team lead): shared state, helpers and the action registry
const $=i=>document.getElementById(i);
const TYPES=['🆘 Trapped / Rescue','🩺 Medical','💧 Food / Water','🚤 Evacuation'],CARE=['🛏 Bedridden','👶 Infant','👵 Elderly'];
const S={type:TYPES[0],n:1,care:[],pos:null,online:true,flt:'All',q:[],db:[]};  // q = phone queue, db = "server"
const ACT={};  // every module registers its click handlers here: ACT.name=(element,value,event)=>{...}
function toast(t){const e=$('toast');e.textContent=t;e.classList.remove('hide');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.add('hide'),2200)}
function tab(v){$('vv').classList.toggle('hide',!v);$('cv').classList.toggle('hide',!!v);
 document.querySelectorAll('.seg button').forEach((b,i)=>b.classList.toggle('on',v?i==0:i==1));if(!v)draw()}
ACT.tv=()=>tab(1);ACT.tc=()=>tab(0);
