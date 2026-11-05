import React from 'react';
import { FINGER_MAPPING } from '../utils/generator';

export default function Keyboard({
  nextExpectedKey,
  lastPressedKey,
  lastPressStatus, // 'correct' | 'incorrect' | null
  onVirtualKeyPress
}) {
  const leftKeys = ['a', 's', 'd', 'f'];
  const rightKeys = ['j', 'k', 'l', ';'];

  const normalizedNext = nextExpectedKey ? nextExpectedKey.toLowerCase() : '';
  const normalizedLast = lastPressedKey ? lastPressedKey.toLowerCase() : '';

  const renderKey = (keyChar) => {
    const isNext = keyChar === normalizedNext;
    const isPressed = keyChar === normalizedLast;
    const info = FINGER_MAPPING[keyChar];
    const isBump = keyChar === 'f' || keyChar === 'j';

    let keyClasses = 'vkey';
    if (isNext) keyClasses += ' vkey-next';
    if (isPressed) {
      if (lastPressStatus === 'correct') {
        keyClasses += ' vkey-correct';
      } else if (lastPressStatus === 'incorrect') {
        keyClasses += ' vkey-incorrect';
      }
    }

    return (
      <div
        key={keyChar}
        className={keyClasses}
        onClick={() => onVirtualKeyPress && onVirtualKeyPress(keyChar)}
        role="button"
        tabIndex={-1}
        title={`Key: ${keyChar.toUpperCase()} | Finger: ${info.finger}`}
      >
        <div className="vkey-surface">
          <span className="vkey-letter">{keyChar.toUpperCase()}</span>
          {isBump && <span className="vkey-bump" title="Homing bump" />}
          <span
            className="vkey-finger-dot"
            style={{ backgroundColor: info.color }}
            title={info.finger}
          />
        </div>
        <span className="vkey-sublabel">{info.finger.replace('Left ', '').replace('Right ', '')}</span>
      </div>
    );
  };

  return (
    <div className="virtual-keyboard-section">
      <div className="keyboard-header-info">
        <span className="info-title">Home-Row Virtual Keyboard</span>
        <div className="keyboard-legend">
          <span className="legend-item">
            <span className="legend-indicator next-indicator"></span> Next Expected
          </span>
          <span className="legend-item">
            <span className="legend-indicator correct-indicator"></span> Correct Press
          </span>
          <span className="legend-item">
            <span className="legend-indicator incorrect-indicator"></span> Incorrect Press
          </span>
        </div>
      </div>

      <div className="virtual-keyboard-container">
        {/* Left hand cluster */}
        <div className="key-cluster left-cluster">
          <div className="cluster-header">
            <span>Left Hand</span>
          </div>
          <div className="keys-row">
            {leftKeys.map(renderKey)}
          </div>
        </div>

        {/* Center Space Gap / Tactile Divider */}
        <div className="keyboard-center-divider">
          <div className="center-line"></div>
          <span className="center-tag">G &bull; H (Neutral Gap)</span>
          <div className="center-line"></div>
        </div>

        {/* Right hand cluster */}
        <div className="key-cluster right-cluster">
          <div className="cluster-header">
            <span>Right Hand</span>
          </div>
          <div className="keys-row">
            {rightKeys.map(renderKey)}
          </div>
        </div>
      </div>
    </div>
  );
}
