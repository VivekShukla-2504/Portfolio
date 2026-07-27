// ================= PRELOADER =================

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// ================= TYPING ANIMATION =================

const texts = [
    "MERN Stack Developer",
    "AI Enthusiast",
    "Full Stack Developer",
    "Java Programmer",
    "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

const typingElement = document.querySelector(".typing");

function typeEffect() {

    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (!deleting) {

        typingElement.innerHTML =
            currentText.substring(0, charIndex++);

        if (charIndex > currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingElement.innerHTML =
            currentText.substring(0, charIndex--);

        if (charIndex < 0) {
            deleting = false;
            textIndex++;

            if (textIndex >= texts.length)
                textIndex = 0;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();


// ================= REVEAL =================

function reveal() {

    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {

        const top = el.getBoundingClientRect().top;
        const visible = 120;

        if (top < window.innerHeight - visible) {
            el.classList.add("active");
        }

    });

}

window.addEventListener("scroll", reveal);
reveal();


// ================= NAVBAR =================

const header = document.querySelector("header");

function getHeaderBg(scrolled) {

    const styles = getComputedStyle(document.body);

    return scrolled
        ? styles.getPropertyValue("--header-bg-scrolled")
        : styles.getPropertyValue("--header-bg");

}

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.background = getHeaderBg(true);

        header.style.backdropFilter = "blur(18px)";

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.25)";

    }

    else {

        header.style.background = getHeaderBg(false);

        header.style.boxShadow = "none";

    }

});


// ================= ACTIVE NAV =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId.length <= 1) return;

        const target = document.querySelector(targetId);

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ================= CONTACT FORM (Formspree — no backend needed) =================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(".form-submit");
        const originalLabel = submitBtn ? submitBtn.innerHTML : "";

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = "Sending...";
        }

        if (formStatus) {
            formStatus.textContent = "";
        }

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {

                if (formStatus) {
                    formStatus.textContent = "✅ Thank you! Your message has been sent.";
                    formStatus.style.color = "#00d4ff";
                }

                contactForm.reset();

            } else {

                if (formStatus) {
                    formStatus.textContent = "⚠️ Something went wrong. Please email me directly at vivek25tech@gmail.com.";
                    formStatus.style.color = "#ff6b6b";
                }

            }

        } catch (err) {

            if (formStatus) {
                formStatus.textContent = "⚠️ Network error. Please email me directly at vivek25tech@gmail.com.";
                formStatus.style.color = "#ff6b6b";
            }

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalLabel;
            }

        }

    });

}


// ================= FOOTER =================

const footerCopy =
    document.querySelector(".footer-copy");

if (footerCopy) {

    footerCopy.innerHTML =
        `© ${new Date().getFullYear()} All Rights Reserved`;

}


// ================= PROFILE IMAGE =================

const profile = document.querySelector(".hero-image img");

if (profile) {

    if (profile.complete) {
        profile.style.opacity = "1";
    } else {
        profile.style.opacity = "0";
        profile.onload = () => {
            profile.style.transition = "opacity 1s ease";
            profile.style.opacity = "1";
        };
    }

}


// ================= PROJECT HOVER =================

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateY =
            (x - rect.width / 2) / 18;

        const rotateX =
            -(y - rect.height / 2) / 18;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});


// ================= SCROLL PROGRESS BAR =================

const progress =
    document.createElement("div");

progress.id = "progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progressHeight =
        (window.scrollY / totalHeight) * 100;

    progress.style.width =
        progressHeight + "%";

});


// ================= BACK TO TOP =================

const topBtn =
    document.createElement("button");

topBtn.innerHTML = "↑";

topBtn.id = "topBtn";

topBtn.setAttribute("aria-label", "Back to top");

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    }

    else {

        topBtn.classList.remove("show");

    }

});

topBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


// ================= HERO BUTTON ANIMATION =================

const buttons =
    document.querySelectorAll(".btn");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform =
            "translateY(-4px) scale(1.05)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform =
            "translateY(0) scale(1)";

    });

});


// ================= DARK / LIGHT MODE TOGGLE =================

const themeToggle = document.getElementById("themeToggle");

// Keep the mobile browser address bar color in sync with the current theme
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-mode");

        if (themeToggle) themeToggle.innerHTML = "☀";

        if (themeColorMeta) themeColorMeta.setAttribute("content", "#f4f6fb");

    } else {

        document.body.classList.remove("light-mode");

        if (themeToggle) themeToggle.innerHTML = "🌙";

        if (themeColorMeta) themeColorMeta.setAttribute("content", "#050816");

    }

    if (header) {

        header.style.background = getHeaderBg(window.scrollY > 60);

    }

}

// First-time visitors: respect their OS/browser preference.
// Returning visitors: always honour whatever they picked manually last time.
const storedTheme = localStorage.getItem("portfolio-theme");

const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

const savedTheme = storedTheme || (prefersLight ? "light" : "dark");

applyTheme(savedTheme);

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const isLight = document.body.classList.contains("light-mode");

        const nextTheme = isLight ? "dark" : "light";

        applyTheme(nextTheme);

        localStorage.setItem("portfolio-theme", nextTheme);

    });

}

// If the visitor never manually chose a theme, keep following the OS setting live
if (!storedTheme && window.matchMedia) {

    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {

        if (localStorage.getItem("portfolio-theme")) return; // user has since made a manual choice

        applyTheme(e.matches ? "light" : "dark");

    });

}


// ================= MOBILE NAV TOGGLE =================

const navToggle = document.getElementById("navToggle");
const navLinksEl = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

function closeMobileNav() {

    if (!navToggle || !navLinksEl || !navOverlay) return;

    navToggle.classList.remove("open");

    navLinksEl.classList.remove("open");

    navOverlay.classList.remove("show");

    navToggle.setAttribute("aria-expanded", "false");

}

function openMobileNav() {

    if (!navToggle || !navLinksEl || !navOverlay) return;

    navToggle.classList.add("open");

    navLinksEl.classList.add("open");

    navOverlay.classList.add("show");

    navToggle.setAttribute("aria-expanded", "true");

}

if (navToggle) {

    navToggle.addEventListener("click", () => {

        const isOpen = navLinksEl.classList.contains("open");

        isOpen ? closeMobileNav() : openMobileNav();

    });

}

if (navOverlay) {

    navOverlay.addEventListener("click", closeMobileNav);

}

navLinks.forEach(link => {

    link.addEventListener("click", closeMobileNav);

});


// ================= HERO STAT COUNTERS =================

const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {

    counters.forEach(counter => {

        const target = +counter.dataset.target;
        const duration = 1200;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        let current = 0;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                counter.innerText = target;

                clearInterval(timer);

            } else {

                counter.innerText = Math.floor(current);

            }

        }, stepTime);

    });

}

function checkCounters() {

    const statsSection = document.querySelector(".stats");

    if (!statsSection || countersStarted) return;

    const top = statsSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {

        countersStarted = true;

        animateCounters();

    }

}

window.addEventListener("scroll", checkCounters);
checkCounters();


// ================= RESUME DOWNLOAD COUNTER (private, for your own tracking) =================
// Stored only in this browser's localStorage — visitors never see it.
// Open the browser console on your own device to check the count anytime:
//   localStorage.getItem('resumeDownloadCount')

const resumeBtn = document.getElementById("resumeBtn");

if (resumeBtn) {

    resumeBtn.addEventListener("click", () => {

        const current = parseInt(localStorage.getItem("resumeDownloadCount") || "0", 10);

        const updated = current + 1;

        localStorage.setItem("resumeDownloadCount", updated);

        console.log(`📄 Resume downloaded ${updated} time(s) on this browser.`);

    });

}