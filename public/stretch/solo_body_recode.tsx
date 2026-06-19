import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SoloBodyRecode = () => {
  const [currentPhase, setCurrentPhase] = useState(0);

  // Exercise illustration components
  const AnkleDorsiflexion = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Mat */}
      <rect x="20" y="140" width="160" height="8" fill="#94a3b8" rx="2"/>
      {/* Leg */}
      <line x1="100" y1="140" x2="100" y2="80" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
      {/* Foot */}
      <ellipse cx="100" cy="145" rx="8" ry="6" fill="#475569"/>
      <path d="M 92 145 L 70 155 L 72 160 L 94 150 Z" fill="#475569"/>
      {/* Resistance band */}
      <path d="M 70 155 Q 60 130 65 100" stroke="#06b6d4" strokeWidth="3" fill="none" strokeDasharray="5,3"/>
      <circle cx="65" cy="100" r="4" fill="#06b6d4"/>
      {/* Arrow showing movement */}
      <path d="M 75 145 L 85 135" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
      {/* Body simplified */}
      <circle cx="100" cy="60" r="15" fill="#e2e8f0"/>
      <line x1="100" y1="75" x2="100" y2="80" stroke="#334155" strokeWidth="8"/>
    </svg>
  );

  const GluteBridge = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Mat */}
      <rect x="20" y="140" width="160" height="8" fill="#94a3b8" rx="2"/>
      {/* Body on mat - lying position */}
      {/* Head */}
      <circle cx="50" cy="125" r="12" fill="#e2e8f0"/>
      {/* Torso lifted */}
      <path d="M 62 125 Q 100 85 138 125" stroke="#334155" strokeWidth="14" fill="none" strokeLinecap="round"/>
      {/* Legs bent */}
      <path d="M 138 125 L 145 140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <path d="M 100 90 L 95 140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      {/* Feet flat */}
      <ellipse cx="145" cy="143" rx="8" ry="5" fill="#475569"/>
      <ellipse cx="95" cy="143" rx="8" ry="5" fill="#475569"/>
      {/* Upward arrow showing lift */}
      <path d="M 100 110 L 100 95" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
      <defs>
        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
      {/* Core engagement indicator */}
      <circle cx="100" cy="100" r="8" fill="#06b6d4" opacity="0.3"/>
    </svg>
  );

  const WallBreathing = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Wall */}
      <rect x="140" y="0" width="60" height="200" fill="#cbd5e1"/>
      {/* Mat */}
      <rect x="20" y="140" width="120" height="8" fill="#94a3b8" rx="2"/>
      {/* Body lying down */}
      <circle cx="80" cy="125" r="12" fill="#e2e8f0"/>
      <line x1="92" y1="125" x2="130" y2="125" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
      {/* Legs up on wall - 90 degree angle */}
      <line x1="130" y1="125" x2="140" y2="125" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <line x1="140" y1="125" x2="140" y2="60" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <line x1="130" y1="125" x2="138" y2="125" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <line x1="138" y1="125" x2="138" y2="65" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      {/* Hands on ribs */}
      <ellipse cx="110" cy="120" rx="6" ry="10" fill="#475569"/>
      <ellipse cx="110" cy="130" rx="6" ry="10" fill="#475569"/>
      {/* Breathing indicator - expanding ribs */}
      <circle cx="110" cy="125" r="15" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.5"/>
      <circle cx="110" cy="125" r="20" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.3" strokeDasharray="3,3"/>
    </svg>
  );

  const ChinTuck = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Standing figure */}
      {/* Head */}
      <circle cx="100" cy="50" r="15" fill="#e2e8f0"/>
      {/* Neck - showing retraction */}
      <line x1="100" y1="65" x2="100" y2="80" stroke="#334155" strokeWidth="6" strokeLinecap="round"/>
      {/* Torso */}
      <rect x="85" y="80" width="30" height="45" fill="#334155" rx="8"/>
      {/* Arms overhead */}
      <line x1="85" y1="85" x2="60" y2="40" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      <line x1="115" y1="85" x2="140" y2="40" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      {/* Hands */}
      <circle cx="60" cy="35" r="5" fill="#475569"/>
      <circle cx="140" cy="35" r="5" fill="#475569"/>
      {/* Legs */}
      <line x1="92" y1="125" x2="92" y2="165" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      <line x1="108" y1="125" x2="108" y2="165" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      {/* Arrow showing chin retraction */}
      <path d="M 115 50 L 125 50" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
      <defs>
        <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
      {/* Posture alignment line */}
      <line x1="100" y1="50" x2="100" y2="165" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4,4" opacity="0.5"/>
    </svg>
  );

  const ScapularPushup = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Parallettes */}
      <rect x="60" y="130" width="8" height="40" fill="#64748b" rx="2"/>
      <rect x="132" y="130" width="8" height="40" fill="#64748b" rx="2"/>
      <rect x="50" y="125" width="28" height="6" fill="#64748b" rx="3"/>
      <rect x="122" y="125" width="28" height="6" fill="#64748b" rx="3"/>
      {/* Body in plank position */}
      {/* Hands on parallettes */}
      <ellipse cx="64" cy="125" rx="6" ry="4" fill="#475569"/>
      <ellipse cx="136" cy="125" rx="6" ry="4" fill="#475569"/>
      {/* Arms */}
      <line x1="64" y1="125" x2="75" y2="110" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      <line x1="136" y1="125" x2="125" y2="110" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      {/* Torso - straight line */}
      <line x1="75" y1="110" x2="125" y2="110" stroke="#334155" strokeWidth="14" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="100" cy="95" r="12" fill="#e2e8f0"/>
      {/* Legs */}
      <line x1="100" y1="110" x2="100" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      {/* Scapular movement indicator */}
      <circle cx="85" cy="108" r="8" fill="#06b6d4" opacity="0.3"/>
      <circle cx="115" cy="108" r="8" fill="#06b6d4" opacity="0.3"/>
      {/* Arrows showing protraction/retraction */}
      <path d="M 85 108 L 75 108" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
      <path d="M 115 108 L 125 108" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead4)"/>
      <defs>
        <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
    </svg>
  );

  const FacePulls = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Anchor point */}
      <circle cx="180" cy="100" r="8" fill="#64748b"/>
      {/* Resistance band */}
      <path d="M 180 100 Q 140 95 100 100" stroke="#06b6d4" strokeWidth="4" fill="none"/>
      <path d="M 180 100 Q 140 105 100 100" stroke="#06b6d4" strokeWidth="4" fill="none"/>
      {/* Standing figure */}
      <circle cx="60" cy="70" r="12" fill="#e2e8f0"/>
      <rect x="50" y="82" width="20" height="35" fill="#334155" rx="6"/>
      {/* Arms pulling band */}
      <line x1="50" y1="95" x2="85" y2="95" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      <line x1="70" y1="95" x2="95" y2="105" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      {/* Hands gripping band */}
      <circle cx="95" cy="95" r="5" fill="#475569"/>
      <circle cx="95" cy="105" r="5" fill="#475569"/>
      {/* Legs */}
      <line x1="55" y1="117" x2="55" y2="160" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      <line x1="65" y1="117" x2="65" y2="160" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      {/* Scapular retraction indicator */}
      <circle cx="48" cy="92" r="6" fill="#14b8a6" opacity="0.4"/>
      {/* Pull direction arrow */}
      <path d="M 110 100 L 90 100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead5)"/>
      <defs>
        <marker id="arrowhead5" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
    </svg>
  );

  const ScapularPullup = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Pull-up bar */}
      <rect x="60" y="30" width="80" height="6" fill="#64748b" rx="3"/>
      {/* Wall/door frame */}
      <rect x="50" y="20" width="6" height="180" fill="#cbd5e1"/>
      <rect x="144" y="20" width="6" height="180" fill="#cbd5e1"/>
      {/* Hanging figure */}
      <circle cx="100" cy="65" r="12" fill="#e2e8f0"/>
      {/* Arms hanging */}
      <line x1="80" y1="36" x2="92" y2="55" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      <line x1="120" y1="36" x2="108" y2="55" stroke="#334155" strokeWidth="8" strokeLinecap="round"/>
      {/* Hands on bar */}
      <circle cx="80" cy="33" r="5" fill="#475569"/>
      <circle cx="120" cy="33" r="5" fill="#475569"/>
      {/* Torso */}
      <rect x="90" y="77" width="20" height="35" fill="#334155" rx="6"/>
      {/* Legs */}
      <line x1="95" y1="112" x2="95" y2="150" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      <line x1="105" y1="112" x2="105" y2="150" stroke="#334155" strokeWidth="9" strokeLinecap="round"/>
      {/* Scapular depression indicator */}
      <circle cx="92" cy="55" r="6" fill="#06b6d4" opacity="0.4"/>
      <circle cx="108" cy="55" r="6" fill="#06b6d4" opacity="0.4"/>
      {/* Small upward movement arrow */}
      <path d="M 100 120 L 100 115" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead6)"/>
      <defs>
        <marker id="arrowhead6" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
    </svg>
  );

  const BulgarianSplitSquat = () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Elevated surface (bench) */}
      <rect x="130" y="120" width="50" height="12" fill="#64748b" rx="2"/>
      <rect x="135" y="132" width="6" height="30" fill="#64748b"/>
      <rect x="169" y="132" width="6" height="30" fill="#64748b"/>
      {/* Standing figure - split squat position */}
      <circle cx="80" cy="60" r="12" fill="#e2e8f0"/>
      {/* Torso upright */}
      <rect x="70" y="72" width="20" height="35" fill="#334155" rx="6"/>
      {/* Front leg bent */}
      <line x1="75" y1="107" x2="70" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <line x1="70" y1="140" x2="65" y2="165" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      {/* Front foot */}
      <ellipse cx="65" cy="168" rx="8" ry="5" fill="#475569"/>
      {/* Rear leg elevated */}
      <line x1="85" y1="107" x2="110" y2="120" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      <line x1="110" y1="120" x2="145" y2="120" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
      {/* Rear foot on bench */}
      <ellipse cx="145" cy="120" rx="6" ry="4" fill="#475569"/>
      {/* Knee tracking line */}
      <line x1="70" y1="140" x2="65" y2="165" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" opacity="0.6"/>
      {/* Down arrow showing movement */}
      <path d="M 80 90 L 80 100" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead7)"/>
      <defs>
        <marker id="arrowhead7" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#14b8a6"/>
        </marker>
      </defs>
    </svg>
  );

  const exercises = [
    {
      phase: 0,
      items: [
        { name: "Ankle Dorsiflexion", illustration: AnkleDorsiflexion, description: "Seated model flexing ankle toward shin with resistance band", sets: "2-3 sets", reps: "10-15 reps", cue: "ALIGN" },
        { name: "Glute Bridge with Posterior Pelvic Tilt", illustration: GluteBridge, description: "Lying on mat, hips lifted, core tight", sets: "2-3 sets", reps: "10-15 reps", cue: "BREATHE" },
        { name: "90/90 Wall Breathing", illustration: WallBreathing, description: "Feet on wall, hands on ribs, deep inhaling", sets: "2-3 sets", reps: "10-15 reps", cue: "RESET" },
        { name: "Chin Tuck with Overhead Reach", illustration: ChinTuck, description: "Retracting chin while raising arms overhead", sets: "2-3 sets", reps: "10-15 reps", cue: "ALIGN" }
      ]
    },
    {
      phase: 1,
      items: [
        { name: "Scapular Push-ups on Parallettes", illustration: ScapularPushup, description: "Elbows locked, shoulder blades protracting/retracting", sets: "3 sets", reps: "8-12 reps", cue: "CORE ENGAGED" },
        { name: "Band External Rotations / Face Pulls", illustration: FacePulls, description: "Resistance band at chest height, elbows aligned", sets: "3 sets", reps: "8-12 reps", cue: "SHOULDERS BACK" },
        { name: "Scapular Pull-ups", illustration: ScapularPullup, description: "Hanging from pull-up bar, small scapular depression", sets: "3 sets", reps: "8-12 reps", cue: "CONTROL EVERY REP" },
        { name: "Bulgarian Split Squats", illustration: BulgarianSplitSquat, description: "Rear foot elevated, front knee tracking over ankle", sets: "3 sets", reps: "8-12 reps", cue: "SHOULDERS BACK" }
      ]
    },
    {
      phase: 2,
      items: [
        { name: "Active Hang + Scapular Pull-up Flow", illustration: ScapularPullup, description: "Hanging with controlled movement", sets: "2-4 sets", reps: "6-10 reps", cue: "FLOW" },
        { name: "Parallette L-sit → Tuck Hold", illustration: ScapularPushup, description: "Progression shown in two stages", sets: "2-4 sets", reps: "6-10 reps per side", cue: "CONTROL" },
        { name: "Wall Angels with Glute Engagement", illustration: ChinTuck, description: "Back flat on wall, arms sliding overhead", sets: "2-4 sets", reps: "6-10 reps per side", cue: "INTEGRATE" },
        { name: "Cossack Squats", illustration: BulgarianSplitSquat, description: "Deep side lunge, opposite leg extended, chest upright", sets: "2-4 sets", reps: "6-10 reps per side", cue: "FLOW" }
      ]
    }
  ];

  const phases = [
    {
      id: 0,
      title: "PHASE 1: RESET",
      subtitle: "Realign posture from the ground up",
      goal: "Mobility, stability, and alignment from ankles to neck",
      color: "bg-gradient-to-br from-cyan-50 to-slate-50",
      accentColor: "text-cyan-600",
      borderColor: "border-cyan-400"
    },
    {
      id: 1,
      title: "PHASE 2: STRENGTHEN",
      subtitle: "Build control, power, and posture",
      goal: "Reinforce core, posterior chain, and shoulder stability",
      color: "bg-gradient-to-br from-slate-50 to-zinc-50",
      accentColor: "text-slate-700",
      borderColor: "border-slate-400"
    },
    {
      id: 2,
      title: "PHASE 3: INTEGRATE",
      subtitle: "Link the chain — movement meets control",
      goal: "Synchronize breath, posture, and movement for functional flow",
      color: "bg-gradient-to-br from-cyan-50 via-slate-50 to-zinc-50",
      accentColor: "text-cyan-700",
      borderColor: "border-cyan-500"
    },
    {
      id: 3,
      title: "BODY MAP & DAILY RECODE ROUTINE",
      subtitle: "Solo Body Recode — Your Full-Body System",
      goal: "A visual summary connecting all phases with complete integration",
      color: "bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-100",
      accentColor: "text-slate-800",
      borderColor: "border-slate-500"
    }
  ];

  const nextPhase = () => {
    setCurrentPhase((prev) => (prev + 1) % phases.length);
  };

  const prevPhase = () => {
    setCurrentPhase((prev) => (prev - 1 + phases.length) % phases.length);
  };

  const currentData = phases[currentPhase];
  const currentExercises = exercises[currentPhase]?.items || [];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b-4 border-slate-800 pb-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            SOLO BODY RECODE
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Rebuild. Recode. Rise — Your Complete Body System
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevPhase}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <div className="flex gap-2">
            {phases.map((phase, idx) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentPhase ? 'bg-cyan-600 w-8' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextPhase}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className={`${currentData.color} rounded-2xl p-8 shadow-lg border-2 ${currentData.borderColor} min-h-[600px]`}>
          {/* Phase Header */}
          <div className="mb-8">
            <h2 className={`text-4xl font-bold ${currentData.accentColor} mb-2`}>
              {currentData.title}
            </h2>
            <p className="text-2xl text-slate-700 font-medium mb-2">
              {currentData.subtitle}
            </p>
            <p className="text-slate-600 text-lg">
              <span className="font-semibold">Goal:</span> {currentData.goal}
            </p>
          </div>

          {/* Content based on phase */}
          {currentPhase < 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentExercises.map((exercise, idx) => {
                const IllustrationComponent = exercise.illustration;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-800 flex-1">
                        {exercise.name}
                      </h3>
                      <span className={`${currentData.accentColor} font-bold text-sm px-3 py-1 bg-cyan-100 rounded-full whitespace-nowrap ml-2`}>
                        {exercise.cue}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-4 text-sm">
                      {exercise.description}
                    </p>
                    
                    <div className="flex gap-4 text-sm mb-4">
                      <div className="bg-slate-100 px-3 py-2 rounded-lg">
                        <span className="font-semibold text-slate-700">{exercise.sets}</span>
                      </div>
                      <div className="bg-slate-100 px-3 py-2 rounded-lg">
                        <span className="font-semibold text-slate-700">{exercise.reps}</span>
                      </div>
                    </div>
                    
                    {/* 2D Coded Illustration */}
                    <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center border border-slate-300 p-4">
                      <IllustrationComponent />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Body Map Summary View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Body Map */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                  Full-Body System Map
                </h3>
                
                <div className="relative h-96 bg-gradient-to-b from-slate-50 to-slate-100 rounded-lg border-2 border-slate-300 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 200 400" className="w-full h-full p-4">
                    {/* Body outline */}
                    <circle cx="100" cy="40" r="20" fill="#e2e8f0" stroke="#334155" strokeWidth="2"/>
                    <line x1="100" y1="60" x2="100" y2="100" stroke="#334155" strokeWidth="12" strokeLinecap="round"/>
                    <rect x="75" y="100" width="50" height="80" fill="#334155" rx="10"/>
                    <line x1="75" y1="120" x2="40" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
                    <line x1="125" y1="120" x2="160" y2="140" stroke="#334155" strokeWidth="10" strokeLinecap="round"/>
                    <line x1="85" y1="180" x2="85" y2="280" stroke="#334155" strokeWidth="11" strokeLinecap="round"/>
                    <line x1="115" y1="180" x2="115" y2="280" stroke="#334155" strokeWidth="11" strokeLinecap="round"/>
                    
                    {/* Energy flow arrows */}
                    <path d="M 100 320 L 100 300" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                    <path d="M 100 280 L 100 240" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#flow1)"/>
                    <path d="M 100 220 L 100 180" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                    <path d="M 100 160 L 100 120" stroke="#14b8a6" strokeWidth="3" markerEnd="url(#flow1)"/>
                    <path d="M 100 100 L 100 70" stroke="#06b6d4" strokeWidth="3" markerEnd="url(#flow1)"/>
                    
                    {/* Markers */}
                    <defs>
                      <marker id="flow1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                        <circle cx="4" cy="4" r="3" fill="#06b6d4"/>
                      </marker>
                    </defs>
                    
                    {/* Labels */}
                    <text x="130" y="45" fontSize="10" fill="#334155" fontWeight="bold">Scalp & Neck</text>
                    <text x="130" y="140" fontSize="10" fill="#334155" fontWeight="bold">Diaphragm</text>
                    <text x="130" y="200" fontSize="10" fill="#334155" fontWeight="bold">Pelvis</text>
                    <text x="130" y="290" fontSize="10" fill="#334155" fontWeight="bold">Ankles & Feet</text>
                    
                    {/* Muscle group highlights */}
                    <circle cx="100" cy="40" r="12" fill="#06b6d4" opacity="0.2"/>
                    <ellipse cx="100" cy="70" rx="15" ry="8" fill="#14b8a6" opacity="0.2"/>
                    <ellipse cx="100" cy="140" rx="30" ry="20" fill="#06b6d4" opacity="0.2"/>
                    <ellipse cx="100" cy="200" rx="28" ry="15" fill="#14b8a6" opacity="0.2"/>
                    <circle cx="100" cy="290" r="15" fill="#06b6d4" opacity="0.2"/>
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl mb-1">🧘</div>
                    <div className="text-xs font-semibold text-slate-700">Foam Roller</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl mb-1">💆</div>
                    <div className="text-xs font-semibold text-slate-700">Scalp Massage</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-semibold text-slate-700">Peanut Ball</div>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-2xl mb-1">🪢</div>
                    <div className="text-xs font-semibold text-slate-700">Jump Rope</div>
                  </div>
                </div>
              </div>

              {/* Right: Daily Routine Schedule */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">
                  Daily Recode Routine
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="border-l-4 border-cyan-500 pl-4 py-3 bg-cyan-50 rounded-r-lg">
                    <div className="font-bold text-slate-800 mb-1">Reset (Mobility & Posture)</div>
                    <div className="text-sm text-slate-600">10-15 minutes</div>
                  </div>
                  
                  <div className="border-l-4 border-slate-500 pl-4 py-3 bg-slate-50 rounded-r-lg">
                    <div className="font-bold text-slate-800 mb-1">Strengthen (Power & Stability)</div>
                    <div className="text-sm text-slate-600">15-25 minutes</div>
                  </div>
                  
                  <div className="border-l-4 border-cyan-600 pl-4 py-3 bg-cyan-50 rounded-r-lg">
                    <div className="font-bold text-slate-800 mb-1">Integrate (Flow & Function)</div>
                    <div className="text-sm text-slate-600">15-20 minutes</div>
                  </div>
                  
                  <div className="border-l-4 border-slate-400 pl-4 py-3 bg-slate-50 rounded-r-lg">
                    <div className="font-bold text-slate-800 mb-1">Optional Finisher</div>
                    <div className="text-sm text-slate-600">Scalp massage & deep breathing (5 min)</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-gradient-to-r from-cyan-500 to-slate-700 text-white p-6 rounded-xl text-center">
                  <p className="text-2xl font-bold mb-2">
                    "Rebuild. Recode. Rise."
                  </p>
                  <p className="text-sm opacity-90">
                    The Solo Body Recode System
                  </p>
                </div>

                {/* Equipment List */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-3 text-sm">Equipment Needed:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div>• Parallettes</div>
                    <div>• Pull-up Bar</div>
                    <div>• Resistance Bands</div>
                    <div>• Yoga Mat</div>
                    <div>• Foam Roller</div>
                    <div>• Peanut Ball</div>
                    <div>• Jump Rope</div>
                    <div>• Scalp Massager</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Professional Calisthenics & Physiotherapy Manual</p>
          <p className="mt-1">Navigate through phases to explore the complete system</p>
        </div>
      </div>
    </div>
  );
};

export default SoloBodyRecode;