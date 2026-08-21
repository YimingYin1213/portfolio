---
layout: post
title: Week 1 Sprint 1 CPT Requirements
permalink: /week-1-sprint-1/
codemirror: true
contributors: Yiming, Noor, Luke
description: Pseudocode to Python and JavaScript translation cheat sheet with runnable examples.
---

<style>
  .wk1s1-theme {
    --wk-panel: #0f1b2a;
    --wk-card: #16273a;
    --wk-accent: #36c2ff;
    --wk-text: #e9f4ff;
    --wk-muted: #9cc0dc;
  }

  .wk1s1-theme h2,
  .wk1s1-theme h3 {
    color: var(--wk-text);
  }

  .wk1s1-theme .code-runner-container {
    border: 1px solid rgba(54, 194, 255, 0.45);
    border-radius: 12px;
    background: linear-gradient(180deg, var(--wk-card), var(--wk-panel));
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  }

  .wk1s1-theme .challenge-box {
    border-color: var(--wk-accent);
    background: rgba(54, 194, 255, 0.08);
  }

  .wk1s1-theme .control-panel {
    background: rgba(9, 18, 30, 0.9);
    color: var(--wk-muted);
  }

  .wk1s1-theme .runBtn {
    background: linear-gradient(135deg, #00b7ff, #38d9a9);
    border: none;
    color: #052236;
  }

  .wk1s1-theme .output-content {
    background: #0c1522;
    color: var(--wk-text);
    border-top: 1px solid rgba(54, 194, 255, 0.25);
  }
</style>

<div class="wk1s1-theme" markdown="1">

## Week 1 Sprint 1

Code examples that demostrate how the server of a game uses player data (given) to produce outputs. Each code example are changed and fits into the themes of coding.

## Time Reminder System in Game

This time reminder system is important because it helps prevent game addiction, which is one of the main factors that can lead to academic stress and threats to personal life. By tracking playtime and showing reminders when usage gets too high, the system encourages healthier habits, better time management, and a safer balance between gaming, school responsibilities, and real-world well-being.

## Quick Translation Cheat Sheet

| Pseudocode | Python | JavaScript |
|---|---|---|
| `x ← value` | `x = value` | `let x = value;` |
| `DISPLAY(text)` | `print(text)` | `console.log(text);` |
| `INPUT("Prompt")` | `input("Prompt")` | `prompt("Prompt")` |
| `IF / ELSE` | `if / else` | `if / else` |
| `FOR EACH item IN list` | `for item in list:` | `for (const item of list) {}` |
| `APPEND(list, item)` | `list.append(item)` | `list.push(item)` |
| `INSERT(list, i, item)` | `list.insert(i, item)` | `list.splice(i, 0, item)` |
| `REMOVE(list, i)` | `list.pop(i)` | `list.splice(i, 1)` |
| `LENGTH(list)` | `len(list)` | `list.length` |
| `PROCEDURE name(args)` | `def name(args):` | `function name(args) {}` |
| `RETURN(value)` | `return value` | `return value;` |

---

## 1. Input

**CPT Requirement:** Your program must produce output visible to the user. College Board pseudocode uses `DISPLAY()` to show results, including strings, numbers, or variable values. On the exam, you will trace `DISPLAY` statements to predict program output. For CPT, clear output demonstrates your program's purpose and functionality.

{% capture challenge_1_ps %}
Run the pseudocode version for player input and display logic.
{% endcapture %}

{% capture code_1_ps %}
// PSEUDOCODE
// player_name <- "AquaKnight"
// hours_played_today <- 13
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Hours played today: " + hours_played_today)
// IF (hours_played_today > 12) { DISPLAY("Go touch grass.") }

let player_name = "AquaKnight";
let hours_played_today = 13;
console.log("Welcome player, " + player_name + "!");
console.log("Hours played today: " + hours_played_today);
if (hours_played_today > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-input-ps"
   language="javascript"
   challenge=challenge_1_ps
   code=code_1_ps
%}

{% capture challenge_1_py %}
Translate player input and display logic into Python.
{% endcapture %}

{% capture code_1_py %}
# Store player data, greet the player, and warn when playtime is too high.
player_name = "AquaKnight"
hours_played_today = 13

print("Welcome player, " + player_name + "!")
print("Hours played today: " + str(hours_played_today))

if hours_played_today > 12:
  print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-input-py"
   language="python"
   challenge=challenge_1_py
   code=code_1_py
%}

{% capture challenge_1_js %}
Translate player input and display logic into JavaScript.
{% endcapture %}

{% capture code_1_js %}
// Store player data, greet the player, and warn when playtime is too high.
let playerName = "Celestial Knight";
let hoursPlayedToday = 13;

console.log("Welcome player, " + playerName + "!");
console.log("Hours played today: " + hoursPlayedToday);

if (hoursPlayedToday > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-input-js"
   language="javascript"
   challenge=challenge_1_js
   code=code_1_js
%}

---

## 2. List

**CPT Requirement:** Your program must get input from the user. College Board pseudocode uses `INPUT()` to collect data, which makes programs interactive and personalized. On exam questions, you will identify where input affects program behavior. For CPT scoring, input shows your program responds to different user data.

{% capture challenge_2_ps %}
Run the pseudocode version for player session tracking with list traversal.
{% endcapture %}

{% capture code_2_ps %}
// PSEUDOCODE
// player_name <- "Rocket Launcher"
// session_hours <- [2, 3, 4, 5]
// total_hours <- 0
// FOR EACH hours IN session_hours { total_hours <- total_hours + hours }
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Total hours played today: " + total_hours)
// IF (total_hours > 12) { DISPLAY("Go touch grass.") }

let player_name = "Rocket Launcher";
let session_hours = [2, 3, 4, 5];
let total_hours = 0;
for (const hours of session_hours) {
  total_hours += hours;
}
console.log("Welcome player, " + player_name + "!");
console.log("Total hours played today: " + total_hours);
if (total_hours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-list-ps"
   language="javascript"
   challenge=challenge_2_ps
   code=code_2_ps
%}

{% capture challenge_2_py %}
Translate player session tracking with list traversal into Python.
{% endcapture %}

{% capture code_2_py %}
# Sum daily play sessions and remind the player if total time is too high.
player_name = "Rocket Launcher"
session_hours = [2, 3, 4, 5]
total_hours = 0

for hours in session_hours:
  total_hours += hours

print("Welcome player, " + player_name + "!")
print("Total hours played today: " + str(total_hours))
if total_hours > 12:
  print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-list-py"
   language="python"
   challenge=challenge_2_py
   code=code_2_py
%}

{% capture challenge_2_js %}
Translate player session tracking with list traversal into JavaScript.
{% endcapture %}

{% capture code_2_js %}
// Sum daily play sessions and remind the player if total time is too high.
let playerName = "QuestFox";
let sessionHours = [2, 3, 4, 5];
let totalHours = 0;

for (const hours of sessionHours) {
  totalHours += hours;
}

console.log("Welcome player, " + playerName + "!");
console.log("Total hours played today: " + totalHours);
if (totalHours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-list-js"
   language="javascript"
   challenge=challenge_2_js
   code=code_2_js
%}

---

## 3. Procedure

**CPT Requirement:** Your program must use a list (or another collection type) to manage multiple data values. **Critical exam detail:** College Board pseudocode lists start at index `1`, not `0`. Accessing index `0` or going beyond `LENGTH` terminates the program. On exam questions, you will trace list operations and identify index errors. For CPT, lists help demonstrate algorithm implementation and complexity management.

{% capture challenge_3_ps %}
Run the pseudocode version for a player-status procedure.
{% endcapture %}

{% capture code_3_ps %}
// PSEUDOCODE
// PROCEDURE get_playtime_status(hours)
// {
//   IF (hours > 12) { RETURN("Go touch grass.") }
//   ELSE { IF (hours >= 8) { RETURN("Take a break soon.") } ELSE { RETURN("Nice balance today.") } }
// }
// player_name <- "I'm a cool guy"
// hours_played_today <- 10
// status <- get_playtime_status(hours_played_today)
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY(status)

function get_playtime_status(hours) {
  if (hours > 12) {
    return "Go touch grass.";
  } else if (hours >= 8) {
    return "Take a break soon.";
  }
  return "Nice balance today.";
}
let player_name = "I'm a cool guy";
let hours_played_today = 10;
let status = get_playtime_status(hours_played_today);
console.log("Welcome player, " + player_name + "!");
console.log(status);
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-procedure-ps"
   language="javascript"
   challenge=challenge_3_ps
   code=code_3_ps
%}

{% capture challenge_3_py %}
Translate a player-status procedure with nested selection into Python.
{% endcapture %}

{% capture code_3_py %}
# Return playtime status from a reusable procedure.
def get_playtime_status(hours):
  if hours > 12:
    return "Go touch grass."
  elif hours >= 8:
    return "Take a break soon."
  return "Nice balance today."

player_name = "I'm a cool guy"
hours_played_today = 10
status = get_playtime_status(hours_played_today)

print("Welcome player, " + player_name + "!")
print(status)
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-procedure-py"
   language="python"
   challenge=challenge_3_py
   code=code_3_py
%}

{% capture challenge_3_js %}
Translate a player-status procedure with nested selection into JavaScript.
{% endcapture %}

{% capture code_3_js %}
// Return playtime status from a reusable function.
function getPlaytimeStatus(hours) {
  if (hours > 12) {
    return "Go touch grass.";
  } else if (hours >= 8) {
    return "Take a break soon.";
  }
  return "Nice balance today.";
}

let playerName = "I'm a cool guy";
let hoursPlayedToday = 10;
let status = getPlaytimeStatus(hoursPlayedToday);

console.log("Welcome player, " + playerName + "!");
console.log(status);
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-procedure-js"
   language="javascript"
   challenge=challenge_3_js
   code=code_3_js
%}

---

## 4. Sequence

**CPT Requirement:** You must create at least one student-developed procedure with parameters. College Board pseudocode uses `PROCEDURE name(parameters)` with optional `RETURN(value)`. This demonstrates abstraction by hiding complexity and enabling reuse. On the exam, you will trace procedure calls and parameter passing. For CPT, the procedure must be called at least once and contribute to functionality.

{% capture challenge_4_ps %}
Run the pseudocode version for sequence and total playtime output.
{% endcapture %}

{% capture code_4_ps %}
// PSEUDOCODE
// player_name <- "Dragon"
// morning_session <- 4
// afternoon_session <- 3
// night_session <- 6
// total_hours <- morning_session + afternoon_session + night_session
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Total hours played today: " + total_hours)
// IF (total_hours > 12) { DISPLAY("Go touch grass.") }

let player_name = "Dragon";
let morning_session = 4;
let afternoon_session = 3;
let night_session = 6;
let total_hours = morning_session + afternoon_session + night_session;
console.log("Welcome player, " + player_name + "!");
console.log("Total hours played today: " + total_hours);
if (total_hours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-sequence-ps"
   language="javascript"
   challenge=challenge_4_ps
   code=code_4_ps
%}

{% capture challenge_4_py %}
Translate a sequence that computes total playtime and decision output into Python.
{% endcapture %}

{% capture code_4_py %}
# Use sequence: define values, calculate total, then print results.
player_name = "Dragon"
morning_session = 4
afternoon_session = 3
night_session = 6

total_hours = morning_session + afternoon_session + night_session

print("Welcome player, " + player_name + "!")
print("Total hours played today: " + str(total_hours))
if total_hours > 12:
  print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-sequence-py"
   language="python"
   challenge=challenge_4_py
   code=code_4_py
%}

{% capture challenge_4_js %}
Translate a sequence that computes total playtime and decision output into JavaScript.
{% endcapture %}

{% capture code_4_js %}
// Use sequence: define values, calculate total, then print results.
let playerName = "Dragon";
let morningSession = 4;
let afternoonSession = 3;
let nightSession = 6;

let totalHours = morningSession + afternoonSession + nightSession;

console.log("Welcome player, " + playerName + "!");
console.log("Total hours played today: " + totalHours);
if (totalHours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-sequence-js"
   language="javascript"
   challenge=challenge_4_js
   code=code_4_js
%}

---

## 5. Selection

**Exam Concept:** Sequencing means statements execute in order, line by line. Every program uses sequence as the default flow. On exam questions, you will trace execution order to predict variable values. For CPT, logical step-by-step calculations show you understand systematic data processing.

{% capture challenge_5_ps %}
Run the pseudocode version for conditional playtime checks.
{% endcapture %}

{% capture code_5_ps %}
// PSEUDOCODE
// player_name <- "PixelRider"
// hours_played_today <- 14
// DISPLAY("Welcome player, " + player_name + "!")
// IF (hours_played_today > 12) { DISPLAY("Go touch grass.") }
// ELSE { IF (hours_played_today >= 8) { DISPLAY("Take a break soon.") } ELSE { DISPLAY("Nice balance today.") } }

let player_name = "PixelRider";
let hours_played_today = 14;
console.log("Welcome player, " + player_name + "!");
if (hours_played_today > 12) {
  console.log("Go touch grass.");
} else if (hours_played_today >= 8) {
  console.log("Take a break soon.");
} else {
  console.log("Nice balance today.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-selection-ps"
   language="javascript"
   challenge=challenge_5_ps
   code=code_5_ps
%}

{% capture challenge_5_py %}
Translate conditional playtime checks into Python.
{% endcapture %}

{% capture code_5_py %}
# Check daily playtime and respond with a simple wellness reminder.
player_name = "PixelRider"
hours_played_today = 14

print("Welcome player, " + player_name + "!")

if hours_played_today > 12:
  print("Go touch grass.")
elif hours_played_today >= 8:
  print("Take a break soon.")
else:
  print("Nice balance today.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-selection-py"
   language="python"
   challenge=challenge_5_py
   code=code_5_py
%}

{% capture challenge_5_js %}
Translate conditional playtime checks into JavaScript.
{% endcapture %}

{% capture code_5_js %}
// Check daily playtime and respond with a simple wellness reminder.
let playerName = "PixelRider";
let hoursPlayedToday = 14;

console.log("Welcome player, " + playerName + "!");

if (hoursPlayedToday > 12) {
  console.log("Go touch grass.");
} else if (hoursPlayedToday >= 8) {
  console.log("Take a break soon.");
} else {
  console.log("Nice balance today.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-selection-js"
   language="javascript"
   challenge=challenge_5_js
   code=code_5_js
%}

---

## 6. Iteration

**CPT Requirement:** Your algorithm must include selection using `IF` or `IF/ELSE` statements. College Board pseudocode uses curly braces `{ }` to mark code blocks. Selection makes decisions based on Boolean conditions and allows different outcomes. On the exam, you will trace which branch executes for specific condition values. For CPT, selection demonstrates handling different data appropriately.

{% capture challenge_6_ps %}
Run the pseudocode version for repeat-until style session entry.
{% endcapture %}

{% capture code_6_ps %}
// PSEUDOCODE
// DISPLAY("Player Session Entry")
// simulated_entries <- [2, 5, 6]
// player_name <- "LoopHero"
// sessions <- []
// session_count <- 0
// total_hours <- 0
// index <- 1
// REPEAT UNTIL(index > LENGTH(simulated_entries))
// {
//   hours <- simulated_entries[index]
//   APPEND(sessions, hours)
//   session_count <- session_count + 1
//   total_hours <- total_hours + hours
//   index <- index + 1
// }
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Session hours: " + sessions)
// DISPLAY("Total sessions entered: " + session_count)
// DISPLAY("Total hours played today: " + total_hours)
// IF (total_hours > 12) { DISPLAY("Go touch grass.") }

console.log("Player Session Entry");
let simulated_entries = [2, 5, 6];
let player_name = "LoopHero";
let sessions = [];
let session_count = 0;
let total_hours = 0;
let index = 0;
while (index < simulated_entries.length) {
  let hours = simulated_entries[index];
  sessions.push(hours);
  session_count += 1;
  total_hours += hours;
  index += 1;
}
console.log("Welcome player, " + player_name + "!");
console.log("Session hours: " + JSON.stringify(sessions));
console.log("Total sessions entered: " + session_count);
console.log("Total hours played today: " + total_hours);
if (total_hours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-iteration-ps"
   language="javascript"
   challenge=challenge_6_ps
   code=code_6_ps
%}

{% capture challenge_6_py %}
Translate repeat-until style play session entry into Python.
{% endcapture %}

{% capture code_6_py %}
# Simulate repeated play-session entry, tracking count and running total.
print("Player Session Entry")

# Sample grade entries used instead of interactive input.
simulated_entries = [2, 5, 6]

player_name = "LoopHero"
sessions = []
session_count = 0
total_hours = 0
index = 0
continue_entry = "yes"

while continue_entry != "no" and index < len(simulated_entries):
    hours = simulated_entries[index]
    sessions.append(hours)
    session_count += 1
    total_hours += hours
    index += 1
    continue_entry = "no" if index >= len(simulated_entries) else "yes"

print("Welcome player, " + player_name + "!")
print("Session hours: " + str(sessions))
print("Total sessions entered: " + str(session_count))
print("Total hours played today: " + str(total_hours))
if total_hours > 12:
    print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-iteration-py"
   language="python"
   challenge=challenge_6_py
   code=code_6_py
%}

{% capture challenge_6_js %}
Translate repeat-until style play session entry into JavaScript.
{% endcapture %}

{% capture code_6_js %}
// Simulate repeated play-session entry, tracking count and running total.
console.log("Player Session Entry");

// Sample grade entries used instead of interactive input.
const simulatedEntries = [2, 5, 6];

let playerName = "LoopHero";
let sessions = [];
let sessionCount = 0;
let totalHours = 0;
let index = 0;
let continueEntry = "yes";

while (continueEntry !== "no" && index < simulatedEntries.length) {
  const hours = simulatedEntries[index];
  sessions.push(hours);
  sessionCount += 1;
  totalHours += hours;
  index += 1;
  continueEntry = index >= simulatedEntries.length ? "no" : "yes";
}

console.log("Welcome player, " + playerName + "!");
console.log("Session hours: " + JSON.stringify(sessions));
console.log("Total sessions entered: " + sessionCount);
console.log("Total hours played today: " + totalHours);
if (totalHours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-iteration-js"
   language="javascript"
   challenge=challenge_6_js
   code=code_6_js
%}

---

## 7. Algorithm

**CPT Requirement:** Your algorithm must include iteration (loops) using `FOR EACH`, `REPEAT TIMES`, or `REPEAT UNTIL`. Iteration processes multiple data items without duplicate code. On the exam, you will trace loop counters and predict how many times a block executes. For CPT, iteration demonstrates handling collections and algorithm complexity.

{% capture challenge_7_ps %}
Run the pseudocode version for average playtime algorithm.
{% endcapture %}

{% capture code_7_ps %}
// PSEUDOCODE
// PROCEDURE calculate_average_playtime(sessions)
// {
//   total <- 0
//   count <- 0
//   FOR EACH hours IN sessions { total <- total + hours ; count <- count + 1 }
//   IF (count > 0) { RETURN(total / count) }
//   RETURN(0)
// }
// player_name <- "AlgoAce"
// sessions <- [1, 4, 3, 2, 5]
// average_hours <- calculate_average_playtime(sessions)
// total_hours <- 0
// FOR EACH h IN sessions { total_hours <- total_hours + h }
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Average session hours: " + average_hours)
// DISPLAY("Total hours played today: " + total_hours)
// IF (total_hours > 12) { DISPLAY("Go touch grass.") }

function calculate_average_playtime(sessions) {
  let total = 0;
  let count = 0;
  for (const hours of sessions) {
    total += hours;
    count += 1;
  }
  if (count > 0) {
    return total / count;
  }
  return 0;
}
let player_name = "AlgoAce";
let sessions = [1, 4, 3, 2, 5];
let average_hours = calculate_average_playtime(sessions);
let total_hours = sessions.reduce((sum, h) => sum + h, 0);
console.log("Welcome player, " + player_name + "!");
console.log("Average session hours: " + average_hours);
console.log("Total hours played today: " + total_hours);
if (total_hours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-algorithm-ps"
   language="javascript"
   challenge=challenge_7_ps
   code=code_7_ps
%}

{% capture challenge_7_py %}
Translate a playtime-average algorithm into Python.
{% endcapture %}

{% capture code_7_py %}
# Calculate average playtime safely by guarding against division by zero.
def calculate_average_playtime(sessions):
    total = 0
    count = 0

    for hours in sessions:
        total += hours
        count += 1

    if count > 0:
        return total / count
    return 0

player_name = "AlgoAce"
sessions = [1, 4, 3, 2, 5]
average_hours = calculate_average_playtime(sessions)
total_hours = sum(sessions)

print("Welcome player, " + player_name + "!")
print("Average session hours: " + str(average_hours))
print("Total hours played today: " + str(total_hours))

if total_hours > 12:
    print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-algorithm-py"
   language="python"
   challenge=challenge_7_py
   code=code_7_py
%}

{% capture challenge_7_js %}
Translate a playtime-average algorithm into JavaScript.
{% endcapture %}

{% capture code_7_js %}
// Calculate average playtime safely by guarding against division by zero.
function calculateAveragePlaytime(sessions) {
  let total = 0;
  let count = 0;

  for (const hours of sessions) {
    total += hours;
    count += 1;
  }

  if (count > 0) {
    return total / count;
  }
  return 0;
}

const playerName = "AlgoAce";
const sessions = [1, 4, 3, 2, 5];
const averageHours = calculateAveragePlaytime(sessions);
const totalHours = sessions.reduce((sum, hours) => sum + hours, 0);

console.log("Welcome player, " + playerName + "!");
console.log("Average session hours: " + averageHours);
console.log("Total hours played today: " + totalHours);

if (totalHours > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-algorithm-js"
   language="javascript"
   challenge=challenge_7_js
   code=code_7_js
%}

---

## 8. List Operations

**CPT Requirement:** Your algorithm must integrate sequencing, selection, and iteration to solve a meaningful problem. College Board defines an algorithm as a precise step-by-step process that accomplishes a task. On the exam, you will analyze complete algorithms for correctness and efficiency. For CPT, this is the core implementation where you demonstrate complexity and earn algorithm points.

{% capture challenge_8_ps %}
Run the pseudocode version for linear player search.
{% endcapture %}

{% capture code_8_ps %}
// PSEUDOCODE
// PROCEDURE find_player(players, target)
// {
//   index <- 1
//   FOR EACH player IN players {
//     IF (player = target) { RETURN(index) }
//     index <- index + 1
//   }
//   RETURN(-1)
// }
// players <- ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
// hours_played <- [6, 14, 9, 4]
// search_for <- "PixelRider"
// position <- find_player(players, search_for)
// IF (position > 0) {
//   player_hours <- hours_played[position]
//   DISPLAY("Welcome player, " + search_for + "!")
//   DISPLAY("Found at position: " + position)
//   DISPLAY("Hours played today: " + player_hours)
//   IF (player_hours > 12) { DISPLAY("Go touch grass.") }
// } ELSE { DISPLAY("Not found") }

function find_player(players, target) {
  let index = 1;
  for (const player of players) {
    if (player === target) {
      return index;
    }
    index += 1;
  }
  return -1;
}
let players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
let hours_played = [6, 14, 9, 4];
let search_for = "PixelRider";
let position = find_player(players, search_for);
if (position > 0) {
  let player_hours = hours_played[position - 1];
  console.log("Welcome player, " + search_for + "!");
  console.log("Found at position: " + position);
  console.log("Hours played today: " + player_hours);
  if (player_hours > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Not found");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-listops-ps"
   language="javascript"
   challenge=challenge_8_ps
   code=code_8_ps
%}

{% capture challenge_8_py %}
Translate linear search of player names with playtime checks into Python.
{% endcapture %}

{% capture code_8_py %}
# Perform a linear search and return a 1-based position when found.
def find_player(players, target):
    index = 1
    for player in players:
        if player == target:
            return index
        index += 1
    return -1

players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
hours_played = [6, 14, 9, 4]
search_for = "PixelRider"

position = find_player(players, search_for)

if position > 0:
  player_hours = hours_played[position - 1]
  print("Welcome player, " + search_for + "!")
  print("Found at position: " + str(position))
  print("Hours played today: " + str(player_hours))
  if player_hours > 12:
    print("Go touch grass.")
else:
    print("Not found")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-listops-py"
   language="python"
   challenge=challenge_8_py
   code=code_8_py
%}

{% capture challenge_8_js %}
Translate linear search of player names with playtime checks into JavaScript.
{% endcapture %}

{% capture code_8_js %}
// Perform a linear search and return a 1-based position when found.
function findPlayer(players, target) {
  let index = 1;

  for (const player of players) {
    if (player === target) {
      return index;
    }
    index += 1;
  }

  return -1;
}

const players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
const hoursPlayed = [6, 14, 9, 4];
const searchFor = "PixelRider";

const position = findPlayer(players, searchFor);

if (position > 0) {
  const playerHours = hoursPlayed[position - 1];
  console.log("Welcome player, " + searchFor + "!");
  console.log("Found at position: " + position);
  console.log("Hours played today: " + playerHours);
  if (playerHours > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Not found");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-listops-js"
   language="javascript"
   challenge=challenge_8_js
   code=code_8_js
%}

---

## 9. Search Algorithm

**Exam Topic:** College Board pseudocode includes key list operations: `APPEND(list, value)` adds to end, `INSERT(list, index, value)` adds at position, `REMOVE(list, index)` deletes by position, and `LENGTH(list)` returns count. On exam questions, you will trace how these operations change lists and indices. For CPT, list manipulation demonstrates data management and algorithm complexity.

{% capture challenge_9_ps %}
Run the pseudocode version for task list operations.
{% endcapture %}

{% capture code_9_ps %}
// PSEUDOCODE
// player_name <- "TaskTrek"
// hours_played_today <- 13
// tasks <- ["homework", "project"]
// DISPLAY("Welcome player, " + player_name + "!")
// DISPLAY("Initial tasks: " + tasks)
// APPEND(tasks, "study")
// DISPLAY("After APPEND: " + tasks)
// INSERT(tasks, 2, "practice")
// DISPLAY("After INSERT at 2: " + tasks)
// REMOVE(tasks, 3)
// DISPLAY("After REMOVE at 3: " + tasks)
// length <- LENGTH(tasks)
// DISPLAY("List length: " + length)
// FOR EACH task IN tasks { DISPLAY("Task: " + task) }
// IF (hours_played_today > 12) { DISPLAY("Go touch grass.") }

let player_name = "TaskTrek";
let hours_played_today = 13;
let tasks = ["homework", "project"];
console.log("Welcome player, " + player_name + "!");
console.log("Initial tasks: " + JSON.stringify(tasks));
tasks.push("study");
console.log("After APPEND: " + JSON.stringify(tasks));
tasks.splice(1, 0, "practice");
console.log("After INSERT at 2: " + JSON.stringify(tasks));
tasks.splice(2, 1);
console.log("After REMOVE at 3: " + JSON.stringify(tasks));
let length = tasks.length;
console.log("List length: " + length);
for (const task of tasks) {
  console.log("Task: " + task);
}
if (hours_played_today > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-searchalgo-ps"
   language="javascript"
   challenge=challenge_9_ps
   code=code_9_ps
%}

{% capture challenge_9_py %}
Translate player task list operations into Python.
{% endcapture %}

{% capture code_9_py %}
# Manage a player's daily tasks and check playtime balance.
player_name = "TaskTrek"
hours_played_today = 13
tasks = ["homework", "project"]

print("Welcome player, " + player_name + "!")
print("Initial tasks: " + str(tasks))

tasks.append("study")
print("After APPEND: " + str(tasks))

tasks.insert(1, "practice")
print("After INSERT at 2: " + str(tasks))

tasks.pop(2)
print("After REMOVE at 3: " + str(tasks))

length = len(tasks)
print("List length: " + str(length))

for task in tasks:
    print("Task: " + task)

if hours_played_today > 12:
    print("Go touch grass.")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-searchalgo-py"
   language="python"
   challenge=challenge_9_py
   code=code_9_py
%}

{% capture challenge_9_js %}
Translate player task list operations into JavaScript.
{% endcapture %}

{% capture code_9_js %}
// Manage a player's daily tasks and check playtime balance.
let playerName = "TaskTrek";
let hoursPlayedToday = 13;
let tasks = ["homework", "project"];

console.log("Welcome player, " + playerName + "!");
console.log("Initial tasks: " + JSON.stringify(tasks));

tasks.push("study");
console.log("After APPEND: " + JSON.stringify(tasks));

tasks.splice(1, 0, "practice");
console.log("After INSERT at 2: " + JSON.stringify(tasks));

tasks.splice(2, 1);
console.log("After REMOVE at 3: " + JSON.stringify(tasks));

let length = tasks.length;
console.log("List length: " + length);

for (const task of tasks) {
  console.log("Task: " + task);
}

if (hoursPlayedToday > 12) {
  console.log("Go touch grass.");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-searchalgo-js"
   language="javascript"
   challenge=challenge_9_js
   code=code_9_js
%}

---

## 10. Boolean Logic

**Exam Topic:** Linear search is a common AP exam algorithm pattern. It demonstrates iteration through a list, selection to check conditions, and return values. On exam questions, you will identify search logic, trace execution, and determine returned values for found and not-found cases. For CPT, implementing search demonstrates algorithmic thinking and practical data processing.

{% capture challenge_10_ps %}
Run the pseudocode version for player lookup and conditional display.
{% endcapture %}

{% capture code_10_ps %}
// PSEUDOCODE
// PROCEDURE find_player(player_list, target_name)
// {
//   index <- 1
//   FOR EACH player IN player_list {
//     IF (player = target_name) { RETURN(index) }
//     index <- index + 1
//   }
//   RETURN(-1)
// }
// players <- ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
// hours_played <- [6, 14, 9, 4]
// search_name <- "PixelRider"
// position <- find_player(players, search_name)
// IF (position > 0) {
//   player_hours <- hours_played[position]
//   DISPLAY("Welcome player, " + search_name + "!")
//   DISPLAY("Player found at position: " + position)
//   DISPLAY("Hours played today: " + player_hours)
//   IF (player_hours > 12) { DISPLAY("Go touch grass.") }
// } ELSE { DISPLAY("Player not found in roster") }

function find_player(player_list, target_name) {
  let index = 1;
  for (const player of player_list) {
    if (player === target_name) {
      return index;
    }
    index += 1;
  }
  return -1;
}
let players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
let hours_played = [6, 14, 9, 4];
let search_name = "PixelRider";
let position = find_player(players, search_name);
if (position > 0) {
  let player_hours = hours_played[position - 1];
  console.log("Welcome player, " + search_name + "!");
  console.log("Player found at position: " + position);
  console.log("Hours played today: " + player_hours);
  if (player_hours > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Player not found in roster");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-boolean-ps"
   language="javascript"
   challenge=challenge_10_ps
   code=code_10_ps
%}

{% capture challenge_10_py %}
Translate player lookup and conditional display logic into Python.
{% endcapture %}

{% capture code_10_py %}
# Find a player position, then use it to retrieve matching playtime.
def find_player(player_list, target_name):
    index = 1
    for player in player_list:
        if player == target_name:
            return index
        index += 1
    return -1

players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
hours_played = [6, 14, 9, 4]

search_name = "PixelRider"
position = find_player(players, search_name)

if position > 0:
    player_hours = hours_played[position - 1]
    print("Welcome player, " + search_name + "!")
    print("Player found at position: " + str(position))
    print("Hours played today: " + str(player_hours))
    if player_hours > 12:
        print("Go touch grass.")
else:
    print("Player not found in roster")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-boolean-py"
   language="python"
   challenge=challenge_10_py
   code=code_10_py
%}

{% capture challenge_10_js %}
Translate player lookup and conditional display logic into JavaScript.
{% endcapture %}

{% capture code_10_js %}
// Find a player position, then use it to retrieve matching playtime.
function findPlayer(playerList, targetName) {
  let index = 1;

  for (const player of playerList) {
    if (player === targetName) {
      return index;
    }
    index += 1;
  }

  return -1;
}

const players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
const hoursPlayed = [6, 14, 9, 4];

const searchName = "PixelRider";
const position = findPlayer(players, searchName);

if (position > 0) {
  const playerHours = hoursPlayed[position - 1];
  console.log("Welcome player, " + searchName + "!");
  console.log("Player found at position: " + position);
  console.log("Hours played today: " + playerHours);
  if (playerHours > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Player not found in roster");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-boolean-js"
   language="javascript"
   challenge=challenge_10_js
   code=code_10_js
%}

---

## 11. Find Student Grade

**Exam Concept:** College Board pseudocode uses `AND`, `OR`, and `NOT` to combine conditions. Boolean expressions evaluate to true or false. On the exam, you will trace complex conditions and predict which blocks execute. For CPT, Boolean logic supports more sophisticated decisions, such as validation and access checks, and demonstrates program complexity.

{% capture challenge_11_ps %}
Run the pseudocode version for returning matched player hours.
{% endcapture %}

{% capture code_11_ps %}
// PSEUDOCODE
// PROCEDURE find_player_hours(players, hours_list, target_name)
// {
//   index <- 1
//   FOR EACH player IN players {
//     IF (player = target_name) {
//       hours <- hours_list[index]
//       RETURN(hours)
//     }
//     index <- index + 1
//   }
//   RETURN(-1)
// }
// players <- ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
// hours_list <- [6, 14, 9, 4]
// search_name <- "PixelRider"
// result <- find_player_hours(players, hours_list, search_name)
// IF (result > 0) {
//   DISPLAY("Welcome player, " + search_name + "!")
//   DISPLAY("Hours played today: " + result)
//   IF (result > 12) { DISPLAY("Go touch grass.") }
// } ELSE { DISPLAY("Player not found") }

function find_player_hours(players, hours_list, target_name) {
  let index = 1;
  for (const player of players) {
    if (player === target_name) {
      return hours_list[index - 1];
    }
    index += 1;
  }
  return -1;
}
let players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
let hours_list = [6, 14, 9, 4];
let search_name = "PixelRider";
let result = find_player_hours(players, hours_list, search_name);
if (result > 0) {
  console.log("Welcome player, " + search_name + "!");
  console.log("Hours played today: " + result);
  if (result > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Player not found");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-final-ps"
   language="javascript"
   challenge=challenge_11_ps
   code=code_11_ps
%}

{% capture challenge_11_py %}
Translate a procedure returning matched player hours into Python.
{% endcapture %}

{% capture code_11_py %}
# Return a player's hours directly by searching aligned data.
def find_player_hours(players, hours_list, target_name):
    index = 1

    for player in players:
        if player == target_name:
            hours = hours_list[index - 1]
            return hours
        index += 1

    return -1

players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"]
hours_list = [6, 14, 9, 4]

search_name = "PixelRider"
result = find_player_hours(players, hours_list, search_name)

if result > 0:
    print("Welcome player, " + search_name + "!")
    print("Hours played today: " + str(result))
    if result > 12:
        print("Go touch grass.")
else:
    print("Player not found")
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-final-py"
   language="python"
   challenge=challenge_11_py
   code=code_11_py
%}

{% capture challenge_11_js %}
Translate a procedure returning matched player hours into JavaScript.
{% endcapture %}

{% capture code_11_js %}
// Return a player's hours directly by searching aligned data.
function findPlayerHours(players, hoursList, targetName) {
  let index = 1;

  for (const player of players) {
    if (player === targetName) {
      const hours = hoursList[index - 1];
      return hours;
    }
    index += 1;
  }

  return -1;
}

const players = ["AquaKnight", "PixelRider", "NovaByte", "SkyRunner"];
const hoursList = [6, 14, 9, 4];

const searchName = "PixelRider";
const result = findPlayerHours(players, hoursList, searchName);

if (result > 0) {
  console.log("Welcome player, " + searchName + "!");
  console.log("Hours played today: " + result);
  if (result > 12) {
    console.log("Go touch grass.");
  }
} else {
  console.log("Player not found");
}
{% endcapture %}

{% include runners/code.html
   runner_id="wk1s1-final-js"
   language="javascript"
   challenge=challenge_11_js
   code=code_11_js
%}

---

## Software Development Life Cycle (SDLC)

The development cycle involves iterative steps of running the server, making changes, testing, committing, and syncing changes to GitHub. This process ensures that your website is updated and functioning correctly both locally and on GitHub Pages.

### SDLC Workflow

```
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
|                   |       |                   |       |                   |       |                   |       |                   |
|   Make Server     | ----> |   Change Code     | ----> |     Commit        | ----> |      Test         | ----> |     Sync          |
|                   |       |                   |       |                   |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+       +-------------------+       +-------------------+
      |                           |                           |                           |                           |
      v                           v                           v                           v                           v
 Start Local Server           Edit Code Files           Stage Changes Locally        Verify Local Changes        Push Changes to Cloud
```

</div>
