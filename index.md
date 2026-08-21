---
layout: post 
title: Portfolio Home 
hide: true
show_reading_time: false
---

<style>
    .neon-button-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

  .portfolio-button {
        --neon-a: #00f5ff;
        --neon-b: #44ff99;
        --neon-surface: rgba(6, 12, 26, 0.84);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
        padding: 10px 14px;
        border: 1px solid rgba(0, 245, 255, 0.65);
        border-radius: 10px;
        font-weight: 700;
        color: #dfffff;
        background: linear-gradient(140deg, rgba(0, 245, 255, 0.09), rgba(68, 255, 153, 0.06), var(--neon-surface));
        box-shadow: 0 0 0 1px rgba(0, 245, 255, 0.2) inset, 0 0 18px rgba(0, 245, 255, 0.24), 0 0 28px rgba(68, 255, 153, 0.16);
        overflow: hidden;
    text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
        animation: neon-pulse 2.4s ease-in-out infinite;
  }

    .portfolio-button::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        background: conic-gradient(from 0deg, transparent 0deg, rgba(0, 245, 255, 0.65) 100deg, rgba(68, 255, 153, 0.6) 200deg, transparent 360deg);
        filter: blur(12px);
        opacity: 0.42;
        z-index: -1;
        animation: neon-spin 5.6s linear infinite;
    }

    .portfolio-button::after {
        content: "";
        position: absolute;
        top: 0;
        left: -130%;
        width: 52%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.46), transparent);
        transform: skewX(-20deg);
        animation: neon-scan 2.9s ease-in-out infinite;
        pointer-events: none;
    }

    .portfolio-button > div {
        background: transparent !important;
        color: inherit !important;
        padding: 0 !important;
        border-radius: 0 !important;
        font-weight: inherit !important;
        transition: none !important;
    }

  .portfolio-button:hover {
        transform: translateY(-3px) scale(1.03);
        border-color: rgba(102, 255, 224, 0.95);
        box-shadow: 0 0 0 1px rgba(102, 255, 224, 0.35) inset, 0 0 22px rgba(0, 245, 255, 0.45), 0 0 34px rgba(68, 255, 153, 0.3);
        filter: brightness(1.08);
        animation: button-bounce 0.25s ease-out;
  }

    .portfolio-button:focus-visible {
        outline: 2px solid rgba(68, 255, 153, 0.9);
        outline-offset: 2px;
    }

  @keyframes button-bounce {
    0% { transform: translateY(0) scale(1); }
        35% { transform: translateY(-5px) scale(1.04); }
        100% { transform: translateY(-3px) scale(1.03); }
    }

    @keyframes neon-pulse {
        0%, 100% { box-shadow: 0 0 0 1px rgba(0, 245, 255, 0.2) inset, 0 0 16px rgba(0, 245, 255, 0.2), 0 0 26px rgba(68, 255, 153, 0.12); }
        50% { box-shadow: 0 0 0 1px rgba(0, 245, 255, 0.34) inset, 0 0 24px rgba(0, 245, 255, 0.36), 0 0 40px rgba(68, 255, 153, 0.25); }
    }

    @keyframes neon-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes neon-scan {
        0% { left: -130%; opacity: 0; }
        18% { opacity: 1; }
        55% { left: 130%; opacity: 0.95; }
        100% { left: 130%; opacity: 0; }
  }
</style>

Hi! My name is Yiming Yin

### Development Environment


> Coding starts with tools, explore these tools and procedures with a click.

<div class="neon-button-grid">
    <a class="portfolio-button" href="https://opencodingsociety.com" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #FA8072; border-radius: 6px; font-weight: 700; transition: all 0.3s;">
        <img src="{{ '/favicon.ico' | relative_url }}" alt="OCS logo" style="width: 16px; height: 16px;">
        OCS
    </a>
    <a class="portfolio-button" href="https://github.com/Open-Coding-Society/portfolio" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #FFF; border-radius: 6px; font-weight: 700; transition: all 0.3s;">
        <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub
    </a>
    <a class="portfolio-button" href="https://vscode.dev/" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #007ACC; border-radius: 6px; font-weight: 700; transition: all 0.3s;">
        <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.34 0L5.66 5.39l-2.4-1.8L1.19 4.82v6.36l2.07 1.23 2.4-1.8L11.34 16 15 14.23V1.77L11.34 0zm.59 11.57l-3.86-3.54 3.86-3.54v7.08z"/>
        </svg>
        VSCode.dev
    </a>
</div>

<br>

### My Lessons

> Foundations in Tech are essential, click to see some of my lesson creations.


<div class="neon-button-grid">
    <a class="portfolio-button" href="{{site.baseurl}}/personal-accomplishment-yiming/cs111-college-ready/" style="text-decoration: none;">
        <div style="background-color: var(--green); color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold; transition: transform 0.2s, box-shadow 0.2s;">
           CS111
        </div>
    </a>
    <a class="portfolio-button" href="{{site.baseurl}}/personal-accomplishment-yiming/aquatic-game-level-explanation/" style="text-decoration: none;">
        <div style="background-color: var(--blue); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; transition: transform 0.2s, box-shadow 0.2s;">
           Aquatic Explanation
        </div>
    </a>
    <a class="portfolio-button" href="{{site.baseurl}}/gamerunner" style="text-decoration: none;">
        <div style="background-color: var(--warn); color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold; transition: transform 0.2s, box-shadow 0.2s;">
           Gamerunner
        </div>
    </a>
    <a class="portfolio-button" href="{{site.baseurl}}/network/stack" style="text-decoration: none;">
        <div style="background-color: var(--orange); color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold; transition: transform 0.2s, box-shadow 0.2s;">
           Character Interactions & Boss Fight
        </div>
    </a>
</div>

<br>

### Class Progress

> Here is my game progress through coding, click to see these in the browser

#### CSSE

<div class="neon-button-grid">
    <a class="portfolio-button btn" href="https://precia-verma.github.io/Group-projects/snake">
        Snake
    </a>
    <a class="portfolio-button btn" href="https://teamspace.opencodingsociety.com/team-space-portal" style="background-color: var(--green); ">
        Team Aquatic (Space)
    </a>
    <a class="portfolio-button btn" href="{{site.baseurl}}/personal-accomplishment-yiming/version-2-review-csse/" style="background-color: var(--blue);">
        Version 2
    </a>
    <a class="portfolio-button btn" href="{{site.baseurl}}/gamify" style="background-color: var(--teal);">
       Gamify
    </a>
    <a class="portfolio-button btn" href="{{site.baseurl}}/cs-pathway" style="background-color: var(--orange);">
       CS Pathway
    </a>
</div>

#### AP CSP

<div class="neon-button-grid">
    <a class="portfolio-button btn" href="{{site.baseurl}}/week-1-sprint-1/" style="background-color: var(--orange);">
        Week 1 Sprint 1
    </a>
</div>

<br>
