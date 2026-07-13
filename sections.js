/* =====================================================================
   SECTIONS.JS — Journey, Education, Skills Interactions
   Timeline scroll-fill, node glow activation
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;


    /* =================================================================
       TIMELINE SCROLL-FILL
       The gold line grows as the user scrolls through the timeline
       ================================================================= */

    const timeline = document.getElementById('timeline');
    const timelineFill = document.getElementById('timeline-fill');

    if (timeline && timelineFill) {
        let ticking = false;

        function updateTimelineFill() {
            const rect = timeline.getBoundingClientRect();
            const wh = window.innerHeight;

            if (rect.top > wh || rect.bottom < 0) { ticking = false; return; }

            const scrolledPast = wh - rect.top;
            const pct = Math.max(0, Math.min(1, scrolledPast / rect.height));
            timelineFill.style.height = (pct * 100) + '%';
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateTimelineFill);
            }
        }, { passive: true });
        updateTimelineFill();
    }


    /* =================================================================
       TIMELINE NODE GLOW
       Each node glows gold when it enters the viewport
       ================================================================= */

    const nodes = document.querySelectorAll('.timeline-node');
    if (nodes.length) {
        const nodeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.5, rootMargin: '0px 0px -60px 0px' });

        nodes.forEach(n => nodeObserver.observe(n));
    }


    /* =================================================================
       PROJECT MOCKUP PARALLAX
       Subtle 3D rotation following the cursor within each project
       ================================================================= */

    const mockupWrappers = document.querySelectorAll('.project-mockup-wrapper');
    if (mockupWrappers.length) {
        const mockupObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.dataset.visible = entry.isIntersecting ? '1' : '0';
            });
        }, { threshold: 0.1 });

        mockupWrappers.forEach(w => mockupObserver.observe(w));

        document.addEventListener('mousemove', (e) => {
            const mx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 to 1
            const my = (e.clientY / window.innerHeight - 0.5) * 2;  // -1 to 1

            mockupWrappers.forEach(w => {
                if (w.dataset.visible !== '1') return;
                const rx = my * -1.8;
                const ry = mx * 2.5;
                w.style.transform =
                    `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
        }, { passive: true });
    }


    /* =================================================================
       DESIGN PROCESS TIMELINE
       Steps highlight sequentially when the timeline scrolls into view
       ================================================================= */

    const processTimelines = document.querySelectorAll('.project-process');
    if (processTimelines.length) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const steps = entry.target.querySelectorAll('.process-step');
                    steps.forEach((step, i) => {
                        setTimeout(() => step.classList.add('active'), i * 220);
                    });
                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        processTimelines.forEach(p => processObserver.observe(p));
    }

})();
