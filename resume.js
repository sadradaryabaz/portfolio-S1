(() => {
    // ── Elements ──
    const hamburger = document.getElementById("hamburger");
    const drawer = document.getElementById("mobileDrawer");
    const langBtn = document.getElementById("langBtn");
    const themeToggle = document.getElementById("themeToggle");
    const localizables = document.querySelectorAll("[data-en]");

    if (!hamburger || !drawer) return;

    let lang = "en";

    /* ══════════════════════════════════
       Skill Bars Animation
       ══════════════════════════════════ */
    const animateBars = () => {
        document.querySelectorAll(".bar-fill").forEach(fill => {
            fill.style.width = fill.dataset.val + "%";
        });
    };
    setTimeout(animateBars, 400);

    /* ══════════════════════════════════
       Hamburger Logic
       ══════════════════════════════════ */
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = hamburger.classList.toggle("open");
        drawer.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
        drawer.setAttribute("aria-hidden", !isOpen);
    });

    // Close drawer on link click
    drawer.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            hamburger.classList.remove("open");
            drawer.classList.remove("open");
        });
    });

    // Close on outside click
    document.addEventListener("click", e => {
        if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
            hamburger.classList.remove("open");
            drawer.classList.remove("open");
        }
    });

    /* ══════════════════════════════════
       Language Logic
       ══════════════════════════════════ */
    function setLang(l) {
        lang = l;
        document.body.style.direction = l === "fa" ? "rtl" : "ltr";
        if (langBtn) {
            langBtn.textContent = l === "en" ? "FA" : "EN";
        }

        localizables.forEach(el => {
            const t = el.getAttribute("data-" + l);
            if (t !== null) el.textContent = t;
        });

        // Drawer text alignment
        if (l === "fa") {
            drawer.style.textAlign = "right";
        } else {
            drawer.style.textAlign = "left";
        }
    }

    if (langBtn) {
        langBtn.addEventListener("click", () => setLang(lang === "en" ? "fa" : "en"));
        setLang("en");
    }

    /* ══════════════════════════════════
       Theme Toggle (Light/Dark)
       ══════════════════════════════════ */
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light");
            themeToggle.textContent = isLight ? "☀️" : "🌙";
        });
    }
})();


/* ══════════════════════════════════════
   Theme Dots (Color Themes + localStorage)
   ══════════════════════════════════════ */

let currentTheme = localStorage.getItem("theme") || "";

// Apply saved theme on load
if (currentTheme) {
    document.body.classList.add("theme-" + currentTheme);
}

const themeDots = document.querySelectorAll(".theme-dot");

// Mark saved dot as active
themeDots.forEach(dot => {
    if (dot.dataset.theme === currentTheme) {
        dot.classList.add("active");
    }
});

function updateMetaColor() {
    const meta = document.getElementById("metaThemeColor");
    if (!meta) return;

    const themeColors = {
        "": "#0a0f1f",
        "cyberpunk": "#0b0014",
        "matrix": "#000a03",
        "ai": "#0a0a1f",
        "sunset": "#1a0d00"
    };

    meta.setAttribute("content", themeColors[currentTheme] || "#0a0f1f");
}

themeDots.forEach(dot => {

    const theme = dot.dataset.theme;

    // Preview on hover
    dot.addEventListener("mouseenter", () => {
        document.body.classList.remove(
            "theme-cyberpunk",
            "theme-matrix",
            "theme-ai",
            "theme-sunset"
        );
        if (theme) {
            document.body.classList.add("theme-" + theme);
        }
    });

    // Revert on leave
    dot.addEventListener("mouseleave", () => {
        document.body.classList.remove(
            "theme-cyberpunk",
            "theme-matrix",
            "theme-ai",
            "theme-sunset"
        );
        if (currentTheme) {
            document.body.classList.add("theme-" + currentTheme);
        }
    });

    // Select on click
    dot.addEventListener("click", () => {
        currentTheme = theme;

        document.body.classList.remove(
            "theme-cyberpunk",
            "theme-matrix",
            "theme-ai",
            "theme-sunset"
        );

        if (theme) {
            document.body.classList.add("theme-" + theme);
        }

        localStorage.setItem("theme", theme);

        themeDots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");

        updateMetaColor();
    });

});

updateMetaColor();
