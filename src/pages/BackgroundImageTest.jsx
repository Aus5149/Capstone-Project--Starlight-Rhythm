import React, { useState, useEffect } from 'react';

const BackgroundTransition = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample background images - you can replace these with your own
  const backgrounds = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  // Auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background layers for smooth transition */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: bg,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          textShadow: '2px 2px 12px rgba(0,0,0,0.4)'
        }}>
          Automatic Background Transition
        </h1>
        
        <p style={{ 
          fontSize: '24px', 
          marginBottom: '60px',
          textShadow: '1px 1px 6px rgba(0,0,0,0.4)',
          maxWidth: '800px'
        }}>
          The background automatically fades between different gradients every 5 seconds
        </p>

        {/* Simple progress indicators */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {backgrounds.map((_, index) => (
            <div
              key={index}
              style={{
                width: currentIndex === index ? '50px' : '14px',
                height: '14px',
                borderRadius: '7px',
                backgroundColor: currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.5s ease',
                boxShadow: currentIndex === index ? '0 0 10px rgba(255, 255, 255, 0.6)' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundTransition;