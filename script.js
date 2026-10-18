/**
 * VIVEK SHUKLA — FAANG-GRADE PORTFOLIO JAVASCRIPT
 * Interactivity: Category Filtering, Cursor Spotlight, Typing Animation,
 * Smooth Scrollspy, Dark/Light Theme, Contact AJAX, Copy-to-Clipboard.
 */

document.addEventListener("DOMContentLoaded", () => {

    // ================= 1. THEME SWITCHER (Dark / Light Mode) =================
    const themeToggle = document.getElementById("themeToggle");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme) {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<span class="theme-icon">☀️</span>';
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#f8fafc");
        } else {
            document.body.classList.remove("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<span class="theme-icon">🌙</span>';
            if (themeColorMeta) themeColorMeta.setAttribute("content", "#07090e");
        }
    }

    const storedTheme = localStorage.getItem("portfolio-theme");
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-mode");
            const nextTheme = isLight ? "dark" : "light";
            applyTheme(nextTheme);
            localStorage.setItem("portfolio-theme", nextTheme);
        });
    }

    // Keep following system theme if user hasn't made a manual choice
    if (!storedTheme && window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
            if (localStorage.getItem("portfolio-theme")) return;
            applyTheme(e.matches ? "light" : "dark");
        });
    }

    // ================= 2. TYPING ANIMATION =================
    const roles = [
        "MERN Stack Developer",
        "Autonomous AI Engineer (LangGraph)",
        "Full-Stack SDE (FastAPI & React)",
        "Java DSA Specialist (400+ Solved)",
        "Web3 & Blockchain Builder",
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
                setTimeout(typeEffect, 300);
                return;
            }
        }

        setTimeout(typeEffect, isDeleting ? 35 : 75);
    }

    typeEffect();

    // ================= 3. INTERACTIVE PROJECT FILTERING =================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");

            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            // Filter project cards
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

    // ================= 4. CURSOR SPOTLIGHT TRACKER (FAANG / Linear Effect) =================
    const spotlightCards = document.querySelectorAll(
        ".bento-card, .skill-card, .project-card, .achievement-card, .timeline-card, .coding-card, .certificate-card, .contact-info-card, .contact-form-card"
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

    // ================= 5. STICKY HEADER & SCROLL PROGRESS BAR =================
    const siteHeader = document.getElementById("siteHeader");
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    document.body.prepend(progressBar);

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        // Sticky header styling
        if (siteHeader) {
            if (scrollY > 40) {
                siteHeader.classList.add("scrolled");
            } else {
                siteHeader.classList.remove("scrolled");
            }
        }

        // Progress bar width
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }, { passive: true });

    // ================= 6. ACTIVE SCROLLSPY NAVIGATION =================
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    function updateActiveNav() {
        const scrollPos = window.scrollY + 160;

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

    // ================= 7. MOBILE NAVIGATION TOGGLE =================
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

    // ================= 8. STAT COUNTERS ANIMATION =================
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

    // ================= 9. TOAST NOTIFICATION & COPY EMAIL =================
    const toast = document.createElement("div");
    toast.className = "toast-notice";
    document.body.appendChild(toast);

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2600);
    }

    const emailToCopy = "vivek25tech@gmail.com";

    function copyEmail() {
        navigator.clipboard.writeText(emailToCopy).then(() => {
            showToast("✓ Copied email: vivek25tech@gmail.com");
        }).catch(() => {
            showToast("vivek25tech@gmail.com");
        });
    }

    const copyBtnHero = document.getElementById("copyEmailHero");
    const copyBtnContact = document.getElementById("copyEmailContact");

    if (copyBtnHero) copyBtnHero.addEventListener("click", copyEmail);
    if (copyBtnContact) copyBtnContact.addEventListener("click", copyEmail);

    // ================= 10. BACK TO TOP BUTTON =================
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
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ================= 11. CONTACT FORM AJAX HANDLER (Formspree) =================
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

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
                    if (formStatus) {
                        formStatus.textContent = "✅ Thank you, Vivek has received your message and will reply shortly!";
                        formStatus.style.color = "var(--accent-emerald)";
                    }
                    contactForm.reset();
                    showToast("✅ Message sent successfully!");
                } else {
                    if (formStatus) {
                        formStatus.textContent = "⚠️ Delivery error. Please email directly at vivek25tech@gmail.com";
                        formStatus.style.color = "#f43f5e";
                    }
                }
            } catch (err) {
                if (formStatus) {
                    formStatus.textContent = "⚠️ Network issue. Please email vivek25tech@gmail.com directly.";
                    formStatus.style.color = "#f43f5e";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalLabel;
                }
            }
        });
    }

    // ================= 12. DYNAMIC CURRENT YEAR =================
    const currentYearEl = document.getElementById("currentYear");
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // ================= 13. RESUME DOWNLOAD TRACKING =================
    const resumeBtns = [document.getElementById("resumeBtn"), document.getElementById("navResumeBtn")];
    resumeBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener("click", () => {
            const count = parseInt(localStorage.getItem("resumeDownloadCount") || "0", 10) + 1;
            localStorage.setItem("resumeDownloadCount", count);
            console.log(`📄 Resume downloaded: ${count} times on this browser.`);
        });
    });

});
