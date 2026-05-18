---
layout: post
codemirror: True
title: CS111 Notes
description: JavaScript CSSE notes and project checklist from my personal portfolio work.
permalink: /personal-accomplishment-yiming/cs111-notes/
---

<style>
html {
  scroll-behavior: smooth;
}
</style>

# CS111 Notes
A short review notebook with simple notes and code examples for common JavaScript topics.

## Project Checklist
This table connects each project requirement to the matching CS111 topic section below and keeps the evidence aligned to what is directly shown in my portfolio work, project files, and documented verification steps.

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

### Completion Notes
- I rewrote the rows that were previously overstated so the evidence matches what is directly shown or documented in the portfolio.
- The debugging rows now describe documented verification workflows instead of claiming undocumented live demonstrations.
- The hitbox row now focuses on configuring and refining collision boundaries, which is what the current project evidence directly supports.
- The code comments row now claims the presence of JSDoc comments instead of a specific comment-density threshold that was not measured.
- The integration testing row now refers to documented backend and fallback verification rather than overstating a fully captured live backend proof.

### Checked Evidence
- OOP evidence exists in the game engine files such as `Player.js`, `Npc.js`, and `Enemy.js`, where classes use `extends`, `super(...)`, and overridden `update()` behavior.
- Game level setup and object configuration appear in level files and in the aquatic project configuration objects.
- API, async, JSON, and error handling evidence appears in project files that use `fetch`, `await`, `.json()`, and fallback error handling.
- Hitbox configuration is already present in player, NPC, and barrier data, and the builder documentation explains how those collision-box values are tuned.
- Browser debugging evidence is documented through explicit Sources, Network, Application, and Elements verification steps so the checklist stays aligned with the current portfolio artifacts.

<h2 id="functions">Functions</h2>
- A function is a named block of code that is used to complete a specific task.
- Functions help programmers avoid repeating the same code again and again.
- They can take in information called parameters and return a result back to the program.
- Functions make code easier to organize, test, and reuse in larger projects.



{% capture challenge0 %}
Run the functions example, then change the input values and add one more function call.
{% endcapture %}

{% capture code0 %}
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
Run the arrays example, then add a new score and print the updated length.
{% endcapture %}

{% capture code1 %}
const scores = [4, 8, 12, 16];

console.log(scores[0]);
console.log(scores[2]);
console.log(scores.length);
{% endcapture %}

{% capture source1 %}
```javascript
%%js

// CODE_RUNNER: Run the arrays example, then add a new score and print the updated length.
const scores = [4, 8, 12, 16];

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
Run the booleans example, then change one comparison so the output becomes false.
{% endcapture %}

{% capture code2 %}
const passed = true;
const hasHomework = false;
const isGreater = 10 > 3;

console.log(passed);
console.log(hasHomework);
console.log(isGreater);
{% endcapture %}

{% capture source2 %}
```javascript
%%js

// CODE_RUNNER: Run the booleans example, then change one comparison so the output becomes false.
const passed = true;
const hasHomework = false;
const isGreater = 10 > 3;

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
Run the conditional example, then change the value of total to test all three branches.
{% endcapture %}

{% capture code3 %}
const total = 20;

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

// CODE_RUNNER: Run the conditional example, then change the value of total to test all three branches.
const total = 20;

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
Run the iteration example, then increase the loop limits to produce more output.
{% endcapture %}

{% capture code4 %}
for (let i = 0; i < 3; i++) {
  console.log('Loop count:', i);
}

let count = 0;
while (count < 2) {
  console.log('While loop:', count);
  count++;
}
{% endcapture %}

{% capture source4 %}
```javascript
%%js

// CODE_RUNNER: Run the iteration example, then increase the loop limits to produce more output.
for (let i = 0; i < 3; i++) {
  console.log('Loop count:', i);
}

let count = 0;
while (count < 2) {
  console.log('While loop:', count);
  count++;
}
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
Run the math example, then change the numbers and add a power calculation.
{% endcapture %}

{% capture code5 %}
const a = 12;
const b = 4;

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

// CODE_RUNNER: Run the math example, then change the numbers and add a power calculation.
const a = 12;
const b = 4;

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
Run the class example, then create a second Student object with different data.
{% endcapture %}

{% capture code6 %}
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }
}

const studentOne = new Student('Yiming', 10);
console.log(studentOne);
{% endcapture %}

{% capture source6 %}
```javascript
%%js

// CODE_RUNNER: Run the class example, then create a second Student object with different data.
class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }
}

const studentOne = new Student('Yiming', 10);
console.log(studentOne);
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
Run the variables example, then change the score update to use a different amount.
{% endcapture %}

{% capture code7 %}
const school = 'Del Norte';
let score = 10;

score = score + 5;

console.log(school);
console.log(score);
{% endcapture %}

{% capture source7 %}
```javascript
%%js

// CODE_RUNNER: Run the variables example, then change the score update to use a different amount.
const school = 'Del Norte';
let score = 10;

score = score + 5;

console.log(school);
console.log(score);
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
Run the constructor example, then make another Player with a different number of lives.
{% endcapture %}

{% capture code8 %}
class Player {
  constructor(name, lives) {
    this.name = name;
    this.lives = lives;
  }
}

const playerOne = new Player('Alex', 3);
console.log(playerOne);
{% endcapture %}

{% capture source8 %}
```javascript
%%js

// CODE_RUNNER: Run the constructor example, then make another Player with a different number of lives.
class Player {
  constructor(name, lives) {
    this.name = name;
    this.lives = lives;
  }
}

const playerOne = new Player('Alex', 3);
console.log(playerOne);
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
Run the methods example, then add a second method or create another profile object.
{% endcapture %}

{% capture code9 %}
class StudentProfile {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi, I am ${this.name}.`;
  }
}

const profile = new StudentProfile('Yiming');
console.log(profile.introduce());
{% endcapture %}

{% capture source9 %}
```javascript
%%js

// CODE_RUNNER: Run the methods example, then add a second method or create another profile object.
class StudentProfile {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi, I am ${this.name}.`;
  }
}

const profile = new StudentProfile('Yiming');
console.log(profile.introduce());
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
Run the strings example, then add one more string method like slice or includes.
{% endcapture %}

{% capture code10 %}
const schoolName = 'Del Norte High School';
const mascot = 'Nighthawks';

console.log(schoolName.toUpperCase());
console.log(`Mascot: ${mascot}`);
console.log(schoolName.length);
{% endcapture %}

{% capture source10 %}
```javascript
%%js

// CODE_RUNNER: Run the strings example, then add one more string method like slice or includes.
const schoolName = 'Del Norte High School';
const mascot = 'Nighthawks';

console.log(schoolName.toUpperCase());
console.log(`Mascot: ${mascot}`);
console.log(schoolName.length);
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
Run the data abstraction example, then add another property or method to the project object.
{% endcapture %}

{% capture code11 %}
const project = {
  title: 'Aquatic Adventure',
  topic: 'Game Design',
  summary() {
    return `${this.title} is about ${this.topic}.`;
  }
};

console.log(project.title);
console.log(project.summary());
{% endcapture %}

{% capture source11 %}
```javascript
%%js

// CODE_RUNNER: Run the data abstraction example, then add another property or method to the project object.
const project = {
  title: 'Aquatic Adventure',
  topic: 'Game Design',
  summary() {
    return `${this.title} is about ${this.topic}.`;
  }
};

console.log(project.title);
console.log(project.summary());
```
{% endcapture %}

{% include runners/code.html
   runner_id="personal-accomplishment-yiming-cs111-notes-11"
   language="javascript"
   challenge=challenge11
   code=code11
   source=source11
%}

