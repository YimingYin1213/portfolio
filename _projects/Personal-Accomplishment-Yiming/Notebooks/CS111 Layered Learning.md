---
layout: post
title: CS111 Layered Learning Explorer
description: Interactive category-lesson-topic explorer for Aquatic CS111 evidence.
permalink: /personal-accomplishment-yiming/cs111-layered-learning/
---

# CS111 Layered Learning Explorer
This page turns your CS111 rubric into a guided learning system with three layers:
Category -> Lesson -> Topic.
Reference source: assets/js/GameEnginev1/GameLevelAquaticGameLevel.js (used to map assets, flow, and code patterns 1:1).

<style>
  .layered-page {
    --bg1: #052033;
    --bg2: #0b3b4f;
    --panel: #07283c;
    --ink: #e7f9ff;
    --muted: #a8d1df;
    --line: rgba(138, 214, 237, 0.35);
    --accent: #f7b267;
    --accent2: #5bd1a9;
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
    color: var(--ink);
    background: radial-gradient(circle at 20% 10%, #0d5571 0%, transparent 35%), linear-gradient(140deg, var(--bg1), var(--bg2));
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 16px;
    margin: 12px 0;
    position: relative;
  }
  .layered-page h2, .layered-page h3 { margin: 0 0 10px 0; }
  .layered-grid {
    display: grid;
    grid-template-columns: 1.2fr 1.8fr;
    top: 12px;
    margin-top: 12px;
    background: rgba(4, 22, 34, 0.92);
    border: 1px solid rgba(91, 209, 169, 0.4);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    gap: 6px;
  }
  .assistant h3 {
    margin: 0 0 6px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(138, 214, 237, 0.35);
  }
  .assistant .small {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.45;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .sprite-assistant {
    position: fixed;
    right: 16px;
    left: auto;
    top: calc(100vh - 190px);
    z-index: 45;
    width: 280px;
    transition: left 700ms ease, top 700ms ease;
    pointer-events: auto;
  }
  .sprite-assistant .speech {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 2px 0;
    margin-bottom: 8px;
    color: #d9f5ff;
    line-height: 1.4;
    font-size: 0.84rem;
    min-height: 48px;
  }
  .sprite-assistant .assistant-actions {
    display: none;
    gap: 6px;
    margin-top: 6px;
    flex-wrap: wrap;
  }
  .sprite-assistant .assistant-actions.show {
    display: flex;
  }
  .sprite-assistant .assistant-btn {
    border: 1px solid rgba(247, 178, 103, 0.55);
    background: rgba(247, 178, 103, 0.2);
    color: #fff4e6;
    border-radius: 8px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 0.78rem;
    font-weight: 700;
  }
  .sprite-assistant .assistant-btn.alt {
    border-color: rgba(91, 209, 169, 0.6);
    background: rgba(91, 209, 169, 0.2);
    color: #e8fff8;
  }
  .assistant-sprite {
    width: 96px;
    height: 96px;
    border: none;
    border-radius: 0;
    background-image: url('{{ site.baseurl }}/images/Assisstant.png');
    background-repeat: no-repeat;
    background-size: 384px 384px;
    image-rendering: pixelated;
    cursor: pointer;
    box-shadow: none;
  }
  .assistant-status {
    margin-top: 5px;
    color: #b7e8ff;
    font-size: 0.74rem;
  }
  .layered-controls {
    white-space: pre-wrap;
    position: relative;
    padding-right: 34px;
    gap: 8px;
  .code-delete {
    position: absolute;
    top: 6px;
    right: 6px;
    border: 1px solid rgba(255, 143, 143, 0.6);
    background: rgba(160, 24, 24, 0.45);
    color: #ffecec;
    border-radius: 6px;
    width: 20px;
    height: 20px;
    font-size: 0.72rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
    flex-wrap: wrap;
    margin: 8px 0 12px 0;
  }
  .mode-btn, .node-btn, .code-explain-btn {
    border: 1px solid rgba(247, 178, 103, 0.5);
    background: rgba(247, 178, 103, 0.12);
    color: #fff6ea;
    border-radius: 999px;
    padding: 6px 10px;
    cursor: pointer;
    font-size: 0.88rem;
  }
  .mode-btn.active, .node-btn:hover, .code-explain-btn:hover {
    background: rgba(91, 209, 169, 0.22);
    border-color: rgba(91, 209, 169, 0.7);
  }
  .tree-group { margin-bottom: 10px; }
  .tree-title {
    font-weight: 700;
    margin-bottom: 6px;
    color: #ffe9d1;
  }
  .lesson-list { margin: 0; padding-left: 14px; }
  .lesson-list li { margin: 4px 0; }
  .topic-chip {
    display: inline-block;
    margin: 4px 5px 0 0;
    padding: 4px 9px;
    border-radius: 10px;
    border: 1px solid rgba(160, 228, 248, 0.45);
    background: rgba(160, 228, 248, 0.12);
    color: var(--ink);
    cursor: pointer;
    font-size: 0.8rem;
  }
  .explain-box {
    background: rgba(8, 31, 45, 0.82);
    border: 1px dashed rgba(160, 228, 248, 0.5);
    border-radius: 10px;
    padding: 10px;
    margin-top: 8px;
    white-space: pre-wrap;
  }
  .lesson-meta {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .lesson-meta-box {
    background: rgba(10, 40, 58, 0.72);
    border: 1px solid rgba(138, 214, 237, 0.35);
    border-radius: 10px;
    padding: 8px;
    white-space: pre-wrap;
    font-size: 0.86rem;
  }
  .runner-wrap {
    margin-top: 8px;
    border: 1px solid rgba(247, 178, 103, 0.4);
    border-radius: 10px;
    background: rgba(18, 18, 28, 0.72);
    padding: 8px;
  }
  .runner-title {
    font-size: 0.88rem;
    color: #ffe4c2;
    margin-bottom: 6px;
    font-weight: 700;
  }
  .runner-code {
    margin: 0;
    white-space: pre-wrap;
    font-family: "Menlo", "Consolas", monospace;
    font-size: 0.8rem;
    line-height: 1.4;
    color: #d9f3ff;
  }
  .builder {
    margin-top: 14px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(247, 178, 103, 0.4);
    background: rgba(6, 22, 34, 0.82);
  }
  .builder h3 {
    margin: 0 0 8px 0;
  }
  .builder-grid {
    display: grid;
    grid-template-columns: minmax(260px, 0.85fr) minmax(420px, 1.75fr);
    gap: 12px;
  }
  .builder-panel {
    border: 1px solid rgba(138, 214, 237, 0.3);
    border-radius: 10px;
    padding: 8px;
    background: rgba(4, 18, 28, 0.85);
  }
  .topic-boxes {
    margin-bottom: 8px;
    border: 1px solid rgba(138, 214, 237, 0.32);
    border-radius: 8px;
    padding: 8px;
    background: rgba(5, 22, 34, 0.86);
  }
  .topic-boxes .title {
    font-size: 0.8rem;
    color: #ffe3bc;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .topic-boxes .item {
    font-family: Menlo, Consolas, monospace;
    font-size: 0.75rem;
    line-height: 1.35;
    color: #c9efff;
    border: 1px solid rgba(120, 207, 255, 0.25);
    border-radius: 6px;
    padding: 5px 6px;
    margin-bottom: 5px;
    background: rgba(9, 35, 52, 0.82);
  }
  .topic-boxes .item.done {
    border-color: rgba(91, 209, 169, 0.65);
    background: rgba(32, 90, 72, 0.45);
    color: #e8fff8;
  }
  .builder-palette, .builder-workspace {
    min-height: 340px;
  }
  .builder-palette {
    max-height: 620px;
    overflow-y: auto;
  }
  .builder-workspace {
    min-height: 520px;
    padding: 10px;
    border: 1px dashed rgba(138, 214, 237, 0.42);
    border-radius: 10px;
    background: rgba(3, 16, 25, 0.72);
  }
  .builder-workspace.drop-over {
    border-color: rgba(91, 209, 169, 0.9);
    box-shadow: 0 0 0 2px rgba(91, 209, 169, 0.2) inset;
  }
  .code-block {
    display: block;
    margin: 6px 0;
    padding: 7px 8px;
    border-radius: 8px;
    border: 1px solid rgba(120, 207, 255, 0.36);
    background: rgba(10, 34, 52, 0.9);
    color: #dff6ff;
    font-family: Menlo, Consolas, monospace;
    font-size: 0.78rem;
    line-height: 1.35;
    cursor: grab;
    white-space: pre-wrap;
  }
  .code-block:active { cursor: grabbing; }
  .builder-actions {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .builder-btn {
    border: 1px solid rgba(247, 178, 103, 0.5);
    background: rgba(247, 178, 103, 0.16);
    color: #fff4e6;
    border-radius: 8px;
    padding: 6px 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.82rem;
  }
  .builder-btn.alt {
    border-color: rgba(91, 209, 169, 0.55);
    background: rgba(91, 209, 169, 0.16);
    color: #e8fff8;
  }
  .builder-output {
    margin-top: 8px;
    white-space: pre-wrap;
    font-size: 0.82rem;
    color: #bde8ff;
  }
  .builder-code {
    margin-top: 8px;
    font-family: Menlo, Consolas, monospace;
    white-space: pre-wrap;
    font-size: 0.78rem;
    line-height: 1.35;
    background: rgba(2, 14, 22, 0.9);
    border: 1px solid rgba(138, 214, 237, 0.3);
    border-radius: 8px;
    padding: 8px;
  }
  .assistant {
    position: sticky;
    top: 12px;
    margin-top: 12px;
    background: rgba(4, 22, 34, 0.92);
    border: 1px solid rgba(91, 209, 169, 0.4);
    border-radius: 12px;
    padding: 12px;
    display: grid;
    gap: 6px;
  }
  .assistant h3 {
    margin: 0 0 6px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(138, 214, 237, 0.35);
  }
  .assistant .small {
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.45;
    margin: 0;
    overflow-wrap: anywhere;
  }
  .rubric-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 0.92rem;
  }
  .rubric-table th, .rubric-table td {
    border: 1px solid rgba(138, 214, 237, 0.35);
    padding: 8px;
    vertical-align: top;
  }
  .rubric-link {
    color: #ffd8aa;
    font-weight: 700;
    text-decoration: none;
  }
  @media (max-width: 960px) {
    .layered-grid { grid-template-columns: 1fr; }
    .lesson-meta { grid-template-columns: 1fr; }
    .builder-grid { grid-template-columns: 1fr; }
    .builder-palette { min-height: 280px; max-height: 420px; }
    .builder-workspace { min-height: 420px; }
  }
</style>

<div class="layered-page" id="cs111-layered-app">
  <h2>CS111 Layered Explorer</h2>
  <p>Click any category, lesson, or topic and the explanation panel updates instantly.</p>

  <div class="layered-controls" id="mode-controls">
    <button class="mode-btn active" data-mode="beginner">Beginner</button>
    <button class="mode-btn" data-mode="developer">Developer</button>
    <button class="mode-btn" data-mode="cs111">CS111</button>
  </div>

  <div class="layered-grid">
    <div class="layered-tree" id="layered-tree"></div>
    <div class="layered-panel">
      <h3 id="panel-title">Select a category, lesson, or topic</h3>
      <div id="panel-body" class="explain-box">Choose any node from the left.</div>
      <div class="lesson-meta">
        <div id="build-steps" class="lesson-meta-box">Build Steps will appear here.</div>
        <div id="assets-topics" class="lesson-meta-box">Assets + related topics will appear here.</div>
      </div>
      <div class="runner-wrap" id="lesson-runner" style="display:none;">
        <div class="runner-title" id="runner-title">Lesson Runner</div>
        <pre class="runner-code" id="runner-code"></pre>
      </div>
      <div id="code-lines" class="explain-box" style="display:none;"></div>
      <button class="code-explain-btn" id="explain-code-btn" style="display:none; margin-top:8px;">Explain This Code</button>
    </div>
  </div>

  <div class="sprite-assistant" id="learning-assistant-sprite" aria-live="polite">
    <div class="speech" id="assistant-speech">Greetings. I am ready to help you build the Aquatic level.</div>
    <div class="assistant-actions" id="assistant-actions">
      <button class="assistant-btn alt" id="assistant-apply">Apply Suggested Change</button>
      <button class="assistant-btn" id="assistant-decline">Decline</button>
    </div>
    <div class="assistant-sprite" id="assistant-sprite" title="Click to toggle assistant"></div>
    <div class="assistant-status" id="assistant-status">Status: idle</div>
  </div>

  <div class="builder" id="aquatic-builder">
    <h3>Aquatic Code Builder Engine</h3>
    <div class="small">Drag blocks from the left into the workspace to build runnable code like a mini game engine editor.</div>
    <div class="builder-grid" style="margin-top:8px;">
      <div class="builder-panel builder-palette" id="builder-palette"></div>
      <div class="builder-panel">
        <div class="topic-boxes" id="lesson-topic-boxes">
          <div class="title">Lesson Required Code Boxes</div>
          <div class="small">Select a lesson to load the topic-specific box list.</div>
        </div>
        <div class="builder-workspace" id="builder-workspace"></div>
      </div>
    </div>
    <div class="builder-actions">
      <button class="builder-btn alt" id="builder-load-lesson">Load Current Lesson Template</button>
      <button class="builder-btn" id="builder-run">Run Built Code</button>
      <button class="builder-btn" id="builder-clear">Clear Workspace</button>
    </div>
    <div class="builder-code" id="builder-preview">// Built code appears here.</div>
    <div class="builder-output" id="builder-output">Builder output appears here.</div>
  </div>

  <h3 style="margin-top:14px;">Clickable Rubric Rows</h3>
  <table class="rubric-table">
    <thead>
      <tr><th>Objective</th><th>Click to Explain</th></tr>
    </thead>
    <tbody id="rubric-body"></tbody>
  </table>
</div>

<script>
(function () {
  const categoryExplanations = {
    oop: {
      title: 'Object-Oriented Programming',
      beginner: 'OOP organizes code into reusable classes and objects so your game can grow without rewriting everything.',
      developer: 'Aquatic uses OOP to model Player, Npc, Enemy, and Shark as specialized classes sharing behavior through inheritance.',
      cs111: 'Category 1 maps to 1.1-1.6: writing classes, methods with parameters, instantiation, inheritance, overriding, constructor chaining.'
    },
    control: {
      title: 'Control Structures',
      beginner: 'Control structures decide what runs and when.',
      developer: 'Aquatic loops over thresholds and uses conditionals to trigger boss phases and quest flow.',
      cs111: 'Category 2 covers iteration, conditionals, and nested conditions for runtime decision making.'
    },
    types: {
      title: 'Data Types',
      beginner: 'Data types define what kind of value a variable stores.',
      developer: 'Aquatic combines numbers, strings, booleans, arrays, and objects for gameplay and state.',
      cs111: 'Category 3 validates type usage in practical game systems and configuration.'
    },
    ops: {
      title: 'Operators',
      beginner: 'Operators let code calculate, compare, and combine values.',
      developer: 'Aquatic uses arithmetic for HP math, string operations for IDs/paths, and boolean operators for phase gates.',
      cs111: 'Category 4 demonstrates mathematical, string, and boolean expressions tied to gameplay logic.'
    },
    io: {
      title: 'Input/Output',
      beginner: 'Input receives player actions; output shows results.',
      developer: 'Aquatic reads keyboard input, renders to canvas, and communicates with backend APIs using async/await.',
      cs111: 'Category 5 requires keyboard handling, rendering lifecycle, API integration, async flow, and JSON parsing.'
    },
    docs: {
      title: 'Documentation',
      beginner: 'Documentation explains what code is doing and why.',
      developer: 'Aquatic comments and notebook highlights make complex behavior teachable and reviewable.',
      cs111: 'Category 6 includes meaningful comments, mini-lesson structure, and objective-aligned code highlights.'
    },
    debug: {
      title: 'Debugging',
      beginner: 'Debugging helps you find why code behaves differently than expected.',
      developer: 'Aquatic debugging includes console tracing, hitbox checks, breakpoints, network inspection, storage checks, and DOM inspection.',
      cs111: 'Category 7 demonstrates systematic verification across runtime logic, requests, state persistence, and rendering.'
    }
  };

  const lessons = {
    '1.1': {
      category: 'oop',
      title: 'Writing Classes',
      definition: 'A class is a blueprint for creating objects.',
      purpose: 'Creates reusable game entities.',
      aquaticExample: 'class Player extends Character',
      whyItMatters: 'Lets Aquatic create many entities that share structure.'
    },
    '1.2': {
      category: 'oop',
      title: 'Methods & Parameters',
      definition: 'Methods are class functions; parameters accept input values.',
      purpose: 'One method can handle many situations.',
      aquaticExample: 'applyPlayerDamage(damage, x, y, source)',
      whyItMatters: 'Damage logic works for different attacks without duplicate code.'
    },
    '1.3': {
      category: 'oop',
      title: 'Instantiation',
      definition: 'Instantiation creates objects from classes.',
      purpose: 'Turns class blueprints into live game objects.',
      aquaticExample: 'const guardian = new Npc(guardianData, this.gameEnv);',
      whyItMatters: 'Without instantiation, no NPC appears in game.'
    },
    '1.4': {
      category: 'oop',
      title: 'Inheritance',
      definition: 'Inheritance allows a class to reuse properties and methods from a parent class.',
      purpose: 'Reduces duplication and keeps behavior consistent.',
      aquaticExample: 'class Player extends Character',
      whyItMatters: 'Player gains movement/collision behavior from Character automatically.'
    },
    '1.5': {
      category: 'oop',
      title: 'Method Overriding',
      definition: 'A child class provides its own version of a parent method.',
      purpose: 'Allows specialization while keeping shared structure.',
      aquaticExample: 'super.update(); // handles patrol, draw, base key listeners',
      whyItMatters: 'Each entity can update differently while using a common lifecycle.'
    },
    '1.6': {
      category: 'oop',
      title: 'Constructor Chaining',
      definition: 'super() calls the parent constructor before child setup.',
      purpose: 'Ensures inherited fields initialize safely.',
      aquaticExample: 'constructor(data, gameEnv) { super(data, gameEnv); }',
      whyItMatters: 'Prevents missing state and broken initialization order.'
    },
    '2.1': {
      category: 'control',
      title: 'Iteration',
      definition: 'Iteration repeats logic over collections or ranges.',
      purpose: 'Checks every threshold or object without manual repetition.',
      aquaticExample: 'thresholds.forEach((threshold) => { ... })',
      whyItMatters: 'Boss thresholds [0.75, 0.5, 0.25] drive reinforcements.'
    },
    '2.2': {
      category: 'control',
      title: 'Conditionals',
      definition: 'Conditionals run different code based on true/false checks.',
      purpose: 'Controls quest and combat branching.',
      aquaticExample: 'if (q1.completed && !q2.accepted) { ... }',
      whyItMatters: 'Prevents wrong dialogue and keeps progression coherent.'
    },
    '2.3': {
      category: 'control',
      title: 'Nested Conditions',
      definition: 'Nested conditions combine multiple requirements before action.',
      purpose: 'Enforces strict gameplay gates.',
      aquaticExample: 'if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {',
      whyItMatters: 'Prevents ability spam and preserves boss pacing.'
    },
    '3.1': {
      category: 'types',
      title: 'Numbers',
      definition: 'Numbers represent measurable quantities.',
      purpose: 'Used for hp, speed, timers, and physics.',
      aquaticExample: 'state.phaseTwoUnlocked = state.hp <= state.maxHp * 0.5;',
      whyItMatters: 'Phase decisions depend on numeric ratios.'
    },
    '3.2': {
      category: 'types',
      title: 'Strings',
      definition: 'Strings store text values.',
      purpose: 'Used for IDs, labels, and asset keys.',
      aquaticExample: "const aquaticSpriteStorageKey = 'aquatic_selected_sprite_v1';",
      whyItMatters: 'Persistent settings and naming rely on stable string keys.'
    },
    '3.3': {
      category: 'types',
      title: 'Booleans',
      definition: 'Booleans represent true or false states.',
      purpose: 'Track active/inactive game features.',
      aquaticExample: 'this.bossState.active = true;',
      whyItMatters: 'State flags gate behavior cleanly.'
    },
    '4.1': {
      category: 'ops',
      title: 'Mathematical Operators',
      definition: 'Math operators compute values.',
      purpose: 'Convert rules into executable thresholds.',
      aquaticExample: 'maxHp * threshold',
      whyItMatters: 'HP breakpoints trigger phase events.'
    },
    '4.2': {
      category: 'ops',
      title: 'String Operations',
      definition: 'String operators combine and format text.',
      purpose: 'Build IDs and asset paths dynamically.',
      aquaticExample: 'id: `MermaidStarGuardian_${Date.now()}_${index}`',
      whyItMatters: 'Dynamic names prevent collisions and simplify loops.'
    },
    '4.3': {
      category: 'ops',
      title: 'Boolean Expressions',
      definition: 'Boolean expressions evaluate logic conditions.',
      purpose: 'Protect execution with multi-condition checks.',
      aquaticExample: 'if (q1.completed && !q2.accepted) {',
      whyItMatters: 'Game actions only fire under valid state combinations.'
    },
    '5.1': {
      category: 'io',
      title: 'Keyboard Input',
      definition: 'Input maps key events to behavior.',
      purpose: 'Turns player key presses into movement.',
      aquaticExample: "window.addEventListener('keydown', this._boundHandleKeyDown);",
      whyItMatters: 'Without input mapping, character control fails.'
    },
    '5.2': {
      category: 'io',
      title: 'Canvas Rendering',
      definition: 'Rendering draws game state to the screen.',
      purpose: 'Synchronizes visual frame updates.',
      aquaticExample: 'player.ctx.drawImage(',
      whyItMatters: 'Visual feedback is required for gameplay clarity.'
    },
    '5.3': {
      category: 'io',
      title: 'API Integration',
      definition: 'API integration exchanges data with services.',
      purpose: 'Connects gameplay to persistence.',
      aquaticExample: 'await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`);',
      whyItMatters: 'Player progress and stats survive beyond one session.'
    },
    '6.1': {
      category: 'docs',
      title: 'Code Comments',
      definition: 'Comments explain intent and context.',
      purpose: 'Speeds up review and maintenance.',
      aquaticExample: '// Initialize touch controls for mobile devices',
      whyItMatters: 'Complex systems stay understandable over time.'
    },
    '6.2': {
      category: 'docs',
      title: 'Mini-Lesson Documentation',
      definition: 'Documentation maps code to learning objectives.',
      purpose: 'Turns implementation into teachable evidence.',
      aquaticExample: '// How to use this file:',
      whyItMatters: 'Students and evaluators can trace outcomes clearly.'
    },
    '6.3': {
      category: 'docs',
      title: 'Code Highlights',
      definition: 'Highlights isolate critical lines for explanation.',
      purpose: 'Focuses attention on high-value evidence.',
      aquaticExample: 'const guardian = new Npc(guardianData, this.gameEnv); this.gameEnv.gameObjects.push(guardian);',
      whyItMatters: 'Shows where concept meets runtime behavior.'
    },
    '7.1': {
      category: 'debug',
      title: 'Console Debugging',
      definition: 'Console logging traces execution at key state changes.',
      purpose: 'Confirms runtime values at transitions without stepping every line.',
      aquaticExample: "console.log('[Aquatic] Quest transition ...')",
      whyItMatters: 'Helps quickly identify bad state transitions and endpoint failures.'
    },
    '7.2': {
      category: 'debug',
      title: 'Hit Box Visualization',
      definition: 'Hitbox visualization draws collision geometry during debug runs.',
      purpose: 'Aligns collision logic with what players visually see.',
      aquaticExample: 'hitbox: { widthPercentage: 0.18, heightPercentage: 0.22 },',
      whyItMatters: 'Prevents invisible unfair collisions and tuning errors.'
    },
    '7.3': {
      category: 'debug',
      title: 'Source-Level Debugging',
      definition: 'Breakpoints pause execution so variables can be inspected line-by-line.',
      purpose: 'Verifies phase gates, cooldown timers, and state branches precisely.',
      aquaticExample: 'if (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) {',
      whyItMatters: 'Finds exact lines where logic diverges from expectations.'
    },
    '7.4': {
      category: 'debug',
      title: 'Network Debugging',
      definition: 'Network debugging verifies request/response flow and headers.',
      purpose: 'Ensures fetch endpoints for progress/stats work reliably.',
      aquaticExample: 'const response = await fetch(`${this.game.javaURI}/bank/${personId}/npcProgress`, this.fetchOptions);',
      whyItMatters: 'Distinguishes backend/CORS issues from front-end logic bugs.'
    },
    '7.5': {
      category: 'debug',
      title: 'Application Debugging',
      definition: 'Application debugging checks cookies and browser storage state.',
      purpose: 'Validates persistence and auth/session behavior.',
      aquaticExample: 'localStorage.getItem(aquaticSpriteStorageKey)',
      whyItMatters: 'Explains why persisted data or authenticated requests fail.'
    },
    '7.6': {
      category: 'debug',
      title: 'Element Inspection',
      definition: 'Element inspection confirms DOM/canvas placement and styles.',
      purpose: 'Verifies runtime-created nodes and layout assumptions.',
      aquaticExample: "const beam = document.createElement('div');",
      whyItMatters: 'Solves invisible canvas, bad layering, and stale UI problems.'
    }
  };

  const lessonBuildPlan = {
    '1.1': {
      steps: ['1) Create Player/Npc class shells.', '2) Wire constructors with data + gameEnv.', '3) Register in this.classes.'],
      assets: ['images/gamebuilder/sprites/scubadiver.png', 'images/gamebuilder/sprites/slime.png'],
      related: ['Classes', 'Constructors', 'Instantiation'],
      runner: `// 1.1 Writing Classes\nclass Character { constructor(data, gameEnv){ this.data = data; this.gameEnv = gameEnv; } }\nclass Player extends Character {}\nconsole.log('Player class ready:', typeof Player === 'function');`
    },
    '1.2': {
      steps: ['1) Add method signature with parameters.', '2) Use parameters to modify state.', '3) Return status for debugging.'],
      assets: ['GameLevelAquaticGameLevel.js method patterns', 'Mermaid attack state objects'],
      related: ['Methods', 'State', 'Debugging'],
      runner: `// 1.2 Methods & Parameters\nfunction applyPlayerDamage(hp, damage, source){\n  const next = Math.max(0, hp - damage);\n  return { next, source };\n}\nconsole.log(applyPlayerDamage(100, 25, 'rocket'));`
    },
    '1.3': {
      steps: ['1) Build object literals for npc config.', '2) Instantiate with new Npc(data, gameEnv).', '3) Push into gameObjects.'],
      assets: ['Starfish Guardian.png', 'megalodon.png'],
      related: ['Objects', 'Arrays', 'Initialization'],
      runner: `// 1.3 Instantiation\nclass Npc { constructor(data, gameEnv){ this.id = data.id; this.gameEnv = gameEnv; } }\nconst gameEnv = { gameObjects: [] };\nconst guardian = new Npc({ id: 'guardian' }, gameEnv);\ngameEnv.gameObjects.push(guardian);\nconsole.log(gameEnv.gameObjects.length);`
    },
    '1.4': {
      steps: ['1) Define parent class.', '2) Extend with child class.', '3) Confirm inherited behavior works.'],
      assets: ['Player.js', 'Npc.js', 'Enemy.js'],
      related: ['extends', 'super()', 'Method Overriding'],
      runner: `// 1.4 Inheritance\nclass GameObject { update(){ return 'base'; } }\nclass Character extends GameObject {}\nclass Player extends Character {}\nconsole.log(new Player().update());`
    },
    '1.5': {
      steps: ['1) Add base update().', '2) Override update() in child.', '3) Call super.update() and extend behavior.'],
      assets: ['mermaid spritesheet states', 'boss update cycle'],
      related: ['Polymorphism', 'Update Loop', 'super.update()'],
      runner: `// 1.5 Method Overriding\nclass Enemy { update(){ return 'enemy-base'; } }\nclass Shark extends Enemy { update(){ return super.update() + ' -> shark'; } }\nconsole.log(new Shark().update());`
    },
    '1.6': {
      steps: ['1) Use constructor(data, gameEnv).', '2) Call super(...) first.', '3) Add child fields after super call.'],
      assets: ['selectedAquaticSprite object', 'playerData object'],
      related: ['Constructors', 'Inheritance', 'Initialization Order'],
      runner: `// 1.6 Constructor Chaining\nclass Character { constructor(data){ this.id = data.id; } }\nclass Player extends Character { constructor(data){ super(data); this.hp = 100; } }\nconsole.log(new Player({ id: 'aqua' }));`
    },
    '2.1': {
      steps: ['1) Define threshold array.', '2) Loop with forEach.', '3) Trigger phase action in loop.'],
      assets: ['threshold arrays in boss logic'],
      related: ['Arrays', 'Conditionals', 'Boss Phases'],
      runner: `// 2.1 Iteration\nconst thresholds = [0.75, 0.5, 0.25];\nconst hp = 46;\nthresholds.forEach((t) => { if (hp <= 100 * t) console.log('trigger', t); });`
    },
    '2.2': {
      steps: ['1) Define quest flags.', '2) Gate dialogue with if/else.', '3) Verify transitions in order.'],
      assets: ['Slime dialogue flow', 'questState flags'],
      related: ['Booleans', 'Quest Logic', 'UI Messaging'],
      runner: `// 2.2 Conditionals\nconst q1 = { completed: true };\nconst q2 = { accepted: false };\nif (q1.completed && !q2.accepted) console.log('Offer Quest 2');`
    },
    '2.3': {
      steps: ['1) Track unlock flags.', '2) Add cooldown check.', '3) Execute ability only when all conditions pass.'],
      assets: ['Mermaid laser timing state'],
      related: ['Boolean Expressions', 'Cooldown Systems', 'Boss Abilities'],
      runner: `// 2.3 Nested Conditions\nconst state = { phaseTwo: true, phaseThree: true, nextLaserAt: 10 };\nconst now = 15;\nif (state.phaseTwo && now >= state.nextLaserAt && state.phaseThree) console.log('Laser ready');`
    },
    '3.1': {
      steps: ['1) Keep hp/maxHp numeric.', '2) Compute ratio.', '3) Use ratio for behavior gates.'],
      assets: ['bossState.hp', 'bossState.maxHp'],
      related: ['Math', 'Thresholds', 'UI Bars'],
      runner: `// 3.1 Numbers\nconst hp = 48; const maxHp = 100;\nconst ratio = hp / maxHp;\nconsole.log('ratio', ratio);`
    },
    '3.2': {
      steps: ['1) Define stable keys for storage.', '2) Build paths from base path.', '3) Reuse names across reads/writes.'],
      assets: ['aquatic_selected_sprite_v1', 'spriteAssetPath'],
      related: ['localStorage', 'Path Building', 'Identifiers'],
      runner: `// 3.2 Strings\nconst path = '/portfolio';\nconst spritePath = path + '/images/gamebuilder/sprites';\nconst key = 'aquatic_selected_sprite_v1';\nconsole.log(spritePath, key);`
    },
    '3.3': {
      steps: ['1) Set state flags.', '2) Use flags before actions.', '3) Toggle during events.'],
      assets: ['frontMenuActive', 'bossState.active'],
      related: ['State Machines', 'Conditionals', 'Flow Control'],
      runner: `// 3.3 Booleans\nconst state = { frontMenuActive: false, bossActive: true };\nif (state.bossActive && !state.frontMenuActive) console.log('Combat loop running');`
    },
    '4.1': {
      steps: ['1) Compute breakpoint = maxHp * threshold.', '2) Compare current hp.', '3) Trigger event at boundary.'],
      assets: ['threshold trigger checks'],
      related: ['Numbers', 'Conditionals', 'Balance Tuning'],
      runner: `// 4.1 Mathematical Operators\nconst maxHp = 200, threshold = 0.5, hp = 98;\nif (hp <= maxHp * threshold) console.log('phase trigger');`
    },
    '4.2': {
      steps: ['1) Build id templates.', '2) Build asset paths.', '3) Reuse generated names in arrays/maps.'],
      assets: ['starfish ids', 'backgroundAssetPath'],
      related: ['Strings', 'Arrays', 'Asset Loading'],
      runner: `// 4.2 String Operations\nfor (let i = 0; i < 3; i++) console.log(` + "`starfish_${i}`" + `);`
    },
    '4.3': {
      steps: ['1) Group required states.', '2) Use && / || / ! as needed.', '3) Keep conditions readable with temp vars.'],
      assets: ['phaseTwoUnlocked', 'phaseThreeUnlocked', 'nextLaserAt'],
      related: ['Nested Conditions', 'Readability', 'Debugging'],
      runner: `// 4.3 Boolean Expressions\nconst active = true, cdReady = true, alive = true;\nconst canCast = active && cdReady && alive;\nconsole.log('canCast', canCast);`
    },
    '5.1': {
      steps: ['1) Define key mappings.', '2) Listen to keydown/keyup.', '3) Convert key state to movement direction.'],
      assets: ['keypress WASD map', 'pressedKeys object'],
      related: ['Event Listeners', 'State Updates', 'Movement'],
      runner: `// 5.1 Keyboard Input\nconst keypress = { up: 87, right: 68 };\nconst pressed = [87, 68];\nconst move = pressed.includes(keypress.up) && pressed.includes(keypress.right) ? 'upRight' : 'idle';\nconsole.log(move);`
    },
    '5.2': {
      steps: ['1) Call draw() in update().', '2) Keep update frequency consistent.', '3) Render after state changes.'],
      assets: ['Aquatic background', 'sprite sheets for diver and bosses'],
      related: ['Game Loop', 'Canvas', 'Animation Frames'],
      runner: `// 5.2 Canvas Rendering\nfunction draw(){ return 'frame drawn'; }\nfunction update(){ return draw(); }\nconsole.log(update());`
    },
    '5.3': {
      steps: ['1) Build endpoint from javaURI.', '2) await fetch(...) with options.', '3) parse JSON and guard !response.ok.'],
      assets: ['/bank/${personId}/npcProgress endpoint', 'fetchOptions'],
      related: ['Async/Await', 'JSON Parsing', 'Error Handling'],
      runner: `// 5.3 API Integration\nasync function fakeFetch(){ return { ok: true, json: async () => ({ saved: true }) }; }\nconst r = await fakeFetch();\nconsole.log((await r.json()).saved);`
    },
    '6.1': {
      steps: ['1) Comment intent before complex logic.', '2) Keep comments specific to gameplay purpose.', '3) Update comments when logic changes.'],
      assets: ['TouchControls init', 'boss phase comments'],
      related: ['Maintainability', 'Reviews', 'Teaching'],
      runner: `// 6.1 Code Comments\n// Initialize touch controls for mobile so non-keyboard users can move.\nconst controlsReady = true;\nconsole.log('controlsReady', controlsReady);`
    },
    '6.2': {
      steps: ['1) Map lesson to objective number.', '2) Add aquatic evidence line.', '3) Add why-it-matters statement.'],
      assets: ['CS111 rubric markdown sections'],
      related: ['Curriculum Mapping', 'Evidence', 'Portfolio Quality'],
      runner: `// 6.2 Mini-Lesson Documentation\nconst lessonDoc = { objective: '1.4', evidence: 'class Player extends Character' };\nconsole.log(lessonDoc);`
    },
    '6.3': {
      steps: ['1) Pick critical production snippet.', '2) Annotate line purpose.', '3) Link snippet to game behavior.'],
      assets: ['new Npc(...)', 'gameObjects.push(...)'],
      related: ['Code Reading', 'Runtime Effects', 'Debugging'],
      runner: `// 6.3 Code Highlights\nclass Npc { constructor(data){ this.id = data.id; } }\nconst gameObjects = [];\nconst boss = new Npc({ id: 'boss' });\ngameObjects.push(boss);\nconsole.log('registered', gameObjects[0].id);`
    },
    '7.1': {
      steps: ['1) Add one-time logs at state transitions.', '2) Include key runtime values in logs.', '3) Remove noisy logs after validation.'],
      assets: ['quest state transitions', 'boss state values'],
      related: ['Console', 'State Validation', 'Runtime Tracing'],
      runner: `// 7.1 Console Debugging\nconst state = { quest: 'q2_prompt', hp: 120 };\nconsole.log('[Aquatic] transition', state.quest, 'hp', state.hp);`
    },
    '7.2': {
      steps: ['1) Draw debug hit circles.', '2) Use same radii as collision checks.', '3) Remove overlay after tuning.'],
      assets: ['player hit radius', 'boss hit radius'],
      related: ['Collision', 'Canvas', 'Debug Overlay'],
      runner: `// 7.2 Hit Box Visualization\nfunction drawHitbox(x, y, r){ return { x, y, r }; }\nconsole.log(drawHitbox(100, 120, 20));`
    },
    '7.3': {
      steps: ['1) Set breakpoint at phase gate.', '2) Inspect state variables.', '3) Step through updates line-by-line.'],
      assets: ['phaseTwoUnlocked', 'nextLaserAt', 'phaseThreeUnlocked'],
      related: ['Sources', 'Breakpoints', 'Scope Inspection'],
      runner: `// 7.3 Source-Level Debugging\nconst state = { phaseTwoUnlocked: true, nextLaserAt: 10, phaseThreeUnlocked: true };\nconst now = 11;\nif (state.phaseTwoUnlocked && now >= state.nextLaserAt && state.phaseThreeUnlocked) console.log('breakpoint target line');`
    },
    '7.4': {
      steps: ['1) Trigger fetch request.', '2) Inspect headers/payload/response.', '3) Resolve CORS/auth mismatch from server config.'],
      assets: ['npcProgress endpoint', 'stats endpoint'],
      related: ['Network Tab', 'Fetch/XHR', 'CORS'],
      runner: `// 7.4 Network Debugging\nconst request = { url: '/bank/1/npcProgress', method: 'GET' };\nconsole.log('inspect network for', request.url, request.method);`
    },
    '7.5': {
      steps: ['1) Check cookies/session token.', '2) Verify local/session storage keys.', '3) Validate expiry and SameSite behavior.'],
      assets: ['aquatic_selected_sprite_v1', 'session cookie'],
      related: ['Application Tab', 'Storage', 'Cookies'],
      runner: `// 7.5 Application Debugging\nconst key = 'aquatic_selected_sprite_v1';\nlocalStorage.setItem(key, 'scuba-diver');\nconsole.log('stored key', key, localStorage.getItem(key));`
    },
    '7.6': {
      steps: ['1) Inspect canvas node.', '2) Confirm parent positioning and z-index.', '3) Validate HUD style updates while running.'],
      assets: ['canvas container', 'HUD elements'],
      related: ['Elements Tab', 'Computed Styles', 'DOM Structure'],
      runner: `// 7.6 Element Inspection\nconst info = { canvasId: 'aquatic-canvas', parentPosition: 'relative', hudBound: true };\nconsole.log('inspect dom config', info);`
    }
  };

  const topics = {
    extends: {
      title: 'Keyword: extends',
      body: 'Purpose:\nCreates an inheritance relationship.\n\nExample:\nclass Shark extends Enemy\n\nResult:\nShark receives methods and properties from Enemy.'
    },
    super: {
      title: 'Keyword: super()',
      body: 'Purpose:\nCalls the parent constructor/method.\n\nExample:\nconstructor(data, gameEnv) { super(data, gameEnv); }\n\nResult:\nParent initialization runs before child setup.'
    },
    className: {
      title: 'Topic: Class Name',
      body: 'Purpose:\nNames a blueprint for objects.\n\nExample:\nclass Player extends Character\n\nResult:\nnew Player() creates player instances.'
    }
  };

  const categoryLessons = {
    oop: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
    control: ['2.1', '2.2', '2.3'],
    types: ['3.1', '3.2', '3.3'],
    ops: ['4.1', '4.2', '4.3'],
    io: ['5.1', '5.2', '5.3'],
    docs: ['6.1', '6.2', '6.3'],
    debug: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6']
  };

  const root = document.getElementById('cs111-layered-app');
  if (!root) return;

  const tree = root.querySelector('#layered-tree');
  const panelTitle = root.querySelector('#panel-title');
  const panelBody = root.querySelector('#panel-body');
  const buildSteps = root.querySelector('#build-steps');
  const assetsTopics = root.querySelector('#assets-topics');
  const lessonRunner = root.querySelector('#lesson-runner');
  const runnerTitle = root.querySelector('#runner-title');
  const runnerCode = root.querySelector('#runner-code');
  const codeBtn = root.querySelector('#explain-code-btn');
  const codeLines = root.querySelector('#code-lines');
  const rubricBody = root.querySelector('#rubric-body');
  const builderPalette = root.querySelector('#builder-palette');
  const builderWorkspace = root.querySelector('#builder-workspace');
  const lessonTopicBoxes = root.querySelector('#lesson-topic-boxes');
  const builderPreview = root.querySelector('#builder-preview');
  const builderOutput = root.querySelector('#builder-output');
  const builderLoadLessonBtn = root.querySelector('#builder-load-lesson');
  const builderRunBtn = root.querySelector('#builder-run');
  const builderClearBtn = root.querySelector('#builder-clear');

  const assistantWrap = root.querySelector('#learning-assistant-sprite');
  const assistantSpeech = root.querySelector('#assistant-speech');
  const assistantSprite = root.querySelector('#assistant-sprite');
  const assistantStatus = root.querySelector('#assistant-status');
  const assistantActions = root.querySelector('#assistant-actions');
  const assistantApplyBtn = root.querySelector('#assistant-apply');
  const assistantDeclineBtn = root.querySelector('#assistant-decline');

  let currentMode = 'beginner';
  let currentLessonId = null;
  let currentContext = { title: 'None', summary: 'Click any node to begin.', related: 'Classes, Constructors, Methods' };
  let assistantOn = true;
  let pendingFix = null;
  let lastProblemNode = null;
  const assistantHome = { right: 16, top: Math.max(20, window.innerHeight - 190) };

  const assistantFrames = {
    idle: [0, 0],
    greeting: [0, 1],
    start: [0, 2],
    checking: [0, 3],
    thinking: [1, 0],
    solved: [1, 1],
    suggestion: [1, 2],
    applying: [1, 3],
    runner: [2, 0],
    deleting: [2, 1],
    success: [2, 2],
    moving: [2, 3],
    offA: [3, 2],
    offB: [3, 3]
  };

  const lessonOrder = Object.keys(lessons);
  const completedLessons = new Set();

  function getPreviousLessonId(lessonId) {
    const idx = lessonOrder.indexOf(lessonId);
    if (idx <= 0) return null;
    return lessonOrder[idx - 1];
  }

  function isLessonUnlocked(lessonId) {
    const prev = getPreviousLessonId(lessonId);
    if (!prev) return true;
    return completedLessons.has(prev);
  }

  function markLessonCompleted(lessonId) {
    if (!lessonId || completedLessons.has(lessonId)) return;
    completedLessons.add(lessonId);
    renderTree();
    renderRubricLinks();
  }

  function getCurrentLessonGuidance() {
    if (!currentLessonId || !lessonBuildPlan[currentLessonId]) return null;
    return lessonBuildPlan[currentLessonId];
  }

  function makeLessonBlock(lessonId, step, index) {
    const lesson = lessons[lessonId];
    const build = lessonBuildPlan[lessonId];
    const stepTitle = String(step || '').replace(/^\d+\)\s*/, '').trim();
    const asset = build.assets[index % Math.max(1, build.assets.length)] || 'Aquatic runtime';
    const related = build.related[index % Math.max(1, build.related.length)] || lesson.title;
    const evidence = lesson.aquaticExample;
    const code = [
      `recordAquaticStep(${JSON.stringify(lessonId)}, ${index + 1}, ${JSON.stringify(stepTitle)}, ${JSON.stringify(evidence)}, ${JSON.stringify(asset)}, ${JSON.stringify(related)});`,
      `console.log(${JSON.stringify(`${lessonId}.${index + 1}`)}, ${JSON.stringify(stepTitle)});`
    ].join('\n');
    return {
      id: `lesson-${lessonId}-block-${index + 1}`,
      lessonId,
      sequence: index + 1,
      label: `${lessonId}.${index + 1} ${stepTitle}`,
      code,
      evidence,
      asset,
      related
    };
  }

  function getLessonBlocks(lessonId) {
    const build = lessonId ? lessonBuildPlan[lessonId] : null;
    if (!build) return [];
    return build.steps.map((step, index) => makeLessonBlock(lessonId, step, index));
  }

  function getWorkspaceBlocks() {
    return Array.from(builderWorkspace.querySelectorAll('.code-block'));
  }

  function getWorkspaceLessonBlocks(lessonId) {
    return getWorkspaceBlocks().filter((node) => node.dataset.lessonId === lessonId);
  }

  function getWorkspaceLessonBlockIds(lessonId) {
    return getWorkspaceLessonBlocks(lessonId).map((node) => node.dataset.blockId);
  }

  function assessLessonBuild(lessonId) {
    const required = getLessonBlocks(lessonId);
    const placed = getWorkspaceLessonBlocks(lessonId);
    const placedIds = placed.map((node) => node.dataset.blockId);
    const missing = required.filter((block) => !placedIds.includes(block.id));
    const extra = placed.filter((node) => !required.some((block) => block.id === node.dataset.blockId));
    const orderedIds = required.map((block) => block.id);
    const placedRequiredIds = placed
      .filter((node) => orderedIds.includes(node.dataset.blockId))
      .map((node) => node.dataset.blockId);
    const orderMatches = placedRequiredIds.every((id, index) => id === orderedIds[index]);
    return {
      required,
      placed,
      missing,
      extra,
      complete: required.length > 0 && missing.length === 0 && extra.length === 0 && placed.length === required.length,
      orderMatches
    };
  }

  function getWorkspaceLabels() {
    return getWorkspaceBlocks().map((node) => {
      const raw = (node.textContent || '').split('\n')[0] || '';
      return raw.replace(/\s*\(\d+\)\s*$/, '').trim();
    });
  }

  function renderLessonTopicBoxes() {
    if (!lessonTopicBoxes) return;
    const required = currentLessonId ? getLessonBlocks(currentLessonId) : [];
    const placedIds = currentLessonId ? getWorkspaceLessonBlockIds(currentLessonId) : [];
    lessonTopicBoxes.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = currentLessonId ? `Lesson ${currentLessonId} Exact Code Boxes (${placedIds.length}/${required.length})` : 'Lesson Required Code Boxes';
    lessonTopicBoxes.appendChild(title);
    if (!required.length) {
      const msg = document.createElement('div');
      msg.className = 'small';
      msg.textContent = 'Select an unlocked lesson to load its exact single-use code boxes.';
      lessonTopicBoxes.appendChild(msg);
      return;
    }
    required.forEach((block) => {
      const item = document.createElement('div');
      item.className = 'item';
      if (placedIds.includes(block.id)) item.classList.add('done');
      item.textContent = block.label;
      lessonTopicBoxes.appendChild(item);
    });
  }

  function getNextMissingBlock(lessonId) {
    const assessment = assessLessonBuild(lessonId);
    return assessment.missing[0] || null;
  }

  function consumePaletteBlock(blockId) {
    const node = builderPalette.querySelector(`.code-block[data-block-id="${blockId}"]`);
    if (node) node.remove();
  }

  function placeLessonBlockFromAssistant(block) {
    if (!block) return;
    if (block.lessonId !== currentLessonId) {
      speak(`That suggestion was for lesson ${block.lessonId}. Current lesson is ${currentLessonId || 'none'}, so I will not place it.`, 'checking');
      renderBuilderPalette();
      return;
    }
    consumePaletteBlock(block.id);
    appendWorkspaceBlock(block, createWorkspaceInstanceId(block.id));
    renderBuilderPalette();
    renderLessonTopicBoxes();
    refreshBuilderPreview();
  }

  function offerAssistantFix(report, fixFn, problemNode) {
    pendingFix = fixFn;
    lastProblemNode = problemNode || null;
    assistantActions.classList.add('show');
    speak(report, 'suggestion');
    if (problemNode) flyAssistantToNode(problemNode);
  }

  function guidePlayerNextStep() {
    if (!assistantOn) return;
    const lesson = getCurrentLessonGuidance();
    if (!lesson || !currentLessonId) {
      assistantActions.classList.remove('show');
      speak('Pick lesson 1.1 first. I will load only the exact blocks for that lesson and unlock the next lesson after a clean run.', 'greeting');
      return;
    }
    const assessment = assessLessonBuild(currentLessonId);
    if (assessment.complete) {
      assistantActions.classList.remove('show');
      speak(`Lesson ${currentLessonId} has the exact ${assessment.required.length} blocks. Run the builder to validate and unlock the next lesson.`, 'success');
      return;
    }
    const next = assessment.missing[0];
    if (next) {
      offerAssistantFix(
        `Lesson ${currentLessonId}: next 1:1 Aquatic block is "${next.label}". I can place that single-use block for you.`,
        () => placeLessonBlockFromAssistant(next)
      );
      return;
    }
    if (!assessment.orderMatches) {
      offerAssistantFix(
        `Lesson ${currentLessonId}: the right blocks are present, but their order does not match the build steps. I can reorder this lesson's blocks.`,
        () => reorderCurrentLessonBlocks()
      );
    }
  }

  function explainPlacedBlockAndNext() {
    if (!assistantOn || !currentLessonId) return;
    const blocks = getWorkspaceLessonBlocks(currentLessonId);
    if (!blocks.length) return;
    const last = blocks[blocks.length - 1];
    const label = ((last.textContent || '').split('\n')[0] || '').trim();
    const evidence = last.dataset.evidence || 'Aquatic implementation evidence';
    const next = getNextMissingBlock(currentLessonId);
    const nextText = next ? `Next, add "${next.label}".` : 'All exact boxes for this lesson are placed. Run the builder.';
    speak(`${label}: maps to "${evidence}". ${nextText}`, next ? 'thinking' : 'success');
  }

  function reorderCurrentLessonBlocks() {
    if (!currentLessonId) return;
    const required = getLessonBlocks(currentLessonId);
    required.forEach((block) => {
      const node = builderWorkspace.querySelector(`.code-block[data-block-id="${block.id}"][data-lesson-id="${currentLessonId}"]`);
      if (node) builderWorkspace.appendChild(node);
    });
    refreshBuilderPreview();
    renderLessonTopicBoxes();
    speak(`Lesson ${currentLessonId} blocks are now ordered to match the build steps.`, 'solved');
  }

  function startWorkspaceWatcher() {
    const observer = new MutationObserver(() => {
      renderLessonTopicBoxes();
      explainPlacedBlockAndNext();
    });
    observer.observe(builderWorkspace, { childList: true, subtree: false });
  }

  let dragPayload = null;
  let draggedElement = null;

  function setAssistantFrame(name) {
    const frame = assistantFrames[name] || assistantFrames.idle;
    assistantSprite.style.backgroundPosition = `${-96 * frame[1]}px ${-96 * frame[0]}px`;
    assistantStatus.textContent = `Status: ${name}`;
  }

  function speak(message, frame) {
    assistantSpeech.textContent = message;
    if (frame) setAssistantFrame(frame);
  }

  function flyAssistantToNode(node) {
    if (!assistantOn || !node) return Promise.resolve();
    const rect = node.getBoundingClientRect();
    const nextLeft = Math.max(8, Math.min(window.innerWidth - 120, rect.left - 110));
    const nextRight = Math.max(8, window.innerWidth - nextLeft - 280);
    const nextTop = Math.max(8, Math.min(window.innerHeight - 140, rect.top - 70));
    setAssistantFrame('moving');
    assistantWrap.style.right = `${nextRight}px`;
    assistantWrap.style.top = `${nextTop}px`;
    return new Promise((resolve) => setTimeout(resolve, 760));
  }

  function flyAssistantHome() {
    if (!assistantOn) return;
    setAssistantFrame('moving');
    assistantWrap.style.right = `${assistantHome.right}px`;
    assistantWrap.style.top = `${assistantHome.top}px`;
    setTimeout(() => setAssistantFrame('idle'), 760);
  }

  function clearApplyPrompt(statusMessage, frame) {
    assistantActions.classList.remove('show');
    pendingFix = null;
    lastProblemNode = null;
    speak(statusMessage, frame);
    flyAssistantHome();
  }

  function showExplanation(title, body, related) {
    panelTitle.textContent = title;
    panelBody.textContent = body;
    currentContext = { title, summary: body.split('\n')[0], related };
    if (assistantOn) {
      speak(`Now viewing ${currentContext.title}. ${currentContext.summary}`, 'greeting');
    }
  }

  function showCategory(catId) {
    const c = categoryExplanations[catId];
    if (!c) return;
    const body = `${c[currentMode]}\n\nWhy This Exists in the Game:\n${buildWhy(catId)}`;
    showExplanation(c.title, body, 'Classes, Methods, State');
    buildSteps.textContent = 'Build Steps:\nSelect a lesson to see 1:1 implementation steps for your Aquatic file.';
    assetsTopics.textContent = 'Assets + Related Topics:\nSelect a lesson to see exact asset references and linked concepts.';
    lessonRunner.style.display = 'none';
    codeBtn.style.display = 'none';
    codeLines.style.display = 'none';
    guidePlayerNextStep();
  }

  function showLesson(lessonId) {
    const l = lessons[lessonId];
    if (!l) return;
    if (!isLessonUnlocked(lessonId)) {
      const prev = getPreviousLessonId(lessonId);
      const msg = `Lesson ${lessonId} is locked. Complete lesson ${prev} first to unlock it.`;
      builderOutput.textContent = msg;
      showExplanation('Lesson Locked', msg, 'Complete prior lesson first');
      speak(msg, 'checking');
      return;
    }
    currentLessonId = lessonId;
    const body = [
      `Definition:\n${l.definition}`,
      `Purpose:\n${l.purpose}`,
      `Aquatic Example:\n${l.aquaticExample}`,
      `Why It Matters:\n${l.whyItMatters}`
    ].join('\n\n');
    const build = lessonBuildPlan[lessonId];
    const guidedBody = `${body}\n\n1:1 Build Guidance:\nUse this lesson to implement the same pattern in GameLevelAquaticGameLevel.js.`;
    showExplanation(`${lessonId} ${l.title}`, guidedBody, (build?.related || ['Category', 'Topics', 'Challenges']).join(', '));

    if (build) {
      buildSteps.textContent = `Build Steps:\n${build.steps.join('\n')}`;
      assetsTopics.textContent = `Assets Used:\n- ${build.assets.join('\n- ')}\n\nRelated Topics:\n- ${build.related.join('\n- ')}`;
      lessonRunner.style.display = '';
      runnerTitle.textContent = `Lesson Runner: ${lessonId} ${l.title}`;
      runnerCode.textContent = `%%js\n\n${build.runner}`;
    } else {
      buildSteps.textContent = 'Build Steps:\nNo specific lesson build plan available.';
      assetsTopics.textContent = 'Assets + Related Topics:\nNo specific lesson metadata available.';
      lessonRunner.style.display = 'none';
    }

    if (lessonId === '1.4') {
      codeBtn.style.display = '';
      codeBtn.dataset.lines = JSON.stringify([
        'Line 1: Creates a Player class.',
        'Line 2: Uses inheritance through extends.',
        'Line 3: Defines the constructor.',
        'Line 4: Calls the parent constructor with super().' 
      ]);
    } else {
      codeBtn.style.display = 'none';
      codeLines.style.display = 'none';
    }
    renderLessonTopicBoxes();
    renderBuilderPalette();
    guidePlayerNextStep();
  }

  function makeCodeBlock(block, allowDragFromWorkspace, instanceId) {
    const el = document.createElement('div');
    el.className = 'code-block';
    el.draggable = true;
    el.dataset.blockId = block.id;
    el.dataset.instanceId = instanceId || `${block.id}-instance`;
    el.dataset.lessonId = block.lessonId || '';
    el.dataset.sequence = block.sequence || '';
    el.dataset.evidence = block.evidence || '';
    el.dataset.code = block.code;
    el.textContent = `${block.label}\n${block.code}`;
    el.addEventListener('dragstart', (event) => {
      draggedElement = el;
      dragPayload = {
        id: block.id,
        code: block.code,
        label: block.label,
        lessonId: block.lessonId || '',
        sequence: block.sequence || '',
        evidence: block.evidence || '',
        fromWorkspace: !!allowDragFromWorkspace,
        instanceId: el.dataset.instanceId
      };
      event.dataTransfer.setData('text/plain', JSON.stringify(dragPayload));
      event.dataTransfer.effectAllowed = 'move';
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      dragPayload = null;
      draggedElement = null;
    });
    if (allowDragFromWorkspace) {
      const del = document.createElement('button');
      del.className = 'code-delete';
      del.textContent = 'x';
      del.title = 'Delete this code box';
      del.addEventListener('click', async (event) => {
        event.stopPropagation();
        await flyAssistantToNode(el);
        speak('Deleting selected code box.', 'deleting');
        el.remove();
        refreshBuilderPreview();
        builderOutput.textContent = 'Deleted one code box from workspace.';
        renderLessonTopicBoxes();
        flyAssistantHome();
      });
      el.appendChild(del);
    }
    return el;
  }

  function renderBuilderPalette() {
    builderPalette.innerHTML = '';
    const note = document.createElement('div');
    note.className = 'small';
    if (!currentLessonId) {
      note.textContent = 'Palette: select an unlocked lesson to load its exact single-use Aquatic build blocks.';
      builderPalette.appendChild(note);
      return;
    }
    const assessment = assessLessonBuild(currentLessonId);
    note.textContent = `Palette for lesson ${currentLessonId}: ${assessment.missing.length} single-use block(s) remaining. Dropped blocks disappear from this palette.`;
    builderPalette.appendChild(note);
    if (!assessment.missing.length) {
      const done = document.createElement('div');
      done.className = 'small';
      done.textContent = 'All exact blocks for this lesson are already in the workspace.';
      builderPalette.appendChild(done);
      return;
    }
    assessment.missing.forEach((block) => {
      builderPalette.appendChild(makeCodeBlock(block, false, `${block.id}-palette`));
    });
  }

  function getWorkspaceCode() {
    const blocks = Array.from(builderWorkspace.querySelectorAll('.code-block'));
    return blocks.map((node) => node.dataset.code || '').join('\n\n');
  }

  function refreshBuilderPreview() {
    const built = getWorkspaceCode();
    builderPreview.textContent = built.trim().length ? built : '// Built code appears here.';
  }

  function clearWorkspace() {
    builderWorkspace.innerHTML = '<div class="small">Workspace: drop blocks here in the order you want to execute.</div>';
    builderOutput.textContent = 'Builder output appears here.';
    refreshBuilderPreview();
    renderBuilderPalette();
    renderLessonTopicBoxes();
  }

  function appendWorkspaceBlock(block, instanceId) {
    const node = makeCodeBlock(block, true, instanceId || createWorkspaceInstanceId(block.id));
    node.title = 'Drag to reorder. Each palette block can be used once.';
    builderWorkspace.appendChild(node);
    refreshBuilderPreview();
    guidePlayerNextStep();
  }

  function createWorkspaceInstanceId(blockId) {
    const safeId = String(blockId || 'block').replace(/[^a-zA-Z0-9_-]/g, '-');
    return `${safeId}-workspace-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function loadLessonTemplate() {
    if (!currentLessonId || !lessonBuildPlan[currentLessonId]) {
      builderOutput.textContent = 'Select a lesson first, then click Load Current Lesson Template.';
      return;
    }
    clearWorkspace();
    getLessonBlocks(currentLessonId).forEach((block) => {
      appendWorkspaceBlock(block, createWorkspaceInstanceId(block.id));
    });
    renderBuilderPalette();
    builderOutput.textContent = `Loaded all exact single-use blocks for lesson ${currentLessonId}.`;
    speak(`Template for lesson ${currentLessonId} loaded with the exact required blocks. Run to validate and unlock the next lesson.`, 'start');
    guidePlayerNextStep();
  }

  async function runBuiltCode() {
    const code = getWorkspaceCode();
    if (!code.trim()) {
      builderOutput.textContent = 'Workspace is empty. Drag blocks into the workspace first.';
      guidePlayerNextStep();
      return;
    }
    const logs = [];
    const capture = (...args) => logs.push(args.map((x) => String(x)).join(' '));
    try {
      speak('Checking your code runner now.', 'runner');
      const prelude = `
        const aquaticBuild = {
          lessons: [],
          evidence: [],
          assets: new Set(),
          related: new Set(),
          gameEnv: { gameObjects: [] },
          summary() {
            return this.lessons.map((item) => item.lessonId + '.' + item.step + ' ' + item.title).join(' | ');
          }
        };
        function recordAquaticStep(lessonId, step, title, evidence, asset, related) {
          aquaticBuild.lessons.push({ lessonId, step, title, evidence, asset, related });
          aquaticBuild.evidence.push(evidence);
          aquaticBuild.assets.add(asset);
          aquaticBuild.related.add(related);
          return aquaticBuild.lessons[aquaticBuild.lessons.length - 1];
        }
      `;
      const epilogue = `
        console.log('Aquatic build steps recorded:', aquaticBuild.lessons.length);
        console.log('Latest build path:', aquaticBuild.summary());
      `;
      const fn = new Function('console', `return (async () => { ${prelude}\n${code}\n${epilogue} })();`);
      await fn({ log: capture });
      let output = logs.length ? logs.join('\n') : 'Code executed with no console output.';
      if (currentLessonId) {
        const assessment = assessLessonBuild(currentLessonId);
        if (assessment.complete && assessment.orderMatches) {
          const completedId = currentLessonId;
          const wasCompleted = completedLessons.has(currentLessonId);
          markLessonCompleted(currentLessonId);
          const nextId = lessonOrder[lessonOrder.indexOf(currentLessonId) + 1] || null;
          if (!wasCompleted) {
            output += `\nLesson ${completedId} completed.`;
            if (nextId) output += ` Lesson ${nextId} is now unlocked.`;
          }
          builderOutput.textContent = output;
          if (nextId && isLessonUnlocked(nextId)) {
            showLesson(nextId);
            speak(`Lesson ${completedId} complete. Lesson ${nextId} is unlocked and its single-use palette is loaded.`, 'success');
          } else {
            speak('All lessons are complete. Your Aquatic CS111 build path is unlocked.', 'success');
          }
          return;
        }
        if (assessment.missing.length) {
          output += `\nLesson ${currentLessonId} not completed yet. Missing: ${assessment.missing.map((block) => block.label).join(', ')}.`;
        } else if (!assessment.orderMatches) {
          output += `\nLesson ${currentLessonId} has the right blocks but they are not in build-step order.`;
        }
      }
      builderOutput.textContent = output;
      guidePlayerNextStep();
    } catch (err) {
      const message = err && err.message ? err.message : String(err);
      builderOutput.textContent = `Run error: ${message}`;
      const next = currentLessonId ? getNextMissingBlock(currentLessonId) : null;
      if (next) {
        offerAssistantFix(
          `Run stopped because lesson ${currentLessonId} is incomplete. I can add the next exact block: "${next.label}".`,
          () => placeLessonBlockFromAssistant(next)
        );
      } else {
        offerAssistantFix(
          `Run error: ${message}. I can rebuild the current lesson's exact block order from the workspace state.`,
          () => reorderCurrentLessonBlocks()
        );
      }
    }
  }

  function setupBuilderDnD() {
    builderWorkspace.addEventListener('dragover', (event) => {
      event.preventDefault();
      builderWorkspace.classList.add('drop-over');
      event.dataTransfer.dropEffect = 'move';
    });
    builderWorkspace.addEventListener('dragleave', () => builderWorkspace.classList.remove('drop-over'));
    builderWorkspace.addEventListener('drop', (event) => {
      event.preventDefault();
      builderWorkspace.classList.remove('drop-over');
      const raw = event.dataTransfer.getData('text/plain');
      if (!raw && !dragPayload && !draggedElement) return;
      try {
        let data = raw ? JSON.parse(raw) : dragPayload;
        if (!data && draggedElement) {
          data = {
            id: draggedElement.dataset.blockId || 'unknown',
            code: draggedElement.dataset.code || '',
            label: ((draggedElement.textContent || '').split('\n')[0] || 'Block').trim(),
            lessonId: draggedElement.dataset.lessonId || '',
            sequence: draggedElement.dataset.sequence || '',
            evidence: draggedElement.dataset.evidence || '',
            fromWorkspace: builderWorkspace.contains(draggedElement),
            instanceId: draggedElement.dataset.instanceId || `fallback-${Date.now()}`
          };
        }
        if (!data) return;

        if (data.fromWorkspace) {
          const existing = builderWorkspace.querySelector(`.code-block[data-instance-id="${data.instanceId}"]`) || draggedElement;
          if (existing) {
            builderWorkspace.appendChild(existing);
            refreshBuilderPreview();
          }
          dragPayload = null;
          draggedElement = null;
          return;
        }

        const fromPalette = builderPalette.querySelector(`.code-block[data-instance-id="${data.instanceId}"]`) || draggedElement;
        if (!fromPalette || !builderPalette.contains(fromPalette)) {
          builderOutput.textContent = 'Drag one of the current lesson palette boxes into the workspace.';
          dragPayload = null;
          draggedElement = null;
          return;
        }
        if (data.lessonId !== currentLessonId) {
          builderOutput.textContent = 'That block belongs to a different lesson. Select the lesson again to reload its exact palette.';
          dragPayload = null;
          draggedElement = null;
          renderBuilderPalette();
          return;
        }
        fromPalette.remove();
        appendWorkspaceBlock({
          id: data.id,
          label: data.label,
          code: data.code,
          lessonId: data.lessonId,
          sequence: data.sequence,
          evidence: data.evidence
        }, createWorkspaceInstanceId(data.id));
        speak('Block placed. It is now consumed from this lesson palette.', 'thinking');
        renderBuilderPalette();
        renderLessonTopicBoxes();
        dragPayload = null;
        draggedElement = null;
      } catch (_) {
        builderOutput.textContent = 'Unable to drop block. Try dragging again.';
        dragPayload = null;
        draggedElement = null;
      }
    });
    builderLoadLessonBtn.addEventListener('click', loadLessonTemplate);
    builderRunBtn.addEventListener('click', runBuiltCode);
    builderClearBtn.addEventListener('click', clearWorkspace);
    assistantApplyBtn.addEventListener('click', async () => {
      if (!pendingFix) return;
      setAssistantFrame('applying');
      if (lastProblemNode) await flyAssistantToNode(lastProblemNode);
      pendingFix();
      clearApplyPrompt('Applied suggested change. Please run again.', 'solved');
      setTimeout(() => guidePlayerNextStep(), 0);
    });
    assistantDeclineBtn.addEventListener('click', () => {
      clearApplyPrompt('Suggestion declined. You can continue editing manually.', 'idle');
    });
    assistantSprite.addEventListener('click', () => {
      if (assistantOn) {
        assistantOn = false;
        setAssistantFrame('offA');
        setTimeout(() => setAssistantFrame('offB'), 220);
        assistantSpeech.textContent = 'Assistant disabled. Click sprite again to enable.';
        assistantActions.classList.remove('show');
      } else {
        assistantOn = true;
        setAssistantFrame('greeting');
        assistantSpeech.textContent = 'Assistant enabled. Ready to help.';
        flyAssistantHome();
      }
    });
    clearWorkspace();
    renderBuilderPalette();
    renderLessonTopicBoxes();
    startWorkspaceWatcher();
    assistantWrap.style.right = `${assistantHome.right}px`;
    assistantWrap.style.top = `${assistantHome.top}px`;
    setAssistantFrame('idle');
  }

  function showTopic(topicId) {
    const t = topics[topicId];
    if (!t) return;
    showExplanation(t.title, t.body, 'Inheritance, Constructors, Methods');
    buildSteps.textContent = 'Build Steps:\nPick a lesson for code-implementation steps.';
    assetsTopics.textContent = 'Assets + Related Topics:\nTopics explain syntax; lessons map to assets and implementation.';
    lessonRunner.style.display = 'none';
    codeBtn.style.display = 'none';
    codeLines.style.display = 'none';
  }

  function buildWhy(catId) {
    if (catId === 'types') {
      return 'Aquatic uses arrays like [0.75, 0.5, 0.25] to store boss HP thresholds and loop through spawn rules.';
    }
    if (catId === 'oop') {
      return 'Aquatic needs reusable entities (Player, Npc, Shark) that share behavior while remaining specialized.';
    }
    if (catId === 'control') {
      return 'Boss and quest flows depend on exact timing and state checks to keep gameplay stable.';
    }
    if (catId === 'ops') {
      return 'HP ratios, IDs, and phase gates rely on operators to transform state into decisions.';
    }
    if (catId === 'io') {
      return 'Without I/O, no movement, rendering, or progress sync would occur.';
    }
    return 'Documentation is needed so peers and evaluators can verify evidence quickly and accurately.';
  }

  function renderTree() {
    tree.innerHTML = '';

    Object.entries(categoryExplanations).forEach(([catId, cat]) => {
      const group = document.createElement('div');
      group.className = 'tree-group';

      const title = document.createElement('div');
      title.className = 'tree-title';

      const catBtn = document.createElement('button');
      catBtn.className = 'node-btn';
      catBtn.textContent = cat.title;
      catBtn.addEventListener('click', () => showCategory(catId));
      title.appendChild(catBtn);

      const list = document.createElement('ul');
      list.className = 'lesson-list';

      (categoryLessons[catId] || []).forEach((lessonId) => {
        const item = document.createElement('li');
        const lessonBtn = document.createElement('button');
        lessonBtn.className = 'node-btn';
        const unlocked = isLessonUnlocked(lessonId);
        const done = completedLessons.has(lessonId);
        lessonBtn.textContent = `${lessonId} ${lessons[lessonId].title}${done ? ' (Done)' : unlocked ? '' : ' (Locked)'}`;
        lessonBtn.disabled = !unlocked;
        lessonBtn.title = unlocked ? 'Open lesson' : `Locked: complete ${getPreviousLessonId(lessonId)} first`;
        lessonBtn.addEventListener('click', () => showLesson(lessonId));
        item.appendChild(lessonBtn);

        if (lessonId === '1.4') {
          ['className', 'extends', 'super'].forEach((topicId) => {
            const chip = document.createElement('span');
            chip.className = 'topic-chip';
            chip.textContent = topicId;
            chip.addEventListener('click', () => showTopic(topicId));
            item.appendChild(chip);
          });
        }

        list.appendChild(item);
      });

      group.appendChild(title);
      group.appendChild(list);
      tree.appendChild(group);
    });
  }

  function renderRubricLinks() {
    rubricBody.innerHTML = '';
    Object.entries(lessons).forEach(([id, lesson]) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');

      const unlocked = isLessonUnlocked(id);
      const done = completedLessons.has(id);
      const a = document.createElement('a');
      a.href = '#';
      a.className = 'rubric-link';
      a.textContent = `${id} ${lesson.title}${done ? ' (Done)' : unlocked ? '' : ' (Locked)'}`;
      if (!unlocked) {
        a.style.pointerEvents = 'none';
        a.style.opacity = '0.45';
        a.title = `Locked: complete ${getPreviousLessonId(id)} first`;
      } else {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          showLesson(id);
        });
      }

      td1.textContent = lesson.title;
      td2.appendChild(a);
      tr.appendChild(td1);
      tr.appendChild(td2);
      rubricBody.appendChild(tr);
    });
  }

  root.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('.mode-btn').forEach((x) => x.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      showExplanation(
        'Explanation Mode Updated',
        `Current mode: ${currentMode}.\nSelect a category or lesson to refresh the explanation depth.`,
        'Beginner, Developer, CS111'
      );
    });
  });

  codeBtn.addEventListener('click', () => {
    const lines = JSON.parse(codeBtn.dataset.lines || '[]');
    if (!lines.length) return;
    codeLines.style.display = '';
    codeLines.textContent = lines.join('\n');
  });

  renderTree();
  renderRubricLinks();
  showCategory('oop');
  setupBuilderDnD();
})();
</script>
