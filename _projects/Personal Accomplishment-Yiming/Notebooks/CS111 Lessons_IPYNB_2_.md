---
layout: post
codemirror: True
title: Aquatic Game Level Explanation
description: CSSE topic-by-topic explanation of the Aquatic game level code.
permalink: /personal-accomplishment-yiming/cs111-notes/
---

<style>
html {
  scroll-behavior: smooth;
}

.auto-code-runner-wrap {
  margin: 8px 0 18px 0;
  border: 1px solid rgba(14, 66, 98, 0.28);
  border-radius: 10px;
  background: rgba(7, 29, 43, 0.035);
}

.auto-code-runner-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(14, 66, 98, 0.18);
}

.auto-code-runner-btn {
  border: 0;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.auto-code-runner-btn.run {
  background: #0c6ea3;
  color: #f4fcff;
}

.auto-code-runner-btn.clear {
  background: #dbeaf3;
  color: #14384d;
}

.auto-code-runner-output {
  margin: 0;
  padding: 10px;
  min-height: 22px;
  max-height: 240px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.45;
  color: #0f2f44;
  white-space: pre-wrap;
}
</style>

<script src="{{site.baseurl}}/assets/js/auto-code-runner-cs111.js"></script>

# Aquatic Game Level Explanation
This notebook explains the code in Aquatic For Reference.js using CSSE topics like functions, arrays, booleans, conditionals, classes, constructors, methods, strings, data abstraction, math expressions, variables, and iteration.

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
  runner_id="personal-accomplishment-yiming-cs111-lessons-0"
  challenge=challenge0
  code=code0
  hide_edit="true"
  width="100%"
  height="620px"
%}

## Quick Teleport
<div style="display:flex;flex-wrap:wrap;gap:10px;margin:12px 0 18px 0;">
  <a href="#functions" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Functions</a>
  <a href="#arrays" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Arrays</a>
  <a href="#booleans" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Booleans</a>
  <a href="#conditionals" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Conditionals</a>
  <a href="#classes" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Classes</a>
  <a href="#constructors" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Constructors</a>
  <a href="#methods" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Methods</a>
  <a href="#strings" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Strings</a>
  <a href="#data-abstraction" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Data Abstraction</a>
  <a href="#mathematical-expressions" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Math</a>
  <a href="#variables" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Variables</a>
  <a href="#iteration" style="padding:8px 12px;border-radius:999px;background:#0b3b57;color:#e9fbff;text-decoration:none;font-weight:700;">Iteration</a>
  <a href="#megalodon-boss-explanation" style="padding:8px 12px;border-radius:999px;background:#105d3a;color:#e9fff4;text-decoration:none;font-weight:700;">Megalodon Boss</a>
  <a href="#code-breakdown" style="padding:8px 12px;border-radius:999px;background:#105d3a;color:#e9fff4;text-decoration:none;font-weight:700;">Code Breakdown</a>
</div>

## Project Checklist
This table connects each project requirement to the closest matching CS111 topic section below. The links are not all perfect one-to-one lessons, so the evidence section after the table pulls real code from my aquatic game level and engine files to prove the relationship directly.

| Learning Objective | Related Notes | Project Evidence Required | Assessment Method | Status |
| --- | --- | --- | --- | --- |
| Object-Oriented Programming |  |  |  |  |
| Writing Classes | [Classes](#classes) | Create minimum 2 custom character classes extending base classes | Code review: `Player.js`, `Npc.js`, `Enemy.js` and custom level classes | [x] |
| Methods & Parameters | [Methods](#methods) | Implement methods with parameters such as collision handlers, dialogue actions, and profile updates | Code review: method signatures with 2+ parameters | [x] |
| Instantiation & Objects | [Data Abstraction](#data-abstraction) | Instantiate game objects in `GameLevel` configuration arrays | Code review: level setup objects and runtime configuration data | [x] |
| Inheritance (Basic) | [Classes](#classes) | Create class hierarchy with 2+ levels such as `GameObject -> Character -> Player` | Code review: `extends` keyword and inheritance chain | [x] |
| Method Overriding | [Methods](#methods) | Override parent methods like `update()`, `draw()`, and interaction behavior | Code review: polymorphic implementations across engine objects | [x] |
| Constructor Chaining | [Constructors](#constructors) | Use `super()` to chain constructors and initialize object state | Code review: constructor setup in engine and project classes | [x] |
| Control Structures |  |  |  |  |
| Iteration | [Iteration](#iteration) | Use loops for game object arrays, animation frames, and content traversal | Code review: `for`, `forEach`, and iteration in project logic | [x] |
| Conditionals | [Conditionals](#conditionals) | Implement collision detection, quest state transitions, and UI state changes | Code review: `if`, `else if`, and nested conditions | [x] |
| Nested Conditions | [Booleans](#booleans) | Handle multi-stage logic such as quest acceptance, completion, and follow-up actions | Code review: multi-level conditionals in NPC interaction logic | [x] |
| Data Types |  |  |  |  |
| Numbers | [Mathematical Expressions](#mathematical-expressions) | Use position, velocity, score, and timing values | Code review: numeric properties and calculations | [x] |
| Strings | [Strings](#strings) | Use character names, sprite paths, and dialogue text | Code review: string manipulation and template literals | [x] |
| Booleans | [Booleans](#booleans) | Use flags such as `frontMenuActive`, `levelCompleted`, and quest status values | Code review: boolean state transitions | [x] |
| Arrays | [Arrays](#arrays) | Store game object collections, level data, and navigation entries | Code review: array operations and iteration | [x] |
| Objects (JSON) | [Data Abstraction](#data-abstraction) | Build configuration objects for sprites, quests, and profiles | Code review: object literals and structured data | [x] |
| Operators |  |  |  |  |
| Mathematical | [Mathematical Expressions](#mathematical-expressions) | Use arithmetic in movement, gravity, and collision sizing | Code review: `+`, `-`, `*`, `/`, and `%` in gameplay logic | [x] |
| String Operations | [Strings](#strings) | Use concatenation and template literals for text and asset paths | Code review: path assembly and output formatting | [x] |
| Boolean Expressions | [Booleans](#booleans) | Use `&&`, `||`, and `!` in game state checks and API guards | Code review: compound conditions in logic branches | [x] |
| Input/Output |  |  |  |  |
| Keyboard Input | [Functions](#functions) | Handle arrow keys, space, and WASD with event listeners and callbacks | Testing: key event handlers respond correctly in the playable project | [x] |
| Canvas Rendering | [Classes](#classes) | Draw sprites, backgrounds, and barriers using the Canvas API | Code review: render methods and canvas usage | [x] |
| GameEnv Configuration | [Variables](#variables) | Set canvas size, difficulty values, asset paths, and runtime options | Code review: `GameEnv.create()` and level setup | [x] |
| API Integration | [Functions](#functions) | Implement leaderboard and profile API requests with fetch wrappers | Code review: fetch calls with error handling | [x] |
| Asynchronous I/O | [Methods](#methods) | Use `async` and `await` for save, load, and API workflows | Code review: async methods and promise flow | [x] |
| JSON Parsing | [Data Abstraction](#data-abstraction) | Parse API responses and serialize profile data | Code review: `response.json()`, object access, and structured payloads | [x] |
| Documentation |  |  |  |  |
| Code Comments | [Methods](#methods) | Add and reference JSDoc comments for classes and methods | Code review: JSDoc is present in project files such as `LoginManager.js`, `ProfileManager.js`, and `GameObject.js` | [x] |
| Mini-Lesson Documentation | [Functions](#functions) | Create a lesson post with code examples and embedded runnable content | Portfolio review: this notebook and the personal portfolio pages | [x] |
| Code Highlights | [Classes](#classes) | Explain OOP, APIs, hitboxes, and profile storage with highlighted snippets | Portfolio review: highlighted code examples with explanations | [x] |
| Debugging |  |  |  |  |
| Console Debugging | [Functions](#functions) | Track game state, profile updates, and method calls with logged output | Demo: strategic logging in update, profile, and interaction flows | [x] |
| Hit Box Visualization | [Variables](#variables) | Configure and refine collision boundaries using hitbox values in builder controls and level data | Demo: hitbox percentages are documented and adjusted in player, NPC, and barrier objects | [x] |
| Source-Level Debugging | [Conditionals](#conditionals) | Document and explain how runtime logic can be stepped through in DevTools Sources during testing | Demo: workflow for pausing JavaScript modules and inspecting branches is documented | [x] |
| Network Debugging | [Data Abstraction](#data-abstraction) | Document and explain how API calls, status codes, and JSON payloads are checked in DevTools Network | Demo: workflow for inspecting fetch requests and responses is documented | [x] |
| Application Debugging | [Variables](#variables) | Document and explain how browser storage is inspected for profile, sprite, and guest-session data | Demo: workflow for checking `localStorage` state in the Application tab is documented | [x] |
| Element Inspection | [Classes](#classes) | Document and explain how canvas, overlays, and DOM controls are inspected in DevTools Elements | Demo: workflow for inspecting canvas sizing, overlays, and panel styling is documented | [x] |
| Testing & Verification |  |  |  |  |
| Gameplay Testing | [Iteration](#iteration) | Test level completion, character interactions, and collision detection | Live demo: play through the level without critical bugs | [x] |
| Integration Testing | [Functions](#functions) | Verify score saving and profile requests with backend success paths or fallback handling | Demo: fetch-based save/load behavior and fallback flow are documented for verification | [x] |
| API Error Handling | [Conditionals](#conditionals) | Guard fetch requests with try/catch and fallback UI behavior | Code review: explicit error handling for request failures | [x] |

[Jump to assessment evidence from my aquatic game level](#assessment-evidence-from-my-aquatic-game-level)

<h2 id="functions">Functions</h2>
- A function is a named block of code that is used to complete a specific task.
- Functions help programmers avoid repeating the same code again and again.
- They can take in information called parameters and return a result back to the program.
- Functions make code easier to organize, test, and reuse in larger projects.



{% capture challenge0 %}
Run the functions example, then add a new function that takes 2 parameters and combine its output with `greet`.
{% endcapture %}

{% capture code0 %}
// Start simple, then create a second function with two parameters.
function multiplyByTwo(number) {
  return number * 2;
}

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(multiplyByTwo(6));
console.log(greet('Yiming'));
{% endcapture %}

{% capture source0 %}
```javascript
%%js

// CODE_RUNNER: Run the functions example, then change the input values and add one more function call.
// Start simple, then create a second function with two parameters.
function multiplyByTwo(number) {
  return number * 2;
}

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(multiplyByTwo(6));
console.log(greet('Yiming'));
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-0"
   language="javascript"
   challenge=challenge0
   code=code0
   source=source0
%}


<h2 id="arrays">Arrays</h2>
- An array stores multiple values inside one variable.
- Arrays are useful when you need to keep a list of related data, such as scores, names, or colors.
- Each item in an array has an index position, starting at `0`.
- Arrays make it easier to loop through data and access specific elements when needed.



{% capture challenge1 %}
Run the arrays example, then add two scores, compute the average, and print the index of the largest score.
{% endcapture %}

{% capture code1 %}
const scores = [4, 8, 12, 16];

// Try pushing values, then calculate summary stats.
console.log(scores[0]);
console.log(scores[2]);
console.log(scores.length);
{% endcapture %}

{% capture source1 %}
```javascript
%%js

// CODE_RUNNER: Run the arrays example, then add two scores, compute the average, and print the index of the largest score.
const scores = [4, 8, 12, 16];

// Try pushing values, then calculate summary stats.
console.log(scores[0]);
console.log(scores[2]);
console.log(scores.length);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-1"
   language="javascript"
   challenge=challenge1
   code=code1
   source=source1
%}


<h2 id="booleans">Booleans</h2>
- A boolean is a data type that can only have one of two values: `true` or `false`.
- Booleans are often used to answer yes-or-no questions in a program.
- They are important for conditionals because they decide which block of code should run.
- Many comparisons, such as `5 > 3`, automatically create boolean values.



{% capture challenge2 %}
Run the booleans example, then create a compound boolean using `&&` and `||` and explain why it is true or false.
{% endcapture %}

{% capture code2 %}
const passed = true;
const hasHomework = false;
const isGreater = 10 > 3;

// Build at least one compound boolean expression below.
console.log(passed);
console.log(hasHomework);
console.log(isGreater);
{% endcapture %}

{% capture source2 %}
```javascript
%%js

// CODE_RUNNER: Run the booleans example, then create a compound boolean using && and || and explain why it is true or false.
const passed = true;
const hasHomework = false;
const isGreater = 10 > 3;

// Build at least one compound boolean expression below.
console.log(passed);
console.log(hasHomework);
console.log(isGreater);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-2"
   language="javascript"
   challenge=challenge2
   code=code2
   source=source2
%}


<h2 id="conditionals">Conditionals</h2>
- Conditionals let a program make decisions based on whether something is true or false.
- JavaScript uses `if`, `else if`, and `else` to handle different possible cases.
- Conditionals are useful when you want different outcomes depending on user input, scores, or comparisons.
- They often work together with booleans and comparison operators.



{% capture challenge3 %}
Run the conditional example, then add a second variable (like `isMember`) and update the logic to use nested conditionals.
{% endcapture %}

{% capture code3 %}
const total = 20;

// Add another condition to make this branch logic more realistic.
if (total > 15) {
  console.log('Large total');
} else if (total === 15) {
  console.log('Exactly fifteen');
} else {
  console.log('Small total');
}
{% endcapture %}

{% capture source3 %}
```javascript
%%js

// CODE_RUNNER: Run the conditional example, then add a second variable (like isMember) and update the logic to use nested conditionals.
const total = 20;

// Add another condition to make this branch logic more realistic.
if (total > 15) {
  console.log('Large total');
} else if (total === 15) {
  console.log('Exactly fifteen');
} else {
  console.log('Small total');
}
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-3"
   language="javascript"
   challenge=challenge3
   code=code3
   source=source3
%}


<h2 id="iteration">Iteration</h2>
- Iteration means repeating a set of instructions more than once.
- Loops save time because they let a program repeat actions without rewriting the same code.
- A `for` loop is useful when you know how many times something should repeat.
- A `while` loop is useful when the program should continue until a condition changes.



{% capture challenge4 %}
Run the iteration example, then print only even values in one loop and add a running total in the other.
{% endcapture %}

{% capture code4 %}
// Filter by condition inside loops instead of printing every value.
for (let i = 0; i < 3; i++) {
  console.log('Loop count:', i);
}

let count = 0;
let runningTotal = 0;
while (count < 2) {
  console.log('While loop:', count);
  runningTotal += count;
  count++;
}
console.log('Running total:', runningTotal);
{% endcapture %}

{% capture source4 %}
```javascript
%%js

// CODE_RUNNER: Run the iteration example, then print only even values in one loop and add a running total in the other.
// Filter by condition inside loops instead of printing every value.
for (let i = 0; i < 3; i++) {
  console.log('Loop count:', i);
}

let count = 0;
let runningTotal = 0;
while (count < 2) {
  console.log('While loop:', count);
  runningTotal += count;
  count++;
}
console.log('Running total:', runningTotal);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-4"
   language="javascript"
   challenge=challenge4
   code=code4
   source=source4
%}


<h2 id="mathematical-expressions">Mathematical Expressions</h2>
- Mathematical expressions combine numbers, variables, and operators to calculate a value.
- Common operators include `+` for addition, `-` for subtraction, `*` for multiplication, `/` for division, and `%` for remainder.
- Parentheses can change the order of operations and make the expression clearer to read.
- Math expressions are used often in games, scoring systems, and data calculations.



{% capture challenge5 %}
Run the math example, then add a power calculation and a rounded decimal result from a division.
{% endcapture %}

{% capture code5 %}
const a = 12;
const b = 4;

// Add one advanced operation (power or rounding) before logging.
const addition = a + b;
const subtraction = a - b;
const multiplication = a * b;
const division = a / b;
const remainder = a % b;
const groupedExpression = (a + b) * 2;

console.log(addition);
console.log(subtraction);
console.log(multiplication);
console.log(division);
console.log(remainder);
console.log(groupedExpression);
{% endcapture %}

{% capture source5 %}
```javascript
%%js

// CODE_RUNNER: Run the math example, then add a power calculation and a rounded decimal result from a division.
const a = 12;
const b = 4;

// Add one advanced operation (power or rounding) before logging.
const addition = a + b;
const subtraction = a - b;
const multiplication = a * b;
const division = a / b;
const remainder = a % b;
const groupedExpression = (a + b) * 2;

console.log(addition);
console.log(subtraction);
console.log(multiplication);
console.log(division);
console.log(remainder);
console.log(groupedExpression);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-5"
   language="javascript"
   challenge=challenge5
   code=code5
   source=source5
%}


<h2 id="classes">Classes</h2>
- A class is a blueprint used to create objects with shared structure and behavior.
- Classes help organize code by grouping related values and actions together.
- They are useful when many objects need the same properties, such as players, students, or cars.
- A class makes larger programs easier to read and manage.



{% capture challenge6 %}
Run the class example, then add a class method and use it on at least two Student objects.
{% endcapture %}

{% capture code6 %}
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  // Add more behavior here to make each object do something.
  describe() {
    return `${this.name} is in grade ${this.grade}.`;
  }
}

const studentOne = new Student('Yiming', 10);
const studentTwo = new Student('Avery', 11);
console.log(studentOne.describe());
console.log(studentTwo.describe());
{% endcapture %}

{% capture source6 %}
```javascript
%%js

// CODE_RUNNER: Run the class example, then add a class method and use it on at least two Student objects.
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }

  // Add more behavior here to make each object do something.
  describe() {
    return `${this.name} is in grade ${this.grade}.`;
  }
}

const studentOne = new Student('Yiming', 10);
const studentTwo = new Student('Avery', 11);
console.log(studentOne.describe());
console.log(studentTwo.describe());
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-6"
   language="javascript"
   challenge=challenge6
   code=code6
   source=source6
%}


<h2 id="variables">Variables</h2>
- A variable stores information so a program can use it later.
- Variables can hold numbers, text, booleans, arrays, and even objects.
- In JavaScript, `const` is used for values that should not be reassigned, while `let` is used for values that may change.
- Good variable names make code easier to understand.



{% capture challenge7 %}
Run the variables example, then apply at least three score updates and print the final result with a template literal.
{% endcapture %}

{% capture code7 %}
const school = 'Del Norte';
let score = 10;

// Chain multiple updates to model state changes over time.
score = score + 5;
score = score - 2;
score = score + 7;

console.log(school);
console.log(`Final score: ${score}`);
{% endcapture %}

{% capture source7 %}
```javascript
%%js

// CODE_RUNNER: Run the variables example, then apply at least three score updates and print the final result with a template literal.
const school = 'Del Norte';
let score = 10;

// Chain multiple updates to model state changes over time.
score = score + 5;
score = score - 2;
score = score + 7;

console.log(school);
console.log(`Final score: ${score}`);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-7"
   language="javascript"
   challenge=challenge7
   code=code7
   source=source7
%}


<h2 id="constructors">Constructors</h2>
- A constructor is a special method inside a class that sets up the starting values of an object.
- It runs automatically when a new object is created with the `new` keyword.
- Constructors are helpful because they let each object begin with its own data.
- This makes object creation faster and more consistent.



{% capture challenge8 %}
Run the constructor example, then create two more players and compare which one has the most lives.
{% endcapture %}

{% capture code8 %}
class Player {
  constructor(name, lives) {
    this.name = name;
    this.lives = lives;
  }
}

const playerOne = new Player('Alex', 3);
const playerTwo = new Player('Jordan', 5);
const playerThree = new Player('Riley', 4);

// Compare object data instead of printing a single object.
const topPlayer = [playerOne, playerTwo, playerThree].sort((a, b) => b.lives - a.lives)[0];
console.log(`Player: ${playerOne.name}, Lives: ${playerOne.lives}`);
console.log(`Top lives: ${topPlayer.name} (${topPlayer.lives})`);
{% endcapture %}

{% capture source8 %}
```javascript
%%js

// CODE_RUNNER: Run the constructor example, then create two more players and compare which one has the most lives.
class Player {
  constructor(name, lives) {
    this.name = name;
    this.lives = lives;
  }
}

const playerOne = new Player('Alex', 3);
const playerTwo = new Player('Jordan', 5);
const playerThree = new Player('Riley', 4);

// Compare object data instead of printing a single object.
const topPlayer = [playerOne, playerTwo, playerThree].sort((a, b) => b.lives - a.lives)[0];
console.log(`Player: ${playerOne.name}, Lives: ${playerOne.lives}`);
console.log(`Top lives: ${topPlayer.name} (${topPlayer.lives})`);
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-8"
   language="javascript"
   challenge=challenge8
   code=code8
   source=source8
%}


<h2 id="methods">Methods</h2>
- A method is a function that belongs to a class or object.
- Methods describe actions that an object can perform.
- They are useful because they keep behavior connected to the data it uses.
- For example, a student object might have a method to introduce itself.



{% capture challenge9 %}
Run the methods example, then add a second method and use it with at least two profile objects.
{% endcapture %}

{% capture code9 %}
class StudentProfile {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi, I am ${this.name}.`;
  }

  // Add another method to show object behavior beyond introductions.
  cheer(topic) {
    return `${this.name} says: Let's study ${topic}!`;
  }
}

const profile = new StudentProfile('Yiming');
const profileTwo = new StudentProfile('Kai');
console.log(profile.introduce());
console.log(profile.cheer('arrays'));
console.log(profileTwo.cheer('conditionals'));
{% endcapture %}

{% capture source9 %}
```javascript
%%js

// CODE_RUNNER: Run the methods example, then add a second method and use it with at least two profile objects.
class StudentProfile {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi, I am ${this.name}.`;
  }

  // Add another method to show object behavior beyond introductions.
  cheer(topic) {
    return `${this.name} says: Let's study ${topic}!`;
  }
}

const profile = new StudentProfile('Yiming');
const profileTwo = new StudentProfile('Kai');
console.log(profile.introduce());
console.log(profile.cheer('arrays'));
console.log(profileTwo.cheer('conditionals'));
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-9"
   language="javascript"
   challenge=challenge9
   code=code9
   source=source9
%}


<h2 id="strings">Strings</h2>
- A string is a sequence of characters used to represent text.
- Strings are written inside quotation marks, such as `'hello'` or `"world"`.
- They are useful for names, messages, labels, and any other text-based data.
- JavaScript has built-in string methods that can change or inspect text.



{% capture challenge10 %}
Run the strings example, then use at least two additional string methods and compare their outputs.
{% endcapture %}

{% capture code10 %}
const schoolName = 'Del Norte High School';
const mascot = 'Nighthawks';

// Mix multiple string methods to inspect the same text in different ways.
console.log(schoolName.toUpperCase());
console.log(`Mascot: ${mascot}`);
console.log(schoolName.length);
console.log(schoolName.slice(0, 9));
console.log(schoolName.includes('High'));
{% endcapture %}

{% capture source10 %}
```javascript
%%js

// CODE_RUNNER: Run the strings example, then use at least two additional string methods and compare their outputs.
const schoolName = 'Del Norte High School';
const mascot = 'Nighthawks';

// Mix multiple string methods to inspect the same text in different ways.
console.log(schoolName.toUpperCase());
console.log(`Mascot: ${mascot}`);
console.log(schoolName.length);
console.log(schoolName.slice(0, 9));
console.log(schoolName.includes('High'));
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-10"
   language="javascript"
   challenge=challenge10
   code=code10
   source=source10
%}


<h2 id="data-abstraction">Data Abstraction</h2>
- Data abstraction means organizing information in a way that hides extra detail and makes the program easier to use.
- Instead of dealing with every small detail separately, abstraction groups related data together.
- Objects and classes are common tools for data abstraction in JavaScript.
- Abstraction helps make code cleaner, easier to understand, and easier to update later.



{% capture challenge11 %}
Run the data abstraction example, then add nested data (like a `milestones` array) and write a method that uses it.
{% endcapture %}

{% capture code11 %}
const project = {
  title: 'Aquatic Adventure',
  topic: 'Game Design',
  milestones: ['Prototype', 'Boss Fight', 'Polish'],
  summary() {
    return `${this.title} is about ${this.topic}.`;
  },
  nextMilestone() {
    return `Next milestone: ${this.milestones[0]}`;
  }
};

console.log(project.title);
console.log(project.summary());
console.log(project.nextMilestone());
{% endcapture %}

{% capture source11 %}
```javascript
%%js

// CODE_RUNNER: Run the data abstraction example, then add nested data (like a milestones array) and write a method that uses it.
const project = {
  title: 'Aquatic Adventure',
  topic: 'Game Design',
  milestones: ['Prototype', 'Boss Fight', 'Polish'],
  summary() {
    return `${this.title} is about ${this.topic}.`;
  },
  nextMilestone() {
    return `Next milestone: ${this.milestones[0]}`;
  }
};

console.log(project.title);
console.log(project.summary());
console.log(project.nextMilestone());
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-11"
   language="javascript"
   challenge=challenge11
   code=code11
   source=source11
%}


## Assessment Evidence From My Aquatic Game Level
The assessment-method column says things like code review, testing, or demo. This section actually does that by pulling code examples from my aquatic game level and related engine files, then explaining why each example matches the learning objective.

### Classes, Inheritance, and Constructors
These examples support the table rows for writing classes, inheritance, constructor chaining, and object instantiation.

```js
class GameLevelAquaticGameLevel {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.frontMenuActive = false;
    const path = gameEnv.path || '';

    const playerData = {
      INIT_POSITION: { x: 180, y: 300 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };
  }
}
```
Relationship: this is direct evidence of class design because `GameLevelAquaticGameLevel` is a custom class I wrote for my project. The constructor stores level state and prepares configuration objects such as `playerData`, which also shows object instantiation and data setup.

```js
class Player extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
    this.pressedKeys = {};
  }
}
```
Relationship: this is the clearest inheritance example in the project. `Player` extends `Character`, and `super(data, gameEnv)` proves constructor chaining. That is stronger evidence for those checklist rows than the short note section alone.

### 2. Methods, Parameters, and Overriding
These examples support the rows about methods, parameters, method overriding, and class behavior.

```js
class Npc extends Character {
  constructor(data = null, gameEnv = null) {
    super(data, gameEnv);
    this.interact = data?.interact;
  }

  update() {
    if (this.walkingArea) {
      this.patrol();
    }
    this.draw();
  }
}
```
Relationship: this snippet shows both a constructor with parameters and a method override. The `update()` method changes inherited behavior for NPCs, which directly supports the method-overriding row in the checklist.

```js
const slimeNpc = {
  id: 'Random Slime',
  interact: function() {
    if (!this.dialogueSystem) return;
    const q1 = questState.firstQuest;
    const q2 = questState.secondQuest;

    if (q1.completed && !q2.accepted) {
      this.dialogueSystem.addButtons([
        {
          text: 'Accept Quest #2',
          action: async () => {
            q2.accepted = true;
            await transitionToSurface();
          }
        }
      ]);
    }
  }
};
```
Relationship: this is evidence for methods and parameters because the level uses object methods, passes data into dialogue functions, and uses `async` actions inside gameplay interactions. It also shows how my aquatic game level applies those ideas in a real quest system.

### Conditionals, Booleans, Arrays, Objects, and Math
These examples support the control-structure and data-type rows in the table.

```js
const aquaticSpriteOptions = [
  { key: 'scuba-diver', label: 'Scuba Diver' },
  { key: 'boy', label: 'Boy' },
  { key: 'astro', label: 'Astro' }
];

const selectedAquaticSprite = aquaticSpriteOptions.find((option) =>
  option.key === localStorage.getItem(aquaticSpriteStorageKey)
) || aquaticSpriteOptions[0];
```
Relationship: this snippet proves arrays, objects, strings, booleans in conditions, and iteration by search. The sprite list is stored as objects inside an array, and `.find(...)` checks each option until it finds the player’s saved choice.

```js
const slimeNpc = {
  right: { row: Math.min(1, 4 - 1), start: 0, columns: 3 },
  left: { row: Math.min(2, 4 - 1), start: 0, columns: 3 },
  hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
};
```
Relationship: this supports mathematical expressions and hitbox configuration. The row calculations show math in gameplay setup, and the hitbox object is direct evidence for the collision-boundary row in the checklist.

```js
const questState = {
  firstQuest: { accepted: false, completed: false, collected: 0 },
  secondQuest: { accepted: false, inSurface: false, completed: false, collected: 0 }
};
```
Relationship: this is data abstraction in the project. Instead of loose variables, quest progress is grouped into structured objects, which matches the JSON/object row and the booleans row at the same time.

### 4. Testing and Input/Output: Keyboard Input, Rendering, and Game Configuration
These examples support the rows about keyboard input, rendering, and runtime configuration.

```js
this.keypress = data?.keypress || { up: 87, left: 65, down: 83, right: 68 };
window.addEventListener('keydown', this._boundHandleKeyDown);
window.addEventListener('keyup', this._boundHandleKeyUp);
```
Relationship: this is direct evidence for keyboard input. The assessment method says to test whether key handlers respond correctly in the playable project, and my aquatic level uses that exact input mapping for movement.

```js
const bgData = {
  name: 'custom_bg',
  src: backgroundAssetPath + '/Aquatic.png',
  pixels: { height: 1960, width: 2940 }
};
```
Relationship: this supports canvas rendering and `GameEnv` configuration because the level config chooses the background image, sizing, and runtime asset path before the engine draws anything.

```js
const playerData = {
  id: 'playerData',
  SCALE_FACTOR: selectedAquaticSprite.SCALE_FACTOR,
  STEP_FACTOR: 1000,
  INIT_POSITION: { x: 180, y: 300 },
  keypress: { up: 87, left: 65, down: 83, right: 68 }
};
```
Relationship: this is the best evidence for runtime game configuration. The level sets scale, movement speed, spawn position, and keyboard controls in one object used by the engine.

### 5. API Integration, Async/Await, JSON, and Error Handling
These examples support the rows about API integration, asynchronous I/O, JSON parsing, and error handling.

```js
function getCredentials(baseurl) {
  const URL = pythonURI + '/api/id';
  return fetch(URL, {
    ...fetchOptions,
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      return null;
    }
    return response.json();
  })
  .catch(err => {
    console.error('Fetch error: ', err);
    return null;
  });
}
```
Relationship: this is direct proof for API integration and JSON parsing because it calls the backend, checks the HTTP result, and parses structured JSON. It also proves error handling because failed requests fall back safely instead of crashing.

```js
action: async () => {
  q2.accepted = true;
  q2.collected = 0;
  this.dialogueSystem.closeDialogue();
  await transitionToSurface();
}
```
Relationship: this is concrete `async` and `await` usage inside my aquatic game level. The checklist row for asynchronous I/O is better supported by this project code than by the short basic notes section.

### 6. Debugging and Verification Workflows
The debugging rows in the table are not fully taught by the note sections themselves, so here is the direct relationship to my project work.

```js
console.log('login.js loaded');
console.log('Base URL:', baseurl);
console.error('Fetch error: ', err);
```
Relationship: this is console-debugging evidence because the project logs script startup, runtime values, and fetch failures while testing login and API behavior.

```js
hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 }
```
Relationship: this is hit-box visualization evidence because those percentages are exactly what I inspect and tune when collision boundaries feel wrong in the aquatic level.

Source-level debugging relationship: when the aquatic level uses multi-step quest logic like `if (q1.completed && !q2.accepted)`, I can pause in DevTools Sources and watch the booleans change as the player finishes quests.

Network-debugging relationship: the `fetch(URL, ...)` login flow gives a real request to inspect in the Network tab, including status codes and returned JSON.

Application-debugging relationship: the aquatic level reads saved values such as `localStorage.getItem(aquaticSpriteStorageKey)`, so the Application tab shows real persistent project data to inspect.

Element-inspection relationship: the aquatic runner includes canvas output, menus, overlays, and dialogue UI, so the Elements tab can be used to inspect sizing, layering, and styling during the playable demo.

### Conclusion
The top table is most accurate when it is read together with this evidence section. The notes introduce the CS111 concepts, and the aquatic game level proves that I used those concepts in a real project through classes, quest logic, input handling, API calls, debugging, and structured game configuration.

<h2 id="megalodon-boss-explanation">Megalodon Boss Explanation</h2>
The megalodon boss fight uses the same CSSE topics as the rest of the Aquatic level, but in a more combat-focused way.

```javascript
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

<h3 id="code-breakdown">Code Breakdown</h3>
This section shows the boss logic with short explanations and actual code snippets.

#### 1) Start Function + Guard Condition
```javascript
this.startMegalodonEncounter = async () => {
  if (this.bossState.active || this.bossState.introPlayed) return;
```
- Function: starts the boss encounter.
- Condition + booleans: prevents duplicate starts.

#### 2) Boss State Setup
```javascript
  this.bossState.introPlayed = true;
  this.bossState.active = true;
  this.bossState.hp = this.bossState.maxHp;
  this.bossState.summonThresholdsTriggered = [];
```
- Variables and booleans track fight state.
- Array stores which summon phases already triggered.

#### 3) Boss Data Object (Data Abstraction)
```javascript
  const bossData = {
    id: 'MegalodonBoss',
    src: this.bossState.megalodonMoveSheet,
    INIT_POSITION: { x: 120, y: this.gameEnv.innerHeight - 150 },
    laserAttack: { row: 0, start: 0, columns: 3 },
    rocketAttack: { row: 1, start: 0, columns: 3 }
  };
```
- Object groups all boss configuration in one place.
- Math expression places the boss using screen height.

#### 4) Instantiation + Array Insertion
```javascript
  const boss = new Npc(bossData, this.gameEnv);
  this.bossState.megalodon = boss;
  this.gameEnv.gameObjects.push(boss);
};
```
- Class + constructor: creates the boss instance.
- Array operation: adds the boss to active game objects.

#### 5) Iteration + Conditional Summon Logic
```javascript
const thresholds = [0.75, 0.5, 0.25];
thresholds.forEach((threshold) => {
  if (this.bossState.hp <= this.bossState.maxHp * threshold) {
    summonRushingSharks();
  }
});
```
- Iteration checks each phase threshold.
- Conditional + math triggers summons at health breakpoints.

<h2 id="mermaid-boss-explanation">Mermaid Boss Explanation</h2>
The Mermaid boss code is a second combat system layered on top of the original boss system. It demonstrates state modeling, function decomposition, object creation, conditional branching, and timed event logic.

```javascript
this.startMermaidBossEncounter = async () => {
  const state = this.mermaidBossState;
  state.active = true;
  state.combatReady = true;
  state.hp = state.maxHp;

  state.volleyShotsRemaining = 0;
  state.nextVolleyReadyAt = Date.now() + 1200;
  state.nextBombAt = Date.now() + 9500;
  state.nextSummonAt = Date.now() + 13500;

  setMermaidBossSpriteSheet(mermaidBossSpriteSrc, { width: 948, height: 948 }, { rows: 6, columns: 6 });
};

const spawnMermaidStarGuardians = () => {
  const guardianData = {
    id: `MermaidStarGuardian_${Date.now()}`,
    src: starfishGuardianSpriteSrc,
    orientation: { rows: 6, columns: 6 },
    idle: { row: 0, start: 0, columns: 6 },
    walk: { row: 1, start: 0, columns: 6 },
    attack: { row: 4, start: 0, columns: 5 },
    rangedAttack: { row: 5, start: 0, columns: 5 }
  };
  const guardian = new Npc(guardianData, this.gameEnv);
  this.gameEnv.gameObjects.push(guardian);
};
```

<h3 id="mermaid-code-breakdown">Mermaid Boss Code Breakdown</h3>

#### 1) Separate State Object (Abstraction)
```javascript
const state = this.mermaidBossState;
state.active = true;
state.combatReady = true;
state.hp = state.maxHp;
```
- Uses a dedicated state object so Mermaid logic is isolated from Megalodon logic.
- Boolean flags control whether update functions should run.

#### 2) Timed Combat Scheduling (Algorithms + Math)
```javascript
state.nextVolleyReadyAt = Date.now() + 1200;
state.nextBombAt = Date.now() + 9500;
state.nextSummonAt = Date.now() + 13500;
```
- Converts gameplay pacing into timestamps.
- Uses arithmetic with `Date.now()` to sequence attacks over time.

#### 3) Sprite-Sheet Configuration (Data Modeling)
```javascript
setMermaidBossSpriteSheet(mermaidBossSpriteSrc, { width: 948, height: 948 }, { rows: 6, columns: 6 });
```
- Encodes sheet metadata explicitly instead of hardcoding in render logic.
- Shows parameterized function design: source path + pixel dimensions + orientation.

#### 4) Guardian Creation with Class Instantiation
```javascript
const guardian = new Npc(guardianData, this.gameEnv);
this.gameEnv.gameObjects.push(guardian);
```
- Constructor call creates a reusable game entity from config data.
- Array insertion registers it in the engine update/draw loop.

#### 5) Row-Based Animation Mapping
```javascript
idle: { row: 0, start: 0, columns: 6 },
walk: { row: 1, start: 0, columns: 6 },
attack: { row: 4, start: 0, columns: 5 },
rangedAttack: { row: 5, start: 0, columns: 5 }
```
- Demonstrates table-driven animation design.
- Different actions can use different frame counts, which prevents row bleed and wrong frame sampling.

### Boss Topics Map (Megalodon + Mermaid)
- **Functions:** Both bosses use dedicated functions for encounter start, combat updates, ability triggers, and theme-audio control.
- **Classes/Constructors:** Bosses and guardians are created with constructor calls such as `new Npc(...)`.
- **Methods:** Boss methods update HP, phases, attacks, and fight transitions over time.
- **Variables:** Combat values like HP, cooldowns, timer stamps, and damage are stored in state variables.
- **Booleans:** Flags such as `active`, `combatReady`, and phase unlock booleans gate what logic can run.
- **Conditionals:** `if` branches choose ability behavior, trigger summons, and enforce phase thresholds.
- **Iteration:** Repeated update loops and threshold checks process ongoing combat each frame.
- **Arrays:** `gameObjects` and threshold/action lists hold multiple entities and trigger points.
- **Mathematical Expressions:** Health-percentage math and `Date.now() + offset` timing expressions control pacing.
- **Strings:** IDs, asset paths, and labels are represented with strings in config/state objects.
- **Data Abstraction:** `bossState` and `mermaidBossState` group related data so each combat system stays organized.

### Code Examples For Each Topic

#### Functions
```javascript
const launchMermaidVolley = () => startMermaidBossAbility('volley');
```

#### Classes/Constructors
```javascript
const boss = new Npc(bossData, this.gameEnv);
```

#### Methods
```javascript
this.updateMermaidBossCombat();
```

#### Variables
```javascript
state.nextBombAt = Date.now() + 9500;
```

#### Booleans
```javascript
state.combatReady = true;
```

#### Conditionals
```javascript
if (state.hp <= state.maxHp * 0.1) {
  spawnMermaidStarGuardians();
}
```

#### Iteration
```javascript
thresholds.forEach((threshold) => {
  if (this.bossState.hp <= this.bossState.maxHp * threshold) summonRushingSharks();
});
```

#### Arrays
```javascript
this.gameEnv.gameObjects.push(guardian);
```

#### Mathematical Expressions
```javascript
const hpRatio = state.hp / state.maxHp;
```

#### Strings
```javascript
const bossMusic = path + '/assets/audio/Megalodon Boss Fight.mp3';
```

#### Data Abstraction
```javascript
const state = this.mermaidBossState;
```

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
