import React, { useEffect, useRef } from 'react';

function GentleWaves() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const drawWave = (offset, color, amplitude) => {
      const waveHeight = canvas.height * 0.5;
      const waveFrequency = 0.02;

      ctx.beginPath();
      ctx.moveTo(0, waveHeight);

      for (let x = 0; x < canvas.width; x++) {
        const y = waveHeight + 
                 Math.sin(x * waveFrequency + timeRef.current + offset) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#001e3c');
      gradient.addColorStop(1, '#003366');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves
      drawWave(0, 'rgba(173, 216, 230, 0.3)', 30);
      drawWave(Math.PI / 2, 'rgba(135, 206, 235, 0.3)', 25);
      drawWave(Math.PI, 'rgba(100, 149, 237, 0.3)', 35);

      // Increment time
      timeRef.current += 0.02;

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        background: '#001e3c'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}

export default GentleWaves;