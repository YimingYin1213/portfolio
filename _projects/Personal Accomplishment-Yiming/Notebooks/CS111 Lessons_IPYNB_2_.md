---
layout: post
codemirror: True
title: CS111 College Ready
description: CSSE topic-by-topic explanation of the Aquatic game level code.
permalink: /personal-accomplishment-yiming/aquatic-game-level-explanation/
---

# CS111 College Ready
This notebook explains the code in `Aquatic For Reference.js` using CSSE topics like functions, arrays, booleans, conditionals, classes, constructors, methods, strings, data abstraction, math expressions, variables, and iteration.
Each section below connects one CSSE topic to a real code pattern from the Aquatic level file.
Before the topic-by-topic breakdown, the notebook now includes a small playable aquatic runner and a preview of the assets currently wired into the published site.

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
Run the real aquatic level from the project source file.
{% endcapture %}

{% capture code0 %}
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameLevelAquaticGameLevel from '/assets/js/GameEnginev1/GameLevelAquaticGameLevel.js';

export const gameLevelClasses = [GameLevelAquaticGameLevel];
export { GameControl };
{% endcapture %}

{% include runners/game.html
   runner_id="personal-accomplishment-yiming-aquatic-game-level-explanation-0"
   challenge=challenge0
   code=code0
   hide_edit="true"
   width="100%"
   height="620px"
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
 1// Each threshold represents a boss HP phase trigger (75%, 50%, 25%).
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
// Convert absolute HP into ratio for phase/UI logic.
const hpRatio = this.bossState.hp / this.bossState.maxHp;
```
**How this works in my Aquatic game:**
- Converts boss health into a ratio for phase checks and UI decisions.
- Allows behavior to scale by percent, not hardcoded HP only.

### 3.2 Strings
**Code evidence (Aquatic):**
```javascript
// Storage key name used for persisting selected player sprite.
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
this.bossState.active = true;
```
**How this works in my Aquatic game:**
- `frontMenuActive` toggles menu state.
- `bossState.active` enables boss combat logic only when encounter starts.

### 3.4 Arrays
**Code evidence (Aquatic):**
```javascript
// Array of selectable character presets for the Aquatic level.
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
const spriteAssetPath = path + '/images/gamebuilder/sprites';
// Build unique collectible id using template literal.
const itemId = `starfish_${i}`;
```
**How this works in my Aquatic game:**
- Concatenation builds asset folder paths.
- Template literals generate unique collectible IDs.

### 4.3 Boolean Expressions
**Code evidence (Aquatic):**
```javascript
// Compound condition ensures laser can run only in valid phase/timing state.
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
this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
// Keydown listener routes keyboard input into movement logic.
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
this.gameEnv.create();
```
**How this works in my Aquatic game:**
- Initializes runtime environment, canvas, and object loop.
- Without this call, gameplay rendering and updates cannot start.

### 5.4 API Integration
**Code evidence (Aquatic):**
```javascript
// Fetch backend NPC progress tied to current person/player id.
const response = await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);
```
**How this works in my Aquatic game:**
- Sends/reads backend progress data tied to player profile.
- Connects in-game actions with persistent external systems.

### 5.5 Asynchronous I/O
**Code evidence (Aquatic):**
```javascript
// Async handler keeps UI responsive while POST request completes.
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
const boss = new Npc(bossData, this.gameEnv);
// Register boss in game object list so update/draw loop processes it.
this.gameEnv.gameObjects.push(boss);
```
**How this works in my Aquatic game:**
- Highlighted snippet proves instantiation + runtime registration.
- Shows exactly where boss entities enter the update/draw pipeline.

---

Each topic is now separated with one focused code evidence block, inline comments, and one direct Aquatic-specific explanation.

## Topic Index

Use this plain index instead of teleport buttons.

- [Functions](#functions)
- [Arrays](#arrays)
- [Booleans](#booleans)
- [Conditionals](#conditionals)
- [Classes](#classes)
- [Constructors](#constructors)
- [Methods](#methods)
- [Strings](#strings)
- [Data Abstraction](#data-abstraction)
- [Mathematical Expressions](#mathematical-expressions)
- [Variables](#variables)
- [Iteration](#iteration)
- [Project Checklist Integration](#project-checklist-integration-layer)
- [Megalodon Boss Explanation](#megalodon-boss-explanation)
- [Code Breakdown](#code-breakdown)

## Project Checklist

| Learning Objective | Related Notes | Project Evidence Required | Assessment Method |
| --- | --- | --- | --- |
| Writing Classes | [Classes](#classes) | Create minimum 2 custom character classes extending base classes | Code review: Player.js, Npc.js, Enemy.js |
| Methods & Parameters | [Methods](#methods) | Implement methods with parameters | Code review: methods with 2+ parameters |
| Instantiation & Objects | [Data Abstraction](#data-abstraction) | Instantiate game objects in level config | Code review: GameLevel setup objects |
| Inheritance (Basic) | [Classes](#classes) | Use class hierarchy (GameObject -> Character -> Player) | Code review: extends chain |
| Method Overriding | [Methods](#methods) | Override parent methods like update and draw | Code review: polymorphic implementations |
| Constructor Chaining | [Constructors](#constructors) | Use super() in subclass constructors | Code review: super(data, gameEnv) calls |
| Iteration | [Iteration](#iteration) | Use loops for arrays and animation | Code review: for, forEach, while |
| Conditionals | [Conditionals](#conditionals) | Use if else logic for state transitions | Code review: nested conditions |
| Numbers | [Mathematical Expressions](#mathematical-expressions) | Track position, velocity, score | Code review: numeric properties |
| Strings | [Strings](#strings) | Use names, paths, and dialogue strings | Code review: string operations |
| Booleans | [Booleans](#booleans) | Use flags for game state | Code review: boolean logic |
| Arrays | [Arrays](#arrays) | Use arrays for objects and level data | Code review: array operations |
| Objects (JSON) | [Data Abstraction](#data-abstraction) | Use object literals for config/state | Code review: object structures |
| Mathematical Operators | [Mathematical Expressions](#mathematical-expressions) | Use + - * / for gameplay math | Code review: arithmetic in logic |
| Boolean Expressions | [Booleans](#booleans) | Use &&, ||, ! in logic | Code review: compound conditions |
| Keyboard Input | [Functions](#functions) | Implement WASD or arrow controls | Testing: key handlers work |
| Canvas Rendering | [Classes](#classes) | Draw sprites/backgrounds with canvas | Code review: draw methods |
| GameEnv Configuration | [Variables](#variables) | Configure canvas and game settings | Code review: GameEnv.create |
| Async I/O | [Methods](#methods) | Use async and await for runtime flows | Code review: async methods |
| JSON Parsing | [Data Abstraction](#data-abstraction) | Parse structured data payloads | Code review: JSON.parse and object access |
| Debugging | [Code Breakdown](#code-breakdown) | Use console logs, inspect state, tune hitboxes | Demo: stable gameplay loop |

[Jump to Code Breakdown](#code-breakdown) | [Jump to Megalodon Boss Section](#megalodon-boss-explanation) | [Jump to Checklist Integration Layer](#project-checklist-integration-layer) | [Jump to Full Evidence Rubric](#comprehensive-implementation-rubric-aquatic-evidence)

## Project Checklist Integration Layer

This section now integrates with the single Project Checklist table above without adding another table.

How to use this integration:
- Start in the Project Checklist table.
- Use the Related Notes links (Functions, Arrays, Booleans, etc.) for concept explanations.
- Use the File Evidence Index below for code-level proof in project files.

Objective mapping (non-table):
- OOP objectives: Writing Classes, Methods and Parameters, Instantiation and Objects, Inheritance, Method Overriding, Constructor Chaining.
- Control structures: Iteration, Conditionals, Nested Conditions.
- Data types and operators: Numbers, Strings, Booleans, Arrays, Objects, Mathematical and Boolean expressions.
- I/O and runtime: Keyboard Input, Canvas Rendering, GameEnv Configuration, Async I/O, JSON Parsing.
- Debugging and verification: Console, hitbox, source-level, network, application, element inspection, gameplay and integration testing.

[Jump to Project Checklist](#project-checklist)
[Jump to Full Evidence Section](#file-evidence-index)

## Comprehensive Implementation Rubric (Aquatic Evidence)

This notebook intentionally keeps one table only (Project Checklist).
This section upgrades evidence quality by using a **claim -> proof -> verification** format.

### Evidence Quality Standard
- Every objective should map to a specific file and a concrete symbol (class, method, function, or config object).
- Evidence should show both implementation and behavior (where possible).
- Verification should be reproducible by opening the file and searching for the symbol name.

### File Evidence Index (High-Confidence)
- **Classes + inheritance**
  - Claim: Custom game entities are implemented with OOP hierarchy.
  - Proof: `class Player`, `class Npc`, `class Character`, `class Shark` in `assets/js/GameEnginev1/essentials/Player.js`, `assets/js/GameEnginev1/essentials/Npc.js`, `assets/js/GameEnginev1/essentials/Character.js`, `assets/js/GameEnginev1/Shark.js`.
  - Verify: Search `class Player extends`, `class Npc extends`, `class Shark extends`.

- **Instantiation + object registration**
  - Claim: The level creates and registers runtime objects.
  - Proof: `new Npc(...)`, `new Player(...)`, and game object pushes inside `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`.
  - Verify: Search `new Npc(`, `new Player(`, and `gameObjects.push(`.

- **Methods with parameters**
  - Claim: Combat/state logic uses parameterized methods.
  - Proof: `applyPlayerDamage(damage, x, y, source)` and `applyMermaidBossDamage(damage, hitX, hitY)` in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`.
  - Verify: Search exact method names and confirm argument usage inside each body.

- **Iteration + conditionals**
  - Claim: The gameplay loop uses loops and branching logic.
  - Proof: `for (...)`, `forEach(...)`, `if (...)`, and compound checks in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`.
  - Verify: Search `for (` and `if (`; inspect boss updates and projectile handling blocks.

- **Data types + operators**
  - Claim: Numeric, boolean, string, array, and object operations appear in gameplay state.
  - Proof: Health math, cooldown timers, boolean flags, sprite arrays/options, and config objects in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`.
  - Verify: Search for `Math.`, `===`, `&&`, `||`, and array/object literals near combat + quest state.

- **Keyboard input + control flow**
  - Claim: Player input wiring is implemented in level/runtime code.
  - Proof: Key mapping and input-driven movement interactions in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js` and `assets/js/GameEnginev1/platformer/Input.js`.
  - Verify: Search `keypress`, `keyCode`, and movement handling calls.

- **Canvas/rendering pipeline**
  - Claim: Sprite rendering uses engine character draw/update flow.
  - Proof: Rendering and animation updates in `assets/js/GameEnginev1/essentials/Character.js` and `assets/js/GameEnginev1/essentials/Player.js`.
  - Verify: Search `draw(`, `update(`, and sprite frame/orientation logic.

- **Game environment configuration**
  - Claim: Level/runtime config is connected to GameEnv and object setup.
  - Proof: `GameEnv` setup and level constructor wiring in `assets/js/GameEnginev1/essentials/GameEnv.js` and `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js`.
  - Verify: Search `GameEnv` creation/config references and constructor assignments.

- **Async I/O + JSON handling**
  - Claim: The project includes async fetch + JSON parse workflows beyond static gameplay.
  - Proof: async data flow in `assets/js/GameEnginev1/FinTech.js`, `assets/js/GameEnginev1/GameLevelEnd.js`, `assets/js/GameEnginev1/StockMoodModal.js`, and `assets/js/GameEnginev1/GameLevelMeteorBlaster.js`.
  - Verify: Search `async`, `await fetch`, `response.json()`, and payload access checks.

- **Debugging evidence**
  - Claim: The level includes practical debugging/tuning patterns.
  - Proof: State guards, warnings, overlay controls, and local/session state usage in `assets/js/GameEnginev1/GameLevelAquaticGameLevel.js` and matching v1.1 implementation.
  - Verify: Search `console`, `warn`, `localStorage`, and runtime state flag transitions.

### Reviewer-Friendly Validation Steps
1. Open each listed file and search for the exact symbols in this section.
2. Confirm each symbol is used in active logic (not dead/commented code).
3. Run local site and verify at least one runtime behavior per objective category (input, rendering, combat/state, async feature).
4. Capture screenshot/video snippets as artifact proof for final submission.

### Evidence Integrity Note
This evidence section prioritizes **real, searchable implementation artifacts** over broad descriptions, so each rubric item can be defended during code review.

[Jump to Project Checklist](#project-checklist)

## Aquatic Asset Preview
These are the exact aquatic assets now wired into the notebook page and the embedded runner.
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin:18px 0;">
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/bg/Aquatic.png" alt="Aquatic underwater background" style="width:100%;height:140px;object-fit:cover;border-radius:10px;">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>Aquatic.png</strong><br>Main underwater background used inside the runner.</figcaption>
  </figure>
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/sprites/scubadiver.png" alt="Scuba diver sprite" style="width:100%;height:140px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,0.04);">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>scubadiver.png</strong><br>4x3 diver sheet used as the playable character.</figcaption>
  </figure>
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/sprites/slime.png" alt="Slime sprite" style="width:100%;height:140px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,0.04);">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>slime.png</strong><br>Quest NPC sprite for the underwater story section.</figcaption>
  </figure>
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/sprites/Shark.png" alt="Shark sprite" style="width:100%;height:140px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,0.04);">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>Shark.png</strong><br>Hazard sprite used for the patrol enemy.</figcaption>
  </figure>
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/sprites/trident.png" alt="Trident sprite" style="width:100%;height:140px;object-fit:contain;border-radius:10px;background:rgba(255,255,255,0.04);">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>trident.png</strong><br>Displayed as the goal icon for the boss-fight phase of the full level.</figcaption>
  </figure>
  <figure style="margin:0;background:#082033;color:#e8fbff;border-radius:14px;padding:12px;border:1px solid rgba(120,220,255,0.28);">
    <img src="{{ site.baseurl }}/images/gamebuilder/bg/Above-the-water.png" alt="Above the water background" style="width:100%;height:140px;object-fit:cover;border-radius:10px;">
    <figcaption style="margin-top:8px;font-size:0.95rem;"><strong>Above-the-water.png</strong><br>Surface-world transition art for the second quest scene.</figcaption>
  </figure>
</div>
The notebook page now references the same named assets you listed, using site-served copies so the runner can load them on localhost without broken paths.


```javascript
%%js

// GAME_RUNNER: Run the real aquatic level from the project source file. | hide_edit: true, width: 100%, height: 620px

import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
import GameLevelAquaticGameLevel from '/assets/js/GameEnginev1/GameLevelAquaticGameLevel.js';

export const gameLevelClasses = [GameLevelAquaticGameLevel];
export { GameControl };
```
