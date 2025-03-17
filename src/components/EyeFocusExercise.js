import React, { useState, useEffect, useRef } from 'react';
import './EyeFocusExercise.css'

function EyeFocusExercise() {
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });
  const canvasRef = useRef(null);

  useEffect(() => {
    drawDot();
  }, [dotPosition]);

  const drawDot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(dotPosition.x, dotPosition.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#64b5f6'; // Pastel blue dot color
    ctx.shadowColor = 'rgba(255, 255, 255, 0.7)'; // White inner glow for dot
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowColor = 'transparent'; // Reset shadow to avoid affecting other elements
  };

  const moveDot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newX = Math.random() * canvas.width;
    const newY = Math.random() * canvas.height;

    setDotPosition({ x: newX, y: newY });
  };

  return (
    <div className="eye-focus-exercise-container" style={{ textAlign: 'center' }}>
      <h1>Eye Focus Exercise</h1>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="eye-focus-exercise-canvas"
      />
      <button onClick={moveDot} className="eye-focus-exercise-button">Move Dot</button>
      <p className="eye-focus-exercise-paragraph">Focus on the dot. When you are ready click the button to move the dot.</p>
    </div>
  );
}

export default EyeFocusExercise; 