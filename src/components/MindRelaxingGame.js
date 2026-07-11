import React, { useEffect, useRef } from 'react';

function MindRelaxingGame() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set fixed dimensions
    canvas.width = 800;
    canvas.height = 400;

    // Create circles array
    const circles = [];
    
    // Generate initial circles
    for (let i = 0; i < 30; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: `hsl(${Math.random() * 360}, 50%, 50%)`
      });
    }

    function animate() {
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw circles
      circles.forEach(circle => {
        // Move circle
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce off walls
        if (circle.x < circle.radius || circle.x > canvas.width - circle.radius) {
          circle.dx *= -1;
        }
        if (circle.y < circle.radius || circle.y > canvas.height - circle.radius) {
          circle.dy *= -1;
        }

        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(animate);
    }

    // Start animation
    animate();
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px',
      background: '#000'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #333',
          borderRadius: '8px',
          background: '#000',
          maxWidth: '100%'
        }}
      />
    </div>
  );
}

export default MindRelaxingGame;