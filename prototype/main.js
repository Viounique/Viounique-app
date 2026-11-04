// MAIN (team lead): sample data, click + keyboard dispatcher, start-up
const logTo=(status,t)=>FLOW.slice(0,FLOW.indexOf(status)+1).map((s,i)=>({s,t:t+i*300000,by:i?COORD:'System'}));
function seed(){const now=Date.now();S.db=[];   // [ref, name, phone, type, people, care, lat, lon, status, minutes ago, location confirmed?, landmark]
 [['REQ-A101','Somchai K.','081-234-5678','other',5,{bedridden:2},18.77,100.76,'Submitted',45,1,''],
  ['REQ-A102','Malee P.','086-111-2222','medical',2,{infant:1},18.74,100.80,'Verified',30,1,''],
  ['REQ-A103','Prasert W.','089-555-0101','food',3,{},18.81,100.73,'Dispatched',20,1,''],
  ['REQ-A104','Nok S.','082-909-7788','evacuation',6,{},18.79,100.79,'Submitted',10,1,''],
  ['REQ-A105','Anong T.','083-456-7890','evacuation',4,{elderly:4},18.76,100.74,'Submitted',5,1,''],
  ['REQ-A106','Ploy R.','084-222-3344','food',2,{},18.72,100.77,'Submitted',8,0,'Wat Pa temple']]
  .forEach((r,i)=>{const counts={...zero(),...r[5]},t=now-r[9]*60000;
   S.db.push({cid:r[0],id:i+1,name:r[1],phone:r[2],type:r[3],ppl:r[4],counts,lat:r[6],lon:r[7],locOk:!!r[10],landmark:r[11],t,status:r[8],score:score(r[3],counts,!!r[10]),log:logTo(r[8],t)})})}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const f=ACT[t.dataset.a];if(f)f(t,t.dataset.v,e)});
document.addEventListener('keydown',e=>{if((e.key=='Enter'||e.key==' ')&&e.target.matches&&e.target.matches('[role=button][data-a]')){e.preventDefault();e.target.click()}});
seed();loadQ();initFilters();syncFilterUI();chips();sync();
setInterval(()=>{if(!$('cv').classList.contains('hide'))draw()},30000);   // keep "x min ago" fresh
