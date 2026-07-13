/* =====================================================================
   ABOUT SECTION — THE MIND BEHIND THE WORK
   Interaction: Portrait parallax (scoped to about section)
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const aboutPortrait = document.getElementById('about-portrait-container');

    if (prefersReducedMotion || !aboutPortrait) return;


    /* =================================================================
       ABOUT PORTRAIT — 3D PARALLAX
       Scoped mouse-follow with viewport-aware activation
       ================================================================= */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rotX = 0;
    let rotY = 0;
    let isInView = false;

    /* Track global mouse position */
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    /* Only run parallax when the about section is in the viewport */
    const section = aboutPortrait.closest('.about');
    if (section) {
        const viewObserver = new IntersectionObserver((entries) => {
            isInView = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        viewObserver.observe(section);
    }

    function updateAboutParallax() {
        if (isInView) {
            const { innerWidth, innerHeight } = window;

            /* Max ±3.5° rotation (slightly less than Hero's ±4°) */
            const targetY = ((mouseX / innerWidth) - 0.5) * 7;
            const targetX = ((mouseY / innerHeight) - 0.5) * -7;

            /* Spring-damped interpolation */
            const spring = 0.045;
            rotX += (targetX - rotX) * spring;
            rotY += (targetY - rotY) * spring;

            aboutPortrait.style.transform =
                `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }

        requestAnimationFrame(updateAboutParallax);
    }

    requestAnimationFrame(updateAboutParallax);

})();
