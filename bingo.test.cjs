const assert = require('node:assert/strict');
const { ENTRIES, createCard, winningLines, validCard } = require('./bingo.js');
const pool = [...ENTRIES, 'Zusatz A', 'Zusatz B', 'Zusatz C'];
const original = [...pool];
const seen = new Set();
for (let n = 0; n < 300; n++) {
  const card = createCard(pool);
  assert.equal(card.items.length, 16);
  assert.equal(new Set(card.items).size, 16);
  assert.ok(validCard(card, pool));
  card.items.forEach(item => seen.add(item));
}
assert.deepEqual(pool, original);
assert.equal(seen.size, pool.length);
assert.throws(() => createCard(['zu wenig']));
assert.deepEqual(winningLines([0, 1, 2, 3]), [[0, 1, 2, 3]]);
assert.deepEqual(winningLines([2, 6, 10, 14]), [[2, 6, 10, 14]]);
assert.deepEqual(winningLines([0, 5, 10, 15]), [[0, 5, 10, 15]]);
assert.deepEqual(winningLines([3, 6, 9, 12]), [[3, 6, 9, 12]]);
assert.equal(winningLines([0, 1, 2]).length, 0);
assert.equal(winningLines(Array.from({length: 16}, (_, i) => i)).length, 10);
assert.ok(!validCard({items: ENTRIES.slice(0, 16), marked: [16]}));
assert.ok(!validCard({items: Array(16).fill(ENTRIES[0]), marked: []}));
assert.ok(!validCard(null));
console.log('OK: Auswahl aus größerem Pool, keine Duplikate, gültiger Speicherstand und alle Bingo-Richtungen.');
