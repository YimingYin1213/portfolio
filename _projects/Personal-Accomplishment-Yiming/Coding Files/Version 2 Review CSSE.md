---
layout: post
title: Version 2 Review CSSE
description: Animated CSSE title screen for the Personal Accomplishment project.
category: Personal Accomplishment
breadcrumb: true
permalink: /personal-accomplishment-yiming/version-2-review-csse/
---

<style>
  .version-two-stage {
    min-height: 70vh;
    display: grid;
    place-items: center;
    padding: 3rem 1.5rem;
    background:
      radial-gradient(circle at top, rgba(39, 157, 255, 0.28), transparent 40%),
      linear-gradient(180deg, #020617 0%, #050b1b 55%, #02040b 100%);
    border-radius: 24px;
    overflow: hidden;
  }

  .version-two-stage.is-playing {
    align-items: stretch;
  }

  .version-two-panel {
    width: min(92vw, 980px);
    display: grid;
    justify-items: center;
    gap: 0.85rem;
    text-align: center;
  }

  .version-two-panel.is-hidden {
    display: none;
  }

  .version-two-caption {
    margin: 0;
    color: #96b7e8;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.9rem;
  }

  .version-two-canvas {
    width: min(76vw, 720px);
    aspect-ratio: 355.5 / 316;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    filter: drop-shadow(0 0 18px rgba(67, 164, 255, 0.4));
  }

  .version-two-start {
    opacity: 0;
    transform: translateY(18px);
    pointer-events: none;
    margin-top: 0.2rem;
    padding: 1rem 2.4rem;
    border: 1px solid rgba(125, 211, 252, 0.7);
    border-radius: 999px;
    background: rgba(8, 47, 73, 0.7);
    color: #e0f2fe;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: opacity 320ms ease, transform 320ms ease, box-shadow 320ms ease;
    box-shadow: 0 0 0 rgba(56, 189, 248, 0);
  }

  .version-two-start.is-visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    box-shadow: 0 0 22px rgba(56, 189, 248, 0.28);
  }

  .version-two-game {
    width: min(96vw, 1140px);
    display: none;
    gap: 0.85rem;
    justify-items: center;
  }

  .version-two-game.is-visible {
    display: grid;
  }

  .version-two-game-copy {
    display: grid;
    gap: 0.25rem;
    justify-items: center;
    text-align: center;
  }

  .version-two-game-copy p {
    margin: 0;
  }

  .version-two-game-title {
    color: #e2f1ff;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .version-two-game-hint {
    color: #96b7e8;
    font-size: 0.92rem;
  }

  .version-two-game-frame {
    width: 100%;
    padding: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.28);
    border-radius: 28px;
    background: rgba(2, 10, 24, 0.72);
    box-shadow: inset 0 0 0 1px rgba(14, 116, 144, 0.28), 0 25px 55px rgba(2, 8, 23, 0.35);
  }

  .version-two-game-canvas {
    width: 100%;
    display: block;
    border-radius: 18px;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    background: #020617;
  }
</style>

<section class="version-two-stage">
  <div class="version-two-panel" id="version-two-title-panel">
    <p class="version-two-caption">Version 2 Review</p>
    <canvas
      class="version-two-canvas"
      id="version-two-title"
      width="711"
      height="632"
      aria-label="Animated CSSE title"
    ></canvas>
    <button class="version-two-start" id="version-two-start" type="button">Start</button>
  </div>

  <div class="version-two-game" id="version-two-game">
    <div class="version-two-game-copy">
      <p class="version-two-game-title">Version 2 Environment</p>
      <p class="version-two-game-hint">Use A and D or the arrow keys to move. Press Space to jump.</p>
    </div>
    <div class="version-two-game-frame">
      <canvas
        class="version-two-game-canvas"
        id="version-two-game-canvas"
        width="1280"
        height="576"
        aria-label="Version 2 side-scrolling environment"
      ></canvas>
    </div>
  </div>
</section>

<script>
  (() => {
    const stage = document.querySelector('.version-two-stage');
    const titlePanel = document.getElementById('version-two-title-panel');
    const gamePanel = document.getElementById('version-two-game');
    const canvas = document.getElementById('version-two-title');
    const startButton = document.getElementById('version-two-start');
    const gameCanvas = document.getElementById('version-two-game-canvas');
    if (!stage || !titlePanel || !gamePanel || !canvas || !startButton || !gameCanvas) {
      return;
    }

    const context = canvas.getContext('2d');
    const gameContext = gameCanvas.getContext('2d');
    const sprite = new Image();
    const columns = 4;
    const rows = 3;
    const totalFrames = columns * rows;
    const frameDurationMs = 190;
    const keys = new Set();
    let activePlayer = null;
    let gameStarted = false;
    let assetsPromise;
    let animationFrameId = 0;

    const drawFrame = (frameIndex) => {
      const frameWidth = sprite.naturalWidth / columns;
      const frameHeight = sprite.naturalHeight / rows;
      const column = frameIndex % columns;
      const row = Math.floor(frameIndex / columns);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = false;
      context.drawImage(
        sprite,
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    sprite.onload = () => {
      let frameIndex = 0;
      drawFrame(frameIndex);

      const intervalId = window.setInterval(() => {
        frameIndex += 1;
        if (frameIndex >= totalFrames) {
          window.clearInterval(intervalId);
          drawFrame(totalFrames - 1);
          startButton.classList.add('is-visible');
          return;
        }

        drawFrame(frameIndex);
      }, frameDurationMs);
    };

    const loadImage = (source) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = source;
    });

    const loadAssets = () => {
      if (!assetsPromise) {
        assetsPromise = Promise.all([
          loadImage('{{ site.baseurl }}/images/projects/Personal-Accomplishment-Yiming/Map 1.png'),
          loadImage('{{ site.baseurl }}/images/projects/Personal-Accomplishment-Yiming/Map 2.png'),
          loadImage('{{ site.baseurl }}/images/projects/Personal-Accomplishment-Yiming/Map 3.png'),
          loadImage('{{ site.baseurl }}/images/projects/Personal-Accomplishment-Yiming/Sprites/Main Character.png')
        ]);
      }

      return assetsPromise;
    };

    const startGame = async () => {
      if (gameStarted) {
        return;
      }

      gameStarted = true;
      startButton.disabled = true;
      startButton.textContent = 'Loading';

      try {
        const [map1, map2, map3, characterSheet] = await loadAssets();
        titlePanel.classList.add('is-hidden');
        gamePanel.classList.add('is-visible');
        stage.classList.add('is-playing');
        runEnvironment([map1, map2, map3], characterSheet);
      } catch (error) {
        startButton.disabled = false;
        startButton.textContent = 'Start';
        gameStarted = false;
      }
    };

    const runEnvironment = (maps, characterSheet) => {
      const viewportWidth = gameCanvas.width;
      const viewportHeight = gameCanvas.height;
      const mapScale = viewportHeight / maps[0].naturalHeight;
      const mapWidth = maps[0].naturalWidth * mapScale;
      const worldWidth = mapWidth * maps.length;
      const frameColumns = 5;
      const frameRows = 5;
      const frameWidth = characterSheet.naturalWidth / frameColumns;
      const frameHeight = characterSheet.naturalHeight / frameRows;
      const playerWidth = 86;
      const playerHeight = 114;
      const gravity = 1800;
      const jumpVelocity = 780;
      const moveSpeed = 320;
      const leftWall = playerWidth * 0.55;
      const rightWall = worldWidth - playerWidth * 0.55;

      const getGroundY = () => viewportHeight * 0.79;

      const player = {
        x: leftWall + 36,
        y: 0,
        vx: 0,
        vy: 0,
        grounded: false,
        facing: 'right',
        currentRow: 0,
        frameIndex: 0,
        frameElapsed: 0,
      };
      player.y = getGroundY(player.x);
      player.grounded = true;
      activePlayer = player;

      let cameraX = 0;
      let lastTime = performance.now();

      const drawBackground = () => {
        gameContext.clearRect(0, 0, viewportWidth, viewportHeight);
        maps.forEach((map, index) => {
          const drawX = index * mapWidth - cameraX;
          gameContext.drawImage(map, drawX, 0, mapWidth, viewportHeight);
        });

        const gradient = gameContext.createLinearGradient(0, viewportHeight - 120, 0, viewportHeight);
        gradient.addColorStop(0, 'rgba(2, 6, 23, 0)');
        gradient.addColorStop(1, 'rgba(2, 6, 23, 0.38)');
        gameContext.fillStyle = gradient;
        gameContext.fillRect(0, 0, viewportWidth, viewportHeight);
      };

      const drawPlayer = () => {
        const sourceX = player.frameIndex * frameWidth;
        const sourceY = player.currentRow * frameHeight;
        const drawX = player.x - cameraX - playerWidth / 2;
        const drawY = player.y - playerHeight;

        gameContext.imageSmoothingEnabled = false;
        gameContext.drawImage(
          characterSheet,
          sourceX,
          sourceY,
          frameWidth,
          frameHeight,
          drawX,
          drawY,
          playerWidth,
          playerHeight
        );
      };

      const update = (deltaSeconds) => {
        const movingLeft = keys.has('ArrowLeft') || keys.has('a') || keys.has('A');
        const movingRight = keys.has('ArrowRight') || keys.has('d') || keys.has('D');
        const horizontalInput = Number(movingRight) - Number(movingLeft);

        player.vx = horizontalInput * moveSpeed;
        if (horizontalInput < 0) {
          player.facing = 'left';
        } else if (horizontalInput > 0) {
          player.facing = 'right';
        }

        player.vy += gravity * deltaSeconds;
        player.x = Math.max(leftWall, Math.min(rightWall, player.x + player.vx * deltaSeconds));
        player.y += player.vy * deltaSeconds;

        const groundY = getGroundY(player.x);
        if (player.y >= groundY) {
          player.y = groundY;
          player.vy = 0;
          player.grounded = true;
        } else {
          player.grounded = false;
        }

        if (horizontalInput === 0) {
          player.currentRow = 0;
        } else if (horizontalInput < 0) {
          player.currentRow = 1;
        } else {
          player.currentRow = 3;
        }

        const animationSpeed = horizontalInput === 0 ? 0.22 : 0.12;
        player.frameElapsed += deltaSeconds;
        if (player.frameElapsed >= animationSpeed) {
          player.frameElapsed = 0;
          player.frameIndex = (player.frameIndex + 1) % frameColumns;
        }

        cameraX = Math.max(0, Math.min(worldWidth - viewportWidth, player.x - viewportWidth * 0.34));
      };

      const render = () => {
        drawBackground();
        drawPlayer();
      };

      const loop = (currentTime) => {
        const deltaSeconds = Math.min(0.033, (currentTime - lastTime) / 1000);
        lastTime = currentTime;
        update(deltaSeconds);
        render();
        animationFrameId = window.requestAnimationFrame(loop);
      };

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('keydown', (event) => {
      const key = event.key;
      if (['ArrowLeft', 'ArrowRight', ' ', 'Spacebar', 'a', 'A', 'd', 'D'].includes(key)) {
        event.preventDefault();
      }

      if (key === ' ' || key === 'Spacebar') {
        keys.add('Space');
      } else {
        keys.add(key);
      }

      if ((key === ' ' || key === 'Spacebar') && gameStarted) {
        if (activePlayer && activePlayer.grounded) {
          activePlayer.vy = -780;
          activePlayer.grounded = false;
        }
      }
    });

    window.addEventListener('keyup', (event) => {
      const key = event.key;
      if (key === ' ' || key === 'Spacebar') {
        keys.delete('Space');
      } else {
        keys.delete(key);
      }
    });

    startButton.addEventListener('click', startGame);

    sprite.src = '{{ site.baseurl }}/images/projects/Personal-Accomplishment-Yiming/Sprites/Title.png';
  })();
</script>