import React, { useEffect, useRef } from 'react';
import { FINGER_MAPPING } from '../utils/generator';

export default function TypingArea({
  characters,
  currentIndex,
  typedHistory, // Array of { char: string, status: 'correct' | 'incorrect' }
  isPaused
}) {
  const containerRef = useRef(null);
  const activeCharRef = useRef(null);

  // Auto-scroll so active character stays smoothly centered in view
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeEl = activeCharRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const nextChar = characters[currentIndex] || '';
  const nextCharInfo = FINGER_MAPPING[nextChar.toLowerCase()];

  return (
    <div className="typing-area-wrapper">
      {/* Finger hint banner */}
      <div className="next-finger-banner">
        {nextCharInfo ? (
          <div className="finger-hint">
            <span className="finger-hint-prefix">Next key:</span>
            <span className="finger-key-badge" style={{ borderColor: nextCharInfo.color, color: nextCharInfo.color }}>
              {nextChar.toUpperCase()}
            </span>
            <span className="finger-name-badge">
              {nextCharInfo.finger} ({nextCharInfo.hand === 'left' ? 'Left Hand' : 'Right Hand'})
            </span>
          </div>
        ) : (
          <span className="finger-hint-empty">Keep typing...</span>
        )}
      </div>

      {/* Main characters stream */}
      <div
        className={`typing-stream-container ${isPaused ? 'paused-overlay-active' : ''}`}
        ref={containerRef}
      >
        <div className="typing-stream-content">
          {characters.split('').map((char, index) => {
            const isTyped = index < currentIndex;
            const isActive = index === currentIndex;
            const historyItem = typedHistory[index];

            let charClass = 'char-box';
            if (isActive) {
              charClass += ' char-active';
            } else if (isTyped) {
              if (historyItem && historyItem.status === 'correct') {
                charClass += ' char-correct';
              } else if (historyItem && historyItem.status === 'incorrect') {
                charClass += ' char-incorrect';
              }
            } else {
              charClass += ' char-upcoming';
            }

            return (
              <span
                key={index}
                ref={isActive ? activeCharRef : null}
                className={charClass}
                data-char={char}
              >
                {char}
                {isActive && <span className="active-cursor-caret" />}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
