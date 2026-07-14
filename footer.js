/* =====================================================================
   FOOTER.JS — Signature Footer Experience
   Role rotation, exploring ticker, easter egg, back to top
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const FOOTER_ROLES = [
        'Creative Technologist',
        'Full Stack Developer',
        'Computer Engineering Student',
        'Graphics Designer',
        'Prompt Engineer',
        'AI Explorer',
        'Future AI Engineer',
        'Visual Storyteller',
        'Motion Enthusiast',
        'Automation Builder'
    ];

    const footerRole = document.getElementById('footer-role');
    const footerEaster = document.getElementById('footer-easter');
    const footer = document.getElementById('footer');
    const backToTop = document.getElementById('back-to-top');
    const tickerTrack = document.getElementById('signature-ticker-track');

    let roleIndex = 0;


    /* =================================================================
       ROTATING ROLE TITLES — Smooth fade, no typing
       ================================================================= */

    function initFooterRoles() {
        if (!footerRole || prefersReducedMotion) return;

        function rotateRole() {
            footerRole.classList.add('is-fading');

            setTimeout(() => {
                roleIndex = (roleIndex + 1) % FOOTER_ROLES.length;
                footerRole.textContent = FOOTER_ROLES[roleIndex];
                footerRole.classList.remove('is-fading');
            }, 450);
        }

        setInterval(rotateRole, 3400);
    }


    /* =================================================================
       EXPLORING TICKER — Seamless infinite scroll
       ================================================================= */

    function initExploringTicker() {
        if (!tickerTrack || prefersReducedMotion) return;

        const items = tickerTrack.innerHTML;
        tickerTrack.innerHTML = items + items;
    }


    /* =================================================================
       HIDDEN EASTER EGG — Reveals when footer enters view
       ================================================================= */

    function initEasterEgg() {
        if (!footerEaster || !footer) return;

        if (prefersReducedMotion) {
            footerEaster.classList.add('is-visible');
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        footerEaster.classList.add('is-visible');
                    }, 800);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35, rootMargin: '0px 0px -40px 0px' });

        observer.observe(footer);
    }


    /* =================================================================
       BACK TO TOP — Floating circular button
       ================================================================= */

    function initBackToTop() {
        if (!backToTop) return;

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('is-visible');
            } else {
                backToTop.classList.remove('is-visible');
            }
        }, { passive: true });
    }


    /* =================================================================
       INITIALIZE
       ================================================================= */

    document.addEventListener('DOMContentLoaded', () => {
        initFooterRoles();
        initExploringTicker();
        initEasterEgg();
        initBackToTop();
    });

})();
