import React from 'react';
import { Play, Clock, Target, CheckCircle2, ShieldCheck, Hand, Sparkles } from 'lucide-react';

export default function Home({ onStartPractice, durationMinutes = 5 }) {
  const leftHandKeys = [
    { key: 'A', finger: 'Pinky', desc: 'Left pinky rests on A' },
    { key: 'S', finger: 'Ring', desc: 'Left ring rests on S' },
    { key: 'D', finger: 'Middle', desc: 'Left middle rests on D' },
    { key: 'F', finger: 'Index ★', desc: 'Left index rests on F (Feel the bump!)', bump: true }
  ];

  const rightHandKeys = [
    { key: 'J', finger: 'Index ★', desc: 'Right index rests on J (Feel the bump!)', bump: true },
    { key: 'K', finger: 'Middle', desc: 'Right middle rests on K' },
    { key: 'L', finger: 'Ring', desc: 'Right ring rests on L' },
    { key: ';', finger: 'Pinky', desc: 'Right pinky rests on ;' }
  ];

  return (
    <div className="home-view fade-in">
      <div className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Designed for Beginners &bull; Home Row Mastery</span>
        </div>

        <h1 className="hero-title">
          Build Real Muscle Memory with <span className="gradient-text">TouchType</span>
        </h1>

        <p className="hero-subtitle">
          Touch typing means typing with all fingers without ever looking down at the keyboard.
          Master the foundation with targeted practice on the eight fundamental home-row keys.
        </p>

        <div className="hero-cta-group">
          <button className="primary-btn pulse-glow" onClick={onStartPractice}>
            <Play size={20} fill="currentColor" />
            <span>Start 5-Minute Practice</span>
          </button>
          <div className="duration-tag">
            <Clock size={16} />
            <span>{durationMinutes} Minutes (300s) Session</span>
          </div>
        </div>
      </div>

      <div className="home-cards-grid">
        {/* Key Assignments Card */}
        <div className="info-card home-row-guide-card">
          <div className="card-header">
            <div className="card-icon-badge">
              <Hand size={20} />
            </div>
            <div>
              <h3>The 8 Home-Row Keys</h3>
              <p>Place your fingers in their permanent home positions before starting</p>
            </div>
          </div>

          <div className="hands-visualizer">
            {/* Left Hand */}
            <div className="hand-block left-hand">
              <span className="hand-label">Left Hand</span>
              <div className="keys-row">
                {leftHandKeys.map((item) => (
                  <div key={item.key} className="key-guide-pill" title={item.desc}>
                    <span className="key-char">{item.key}</span>
                    {item.bump && <span className="bump-indicator" title="Tactile bump on F key">_</span>}
                    <span className="finger-label">{item.finger}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hand-divider">
              <span>Home Row</span>
            </div>

            {/* Right Hand */}
            <div className="hand-block right-hand">
              <span className="hand-label">Right Hand</span>
              <div className="keys-row">
                {rightHandKeys.map((item) => (
                  <div key={item.key} className="key-guide-pill" title={item.desc}>
                    <span className="key-char">{item.key}</span>
                    {item.bump && <span className="bump-indicator" title="Tactile bump on J key">_</span>}
                    <span className="finger-label">{item.finger}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tactile-tip">
            <span className="tip-badge">Pro Tip</span>
            <p>
              Most physical keyboards have tiny raised ridges on the <strong>F</strong> and <strong>J</strong> keys.
              Use your index fingers to find them without looking!
            </p>
          </div>
        </div>

        {/* Feature Highlights Card */}
        <div className="info-card features-card">
          <div className="card-header">
            <div className="card-icon-badge accent-purple">
              <Target size={20} />
            </div>
            <div>
              <h3>How TouchType Works</h3>
              <p>Real-time feedback engineered to rewire typing habits</p>
            </div>
          </div>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-check">
                <CheckCircle2 size={18} />
              </div>
              <div className="feature-info">
                <strong>Next-Character Visual Focus</strong>
                <span>The next expected key is highlighted in both the practice text and the virtual keyboard.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-check">
                <CheckCircle2 size={18} />
              </div>
              <div className="feature-info">
                <strong>Instant Color Feedback</strong>
                <span>Correct inputs flash green, while mistakes highlight in red to immediately reinforce accuracy.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-check">
                <CheckCircle2 size={18} />
              </div>
              <div className="feature-info">
                <strong>Strict Home-Row Filter</strong>
                <span>Accidental keypresses outside the 8 home keys are completely ignored, keeping your rhythm clean.</span>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-check">
                <CheckCircle2 size={18} />
              </div>
              <div className="feature-info">
                <strong>Live Accuracy & Performance Summary</strong>
                <span>Continuous calculation of accuracy percentage, total keystrokes, and a comprehensive end-of-session report.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
