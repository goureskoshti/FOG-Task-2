import React, { useState, useEffect } from 'react';

const WaveGrid = () => {
  const [time, setTime] = useState(0);
  const rows = 15;
  const cols = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getColor = (row, col, time) => {
    const centerRow = rows / 2;
    const centerCol = cols / 2;
    const dx = col - centerCol;
    const dy = row - centerRow;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const wave = Math.sin(distance * 0.5 - time * 2) + 1;
    
    const r = Math.sin(time * 0.5) * 127 + 128;
    const g = Math.sin(time * 0.7) * 127 + 128;
    const b = Math.sin(time * 0.9) * 127 + 128;
    
    const alpha = wave / 2;
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#111827',
    borderRadius: '0.5rem',
  };

  const gridStyle = {
    display: 'grid',
    gap: '4px',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    width: 'min(90vw, 800px)',
    aspectRatio: `${cols}/${rows}`,
  };

  const cellStyle = (row, col) => ({
    aspectRatio: '1',
    borderRadius: '2px',
    transition: 'background-color 0.2s',
    backgroundColor: getColor(row, col, time),
    transform: `scale(${0.8 + Math.sin(row * 0.5 + col * 0.5 - time * 2) * 0.2})`,
  });

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={cellStyle(row, col)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WaveGrid;