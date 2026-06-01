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

## CS111 Rubric Portal (Specific Objective Mapping)

Use this portal to jump directly to a single rubric objective. Each objective now includes: objective + explanation + code evidence together.

### 1.0 Object-Oriented Programming
- [1.1 Writing Classes](#11-writing-classes)
- [1.2 Methods and Parameters](#12-methods-and-parameters)
- [1.3 Instantiation and Objects](#13-instantiation-and-objects)
- [1.4 Inheritance Basic](#14-inheritance-basic)
- [1.5 Method Overriding](#15-method-overriding)
- [1.6 Constructor Chaining](#16-constructor-chaining)

### 2.0 Control Structures
- [2.1 Iteration](#21-iteration)
- [2.2 Conditionals](#22-conditionals)
- [2.3 Nested Conditions](#23-nested-conditions)

### 3.0 Data Types
- [3.1 Numbers](#31-numbers)
- [3.2 Strings](#32-strings)
- [3.3 Booleans](#33-booleans)
- [3.4 Arrays](#34-arrays)
- [3.5 Objects JSON](#35-objects-json)

### 4.0 Operators
- [4.1 Mathematical Operators](#41-mathematical-operators)
- [4.2 String Operations](#42-string-operations)
- [4.3 Boolean Expressions](#43-boolean-expressions)

### 5.0 Input Output
- [5.1 Keyboard Input](#51-keyboard-input)
- [5.2 Canvas Rendering](#52-canvas-rendering)
- [5.3 GameEnv Configuration](#53-gameenv-configuration)
- [5.4 API Integration](#54-api-integration)
- [5.5 Asynchronous IO](#55-asynchronous-io)
- [5.6 JSON Parsing](#56-json-parsing)

### 6.0 Documentation
- [6.1 Code Comments](#61-code-comments)
- [6.2 Mini-Lesson Documentation](#62-mini-lesson-documentation)
- [6.3 Code Highlights](#63-code-highlights)

### 7.0 Debugging and Testing
- [7.1 Console Debugging](#71-console-debugging)
- [7.2 Hit Box Visualization](#72-hit-box-visualization)
- [7.3 Source-Level Debugging](#73-source-level-debugging)
- [7.4 Network Debugging](#74-network-debugging)
- [7.5 Application Debugging](#75-application-debugging)
- [7.6 Element Inspection](#76-element-inspection)
- [7.7 Gameplay Testing](#77-gameplay-testing)
- [7.8 Integration Testing](#78-integration-testing)
- [7.9 API Error Handling](#79-api-error-handling)

---

### 1.1 Writing Classes
- Objective: Create custom classes extending base classes.
- Explanation: This proves OOP class design and reusable game entities.
- Code example:

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


### 1.2 Methods and Parameters
- Objective: Implement methods with parameters.
- Explanation: Parameterized methods enable reusable combat/state logic.
- Code example:
```javascript
applyPlayerDamage(34, px, py, 'rocket');
applyMermaidBossDamage(36, projectile.x, projectile.y);
```

### 1.3 Instantiation and Objects
- Objective: Instantiate game objects in level setup.
- Explanation: Runtime objects are created and registered in the game loop.
- Code example:
```javascript
const guardian = new Npc(guardianData, this.gameEnv);
this.gameEnv.gameObjects.push(guardian);
```

### 1.4 Inheritance Basic
- Objective: Show a multi-level class hierarchy.
- Explanation: Inheritance lets entities share behavior from base classes.
- Code example:
```javascript
class Player extends Character {}
class Character extends GameObject {}
```

### 1.5 Method Overriding
- Objective: Override lifecycle behavior.
- Explanation: Child classes customize parent update/draw behavior.
- Code example:
```javascript
update() {
  super.update();
}
```

### 1.6 Constructor Chaining
- Objective: Use super(data, gameEnv) in subclass constructors.
- Explanation: super(...) initializes inherited state correctly.
- Code example:
```javascript
constructor(data = null, gameEnv = null) {
  super(data, gameEnv);
}
```

### 2.1 Iteration
- Objective: Use loops for repeated gameplay work.
- Explanation: Iteration handles thresholds, spawning, and object updates.
- Code example:
```javascript
thresholds.forEach((threshold) => {
  if (this.bossState.hp <= this.bossState.maxHp * threshold) summonRushingSharks();
});
```

### 2.2 Conditionals
- Objective: Use conditionals for branch logic.
- Explanation: if/else gates story and combat transitions.
- Code example:
```javascript
if (q1.completed && !q2.accepted) {
  this.dialogueSystem.showDialogue('Will you take Aquatic Quest #2?', 'Slime', null);
}
```

### 2.3 Nested Conditions
- Objective: Demonstrate complex multi-condition logic.
- Explanation: Multiple conditions ensure ability timing and phase correctness.
- Code example:
```javascript
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  startMermaidBossAbility('laser', state.laserChargeMs);
}
```

### 3.1 Numbers
- Objective: Track numeric gameplay values.
- Explanation: Positions, HP, and timing values are numeric state.
- Code example:
```javascript
const width = gameEnv.innerWidth;
const hpRatio = this.bossState.hp / this.bossState.maxHp;
```

### 3.2 Strings
- Objective: Use strings for IDs, paths, and labels.
- Explanation: String data drives assets and dialogue labels.
- Code example:
```javascript
const backgroundAssetPath = path + '/images/gamebuilder/bg';
const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';
```

### 3.3 Booleans
- Objective: Use boolean state flags.
- Explanation: true/false flags control menu, quest, and boss state.
- Code example:
```javascript
this.frontMenuActive = false;
this.levelCompleted = false;
this.bossState.active = true;
```

### 3.4 Arrays
- Objective: Use arrays for collections.
- Explanation: Arrays store options, objects, thresholds, and frame sets.
- Code example:
```javascript
const aquaticSpriteOptions = [
  { key: 'scuba-diver', label: 'Scuba Diver' },
  { key: 'boy', label: 'Boy' }
];
```

### 3.5 Objects JSON
- Objective: Use object literals to model structured data.
- Explanation: JSON-style objects group related config/state fields.
- Code example:
```javascript
const guardianData = {
  orientation: { rows: 6, columns: 6 },
  attack: { row: 4, start: 0, columns: 5 }
};
```

### 4.1 Mathematical Operators
- Objective: Use + - * / in gameplay logic.
- Explanation: Math operators compute thresholds and damage logic.
- Code example:
```javascript
if (this.bossState.hp <= this.bossState.maxHp * threshold) {
  summonRushingSharks();
}
```

### 4.2 String Operations
- Objective: Build strings dynamically.
- Explanation: Concatenation and templates build paths and IDs.
- Code example:
```javascript
const spriteAssetPath = path + '/images/gamebuilder/sprites';
const itemId = `starfish_${i}`;
```

### 4.3 Boolean Expressions
- Objective: Use compound logic with &&, ||, !.
- Explanation: Combined expressions enforce game-state correctness.
- Code example:
```javascript
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  startMermaidBossAbility('laser', state.laserChargeMs);
}
```

### 5.1 Keyboard Input
- Objective: Handle keyboard input with listeners.
- Explanation: Key events map controls to movement/actions.
- Code example:
```javascript
this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
addEventListener('keydown', this.handleKeyDown.bind(this));
```

### 5.2 Canvas Rendering
- Objective: Render entities through draw lifecycle.
- Explanation: update() and draw() produce canvas output each frame.
- Code example:
```javascript
update() {
  this.draw();
}
```

### 5.3 GameEnv Configuration
- Objective: Configure and initialize game environment.
- Explanation: GameEnv initialization sets runtime canvas context.
- Code example:
```javascript
this.gameEnv.create();
```

### 5.4 API Integration
- Objective: Use fetch for backend communication.
- Explanation: API calls connect gameplay with external systems.
- Code example:
```javascript
const response = await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);
```

### 5.5 Asynchronous IO
- Objective: Use async/await for non-blocking behavior.
- Explanation: Async methods prevent UI/game loop blocking.
- Code example:
```javascript
async handleMoodClick(mood) {
  const response = await fetch(this.endpoint, { method: 'POST' });
}
```

### 5.6 JSON Parsing
- Objective: Parse JSON responses.
- Explanation: Parsed payloads are consumed by game logic/state.
- Code example:
```javascript
const result = await response.json();
```

### 6.1 Code Comments
- Objective: Document code intent and complex logic.
- Explanation: Comments improve readability and reviewer understanding.
- Code example:
```javascript
// Initialize touch controls for mobile devices
this.touchControls = new TouchControls(gameEnv, this.touchOptions);
```

### 6.2 Mini-Lesson Documentation
- Objective: Create educational, visual project documentation.
- Explanation: Notebook structure teaches concepts with runtime evidence.
- Code example:
```markdown
## Interactive Rubric Dashboard
## CS111 Rubric Portal (Specific Objective Mapping)
```

### 6.3 Code Highlights
- Objective: Annotate key snippets by objective.
- Explanation: Highlighted snippets accelerate grading and review.
- Code example:
```markdown
### 1.2 Methods and Parameters
applyPlayerDamage(34, px, py, 'rocket');
```

### 7.1 Console Debugging
- Objective: Log runtime issues for troubleshooting.
- Explanation: Warnings identify failures in audio/assets/runtime.
- Code example:
```javascript
console.warn('Unable to play aquatic boss theme', err);
```

### 7.2 Hit Box Visualization
- Objective: Validate collision boundaries.
- Explanation: Hit distance/radius checks prove collision math usage.
- Code example:
```javascript
if (hitDistance < 30) {
  applyPlayerDamage(this.bossState.playerHp, px, py, 'superLaser');
}
```

### 7.3 Source-Level Debugging
- Objective: Step through logic in sources/breakpoints.
- Explanation: Guard conditions provide clear pause points for debugging.
- Code example:
```javascript
this.startMegalodonEncounter = async () => {
  if (this.bossState.active || this.bossState.introPlayed) return;
};
```

### 7.4 Network Debugging
- Objective: Inspect request status and failures.
- Explanation: response.ok checks surface server/network issues.
- Code example:
```javascript
const response = await fetch(this.endpoint, { method: 'POST' });
if (!response.ok) throw new Error('Failed to send mood');
```

### 7.5 Application Debugging
- Objective: Inspect local/session storage state.
- Explanation: Stored values verify persistence and session flow.
- Code example:
```javascript
localStorage.setItem('aquatic_multiplayer_name', normalizedName);
sessionStorage.setItem('aquatic_multiplayer_room', normalizedRoom);
```

### 7.6 Element Inspection
- Objective: Inspect/manipulate rendered DOM elements.
- Explanation: Canvas parent checks are useful element-level diagnostics.
- Code example:
```javascript
if (this.canvas?.parentNode) {
  this.canvas.parentNode.removeChild(this.canvas);
}
```

### 7.7 Gameplay Testing
- Objective: Validate complete quest/combat flow.
- Explanation: End-to-end checks verify no critical blockers.
- Code example:
```javascript
if (q2.pendingSlimeCompletion) {
  this.dialogueSystem.showDialogue('You have saved the ocean...', 'Slime', null);
}
```

### 7.8 Integration Testing
- Objective: Verify feature-to-backend integration paths.
- Explanation: POST workflows prove connected system behavior.
- Code example:
```javascript
const response = await fetch(`${this.game.javaURI}/createStats`, {
  method: 'POST',
  body: JSON.stringify({ stats, gname, uid })
});
```

### 7.9 API Error Handling
- Objective: Handle API failure paths safely.
- Explanation: try/catch prevents crashes and surfaces actionable errors.
- Code example:
```javascript
try {
  const response = await fetch(this.endpoint, { method: 'POST' });
} catch (err) {
  this.showStatus('Network error', true);
}
```

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

## Functions
Functions are reusable blocks of code, and this file uses them to control game behavior. For example, NPC `interact` functions decide what happens when the player talks to a character, and helper functions like `showStoryStep` move the dialogue from one part of the story to the next.
Functions make the game easier to organize because each behavior has its own job instead of placing all logic in one huge block.


```python
const showStoryStep = (step) => {
  if (step === 0) {
    this.dialogueSystem.showDialogue('Before the modern human society...', 'Slime', null);
    return;
  }

  if (step === 1) {
    this.dialogueSystem.showDialogue('Countless plastics were thrown into the ocean.', 'Slime', null);
    return;
  }

  this.dialogueSystem.showDialogue('Please protect the ocean :(', 'Slime', null);
};
```

## Arrays
Arrays appear many times in the Aquatic file to store groups of related data. For example, `scubaLeftFrames`, `scubaThrowFrames`, and `aquaticSpriteOptions` hold multiple frame or sprite objects in order.
Arrays are helpful in games because the code can loop through them, search through them, or select one option from many.


```python
const scubaLeftFrames = [
  { x: 37, width: 146 },
  { x: 208, width: 151 },
  { x: 378, width: 154 },
  { x: 553, width: 167 }
];

const aquaticSpriteOptions = [
  { key: 'scuba-diver', label: 'Scuba Diver' },
  { key: 'boy', label: 'Boy' },
  { key: 'astro', label: 'Astro' }
];
```

## Booleans
Booleans are values that are either `true` or `false`, and this file uses them to keep track of game state. For example, values like `frontMenuActive`, `levelCompleted`, `active`, `accepted`, and `completed` are booleans.
These booleans help the game know whether a quest has started, whether a boss fight is active, or whether a menu should be shown.


```python
this.frontMenuActive = false;
this.levelCompleted = false;

const questState = {
  firstQuest: { accepted: false, completed: false },
  secondQuest: { accepted: false, completed: false }
};
```

## Variables
Variables store data that the Aquatic level needs to use later. This file creates many variables for paths, sprite sheets, screen size, local storage keys, and quest state.
Without variables, the code would need to rewrite the same values again and again, which would make the file harder to read and update.


```python
const path = gameEnv.path || '';
const backgroundAssetPath = path + '/images/gamebuilder/bg';
const spriteAssetPath = path + '/images/gamebuilder/sprites';
const width = gameEnv.innerWidth;
const height = gameEnv.innerHeight;
const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';
```

## Conditionals
Conditionals are used throughout the Aquatic file to choose what happens next. For example, the Slime NPC uses `if` statements to decide which dialogue or quest option to show depending on the player's progress.
This is important in games because the same character should not always say the same thing after the player completes a mission.


```python
if (q2.pendingSlimeCompletion) {
  this.dialogueSystem.showDialogue('You have saved the ocean...', 'Slime', null);
  return;
}

if (q1.completed && !q2.accepted) {
  this.dialogueSystem.showDialogue('Will you take Aquatic Quest #2?', 'Slime', null);
  return;
}
```

## Classes
The file defines a class named `GameLevelAquaticGameLevel`. A class is a blueprint that groups together data and behavior for one part of a program. In this case, the class represents the whole aquatic level.
Using a class makes sense because the level needs to store many related values like music, quests, boss state, player state, and helper functions all in one organized structure.


```python
class GameLevelAquaticGameLevel {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.frontMenuActive = false;
  }
}
```

## Constructors
The constructor is the special part of a class that runs when the level is created. In the Aquatic file, the constructor sets up everything the level needs, such as paths, sprites, quests, challenge state, and music.
This is where the game prepares the level before the player starts moving around inside it.


```python
constructor(gameEnv) {
  this.gameEnv = gameEnv;
  this.questState = questState;
  this.challengeState = challengeState;
  this.levelCompleted = false;
  this.playerLock = false;
}
```

## Methods
Methods are functions attached to objects or classes. In the Aquatic file, NPC objects have methods like `interact`, and those methods decide how characters respond to the player.
Methods help keep actions attached to the object that owns them, which makes the code easier to understand.


```python
const kirbyNpc = {
  id: 'Kirby',
  interact: function() {
    if (levelContext.gameMode === 'challenge') return;
    AiNpc.showInteraction(this);
  }
};
```

## Strings
Strings are pieces of text, and the Aquatic level uses them for file paths, character names, dialogue, and local storage keys. Many of these strings are combined with other values to create complete asset paths.
This lets the code build image or audio locations dynamically instead of hardcoding every path separately.


```python
const path = gameEnv.path || '';
const backgroundAssetPath = path + '/images/gamebuilder/bg';
const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';

const kirbyNpc = {
  id: 'Kirby',
  greeting: 'Poyo! Ask me anything about ocean cleanup and sea life.'
};
```

## Data Abstraction
Data abstraction means organizing complex information into structures that are easier to use. This file does that with objects like `playerData`, `questState`, `challengeState`, and the NPC objects.
Instead of keeping every value as a separate loose variable, the code groups related values together so the rest of the game can work with them more clearly.


```python
const questState = {
  firstQuest: { accepted: false, completed: false, collected: 0 },
  secondQuest: { accepted: false, completed: false, collected: 0 }
};

const playerData = {
  id: 'playerData',
  INIT_POSITION: { x: 180, y: 300 },
  keypress: { up: 87, left: 65, down: 83, right: 68 }
};
```

## Mathematical Expressions
Mathematical expressions are used whenever the Aquatic file needs to calculate positions, sizes, rows, or columns. Even small calculations matter in games because movement and animation depend on exact numbers.
Expressions with `+`, `-`, `*`, and functions like `Math.min` help the game place sprites correctly and control animation directions.


```python
const width = gameEnv.innerWidth;
const height = gameEnv.innerHeight;

const rightRow = Math.min(1, 4 - 1);
const leftRow = Math.min(2, 4 - 1);

const startPosition = { x: 180, y: 300 };
```

## Iteration
Iteration means repeating a process, and the Aquatic file uses real loops to place collectibles and process groups of game objects. One example is building a list of random starfish positions and then looping through that list to create each collectible.
Iteration is important in games because the same action often needs to happen many times, such as spawning items, updating enemies, or applying effects to every object in a group.


```python
const positions = [];
let attempts = 0;

while (positions.length < count && attempts < 500) {
  attempts += 1;
  const x = Math.floor(Math.random() * (maxX - padding) + padding);
  const y = Math.floor(Math.random() * (maxY - padding) + padding);

  if (!tooClose && !tooCloseToNpc) positions.push({ x, y });
}

positions.forEach((pos, i) => {
  const itemId = `starfish_${i}`;
  // Create one collectible for each stored position.
});
```

## Megalodon Boss Explanation
The megalodon boss fight uses the same CSSE topics as the rest of the Aquatic level, but in a more combat-focused way.
Instead of one long summary, this section breaks the boss code into smaller pieces so each topic can be seen directly in the code.


```python
this.startMegalodonEncounter = async () => {
  if (this.bossState.active || this.bossState.introPlayed) return;

  this.bossState.introPlayed = true;
  this.bossState.active = true;
  this.bossState.hp = this.bossState.maxHp;
  this.bossState.summonThresholdsTriggered = [];

  const bossData = {
    id: 'MegalodonBoss',
    src: this.bossState.megalodonMoveSheet,
    INIT_POSITION: { x: 120, y: this.gameEnv.innerHeight - 150 },
    laserAttack: { row: 0, start: 0, columns: 3 },
    rocketAttack: { row: 1, start: 0, columns: 3 }
  };

  const boss = new Npc(bossData, this.gameEnv);
  this.bossState.megalodon = boss;
  this.gameEnv.gameObjects.push(boss);
};

const thresholds = [0.75, 0.5, 0.25];
thresholds.forEach((threshold) => {
  if (this.bossState.hp <= this.bossState.maxHp * threshold) {
    summonRushingSharks();
  }
});
```

### Rubric-Focused Code Evidence (Megalodon Section)
This section is rewritten to match CS111 rubric language directly. Each item uses the format: **this line uses ... which ...**

#### Object-Oriented Programming (classes, instantiation, constructor use)
```javascript
const boss = new Npc(bossData, this.gameEnv);
this.gameEnv.gameObjects.push(boss);
```
- This line uses **class instantiation** (`new Npc(...)`) which demonstrates creating objects from a class in active gameplay code.
- This line uses **array-based object registration** (`gameObjects.push`) which demonstrates runtime object management in the level loop.

#### Methods and Parameters
```javascript
applyPlayerDamage(damage, x, y, source);
```
- This line uses a **method with 4 parameters**, which matches the rubric requirement for parameterized methods and clear method signatures.

#### Control Structures (conditionals + iteration)
```javascript
const thresholds = [0.75, 0.5, 0.25];
thresholds.forEach((threshold) => {
  if (this.bossState.hp <= this.bossState.maxHp * threshold) {
    summonRushingSharks();
  }
});
```
- This line uses an **array + iteration** (`forEach`) which demonstrates repeated checks over structured data.
- This line uses a **conditional with mathematical comparison** which demonstrates phase-based game logic and nested combat decisions.

#### Data Types and Operators
```javascript
this.bossState.hp = this.bossState.maxHp;
const hpRatio = this.bossState.hp / this.bossState.maxHp;
if (this.bossState.active && hpRatio <= 0.5) { /* phase logic */ }
```
- This line uses **numbers** (HP values) and the **assignment operator** to initialize state.
- This line uses **mathematical operators** (`/`) which calculate health ratios for behavior changes.
- This line uses **booleans** and **boolean operators** (`&&`, `<=`) which gate combat transitions.

#### Input/Output and Rendering Flow
```javascript
this.gameEnv.gameObjects.push(boss);
```
- This line uses the game engine **output pipeline** (objects added to update/draw arrays), which is how boss entities appear in canvas rendering.

#### State Management
```javascript
this.bossState.active = true;
this.bossState.introPlayed = true;
this.bossState.summonThresholdsTriggered = [];
```
- These lines use explicit **state flags and state collections**, which demonstrate pause/phase/transition-style management required by game-loop architecture.

#### Debugging and Verification Hint
To verify this rubric evidence, search your game file for: `new Npc(`, `applyPlayerDamage(`, `forEach(`, `if (`, `gameObjects.push(`, and `bossState.`.

## Rubric-Focused Code Evidence (Mermaid Section)
This section focuses on CS111 categories first, then links each category to concrete Mermaid boss evidence.

#### Asynchronous I/O and Timed Logic
```javascript
this.startMermaidBossEncounter = async () => {
  const state = this.mermaidBossState;
  state.nextVolleyReadyAt = Date.now() + 1200;
  state.nextBombAt = Date.now() + 9500;
};
```
- This line uses an **async function**, which demonstrates asynchronous programming structure expected by the rubric.
- This line uses **mathematical time offsets** (`Date.now() + ...`) which implement scheduled combat behavior.

#### Data Abstraction (JSON/Object Literals)
```javascript
const guardianData = {
  orientation: { rows: 6, columns: 6 },
  attack: { row: 4, start: 0, columns: 5 },
  rangedAttack: { row: 5, start: 0, columns: 5 }
};
```
- This line uses an **object literal (JSON-style configuration)** which demonstrates data-driven design and structured state/config storage.

#### OOP: Instantiation, Inheritance Usage, and Object Lifecycle
```javascript
const guardian = new Npc(guardianData, this.gameEnv);
this.gameEnv.gameObjects.push(guardian);
```
- This line uses **constructor-based object creation**, which demonstrates OOP instantiation for runtime entities.
- This line uses **engine lifecycle registration**, which connects class objects to update/draw behavior in the game loop.

#### Control Structures + Boolean Expressions
```javascript
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  startMermaidBossAbility('laser', state.laserChargeMs);
}
```
- This line uses a **compound boolean expression** (`&&`) which demonstrates rubric-level boolean logic and conditional gating.
- This line uses **state-based control structure**, which demonstrates multi-condition transitions in combat flow.

#### Strings, Arrays, and Method Calls
```javascript
const launchMermaidVolley = () => startMermaidBossAbility('volley');
this.gameEnv.gameObjects.push(guardian);
```
- This line uses a **string argument** (`'volley'`) which labels and dispatches an ability mode.
- This line uses an **array operation** (`push`) and **method call**, which demonstrates collection management plus object behavior invocation.

#### Documentation-Style Evidence Sentence Example
Example sentence you can reuse in review comments:
- "This line uses a compound boolean expression (`state.phaseTwoUnlocked && ...`) which controls when the laser attack is allowed, demonstrating nested conditional logic required by the CS111 control-structures rubric."

#### Quick Verification Checklist
Search for these symbols in your source to prove the rubric items:
- `async`
- `new Npc(`
- `gameObjects.push(`
- `Date.now() +`
- `&&`
- `startMermaidBossAbility(`

### Complete Boss Ability Map With Topic Relationships

## Megalodon Boss Abilities

### 1) Laser Beam
Code evidence:
```javascript
if (state.activeAbility === 'laser') {
  commitLaser();
}

if (dLine < 20) {
  applyPlayerDamage(42, playerX, playerY, 'laser');
}
```
Topic relationship:
- Functions/Methods: `commitLaser()` and beam update logic are split into reusable units.
- Conditionals/Booleans: `state.activeAbility === 'laser'` gates when laser logic runs.
- Math: segment distance math checks if the player intersects the beam.

### 2) Rocket Barrage
Code evidence:
```javascript
const rocketLaunches = [
  { angle: targetAngle - 0.54, homing: 0, speed: 5.1 },
  { angle: targetAngle - 0.18, homing: 0, speed: 5.5 },
  { angle: targetAngle + 0.16, homing: 0.09, speed: 5.2 },
  { angle: targetAngle + 0.48, homing: 0, speed: 4.9 }
];

applyPlayerDamage(p.type === 'rocket' ? 34 : 28, playerX, playerY, 'rocket');
```
Topic relationship:
- Arrays/Iteration: `rocketLaunches` is iterated to spawn a multi-rocket pattern.
- Variables: per-rocket `speed`, `angle`, and `homing` tune behavior.
- Conditionals: damage branch depends on projectile type.

### 3) Body Swing Shockwave
Code evidence:
```javascript
if (dist < 130) {
  applyPlayerDamage(48, px, py);
}
```
Topic relationship:
- Conditionals: range check decides whether damage is applied.
- Math expressions: distance to player is computed with `Math.hypot`.
- Methods: committed through `commitBodySwing()` during the attack timeline.

### 4) Rushing Shark Summons
Code evidence:
```javascript
if (this.bossState.hp <= this.bossState.maxHp * threshold) {
  summonRushingSharks(threshold > 0.5 ? 2 : 4);
}

if (this.bossState.hp <= this.bossState.maxHp * 0.1) {
  summonRushingSharks(1);
}
```
Topic relationship:
- Iteration: thresholds are checked in a loop.
- Conditionals/Booleans: each threshold triggers only once via tracking array.
- Data abstraction: summon objects are stored in `bossState.summons`.

### 5) Weakened Megalodon Add
Code evidence:
```javascript
if (this.bossState.hp <= this.bossState.maxHp * 0.25) {
  summonWeakenedMegalodon();
}
```
Topic relationship:
- Classes/Constructors: `new Npc(minionData, this.gameEnv)` creates the add.
- Variables: HP threshold controls phase transition.
- Strings: spawned unit id uses a string template.

### 6) Orb Combat System (Boss-Phase Utility Ability)
Code evidence:
```javascript
if (Date.now() >= this.bossState.nextOrbSpawnAt) {
  spawnCombatOrb();
  this.bossState.nextOrbSpawnAt = Date.now() + 10000;
}
```
Topic relationship:
- Data abstraction: orb definitions and buff flags are grouped in structured objects.
- Functions/Methods: orb spawn, activation, aura sync, and announcements are modular.
- Mathematical expressions: timer arithmetic schedules recurring spawns.

## Mermaid Boss Abilities

### 1) Rocket Volley
Code evidence:
```javascript
if (state.volleyShotsRemaining > 0 && now >= state.nextVolleyShotAt) {
  commitMermaidRockets();
  state.volleyShotsRemaining -= 1;
}

applyPlayerDamage(34, px, py, 'rocket');
```
Topic relationship:
- Iteration over time: repeated timed shots create a volley pattern.
- Variables: `volleySize`, `shotIntervalMs`, and cooldown fields shape behavior.
- Conditionals: fire only when timers and counters permit.

### 2) Bomb Rain and Explosion
Code evidence:
```javascript
if (state.activeAbility === 'bombs' && !state.abilityCommitted) {
  spawnMermaidBombs();
}

if (toPlayerBomb < bomb.size * 0.92) {
  applyPlayerDamage(Math.ceil(this.bossState.playerMaxHp * 0.22), bomb.x, bomb.y, 'bomb');
}
```
Topic relationship:
- Arrays/Iteration: bombs are tracked and updated in `state.bombs` each frame.
- Math: explosion radius and HP-percent damage are numeric calculations.
- Conditionals/Booleans: commit flags prevent duplicate spawns during one cast.

### 3) Star Guardian Summon
Code evidence:
```javascript
if (state.activeAbility === 'summon' && !state.abilityCommitted) {
  spawnMermaidStarGuardians();
}

applyPlayerDamage(summon.damage, px, py, 'guardian');
```
Topic relationship:
- Classes/Constructors: guardians are created using `new Npc(guardianData, this.gameEnv)`.
- Arrays: guardians are registered in `gameObjects` and `state.summons`.
- Conditionals: summon unlock is phase-gated and cooldown-gated.

### 4) Super Laser
Code evidence:
```javascript
if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {
  startMermaidBossAbility('laser', state.laserChargeMs);
}

if (hitDistance < 30) {
  applyPlayerDamage(this.bossState.playerHp, px, py, 'superLaser');
}
```
Topic relationship:
- Booleans/Conditionals: requires multiple phase flags before activation.
- Math: line-segment hit testing determines whether player is hit.
- Variables: charge time and cooldown values tune the attack.

### 5) Assault Dash
Code evidence:
```javascript
if (state.activeAbility === 'assault') {
  boss.position.x += normalizedX * assaultSpeed;
  boss.position.y += normalizedY * assaultSpeed;
}

if (collisionDistance < 118) {
  applyPlayerDamage(Math.ceil(this.bossState.playerMaxHp * 0.5), px, py, 'assault');
}
```
Topic relationship:
- Mathematical expressions: normalized vectors produce dash movement.
- Variables: `assaultSpeed`, collision range, and duration shape execution.
- Conditionals: hit logic and end-of-ability timing are branch-driven.

## Phase Relationships (Why Abilities Unlock When They Do)
Code evidence:
```javascript
state.phaseTwoUnlocked = state.hp <= state.maxHp * 0.5;
state.phaseThreeUnlocked = state.hp <= state.maxHp * 0.3;
state.phaseFourUnlocked = state.hp <= state.maxHp * 0.1;
```
Topic relationship:
- Variables + Math + Booleans: HP ratios become boolean phase states.
- Conditionals: these booleans gate bombs, laser, summon, and assault availability.
- Data abstraction: all phase and cooldown fields live in `mermaidBossState` and `bossState`.
