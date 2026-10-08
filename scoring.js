// FR-4 Rule-based Priority Scoring (member 3)
const score=(t,n,c)=>c.length||/Medical|Trapped/.test(t)?'Red':n>=4||/Evacuation/.test(t)?'Yellow':'Green';
const RANK={Red:0,Yellow:1,Green:2};
