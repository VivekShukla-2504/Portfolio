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

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.style.background =
            "rgba(5,8,22,.95)";

        header.style.backdropFilter =
            "blur(18px)";

        header.style.boxShadow =
            "0 8px 25px rgba(0,0,0,.35)";

    }

    else {

        header.style.background =
            "rgba(5,8,22,.75)";

        header.style.boxShadow =
            "none";

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

        e.preventDefault();

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


// ================= CONTACT =================

function sendMessage(e) {

    e.preventDefault();

    const msg =
        document.getElementById("msg");

    if (!msg) return;

    msg.innerHTML =
        "✅ Thank you! Your message has been sent.";

    msg.style.color = "#00d4ff";

    e.target.reset();

    setTimeout(() => {

        msg.innerHTML = "";

    }, 3000);

}


// ================= FOOTER =================

const footer =
    document.querySelector("footer p");

if (footer) {

    footer.innerHTML =
        `© ${new Date().getFullYear()} Vivek Shukla • All Rights Reserved`;

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