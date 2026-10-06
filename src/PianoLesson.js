import React, { useState } from 'react';
import StaffCard from './components/StaffCard';
import OptionButton from './components/OptionButton';
import QuizCompleteModal from './components/QuizCompleteModal';
import HintModal from './components/HintModal';
import './PianoLesson.css';

const QUIZ_QUESTIONS = [
  { id: 1, note: 'B5', targetNote: 'B', options: ['C', 'D', 'B'] },
  { id: 2, note: 'C4', targetNote: 'C', options: ['C', 'E', 'G'] },
  { id: 3, note: 'D4', targetNote: 'D', options: ['D', 'F', 'A'] },
  { id: 4, note: 'G5', targetNote: 'G', options: ['G', 'B', 'E'] },
  { id: 5, note: 'F4', targetNote: 'F', options: ['F', 'G', 'D'] },
  { id: 6, note: 'C5', targetNote: 'C', options: ['A', 'C', 'E'] },
  { id: 7, note: 'E5', targetNote: 'E', options: ['E', 'C', 'G'] },
  { id: 8, note: 'B5', targetNote: 'B', options: ['B', 'D', 'G'] },
  { id: 9, note: 'G4', targetNote: 'G', options: ['E', 'G', 'A'] },
  { id: 10, note: 'D5', targetNote: 'D', options: ['B', 'D', 'F'] },
  { id: 11, note: 'A5', targetNote: 'A', options: ['F', 'A', 'C'] },
  { id: 12, note: 'F5', targetNote: 'F', options: ['A', 'F', 'D'] },
  { id: 13, note: 'E4', targetNote: 'E', options: ['C', 'E', 'B'] },
];

export default function PianoLesson() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);

    const isCorrect = option === currentQuestion.targetNote;
    if (isCorrect) {
      setScore((prev) => prev + 100);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      setIsFlipping(true);

      setTimeout(() => {
        if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsFlipping(false);
        } else {
          setShowModal(true);
        }
      }, 300);
    }, 700);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedOption(null);
    setIsFlipping(false);
    setShowModal(false);
    setShowHint(false);
  };

  return (
    <div className="piano-lesson-wrapper">
      <div className="phone-screen">
        {/* Header */}
        <div className="quiz-header">
          <span className="question-count">
            Question {currentIndex + 1}/{QUIZ_QUESTIONS.length}
          </span>
          <button
            type="button"
            className="hint-toggle-btn"
            onClick={() => setShowHint(true)}
          >
            💡 HINT
          </button>
          <span className="score-display">SCORE: {score}</span>
        </div>
        <div className="header-divider"></div>

        {/* Content Body */}
        <main className="quiz-content">
          <p className="instruction-text">What note is this?</p>

          <div className={`flashcard-container ${isFlipping ? 'flip' : ''}`}>
            <div className="flashcard-card">
              <StaffCard note={currentQuestion.note} />
            </div>
          </div>

          <div className="options-row">
            {currentQuestion.options.map((option) => (
              <OptionButton
                key={option}
                option={option}
                selectedOption={selectedOption}
                correctOption={currentQuestion.targetNote}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
              />
            ))}
          </div>

          <p className="footer-prompt">TAP THE CORRECT NOTE</p>
        </main>

        {/* Overlay Modals */}
        {showHint && <HintModal onClose={() => setShowHint(false)} />}

        {showModal && (
          <QuizCompleteModal
            score={score}
            totalPoints={QUIZ_QUESTIONS.length * 100}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}