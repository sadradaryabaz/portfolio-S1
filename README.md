# portfolio-S1
#  Terminal-Style Personal Portfolio

A highly interactive, terminal-inspired personal website designed to showcase my projects, skills, and digital identity through a unique command-line interface (CLI) experience.

![Project Status](https://img.shields.io/badge/Status-In--Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

##  Project Overview

This project is more than just a website; it's a digital environment. It simulates a terminal experience where users can interact with my profile, explore my projects, and view my resume using commands, providing a seamless blend of nostalgia and modern web technologies.

##  Key Features

- **Terminal Interface:** A functional CLI simulation for navigating the site.
- **Interactive Components:** Dynamic content loading via JavaScript (filesystem-like interaction).
- **Multi-language Support:** Integrated language switching capabilities.
- **Rich Assets:** High-quality typography (Ray Font family) and custom-designed assets.
- **Responsive Design:** Optimized for various screen sizes with dedicated CSS modules.
- **PWA Ready:** Includes service workers for enhanced performance and offline capabilities.

##  Project Structure

The project follows a modular architecture for scalability and maintainability:
```text
├── assets/             # Static assets
│   ├── fonts/          # Custom typography (Ray family)
│   ├── image/          # Project and personal images
│   ├── logo/           # Brand logos and icons
│   ├── pdf/            # Digital resumes (EN/FA)
│   └── rar/            # Project archives/samples
├── css/                # Modular stylesheets (Component-based)
├── js/                 # Core logic (Terminal engine, commands, effects)
├── index.html          # Entry point
├── manifest.json       # PWA manifest
└── sw.js               # Service Worker for PWA
