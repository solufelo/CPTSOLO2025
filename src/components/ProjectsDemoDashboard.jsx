import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

// =============================================================================
// ARCHITECTURE DIAGRAM COMPONENTS (CSS styled flow blocks)
// =============================================================================
const FindYouArchitecture = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-cyan-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-cyan-950 text-cyan-400 mb-2">
        <Icon icon="lucide:monitor" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">React Frontend</h4>
      <p className="text-xs text-zinc-400 mt-1">Eisenhower Matrix & Pomodoro dashboard interface</p>
    </div>
    
    <div className="text-zinc-500 font-bold rotate-90 md:rotate-0">
      <Icon icon="lucide:arrow-right" className="size-5" />
    </div>

    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-emerald-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-emerald-950 text-emerald-400 mb-2">
        <Icon icon="lucide:server" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">Python Backend</h4>
      <p className="text-xs text-zinc-400 mt-1">HTTP Server managing configurations & script triggers</p>
    </div>

    <div className="text-zinc-500 font-bold rotate-90 md:rotate-0">
      <Icon icon="lucide:arrow-right" className="size-5" />
    </div>

    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-purple-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-purple-950 text-purple-400 mb-2">
        <Icon icon="lucide:bot" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">Playwright & SQLite</h4>
      <p className="text-xs text-zinc-400 mt-1">Security-isolated crawler & Local Markdown vault</p>
    </div>
  </div>
);

const LightYearsArchitecture = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 px-4 bg-zinc-900/40 rounded-xl border border-zinc-800">
    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-red-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-red-950 text-red-400 mb-2">
        <Icon icon="lucide:cpu" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">C++20 & CMake</h4>
      <p className="text-xs text-zinc-400 mt-1">Core fixed-timestep engine loop & physics logic</p>
    </div>

    <div className="text-zinc-500 font-bold rotate-90 md:rotate-0">
      <Icon icon="lucide:arrow-right" className="size-5" />
    </div>

    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-purple-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-purple-950 text-purple-400 mb-2">
        <Icon icon="lucide:box" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">Object Pooling</h4>
      <p className="text-xs text-zinc-400 mt-1">Pre-allocated bullet and entity buffers (zero heap calls)</p>
    </div>

    <div className="text-zinc-500 font-bold rotate-90 md:rotate-0">
      <Icon icon="lucide:arrow-right" className="size-5" />
    </div>

    <div className="flex flex-col items-center p-4 bg-neutral-900 rounded-lg border border-emerald-500/30 w-full md:w-1/4 text-center">
      <div className="p-2 rounded-full bg-emerald-950 text-emerald-400 mb-2">
        <Icon icon="lucide:binary" className="size-6" />
      </div>
      <h4 className="font-medium text-white text-sm">WebAssembly</h4>
      <p className="text-xs text-zinc-400 mt-1">Compiled via Emscripten for fast canvas execution</p>
    </div>
  </div>
);

// =============================================================================
// CORE PROJECTS DEMO DASHBOARD
// =============================================================================
const ProjectsDemoDashboard = () => {
  const [activeProject, setActiveProject] = useState('findyou');
  const [activeSubTab, setActiveSubTab] = useState('demo');

  // findYOU states
  const [pomodoroTime, setPomodoroTime] = useState(1500); // 25 min
  const [pomodoroIsActive, setPomodoroIsActive] = useState(false);
  const pomodoroInterval = useRef(null);
  const [findYouTasks, setFindYouTasks] = useState([
    { id: 1, text: "Audit prepr.org stack & accessibility standards", quadrant: "do", done: false },
    { id: 2, text: "Refine full-stack web developer cover letter", quadrant: "do", done: true },
    { id: 3, text: "Review C++ WebAssembly CMake configuration", quadrant: "plan", done: false },
    { id: 4, text: "Draft portfolio theme playground guidelines", quadrant: "delegate", done: false },
    { id: 5, text: "Clear build directories from legacy test runs", quadrant: "eliminate", done: true }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskQuadrant, setNewTaskQuadrant] = useState('do');
  const [findYouLogs, setFindYouLogs] = useState([]);
  const [findYouLogsRunning, setFindYouLogsRunning] = useState(false);
  const logTimerRef = useRef(null);

  // Light Years Canvas states
  const canvasRef = useRef(null);
  const [debugPoolActive, setDebugPoolActive] = useState(0);
  const [debugPoolSize, setDebugPoolSize] = useState(10);
  const [debugFps, setDebugFps] = useState(60);
  const [debugShowBoundingBox, setDebugShowBoundingBox] = useState(true);
  const gameStateRef = useRef({
    bullets: [],
    asteroids: [],
    score: 0,
    playerX: 200,
    playerY: 330,
    playerRadius: 15,
    bulletPool: []
  });
  const gameLoopRef = useRef(null);

  // Cleanup effects
  useEffect(() => {
    return () => {
      if (pomodoroInterval.current) clearInterval(pomodoroInterval.current);
      if (logTimerRef.current) clearTimeout(logTimerRef.current);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  // Initialize Bullet Pool for Light Years Demo
  useEffect(() => {
    const pool = [];
    for (let i = 0; i < 10; i++) {
      pool.push({ x: 0, y: 0, active: false, velocityY: -6, radius: 4 });
    }
    gameStateRef.current.bulletPool = pool;
    setDebugPoolSize(pool.length);
  }, []);

  // =============================================================================
  // SIMULATOR HANDLERS
  // =============================================================================

  // 1. findYOU - Pomodoro Timer
  const handlePomodoroToggle = () => {
    if (pomodoroIsActive) {
      clearInterval(pomodoroInterval.current);
      setPomodoroIsActive(false);
    } else {
      setPomodoroIsActive(true);
      pomodoroInterval.current = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev <= 1) {
            clearInterval(pomodoroInterval.current);
            setPomodoroIsActive(false);
            return 1500;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handlePomodoroReset = () => {
    clearInterval(pomodoroInterval.current);
    setPomodoroIsActive(false);
    setPomodoroTime(1500);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 2. findYOU - Eisenhower Matrix
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      quadrant: newTaskQuadrant,
      done: false
    };
    setFindYouTasks(prev => [...prev, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (id) => {
    setFindYouTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTask = (id) => {
    setFindYouTasks(prev => prev.filter(t => t.id !== id));
  };

  // 3. findYOU - Playwright Log Streamer
  const handleRunFindYouCrawler = () => {
    if (findYouLogsRunning) return;
    setFindYouLogs([]);
    setFindYouLogsRunning(true);

    const logMessages = [
      "Initializing secure configuration container...",
      "Connecting local SQLite backend at db/findyou.db",
      "Launching security-isolated chromium context (crawling sandbox)...",
      "Crawling secure developer career channels...",
      "Executing site parse filters for: 'upskilling', 'collaborative challenge'...",
      "Found 4 relevant security & productivity listings.",
      "Writing aggregated records directly to Markdown vaults...",
      "Local vault write-back complete.",
      "Syncing with Eisenhower task manager database...",
      "All background system crawlers completed successfully."
    ];

    let currentLogIndex = 0;
    const logNext = () => {
      if (currentLogIndex < logMessages.length) {
        const timestamp = new Date().toLocaleTimeString();
        setFindYouLogs(prev => [...prev, `[${timestamp}] ${logMessages[currentLogIndex]}`]);
        currentLogIndex++;
        logTimerRef.current = setTimeout(logNext, 800);
      } else {
        setFindYouLogsRunning(false);
      }
    };
    logNext();
  };

  // =============================================================================
  // LIGHT YEARS Retro Shooter Engine Demo
  // =============================================================================
  useEffect(() => {
    if (activeProject !== 'lightyears' || activeSubTab !== 'demo') {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Reset game states
    const state = gameStateRef.current;
    state.score = 0;
    state.asteroids = [];
    state.bullets = [];
    // Reset bullet pool
    state.bulletPool.forEach(b => b.active = false);

    // Mouse control
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const root = document.documentElement;
      const mouseX = e.clientX - rect.left - root.scrollLeft;
      // Clamp player within canvas bounds
      state.playerX = Math.max(state.playerRadius, Math.min(canvas.width - state.playerRadius, mouseX));
    };

    // Click to shoot (fires using the object pool)
    const handleCanvasClick = () => {
      // Find an inactive bullet in the pool
      const pooledBullet = state.bulletPool.find(b => !b.active);
      if (pooledBullet) {
        pooledBullet.x = state.playerX;
        pooledBullet.y = state.playerY - 10;
        pooledBullet.active = true;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleCanvasClick);

    // Helper functions for graphics
    const drawPlayer = (x, y) => {
      // Bounding box
      if (debugShowBoundingBox) {
        ctx.strokeStyle = '#22c55e'; // Green boundary
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, state.playerRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw stylized ship
      ctx.fillStyle = '#06b6d4'; // Cyan primary ship
      ctx.beginPath();
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x - 12, y + 10);
      ctx.lineTo(x + 12, y + 10);
      ctx.closePath();
      ctx.fill();

      // Engines glowing
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(x - 6, y + 10, 4, 3);
      ctx.fillRect(x + 2, y + 10, 4, 3);
    };

    let frameCount = 0;
    let lastTime = performance.now();
    let asteroidSpawnTimer = 0;

    // Game loop
    const runFrame = () => {
      ctx.fillStyle = '#09090b'; // dark bg
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw space grid
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setDebugFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Spawn Asteroids
      asteroidSpawnTimer++;
      if (asteroidSpawnTimer > 70) {
        asteroidSpawnTimer = 0;
        state.asteroids.push({
          x: Math.random() * (canvas.width - 20) + 10,
          y: -20,
          speed: Math.random() * 1.5 + 1.2,
          radius: Math.random() * 8 + 10,
          hits: 0
        });
      }

      // Draw and update active bullets (from the pool)
      let activeCount = 0;
      state.bulletPool.forEach(bullet => {
        if (bullet.active) {
          activeCount++;
          bullet.y += bullet.velocityY;

          // Draw bullet
          ctx.fillStyle = '#f59e0b'; // amber bullet
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
          ctx.fill();

          // Debug boundary
          if (debugShowBoundingBox) {
            ctx.strokeStyle = '#22c55e';
            ctx.strokeRect(bullet.x - bullet.radius, bullet.y - bullet.radius, bullet.radius * 2, bullet.radius * 2);
          }

          // Offscreen removal
          if (bullet.y < 0) {
            bullet.active = false;
          }
        }
      });
      setDebugPoolActive(activeCount);

      // Draw and update asteroids
      state.asteroids = state.asteroids.filter(asteroid => {
        asteroid.y += asteroid.speed;

        // Draw Asteroid
        ctx.fillStyle = '#52525b'; // zinc rock
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bounding box
        if (debugShowBoundingBox) {
          ctx.strokeStyle = '#ef4444'; // Red for enemy targets
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Bullet hit checks
        state.bulletPool.forEach(bullet => {
          if (bullet.active) {
            // Distance calculation
            const dx = bullet.x - asteroid.x;
            const dy = bullet.y - asteroid.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Collision check
            if (dist < bullet.radius + asteroid.radius) {
              bullet.active = false; // return to pool
              asteroid.hits++;
            }
          }
        });

        // Check player collision
        const pDx = state.playerX - asteroid.x;
        const pDy = state.playerY - asteroid.y;
        const pDist = Math.sqrt(pDx * pDx + pDy * pDy);
        if (pDist < state.playerRadius + asteroid.radius) {
          // Player hit, flash screen
          ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          asteroid.hits = 99; // destroy
        }

        // Keep if not destroyed and not off-screen
        const isDestroyed = asteroid.hits > 0;
        if (isDestroyed) {
          state.score += 100;
        }

        return !isDestroyed && asteroid.y < canvas.height + 20;
      });

      // Draw player
      drawPlayer(state.playerX, state.playerY);

      // Render Score
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`SCORE: ${state.score}`, 12, 22);

      gameLoopRef.current = requestAnimationFrame(runFrame);
    };

    runFrame();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [activeProject, activeSubTab, debugShowBoundingBox]);

  // Code snippets database
  const snippets = {
    findyou: `// findYOU - Security-Isolated Scraping Routine (Python)
import os
from playwright.sync_api import sync_playwright

def crawl_active_postings(query_keywords):
    """
    Spawns a headless browser in a sandboxed directory 
    enforcing credential isolation.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create an isolated local profile context
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
        )
        page = context.new_page()
        
        # Scrape with timeouts matching user patterns
        page.goto("https://prepr.org/challenges", timeout=60000)
        listings = page.locator(".challenge-card-title")
        
        results = []
        for i in range(listings.count()):
            title = listings.nth(i).text_content().strip()
            if any(k.lower() in title.lower() for k in query_keywords):
                results.append(title)
                
        context.close()
        browser.close()
        return results`,
    lightyears: `// Light Years - Fixed Timestep Loop & Object Pool (C++)
#include <vector>
#include <memory>

class Bullet {
public:
    float x, y;
    bool active = false;
    void update(float dt) { y -= 350.0f * dt; if (y < 0) active = false; }
};

class GameEngine {
private:
    std::vector<std::unique_ptr<Bullet>> bulletPool;
    const float TIME_STEP = 1.0f / 60.0f; // Fixed 60Hz physics loop
    float accumulator = 0.0f;

public:
    void initializePool(int capacity) {
        for (int i = 0; i < capacity; ++i) {
            bulletPool.push_back(std::make_unique<Bullet>());
        }
    }

    void shoot(float spawnX, float spawnY) {
        // Reuse an inactive pooled bullet (Avoids runtime heap allocation)
        for (auto& bullet : bulletPool) {
            if (!bullet->active) {
                bullet->x = spawnX;
                bullet->y = spawnY;
                bullet->active = true;
                return; 
            }
        }
    }

    void runLoop(float realDeltaTime) {
        accumulator += realDeltaTime;
        while (accumulator >= TIME_STEP) {
            // Update physics steps consistently regardless of frametime spikes
            for (auto& bullet : bulletPool) {
                if (bullet->active) bullet->update(TIME_STEP);
            }
            accumulator -= TIME_STEP;
        }
    }
};`,
    captainsolo: `// captainsolo.ca - GSAP Interactive Hover Cursor Tracker (React)
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useQuickSetCursor = (triggerRef, followerRef) => {
  const xSet = useRef(null);
  const ySet = useRef(null);

  useEffect(() => {
    // QuickSetter provides a direct high-performance bridge to CSS transforms
    xSet.current = gsap.quickSetter(followerRef.current, "x", "px");
    ySet.current = gsap.quickSetter(followerRef.current, "y", "px");

    const handleMouseMove = (e) => {
      xSet.current(e.clientX + 15);
      ySet.current(e.clientY + 15);
    };

    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [triggerRef, followerRef]);
};`
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
          /demo — the workshop
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
          findYOU is the main build. Click the widgets — it&apos;s rough on purpose. Light Years and this site are in rotation too.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 backdrop-blur-md">
        <button
          onClick={() => { setActiveProject('findyou'); setActiveSubTab('demo'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeProject === 'findyou' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Icon icon="lucide:check-square" className="size-4" />
          findYOU
        </button>

        <button
          onClick={() => { setActiveProject('lightyears'); setActiveSubTab('demo'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeProject === 'lightyears' ? 'bg-red-500 text-black shadow-lg shadow-red-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Icon icon="lucide:gamepad-2" className="size-4" />
          Light Years (C++20)
        </button>

        <button
          onClick={() => { setActiveProject('captainsolo'); setActiveSubTab('demo'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeProject === 'captainsolo' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
        >
          <Icon icon="lucide:globe" className="size-4" />
          captainsolo.ca
        </button>
      </div>

      {/* Active Project Information Header */}
      <div className="mb-6 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h2 className="text-xl md:text-2xl font-bold text-white capitalize">
                {activeProject === 'findyou' ? 'findYOU — productivity OS' :
                 activeProject === 'lightyears' ? 'Light Years — C++20 engine' :
                 'captainsolo.ca — this site'}
              </h2>
              <span className={`shrink-0 whitespace-nowrap px-2 py-0.5 text-xs rounded-full font-mono font-bold ${
                activeProject === 'findyou' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/20' :
                activeProject === 'lightyears' ? 'bg-red-950 text-red-400 border border-red-500/20' :
                'bg-purple-950 text-purple-400 border border-purple-500/20'
              }`}>
                {activeProject === 'findyou' ? 'WIP' :
                 activeProject === 'lightyears' ? 'WIP' :
                 'Live'}
              </span>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm">
              {activeProject === 'findyou' ? 'Tasks, Pomodoro, scrapers — the app I\'m actually finishing. Simulator below, not production.' :
               activeProject === 'lightyears' ? 'Fixed-timestep loop, pooling, WASM target. Play in the canvas.' :
               'React portfolio on my own cPanel stack.'}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href={
                activeProject === 'findyou' ? 'https://github.com/solufelo' :
                 activeProject === 'lightyears' ? 'https://github.com/solufelo/light-years-cpp' :
                 'https://github.com/solufelo'
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 text-xs font-medium transition"
            >
              <Icon icon="mdi:github" className="size-4" />
              Source Code
            </a>
          </div>
        </div>

        {/* Project Sub Tabs */}
        <div className="flex gap-2 mt-6 border-t border-zinc-800/80 pt-4">
          <button
            onClick={() => setActiveSubTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeSubTab === 'demo' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon icon="lucide:play" className="size-3.5" />
            Interactive Demo
          </button>
          <button
            onClick={() => setActiveSubTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeSubTab === 'architecture' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon icon="lucide:network" className="size-3.5" />
            System Architecture
          </button>
          <button
            onClick={() => setActiveSubTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              activeSubTab === 'code' ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon icon="lucide:code-2" className="size-3.5" />
            Code Showcase
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER CONTENT BODY */}
      <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 min-h-[480px]">
        {/* SUB TAB: INTERACTIVE DEMO */}
        {activeSubTab === 'demo' && (
          <div>
            {/* findYOU Interactive Widgets */}
            {activeProject === 'findyou' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Column 1: Pomodoro & Matrix */}
                <div className="space-y-6">
                  {/* Pomodoro Timer widget */}
                  <div className="p-5 bg-neutral-900/60 rounded-xl border border-zinc-800 flex flex-col items-center">
                    <h3 className="text-zinc-300 font-bold text-sm mb-4 flex items-center gap-2">
                      <Icon icon="lucide:timer" className="text-cyan-400 size-4" />
                      SYSTEM POMODORO
                    </h3>
                    <div className="text-5xl font-mono tracking-wider font-extrabold text-cyan-400 mb-4 bg-black/60 px-6 py-2 rounded-xl border border-cyan-500/10">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePomodoroToggle}
                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                          pomodoroIsActive ? 'bg-red-500 text-black' : 'bg-cyan-500 text-black'
                        }`}
                      >
                        {pomodoroIsActive ? 'Pause' : 'Start Focus'}
                      </button>
                      <button
                        onClick={handlePomodoroReset}
                        className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Matrix Form Planner */}
                  <div className="p-5 bg-neutral-900/60 rounded-xl border border-zinc-800">
                    <h3 className="text-zinc-300 font-bold text-sm mb-3 flex items-center gap-2">
                      <Icon icon="lucide:plus-circle" className="text-cyan-400 size-4" />
                      ADD MATRIX WORK ITEM
                    </h3>
                    <form onSubmit={handleAddTask} className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Task description..."
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                      <div className="flex gap-2">
                        <select
                          value={newTaskQuadrant}
                          onChange={(e) => setNewTaskQuadrant(e.target.value)}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white flex-grow focus:outline-none"
                        >
                          <option value="do">Q1: Urgent & Important (Do)</option>
                          <option value="plan">Q2: Important, Not Urgent (Plan)</option>
                          <option value="delegate">Q3: Urgent, Not Important (Delegate)</option>
                          <option value="eliminate">Q4: Not Urgent/Important (Eliminate)</option>
                        </select>
                        <button
                          type="submit"
                          className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs px-4 rounded-lg transition"
                        >
                          Add Task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Column 2: Eisenhower Matrix View & Playwright Logger */}
                <div className="space-y-6">
                  {/* Eisenhower Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Q1: Do */}
                    <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg h-[160px] overflow-y-auto">
                      <h4 className="text-[10px] font-bold tracking-widest text-red-400 uppercase mb-2">DO (URGENT/IMPORTANT)</h4>
                      <ul className="space-y-1 text-xs">
                        {findYouTasks.filter(t => t.quadrant === 'do').map(t => (
                          <li key={t.id} className="flex justify-between items-center group bg-black/30 p-1.5 rounded border border-red-500/10">
                            <span 
                              onClick={() => handleToggleTask(t.id)}
                              className={`cursor-pointer line-clamp-2 pr-1 ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}
                            >
                              {t.text}
                            </span>
                            <button onClick={() => handleDeleteTask(t.id)} className="text-zinc-500 hover:text-red-400 flex-shrink-0">
                              <Icon icon="lucide:trash-2" className="size-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Q2: Plan */}
                    <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg h-[160px] overflow-y-auto">
                      <h4 className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase mb-2">SCHEDULE (PLAN)</h4>
                      <ul className="space-y-1 text-xs">
                        {findYouTasks.filter(t => t.quadrant === 'plan').map(t => (
                          <li key={t.id} className="flex justify-between items-center group bg-black/30 p-1.5 rounded border border-cyan-500/10">
                            <span 
                              onClick={() => handleToggleTask(t.id)}
                              className={`cursor-pointer line-clamp-2 pr-1 ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}
                            >
                              {t.text}
                            </span>
                            <button onClick={() => handleDeleteTask(t.id)} className="text-zinc-500 hover:text-cyan-400 flex-shrink-0">
                              <Icon icon="lucide:trash-2" className="size-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Q3: Delegate */}
                    <div className="p-3 bg-yellow-950/20 border border-yellow-500/20 rounded-lg h-[160px] overflow-y-auto">
                      <h4 className="text-[10px] font-bold tracking-widest text-yellow-400 uppercase mb-2">DELEGATE</h4>
                      <ul className="space-y-1 text-xs">
                        {findYouTasks.filter(t => t.quadrant === 'delegate').map(t => (
                          <li key={t.id} className="flex justify-between items-center group bg-black/30 p-1.5 rounded border border-yellow-500/10">
                            <span 
                              onClick={() => handleToggleTask(t.id)}
                              className={`cursor-pointer line-clamp-2 pr-1 ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}
                            >
                              {t.text}
                            </span>
                            <button onClick={() => handleDeleteTask(t.id)} className="text-zinc-500 hover:text-yellow-400 flex-shrink-0">
                              <Icon icon="lucide:trash-2" className="size-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Q4: Eliminate */}
                    <div className="p-3 bg-zinc-800/20 border border-zinc-700/20 rounded-lg h-[160px] overflow-y-auto">
                      <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-2">ELIMINATE</h4>
                      <ul className="space-y-1 text-xs">
                        {findYouTasks.filter(t => t.quadrant === 'eliminate').map(t => (
                          <li key={t.id} className="flex justify-between items-center group bg-black/30 p-1.5 rounded border border-zinc-700/10">
                            <span 
                              onClick={() => handleToggleTask(t.id)}
                              className={`cursor-pointer line-clamp-2 pr-1 ${t.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}
                            >
                              {t.text}
                            </span>
                            <button onClick={() => handleDeleteTask(t.id)} className="text-zinc-500 hover:text-white flex-shrink-0">
                              <Icon icon="lucide:trash-2" className="size-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Playwright Console */}
                  <div className="p-5 bg-neutral-900/60 rounded-xl border border-zinc-800">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-zinc-300 font-bold text-sm flex items-center gap-2">
                        <Icon icon="lucide:terminal" className="text-cyan-400 size-4" />
                        PLAYWRIGHT TASK AGENT
                      </h3>
                      <button
                        onClick={handleRunFindYouCrawler}
                        disabled={findYouLogsRunning}
                        className="px-3 py-1 rounded bg-cyan-500 disabled:bg-cyan-800 text-black text-[10px] font-bold uppercase transition"
                      >
                        {findYouLogsRunning ? 'Crawling...' : 'Run Crawler'}
                      </button>
                    </div>

                    <div className="h-[140px] bg-black rounded-lg p-3 border border-zinc-800 font-mono text-[10px] overflow-y-auto text-zinc-300 space-y-1 scrollbar-thin">
                      {findYouLogs.length === 0 ? (
                        <div className="text-zinc-600 italic">Terminal ready. Click 'Run Crawler' to start sandbox crawler simulation...</div>
                      ) : (
                        findYouLogs.map((log, idx) => (
                          <div key={idx} className={log.includes("complete") || log.includes("successfully") ? "text-emerald-400" : "text-zinc-300"}>
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Light Years Interactive Canvas Game */}
            {activeProject === 'lightyears' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Game Canvas Container */}
                <div className="lg:col-span-2 flex flex-col items-center">
                  <div className="relative border-4 border-zinc-800 rounded-xl overflow-hidden bg-[#09090b]">
                    <canvas
                      ref={canvasRef}
                      width={440}
                      height={370}
                      className="cursor-crosshair w-full max-w-[440px]"
                    />
                    
                    {/* Game UI tip overlays */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/75 p-2 rounded-lg border border-zinc-800 text-[10px] text-zinc-400 text-center pointer-events-none">
                      Drag mouse to slide fighter ship. <strong className="text-red-400">Click to shoot</strong>. Destroy incoming asteroids!
                    </div>
                  </div>
                </div>

                {/* Visual Memory Pool & Physics Debug Overlay */}
                <div className="lg:col-span-1 p-5 bg-neutral-900/60 rounded-xl border border-zinc-800 space-y-5">
                  <h3 className="text-zinc-200 font-bold text-sm flex items-center gap-2 border-b border-zinc-800 pb-3">
                    <Icon icon="lucide:activity" className="text-red-500 size-4 animate-pulse" />
                    C++ MEMORY POOLING RUNTIME
                  </h3>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/60 p-3 rounded-lg border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1">FPS Core</div>
                      <div className="text-2xl font-mono font-extrabold text-red-500">{debugFps}</div>
                    </div>
                    <div className="bg-black/60 p-3 rounded-lg border border-zinc-800 text-center">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Target Timestep</div>
                      <div className="text-2xl font-mono font-extrabold text-white">16.6ms</div>
                    </div>
                  </div>

                  {/* Object Pool Debug display */}
                  <div className="bg-black/40 p-4 rounded-lg border border-zinc-800 space-y-3 font-mono">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Memory pool size:</span>
                      <span className="text-white font-bold">{debugPoolSize} pre-allocated</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Active Bullets in scene:</span>
                      <span className="text-red-400 font-bold">{debugPoolActive}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-zinc-400">Cached Bullets (Idle):</span>
                      <span className="text-zinc-500 font-bold">{debugPoolSize - debugPoolActive}</span>
                    </div>

                    {/* Bullet array visual grid */}
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] text-zinc-400 uppercase font-bold">Bullet Heap Buffer Map</div>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: debugPoolSize }).map((_, i) => (
                          <div
                            key={i}
                            className={`size-5 rounded border flex items-center justify-center text-[9px] font-bold transition-all ${
                              i < debugPoolActive 
                                ? 'bg-red-950/80 border-red-500 text-red-400 shadow-md shadow-red-500/10' 
                                : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                            }`}
                          >
                            B{i}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Physics visualizer configuration */}
                  <div className="p-3 bg-black/20 rounded-lg border border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                      <Icon icon="lucide:square-dashed" className="text-zinc-400 size-4" />
                      Show Bounding Boxes
                    </span>
                    <input
                      type="checkbox"
                      checked={debugShowBoundingBox}
                      onChange={(e) => setDebugShowBoundingBox(e.target.checked)}
                      className="size-4 rounded accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* captainsolo.ca interactive theme demo */}
            {activeProject === 'captainsolo' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Style Details */}
                  <div className="p-5 bg-neutral-900/60 rounded-xl border border-zinc-800">
                    <h3 className="text-zinc-200 font-bold text-sm mb-4 flex items-center gap-2">
                      <Icon icon="lucide:palette" className="text-purple-400 size-4" />
                      DESIGN SYSTEM TOKENS
                    </h3>
                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <div className="text-zinc-400 text-[10px] uppercase font-bold mb-1">Color Palette (Curated HSL)</div>
                        <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-black">
                          <div className="p-2 rounded bg-cyan-500">Cyan #06b6d4</div>
                          <div className="p-2 rounded bg-emerald-500">Emerald #10b981</div>
                          <div className="p-2 rounded bg-purple-500 text-white">Purple #a855f7</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-zinc-400 text-[10px] uppercase font-bold mb-1">Site Optimization parameters</div>
                        <div className="bg-black/60 p-3 rounded-lg border border-zinc-800 space-y-1.5 text-zinc-300">
                          <div className="flex justify-between">
                            <span>Tailwind version:</span>
                            <span className="text-white">v4.1.13</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Image asset compression:</span>
                            <span className="text-white">WebP Format</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Code bundling tool:</span>
                            <span className="text-white">Vite Bundler</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Hosting:</span>
                            <span className="text-white">Netlify Live Deploy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEO & Meta-tag Validator */}
                  <div className="p-5 bg-neutral-900/60 rounded-xl border border-zinc-800">
                    <h3 className="text-zinc-200 font-bold text-sm mb-4 flex items-center gap-2">
                      <Icon icon="lucide:search" className="text-purple-400 size-4" />
                      SEO VALIDATOR & ACCESSIBILITY (AODA)
                    </h3>
                    <div className="space-y-3 text-xs">
                      <div className="bg-black/60 p-3 rounded-lg border border-zinc-800 font-mono space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Icon icon="lucide:check" className="size-4 flex-shrink-0" />
                          <span>Title Tag: Solomon Olufelo - Developer</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Icon icon="lucide:check" className="size-4 flex-shrink-0" />
                          <span>Meta Description configured correctly</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Icon icon="lucide:check" className="size-4 flex-shrink-0" />
                          <span>AODA Compliance checks passed</span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">
                        To maintain high performance and readability (following WCAG 2.1 levels), 
                        we leverage serverless routing hooks and semantic HTML5 headings throughout the portfolio code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUB TAB: SYSTEM ARCHITECTURE */}
        {activeSubTab === 'architecture' && (
          <div className="space-y-6">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Icon icon="lucide:diagram" className="size-5" />
              Process Mapping & System Integration
            </h3>
            
            {activeProject === 'findyou' && <FindYouArchitecture />}
            {activeProject === 'lightyears' && <LightYearsArchitecture />}
            {activeProject === 'captainsolo' && (
              <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-xl flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-3 text-xs md:text-sm text-zinc-300">
                  <h4 className="font-bold text-white text-base">Static Page Compilation & Client Engine</h4>
                  <p>
                    The portfolio platform compiles modular components on load, referencing static constants databases 
                    and binding them with localized performance-oriented event listeners.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>Vite builds assets into static production index chunks.</li>
                    <li>GSAP bindings hook directly into component render cycles for performance.</li>
                    <li>Global state theme models load directly on context threads.</li>
                  </ul>
                </div>
                <div className="flex-1 w-full p-4 bg-neutral-900 rounded-lg border border-purple-500/20 text-center font-mono text-xs text-purple-400">
                  Vite Bundler &lt;--&gt; React 19 &lt;--&gt; GSAP Scroll &lt;--&gt; Client viewport
                </div>
              </div>
            )}

            <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/80">
              <p className="text-zinc-400 text-xs leading-relaxed">
                <strong>Architectural Note:</strong> Systems are engineered utilizing modularity rules to isolate credential vaults from scrapers. This makes them highly maintainable, secure against token injection, and fully reproducible inside local containers.
              </p>
            </div>
          </div>
        )}

        {/* SUB TAB: CODE SHOWCASE */}
        {activeSubTab === 'code' && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Icon icon="lucide:code-2" className="size-5 text-zinc-400" />
              Annotated Technical Code Snippet
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-zinc-800">
              <div className="absolute top-2 right-2 bg-zinc-800 text-zinc-400 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                {activeProject === 'findyou' ? 'Python' : activeProject === 'lightyears' ? 'C++' : 'Javascript'}
              </div>
              <pre className="p-5 bg-zinc-950 overflow-x-auto text-[11px] font-mono text-zinc-300 leading-relaxed scrollbar-thin">
                <code>
                  {activeProject === 'findyou' ? snippets.findyou :
                   activeProject === 'lightyears' ? snippets.lightyears :
                   snippets.captainsolo}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsDemoDashboard;
