/* Neue Begriffe einfach an diese Liste anhängen. Jede Karte zieht 16 davon. */
const ENTRIES = [
  'Obstkorb am Mittwoch schon fast leer',
  '„Wir sind ja wie eine Familie“',
  'AI Slop',
  'Arbeitsplätze, die durch AI ersetzt wurden',
  'Dozenten glazen viel zu krass',
  'Man merkt, dass sie eigentlich gar keinen Bock haben, dass wir da sind',
  'Helvetica',
  'Man muss so krass mit den Augen rollen',
  '„Synergien“',
  'Pimmelparty',
  'Inneneinrichtung teurer als Praktikumsgehalt',
  'Pantone Folder',
  'Kurze bunte Mütze',
  '„Flache Hierarchien“',
  'Agenturhund',
  'Work-Life-Balance wird ungefragt erwähnt',
];

const STORAGE_KEY = 'agentur-bingo-v1';

function createCard(entries = ENTRIES) {
  const shuffled = [...new Set(entries)];
  if (shuffled.length < 16) throw new Error('Mindestens 16 unterschiedliche Begriffe nötig.');
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return { items: shuffled.slice(0, 16), marked: [] };
}

function winningLines(marked) {
  const selected = new Set(marked);
  const lines = [];
  for (let i = 0; i < 4; i++) {
    lines.push([i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]);
    lines.push([i, i + 4, i + 8, i + 12]);
  }
  lines.push([0, 5, 10, 15], [3, 6, 9, 12]);
  return lines.filter(line => line.every(index => selected.has(index)));
}

function validCard(card, entries = ENTRIES) {
  return card && Array.isArray(card.items) && card.items.length === 16 &&
    new Set(card.items).size === 16 && card.items.every(item => entries.includes(item)) &&
    Array.isArray(card.marked) && new Set(card.marked).size === card.marked.length &&
    card.marked.every(index => Number.isInteger(index) && index >= 0 && index < 16);
}

if (typeof module !== 'undefined') module.exports = { ENTRIES, createCard, winningLines, validCard };

if (typeof document !== 'undefined') {
  const board = document.getElementById('board');
  const result = document.getElementById('result');
  const progress = document.getElementById('progress');
  const resetDialog = document.getElementById('reset-dialog');
  let card;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (validCard(saved)) card = saved;
  } catch { /* Eine gesperrte oder beschädigte Ablage verhindert das Spielen nicht. */ }
  if (!card) card = createCard();

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(card));
    } catch {
      document.getElementById('save-note').textContent = 'Speichern ist in diesem Browser gerade nicht möglich. Lass diese Seite geöffnet.';
    }
  }

  function update() {
    const lines = winningLines(card.marked);
    const winning = new Set(lines.flat());
    [...board.children].forEach((button, index) => {
      const marked = card.marked.includes(index);
      button.setAttribute('aria-pressed', String(marked));
      button.classList.toggle('winning', winning.has(index));
      button.querySelector('.tile-check').textContent = marked ? '✓' : '';
    });
    progress.textContent = `${card.marked.length} / 16 abgehakt`;
    result.textContent = lines.length ? (lines.length === 1 ? 'BINGO! Na klar.' : `${lines.length} × BINGO!`) : 'Augen auf.';
    result.classList.toggle('has-bingo', lines.length > 0);
    save();
  }

  function render() {
    board.replaceChildren(...card.items.map((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tile';
      button.setAttribute('aria-label', item);
      const number = document.createElement('span');
      number.className = 'tile-number';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.textContent = item;
      const check = document.createElement('span');
      check.className = 'tile-check';
      check.setAttribute('aria-hidden', 'true');
      button.append(number, label, check);
      button.addEventListener('click', () => {
        card.marked = card.marked.includes(index) ? card.marked.filter(value => value !== index) : [...card.marked, index];
        update();
      });
      return button;
    }));
    update();
  }

  function newCard() {
    const previous = card.items.join('\n');
    card = createCard();
    if (card.items.join('\n') === previous) card.items.push(card.items.shift());
    render();
  }

  document.getElementById('new-card').addEventListener('click', () => {
    if (card.marked.length) {
      resetDialog.returnValue = '';
      resetDialog.showModal();
    } else newCard();
  });
  resetDialog.addEventListener('close', () => {
    if (resetDialog.returnValue === 'new') newCard();
  });
  render();
}
