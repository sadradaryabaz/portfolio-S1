(() => {
    // تعریف المنت‌ها
    const hamburger = document.getElementById("hamburger");
    const drawer = document.getElementById("mobileDrawer");
    const langBtn = document.getElementById("langBtn");
    const themeToggle = document.getElementById("themeToggle");
    const localizables = document.querySelectorAll("[data-en]");

    // بررسی صحت وجود المنت‌ها قبل از اجرای منطق اصلی
    if (!hamburger || !drawer) return;

    let lang = "en";

    /* ── Hamburger Logic ── */
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = hamburger.classList.toggle("open");
        drawer.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
        drawer.setAttribute("aria-hidden", !isOpen);
    });

    // بستن درایور با کلیک روی لینک‌ها
    drawer.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            hamburger.classList.remove("open");
            drawer.classList.remove("open");
        });
    });

    // بستن با کلیک در فضای خالی
    document.addEventListener("click", e => {
        if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
            hamburger.classList.remove("open");
            drawer.classList.remove("open");
        }
    });

    /* ── Theme Logic ── */
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light");
            themeToggle.textContent = isLight ? "☀️" : "🌙";
        });
    }
})();



const themeDots = document.querySelectorAll(".theme-dot");

themeDots.forEach(dot => {

    const theme = dot.dataset.theme;

    // preview
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