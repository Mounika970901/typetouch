import React from 'react';
import { Target, CheckCircle2, XCircle, Hash, Zap } from 'lucide-react';

export default function Statistics({ totalKeys, correctKeys, incorrectKeys, accuracy, wpm = 0 }) {
  // Format accuracy to 1 decimal place or whole number
  const formattedAccuracy = totalKeys > 0 ? `${accuracy.toFixed(1)}%` : '0%';

  return (
    <div className="statistics-bar">
      {/* Accuracy Card */}
      <div className="stat-card stat-accuracy">
        <div className="stat-icon-wrapper">
          <Target size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Accuracy</span>
          <span className="stat-value highlight-accuracy">{formattedAccuracy}</span>
        </div>
      </div>

      {/* Total Keys Pressed */}
      <div className="stat-card stat-total">
        <div className="stat-icon-wrapper">
          <Hash size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Total Keys</span>
          <span className="stat-value">{totalKeys}</span>
        </div>
      </div>

      {/* Correct Keys */}
      <div className="stat-card stat-correct">
        <div className="stat-icon-wrapper">
          <CheckCircle2 size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Correct</span>
          <span className="stat-value text-success">{correctKeys}</span>
        </div>
      </div>

      {/* Incorrect Keys */}
      <div className="stat-card stat-incorrect">
        <div className="stat-icon-wrapper">
          <XCircle size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Incorrect</span>
          <span className="stat-value text-danger">{incorrectKeys}</span>
        </div>
      </div>

      {/* Typing Speed (WPM) */}
      <div className="stat-card stat-wpm">
        <div className="stat-icon-wrapper">
          <Zap size={20} />
        </div>
        <div className="stat-content">
          <span className="stat-title">Speed</span>
          <span className="stat-value">{Math.round(wpm)} <small>WPM</small></span>
        </div>
      </div>
    </div>
  );
}
