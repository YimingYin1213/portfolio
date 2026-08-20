---
layout: post
title: Week 1 Sprint 1
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

Pseudocode translation cheat sheet with Python and JavaScript code runners for each concept block.

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
let playerName = "AquaKnight";
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

{% capture challenge_2_py %}
Translate player session tracking with list traversal into Python.
{% endcapture %}

{% capture code_2_py %}
# Sum daily play sessions and remind the player if total time is too high.
player_name = "QuestFox"
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

player_name = "NovaByte"
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

let playerName = "NovaByte";
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

{% capture challenge_4_py %}
Translate a sequence that computes total playtime and decision output into Python.
{% endcapture %}

{% capture code_4_py %}
# Use sequence: define values, calculate total, then print results.
player_name = "SkyRunner"
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
let playerName = "SkyRunner";
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

</div>
