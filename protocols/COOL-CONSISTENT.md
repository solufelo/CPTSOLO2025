# Cool & Consistent — BIOS First, No Windows Mess

Priority: cool room + **steady** frametimes. Not more FPS.

**Do not touch Windows power plans for this.** Core parking, boost disable, and % caps in powercfg cause stutter and inconsistent boost behavior. Sapphire plan stays as-is.

## Applied automatically (2026-06-11)

Run again anytime: `Apply-CaptainSoloThermal.ps1` (Admin)

| What | Setting |
|---|---|
| Power plan | **Sapphire** (reverted from CaptainSolo Cool) |
| GPU power cap | **150W** (4060 Ti minimum; logon task keeps it) |
| Afterburner | Aggressive fan curve 30–75°C, start with Windows |
| Afterburner PL | 85% slider (~140W effective before driver floor) |

**Still manual:** NVIDIA Max Frame Rate → **380**. BIOS → **PBO Disabled**.

If CaptainSolo Cool was applied earlier, revert once:
```
powercfg /setactive 7ad6fd0b-3307-4ad6-b498-609f82bf1a5c
```
GPU default PL restore (if changed): `nvidia-smi -pl 165`

---

## Why BIOS only

| Approach | Heat help | Consistency |
|---|---|---|
| Windows boost off / core parking | Medium | **Bad** — latency spikes, uneven frametimes |
| Windows 90% max processor | Medium | **Bad** — artificial cap fights games |
| **BIOS PBO off + fixed PPT** | High | **Good** — hard power ceiling, predictable clocks |
| **Curve Optimizer negative** | Medium | **Good** if stable (test per core) |
| GPU fan curve / UV (Afterburner) | Medium | **Good** — no OS scheduler involvement |

---

## BIOS settings (ASUS B450 PRIME) — start here

### Step 1: Disable PBO (non-destructive, do this first)

UEFI → Advanced → AMD Overclocking → Precision Boost Overdrive → **Disabled**

This alone stops the 5800X from spiking 140W+ into your room. Clocks stay boost-like within stock limits. No Windows changes needed.

### Step 2: Fixed power envelope (consistent, not stuttery)

Still in AMD Overclocking, set **manual limits** (not Auto PBO):

| Setting | Value | Why |
|---|---|---|
| PPT | **88W** | AMD eco tier. Big heat drop, smooth comp |
| TDC | **60A** | Matches 88W package |
| EDC | **90A** | Prevents spike current |

**Do not start at 50W.** Low PPT makes frequency **dip under load** = 1% low stutters. 88W is the cool-and-consistent sweet spot for 5800X.

### Step 3 (room still hot after 1 week): 65W PPT

| PPT | 65W |
| TDC | 45A |
| EDC | 70A |

Test Valorant/Apex frametime feel before going lower.

### Optional: Curve Optimizer

Negative **15 to 25** per core (test stability with OCCT or game stress).

Same performance at lower voltage = less heat. Does not introduce scheduler stutter if stable.

### Do NOT do (inconsistent / stutter risk)

- Static clock below 3.6GHz unless desperate
- 50W PPT without testing
- Windows PERFBOOSTMODE disabled
- Windows core parking
- Aggressive C-states tweaks in Windows

---

## GPU (hardware tools only, not Windows power plans)

You have MSI Afterburner. Use it, not powercfg.

| Setting | Suggested | Notes |
|---|---|---|
| Fan curve | Aggressive 60%+ from 55C | Moves heat out of case, steadier GPU boost |
| Power limit | **150W** via nvidia-smi (min on 4060 Ti) or 90% AB slider | Cuts peak heat; your log avg was 133W |
| Undervolt | Small stable UV | Only if crash-free 30 min |

NVIDIA Control Panel → Max Frame Rate → **380 FPS** (your panel refresh). Stops rendering 500+ FPS waste heat. Zero stutter impact.

---

## Physical (free heat reduction)

- Exhaust fan blowing toward window/open door
- Dust filter clean
- Side panel: test closed (directed exhaust) vs open (GPU breathe) — one will feel cooler in *room*

---

## Verify (consistency check, not just temps)

After BIOS Step 1+2 only:

1. **Room feel** after 45 min session vs before
2. CPU temp under load: aim under 80C
3. **Frametime consistency** — same feel as before? No new micro-stutter?
4. If stutter appeared → PPT too low or CO too aggressive. Back up to PBO off only, no PPT cap, retest

---

## Priority (your drift)

1. Cool room
2. Consistent frametimes (no new stutter)
3. Windows untouched
4. FPS headroom you already have

`Apply-CoolConsistent.ps1` is **deprecated** for daily use. BIOS path above replaces it.
