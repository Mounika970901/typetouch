import React from 'react';
import { RotateCcw, Trophy, Target, Hash, CheckCircle2, XCircle, Clock, Award, ArrowRight, Home as HomeIcon } from 'lucide-react';

export default function Results({
  totalKeys,
  correctKeys,
  incorrectKeys,
  accuracy,
  durationSeconds = 300,
  onRestartPractice,
  onGoHome
}) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const formattedDuration = `${minutes}:${String(seconds).padStart(2, '0')}`;

  // Approximate words per minute (standard formula: (correctKeys / 5) / (durationInMinutes))
  const durationInMinutes = Math.max(0.1, durationSeconds / 60);
  const wpm = Math.round((correctKeys / 5) / durationInMinutes);

  // Determine achievement tier based on accuracy and keystrokes
  let tier = {
    title: 'Promising Beginner',
    subtitle: 'Great start! Focus on hitting the right keys before speeding up.',
    color: 'accent-orange',
    badge: 'Bronze'
  };

  if (totalKeys === 0) {
    tier = {
      title: 'Practice Session Ended',
      subtitle: 'No home-row keys were recorded during this session.',
      color: 'accent-neutral',
      badge: 'Unranked'
    };
  } else if (accuracy >= 98 && totalKeys >= 150) {
    tier = {
      title: 'Master Typist',
      subtitle: 'Incredible precision! Your home-row muscle memory is razor sharp.',
      color: 'accent-gold',
      badge: 'Gold'
    };
  } else if (accuracy >= 94) {
    tier = {
      title: 'Proficient Home-Row Typist',
      subtitle: 'Solid accuracy! You are building reliable touch typing habits.',
      color: 'accent-blue',
      badge: 'Silver'
    };
  } else if (accuracy >= 85) {
    tier = {
      title: 'Developing Typist',
      subtitle: 'Keep going! Try to slow down slightly to eliminate accidental miskeys.',
      color: 'accent-emerald',
      badge: 'Bronze+'
    };
  }

  return (
    <div className="results-view fade-in">
      <div className="results-card">
        {/* Header with Trophy */}
        <div className="results-header">
          <div className="results-trophy-badge">
            <Trophy size={40} className="trophy-icon" />
          </div>
          <h2 className="results-title">Practice Session Complete!</h2>
          <p className="results-subtitle">Here is your 5-minute home-row performance breakdown</p>
        </div>

        {/* Tier Announcement */}
        <div className="tier-banner">
          <div className="tier-tag">
            <Award size={18} />
            <span>{tier.badge} Level</span>
          </div>
          <h3 className="tier-title">{tier.title}</h3>
          <p className="tier-description">{tier.subtitle}</p>
        </div>

        {/* Main Stats Grid */}
        <div className="results-stats-grid">
          {/* Final Accuracy */}
          <div className="result-metric-box highlight-box">
            <div className="metric-icon-wrap">
              <Target size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Final Accuracy</span>
              <span className="metric-value">{totalKeys > 0 ? `${accuracy.toFixed(1)}%` : '0%'}</span>
            </div>
          </div>

          {/* Total Keystrokes */}
          <div className="result-metric-box">
            <div className="metric-icon-wrap">
              <Hash size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Total Keys Pressed</span>
              <span className="metric-value">{totalKeys}</span>
            </div>
          </div>

          {/* Correct Keys */}
          <div className="result-metric-box">
            <div className="metric-icon-wrap text-success">
              <CheckCircle2 size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Correct Keys</span>
              <span className="metric-value text-success">{correctKeys}</span>
            </div>
          </div>

          {/* Incorrect Keys */}
          <div className="result-metric-box">
            <div className="metric-icon-wrap text-danger">
              <XCircle size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Incorrect Keys</span>
              <span className="metric-value text-danger">{incorrectKeys}</span>
            </div>
          </div>

          {/* Practice Duration */}
          <div className="result-metric-box">
            <div className="metric-icon-wrap text-primary">
              <Clock size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Practice Duration</span>
              <span className="metric-value">{formattedDuration}</span>
            </div>
          </div>

          {/* Typing Speed */}
          <div className="result-metric-box">
            <div className="metric-icon-wrap text-purple">
              <Award size={24} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Effective Speed</span>
              <span className="metric-value">{wpm} <small>WPM</small></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <button className="primary-btn pulse-glow" onClick={onRestartPractice}>
            <RotateCcw size={20} />
            <span>Restart Practice</span>
          </button>

          <button className="secondary-btn" onClick={onGoHome}>
            <HomeIcon size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
