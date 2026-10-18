/**
 * VIVEK SHUKLA — FAANG-GRADE PORTFOLIO CORE ENGINE
 * Interactive Architecture:
 * 1. Web Audio API Haptic Sound Synthesizer (Zero External Audio Dependencies)
 * 2. Linear / Raycast Style Interactive Command Palette (Ctrl+K / ⌘K)
 * 3. Interactive Developer Terminal CLI (Mini Unix-like Environment)
 * 4. Flagship Project Architecture Deep-Dive Modal System
 * 5. Algorithmic Mastery & DSA Progress Bar Telemetry
 * 6. High-Contrast Obsidian / Light Theme Switcher with Persistence
 * 7. Dynamic Role Typing Engine
 * 8. Category Project Filtering & Cursor Spotlight Trackers
 * 9. ScrollSpy, Sticky Navbar & Reading Progress Indicator
 * 10. Contact Form AJAX (Formspree) & Clipboard Utility
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 1. WEB AUDIO API SYNTHESIZER (ZERO ASSET HAPTIC SOUND ENGINE)
    // =========================================================================
    let audioCtx = null;
    let soundEnabled = localStorage.getItem("portfolio-sound") === "true";
    const soundToggle = document.getElementById("soundToggle");

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playTone(freq, type, duration, gainValue = 0.05, rampDown = true) {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            gain.gain.setValueAtTime(gainValue, ctx.currentTime);
            if (rampDown) {
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
            }

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            // Audio context silently fails if restricted
        }
    }

    function playClickSound() {
        playTone(900, "sine", 0.035, 0.04);
    }

    function playTabSound() {
        playTone(560, "triangle", 0.045, 0.04);
    }

    function playChimeSound() {
        if (!soundEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
            notes.forEach((freq, idx) => {
                setTimeout(() => {
                    playTone(freq, "sine", 0.18, 0.03);
                }, idx * 60);
            });
        } catch (e) {}
    }

    function playErrorSound() {
        playTone(180, "sawtooth", 0.09, 0.05);
    }

    function updateSoundUI() {
        if (!soundToggle) return;
        const icon = soundToggle.querySelector(".sound-icon");
        if (soundEnabled) {
            if (icon) icon.textContent = "🔊";
            soundToggle.setAttribute("title", "UI Sound Effects (Enabled)");
            soundToggle.setAttribute("aria-label", "Disable UI Sound Effects");
        } else {
            if (icon) icon.textContent = "🔇";
            soundToggle.setAttribute("title", "UI Sound Effects (Muted)");
            soundToggle.setAttribute("aria-label", "Enable UI Sound Effects");
        }
    }

    function toggleSound() {
        soundEnabled = !soundEnabled;
        localStorage.setItem("portfolio-sound", soundEnabled ? "true" : "false");
        updateSoundUI();
        if (soundEnabled) {
            getAudioContext();
            playChimeSound();
            showToast("🔊 UI Sound Effects Enabled");
        } else {
            showToast("🔇 UI Sound Effects Muted");
        }
    }

    if (soundToggle) {
        soundToggle.addEventListener("click", toggleSound);
        updateSoundUI();
    }


    // =========================================================================
    // 2. THEME SWITCHER (Dark / Light Mode)
    // =========================================================================
    const themeToggle = document.getElementById("themeToggle");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme, animateChime = false) {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#f8fafc");
        } else {
            document.body.classList.remove("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#07090e");
        }
        if (animateChime) {
            playChimeSound();
        }
    }

    const storedTheme = localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
    applyTheme(initialTheme);

    function toggleTheme() {
        const isLight = document.body.classList.contains("light-mode");
        const nextTheme = isLight ? "dark" : "light";
        applyTheme(nextTheme, true);
        localStorage.setItem("portfolio-theme", nextTheme);
        showToast(`🌓 Switched to ${nextTheme === "light" ? "Light" : "Dark"} Mode`);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    if (!storedTheme && window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
            if (localStorage.getItem("portfolio-theme")) return;
            applyTheme(e.matches ? "light" : "dark");
        });
    }


    // =========================================================================
    // 3. TOAST NOTIFICATION & CLIPBOARD UTILITIES
    // =========================================================================
    const toast = document.createElement("div");
    toast.className = "toast-notice";
    document.body.appendChild(toast);
    let toastTimeout = null;

    function showToast(message) {
        if (toastTimeout) clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add("show");
        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    const emailToCopy = "vivek25tech@gmail.com";
    const phoneToCopy = "+91 8840243403";

    function copyEmail() {
        playClickSound();
        navigator.clipboard.writeText(emailToCopy).then(() => {
            showToast("✓ Copied email: vivek25tech@gmail.com");
        }).catch(() => {
            showToast(emailToCopy);
        });
    }

    function copyPhone() {
        playClickSound();
        navigator.clipboard.writeText(phoneToCopy).then(() => {
            showToast("✓ Copied phone: +91 8840243403");
        }).catch(() => {
            showToast(phoneToCopy);
        });
    }

    const copyBtnHero = document.getElementById("copyEmailHero");
    const copyBtnContact = document.getElementById("copyEmailContact");
    if (copyBtnHero) copyBtnHero.addEventListener("click", copyEmail);
    if (copyBtnContact) copyBtnContact.addEventListener("click", copyEmail);

    const ROLE_RESUMES = {
        sde: {
            file: "FAANG_SDE.pdf",
            downloadName: "Vivek_Shukla_SDE_Resume.pdf",
            title: "FAANG SDE / Full-Stack Resume"
        },
        aiml: {
            file: "AI_ML-RESUME.pdf",
            downloadName: "Vivek_Shukla_AI_ML_Resume.pdf",
            title: "AI & Machine Learning Resume"
        },
        analyst: {
            file: "ANALYST_RESUME.pdf",
            downloadName: "Vivek_Shukla_Data_Analyst_Resume.pdf",
            title: "Data & Quantitative Analyst Resume"
        },
        bdc: {
            file: "Resume_BDC.pdf",
            downloadName: "Vivek_Shukla_Business_Dev_Resume.pdf",
            title: "Business Development Resume"
        }
    };

    function downloadRoleResume(roleKey) {
        const item = ROLE_RESUMES[roleKey] || ROLE_RESUMES.sde;
        playClickSound();
        const link = document.createElement("a");
        link.href = item.file;
        link.download = item.downloadName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`📄 Downloading ${item.title}...`);
        const count = parseInt(localStorage.getItem(`resumeCount_${roleKey}`) || "0", 10) + 1;
        localStorage.setItem(`resumeCount_${roleKey}`, count);
    }

    function openResumeModal() {
        playChimeSound();
        const modal = document.getElementById("resumeHubModal");
        if (modal) {
            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        }
    }

    function closeResumeModal() {
        const modal = document.getElementById("resumeHubModal");
        if (modal) {
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
    }

    function downloadResume(role = null) {
        if (role && ROLE_RESUMES[role]) {
            downloadRoleResume(role);
        } else {
            openResumeModal();
        }
    }


    // =========================================================================
    // 4. FLAGSHIP PROJECT ARCHITECTURE DEEP DIVE MODAL
    // =========================================================================
    const projectDetailModal = document.getElementById("projectDetailModal");
    const detailContent = document.getElementById("detailContent");
    const detailCloseBtn = document.getElementById("detailCloseBtn");

    const ARCHITECTURE_DATA = {
        "ai-support": {
            title: "🛡️ AI Customer Support & Automated Refund Agent",
            badge: "🤖 Autonomous AI Agent",
            status: "Open Source Containerized System",
            metrics: [
                { label: "Policy Compliance", value: "100% Deterministic" },
                { label: "Decision Latency", value: "< 420 ms" },
                { label: "Live Telemetry", value: "Server-Sent Events" }
            ],
            pipeline: `[Customer Chat Request]
       │
       ▼
[Identity Verification & Session Auth]
       │
       ▼
[CRM SQLite Database Order Lookup]
       │
       ▼
[LangGraph Deterministic StateGraph Flow]
  ├── Order Age ≤ 30 Days? ──────► (Yes)
  ├── Return Reason Valid? ──────► (Yes)
  └── Refund Amount ≤ Cap? ──────► (Yes)
       │
       ├─► [Policy Approved] ──► [Automated Refund Transaction]
       └─► [Policy Violation] ─► [Escalate with Human Audit Trail]
       │
       ▼
[Live SSE Stream to Admin Reasoning Dashboard]`,
            decisions: [
                "<strong>Deterministic Policy Enforcement Gate:</strong> LLMs are strictly segregated from financial transaction execution. An algorithmic state machine evaluates verified refund constraints before approving chargebacks, guaranteeing 0% hallucinated refunds.",
                "<strong>Real-Time Reasoning Stream (SSE):</strong> Admin control tower streams step-by-step LLM internal thought-traces live using Server-Sent Events, providing complete auditability without polling overhead.",
                "<strong>LangGraph Stateful Graph Workflow:</strong> Orchestrates conditional agent branching between verification, order diagnosis, refund processing, and escalation workflows with persistent session checkpoints in SQLite.",
                "<strong>Isolated Containerization:</strong> Fully Dockerized deployment separating frontend React dashboards, FastAPI orchestration runtime, and background state stores."
            ],
            stack: ["LangGraph", "FastAPI", "Python", "React", "Server-Sent Events (SSE)", "Docker", "SQLite", "Pydantic"],
            github: "https://github.com/VivekShukla-2504/AI-Customer-Support-Agent",
            demo: null
        },
        "insurance": {
            title: "📈 Insurance Risk & Actuarial Premium Analytics",
            badge: "📊 FinTech & Actuarial Math",
            status: "Production Actuarial Engine",
            metrics: [
                { label: "Calculation Engine", value: "Pure NumPy / Pandas" },
                { label: "Interactive KPIs", value: "8 Real-Time Metrics" },
                { label: "Analytics Charts", value: "10 Dynamic Views" }
            ],
            pipeline: `[Policyholder Risk Portfolio CSV / API Data]
                     │
                     ▼
       [FastAPI Actuarial Compute Core]
  ├── Claim Frequency λ = Total Claims / Total Exposure
  ├── Claim Severity μ = Total Losses / Total Claims
  ├── Pure Premium P_pure = Frequency × Severity
  ├── Bühlmann Credibility Weighting Z = N / (N + K)
  └── Multi-Factor Stress Testing & Loss Ratio Simulation
                     │
                     ▼
    [Optimized JSON Payload Transmission]
                     │
                     ▼
[React 19 Interactive Recharts Visualizer & Scenario Sandbox]`,
            decisions: [
                "<strong>Vectorized Actuarial Engine:</strong> Built with NumPy and Pandas in FastAPI to compute pure premiums, credibility loss ratios, and Monte Carlo multi-scenario stress tests in sub-10ms response cycles.",
                "<strong>Credibility-Weighted Rating (Bühlmann):</strong> Blends cohort empirical loss experience with broad portfolio baselines using Bühlmann credibility factors to prevent rate instability in low-volume segments.",
                "<strong>Interactive Sensitivity Sandbox:</strong> Enables underwriters to simulate catastrophic loss shocks, inflation multipliers, and frequency fluctuations in real-time with instant graphical feedback via Recharts."
            ],
            stack: ["FastAPI", "Pandas", "NumPy", "React 19", "Tailwind CSS", "Recharts", "Actuarial Science"],
            github: "https://github.com/VivekShukla-2504/Risk-and-Premium-Analysis",
            demo: "https://risk-and-premium-analysis.vercel.app/"
        },
        "gen-ai": {
            title: "💡 Gen-AI Technical Interview Evaluation Platform",
            badge: "🤖 Generative AI System",
            status: "Live Production Platform",
            metrics: [
                { label: "Core LLM", value: "Google Gemini 2.5 Flash" },
                { label: "Evaluation Rubric", value: "Real-Time Multi-Metric" },
                { label: "Auth & Security", value: "JWT + Bcrypt" }
            ],
            pipeline: `[Candidate Selects Domain: DSA / System Design / Full-Stack]
                     │
                     ▼
   [Express Orchestrator Generates Dynamic Rubric Prompts]
                     │
                     ▼
 [Google Gemini 2.5 Flash Synthesizes Adaptive Technical Questions]
                     │
                     ▼
  [Candidate Submits Verbal / Written Answer via React UI]
                     │
                     ▼
[Gemini Evaluates Answer: Correctness, Depth, Edge Cases, Big-O]
                     │
                     ▼
 [Automated Performance Scoring, Structured Feedback & PDF Generation]`,
            decisions: [
                "<strong>Structured Output Enforcement:</strong> Leveraged Gemini 2.5 Flash with strict JSON schema response guidelines to guarantee parseable scoring metrics (Technical Accuracy, Communication, Complexity Analysis).",
                "<strong>Resilient Stateful Sessions:</strong> Stored real-time interview progressions and transcript checkpoints in MongoDB to prevent session loss upon network disconnection.",
                "<strong>Vite + SCSS Performance:</strong> Sub-second client bootstrap with optimized modular SCSS component architecture and client-side PDF export."
            ],
            stack: ["React (Vite)", "Node.js", "Express", "MongoDB", "Google Gemini 2.5 Flash", "JWT", "SCSS"],
            github: "https://github.com/VivekShukla-2504/Gen-AI",
            demo: "https://gen-ai-theta-roan.vercel.app/"
        },
        "transitops": {
            title: "🚛 TransitOps – Smart Fleet & Logistics Operations",
            badge: "⚡ Full-Stack Operations Platform",
            status: "Enterprise Fleet SaaS",
            metrics: [
                { label: "Workflow States", value: "Draft ➔ Dispatched ➔ Done" },
                { label: "Vehicle Status", value: "Active / In-Shop / OOO" },
                { label: "Security", value: "Role-Based Access Control" }
            ],
            pipeline: `[Logistics Manager] ──► [Dispatches Trip & Allocates Driver/Vehicle]
                              │
                              ▼
[State Machine Transition: Vehicle Marked 'In-Transit' | Driver Locked]
                              │
                              ▼
  [Trip Telemetry: Route Milestones, Odometer, Fuel & Expense Logs]
                              │
                              ▼
  [Maintenance Triggers: Scheduled Service / Fault Flag ➔ 'In-Shop']
                              │
                              ▼
  [License & Inspection Expiry Daemon: Real-Time Alerts via Mailer]
                              │
                              ▼
        [Operational Financial Analytics Dashboard on Recharts]`,
            decisions: [
                "<strong>Strict State Machine Architecture:</strong> Enforced trip lifecycle transitions preventing invalid state changes (e.g. an 'In Shop' or expired vehicle cannot be assigned to active dispatches).",
                "<strong>Role-Based Access Control (RBAC):</strong> Granular operational authorization separating Fleet Managers, Drivers, Safety Auditors, and Maintenance Technicians.",
                "<strong>Predictive Maintenance Alerts:</strong> Automated inspection date trackers notify fleet controllers before safety compliance lapses occur."
            ],
            stack: ["React 19", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Recharts", "JWT"],
            github: "https://github.com/VivekShukla-2504/Transit-Deploy-",
            demo: "https://transit-deploy-liart.vercel.app/"
        },
        "research-ai": {
            title: "📚 ResearchPaper AI – arXiv Literature Discovery",
            badge: "🤖 NLP & Scientific Recommender",
            status: "Live Scientific Search Engine",
            metrics: [
                { label: "Corpus Size", value: "41,120+ Research Papers" },
                { label: "Feature Matrix", value: "150,000 TF-IDF Features" },
                { label: "Query Retrieval", value: "Sublinear Cosine Scoring" }
            ],
            pipeline: `[41,120+ Scientific arXiv Abstracts Dataset]
                     │
                     ▼
 [Offline Vectorization: TfidfVectorizer (Max 150,000 Sparse Features)]
                     │
                     ▼
  [High-Efficiency Memory-Mapped Sparse Matrix on Fast Disk / RAM]
                     │
                     ▼
   [User Submits Scientific Query / Selects Seed Research Paper]
                     │
                     ▼
    [FastAPI Computes Cosine Similarity on Sparse Coordinate Space]
                     │
                     ▼
  [Top-K Ranked Scientific Recommendations Returned with Metadata]`,
            decisions: [
                "<strong>Sublinear Sparse Matrix Cosine Retrieval:</strong> Pre-vectorized 41,120 arXiv abstracts using Scipy sparse CSR matrices, achieving instant sub-100ms similarity lookups without heavy GPU requirements.",
                "<strong>Dual Mode Exploration:</strong> Supports both freeform semantic keyword exploration and seed-paper recommendations for deep literature reviews.",
                "<strong>Decoupled Microservice:</strong> Clean separation between high-performance Python FastAPI computation backend and modern React presentation frontend."
            ],
            stack: ["FastAPI", "Python", "Scikit-Learn", "TF-IDF", "Cosine Similarity", "React", "MongoDB"],
            github: "https://github.com/VivekShukla-2504/ResearchAI-",
            demo: "https://research-ai-opal-two.vercel.app/"
        },
        "certchain": {
            title: "🔒 CertChain – Cryptographic Credential Verification",
            badge: "⛓️ Web3 & Blockchain Security",
            status: "Live Sepolia Smart Contract",
            metrics: [
                { label: "Consensus Layer", value: "Ethereum (EVM / Sepolia)" },
                { label: "Tamper Proofing", value: "SHA-256 Hash Anchoring" },
                { label: "Decentralized Storage", value: "IPFS Backup Network" }
            ],
            pipeline: `[University / Issuer Generates Verified Academic Certificate]
                           │
                           ▼
[SHA-256 Cryptographic Hash Computed & Signed by Institution Key]
                           │
                           ▼
 [Solidity Smart Contract Records Hash & Issuer Identity On-Chain]
                           │
                           ▼
[Certificate Metadata & Encrypted Asset Archived to IPFS Network]
                           │
                           ▼
[Public Verification Portal: Scan QR Code / Upload PDF ➔ Instant Trust]`,
            decisions: [
                "<strong>Immutable On-Chain Proof of Existence:</strong> Cryptographic SHA-256 fingerprint anchored directly on the Ethereum blockchain, making diploma forgery mathematically impossible.",
                "<strong>Gas-Optimized Smart Contract:</strong> Minimized storage footprint by committing hashes and timestamps rather than raw document binaries.",
                "<strong>Instant Zero-Friction Verification:</strong> One-click public verification via certificate hash or QR code scan without requiring a crypto wallet for verifiers."
            ],
            stack: ["Solidity", "Hardhat", "Ethers.js", "React", "Node.js", "IPFS", "AES-256"],
            github: "https://github.com/VivekShukla-2504/CERTCHAIN",
            demo: "https://certchain-puce.vercel.app/"
        }
    };

    function openArchitectureModal(projectId) {
        const data = ARCHITECTURE_DATA[projectId];
        if (!data || !projectDetailModal || !detailContent) return;

        playChimeSound();

        const metricsHTML = data.metrics.map(m => `
            <div style="background: var(--card-bg); border: 1px solid var(--card-border); padding: 10px 14px; border-radius: var(--radius-sm); text-align: center;">
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${m.label}</div>
                <div style="font-size: 14px; color: var(--accent1); font-weight: 700; font-family: var(--font-mono); margin-top: 2px;">${m.value}</div>
            </div>
        `).join("");

        const decisionsHTML = data.decisions.map(d => `<li>${d}</li>`).join("");

        const stackHTML = data.stack.map(s => `<span class="tag-item" style="font-size: 11px;">${s}</span>`).join("");

        const demoButtonHTML = data.demo ? `
            <a href="${data.demo}" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;">
                <span>🚀 Launch Live Demo</span>
            </a>
        ` : "";

        detailContent.innerHTML = `
            <div style="margin-bottom: 18px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
                    <span class="domain-tag tag-ai">${data.badge}</span>
                    <span class="status-indicator-badge status-live">${data.status}</span>
                </div>
                <h3 style="font-size: 22px; font-weight: 800; color: var(--text);">${data.title}</h3>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin: 16px 0 20px;">
                ${metricsHTML}
            </div>

            <div style="margin: 20px 0 8px;">
                <h4 style="font-size: 14px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.05em;">System Architecture Pipeline</h4>
                <div class="arch-flow-box">${data.pipeline}</div>
            </div>

            <div style="margin: 20px 0;">
                <h4 style="font-size: 14px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Key Engineering Decisions &amp; Trade-Offs</h4>
                <ul class="arch-highlights-list">
                    ${decisionsHTML}
                </ul>
            </div>

            <div style="margin: 20px 0;">
                <h4 style="font-size: 13px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Production Tech Stack</h4>
                <div class="project-tags">${stackHTML}</div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px; margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--card-border); flex-wrap: wrap;">
                ${demoButtonHTML}
                <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="padding: 8px 16px; font-size: 13px;">
                    <span>🔗 GitHub Repository</span>
                </a>
            </div>
        `;

        projectDetailModal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeArchitectureModal() {
        if (!projectDetailModal) return;
        projectDetailModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (detailCloseBtn) {
        detailCloseBtn.addEventListener("click", closeArchitectureModal);
    }

    if (projectDetailModal) {
        projectDetailModal.addEventListener("click", (e) => {
            if (e.target === projectDetailModal) {
                closeArchitectureModal();
            }
        });
    }

    // Attach click listeners to all .btn-arch buttons
    document.querySelectorAll(".btn-arch").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute("data-project-id");
            if (projectId) {
                openArchitectureModal(projectId);
            }
        });
    });

    // =========================================================================
    // 4B. MULTI-ROLE RESUME HUB MODAL LISTENERS
    // =========================================================================
    const resumeHubModal = document.getElementById("resumeHubModal");
    const resumeModalCloseBtn = document.getElementById("resumeModalCloseBtn");
    const navResumeBtn = document.getElementById("navResumeBtn");
    const resumeBtn = document.getElementById("resumeBtn");
    const openResumeModalFromNav = document.getElementById("openResumeModalFromNav");

    if (resumeModalCloseBtn) {
        resumeModalCloseBtn.addEventListener("click", closeResumeModal);
    }

    if (resumeHubModal) {
        resumeHubModal.addEventListener("click", (e) => {
            if (e.target === resumeHubModal) {
                closeResumeModal();
            }
        });
    }

    if (navResumeBtn) {
        navResumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (resumeBtn) {
        resumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }

    if (openResumeModalFromNav) {
        openResumeModalFromNav.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    }


    // =========================================================================
    // 5. INTERACTIVE COMMAND PALETTE (Ctrl+K / ⌘K)
    // =========================================================================
    const cmdKModal = document.getElementById("cmdKModal");
    const cmdKInput = document.getElementById("cmdKInput");
    const cmdKList = document.getElementById("cmdKList");
    const cmdKTrigger = document.getElementById("cmdKTrigger");

    const COMMAND_ITEMS = [
        // Navigation
        { id: "nav-home", title: "Home — Introduction & Highlights", group: "Navigation", icon: "🏠", badge: "Jump", action: () => scrollToSection("#home") },
        { id: "nav-about", title: "About — Background, Education & Mindset", group: "Navigation", icon: "👤", badge: "Jump", action: () => scrollToSection("#about") },
        { id: "nav-skills", title: "Skills — Full-Stack, AI, Databases & Cloud", group: "Navigation", icon: "⚡", badge: "Jump", action: () => scrollToSection("#skills") },
        { id: "nav-projects", title: "Projects — 14 Categorized Engineering Systems", group: "Navigation", icon: "🚀", badge: "Jump", action: () => scrollToSection("#projects") },
        { id: "nav-experience", title: "Experience — JNU Full-Stack Trainee", group: "Navigation", icon: "💼", badge: "Jump", action: () => scrollToSection("#experience") },
        { id: "nav-education", title: "Education — MCA @ JNU & B.Sc. @ ECC", group: "Navigation", icon: "🎓", badge: "Jump", action: () => scrollToSection("#education") },
        { id: "nav-coding", title: "Coding Profiles & FAANG DSA Mastery (Java)", group: "Navigation", icon: "🧩", badge: "Jump", action: () => scrollToSection("#coding") },
        { id: "nav-contact", title: "Contact — Send a Direct In-App Message", group: "Navigation", icon: "📫", badge: "Jump", action: () => scrollToSection("#contact") },

        // Interactive Tools & Actions
        { id: "tool-terminal", title: "Open Developer CLI Terminal", group: "Interactive Tools", icon: "💻", badge: "CLI", action: () => openTerminal() },
        { id: "tool-theme", title: "Toggle Dark / Light Theme", group: "Interactive Tools", icon: "🌓", badge: "Theme", action: () => toggleTheme() },
        { id: "tool-sound", title: "Toggle UI Haptic Sound Effects", group: "Interactive Tools", icon: "🔊", badge: "Haptics", action: () => toggleSound() },
        { id: "tool-resume-hub", title: "Targeted Resumes Hub — View All 4 Specialized Roles", group: "Targeted Resumes", icon: "📄", badge: "Hub", action: () => openResumeModal() },
        { id: "tool-resume-sde", title: "Download SDE Resume (FAANG & Systems)", group: "Targeted Resumes", icon: "💻", badge: "PDF", action: () => downloadRoleResume("sde") },
        { id: "tool-resume-aiml", title: "Download AI/ML Resume (LangGraph & Agents)", group: "Targeted Resumes", icon: "🤖", badge: "PDF", action: () => downloadRoleResume("aiml") },
        { id: "tool-resume-analyst", title: "Download Data Analyst Resume (Risk & Actuarial)", group: "Targeted Resumes", icon: "📊", badge: "PDF", action: () => downloadRoleResume("analyst") },
        { id: "tool-resume-bdc", title: "Download Business Dev Resume (Strategy & Growth)", group: "Targeted Resumes", icon: "💼", badge: "PDF", action: () => downloadRoleResume("bdc") },
        { id: "tool-email", title: "Copy Email: vivek25tech@gmail.com", group: "Interactive Tools", icon: "📋", badge: "Clipboard", action: () => copyEmail() },
        { id: "tool-phone", title: "Copy Phone: +91 8840243403", group: "Interactive Tools", icon: "📞", badge: "Clipboard", action: () => copyPhone() },

        // Architecture Deep Dives
        { id: "arch-ai-support", title: "Architecture: AI Customer Support Agent (LangGraph)", group: "Architecture Deep Dives", icon: "🛡️", badge: "Deep Dive", action: () => openArchitectureModal("ai-support") },
        { id: "arch-insurance", title: "Architecture: Insurance Risk & Actuarial Platform", group: "Architecture Deep Dives", icon: "📈", badge: "Deep Dive", action: () => openArchitectureModal("insurance") },
        { id: "arch-gen-ai", title: "Architecture: Gen-AI Evaluation Platform (Gemini 2.5)", group: "Architecture Deep Dives", icon: "💡", badge: "Deep Dive", action: () => openArchitectureModal("gen-ai") },
        { id: "arch-transitops", title: "Architecture: TransitOps Fleet Platform (React 19)", group: "Architecture Deep Dives", icon: "🚛", badge: "Deep Dive", action: () => openArchitectureModal("transitops") },
        { id: "arch-research-ai", title: "Architecture: ResearchPaper AI (41k arXiv TF-IDF)", group: "Architecture Deep Dives", icon: "📚", badge: "Deep Dive", action: () => openArchitectureModal("research-ai") },
        { id: "arch-certchain", title: "Architecture: CertChain Blockchain Verification (Solidity)", group: "Architecture Deep Dives", icon: "🔒", badge: "Deep Dive", action: () => openArchitectureModal("certchain") },

        // Profiles & External Links
        { id: "ext-leetcode", title: "LeetCode Profile (@Vivek_Shukla_25 — 400+ Solved)", group: "Profiles & Proof of Work", icon: "🟡", badge: "External", action: () => window.open("https://leetcode.com/u/Vivek_Shukla_25/", "_blank") },
        { id: "ext-github", title: "GitHub Profile (@VivekShukla-2504)", group: "Profiles & Proof of Work", icon: "⚫", badge: "External", action: () => window.open("https://github.com/VivekShukla-2504", "_blank") },
        { id: "ext-linkedin", title: "LinkedIn Profile (Vivek Shukla)", group: "Profiles & Proof of Work", icon: "🔷", badge: "External", action: () => window.open("https://www.linkedin.com/in/vivek-shukla-1a229b27b/", "_blank") },
        { id: "ext-gfg", title: "GeeksforGeeks Profile (@7800652515vivek)", group: "Profiles & Proof of Work", icon: "🟢", badge: "External", action: () => window.open("https://www.geeksforgeeks.org/profile/7800652515vivek/", "_blank") }
    ];

    let selectedCmdIndex = 0;
    let visibleCmdItems = [];

    function renderCommandList(query = "") {
        if (!cmdKList) return;
        const q = query.trim().toLowerCase();

        visibleCmdItems = COMMAND_ITEMS.filter(item => {
            if (!q) return true;
            return (
                item.title.toLowerCase().includes(q) ||
                item.group.toLowerCase().includes(q) ||
                item.badge.toLowerCase().includes(q)
            );
        });

        if (visibleCmdItems.length === 0) {
            cmdKList.innerHTML = `
                <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13.5px;">
                    No commands or projects found matching "<strong style="color: var(--text);">${escapeHTML(query)}</strong>"
                </div>
            `;
            return;
        }

        // Group items
        const groups = {};
        visibleCmdItems.forEach(item => {
            if (!groups[item.group]) groups[item.group] = [];
            groups[item.group].push(item);
        });

        let html = "";
        let runningIndex = 0;

        for (const [groupName, items] of Object.entries(groups)) {
            html += `<div class="cmdk-group-title">${groupName}</div>`;
            items.forEach(item => {
                const isSelected = runningIndex === selectedCmdIndex;
                html += `
                    <div class="cmdk-item ${isSelected ? "selected" : ""}" data-index="${runningIndex}" data-id="${item.id}">
                        <span class="cmdk-item-icon">${item.icon}</span>
                        <span class="cmdk-item-title">${item.title}</span>
                        <span class="cmdk-item-badge">${item.badge}</span>
                    </div>
                `;
                runningIndex++;
            });
        }

        cmdKList.innerHTML = html;

        // Auto scroll selected into view
        const selectedEl = cmdKList.querySelector(".cmdk-item.selected");
        if (selectedEl) {
            selectedEl.scrollIntoView({ block: "nearest" });
        }
    }

    function openCommandPalette() {
        if (!cmdKModal || !cmdKInput) return;
        playTabSound();
        cmdKModal.classList.add("show");
        cmdKInput.value = "";
        selectedCmdIndex = 0;
        renderCommandList("");
        document.body.style.overflow = "hidden";
        setTimeout(() => cmdKInput.focus(), 60);
    }

    function closeCommandPalette() {
        if (!cmdKModal) return;
        cmdKModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function executeSelectedCommand() {
        if (visibleCmdItems.length > 0 && selectedCmdIndex < visibleCmdItems.length) {
            const item = visibleCmdItems[selectedCmdIndex];
            closeCommandPalette();
            item.action();
        }
    }

    if (cmdKTrigger) {
        cmdKTrigger.addEventListener("click", openCommandPalette);
    }

    if (cmdKModal) {
        cmdKModal.addEventListener("click", (e) => {
            if (e.target === cmdKModal) {
                closeCommandPalette();
            }
        });
    }

    if (cmdKInput) {
        cmdKInput.addEventListener("input", (e) => {
            selectedCmdIndex = 0;
            renderCommandList(e.target.value);
        });

        cmdKInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (visibleCmdItems.length > 0) {
                    selectedCmdIndex = (selectedCmdIndex + 1) % visibleCmdItems.length;
                    renderCommandList(cmdKInput.value);
                    playClickSound();
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (visibleCmdItems.length > 0) {
                    selectedCmdIndex = (selectedCmdIndex - 1 + visibleCmdItems.length) % visibleCmdItems.length;
                    renderCommandList(cmdKInput.value);
                    playClickSound();
                }
            } else if (e.key === "Enter") {
                e.preventDefault();
                executeSelectedCommand();
            } else if (e.key === "Escape") {
                e.preventDefault();
                closeCommandPalette();
            }
        });
    }

    if (cmdKList) {
        cmdKList.addEventListener("click", (e) => {
            const itemEl = e.target.closest(".cmdk-item");
            if (itemEl) {
                const idx = parseInt(itemEl.getAttribute("data-index"), 10);
                if (!isNaN(idx) && idx < visibleCmdItems.length) {
                    selectedCmdIndex = idx;
                    executeSelectedCommand();
                }
            }
        });
    }


    // =========================================================================
    // 6. INTERACTIVE DEVELOPER TERMINAL (MINI CLI)
    // =========================================================================
    const toggleTerminalBtn = document.getElementById("toggleTerminalBtn");
    const terminalModal = document.getElementById("terminalModal");
    const termCloseBtn = document.getElementById("termCloseBtn");
    const termForm = document.getElementById("termForm");
    const termInput = document.getElementById("termInput");
    const termBody = document.getElementById("termBody");

    const commandHistory = [];
    let historyPointer = -1;

    function openTerminal() {
        if (!terminalModal || !termInput) return;
        playTabSound();
        terminalModal.classList.add("show");
        document.body.style.overflow = "hidden";
        setTimeout(() => termInput.focus(), 80);
    }

    function closeTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.remove("show");
        document.body.style.overflow = "";
    }

    if (toggleTerminalBtn) {
        toggleTerminalBtn.addEventListener("click", openTerminal);
    }

    if (termCloseBtn) {
        termCloseBtn.addEventListener("click", closeTerminal);
    }

    if (terminalModal) {
        terminalModal.addEventListener("click", (e) => {
            if (e.target === terminalModal) {
                closeTerminal();
            }
        });
    }

    function appendTerminalOutput(content, isCommand = false, isError = false) {
        if (!termBody) return;
        const line = document.createElement("div");
        line.className = "term-line";
        if (isCommand) {
            line.innerHTML = `<span class="term-prompt">vivek@portfolio:~$</span> <strong>${escapeHTML(content)}</strong>`;
        } else if (isError) {
            line.innerHTML = `<span style="color: #ef4444;">${content}</span>`;
        } else {
            line.innerHTML = content;
        }
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function processTerminalCommand(rawCmd) {
        const cmd = rawCmd.trim();
        if (!cmd) return;

        appendTerminalOutput(cmd, true);
        commandHistory.push(cmd);
        historyPointer = commandHistory.length;

        const parts = cmd.split(" ").filter(Boolean);
        const action = parts[0].toLowerCase();
        const arg = parts.slice(1).join(" ").toLowerCase();

        switch (action) {
            case "help":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Available CLI Commands:</strong>
  • <span class="term-hl">whoami</span>        : Overview, current education &amp; engineering role
  • <span class="term-hl">skills</span>        : Categorized tech stack &amp; developer toolbelt
  • <span class="term-hl">projects</span>      : List flagship production &amp; open-source projects
  • <span class="term-hl">arch &lt;name&gt;</span>   : Deep dive into project architecture (e.g. 'arch ai-support')
  • <span class="term-hl">dsa</span>           : Algorithmic ratings &amp; problem-solving metrics (Java)
  • <span class="term-hl">experience</span>    : Industry and trainee experience breakdown
  • <span class="term-hl">education</span>     : Academic degrees (JNU &amp; ECC) &amp; CGPA
  • <span class="term-hl">contact</span>       : Direct communication channels &amp; social profiles
  • <span class="term-hl">theme</span>         : Toggle dark/light display mode ('theme dark' or 'theme light')
  • <span class="term-hl">sound</span>         : Toggle UI audio haptics ('sound on' or 'sound off')
  • <span class="term-hl">resume &lt;role&gt;</span> : Multi-role resume hub (or 'resume sde|aiml|analyst|bdc')
  • <span class="term-hl">sudo hire</span>     : Run executive engineering onboarding sequence
  • <span class="term-hl">clear</span>         : Clear terminal buffer
  • <span class="term-hl">exit</span>          : Close terminal window
                `);
                break;

            case "whoami":
                playClickSound();
                appendTerminalOutput(`
<strong>Vivek Shukla</strong> — Software Development Engineer &amp; AI Builder
• 🎓 MCA Scholar at <strong>Jawaharlal Nehru University (JNU)</strong>, New Delhi [CGPA: 8.78]
• 🚀 15+ Engineering Systems Built across Autonomous AI, Full-Stack MERN, FinTech &amp; Web3
• 🧩 400+ Algorithmic Problems solved in Java across LeetCode &amp; GFG
• 📍 Based in New Delhi, India • Open for SDE &amp; AI Engineering Opportunities
                `);
                break;

            case "skills":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Technical Competencies:</strong>
  • <strong>Languages:</strong> Java (Primary DSA), Python (AI &amp; Backend), JavaScript / TypeScript, SQL, Solidity
  • <strong>Frontend:</strong> React 19, Next.js, Redux Toolkit, Tailwind CSS, SCSS, HTML5/CSS3
  • <strong>Backend:</strong> Node.js, Express.js, FastAPI, REST APIs, WebSockets, Server-Sent Events (SSE)
  • <strong>AI &amp; GenAI:</strong> LangGraph, Google Gemini API, Scikit-learn, TF-IDF Vectorization, Recommenders
  • <strong>Databases &amp; Cloud:</strong> MongoDB, PostgreSQL, SQLite, Redis, Docker, Git/GitHub, AWS (Basics)
                `);
                break;

            case "projects":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Flagship Production Projects:</strong>
  1. <strong>AI Customer Support Agent</strong> — LangGraph autonomous deterministic refund workflow with SSE stream
  2. <strong>Gen-AI Interview Platform</strong> — Multi-topic adaptive evaluation powered by Gemini 2.5 Flash
  3. <strong>Insurance Risk &amp; Actuarial Engine</strong> — Pure NumPy loss-cost &amp; credibility rating platform
  4. <strong>TransitOps Smart Fleet</strong> — Enterprise dispatch state machine &amp; logistics monitoring
  5. <strong>ResearchPaper AI</strong> — 41k arXiv paper recommender over 150k TF-IDF sparse features
  6. <strong>CertChain</strong> — Ethereum smart contract for tamper-proof academic credential verification
<em>Tip: Type <span class="term-hl">'arch ai-support'</span> or <span class="term-hl">'arch insurance'</span> to inspect system blueprints.</em>
                `);
                break;

            case "arch":
            case "deepdive":
                if (!arg) {
                    playErrorSound();
                    appendTerminalOutput("⚠️ Usage: arch &lt;project-key&gt;. Available keys: <span class='term-hl'>ai-support</span>, <span class='term-hl'>insurance</span>, <span class='term-hl'>gen-ai</span>, <span class='term-hl'>transitops</span>, <span class='term-hl'>research-ai</span>, <span class='term-hl'>certchain</span>", false, true);
                } else if (ARCHITECTURE_DATA[arg]) {
                    closeTerminal();
                    openArchitectureModal(arg);
                } else {
                    playErrorSound();
                    appendTerminalOutput(`⚠️ Unknown project key '${escapeHTML(arg)}'. Try: ai-support, insurance, gen-ai, transitops, research-ai, certchain`, false, true);
                }
                break;

            case "dsa":
            case "leetcode":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Algorithmic Telemetry &amp; DSA Mastery:</strong>
  • Total Solved: <strong>400+ problems</strong> in Java
  • LeetCode Rating: <strong>1600+</strong> (@Vivek_Shukla_25)
  • Difficulty Split: Easy (160+) | Medium (210+) | Hard (30+)
  • Core Proficiencies: Trees (95%), Dynamic Programming (90%), Graphs/Topological Sort (88%), Two Pointers (92%)
  • LeetCode: <a href="https://leetcode.com/u/Vivek_Shukla_25/" target="_blank" style="color: var(--accent1); text-decoration: underline;">leetcode.com/u/Vivek_Shukla_25/</a>
                `);
                break;

            case "experience":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Professional Experience:</strong>
  • <strong>Full-Stack Developer Trainee</strong> — Jawaharlal Nehru University (JNU) [08/2024 - 05/2025]
    - Architected and deployed production web portals using React, Node.js, and SQL databases.
    - Optimized relational schema queries, reducing endpoint response latency by 28%.
    - Implemented secure JWT role-based access control and automated data validation pipelines.
                `);
                break;

            case "education":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Academic Pedigree:</strong>
  • <strong>Master of Computer Applications (MCA)</strong> [2024 - 2026]
    Jawaharlal Nehru University (JNU), New Delhi • <strong>CGPA: 8.78 / 10</strong>
  • <strong>Bachelor of Science (B.Sc. in Computer Science)</strong> [2021 - 2024]
    Ewing Christian College (University of Allahabad) • <strong>CGPA: 8.02 / 10</strong>
                `);
                break;

            case "contact":
                playClickSound();
                appendTerminalOutput(`
<strong style="color: var(--accent1);">Direct Contact Channels:</strong>
  • Email: <span class="term-hl">vivek25tech@gmail.com</span>
  • Phone: <span class="term-hl">+91 8840243403</span>
  • GitHub: <a href="https://github.com/VivekShukla-2504" target="_blank" style="color: var(--accent1); text-decoration: underline;">github.com/VivekShukla-2504</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/vivek-shukla-1a229b27b/" target="_blank" style="color: var(--accent1); text-decoration: underline;">linkedin.com/in/vivek-shukla-1a229b27b/</a>
  • Location: New Delhi, India
                `);
                break;

            case "theme":
                if (arg === "light") {
                    applyTheme("light", true);
                    localStorage.setItem("portfolio-theme", "light");
                    appendTerminalOutput("Switched theme to Light mode.");
                } else if (arg === "dark") {
                    applyTheme("dark", true);
                    localStorage.setItem("portfolio-theme", "dark");
                    appendTerminalOutput("Switched theme to Dark mode.");
                } else {
                    toggleTheme();
                    appendTerminalOutput("Toggled display theme.");
                }
                break;

            case "sound":
                if (arg === "on") {
                    soundEnabled = true;
                    localStorage.setItem("portfolio-sound", "true");
                    updateSoundUI();
                    playChimeSound();
                    appendTerminalOutput("🔊 Sound effects enabled.");
                } else if (arg === "off") {
                    soundEnabled = false;
                    localStorage.setItem("portfolio-sound", "false");
                    updateSoundUI();
                    appendTerminalOutput("🔇 Sound effects muted.");
                } else {
                    toggleSound();
                    appendTerminalOutput(`UI Sound is now ${soundEnabled ? "Enabled" : "Muted"}.`);
                }
                break;

            case "resume": {
                const subCmd = (arg || "").toLowerCase();
                if (subCmd === "sde") {
                    downloadRoleResume("sde");
                    appendTerminalOutput("💻 Initiated download for FAANG SDE Resume (FAANG_SDE.pdf).");
                } else if (subCmd === "ai" || subCmd === "aiml" || subCmd === "ml") {
                    downloadRoleResume("aiml");
                    appendTerminalOutput("🤖 Initiated download for AI/ML Resume (AI_ML-RESUME.pdf).");
                } else if (subCmd === "analyst" || subCmd === "data") {
                    downloadRoleResume("analyst");
                    appendTerminalOutput("📊 Initiated download for Data Analyst Resume (ANALYST_RESUME.pdf).");
                } else if (subCmd === "bdc" || subCmd === "business") {
                    downloadRoleResume("bdc");
                    appendTerminalOutput("💼 Initiated download for Business Development Resume (Resume_BDC.pdf).");
                } else {
                    openResumeModal();
                    appendTerminalOutput(`
<div style="background: rgba(0, 212, 255, 0.08); border: 1px solid rgba(0, 212, 255, 0.25); padding: 12px; border-radius: 6px; margin: 8px 0; font-family: var(--font-mono);">
  ✨ <strong style="color: var(--accent1);">Multi-Role Resume Hub Opened in Modal</strong><br>
  Targeted CLI direct downloads:<br>
  &gt; <span class="term-hl">resume sde</span>      : FAANG SDE &amp; Systems Engineer<br>
  &gt; <span class="term-hl">resume aiml</span>     : AI &amp; Machine Learning Engineer<br>
  &gt; <span class="term-hl">resume analyst</span>  : Data &amp; Quantitative Risk Analyst<br>
  &gt; <span class="term-hl">resume bdc</span>      : Business Development &amp; Counseling
</div>
                    `);
                }
                break;
            }

            case "hire":
            case "sudo":
                playChimeSound();
                appendTerminalOutput(`
<div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 12px; border-radius: 6px; margin: 8px 0;">
  ✨ <strong style="color: #10b981;">[SUDO ACCESS GRANTED] Executing Offer Pipeline...</strong><br>
  &gt; Validating Candidate: Vivek Shukla [MCA @ JNU Delhi, CGPA 8.78]... <strong style="color: #10b981;">VERIFIED ✓</strong><br>
  &gt; Algorithmic Competency: 400+ DSA in Java (Trees, DP, Graphs)... <strong style="color: #10b981;">VERIFIED ✓</strong><br>
  &gt; Systems Stack: LangGraph, FastAPI, React 19, Node.js, Web3... <strong style="color: #10b981;">VERIFIED ✓</strong><br>
  🎉 <strong>OFFER ACCEPTED!</strong> Let's build mission-critical products together.<br>
  Email: <a href="mailto:vivek25tech@gmail.com" style="color: #10b981; text-decoration: underline;">vivek25tech@gmail.com</a> | Phone: +91 8840243403
</div>
                `);
                break;

            case "clear":
                playClickSound();
                termBody.innerHTML = "";
                break;

            case "exit":
            case "quit":
                playClickSound();
                closeTerminal();
                break;

            default:
                playErrorSound();
                appendTerminalOutput(`bash: command not found: <span style="color: #ef4444;">${escapeHTML(action)}</span>. Type <span class="term-hl">'help'</span> for a list of valid commands.`, false, true);
                break;
        }
    }

    if (termForm) {
        termForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val = termInput.value;
            termInput.value = "";
            processTerminalCommand(val);
        });
    }

    if (termInput) {
        termInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                if (commandHistory.length > 0 && historyPointer > 0) {
                    historyPointer--;
                    termInput.value = commandHistory[historyPointer];
                }
            } else if (e.key === "ArrowDown") {
                if (historyPointer < commandHistory.length - 1) {
                    historyPointer++;
                    termInput.value = commandHistory[historyPointer];
                } else {
                    historyPointer = commandHistory.length;
                    termInput.value = "";
                }
            }
        });
    }


    // =========================================================================
    // 7. GLOBAL SHORTCUTS (Ctrl+K, Esc, '/')
    // =========================================================================
    document.addEventListener("keydown", (e) => {
        // Toggle Command Palette on Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            if (cmdKModal && cmdKModal.classList.contains("show")) {
                closeCommandPalette();
            } else {
                openCommandPalette();
            }
            return;
        }

        // Quick Slash / shortcut to open command palette if not typing in form
        if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
            e.preventDefault();
            openCommandPalette();
            return;
        }

        // Escape closes any open modal
        if (e.key === "Escape") {
            if (cmdKModal && cmdKModal.classList.contains("show")) {
                closeCommandPalette();
            }
            if (terminalModal && terminalModal.classList.contains("show")) {
                closeTerminal();
            }
            if (projectDetailModal && projectDetailModal.classList.contains("show")) {
                closeArchitectureModal();
            }
            if (resumeHubModal && resumeHubModal.classList.contains("show")) {
                closeResumeModal();
            }
        }
    });


    // =========================================================================
    // 8. DYNAMIC TYPING ANIMATION
    // =========================================================================
    const roles = [
        "Full-Stack Software Engineer",
        "Autonomous AI Agent Builder (LangGraph)",
        "FastAPI & React 19 Architect",
        "Java DSA Specialist (400+ Solved)",
        "FinTech & Actuarial Platform Engineer",
        "Web3 & Smart Contract Developer",
        "MCA Scholar @ JNU New Delhi"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector(".typing");

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex++);
            if (charIndex > currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 320);
                return;
            }
        }

        setTimeout(typeEffect, isDeleting ? 30 : 65);
    }

    typeEffect();


    // =========================================================================
    // 9. PROJECT CATEGORY FILTERING & SOUND TRIGGER
    // =========================================================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            playTabSound();
            const filter = btn.getAttribute("data-filter");

            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.classList.remove("is-hidden");
                } else {
                    card.classList.add("is-hidden");
                }
            });
        });
    });


    // =========================================================================
    // 10. CURSOR SPOTLIGHT TRACKER (FAANG / LINEAR EFFECT)
    // =========================================================================
    const spotlightCards = document.querySelectorAll(
        ".bento-card, .skill-card, .project-card, .achievement-card, .timeline-card, .coding-card, .certificate-card, .contact-info-card, .contact-form-card, .dsa-mastery-card"
    );

    spotlightCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });


    // =========================================================================
    // 11. DSA TOPIC & METRIC PROGRESS BARS ANIMATION
    // =========================================================================
    const dsaCard = document.querySelector(".dsa-mastery-card");
    if (dsaCard && "IntersectionObserver" in window) {
        let dsaAnimated = false;
        const dsaObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !dsaAnimated) {
                    dsaAnimated = true;
                    // Trigger visual pop
                    dsaCard.style.boxShadow = "var(--shadow-lg), var(--shadow-glow)";
                    obs.disconnect();
                }
            });
        }, { threshold: 0.2 });
        dsaObserver.observe(dsaCard);
    }


    // =========================================================================
    // 12. STICKY HEADER & READING PROGRESS BAR
    // =========================================================================
    const siteHeader = document.getElementById("siteHeader");
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    document.body.prepend(progressBar);

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (siteHeader) {
            if (scrollY > 30) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        }

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }, { passive: true });


    // =========================================================================
    // 13. ACTIVE SCROLLSPY NAVIGATION
    // =========================================================================
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    function updateActiveNav() {
        const scrollPos = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    function scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (target) {
            playClickSound();
            target.scrollIntoView({ behavior: "smooth" });
        }
    }


    // =========================================================================
    // 14. MOBILE NAVIGATION DRAWER
    // =========================================================================
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");

    function closeMobileMenu() {
        if (!navToggle || !navLinks || !navOverlay) return;
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
        navOverlay.classList.remove("show");
        navToggle.setAttribute("aria-expanded", "false");
    }

    function openMobileMenu() {
        if (!navToggle || !navLinks || !navOverlay) return;
        playTabSound();
        navToggle.classList.add("open");
        navLinks.classList.add("open");
        navOverlay.classList.add("show");
        navToggle.setAttribute("aria-expanded", "true");
    }

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("open");
            isOpen ? closeMobileMenu() : openMobileMenu();
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", closeMobileMenu);
    }

    navItems.forEach(item => {
        item.addEventListener("click", closeMobileMenu);
    });


    // =========================================================================
    // 15. STAT COUNTERS ANIMATION
    // =========================================================================
    const counters = document.querySelectorAll(".counter");
    let countersAnimated = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const duration = 1400;
            const stepTime = 25;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }

    if ("IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    runCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector(".stats-strip");
        if (statsSection) statsObserver.observe(statsSection);
    } else {
        runCounters();
    }


    // =========================================================================
    // 16. BACK TO TOP BUTTON
    // =========================================================================
    const topBtn = document.createElement("button");
    topBtn.id = "topBtn";
    topBtn.innerHTML = "↑";
    topBtn.setAttribute("aria-label", "Back to top");
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    }, { passive: true });

    topBtn.addEventListener("click", () => {
        playClickSound();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // =========================================================================
    // 17. CONTACT FORM AJAX HANDLER (Formspree)
    // =========================================================================
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            playClickSound();

            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalLabel = submitBtn ? submitBtn.innerHTML : "";

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "<span>⏳ Sending message...</span>";
            }

            if (formStatus) {
                formStatus.textContent = "";
                formStatus.style.color = "var(--text-muted)";
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    playChimeSound();
                    if (formStatus) {
                        formStatus.textContent = "✅ Thank you! Vivek has received your message and will reply shortly.";
                        formStatus.style.color = "var(--accent-emerald)";
                    }
                    contactForm.reset();
                    showToast("✅ Message sent successfully!");
                } else {
                    playErrorSound();
                    if (formStatus) {
                        formStatus.textContent = "⚠️ Delivery error. Please email directly at vivek25tech@gmail.com";
                        formStatus.style.color = "#ef4444";
                    }
                }
            } catch (err) {
                playErrorSound();
                if (formStatus) {
                    formStatus.textContent = "⚠️ Network issue. Please email vivek25tech@gmail.com directly.";
                    formStatus.style.color = "#ef4444";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalLabel;
                }
            }
        });
    }


    // =========================================================================
    // 18. DYNAMIC CURRENT YEAR & RESUME TELEMETRY
    // =========================================================================
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    const resumeTelemetryBtns = [document.getElementById("resumeBtn"), document.getElementById("navResumeBtn")];
    resumeTelemetryBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener("click", () => {
            const count = parseInt(localStorage.getItem("resumeHubOpenCount") || "0", 10) + 1;
            localStorage.setItem("resumeHubOpenCount", count);
        });
    });


    // =========================================================================
    // 19. UTILITY HELPERS
    // =========================================================================
    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

});
