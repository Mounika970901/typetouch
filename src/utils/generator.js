/**
 * Generates practice character sequences using strictly the 8 home-row keys:
 * a, s, d, f, j, k, l, ;
 */

export const SUPPORTED_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

// Finger assignment mapping for educational guidance
export const FINGER_MAPPING = {
  a: { finger: 'Left Pinky', hand: 'left', color: '#f43f5e' },
  s: { finger: 'Left Ring', hand: 'left', color: '#fb923c' },
  d: { finger: 'Left Middle', hand: 'left', color: '#facc15' },
  f: { finger: 'Left Index', hand: 'left', color: '#4ade80' },
  j: { finger: 'Right Index', hand: 'right', color: '#22d3ee' },
  k: { finger: 'Right Middle', hand: 'right', color: '#818cf8' },
  l: { finger: 'Right Ring', hand: 'right', color: '#c084fc' },
  ';': { finger: 'Right Pinky', hand: 'right', color: '#f472b6' }
};

/**
 * Generate a random sequence of length count using only the 8 supported keys.
 * Ensures good distribution across left and right hands and avoids long repeated runs.
 */
export function generateSequence(count = 120) {
  let result = '';
  let lastChar = '';
  let repeatCount = 0;

  for (let i = 0; i < count; i++) {
    let nextChar;
    let attempts = 0;
    do {
      nextChar = SUPPORTED_KEYS[Math.floor(Math.random() * SUPPORTED_KEYS.length)];
      attempts++;
    } while (nextChar === lastChar && repeatCount >= 2 && attempts < 10);

    if (nextChar === lastChar) {
      repeatCount++;
    } else {
      repeatCount = 1;
      lastChar = nextChar;
    }

    result += nextChar;
  }

  return result;
}

/**
 * Check if a pressed key is one of the supported home row keys.
 * Returns the normalized lowercase key or null if unsupported.
 */
export function normalizeSupportedKey(key) {
  if (!key) return null;
  const lower = key.toLowerCase();
  if (SUPPORTED_KEYS.includes(lower)) {
    return lower;
  }
  return null;
}
