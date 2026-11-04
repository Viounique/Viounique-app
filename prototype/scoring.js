// FR-4 Rule-based Priority Scoring (member 3) — exactly the SRS rule table; the highest severity wins
//   Red    : any care flag (bedridden, infant, elderly) OR type = Medical
//   Yellow : Evacuation / Other without care flag, OR incomplete data (location unverified -> "needs review")
//   Green  : Food & Water only, no care flag, complete data
const hasCare=c=>Object.values(c).some(v=>v>0);
const score=(type,counts,locOk=true)=>hasCare(counts)||type=='medical'?'Red':type=='food'&&locOk?'Green':'Yellow';
const needsReview=r=>!r.locOk;
const RANK={Red:0,Yellow:1,Green:2};
