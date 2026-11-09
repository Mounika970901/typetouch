import React from 'react';
import { Keyboard, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function Header({ isMuted, onToggleMute, onGoHome, isStarted, isFinished }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand" onClick={onGoHome} role="button" tabIndex={0} title="TouchType Home">
          <div className="brand-icon">
            <Keyboard size={24} className="text-primary" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">
              Touch<span>Type</span>
            </h1>
            <span className="brand-tagline">Home Row Practice</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="home-row-pill" title="8 supported home-row keys">
            <span className="dot"></span>
            <span className="keys-preview">A S D F &bull; J K L ;</span>
          </div>

          <button
            className={`icon-btn ${isMuted ? 'muted' : ''}`}
            onClick={onToggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            title={isMuted ? "Unmute audio feedback" : "Mute audio feedback"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}

