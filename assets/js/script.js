/* =====================================================================
   PREMIUM PORTFOLIO — HERO INTERACTIONS
   Cinematic motion, typing animation, parallax, particles, magnetics
   ===================================================================== */

(function () {
    'use strict';

    /* ─── FEATURE DETECTION ─── */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── DOM REFERENCES ─── */
    const navbar            = document.getElementById('navbar');
    const mobileMenuBtn     = document.getElementById('mobile-menu-btn');
    const mobileMenu        = document.getElementById('mobile-menu');
    const portraitContainer  = document.getElementById('portrait-container');
    const typingText        = document.getElementById('typing-text');
    const particleCanvas    = document.getElementById('particles');
    const scrollIndicator   = document.getElementById('scroll-indicator');
    const navCta            = document.getElementById('nav-cta');
    const mobileNavCta      = document.getElementById('mobile-nav-cta');
    const navLinks          = Array.from(document.querySelectorAll('.nav-link'));
    const mobileNavLinks    = Array.from(document.querySelectorAll('.mobile-nav-link'));
    const trackedSections   = ['hero', 'about', 'journey', 'skills', 'projects', 'selected-works'];

    let isSmoothScrolling = false;


    /* =================================================================
       1. TYPING ANIMATION
       Smooth character-by-character with gentle cursor & fade transitions
       ================================================================= */

    const roles = [
        'Creative Technologist',
        'Full Stack Developer',
        'Frontend Engineer',
        'UI/UX Designer',
        'Graphics Designer',
        'Prompt Engineer',
        'AI Explorer',
        'Machine Learning Enthusiast',
        'Problem Solver',
        'Creative Director',
        'Visual Storyteller',
        'Automation Builder',
        'MERN Stack Developer',
        'Vibe Coder',
        'Digital Creator',
        'Future AI Engineer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeRole() {
        if (prefersReducedMotion) {
            typingText.textContent = roles[0];
            return;
        }

        const currentRole = roles[roleIndex];

        if (!isDeleting && !isPaused) {
            /* Typing forward */
            charIndex++;
            typingText.textContent = currentRole.substring(0, charIndex);

            if (charIndex === currentRole.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeRole();
                }, 2400);
                return;
            }

            setTimeout(typeRole, 55 + Math.random() * 35);
        } else if (isDeleting) {
            /* Fading out then clearing */
            typingText.classList.add('fading');

            setTimeout(() => {
                typingText.textContent = '';
                typingText.classList.remove('fading');
                isDeleting = false;
                charIndex = 0;
                roleIndex = (roleIndex + 1) % roles.length;

                setTimeout(typeRole, 300);
            }, 400);
        }
    }

    /* Start typing after initial page load animation */
    setTimeout(typeRole, 1200);


    /* =================================================================
       2. 3D PARALLAX — PORTRAIT CONTAINER
       Cinematic mouse-follow with independent card depth
       ================================================================= */

    let mouseX = 0;
    let mouseY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let animationFrame = null;

    function initParallax() {
        if (prefersReducedMotion || !portraitContainer) return;

        const floatingCards = portraitContainer.querySelectorAll('.floating-card');

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function updateParallax() {
            const { innerWidth, innerHeight } = window;

            /* Calculate target rotation (max ±4°) */
            const targetRotateY = ((mouseX / innerWidth) - 0.5) * 8;
            const targetRotateX = ((mouseY / innerHeight) - 0.5) * -8;

            /* Spring interpolation for smooth damping */
            const spring = 0.06;
            currentRotateX += (targetRotateX - currentRotateX) * spring;
            currentRotateY += (targetRotateY - currentRotateY) * spring;

            /* Apply to portrait container */
            portraitContainer.style.transform =
                `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

            /* Move floating cards independently */
            floatingCards.forEach(card => {
                const depth = parseFloat(card.dataset.depth) || 0.3;
                const moveX = (mouseX / innerWidth - 0.5) * depth * 50;
                const moveY = (mouseY / innerHeight - 0.5) * depth * 50;
                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            animationFrame = requestAnimationFrame(updateParallax);
        }

        updateParallax();
    }


    /* =================================================================
       3. MAGNETIC BUTTON EFFECT
       Subtle pull toward cursor on hover
       ================================================================= */

    function initMagneticButtons() {
        if (prefersReducedMotion) return;

        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
                btn.style.transition = 'transform 0.15s ease-out';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    }


    /* =================================================================
       4. ANIMATED COUNTERS
       Triggered by Intersection Observer, eased counting
       ================================================================= */

    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = 2200;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                /* Ease-out cubic */
                const ease = 1 - Math.pow(1 - progress, 3);

                counter.textContent = Math.round(ease * target);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            if (prefersReducedMotion) {
                counter.textContent = target;
            } else {
                requestAnimationFrame(update);
            }
        });
    }


    /* =================================================================
       5. INTERSECTION OBSERVER — SCROLL REVEALS
       Fade-up elements when they enter viewport
       ================================================================= */

    function initScrollReveals() {
        const fadeElements = document.querySelectorAll('.fade-up');

        if (prefersReducedMotion) {
            fadeElements.forEach(el => el.classList.add('visible'));
            animateCounters();
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    /* Trigger counters when stats section is visible */
                    if (entry.target.id === 'hero-stats') {
                        setTimeout(animateCounters, 400);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }


    /* =================================================================
       6. NAVIGATION — SMOOTH SCROLL TO CONTACT
       Ease-in-out animation, navbar offset, active state highlight
       ================================================================= */

    function getNavOffset() {
        return (navbar ? navbar.offsetHeight : 72) + 16;
    }

    function easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function clearActiveNavLinks() {
        navLinks.forEach(link => link.classList.remove('active'));
        mobileNavLinks.forEach(link => link.classList.remove('active'));
    }

    function setActiveNavLink(activeId) {
        clearActiveNavLinks();

        const matchingLinks = [
            ...navLinks.filter(link => (link.getAttribute('href') || '').slice(1) === activeId),
            ...mobileNavLinks.filter(link => (link.getAttribute('href') || '').slice(1) === activeId)
        ];

        matchingLinks.forEach(link => link.classList.add('active'));
    }

    function updateActiveNavLinkFromScroll() {
        const scrollPosition = window.scrollY + 180;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.documentElement.scrollHeight;

        let currentSection = 'hero';

        if (scrollPosition + windowHeight >= bodyHeight - 80) {
            currentSection = 'contact';
        } else {
            for (const sectionId of trackedSections) {
                const section = document.getElementById(sectionId);
                if (!section) continue;

                const sectionTop = section.offsetTop - 120;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSection = sectionId;
                    break;
                }
            }
        }

        if (currentSection !== 'contact') {
            setActiveNavLink(currentSection);
            if (window.location.hash !== `#${currentSection}`) {
                history.replaceState(null, '', `#${currentSection}`);
            }
        } else {
            clearActiveNavLinks();
        }
    }

    function restoreSectionOnLoad() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'auto' });
            }
        }

        updateActiveNavLinkFromScroll();
    }

    function animateCtaArrow(ctaEl) {
        if (!ctaEl || prefersReducedMotion) return;

        const arrow = ctaEl.querySelector('svg');
        if (!arrow) return;

        arrow.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
        arrow.style.transform = 'translateX(4px)';

        setTimeout(() => {
            arrow.style.transform = 'translateX(0)';
        }, 700);
    }

    function smoothScrollToY(targetY, duration, onComplete) {
        if (prefersReducedMotion) {
            window.scrollTo(0, targetY);
            onComplete?.();
            return;
        }

        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        isSmoothScrolling = true;

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                isSmoothScrolling = false;
                onComplete?.();
            }
        }

        requestAnimationFrame(step);
    }

    function scrollToContact(options) {
        const fromCTA = options && options.fromCTA;
        const contactSection = document.getElementById('contact');

        if (!contactSection) return;

        const targetY = Math.max(
            0,
            contactSection.getBoundingClientRect().top + window.scrollY - getNavOffset()
        );

        clearActiveNavLinks();

        if (fromCTA && options.ctaEl) {
            animateCtaArrow(options.ctaEl);
        }

        smoothScrollToY(targetY, fromCTA ? 1100 : 1000, () => {
            history.replaceState(null, '', '#contact');
        });
    }

    function closeMobileMenuIfOpen() {
        if (!mobileMenu || !mobileMenu.classList.contains('open')) return;

        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    function initNavScroll() {
        const contactTriggers = [
            { el: navCta, fromCTA: true },
            { el: mobileNavCta, fromCTA: true }
        ];

        contactTriggers.forEach(({ el, fromCTA }) => {
            if (!el) return;

            el.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileMenuIfOpen();
                scrollToContact({ fromCTA, ctaEl: el });
            });
        });
    }


    /* =================================================================
       7. NAVBAR SCROLL BEHAVIOR
       Shrink + increase blur on scroll
       ================================================================= */

    function initNavbarScroll() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            updateActiveNavLinkFromScroll();

            if (scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            /* Hide scroll indicator after scrolling */
            if (scrollIndicator) {
                if (scrollY > 200) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.visibility = 'hidden';
                } else {
                    scrollIndicator.style.opacity = '1';
                    scrollIndicator.style.visibility = 'visible';
                }
            }

            lastScroll = scrollY;
        }, { passive: true });
    }


    /* =================================================================
       8. MOBILE MENU
       Elegant slide overlay
       ================================================================= */

    function initMobileMenu() {
        if (!mobileMenuBtn || !mobileMenu) return;

        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('open');

            if (isOpen) {
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else {
                mobileMenu.classList.add('open');
                mobileMenu.setAttribute('aria-hidden', 'false');
                mobileMenuBtn.classList.add('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        });

        /* Close menu on link click */
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }


    /* =================================================================
       8. PARTICLE SYSTEM
       Minimal, barely visible warm particles
       ================================================================= */

    function initParticles() {
        if (prefersReducedMotion || !particleCanvas) return;

        const ctx = particleCanvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 22;

        function resize() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        resize();

        window.addEventListener('resize', resize, { passive: true });

        /* Create particles */
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 1.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.15,
                opacity: Math.random() * 0.12 + 0.04,
                /* Warm white/gold tint */
                r: 220 + Math.random() * 35,
                g: 200 + Math.random() * 30,
                b: 170 + Math.random() * 30
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

            particles.forEach(p => {
                /* Move */
                p.x += p.speedX;
                p.y += p.speedY;

                /* Wrap around */
                if (p.x < -10) p.x = particleCanvas.width + 10;
                if (p.x > particleCanvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = particleCanvas.height + 10;
                if (p.y > particleCanvas.height + 10) p.y = -10;

                /* Draw */
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${p.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();
    }


    /* =================================================================
       9. SMOOTH ARROW ROTATION ON BUTTON HOVER
       Micro-interaction for CTA arrow icons
       ================================================================= */

    function initButtonArrows() {
        document.querySelectorAll('.btn').forEach(btn => {
            const arrow = btn.querySelector('.btn-arrow');
            if (!arrow) return;

            btn.addEventListener('mouseenter', () => {
                arrow.style.transform = 'translateX(3px) rotate(-35deg)';
            });

            btn.addEventListener('mouseleave', () => {
                arrow.style.transform = 'translateX(0) rotate(0deg)';
            });
        });
    }


    /* =================================================================
       10. PORTRAIT IMAGE FALLBACK
       Graceful handling if portrait image doesn't load
       ================================================================= */

    function initPortraitFallback() {
        const img = document.getElementById('portrait-img');
        if (!img) return;

        img.addEventListener('error', () => {
            /* Create a sophisticated fallback */
            const frame = img.closest('.portrait-frame');
            if (frame) {
                frame.style.background = `
                    linear-gradient(135deg,
                        var(--bg-card) 0%,
                        var(--bg-secondary) 50%,
                        var(--bg-card) 100%
                    )`;
                frame.style.aspectRatio = '3 / 4';
                frame.style.display = 'flex';
                frame.style.alignItems = 'center';
                frame.style.justifyContent = 'center';

                img.style.display = 'none';

                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    font-family: var(--font-heading);
                    font-size: 4rem;
                    font-weight: 700;
                    color: rgba(244, 241, 235, 0.08);
                    letter-spacing: 0.05em;
                    user-select: none;
                `;
                placeholder.textContent = 'H';
                frame.appendChild(placeholder);
            }
        });
    }


    /* =================================================================
       11. SCROLL INDICATOR VISIBILITY
       Fade out indicator when user has scrolled
       ================================================================= */

    function initScrollIndicator() {
        if (!scrollIndicator) return;

        scrollIndicator.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    }


    /* =================================================================
       INITIALIZE EVERYTHING
       ================================================================= */

    document.addEventListener('DOMContentLoaded', () => {
        initScrollReveals();
        initNavScroll();
        initNavbarScroll();
        initMobileMenu();
        initMagneticButtons();
        initParallax();
        initParticles();
        initButtonArrows();
        initPortraitFallback();
        initScrollIndicator();
        restoreSectionOnLoad();
        window.addEventListener('load', () => {
            setTimeout(restoreSectionOnLoad, 80);
        }, { once: true });
    });

})();
