---
layout: post
title: About
permalink: /about/
comments: true
---

## As a conversation Starter

Here are some places I have been to.

<comment>
Flags are made using Wikipedia images
</comment>

<style>
    /* Style looks pretty compact, 
       - grid-container and grid-item are referenced the code 
    */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }

    .image-gallery {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 10px;
        }

    .image-gallery img {
        max-height: 150px;
        object-fit: cover;
        border-radius: 5px;
    }

    .school-image {
        display: block;
        width: 220px;
        height: 130px;
        object-fit: cover;
        border-radius: 6px;
        margin: 8px 0 14px 0;
    }

    .hobby-image {
        display: block;
        width: 260px;
        height: 160px;
        object-fit: cover;
        border-radius: 8px;
        margin: 8px 0 16px 0;
    }

    .hobby-image-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 8px 0 16px 0;
    }

    .snake-game-button {
        display: inline-block;
        margin: 10px 0 16px 0;
        padding: 11px 18px;
        background: linear-gradient(90deg, #00f5a0, #00d9ff, #00f5a0);
        background-size: 200% 100%;
        color: #ffffff;
        text-decoration: none;
        border-radius: 10px;
        font-weight: 700;
        letter-spacing: 0.2px;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.45);
        box-shadow: 0 0 10px rgba(0, 245, 160, 0.55), 0 0 22px rgba(0, 217, 255, 0.35);
        transition: transform 0.2s ease, box-shadow 0.2s ease, background-position 0.35s ease;
        animation: neonPulse 1.8s ease-in-out infinite;
    }

    .snake-game-button:hover {
        transform: translateY(-2px) scale(1.02);
        background-position: 100% 0;
        box-shadow: 0 0 14px rgba(0, 245, 160, 0.85), 0 0 30px rgba(0, 217, 255, 0.6);
    }

    .snake-game-button:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0 0 8px rgba(0, 245, 160, 0.65), 0 0 16px rgba(0, 217, 255, 0.4);
    }

    .snake-game-button:focus-visible {
        outline: 2px solid #00f5a0;
        outline-offset: 3px;
    }

    @keyframes neonPulse {
        0% {
            box-shadow: 0 0 10px rgba(0, 245, 160, 0.5), 0 0 20px rgba(0, 217, 255, 0.35);
        }
        50% {
            box-shadow: 0 0 16px rgba(0, 245, 160, 0.9), 0 0 34px rgba(0, 217, 255, 0.7);
        }
        100% {
            box-shadow: 0 0 10px rgba(0, 245, 160, 0.5), 0 0 20px rgba(0, 217, 255, 0.35);
        }
    }
</style>

<!-- This grid_container class is used by CSS styling and the id is used by JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for local image source and data rows
    var image_source = "{{site.baseurl}}/images/about/";
    var living_in_the_world = [
        {"flag": "California flag.webp", "description": "California - right now"},
        {"flag": "Texas.webp", "description": "Texas"},
        {"flag": "Florida.jpg", "description": "Florida"},
        {"flag": "Japan.jpeg", "description": "Japan"},
        {"flag": "China.jpg", "description": "China"},
    ];

    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = image_source + encodeURIComponent(location.flag); // local image path with safe filename encoding
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

### Journey through Life

- 🏫 Elementary School at China.
- 🐶 Beck Junior High School in Houston, Texas.
    <img class="school-image" src="{{site.baseurl}}/images/about/BJH.jpg" alt="Beck Junior High School">
- 🌲 Oak Valley Middle School for Eighth Grade in San Diego, California.
    <img class="school-image" src="{{site.baseurl}}/images/about/OVMS.png" alt="Oak Valley Middle School">
- 🦅 Studying at Del Norte High School, San Diego, California right now.
    <img class="school-image" src="{{site.baseurl}}/images/about/DNHS.png" alt="Del Norte High School">
- 🐍 Started learning about the fundementals of python at 7th grade.
- 🎮 Learn how to create games in 10th grade.
- 🧠 Developing on how to create projects for bigger organizations in 11th grade.

## Computer Science Achievements

The reason why I'm interested in computing is that I wanted to create my own projects, for example, interactive learning tools, exciting games, and **SUPER SUPER COOL websites**.
In 10th grade, I specifically focused on games, the first achievement was the enhanced snake game, from simple eating to various of game modes and automatic map expansions.

<a class="snake-game-button" href="https://precia-verma.github.io/Group-projects/snake" target="_blank" rel="noopener noreferrer">Play My Enhanced Snake Game</a>

The second project I've created in CSSE is the Aquatic Game which contains a super exciting boss fight and another fun boss fight with different mechanics but still developing.

<a class="snake-game-button" href="https://pages.opencodingsociety.com/characters-lesson/" target="_blank" rel="noopener noreferrer">Explore My Aquatic Game</a>

In 11th grade, I want to focus more on project building skills, which is my last learning goal.

## Hobbies
I don't have a lot of hobbies but here's the list:
I started playing badminton with my dad since I was 7 years old, however I paused playing for a while after moving to the U.S.
<img class="hobby-image" src="{{site.baseurl}}/images/about/badminton.webp" alt="Playing badminton">

I'm a big fan of math, maybe not as good as someone, but I enjoy solving mathematical problems and share what I've learned.
<img class="hobby-image" src="{{site.baseurl}}/images/about/Calculus.jpeg" alt="Math and calculus practice">

I also like computer science, I'm obsessed with the feeling that when other people is using my product.
<img class="hobby-image" src="{{site.baseurl}}/images/about/Computing.jpeg" alt="Computer science project work">

I also like gaming, Roblox was my first ever game after I moved to the U.S. and I started to play Brawl Stars since freshman year in high school.
<div class="hobby-image-row">
    <img class="hobby-image" src="{{site.baseurl}}/images/about/Roblox.avif" alt="Roblox gameplay">
    <img class="hobby-image" src="{{site.baseurl}}/images/about/Brawl Stars.webp" alt="Brawl Stars gameplay">
</div>
