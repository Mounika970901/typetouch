import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Timer from './components/Timer';
import Statistics from './components/Statistics';
import TypingArea from './components/TypingArea';
import Keyboard from './components/Keyboard';
import Results from './components/Results';
import { generateSequence, normalizeSupportedKey, SUPPORTED_KEYS } from './utils/generator';
import { sounds } from './utils/sound';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const SESSION_DURATION = 300; // 5 minutes in seconds

export default function App() {
  // PRD Required State Management (Section 9)
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATION);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);
  const [correctKeys, setCorrectKeys] = useState(0);
  const [incorrectKeys, setIncorrectKeys] = useState(0);
  const [characters, setCharacters] = useState('');

  // UI & Feedback State
  const [typedHistory, setTypedHistory] = useState([]);
  const [lastPressedKey, setLastPressedKey] = useState(null);
  const [lastPressStatus, setLastPressStatus] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const pressTimeoutRef = useRef(null);

  // Live Accuracy Calculation (FR-06)
  // Accuracy = (Correct Keys / Total Keys Pressed) * 100
  // If no keys pressed, accuracy displays 0%
  const accuracy = totalKeys > 0 ? (correctKeys / totalKeys) * 100 : 0;

  // Real-time WPM calculation (Words per minute = (correctKeys / 5) / (elapsedMinutes))
  const elapsedMinutes = Math.max(1 / 60, elapsedSeconds / 60);
  const wpm = (correctKeys / 5) / elapsedMinutes;

  /**
   * Start a new 5-minute practice session
   */
  const startPractice = useCallback(() => {
    const initialText = generateSequence(150);
    setCharacters(initialText);
    setTimeLeft(SESSION_DURATION);
    setElapsedSeconds(0);
    setCurrentIndex(0);
    setTotalKeys(0);
    setCorrectKeys(0);
    setIncorrectKeys(0);
    setTypedHistory([]);
    setLastPressedKey(null);
    setLastPressStatus(null);
    setIsStarted(true);
    setIsPaused(false);
    setIsFinished(false);
  }, []);

  /**
   * Restart an active or finished session
   */
  const restartPractice = useCallback(() => {
    startPractice();
  }, [startPractice]);

  /**
   * Return to home screen
   */
  const goHome = useCallback(() => {
    setIsStarted(false);
    setIsPaused(false);
    setIsFinished(false);
    setTimeLeft(SESSION_DURATION);
    setElapsedSeconds(0);
  }, []);

  /**
   * Toggle Pause / Resume (FR-07)
   */
  const togglePause = useCallback(() => {
    if (!isStarted || isFinished) return;
    setIsPaused((prev) => !prev);
  }, [isStarted, isFinished]);

  /**
   * Complete session and transition to Results (FR-08)
   */
  const finishSession = useCallback(() => {
    setIsStarted(false);
    setIsPaused(false);
    setIsFinished(true);
  }, []);

  /**
   * Process a key press attempt (physical or virtual keyboard)
   */
  const processKeyInput = useCallback((rawKey) => {
    if (!isStarted || isPaused || isFinished) return;

    // FR-04: Accept only the eight supported keys. Ignore unsupported keys.
    const normalizedKey = normalizeSupportedKey(rawKey);
    if (!normalizedKey) {
      // Unsupported key pressed - do not alter stats or sequence
      return;
    }

    const expectedChar = characters[currentIndex];
    if (!expectedChar) return;

    const isMatch = normalizedKey.toLowerCase() === expectedChar.toLowerCase();

    // Visual animation feedback for virtual keyboard
    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current);
    }
    setLastPressedKey(normalizedKey);
    setLastPressStatus(isMatch ? 'correct' : 'incorrect');

    pressTimeoutRef.current = setTimeout(() => {
      setLastPressedKey(null);
      setLastPressStatus(null);
    }, 180);

    // Audio feedback
    if (isMatch) {
      sounds.playCorrect();
      setCorrectKeys((prev) => prev + 1);
    } else {
      sounds.playIncorrect();
      setIncorrectKeys((prev) => prev + 1);
    }

    setTotalKeys((prev) => prev + 1);

    // Update typed history for visual rendering
    setTypedHistory((prev) => {
      const nextHistory = [...prev];
      nextHistory[currentIndex] = {
        char: expectedChar,
        typed: normalizedKey,
        status: isMatch ? 'correct' : 'incorrect'
      };
      return nextHistory;
    });

    // Advance to next character
    setCurrentIndex((prev) => {
      const nextIdx = prev + 1;
      // Replenish sequence if approaching the end (Edge Case 6)
      if (nextIdx + 40 >= characters.length) {
        setCharacters((oldChars) => oldChars + generateSequence(100));
      }
      return nextIdx;
    });
  }, [isStarted, isPaused, isFinished, characters, currentIndex]);

  /**
   * Physical Keyboard Event Listener (FR-04)
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle Pause / Resume shortcut (Escape)
      if (e.key === 'Escape' && isStarted && !isFinished) {
        e.preventDefault();
        togglePause();
        return;
      }

      // Ignore repeated keydown events caused by holding down a key (Edge Case 9)
      if (e.repeat) {
        return;
      }

      // If key is a supported key, prevent default (e.g. browser quick find on semicolon)
      const isSupported = SUPPORTED_KEYS.includes(e.key.toLowerCase());
      if (isSupported && isStarted && !isPaused && !isFinished) {
        e.preventDefault();
        processKeyInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStarted, isPaused, isFinished, togglePause, processKeyInput]);

  /**
   * 5-Minute Countdown Timer Implementation (FR-05)
   * Reliable interval with accurate timing and pause support
   */
  useEffect(() => {
    if (!isStarted || isPaused || isFinished) {
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          finishSession();
          return 0;
        }
        return prevTime - 1;
      });

      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isStarted, isPaused, isFinished, finishSession]);

  /**
   * Toggle Mute Sound
   */
  const handleToggleMute = () => {
    const nowMuted = sounds.toggleMute();
    setIsMuted(nowMuted);
  };

  const nextExpectedKey = characters[currentIndex] || '';

  return (
    <div className="touchtype-app">
      <Header
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onGoHome={goHome}
        isStarted={isStarted}
        isFinished={isFinished}
      />

      <main className="main-content">
        {/* VIEW 1: HOME PAGE (FR-01) */}
        {!isStarted && !isFinished && (
          <Home
            onStartPractice={startPractice}
            durationMinutes={SESSION_DURATION / 60}
          />
        )}

        {/* VIEW 2: ACTIVE PRACTICE SESSION (FR-02 - FR-07) */}
        {isStarted && (
          <div className="practice-view fade-in">
            {/* Top Dashboard: Timer & Statistics */}
            <div className="practice-dashboard">
              <Timer
                timeLeft={timeLeft}
                totalDuration={SESSION_DURATION}
                isPaused={isPaused}
              />
              <Statistics
                totalKeys={totalKeys}
                correctKeys={correctKeys}
                incorrectKeys={incorrectKeys}
                accuracy={accuracy}
                wpm={wpm}
              />
            </div>

            {/* Practice Controls: Pause, Resume, Restart, End */}
            <div className="session-controls">
              <button
                className={`control-btn ${isPaused ? 'btn-resume' : 'btn-pause'}`}
                onClick={togglePause}
                title={isPaused ? 'Resume typing (Escape)' : 'Pause session (Escape)'}
              >
                {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} />}
                <span>{isPaused ? 'Resume Session' : 'Pause'}</span>
              </button>

              <button
                className="control-btn btn-secondary"
                onClick={restartPractice}
                title="Restart current 5-minute session"
              >
                <RotateCcw size={18} />
                <span>Restart</span>
              </button>

              <button
                className="control-btn btn-danger-subtle"
                onClick={finishSession}
                title="End session early and view report"
              >
                <Flag size={18} />
                <span>End Early</span>
              </button>
            </div>

            {/* Pause Notification Overlay */}
            {isPaused && (
              <div className="pause-banner">
                <div className="pause-banner-content">
                  <Pause size={24} />
                  <div>
                    <h4>Practice Paused</h4>
                    <p>Typing is suspended. Click <strong>Resume Session</strong> or press <strong>Esc</strong> to continue.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Typing Sequence Display Area (FR-02) */}
            <TypingArea
              characters={characters}
              currentIndex={currentIndex}
              typedHistory={typedHistory}
              isPaused={isPaused}
            />

            {/* Home Row Virtual Keyboard Visualization (FR-03) */}
            <Keyboard
              nextExpectedKey={nextExpectedKey}
              lastPressedKey={lastPressedKey}
              lastPressStatus={lastPressStatus}
              onVirtualKeyPress={processKeyInput}
            />
          </div>
        )}

        {/* VIEW 3: RESULTS SCREEN (FR-08) */}
        {isFinished && (
          <Results
            totalKeys={totalKeys}
            correctKeys={correctKeys}
            incorrectKeys={incorrectKeys}
            accuracy={accuracy}
            durationSeconds={elapsedSeconds || SESSION_DURATION}
            onRestartPractice={restartPractice}
            onGoHome={goHome}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>
            TouchType &bull; Focused Home-Row Practice for Beginners &bull; 8 Keys: <code>A S D F J K L ;</code>
          </p>
        </div>
      </footer>
    </div>
  );
}
