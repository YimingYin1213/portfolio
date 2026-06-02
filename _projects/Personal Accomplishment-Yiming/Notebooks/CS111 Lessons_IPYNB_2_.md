---
layout: post
codemirror: True
title: CS111 College Ready
description: CSSE topic-by-topic explanation of the Aquatic game level code.
permalink: /personal-accomplishment-yiming/cs111-college-ready/
redirect_from: ['/personal-accomplishment-yiming/cs111-notes/', '/personal-accomplishment-yiming/cs111-notes', '/personal-accomplishment-yiming/cs111-lessons/', '/cs111-notes/', '/cs111-notes']
---

# CS111 College Ready
This notebook explains the code in `Aquatic For Reference.js` using CSSE topics like functions, arrays, booleans, conditionals, classes, constructors, methods, strings, data abstraction, math expressions, variables, and iteration.
Each section below connects one CSSE topic to a real code pattern from the Aquatic level file.
Before the topic-by-topic breakdown, the notebook now includes a small playable aquatic runner and a preview of the assets currently wired into the published site.

<div style="margin: 12px 0 16px 0;">
  <a href="{{ site.baseurl }}/personal-accomplishment-yiming/cs111-layered-learning/" style="display:inline-block; background:#f7b267; color:#102331; font-weight:700; text-decoration:none; padding:10px 14px; border-radius:10px; border:1px solid rgba(16,35,49,0.22);">
    Open CS111 Layered Learning Explorer
  </a>
</div>

## Quick Aquatic Game Runner
Use this runner at the top to test a compact Aquatic-style loop before going lesson-by-lesson.

<style>
  .aquatic-runner {
    margin: 12px 0 18px 0;
    border: 1px solid rgba(16, 35, 49, 0.2);
    border-radius: 12px;
    overflow: hidden;
    background: #041623;
  }
  .aquatic-runner-head {
    padding: 10px 12px;
    color: #dff7ff;
    font-weight: 700;
    background: rgba(5, 34, 51, 0.9);
    border-bottom: 1px solid rgba(120, 207, 255, 0.25);
  }
  .aquatic-runner-body {
    padding: 10px;
  }
  .aquatic-runner-controls {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .aquatic-runner-btn {
    border: 1px solid rgba(120, 207, 255, 0.45);
    background: rgba(120, 207, 255, 0.12);
    color: #dff7ff;
    border-radius: 8px;
    padding: 6px 10px;
    cursor: pointer;
    font-weight: 700;
  }
  .aquatic-runner-status {
    color: #b9ecff;
    font-size: 0.9rem;
  }
  .aquatic-runner-canvas {
    width: 100%;
    max-width: 100%;
    height: clamp(480px, 56.25vw, 560px);
    min-height: 480px;
    border: 1px solid rgba(120, 207, 255, 0.28);
    border-radius: 10px;
    display: block;
    background: #021019;
    overflow: hidden;
  }
  .aquatic-runner-help {
    color: #b9ecff;
    font-size: 0.85rem;
    margin-top: 8px;
  }
</style>

<div class="aquatic-runner" id="aquatic-runner-box">
  <div class="aquatic-runner-head">Playable Aquatic Game Runner</div>
  <div class="aquatic-runner-body">
    <div class="aquatic-runner-controls">
      <button class="aquatic-runner-btn" id="aquatic-start" type="button">Start Aquatic</button>
      <button class="aquatic-runner-btn" id="aquatic-reset" type="button">Restart Aquatic</button>
      <span class="aquatic-runner-status" id="aquatic-status">Status: ready (uses Aquatic For Reference logic)</span>
    </div>
    <div id="aquatic-engine-container" class="aquatic-runner-canvas"></div>
    <div class="aquatic-runner-help">This runner directly loads <strong>GameLevelAquaticGameLevel</strong> from <code>assets/js/GameEnginev1.1/GameLevelAquaticGameLevel.js</code> (Aquatic For Reference implementation).</div>
  </div>
</div>

<script type="module">
(async function () {
  const mount = document.getElementById('aquatic-engine-container');
  const startBtn = document.getElementById('aquatic-start');
  const resetBtn = document.getElementById('aquatic-reset');
  const statusNode = document.getElementById('aquatic-status');
  if (!mount || !startBtn || !resetBtn || !statusNode) return;

  let Game = null;
  let GameControl = null;
  let AquaticLevel = null;
  let gameCore = null;
  let resizeTimer = null;

  async function ensureModules() {
    if (Game && GameControl && AquaticLevel) return;
    const [gameModule, controlModule, aquaticModule] = await Promise.all([
      import('{{ site.baseurl }}/assets/js/GameEnginev1.1/essentials/Game.js'),
      import('{{ site.baseurl }}/assets/js/GameEnginev1.1/essentials/GameControl.js'),
      import('{{ site.baseurl }}/assets/js/GameEnginev1.1/GameLevelAquaticGameLevel.js')
    ]);
    Game = gameModule.default;
    GameControl = controlModule.default;
    AquaticLevel = aquaticModule.default || (aquaticModule.gameLevelClasses && aquaticModule.gameLevelClasses[0]);
    if (!Game || !GameControl || !AquaticLevel) {
      throw new Error('Failed to load Aquatic runtime modules.');
    }
  }

  function cleanupGame() {
    if (!gameCore) return;
    try {
      gameCore.gameControl?.currentLevel?.destroy?.();
      gameCore.gameControl?.cleanupInteractionHandlers?.();
    } catch (_) {
      // Best effort cleanup to avoid leaked handlers.
    }
    mount.innerHTML = '';
    gameCore = null;
  }

  async function startGame() {
    startBtn.disabled = true;
    try {
      statusNode.textContent = 'Status: loading Aquatic For Reference...';
      await ensureModules();
      cleanupGame();

      const environment = {
        path: '{{ site.baseurl }}',
        gameContainer: mount,
        gameLevelClasses: [AquaticLevel],
        innerWidth: Math.max(320, Math.floor(mount.clientWidth || 920)),
        innerHeight: Math.max(480, Math.floor(mount.clientHeight || 520)),
        javaURI: window.javaURI,
        pythonURI: window.pythonURI,
        disablePauseMenu: true,
        disableContainerAdjustment: true
      };

      gameCore = Game.main(environment, GameControl);
      statusNode.textContent = 'Status: running Aquatic level';
    } catch (err) {
      statusNode.textContent = `Status: error (${err && err.message ? err.message : err})`;
      console.error(err);
    } finally {
      startBtn.disabled = false;
    }
  }

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', async () => {
    statusNode.textContent = 'Status: restarting Aquatic level...';
    await startGame();
  });

  // Re-fit game runtime when viewport changes so the canvas doesn't overflow.
  window.addEventListener('resize', () => {
    if (!gameCore) return;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      statusNode.textContent = 'Status: resizing runner...';
      startGame();
    }, 220);
  });
})();
</script>

## Interactive Rubric Dashboard

<style>
  .cs111-ui {
    --ink: #e9f7ff;
    --panel: #0a2436;
    --line: rgba(120, 207, 255, 0.35);
    --accent: #2fd6a2;
    --accent2: #ffd166;
    background: linear-gradient(145deg, #071a2a 0%, #0b2b40 100%);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 16px;
    color: var(--ink);
    margin: 12px 0 18px 0;
  }
  .cs111-ui h3 { margin: 0 0 10px 0; letter-spacing: 0.02em; }
  .cs111-ui .row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px; }
  .cs111-ui input, .cs111-ui select {
    background: #081a28;
    color: #e7f6ff;
    border: 1px solid rgba(137, 211, 255, 0.35);
    border-radius: 10px;
    padding: 8px 10px;
    font-size: 0.95rem;
  }
  .cs111-ui input { min-width: 260px; flex: 1; }
  .cs111-ui .chip {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 209, 102, 0.45);
    background: rgba(255, 209, 102, 0.12);
    color: #fff6de;
    font-size: 0.82rem;
    margin-right: 6px;
    margin-bottom: 6px;
  }
  .cs111-ui .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px;
    margin-top: 10px;
  }
  .cs111-ui .card {
    background: rgba(7, 25, 40, 0.86);
    border: 1px solid rgba(130, 219, 255, 0.25);
    border-radius: 12px;
    padding: 10px;
    transition: transform 120ms ease, border-color 120ms ease;
  }
  .cs111-ui .card:hover { transform: translateY(-2px); border-color: rgba(130, 219, 255, 0.55); }
  .cs111-ui .card a { color: #9be4ff; text-decoration: none; font-weight: 700; }
  .cs111-ui .muted { opacity: 0.85; font-size: 0.88rem; }
  .cs111-ui .progress { margin-top: 12px; }
  .cs111-ui progress { width: 100%; height: 14px; accent-color: var(--accent); }
</style>

<div class="cs111-ui" id="cs111-ui-top">
  <h3>Interactive Rubric Dashboard</h3>
  <div class="row">
    <input id="cs111-search" type="text" placeholder="Search objective name or keyword">
    <select id="cs111-category">
      <option value="all">All Categories</option>
      <option value="oop">OOP</option>
      <option value="control">Control Structures</option>
      <option value="types">Data Types</option>
      <option value="ops">Operators</option>
      <option value="io">Input Output</option>
      <option value="docs">Documentation</option>
      <option value="debug">Debugging Testing</option>
    </select>
  </div>
  <div>
    <span class="chip">Search + filter</span>
    <span class="chip">Objective jump links</span>
    <span class="chip">Progress memory</span>
  </div>
  <div class="grid" id="cs111-cards">
    <label class="card" data-cat="oop" data-text="writing classes methods parameters instantiation inheritance overriding constructor">
      <input type="checkbox" class="cs111-check">
      <a href="#11-writing-classes">1.x OOP Objectives</a>
      <div class="muted">Classes, methods, instantiation, inheritance</div>
    </label>
    <label class="card" data-cat="control" data-text="iteration conditionals nested">
      <input type="checkbox" class="cs111-check">
      <a href="#21-iteration">2.x Control Structures</a>
      <div class="muted">for/while/forEach and multi-level if logic</div>
    </label>
    <label class="card" data-cat="types" data-text="numbers strings booleans arrays objects json">
      <input type="checkbox" class="cs111-check">
      <a href="#31-numbers">3.x Data Types</a>
      <div class="muted">Number/string/boolean/array/object evidence</div>
    </label>
    <label class="card" data-cat="ops" data-text="math operator string concat boolean expressions">
      <input type="checkbox" class="cs111-check">
      <a href="#41-mathematical-operators">4.x Operators</a>
      <div class="muted">Arithmetic, string operations, && || !</div>
    </label>
    <label class="card" data-cat="io" data-text="keyboard canvas gameenv api async json">
      <input type="checkbox" class="cs111-check">
      <a href="#51-keyboard-input">5.x Input Output</a>
      <div class="muted">Controls, rendering, API, async, parsing</div>
    </label>
    <label class="card" data-cat="docs" data-text="comments mini lesson highlights">
      <input type="checkbox" class="cs111-check">
      <a href="#61-code-comments">6.x Documentation</a>
      <div class="muted">Comments, lesson design, highlighted code</div>
    </label>
    <label class="card" data-cat="debug" data-text="console hitbox source network application element testing">
      <input type="checkbox" class="cs111-check">
      <a href="#71-console-debugging">7.x Debugging and Testing</a>
      <div class="muted">Debug tools + verification evidence</div>
    </label>
  </div>
  <div class="progress">
    <div class="muted">Review completion</div>
    <progress id="cs111-progress" max="7" value="0"></progress>
    <div class="muted"><span id="cs111-progress-text">0</span> / 7 checked</div>
  </div>
</div>

<script>
(function () {
  const root = document.getElementById('cs111-ui-top');
  if (!root) return;
  const search = root.querySelector('#cs111-search');
  const category = root.querySelector('#cs111-category');
  const cards = Array.from(root.querySelectorAll('.card'));
  const checks = Array.from(root.querySelectorAll('.cs111-check'));
  const bar = root.querySelector('#cs111-progress');
  const text = root.querySelector('#cs111-progress-text');
  const storeKey = 'cs111_rubric_dashboard_checks_v2';

  function renderFilter() {
    const q = (search.value || '').trim().toLowerCase();
    const cat = category.value;
    cards.forEach((card) => {
      const okCat = cat === 'all' || card.dataset.cat === cat;
      const hay = (card.dataset.text || '').toLowerCase();
      card.style.display = okCat && (q.length === 0 || hay.includes(q)) ? '' : 'none';
    });
  }

  function renderProgress() {
    const checked = checks.filter((x) => x.checked).length;
    bar.value = checked;
    text.textContent = String(checked);
    try { localStorage.setItem(storeKey, JSON.stringify(checks.map((x) => x.checked ? 1 : 0))); } catch (_) {}
  }

  try {
    const raw = localStorage.getItem(storeKey);
    const data = raw ? JSON.parse(raw) : null;
    if (Array.isArray(data)) checks.forEach((x, i) => { x.checked = data[i] === 1; });
  } catch (_) {}

  search.addEventListener('input', renderFilter);
  category.addEventListener('change', renderFilter);
  checks.forEach((x) => x.addEventListener('change', renderProgress));
  renderFilter();
  renderProgress();
})();
</script>

<style>
  .lesson-inline-runner {
    margin: 10px 0 16px 0;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(120, 207, 255, 0.35);
    background: rgba(8, 26, 40, 0.75);
  }
  .lesson-inline-runner .title {
    font-weight: 700;
    margin-bottom: 6px;
    color: #cdefff;
  }
  .lesson-inline-runner button {
    border: 1px solid rgba(47, 214, 162, 0.65);
    background: rgba(47, 214, 162, 0.18);
    color: #e8fff8;
    border-radius: 8px;
    padding: 6px 10px;
    cursor: pointer;
    margin-bottom: 8px;
    font-weight: 700;
  }
  .lesson-inline-runner pre {
    margin: 0;
    background: rgba(4, 15, 24, 0.8);
    border: 1px solid rgba(120, 207, 255, 0.22);
    border-radius: 8px;
    padding: 8px;
    overflow: auto;
    white-space: pre-wrap;
    font-size: 0.84rem;
  }
  .lesson-inline-runner .output {
    margin-top: 8px;
    color: #bde8ff;
    font-size: 0.84rem;
    white-space: pre-wrap;
  }
</style>

<script>
(function () {
  const runnerMap = {
    '1.1': "class Character {}\nclass Player extends Character {}\nconsole.log('Player inherits Character:', new Player() instanceof Character);",
    '1.2': "function applyPlayerDamage(hp, dmg){ return Math.max(0, hp - dmg); }\nconsole.log('HP after hit:', applyPlayerDamage(100, 25));",
    '1.3': "class Npc { constructor(id){ this.id = id; } }\nconst gameObjects = [];\ngameObjects.push(new Npc('guardian'));\nconsole.log('Objects:', gameObjects.length);",
    '1.4': "class GameObject { update(){ return 'base'; } }\nclass Character extends GameObject {}\nclass Player extends Character {}\nconsole.log(new Player().update());",
    '1.5': "class Enemy { update(){ return 'enemy'; } }\nclass Shark extends Enemy { update(){ return super.update() + '-rush'; } }\nconsole.log(new Shark().update());",
    '1.6': "class Parent { constructor(v){ this.v = v; } }\nclass Child extends Parent { constructor(v){ super(v); this.ready = true; } }\nconsole.log(new Child(7));",
    '2.1': "const thresholds = [0.75,0.5,0.25];\nconst hp = 46;\nthresholds.forEach(t => { if (hp <= 100 * t) console.log('trigger', t); });",
    '2.2': "const q1 = { completed: true };\nconst q2 = { accepted: false };\nif (q1.completed && !q2.accepted) console.log('Offer Quest 2');",
    '2.3': "const s = { p2: true, p3: true, next: 10 };\nconst now = 20;\nif (s.p2 && s.p3 && now >= s.next) console.log('Laser ready');",
    '3.1': "const hp = 48, maxHp = 100;\nconsole.log('hpRatio:', hp / maxHp);",
    '3.2': "const key = 'aquatic_selected_sprite_v1';\nconst path = '/images/gamebuilder/sprites';\nconsole.log(key, path);",
    '3.3': "const bossState = { active: true };\nif (bossState.active) console.log('Boss logic active');",
    '3.4': "const thresholds = [0.75,0.5,0.25];\nconsole.log('Count:', thresholds.length);",
    '3.5': "const guardianData = { orientation: { rows: 6, columns: 6 } };\nconsole.log(guardianData.orientation.rows);",
    '4.1': "const maxHp = 200, t = 0.5, hp = 99;\nconsole.log('trigger?', hp <= maxHp * t);",
    '4.2': "for (let i = 0; i < 3; i++) console.log(`starfish_${i}`);",
    '4.3': "const canCast = true && !false && (3 > 1);\nconsole.log('canCast:', canCast);",
    '5.1': "const keypress = { up: 87, right: 68 };\nconst pressed = [87, 68];\nconsole.log('up-right?', pressed.includes(keypress.up) && pressed.includes(keypress.right));",
    '5.2': "function draw(){ return 'draw frame'; }\nfunction update(){ return draw(); }\nconsole.log(update());",
    '5.3': "const gameEnv = { created: false, create(){ this.created = true; } };\ngameEnv.create();\nconsole.log('created:', gameEnv.created);",
    '5.4': "async function fakeFetch(){ return { ok: true, json: async () => ({ status: 'ok' }) }; }\nconst r = await fakeFetch();\nconsole.log((await r.json()).status);",
    '5.5': "async function handleMoodClick(mood){ return `sent-${mood}`; }\nconsole.log(await handleMoodClick('happy'));",
    '5.6': "const response = { json: async () => ({ saved: true }) };\nconst result = await response.json();\nconsole.log('saved:', result.saved);",
    '6.1': "// Initialize touch controls for mobile devices\nconst touchEnabled = true;\nconsole.log('touchEnabled:', touchEnabled);",
    '6.2': "const objective = '1.4 Inheritance';\nconst evidence = 'class Player extends Character';\nconsole.log(objective, '=>', evidence);",
    '6.3': "const gameObjects = [];\nconst boss = { id: 'boss' };\ngameObjects.push(boss);\nconsole.log('registered:', gameObjects[0].id);"
  };

  function mountRunner(heading, lessonId) {
    if (!heading || !lessonId) return;
    if (heading.nextElementSibling && heading.nextElementSibling.classList && heading.nextElementSibling.classList.contains('lesson-inline-runner')) return;

    const wrap = document.createElement('div');
    wrap.className = 'lesson-inline-runner';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `Lesson Runner ${lessonId}`;

    const btn = document.createElement('button');
    btn.textContent = 'Run This Lesson';

    const code = document.createElement('pre');
    const snippet = runnerMap[lessonId] || `console.log('Runner for ${lessonId}');`;
    code.textContent = `%%js\n\n${snippet}`;

    const out = document.createElement('div');
    out.className = 'output';
    out.textContent = 'Output appears here.';

    btn.addEventListener('click', async () => {
      const logs = [];
      const capture = (...args) => logs.push(args.map((x) => String(x)).join(' '));
      try {
        const fn = new Function('console', `return (async () => { ${snippet} })();`);
        await fn({ log: capture });
        out.textContent = logs.length ? logs.join('\n') : 'Snippet ran with no console output.';
      } catch (err) {
        out.textContent = `Runner error: ${err && err.message ? err.message : err}`;
      }
    });

    wrap.appendChild(title);
    wrap.appendChild(btn);
    wrap.appendChild(code);
    wrap.appendChild(out);
    heading.insertAdjacentElement('afterend', wrap);
  }

  function addRunnersToLessons() {
    const headings = Array.from(document.querySelectorAll('h3'));
    headings.forEach((h) => {
      const text = (h.textContent || '').trim();
      const match = text.match(/^([1-6]\.[1-6])/);
      if (match) mountRunner(h, match[1]);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addRunnersToLessons);
  } else {
    addRunnersToLessons();
  }
})();
</script>

## CS 111 Course Alignment Rubric

### Required Evidence for College Credit
Students must demonstrate competency in all CS 111 learning objectives through their game project. Below is the alignment between CS 111 requirements and project deliverables, with evidence pulled from the Aquatic game level implementation.

| Learning Objective | Project Evidence Required | Assessment Method |
| --- | --- | --- |
| **Object-Oriented Programming** |  |  |
| Writing Classes | Create minimum 2 custom character classes extending base classes. Evidence: `class Player extends Character`, `class Npc extends Character`, `class Shark extends Enemy` in `assets/js/GameEnginev1/essentials/Player.js`, `assets/js/GameEnginev1/essentials/Npc.js`, `assets/js/GameEnginev1/Shark.js`. | Code review: class declarations and `extends` usage |
| Methods & Parameters | Implement methods with parameters. Evidence: `applyPlayerDamage(damage, x, y, source)` and `applyMermaidBossDamage(damage, hitX, hitY)` in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`. | Code review: method signatures with 2+ parameters |
| Instantiation & Objects | Instantiate game objects in level configuration/runtime. Evidence: `const guardian = new Npc(guardianData, this.gameEnv);` and `this.gameEnv.gameObjects.push(guardian);` in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`. | Code review: GameLevel setup and runtime object registration |
| Inheritance (Basic) | Create class hierarchy with 2+ levels. Evidence: `GameObject -> Character -> Player` and `Character -> Npc -> Shark`. | Code review: inheritance chain and shared behavior |
| Method Overriding | Override parent methods (`update()`, interaction handling, behavior methods). Evidence: child entity update and interaction methods in player/NPC/enemy classes. | Code review: polymorphic implementations |
| Constructor Chaining | Use `super()` to chain constructors. Evidence: `super(data, gameEnv)` patterns in entity constructors. | Code review: `super(data, gameEnv)` calls |
| **Control Structures** |  |  |
| Iteration | Use loops for game object arrays and attack phases. Evidence: `thresholds.forEach((threshold) => { ... })`, update loops, projectile iteration. | Code review: `for`, `forEach`, `while` |
| Conditionals | Implement collision checks and state transitions. Evidence: quest/boss transitions such as `if (q1.completed && !q2.accepted) { ... }`. | Code review: `if/else` branches |
| Nested Conditions | Multi-stage combat logic. Evidence: `if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) { ... }`. | Code review: multi-level conditional logic |
| **Data Types** |  |  |
| Numbers | Position, HP, cooldown, and timing tracking. Evidence: `const hpRatio = this.bossState.hp / this.bossState.maxHp;`. | Code review: numeric properties and math usage |
| Strings | Character IDs, paths, and labels. Evidence: `const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';`. | Code review: string literals and concatenation/template usage |
| Booleans | Flags for active/completed states. Evidence: `this.levelCompleted = false;`, `this.bossState.active = true;`. | Code review: boolean state transitions |
| Arrays | Game object collections and threshold lists. Evidence: `const thresholds = [0.75, 0.5, 0.25];`. | Code review: array operations |
| Objects (JSON) | Config/state object literals. Evidence: `const guardianData = { orientation: { ... }, attack: { ... } };`. | Code review: object literal structure |
| **Operators** |  |  |
| Mathematical | Physics/combat calculations. Evidence: `this.bossState.maxHp * threshold`, vector and distance calculations in attacks. | Code review: `+`, `-`, `*`, `/` usage |
| String Operations | Path assembly and identifiers. Evidence: `const backgroundAssetPath = path + '/images/gamebuilder/bg';`. | Code review: concatenation/template literals |
| Boolean Expressions | Compound game-state checks. Evidence: `&&`, `||`, `!` in phase gates and quest flow. | Code review: compound conditions |
| **Input/Output** |  |  |
| Keyboard Input | WASD/keyboard mapping and handlers. Evidence: `this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };` and keydown listeners. | Testing: key event handlers respond correctly |
| Canvas Rendering | Draw/update lifecycle for entities. Evidence: `update() { this.draw(); }` and sprite rendering in character classes. | Code review: render lifecycle methods |
| GameEnv Configuration | Canvas/runtime setup and class registration. Evidence: `this.gameEnv.create();` and level constructor wiring. | Code review: GameEnv setup + GameLevel init |
| API Integration | Fetch-based external communication. Evidence: `await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);`. | Code review: fetch calls with error handling |
| Asynchronous I/O | Non-blocking runtime functions. Evidence: `async handleMoodClick(mood) { const response = await fetch(...); }`. | Code review: async/await flow |
| JSON Parsing | Parse API payloads. Evidence: `const result = await response.json();`. | Code review: response parsing and property access |
| **Documentation** |  |  |
| Code Comments | Intent comments in complex logic. Evidence: `// Initialize touch controls for mobile devices`. | Code review: meaningful comment usage |
| Mini-Lesson Documentation | Notebook sections and rubric mapping for instruction. Evidence: this notebook's rubric + objective sections. | Portfolio review: published mini-lesson |
| Code Highlights | Annotated snippets under each rubric objective. Evidence: objective-specific code blocks in this notebook. | Portfolio review: highlighted explanations |
| **Debugging** |  |  |
| Console Debugging | Runtime diagnostics. Evidence: `console.warn('Unable to play aquatic boss theme', err);`. | Code review: strategic logging/warnings |
| Hit Box Visualization | Collision-distance validation. Evidence: `if (hitDistance < 30) { applyPlayerDamage(...); }`. | Demo: collision boundary verification |
| Source-Level Debugging | Breakpoint-friendly state guards. Evidence: `if (this.bossState.active || this.bossState.introPlayed) return;`. | Demo: stepping through flow in Sources |
| Network Debugging | Request status checks. Evidence: `if (!response.ok) throw new Error('Failed to send mood');`. | Demo: inspect requests and responses |
| Application Debugging | Local/session state verification. Evidence: `localStorage.setItem(...)`, `sessionStorage.setItem(...)`. | Demo: inspect storage state |
| Element Inspection | DOM/canvas inspection logic. Evidence: `if (this.canvas?.parentNode) { this.canvas.parentNode.removeChild(this.canvas); }`. | Demo: inspect DOM/canvas lifecycle |
| **Testing & Verification** |  |  |
| Gameplay Testing | Validate quest/combat flow. Evidence: dialogue progression and boss-state transitions in Aquatic level scripts. | Live demo: complete flow without blockers |
| Integration Testing | Verify backend-connected paths. Evidence: `await fetch(`${this.game.javaURI}/createStats`, { method: 'POST', body: JSON.stringify({ stats, gname, uid }) });`. | Demo: successful integrated requests |
| API Error Handling | Graceful failure handling. Evidence: try/catch around fetch with fallback status UI (`this.showStatus('Network error', true);`). | Code review: explicit error handling |

---

## 1 — Object-Oriented Programming

### 1.1 Writing Classes
A **class** is a blueprint for creating objects. `extends` builds an inheritance chain so classes can reuse behavior. `this.classes` tells the engine what to create at startup.


{% capture challenge0 %}
OOP coverage for 1.1 to 1.6
{% endcapture %}

{% capture code0 %}
// 1.4 Inheritance root
class GameObject {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
  }
  update() {
    return 'base-update';
  }
}

// 1.4 Inheritance middle + 1.6 constructor chaining
class Character extends GameObject {
  constructor(data = null, gameEnv = null) {
    super(gameEnv);
    this.data = data || {};
    this.velocity = { x: 0, y: 0 };
  }
}

// 1.1 Writing classes + 1.6 constructor chaining
class Player extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.id = data?.id ?? 'player';
    this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
    this.pressedKeys = {};
  }

  // 1.2 Methods and parameters
  applyPlayerDamage(damage, source) {
    this.hp = Math.max(0, (this.hp ?? 100) - damage);
    return `Took ${damage} from ${source}. HP=${this.hp}`;
  }

  // 1.5 Method overriding
  update() {
    const parentResult = super.update();
    return `${parentResult} -> player-update`;
  }
}

// 1.3 Instantiation and objects
const gameEnv = { level: 'Aquatic Demo' };
const p1 = new Player({ id: 'aqua_hero' }, gameEnv);

console.log('1.1 class + extends:', p1 instanceof Player, p1 instanceof Character);
console.log('1.2 method params:', p1.applyPlayerDamage(25, 'rocket'));
console.log('1.3 instantiation:', p1.id, p1.keypress.left);
console.log('1.5 overriding:', p1.update());
console.log('1.6 constructor chaining gameEnv:', p1.gameEnv.level);
{% endcapture %}

{% capture source0 %}
```javascript
// Player class extends Character, so Player inherits movement/collision/sprite behavior.
class Player extends Character {
  // Constructor runs when a new Player is created in the level class list.
  constructor(data = null, gameEnv = null) {
    // super(...) calls Character constructor first; required before using this.
    super(data, gameEnv);

    // Player identity in Aquatic (fallback if data.id is missing).
    this.id = data?.id ?? 'player';

    // Default WASD key mapping used by movement listeners.
    this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };

    // Tracks currently pressed keys for continuous movement.
    this.pressedKeys = {};
  }
}

// NPC class extends Character so it can share sprite and interaction lifecycle.
class Npc extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
  }
}

// Shark class extends Enemy (Enemy extends Character), forming a multi-level chain.
class Shark extends Enemy {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    // Enemy-state flag used in collision/combat logic.
    this.playerDestroyed = false;
  }
}

// Aquatic level class: this.classes tells the engine exactly what objects to instantiate.
class GameLevelAquaticGameLevel {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: mermaidNpc },
      { class: Npc, data: slimeNpc },
      { class: Npc, data: kirbyNpc },
      { class: Npc, data: sharkNpc }
    ];
  }
}
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-aquatic-game-level-explanation-0"
   language="javascript"
   challenge=challenge0
   code=code0
   source=source0
%}


### 1.2 Methods & Parameters
A **method** is a class function that uses `this` instance state. **Parameters** let one method handle many callers.

```javascript
applyPlayerDamage(damage, x, y, source) {
  if (!this.bossState.active) return;
  // damage and hit position are parameter-driven
}

applyMermaidBossDamage(damage, hitX, hitY) {
  if (!this.mermaidBossState.active) return;
  // same logic shape, different target state
}

collisionChecks() {
  for (const gameObj of this.gameEnv.gameObjects) {
    if (gameObj instanceof Player) {
      this.isCollision(gameObj);
      if (this.collisionData.hit) return true;
    }
  }
  return false;
}
```

### 1.3 Instantiation & Objects
Instantiation uses `new ClassName(...)` to create independent runtime objects. Aquatic level setup uses both class instances and object-literal configuration.

```javascript
const guardianData = {
  orientation: { rows: 6, columns: 6 },
  attack: { row: 4, start: 0, columns: 5 }
};

const guardian = new Npc(guardianData, this.gameEnv);
this.gameEnv.gameObjects.push(guardian);

this.classes = [
  { class: GameEnvBackground, data: image_data_aquatic }
];
```

### 1.4 Inheritance
Inheritance lets child classes automatically use parent fields/methods without rewriting everything.

```javascript
class GameObject {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    gameEnv.gameObjects.push(this);
  }
}

class Character extends GameObject {
  constructor(data = null, gameEnv = null) {
    super(gameEnv);
    this.velocity = { x: 0, y: 0 };
  }
}

class Player extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
  }
}
```

### 1.5 Method Overriding
Overriding happens when a child defines the same method name as a parent. `super.methodName()` keeps parent behavior and extends it.

```javascript
update() {
  super.update();
  if (!this.playerDestroyed && this.collisionChecks()) {
    this.handleCollisionEvent();
  }
  this.stayWithinCanvas();
}

handleCollisionReaction(other) {
  const touchPoints = this.collisionData?.touchPoints?.this;
  if (touchPoints?.top) this.velocity.y = Math.min(0, this.velocity.y);
  if (touchPoints?.bottom) this.velocity.y = Math.max(0, this.velocity.y);
  if (touchPoints?.left) this.velocity.x = Math.min(0, this.velocity.x);
  if (touchPoints?.right) this.velocity.x = Math.max(0, this.velocity.x);
}
```

### 1.6 Constructor Chaining
`super()` in child constructors calls parent setup first. JavaScript requires this before using `this`.

```javascript
constructor(data = null, gameEnv = null) {
  super(data, gameEnv);
  this.pressedKeys = {};
}

constructor(data = null, gameEnv = null) {
  super(gameEnv);
  this.canvas = document.createElement('canvas');
  this.velocity = { x: 0, y: 0 };
}

constructor(gameEnv) {
  this.gameEnv = gameEnv;
  this.canvas = document.createElement('canvas');
  gameEnv.gameObjects.push(this);
}
```

Use this section as the OOP evidence reference, then continue with the existing sections for Control Structures, Data Types, Operators, Input/Output, Documentation, Debugging, and Testing.

## 2 — Control Structures

### 2.1 Iteration
**Code evidence (Aquatic):**
```javascript
// Each threshold represents a boss HP phase trigger (75%, 50%, 25%).
thresholds.forEach((threshold) => {
  // Compare current HP to a percentage of max HP.
  if (this.bossState.hp <= this.bossState.maxHp * threshold) {
    // Spawn reinforcements when that phase is reached.
    summonRushingSharks();
  }
});
```
**How this works in my Aquatic game:**
- The loop checks each HP threshold (75%, 50%, 25%).
- When Megalodon HP drops below a threshold, shark reinforcements are spawned.
- This creates phase-based combat escalation.

### 2.2 Conditionals
**Code evidence (Aquatic):**
```javascript
// Only show Quest 2 prompt after Quest 1 is complete.
if (q1.completed && !q2.accepted) {
  // Dialogue branch advances story progression.
  this.dialogueSystem.showDialogue('Will you take Aquatic Quest #2?', 'Slime', null);
}
```
**How this works in my Aquatic game:**
- The game only offers Quest 2 after Quest 1 is complete.
- It prevents showing wrong dialogue at the wrong time.
- This keeps quest progression logic consistent.

### 2.3 Nested Conditions
**Code evidence (Aquatic):**
```javascript
// Laser requires: phase unlocked + cooldown reached + late-phase flag.
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  // Start laser with configured charge duration.
  startMermaidBossAbility('laser', state.laserChargeMs);
}
```
**How this works in my Aquatic game:**
- Mermaid laser requires multiple conditions at once: phase unlock + cooldown time.
- This prevents ability spam and preserves intended boss pacing.

## 3 — Data Types

### 3.1 Numbers
**Code evidence (Aquatic):**
```javascript
// Convert absolute HP into a ratio so behavior can scale by percent.
// Example: 50/100 = 0.5, which can unlock mid-fight phase logic.
const hpRatio = this.bossState.hp / this.bossState.maxHp;
```
**How this works in my Aquatic game:**
- Converts boss health into a ratio for phase checks and UI decisions.
- Allows behavior to scale by percent, not hardcoded HP only.

### 3.2 Strings
**Code evidence (Aquatic):**
```javascript
// Storage key name used for persisting selected player sprite.
// This exact key is reused when writing and reading localStorage values.
const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';
```
**How this works in my Aquatic game:**
- This string is the storage key used to remember selected player sprite.
- Keeps player customization persistent across sessions.

### 3.3 Booleans
**Code evidence (Aquatic):**
```javascript
// Menu starts hidden when gameplay begins.
this.frontMenuActive = false;

// Boss logic gates open once encounter is activated.
// Many attack/update branches check this flag before running.
this.bossState.active = true;
```
**How this works in my Aquatic game:**
- `frontMenuActive` toggles menu state.
- `bossState.active` enables boss combat logic only when encounter starts.

### 3.4 Arrays
**Code evidence (Aquatic):**
```javascript
// Array of selectable character presets for the Aquatic level.
// Each object stores a stable key (used by logic) and a label (used by UI text).
const aquaticSpriteOptions = [
  { key: 'scuba-diver', label: 'Scuba Diver' },
  { key: 'boy', label: 'Boy' }
];
```
**How this works in my Aquatic game:**
- Stores available character choices in one data structure.
- UI can render options and switch sprites from this list.

### 3.5 Objects (JSON)
**Code evidence (Aquatic):**
```javascript
// Object literal groups guardian animation configuration.
// Nested fields let renderer/animation code read structured data by action name.
const guardianData = {
  orientation: { rows: 6, columns: 6 },
  attack: { row: 4, start: 0, columns: 5 }
};
```
**How this works in my Aquatic game:**
- Groups sprite/animation config for a guardian NPC.
- Makes NPC setup data-driven rather than hardcoding values across methods.

## 4 — Operators

### 4.1 Mathematical Operators
**Code evidence (Aquatic):**
```javascript
// Multiply max HP by threshold to compute phase breakpoint.
// If max HP is 200 and threshold is 0.5, trigger point becomes 100 HP.
if (this.bossState.hp <= this.bossState.maxHp * threshold) {
  summonRushingSharks();
}
```
**How this works in my Aquatic game:**
- Multiplies max HP by threshold to compute trigger points.
- Uses `<=` to activate phase actions when HP reaches that level.

### 4.2 String Operations
**Code evidence (Aquatic):**
```javascript
// Build sprite path using string concatenation.
// This keeps file paths dynamic across local and deployed environments.
const spriteAssetPath = path + '/images/gamebuilder/sprites';

// Build unique collectible id using template literal.
// i changes each loop, so IDs become starfish_0, starfish_1, etc.
const itemId = `starfish_${i}`;
```
**How this works in my Aquatic game:**
- Concatenation builds asset folder paths.
- Template literals generate unique collectible IDs.

### 4.3 Boolean Expressions
**Code evidence (Aquatic):**
```javascript
// Compound condition ensures laser can run only in valid phase/timing state.
// All three checks must be true for this branch to execute.
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  startMermaidBossAbility('laser', state.laserChargeMs);
}
```
**How this works in my Aquatic game:**
- Compound boolean logic ensures ability fires only in valid game state.
- Reduces bugs from partial or premature phase triggers.

## 5 — Input/Output

### 5.1 Keyboard Input
**Code evidence (Aquatic):**
```javascript
// Default WASD controls used when custom key data is absent.
// 87=W (up), 65=A (left), 83=S (down), 68=D (right).
this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };

// Keydown listener routes keyboard input into movement logic.
// bind(this) preserves class context inside handleKeyDown.
addEventListener('keydown', this.handleKeyDown.bind(this));
```
**How this works in my Aquatic game:**
- Maps WASD keycodes to movement directions.
- Listener captures real-time key presses for player control.

### 5.2 Canvas Rendering
**Code evidence (Aquatic):**
```javascript
update() {
  // Draw is called each frame through the update lifecycle.
  // This keeps sprite position/animation synced with current state.
  this.draw();
}
```
**How this works in my Aquatic game:**
- Every frame calls draw through update lifecycle.
- Keeps character and boss visuals synced with game state.

### 5.3 GameEnv Configuration
**Code evidence (Aquatic):**
```javascript
// Create initializes game canvas/context and runtime object systems.
// This is the startup handoff that makes the scene render and update.
this.gameEnv.create();
```
**How this works in my Aquatic game:**
- Initializes runtime environment, canvas, and object loop.
- Without this call, gameplay rendering and updates cannot start.

### 5.4 API Integration
**Code evidence (Aquatic):**
```javascript
// Fetch backend NPC progress tied to current person/player id.
// fetchOptions usually includes method, headers, and auth/session context.
const response = await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);
```
**How this works in my Aquatic game:**
- Sends/reads backend progress data tied to player profile.
- Connects in-game actions with persistent external systems.

### 5.5 Asynchronous I/O
**Code evidence (Aquatic):**
```javascript
// Async handler keeps UI responsive while POST request completes.
// await pauses this function only, not the entire render/game loop.
async handleMoodClick(mood) {
  const response = await fetch(this.endpoint, { method: 'POST' });
}
```
**How this works in my Aquatic game:**
- Prevents UI/game loop blocking during network requests.
- Allows responses to be handled after request completion.

### 5.6 JSON Parsing
**Code evidence (Aquatic):**
```javascript
// Parse JSON payload into JavaScript object for game logic use.
// After parsing, fields like result.success or result.stats can be read safely.
const result = await response.json();
```
**How this works in my Aquatic game:**
- Converts backend response payload into usable JS object data.
- Enables quest/mood/progress logic to read structured fields.

## 6 — Documentation

### 6.1 Code Comments
**Code evidence (Aquatic):**
```javascript
// Initialize touch controls for mobile devices.
// This gives phone/tablet players on-screen movement and interaction inputs.
this.touchControls = new TouchControls(gameEnv, this.touchOptions);
```
**How this works in my Aquatic game:**
- Comment explains why touch controls are created here.
- Helps reviewers quickly understand mobile input design.

### 6.2 Mini-Lesson Documentation
**Code evidence (Aquatic notebook):**
```markdown
## CS 111 Course Alignment Rubric
### Required Evidence for College Credit
```
**How this works in my Aquatic game portfolio:**
- Organizes evidence in rubric order for grading.
- Connects gameplay code to CS111 objectives clearly.

### 6.3 Code Highlights
**Code evidence (Aquatic):**
```javascript
// Create boss NPC instance from configured boss data.
// This line proves class-based object creation in a real combat flow.
const boss = new Npc(bossData, this.gameEnv);

// Register boss in game object list so update/draw loop processes it.
// Without push, boss would exist but never be updated or rendered by engine loop.
this.gameEnv.gameObjects.push(boss);
```
**How this works in my Aquatic game:**
- Highlighted snippet proves instantiation + runtime registration.
- Shows exactly where boss entities enter the update/draw pipeline.

## 7 — Debugging

### 7.1 Console Debugging
**Console logging** traces execution by printing values at key transitions: quest acceptance, boss spawn, phase changes, and request failures. Avoid logging every frame inside update loops.

```javascript
// Log once when quest progression changes.
if (q1.completed && !q2.accepted) {
  console.log('[Aquatic] Quest transition: Q1 complete, prompting Q2');
}

// Log when boss state transitions for verification.
if (!this.bossState.active && shouldStartBoss) {
  console.log(`[Aquatic] Boss start: hp=${this.bossState.hp}, maxHp=${this.bossState.maxHp}`);
}

// Log API failures with status code and endpoint context.
if (!response.ok) {
  console.warn(`[Aquatic] API request failed: status=${response.status}`);
}
```

### 7.2 Hit Box Visualization
**Hit box visualization** overlays collision circles/boxes so hit detection can be tuned against sprites. Use the same radii as collision logic to avoid mismatch.

```javascript
// Debug-only helper: visualize player and boss hit radii.
function drawHitBoxes(ctx, player, boss) {
  ctx.save();
  ctx.lineWidth = 1;

  // Player radius (green)
  ctx.strokeStyle = 'rgba(0,255,0,0.7)';
  ctx.beginPath();
  ctx.arc(player.x, player.y, 20, 0, Math.PI * 2);
  ctx.stroke();

  // Boss radius (red)
  if (boss) {
    ctx.strokeStyle = 'rgba(255,60,0,0.7)';
    ctx.beginPath();
    ctx.arc(boss.x, boss.y, boss.r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}
```

### 7.3 Source-Level Debugging (DevTools Breakpoints)
A **breakpoint** pauses execution at an exact line so you can inspect live state values (`bossState`, `phase flags`, cooldown timers) before/after updates.

1. Open DevTools -> Sources.
1. Navigate to assets/js/GameEnginev1/GameLevelAquaticGameLevel.js.
1. Place breakpoint on a phase-gate line such as `if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked)`.
1. Trigger boss combat and wait for pause.
1. Inspect `state`, `now`, and `nextLaserAt` in Scope.
1. Step over line-by-line to confirm transitions.

### 7.4 Network Debugging (Fetch / CORS)
The **Network** tab shows every fetch request. For Aquatic, this is useful for debugging `npcProgress`, mood, and stats endpoints.

1. Open DevTools -> Network -> filter Fetch/XHR.
1. Trigger a game action that calls `fetch(...)`.
1. In Headers, verify request URL and method.
1. In Payload, verify JSON body fields for stats/progress.
1. In Response, verify success object or error payload.
1. For CORS failures, update server response headers (`Access-Control-Allow-Origin`).

### 7.5 Application Debugging (Session & Storage)
The **Application** tab is used to validate local/session storage and authentication cookies used by gameplay persistence.

1. Open DevTools -> Application.
1. Check Cookies for valid active session values.
1. Check Expiration and SameSite behavior if authenticated requests fail.
1. Under Local Storage, verify keys such as `aquatic_selected_sprite_v1`.
1. Under Session Storage, verify any temporary gameplay state values if used.

### 7.6 Element Inspection (Canvas & DOM)
The **Elements** inspector confirms the Aquatic canvas/HUD is appended correctly and styles are applied as expected.

1. Right-click game canvas -> Inspect.
1. Confirm canvas is attached under expected parent container.
1. Verify parent has proper positioning for absolute child elements.
1. Verify HUD elements update (`textContent`, style width/health bars).
1. If canvas is invisible or offset, inspect computed layout and z-index.

---

Each topic is now separated with one focused code evidence block, inline comments, and one direct Aquatic-specific explanation.

