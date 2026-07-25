/* ===== Global Language System ===== */

const langBtn = document.getElementById("langBtn");
const localizables = document.querySelectorAll("[data-en]");
const langOptions = document.querySelectorAll(".lang-option");

/* Supported languages */
const languages = ["en", "fa", "de"];

let lang = localStorage.getItem("site-lang") || "en";

/* ========================= */

function updateActiveButtons() {
    langOptions.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}

/* ========================= */

function applyLang(l) {

    document.documentElement.lang = l;

    if (l === "fa") {
        document.documentElement.dir = "rtl";
        document.body.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
        document.body.dir = "ltr";
    }

    localizables.forEach(el => {

        // اگر ترجمه وجود نداشت از انگلیسی استفاده کن
        const value = el.dataset[l] || el.dataset.en;

        if (value !== undefined) {
            el.innerHTML = value;
        }

    });

    if (langBtn) {

        const labels = {
            en: "EN",
            fa: "FA",
            de: "DE"
        };

        langBtn.textContent = labels[l];

    }

    updateActiveButtons();
}

/* ========================= */

function setLang(l) {

    if (!languages.includes(l)) return;

    lang = l;

    localStorage.setItem("site-lang", l);

    applyLang(l);

    // Auto close mobile menu
    const drawer = document.getElementById("mobileDrawer");

    if (drawer) {
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
    }
}

/* ========================= */
/* Top Button */

if (langBtn) {

    langBtn.addEventListener("click", () => {

        const index = languages.indexOf(lang);
        const next = (index + 1) % languages.length;

        setLang(languages[next]);

    });

}

/* ========================= */
/* Mobile Language Buttons */

langOptions.forEach(btn => {

    btn.addEventListener("click", () => {
        setLang(btn.dataset.lang);
    });

});

/* ========================= */
/* Load Saved Language */

document.addEventListener("DOMContentLoaded", () => {
    applyLang(lang);
});