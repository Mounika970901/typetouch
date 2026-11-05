import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function Timer({ timeLeft, totalDuration = 300, isPaused }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage (100% at start, 0% at end)
  const percentRemaining = Math.max(0, Math.min(100, (timeLeft / totalDuration) * 100));
  const isLowTime = timeLeft <= 30 && timeLeft > 0;

  return (
    <div className={`timer-widget ${isLowTime ? 'low-time' : ''} ${isPaused ? 'paused' : ''}`}>
      <div className="timer-header">
        <Clock size={18} className="timer-icon" />
        <span className="timer-label">{isPaused ? 'Timer (Paused)' : 'Time Remaining'}</span>
      </div>

      <div className="timer-display">
        <span className="time-digits">{formattedTime}</span>
        {isLowTime && (
          <span className="low-time-badge" title="Finishing soon!">
            <AlertCircle size={14} />
          </span>
        )}
      </div>

      <div className="timer-progress-track" title={`${Math.round(percentRemaining)}% time remaining`}>
        <div
          className="timer-progress-fill"
          style={{ width: `${percentRemaining}%` }}
        />
      </div>
    </div>
  );
}
