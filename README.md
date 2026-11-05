# TouchType – Home Row Practice Application ⌨️

> **Version:** 1.0  
> **Frontend Technology:** React.js, JavaScript, HTML5, CSS3  
> **Target Audience:** Beginners learning touch typing on home-row keys

---

## 📖 Overview

**TouchType** is an interactive web-based touch typing practice application designed to help beginners develop muscle memory, accuracy, and typing speed through focused practice on the eight fundamental home-row keys:

$$\mathbf{A},\ \mathbf{S},\ \mathbf{D},\ \mathbf{F}\quad\text{and}\quad\mathbf{J},\ \mathbf{K},\ \mathbf{L},\ \mathbf{;}$$

Touch typing is typing without looking at the keyboard. Each finger is assigned specific keys, guided by the tactile homing bumps on the **F** and **J** keys. TouchType provides a structured 5-minute practice session with real-time accuracy tracking and instant visual and auditory feedback.

---

## ✨ Features

- **8-Key Home-Row Focus:** Exclusively trains the foundational home-row keys (`A, S, D, F, J, K, L, ;`).
- **Dynamic Sequence Generation:** Infinite stream of balanced character patterns from the 8 supported keys.
- **5-Minute Countdown Timer:** 300-second countdown with visual progress bar and low-time alert.
- **Virtual Keyboard Visualization:**
  - Real-time highlight of the next expected key.
  - Tactile bump markers on `F` and `J`.
  - Color-coded finger assignment indicators for left and right hands.
  - Reactive key-press states (green flash for correct, red shake for incorrect).
- **Strict Home-Row Input Filtering:** Ignores unsupported keys to prevent accidental disruption to rhythm and statistics. Uppercase and lowercase are handled as equivalent inputs.
- **Live Performance Statistics:**
  - **Accuracy Percentage:** Calculated as $(\text{Correct Keys} / \text{Total Keys Pressed}) \times 100$ (displays $0\%$ when no keys pressed).
  - **Total Keys Pressed**
  - **Correct Keys**
  - **Incorrect Keys**
  - **Effective Typing Speed (WPM)**
- **Session Controls:**
  - Pause and Resume (via button or <kbd>Esc</kbd> key) preserving remaining time and statistics.
  - Restart Practice button.
  - End Early option.
- **Synthesized Audio Feedback:** Web Audio API sound effects for correct and incorrect keystrokes with mute toggle (zero audio file dependencies).
- **Comprehensive Results Report:**
  - Performance rating tier (Master Typist, Proficient, Developing, Beginner).
  - Final accuracy %, total keystrokes, correct/incorrect count, elapsed duration, and WPM.
  - Actionable feedback for further practice.
- **Responsive & Accessible Design:** Works seamlessly across desktops, laptops, tablets, and mobile devices.

---

## 🗂️ Component Architecture

```
src/
├── components/
│   ├── Header.jsx       # Application branding, key preview pill, and audio mute toggle
│   ├── Home.jsx         # Welcome screen, finger guide visualizer, and Start button
│   ├── Timer.jsx        # 5-minute countdown display and progress bar
│   ├── TypingArea.jsx   # Scrolling character sequence, cursor caret, and finger hints
│   ├── Keyboard.jsx     # Home-row virtual keyboard with synchronized key animations
│   ├── Statistics.jsx   # Real-time metrics (Total, Correct, Incorrect, Accuracy, WPM)
│   └── Results.jsx      # Final performance report and restart functionality
├── utils/
│   ├── generator.js     # Sequence generator, key normalizer, and finger mappings
│   └── sound.js         # Web Audio API synthesized sound generator
├── App.jsx              # Central state management and keyboard input handling
├── index.css            # Modern dark-mode styling, keycap styles, and responsive layout
└── main.jsx             # React DOM entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation

1. **Clone or navigate into the repository:**
   ```bash
   cd reacttt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Run unit tests:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🖐️ Finger Placement Guide

| Hand | Key | Assigned Finger | Visual Guide |
|---|---|---|---|
| **Left** | `A` | Pinky | Left outer key |
| **Left** | `S` | Ring | Left ring key |
| **Left** | `D` | Middle | Left middle key |
| **Left** | `F` | Index | Tactile bump key |
| **Right** | `J` | Index | Tactile bump key |
| **Right** | `K` | Middle | Right middle key |
| **Right** | `L` | Ring | Right ring key |
| **Right** | `;` | Pinky | Right outer key |

---

## 📋 Acceptance Criteria Compliance

| ID | Criteria | Status |
|---|---|---|
| **AC-01** | User can start a typing session | ✅ Verified |
| **AC-02** | Only the eight specified keys are accepted | ✅ Verified |
| **AC-03** | The expected characters are displayed | ✅ Verified |
| **AC-04** | The next expected key is highlighted | ✅ Verified |
| **AC-05** | Correct and incorrect attempts are counted accurately | ✅ Verified |
| **AC-06** | Accuracy is calculated correctly: $(\text{Correct} / \text{Total}) \times 100$ | ✅ Verified |
| **AC-07** | The timer starts at five minutes (300 seconds) | ✅ Verified |
| **AC-08** | Pause and resume work correctly | ✅ Verified |
| **AC-09** | Practice ends automatically after five minutes | ✅ Verified |
| **AC-10** | Final statistics are displayed on session completion | ✅ Verified |
| **AC-11** | Restart resets the entire session | ✅ Verified |
| **AC-12** | Responsive across all screen sizes | ✅ Verified |

---

## 📄 License
MIT License. Built for beginner touch typists.
