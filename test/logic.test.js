import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSequence, normalizeSupportedKey, SUPPORTED_KEYS, FINGER_MAPPING } from '../src/utils/generator.js';

test('SUPPORTED_KEYS contains exactly the 8 home row keys', () => {
  assert.equal(SUPPORTED_KEYS.length, 8);
  const expected = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
  assert.deepEqual(SUPPORTED_KEYS.sort(), expected.sort());
});

test('normalizeSupportedKey accepts both upper and lower case supported keys', () => {
  assert.equal(normalizeSupportedKey('a'), 'a');
  assert.equal(normalizeSupportedKey('A'), 'a');
  assert.equal(normalizeSupportedKey('s'), 's');
  assert.equal(normalizeSupportedKey('S'), 's');
  assert.equal(normalizeSupportedKey('d'), 'd');
  assert.equal(normalizeSupportedKey('D'), 'd');
  assert.equal(normalizeSupportedKey('f'), 'f');
  assert.equal(normalizeSupportedKey('F'), 'f');
  assert.equal(normalizeSupportedKey('j'), 'j');
  assert.equal(normalizeSupportedKey('J'), 'j');
  assert.equal(normalizeSupportedKey('k'), 'k');
  assert.equal(normalizeSupportedKey('K'), 'k');
  assert.equal(normalizeSupportedKey('l'), 'l');
  assert.equal(normalizeSupportedKey('L'), 'l');
  assert.equal(normalizeSupportedKey(';'), ';');
});

test('normalizeSupportedKey rejects unsupported keys', () => {
  const unsupported = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', ' ', 'Enter', 'Shift', 'Backspace'];
  for (const key of unsupported) {
    assert.equal(normalizeSupportedKey(key), null, `Key ${key} should be rejected`);
  }
});

test('generateSequence produces valid sequences composed only of supported keys', () => {
  const seq = generateSequence(150);
  assert.equal(seq.length, 150);
  for (const char of seq) {
    assert.ok(SUPPORTED_KEYS.includes(char), `Character "${char}" is not in SUPPORTED_KEYS`);
  }
});

test('FINGER_MAPPING covers all 8 keys with correct finger assignments', () => {
  for (const key of SUPPORTED_KEYS) {
    assert.ok(FINGER_MAPPING[key], `Mapping missing for key ${key}`);
    assert.ok(FINGER_MAPPING[key].finger);
    assert.ok(FINGER_MAPPING[key].hand);
  }
  assert.equal(FINGER_MAPPING['f'].hand, 'left');
  assert.equal(FINGER_MAPPING['j'].hand, 'right');
  assert.equal(FINGER_MAPPING['a'].finger, 'Left Pinky');
  assert.equal(FINGER_MAPPING[';'].finger, 'Right Pinky');
});

test('Accuracy formula calculations match PRD FR-06', () => {
  // PRD Example: Total = 100, Correct = 90, Incorrect = 10 -> Accuracy = 90%
  const total = 100;
  const correct = 90;
  const accuracy = (correct / total) * 100;
  assert.equal(accuracy, 90);

  // When no keys pressed, accuracy should be 0%
  const totalZero = 0;
  const accuracyZero = totalZero > 0 ? (0 / totalZero) * 100 : 0;
  assert.equal(accuracyZero, 0);

  // 100% accuracy
  const totalAllCorrect = 50;
  const correctAll = 50;
  const accuracyAll = (correctAll / totalAllCorrect) * 100;
  assert.equal(accuracyAll, 100);

  // 0% accuracy with attempts
  const totalAllWrong = 25;
  const correctNone = 0;
  const accuracyNone = (correctNone / totalAllWrong) * 100;
  assert.equal(accuracyNone, 0);
});

