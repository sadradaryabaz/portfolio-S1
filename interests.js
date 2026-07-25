/*  ═══════════════════════════════════════════════════
    Interests Page — Unified Script (v3.0)
    ═══════════════════════════════════════════════════  */
(() => {
    'use strict';

    // ── Element References ──
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const langBtn = document.getElementById('langBtn');
    const themeToggle = document.getElementById('themeToggle');
    const localizables = document.querySelectorAll('[data-en]');
    const backToTop = document.getElementById('backToTop');
    const typingEl = document.getElementById('typingText');
    const canvas = document.getElementById('particleCanvas');

    let lang = localStorage.getItem('lang') || 'en';

    /* ══════════════════════════════════════════════
       1) HAMBURGER MENU
       ══════════════════════════════════════════════ */
    if (hamburger && drawer) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = hamburger.classList.toggle('open');
            drawer.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            drawer.setAttribute('aria-hidden', !isOpen);
        });

        drawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('open');
                drawer.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
                hamburger.classList.remove('open');
                drawer.classList.remove('open');
            }
        });
    } else {
        console.warn('[Interests] Hamburger/Drawer not found — mobile menu disabled');
    }

    /* ══════════════════════════════════════════════
       2) LANGUAGE SYSTEM (with persistence)
       ══════════════════════════════════════════════ */
    function setLang(l) {
        lang = l;
        localStorage.setItem('lang', l);
        document.body.style.direction = (l === 'fa') ? 'rtl' : 'ltr';

        if (langBtn) {
            langBtn.textContent = (l === 'en') ? 'FA' : 'EN';
        }

        localizables.forEach(el => {
            const t = el.getAttribute('data-' + l);
            if (t !== null) el.textContent = t;
        });

        if (drawer) {
            drawer.style.textAlign = (l === 'fa') ? 'right' : 'left';
        }

        startTypingEffect();
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setLang(lang === 'en' ? 'fa' : 'en');
        });
    }

    /* ══════════════════════════════════════════════
       3) THEME TOGGLE (Light / Dark)
       ══════════════════════════════════════════════ */
    if (themeToggle) {
        const savedLight = localStorage.getItem('lightMode') === 'true';
        if (savedLight) {
            document.body.classList.add('light');
            themeToggle.textContent = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light');
            themeToggle.textContent = isLight ? '☀️' : '🌙';
            localStorage.setItem('lightMode', isLight);
        });
    }

    /* ══════════════════════════════════════════════
       4) THEME DOTS (Color themes)
       ══════════════════════════════════════════════ */
    const themeClassList = [
        'theme-cyberpunk', 'theme-matrix', 'theme-ai', 'theme-sunset'
    ];
    let currentTheme = localStorage.getItem('theme') || '';

    if (currentTheme) {
        document.body.classList.add('theme-' + currentTheme);
    }

    const themeDots = document.querySelectorAll('.theme-dot');

    themeDots.forEach(dot => {
        if (dot.dataset.theme === currentTheme) {
            dot.classList.add('active');
        }
    });

    function updateMetaColor() {
        const meta = document.getElementById('metaThemeColor');
        if (!meta) return;
        const themeColors = {
            '': '#0a0f1f',
            'cyberpunk': '#0b0014',
            'matrix': '#000a03',
            'ai': '#0a0a1f',
            'sunset': '#1a0d00'
        };
        meta.setAttribute('content', themeColors[currentTheme] || '#0a0f1f');
    }

    themeDots.forEach(dot => {
        const theme = dot.dataset.theme;

        dot.addEventListener('mouseenter', () => {
            document.body.classList.remove(...themeClassList);
            if (theme) document.body.classList.add('theme-' + theme);
        });

        dot.addEventListener('mouseleave', () => {
            document.body.classList.remove(...themeClassList);
            if (currentTheme) document.body.classList.add('theme-' + currentTheme);
        });

        dot.addEventListener('click', () => {
            currentTheme = theme;
            document.body.classList.remove(...themeClassList);
            if (theme) document.body.classList.add('theme-' + theme);
            localStorage.setItem('theme', theme);
            themeDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            updateMetaColor();
        });
    });

    updateMetaColor();

    /* ══════════════════════════════════════════════
       5) ACTIVE NAV LINK
       ══════════════════════════════════════════════ */
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    /* ══════════════════════════════════════════════
       6) INTERSECTION OBSERVER — CARDS
       ══════════════════════════════════════════════ */
    const cards = document.querySelectorAll('.interest-card');
    console.log('[Interests] Cards found:', cards.length);

    if (cards.length > 0) {
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');

                            const progressFill = entry.target.querySelector('.progress-fill');
                            if (progressFill) {
                                const targetWidth = progressFill.getAttribute('data-width');
                                setTimeout(() => {
                                    progressFill.style.width = targetWidth + '%';
                                }, 200);
                            }
                        }, i * 120);

                        obs.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -30px 0px',
                threshold: 0.05
            });

            cards.forEach(card => cardObserver.observe(card));

            // Fallback
            setTimeout(() => {
                let forced = 0;
                cards.forEach(card => {
                    if (!card.classList.contains('visible')) {
                        card.classList.add('visible');
                        forced++;
                        const pf = card.querySelector('.progress-fill');
                        if (pf) {
                            pf.style.width = (pf.getAttribute('data-width') || 0) + '%';
                        }
                    }
                });
                if (forced > 0) {
                    console.warn('[Interests] Fallback:', forced, 'cards force-revealed');
                }
            }, 4000);

        } else {
            cards.forEach(card => {
                card.classList.add('visible');
                const pf = card.querySelector('.progress-fill');
                if (pf) pf.style.width = (pf.getAttribute('data-width') || 0) + '%';
            });
        }
    }

    /* ══════════════════════════════════════════════
       7) FILTER SYSTEM
       ══════════════════════════════════════════════ */
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            cards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = (filter === 'all' || category === filter);

                if (shouldShow) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.display = '';
                        card.style.position = '';
                        card.style.visibility = '';

                        card.classList.remove('visible');
                        void card.offsetWidth;
                        card.classList.add('visible');

                        const pf = card.querySelector('.progress-fill');
                        if (pf) {
                            const tw = pf.getAttribute('data-width');
                            pf.style.width = '0%';
                            setTimeout(() => { pf.style.width = tw + '%'; }, 200);
                        }
                    }, index * 60);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ══════════════════════════════════════════════
       8) TYPING EFFECT
       ══════════════════════════════════════════════ */
    const typingTextsEn = [
        'Coding is my superpower ',
        'Always learning, always growing ',
        'Passion drives everything I do ',
        'Explorer of ideas & technologies '
    ];
    const typingTextsFa = [
        'کدنویسی ابرقدرت من است',
        'همیشه در حال یادگیری و رشد',
        'اشتیاق محرک تمام کارهای من است',
        'کاوشگر ایده‌ها و فناوری‌ها'
    ];

    let typingIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout = null;

    function startTypingEffect() {
        if (typingTimeout) clearTimeout(typingTimeout);
        typingIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingEl) typingEl.textContent = '';
        typeWriter();
    }

    function typeWriter() {
        if (!typingEl) return;

        const texts = (lang === 'fa') ? typingTextsFa : typingTextsEn;
        const currentText = texts[typingIndex % texts.length];

        if (isDeleting) {
            typingEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typingIndex++;
            speed = 400;
        }

        typingTimeout = setTimeout(typeWriter, speed);
    }

    /* ══════════════════════════════════════════════
       9) COUNTER ANIMATION (with suffix)
       ══════════════════════════════════════════════ */
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el, target, suffix) {
        let current = 0;
        const step = target / 60;
        const interval = 1500 / 60;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.round(current) + (suffix || '');
        }, interval);
    }

    if (statNumbers.length > 0) {
        if ('IntersectionObserver' in window) {
            const counterObs = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const raw = el.dataset.count;
                        const target = parseInt(raw);
                        const suffix = raw.replace(/\d/g, '');
                        animateCounter(el, target, suffix);
                        obs.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });

            statNumbers.forEach(el => counterObs.observe(el));
        } else {
            statNumbers.forEach(el => {
                el.textContent = el.dataset.count;
            });
        }
    }

    /* ══════════════════════════════════════════════
       10) BACK TO TOP
       ══════════════════════════════════════════════ */
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ══════════════════════════════════════════════
       11) CARD TILT + GLOW
       ══════════════════════════════════════════════ */
    document.querySelectorAll('[data-tilt]').forEach(card => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transition = 'transform 0.1s ease-out';
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;

            if (glow) {
                card.style.setProperty('--mouse-x', ((x / rect.width) * 100).toFixed(1) + '%');
                card.style.setProperty('--mouse-y', ((y / rect.height) * 100).toFixed(1) + '%');
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease-out';
            card.style.transform = '';
            setTimeout(() => { card.style.transition = ''; }, 400);
        });
    });

    /* ══════════════════════════════════════════════
       12) PARTICLE CANVAS
       ══════════════════════════════════════════════ */
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId = null;
        let mouseX = -1000;
        let mouseY = -1000;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        window.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        class Particle {
            constructor() { this.reset(); }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.baseOpacity = this.opacity;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 14400) {
                    const dist = Math.sqrt(distSq);
                    this.opacity = Math.min(1, this.baseOpacity + (1 - dist / 120) * 0.6);
                    this.x -= dx * 0.005;
                    this.y -= dy * 0.005;
                } else {
                    this.opacity += (this.baseOpacity - this.opacity) * 0.05;
                }

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 224, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        function getParticleCount() {
            const w = window.innerWidth;
            if (w < 600) return 30;
            if (w < 1024) return 50;
            return 80;
        }

        function initParticles() {
            particles = [];
            const count = getParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            const maxDistSq = 10000;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        const opacity = (1 - dist / 100) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 224, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            animId = requestAnimationFrame(animate);
        }

        initParticles();
        animate();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animId);
                animId = null;
            } else if (!animId) {
                animate();
            }
        });
    }

    /* ══════════════════════════════════════════════
       INIT — Apply saved language (triggers typing)
       ══════════════════════════════════════════════ */
    setLang(lang);

    console.log('[Interests] ✅ All scripts loaded successfully');
})();
