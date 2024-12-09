import React, { useState, useEffect, useRef } from 'react';

const SkiGameGame = () => {
  const canvasRef = useRef(null);

  const [gameState, setGameState] = useState({
    width: 800,
    height: 600,
    gameMode: 'start',
    score: 0,
    distance: 0,
    player: {
      x: 400,
      y: 300,
      angle: 0,
      speed: 2,
      crashed: false,
      style: 'normal',
    },
    obstacles: [],
    yeti: {
      active: false,
      x: 0,
      y: 0,
      speed: 0.5, // slower upward chase
    },
    keys: new Set(),
    sprites: null,
    tracks: [], // store track positions {x, y}
  });

  const trackGap = 6; // distance between the two parallel lines (3 px offset each side)

  const generateSprites = () => {
    const sprites = {};
    const createCanvas = (width, height) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    };

    // Skier sprites
    const skierStates = ['normal', 'left', 'right', 'crashed'];
    skierStates.forEach(state => {
      const canvas = createCanvas(32, 32);
      const ctx = canvas.getContext('2d');

      if (state === 'crashed') {
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(16, 16, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.save();
        ctx.translate(16, 16);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-12, -1, 24, 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillRect(-12, -1, 24, 2);
        ctx.restore();
      } else {
        const angle = state === 'left' ? -Math.PI / 8 : state === 'right' ? Math.PI / 8 : 0;
        ctx.save();
        ctx.translate(16, 16);
        ctx.rotate(angle);

        // Body
        ctx.fillStyle = '#4dc5b3';
        ctx.fillRect(-4, -8, 8, 16);

        // Skis
        ctx.fillStyle = '#000';
        ctx.fillRect(-8, 8, 16, 2);

        // Head
        ctx.fillStyle = '#f1f4f8';
        ctx.beginPath();
        ctx.arc(0, -8, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      sprites[`skier${state.charAt(0).toUpperCase() + state.slice(1)}`] = canvas;
    });

    // Tree sprite
    {
      const treeCanvas = createCanvas(32, 48);
      const treeCtx = treeCanvas.getContext('2d');
      treeCtx.fillStyle = '#c27c9b';
      treeCtx.fillRect(14, 32, 4, 16);
      treeCtx.fillStyle = '#5bd4a8';
      treeCtx.beginPath();
      treeCtx.moveTo(16, 0);
      treeCtx.lineTo(2, 32);
      treeCtx.lineTo(30, 32);
      treeCtx.closePath();
      treeCtx.fill();
      sprites.tree = treeCanvas;
    }

    // Rock sprite
    {
      const rockCanvas = createCanvas(24, 24);
      const rockCtx = rockCanvas.getContext('2d');
      rockCtx.fillStyle = '#bdd3df';
      rockCtx.beginPath();
      rockCtx.moveTo(4, 20);
      rockCtx.quadraticCurveTo(12, 0, 20, 20);
      rockCtx.closePath();
      rockCtx.fill();
      sprites.rock = rockCanvas;
    }

    // Yeti sprite
    {
      const yetiCanvas = createCanvas(48, 64);
      const yetiCtx = yetiCanvas.getContext('2d');

      yetiCtx.fillStyle = '#63c2f8';
      yetiCtx.fillRect(12, 16, 24, 32);

      yetiCtx.beginPath();
      yetiCtx.arc(24, 16, 12, 0, Math.PI * 2);
      yetiCtx.fill();

      yetiCtx.fillStyle = '#f00';
      yetiCtx.beginPath();
      yetiCtx.arc(20, 12, 2, 0, Math.PI * 2);
      yetiCtx.arc(28, 12, 2, 0, Math.PI * 2);
      yetiCtx.fill();

      yetiCtx.fillStyle = '#63c2f8';
      yetiCtx.fillRect(4, 20, 8, 16);
      yetiCtx.fillRect(36, 20, 8, 16);

      sprites.yeti = yetiCanvas;
    }

    return sprites;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sprites = generateSprites();
      setGameState(prev => ({ ...prev, sprites }));
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setGameState(prev => {
        let newState = { ...prev };
        newState.keys.add(e.key);

        if ((newState.gameMode === 'start' || newState.gameMode === 'gameover') && e.key === 'Enter') {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          newState = startGame(newState);
        }

        return newState;
      });
    };

    const handleKeyUp = (e) => {
      setGameState(prev => {
        const newState = { ...prev };
        newState.keys.delete(e.key);
        return newState;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = (state) => ({
    ...state,
    gameMode: 'playing',
    score: 0,
    distance: 0,
    player: {
      x: state.width / 2,
      y: state.height / 2,
      angle: 0,
      speed: 2,
      crashed: false,
      style: 'normal',
    },
    obstacles: [],
    yeti: {
      active: false,
      x: 0,
      y: 0,
      speed: 0.5,
    },
    tracks: [],
  });

  const updateState = (state) => {
    const newState = { ...state };
    if (newState.gameMode !== 'playing') return newState;

    const { player, keys, width, height, yeti } = newState;

    if (!player.crashed) {
      // Movement
      if (keys.has('ArrowLeft')) {
        player.x -= 3;
        player.style = 'left';
      } else if (keys.has('ArrowRight')) {
        player.x += 3;
        player.style = 'right';
      } else {
        player.style = 'normal';
      }

      player.x = Math.max(0, Math.min(width, player.x));
      newState.distance += player.speed;

      // Record track
      newState.tracks.push({ x: player.x, y: player.y });
      if (newState.tracks.length > 500) {
        newState.tracks.shift();
      }

      // Obstacles
      if (Math.random() < 0.05) {
        newState.obstacles.push({
          x: Math.random() * width,
          y: -50,
          type: Math.random() < 0.7 ? 'tree' : 'rock',
        });
      }

      newState.obstacles = newState.obstacles
        .map(obs => ({ ...obs, y: obs.y + player.speed }))
        .filter(obs => obs.y < height + 50);

      // Yeti
      if (newState.distance > 2000 && !yeti.active) {
        yeti.active = true;
        yeti.x = player.x;
        yeti.y = -100;
      }

      if (yeti.active) {
        const dx = player.x - yeti.x;
        const dy = player.y - yeti.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 30) {
          newState.gameMode = 'gameover';
        } else {
          if (dy > 0) {
            yeti.x += (dx / dist) * yeti.speed;
            yeti.y += (dy / dist) * yeti.speed;
          } else {
            yeti.x += (dx / dist) * yeti.speed;
            yeti.y += Math.min(0, (dy / dist) * (yeti.speed * 0.2));
          }
        }
      }

      // Collisions
      for (const obs of newState.obstacles) {
        const dx = player.x - obs.x;
        const dy = player.y - obs.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) {
          player.crashed = true;
          player.style = 'crashed';
          setTimeout(() => {
            setGameState(ps => ({ ...ps, gameMode: 'gameover' }));
          }, 1000);
          break;
        }
      }

      newState.score = Math.floor(newState.distance / 10);
    }

    return newState;
  };

  const renderState = (state, ctx) => {
    const { width, height, player, obstacles, yeti, sprites, gameMode, score, distance, tracks } = state;

    // Background
    ctx.fillStyle = '#16252f';
    ctx.fillRect(0, 0, width, height);

    // Draw vertical tracks:
    // For each consecutive pair of track points, draw two vertical lines:
    // Use p1.x for both ends of the vertical segment, ensuring a straight vertical line.
    ctx.strokeStyle = '#283c49';
    ctx.lineWidth = 2;
    for (let i = 1; i < tracks.length; i++) {
      const p1 = tracks[i - 1];
      const p2 = tracks[i];

      // Left line
      ctx.beginPath();
      ctx.moveTo(p1.x - trackGap / 2, p1.y);
      ctx.lineTo(p1.x - trackGap / 2, p2.y);
      ctx.stroke();

      // Right line
      ctx.beginPath();
      ctx.moveTo(p1.x + trackGap / 2, p1.y);
      ctx.lineTo(p1.x + trackGap / 2, p2.y);
      ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f1f4f8';

    if (gameMode === 'start') {
      ctx.font = '30px Plus Jakarta Sans';
      ctx.fillText('SkiGame 404', width / 2, height / 2 - 60);
      ctx.font = '20px Plus Jakarta Sans';
      ctx.fillText('Use Arrow Keys to ski', width / 2, height / 2);
      ctx.fillText('Avoid trees, rocks, and... something else', width / 2, height / 2 + 30);
      ctx.fillText('Press Enter to start', width / 2, height / 2 + 80);
      return;
    }

    if (gameMode === 'gameover') {
      ctx.font = '30px Plus Jakarta Sans';
      ctx.fillText('Game Over!', width / 2, height / 2 - 30);
      ctx.font = '20px Plus Jakarta Sans';
      ctx.fillText(`Score: ${score}`, width / 2, height / 2 + 10);
      ctx.fillText('Press Enter to restart', width / 2, height / 2 + 50);
      return;
    }

    // Draw obstacles
    obstacles.forEach(obs => {
      const sprite = obs.type === 'tree' ? sprites.tree : sprites.rock;
      ctx.drawImage(sprite, obs.x - sprite.width / 2, obs.y - sprite.height / 2);
    });

    // Draw player
    const playerSprite = sprites[
      player.crashed ? 'skierCrashed' :
        `skier${player.style.charAt(0).toUpperCase() + player.style.slice(1)}`
    ];
    ctx.drawImage(playerSprite,
      player.x - playerSprite.width / 2,
      player.y - playerSprite.height / 2,
    );

    // Draw yeti
    if (yeti.active) {
      ctx.drawImage(sprites.yeti,
        yeti.x - sprites.yeti.width / 2,
        yeti.y - sprites.yeti.height / 2,
      );
    }

    // HUD
    ctx.font = '20px Plus Jakarta Sans';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Warning before yeti
    if (!yeti.active && distance > 1500) {
      ctx.textAlign = 'center';
      const warningOpacity = Math.sin(Date.now() / 200) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 0, 0, ${warningOpacity})`;
      ctx.font = 'bold 20px Plus Jakarta Sans';
      ctx.fillText('Something is coming...', width / 2, 30);

      const distanceToYeti = 2000 - distance;
      if (distanceToYeti <= 300) {
        ctx.fillStyle = '#FF0000';
        ctx.fillText(`${Math.max(0, Math.floor(distanceToYeti))}m until...`, width / 2, 60);
      }

      if (distanceToYeti <= 200) {
        const snowflakes = Math.floor((200 - distanceToYeti) / 10);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let i = 0; i < snowflakes; i++) {
          const x = Math.random() * width;
          const y = Math.random() * 100;
          const size = Math.random() * 3 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  // Game loop
  useEffect(() => {
    if (!canvasRef.current || !gameState.sprites) return;
    const ctx = canvasRef.current.getContext('2d');
    let animationFrameId;

    const gameLoop = () => {
      setGameState(prev => {
        const updated = updateState(prev);
        renderState(updated, ctx);
        return updated;
      });
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState.sprites]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: '#1d2e39' }} tabIndex="0">
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#f1f4f8' }}>SkiGame 404</h1>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={gameState.width}
          height={gameState.height}
          className="border-2 rounded-lg shadow-lg"
          style={{ borderColor: '#f1f4f8' }}
        />
      </div>
      <div className="mt-4" style={{ color: '#f1f4f8' }}>
        Use Arrow Keys to move | Press Enter to start
      </div>
    </div>
  );
};

export default SkiGameGame;
