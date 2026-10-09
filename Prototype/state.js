const $ = id => document.getElementById(id);

const TYPES = [
  '🆘 Trapped / Rescue',
  '🩺 Medical',
  '💧 Food / Water',
  '🚤 Evacuation'
];

const CARE = [
  '🛏 Bedridden',
  '👶 Infant',
  '👵 Elderly'
];

const score = (type, n, care) =>
  care.length || /Medical|Trapped/.test(type)
    ? 'Red'
    : n >= 4 || /Evacuation/.test(type)
      ? 'Yellow'
      : 'Green';

const S = {
  type: TYPES[0],
  n: 1,
  care: [],
  pos: null,
  online: true,
  flt: 'All',
  q: [],
  db: []
};

// Initial demonstration data
[
  ['Somchai K.', '081-234-5678', TYPES[0], 5,
    ['🛏 Bedridden'], 18.77, 100.76, 'New'],

  ['Malee P.', '086-111-2222', TYPES[1], 2,
    ['👶 Infant'], 18.74, 100.80, 'Verified'],

  ['Prasert W.', '089-555-0101', TYPES[2], 3,
    [], 18.81, 100.73, 'Dispatched'],

  ['Nok S.', '082-909-7788', TYPES[3], 6,
    [], 18.79, 100.79, 'New']
].forEach((r, i) => {
  S.db.push({
    id: i + 1,
    name: r[0],
    phone: r[1],
    type: r[2],
    ppl: r[3],
    care: r[4],
    lat: r[5],
    lon: r[6],
    status: r[7],
    score: score(r[2], r[3], r[4])
  });
});

// Display a temporary notification
function toast(message) {
  const e = $('toast');

  e.textContent = message;
  e.classList.remove('hide');

  clearTimeout(toast.t);

  toast.t = setTimeout(() => {
    e.classList.add('hide');
  }, 2200);
}
