// Global state management
let jobs = [];
let boxBreathingInterval = null;
let boxBreathingActive = false;

// Checkbox elements list for progress tracking
const checkboxes = [
    'chk-p1-timer', 'chk-p1-floor', 'chk-p1-desk', 'chk-p1-bed',
    'chk-p2-email', 'chk-p2-manager', 'chk-p2-purge', 'chk-p2-pwned',
    'chk-p3-teresa', 'chk-p3-sas',
    'chk-p4-resumes', 'chk-p4-pipe', 'chk-p4-daily'
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Set default date input to today
    const dateInput = document.getElementById('job-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    loadChecklistState();
    loadJobs();
    updateProgress();
});

// Tab Switching logic
function switchTab(tabId) {
    // Deactivate all nav buttons and tabs
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Activate selected button and tab
    const selectedBtn = document.getElementById(`nav-btn-${tabId}`);
    const selectedPane = document.getElementById(`tab-${tabId}`);

    if (selectedBtn) selectedBtn.classList.add('active');
    if (selectedPane) selectedPane.classList.add('active');
}

// Checklist logic
function updateProgress() {
    let checkedCount = 0;
    checkboxes.forEach(id => {
        const chk = document.getElementById(id);
        if (chk && chk.checked) {
            checkedCount++;
        }
    });

    const percent = checkboxes.length > 0 ? Math.round((checkedCount / checkboxes.length) * 100) : 0;
    
    // Update progress bar
    const bar = document.getElementById('overall-progress-bar');
    const text = document.getElementById('overall-progress-percentage');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}%`;

    saveChecklistState();
}

function saveChecklistState() {
    const state = {};
    checkboxes.forEach(id => {
        const chk = document.getElementById(id);
        state[id] = chk ? chk.checked : false;
    });
    localStorage.setItem('captainsolo_checklist_state', JSON.stringify(state));
}

function loadChecklistState() {
    const saved = localStorage.getItem('captainsolo_checklist_state');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            checkboxes.forEach(id => {
                const chk = document.getElementById(id);
                if (chk && state[id] !== undefined) {
                    chk.checked = state[id];
                }
            });
        } catch (e) {
            console.error('Error loading checklist state', e);
        }
    }
}

// Copy Email Template
function copyEmailTemplate() {
    const template = `Subject: Payment Arrangement Request - Student ID: 210729170

Dear Teresa,

I am writing to discuss my outstanding balance of CA$3,483.03 (Student ID: 210729170). 
I want to resolve this debt fully, but I am currently facing financial hardship and am actively looking for employment.

I would like to request a formal payment plan of CA$100 per month starting on [Date] to halt collections progression. 
Once I secure full-time employment, I plan to increase these payments to resolve the balance sooner.

Thank you for your understanding and assistance.

Sincerely,
Solomon Olufelo`;

    navigator.clipboard.writeText(template).then(() => {
        const btn = document.getElementById('btn-copy-email');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.backgroundColor = 'var(--accent-mint)';
            btn.style.color = '#000';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);
        }
    }).catch(err => {
        console.error('Could not copy email template', err);
    });
}

// Box Breathing Module
function startBoxBreathing() {
    const circle = document.getElementById('bb-timer-display');
    const button = document.getElementById('btn-start-breathing');
    
    if (boxBreathingActive) {
        // Stop breathing timer
        clearInterval(boxBreathingInterval);
        boxBreathingActive = false;
        button.textContent = 'Start Box Breath';
        circle.textContent = 'Ready';
        circle.className = 'bb-circle';
        return;
    }

    boxBreathingActive = true;
    button.textContent = 'Stop Timer';
    
    const cycle = [
        { phase: 'Inhale', duration: 4, className: 'bb-circle inhale' },
        { phase: 'Hold', duration: 4, className: 'bb-circle hold' },
        { phase: 'Exhale', duration: 4, className: 'bb-circle exhale' },
        { phase: 'Hold', duration: 4, className: 'bb-circle hold' }
    ];
    
    let currentIdx = 0;
    let secondsLeft = cycle[currentIdx].duration;

    const runStep = () => {
        const current = cycle[currentIdx];
        circle.textContent = `${current.phase} (${secondsLeft}s)`;
        circle.className = current.className;

        secondsLeft--;
        if (secondsLeft < 0) {
            currentIdx = (currentIdx + 1) % cycle.length;
            secondsLeft = cycle[currentIdx].duration;
        }
    };

    runStep();
    boxBreathingInterval = setInterval(runStep, 1000);
}

// Job Application Tracker CRUD
function loadJobs() {
    const saved = localStorage.getItem('captainsolo_jobs_pipeline');
    if (saved) {
        try {
            jobs = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading jobs', e);
            jobs = [];
        }
    } else {
        // Pre-fill with a placeholder target so it looks live
        jobs = [
            { company: 'Grand River Hospital', role: 'Administrative Support Clerk', date: '2026-06-17', status: 'Applied' }
        ];
        saveJobs();
    }
    renderJobs();
}

function saveJobs() {
    localStorage.setItem('captainsolo_jobs_pipeline', JSON.stringify(jobs));
}

function addJob(event) {
    event.preventDefault();
    
    const company = document.getElementById('job-company').value.trim();
    const role = document.getElementById('job-role').value.trim();
    const date = document.getElementById('job-date').value;
    const status = document.getElementById('job-status').value;

    if (!company || !role || !date) return;

    jobs.unshift({ company, role, date, status });
    saveJobs();
    renderJobs();

    // Reset form fields except date
    document.getElementById('job-company').value = '';
    document.getElementById('job-role').value = '';
}

function deleteJob(index) {
    if (confirm('Delete this application record?')) {
        jobs.splice(index, 1);
        saveJobs();
        renderJobs();
    }
}

function updateJobStatus(index, newStatus) {
    jobs[index].status = newStatus;
    saveJobs();
    renderJobs();
}

function getFollowUpDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
}

function getStatusClass(status) {
    switch (status) {
        case 'Applied': return 'status-badge applied';
        case 'Follow-Up Sent': return 'status-badge follow-up';
        case 'Interview Scheduled': return 'status-badge interview';
        case 'Offer Received': return 'status-badge offer';
        case 'Rejected': return 'status-badge rejected';
        default: return 'status-badge';
    }
}

function renderJobs() {
    const tbody = document.getElementById('jobs-list');
    if (!tbody) return;

    if (jobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No applications logged. Start applying to get paid!</td></tr>`;
        return;
    }

    tbody.innerHTML = jobs.map((job, idx) => {
        const followUp = getFollowUpDate(job.date);
        const todayStr = new Date().toISOString().split('T')[0];
        const isFollowUpDue = (todayStr >= followUp) && (job.status === 'Applied');
        const followUpText = isFollowUpDue 
            ? `<span style="color: var(--accent-red); font-weight: 600;">Due ASAP (${followUp})</span>`
            : followUp;

        return `
            <tr id="job-row-${idx}">
                <td><strong>${escapeHTML(job.company)}</strong></td>
                <td>${escapeHTML(job.role)}</td>
                <td>${job.date}</td>
                <td>
                    <select onchange="updateJobStatus(${idx}, this.value)" class="status-select" style="background: transparent; color: inherit; border: none; font-weight: 600;">
                        <option value="Applied" ${job.status === 'Applied' ? 'selected' : ''}>Applied</option>
                        <option value="Follow-Up Sent" ${job.status === 'Follow-Up Sent' ? 'selected' : ''}>Follow-Up Sent</option>
                        <option value="Interview Scheduled" ${job.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                        <option value="Offer Received" ${job.status === 'Offer Received' ? 'selected' : ''}>Offer Received</option>
                        <option value="Rejected" ${job.status === 'Rejected' ? 'selected' : ''}>Rejected / Inactive</option>
                    </select>
                </td>
                <td>${followUpText}</td>
                <td class="actions-cell">
                    <button class="action-btn-sm" style="color: var(--accent-red); border-color: rgba(255, 94, 98, 0.15);" onclick="deleteJob(${idx})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
