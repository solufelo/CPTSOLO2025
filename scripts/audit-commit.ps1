# Daily Audit Commit Helper
# Stages all changes, prompts for daily focus/mood tier, and commits.

# Check if git is initialized
if (!(Test-Path .git)) {
    Write-Host "Error: Git is not initialized in this folder." -ForegroundColor Red
    Exit 1
}

# Check git status
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes detected. Go write some notes or code first!" -ForegroundColor Yellow
    Exit 0
}

Write-Host "=== Daily Audit Commit ===" -ForegroundColor Cyan
Write-Host "Current modifications:"
git status -s

# Prompt for Focus/Mood rating
Write-Host "`nSelect a focus/mood tier for today:" -ForegroundColor Gray
Write-Host "  S: S-Tier Focus (hit all blocks, clean execution)"
Write-Host "  A: Balanced (minor drift, recovered well)"
Write-Host "  B: Low Energy / Slipped (struggled but logged it)"
Write-Host "  Or type a custom brief tag (e.g., Anxious / Recovered)"

$choice = Read-Host "Choice [S/A/B/Custom]"
$tag = ""

switch ($choice.ToUpper()) {
    "S" { $tag = "[S-Tier Focus]" }
    "A" { $tag = "[A-Tier Balanced]" }
    "B" { $tag = "[B-Tier Low Energy]" }
    default { 
        if ([string]::IsNullOrWhiteSpace($choice)) {
            $tag = "[Daily Log]"
        } else {
            $tag = "[$choice]"
        }
    }
}

# Prompt for a brief highlight/lesson
$highlight = Read-Host "One-sentence highlight (optional)"
$commitMsg = $tag
if (![string]::IsNullOrWhiteSpace($highlight)) {
    $commitMsg += " - $highlight"
}

# Stage changes
Write-Host "`nStaging changes..." -ForegroundColor Gray
git add .

# Commit
Write-Host "Committing with message: '$commitMsg'..." -ForegroundColor Gray
git commit -m $commitMsg

Write-Host "`nAudit committed successfully!" -ForegroundColor Green
Write-Host "Push to GitHub using 'git push' to sync." -ForegroundColor Cyan
