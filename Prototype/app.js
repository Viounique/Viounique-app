// Render emergency type and special care buttons
function chips() {
  $('types').innerHTML = TYPES.map(type => `
    <button
      class="chip ${S.type == type ? 'on' : ''}"
      data-a="type"
      data-v="${type}">
      ${type}
    </button>
  `).join('');

  $('care').innerHTML = CARE.map(type => `
    <button
      class="chip ${S.care.includes(type) ? 'on' : ''}"
      data-a="care"
      data-v="${type}">
      ${type}
    </button>
  `).join('');
}

// Switch between Victim and Coordinator screens
function tab(v) {
  $('vv').classList.toggle('hide', !v);
  $('cv').classList.toggle('hide', !!v);

  document.querySelectorAll('.seg button').forEach((button, i) => {
    button.classList.toggle('on', v ? i == 0 : i == 1);
  });

  if (!v) draw();
}

// Synchronize locally queued requests when online
function sync() {
  if (!S.online || !S.q.length) return;

  S.db.push(...S.q);
  S.q = [];

  $('ms').textContent = '✅ Request received by coordinators.';

  draw();
}

// Submit a new emergency request
function send() {
  if (!S.pos) {
    $('ms').textContent = '⚠️ Please capture your GPS first.';
    return;
  }

  const c = S.care.slice();

  S.q.push({
    id: S.db.length + S.q.length + 1,
    name: $('nm').value || 'Unknown',
    phone: $('ph').value,
    type: S.type,
    ppl: S.n,
    care: c,
    lat: S.pos[0],
    lon: S.pos[1],
    status: 'New',
    score: score(S.type, S.n, c)
  });

  $('ms').textContent = S.online
    ? ''
    : '📴 Offline: saved on device, will sync automatically.';

  sync();

  toast(S.online ? 'Request sent!' : 'Saved offline');
}

// Render coordinator dashboard, map, and requests
function draw() {
  const cnt = key => S.db.filter(r => r.score == key).length;
  const order = { Red: 0, Yellow: 1, Green: 2 };

  $('stats').innerHTML = ['Red', 'Yellow', 'Green']
    .map(key => `
      <div
        class="stat ${key} ${S.flt == key ? 'on' : ''}"
        data-a="flt"
        data-v="${key}">
        <b>${cnt(key)}</b>
        <span>${key}</span>
      </div>
    `).join('');

  const rows = S.db
    .filter(r => S.flt == 'All' || r.score == S.flt)
    .sort((a, b) => order[a.score] - order[b.score]);

  $('map').innerHTML =
    '<path d="M0 40 Q25 30 45 38 T100 28 V34 Q70 42 45 44 T0 46Z" fill="#7fb2f0" opacity=".6"/>' +
    [20, 40, 60, 80].map(x =>
      `<path d="M${x} 0V56" stroke="#fff" opacity=".35" stroke-width=".3"/>`
    ).join('') +
    rows.map(r => {
      const x = Math.min(
        96,
        Math.max(4, (r.lon - 100.70) / 0.14 * 100)
      );

      const y = Math.min(
        52,
        Math.max(4, (1 - (r.lat - 18.70) / 0.14) * 56)
      );

      const color = {
        Red: '#e5383b',
        Yellow: '#f4a300',
        Green: '#12a150'
      }[r.score];

      return `
        <circle
          class="dot"
          cx="${x}"
          cy="${y}"
          r="3.2"
          fill="${color}"
          stroke="#fff"
          stroke-width=".8"/>
      `;
    }).join('');

  $('ls').innerHTML = rows.map(r => `
    <div class="card req ${r.score}" data-a="pick" data-id="${r.id}">
      <div class="rt">
        <b>#${r.id} ${r.name}</b>
        <span class="pill st-${r.status.replace(' ', '')}">
          ${r.status}
        </span>
      </div>

      <div class="sub">${r.type} · ${r.ppl} people</div>

      <div class="sub">
        ${r.care.join(' ') || 'No care flag'} · ${r.score} priority
      </div>
    </div>
  `).join('') || '<div class="sub">No requests yet.</div>';
}

// Open the request details sheet
function pick(id) {
  const r = S.db.find(x => x.id == id);

  if (!r) return;

  $('sh').classList.remove('hide');

  $('shb').innerHTML = `
    <b style="font-size:16px">#${r.id} ${r.name} — ${r.score}</b>
    <div class="sub">${r.phone || 'no phone'}</div>
  ` + [
    '📞 Call',
    'Verified',
    'Dispatched',
    'Rescued',
    'False report'
  ].map(action => `
    <button data-a="act" data-v="${action}" data-id="${id}">
      ${action}
    </button>
  `).join('') + `
    <button class="cl" data-a="close">Close</button>
  `;
}

// Handle all interactive controls through event delegation
document.addEventListener('click', e => {
  const t = e.target.closest('[data-a]');

  if (!t) return;

  const a = t.dataset.a;
  const v = t.dataset.v;

  if (a == 'tv') {
    tab(1);
  } else if (a == 'tc') {
    tab(0);

  } else if (a == 'net') {
    e.preventDefault();

    S.online = !S.online;

    t.classList.toggle('on', S.online);

    $('nl').textContent = S.online ? 'Online' : 'Offline';

    sync();

    toast(S.online ? 'Back online' : 'Offline mode');

  } else if (a == 'type') {
    S.type = v;
    chips();

  } else if (a == 'care') {
    S.care = S.care.includes(v)
      ? S.care.filter(x => x != v)
      : [...S.care, v];

    chips();

  } else if (a == 'minus') {
    S.n = Math.max(1, S.n - 1);
    $('n').textContent = S.n;

  } else if (a == 'plus') {
    S.n++;
    $('n').textContent = S.n;

  } else if (a == 'gps') {
    // Simulated GPS coordinates for this prototype
    S.pos = [
      18.72 + Math.random() * 0.1,
      100.72 + Math.random() * 0.1
    ];

    $('pin').className = 'pin ok';

    $('gt').textContent =
      `${S.pos[0].toFixed(4)}, ${S.pos[1].toFixed(4)}`;

    $('gs').textContent = 'Location captured ✓';

  } else if (a == 'send') {
    send();

  } else if (a == 'flt') {
    S.flt = S.flt == v ? 'All' : v;
    draw();

  } else if (a == 'pick') {
    pick(t.dataset.id);

  } else if (a == 'act') {
    const r = S.db.find(x => x.id == t.dataset.id);

    $('sh').classList.add('hide');

    if (!r) return;

    if (v == '📞 Call') {
      toast('📞 Dialing ' + (r.phone || '(no number)'));
    } else {
      r.status = v;
      toast('Status → ' + v);
    }

    draw();

  } else if (a == 'close') {
    $('sh').classList.add('hide');
  }
});

// Initial rendering
chips();
