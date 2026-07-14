/* =====================================================================
   GALLERY.JS — Selected Works Creative Gallery
   Editorial masonry, filters, lightbox, parallax, lazy loading
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BASE_PATH = 'Designing Works/';

    const DESIGN_NOTES = [
        'Designed for impact.',
        'Built around clarity.',
        'Every pixel has purpose.'
    ];

    const GALLERY_ITEMS = [
        {
            id: 'bytebattle-2026',
            src: BASE_PATH + 'ByrteBattle_2026.png',
            title: 'ByteBattle 2026 — Hero Identity',
            category: 'events',
            categoryLabel: 'Events',
            year: '2025',
            layout: 'banner',
            featured: true,
            reveal: 'scale',
            software: ['Photoshop', 'Illustrator', 'After Effects'],
            story: 'The flagship visual for ByteBattle — a 15-hour solo hackathon. Built to communicate energy, competition, and technical excellence in a single cinematic frame.',
            tags: ['Event Branding', 'Hero Visual', 'Creative Direction']
        },
        {
            id: 'amir-overview',
            src: BASE_PATH + "Amir's_ovewrview_ByteBattle.png",
            title: 'Creative Director — Event Overview',
            category: 'branding',
            categoryLabel: 'Branding',
            year: '2025',
            layout: 'portrait',
            featured: true,
            reveal: 'slide-right',
            software: ['Photoshop', 'Illustrator', 'Figma'],
            story: 'A personal creative overview piece introducing the visual narrative behind ByteBattle — establishing tone, hierarchy, and brand voice before a single line of code was written.',
            tags: ['Brand Identity', 'Visual Storytelling', 'Leadership']
        },
        {
            id: 'bytebattle-reg',
            src: BASE_PATH + 'ByteBattle_Regis.png',
            title: 'ByteBattle — Registration Launch',
            category: 'social-media',
            categoryLabel: 'Social Media',
            year: '2025',
            layout: 'square',
            reveal: 'fade-up',
            software: ['Photoshop', 'Illustrator'],
            story: 'Registration launch creative designed to drive sign-ups while maintaining visual consistency across the entire ByteBattle campaign ecosystem.',
            tags: ['Campaign', 'Conversion', 'Social']
        },
        {
            id: '24hrs-remain',
            src: BASE_PATH + '24Hrs_Remain_ByteBattle.png',
            title: '24 Hours Remain — Countdown',
            category: 'motion',
            categoryLabel: 'Motion',
            year: '2025',
            layout: 'landscape',
            reveal: 'slide-left',
            designNote: DESIGN_NOTES[0],
            software: ['Photoshop', 'After Effects'],
            story: 'High-urgency countdown creative engineered for maximum impact in the final 24 hours before ByteBattle went live.',
            tags: ['Countdown', 'Urgency', 'Motion Ready']
        },
        {
            id: 'reg-closed',
            src: BASE_PATH + 'ByteBattle_Registration_Closed.png',
            title: 'Registration Closed — Announcement',
            category: 'events',
            categoryLabel: 'Events',
            year: '2025',
            layout: 'square',
            reveal: 'fade-up',
            software: ['Photoshop', 'Illustrator'],
            story: 'A decisive closure announcement that transitions the audience from anticipation to event readiness — clear, confident, and on-brand.',
            tags: ['Announcement', 'Event Flow', 'Messaging']
        },
        {
            id: 'top7-performers',
            src: BASE_PATH + 'Top7_Performers_ByteBattle.png',
            title: 'Top 7 Performers — Recognition',
            category: 'social-media',
            categoryLabel: 'Social Media',
            year: '2025',
            layout: 'wide',
            reveal: 'scale',
            software: ['Photoshop', 'Illustrator'],
            story: 'Post-event recognition creative celebrating top performers — designed to honor achievement while reinforcing ByteBattle\'s competitive spirit.',
            tags: ['Recognition', 'Community', 'Post-Event']
        },
        {
            id: 'pcm-5days',
            src: BASE_PATH + 'PCM_5DaysToGo.png',
            title: 'PCM — Five Days To Go',
            category: 'posters',
            categoryLabel: 'Posters',
            year: '2024',
            layout: 'portrait',
            reveal: 'slide-right',
            software: ['Photoshop', 'Illustrator'],
            story: 'Opening the PCM countdown series with bold typography and restrained composition — setting the visual rhythm for the entire campaign.',
            tags: ['Countdown Series', 'Poster Design', 'Typography']
        },
        {
            id: 'pcm-4days',
            src: BASE_PATH + 'PCM_4daystogo.png',
            title: 'PCM — Four Days Countdown',
            category: 'posters',
            categoryLabel: 'Posters',
            year: '2024',
            layout: 'landscape',
            reveal: 'fade-up',
            designNote: DESIGN_NOTES[1],
            software: ['Photoshop', 'Illustrator'],
            story: 'Second beat in the PCM countdown — escalating tension through composition while preserving series cohesion across every touchpoint.',
            tags: ['Series Design', 'Campaign', 'Visual Rhythm']
        },
        {
            id: 'pcm-3days',
            src: BASE_PATH + 'PCM_3DaysToGoo.png',
            title: 'PCM — Three Days Remaining',
            category: 'social-media',
            categoryLabel: 'Social Media',
            year: '2024',
            layout: 'square',
            reveal: 'slide-left',
            software: ['Photoshop', 'Illustrator'],
            story: 'Mid-countdown social creative balancing information density with visual breathing room — optimized for feed visibility and shareability.',
            tags: ['Social Campaign', 'Countdown', 'Engagement']
        },
        {
            id: 'geeks-of-geek',
            src: BASE_PATH + 'GeeksofGeek_.png',
            title: 'Geeks of Geek — Brand Visual',
            category: 'creative-experiments',
            categoryLabel: 'Creative Experiments',
            year: '2024',
            layout: 'wide',
            reveal: 'scale',
            software: ['Photoshop', 'Illustrator'],
            story: 'An experimental brand visual exploring personality-driven design — where playful energy meets structured visual systems.',
            tags: ['Experimentation', 'Brand Exploration', 'Character']
        },
        {
            id: 'pcm-2days',
            src: BASE_PATH + 'PCM_2DaystoGoo.png',
            title: 'PCM — Two Days Left',
            category: 'social-media',
            categoryLabel: 'Social Media',
            year: '2024',
            layout: 'square',
            reveal: 'fade-up',
            software: ['Photoshop', 'Illustrator'],
            story: 'Penultimate countdown piece intensifying visual urgency without sacrificing the refined aesthetic established at series launch.',
            tags: ['Urgency', 'Social', 'Campaign Finale']
        },
        {
            id: 'pcm-post',
            src: BASE_PATH + 'PCM_PostMarketing.png',
            title: 'PCM — Post-Event Marketing',
            category: 'events',
            categoryLabel: 'Events',
            year: '2024',
            layout: 'banner',
            reveal: 'slide-left',
            designNote: DESIGN_NOTES[2],
            software: ['Photoshop', 'Illustrator', 'Figma'],
            story: 'Post-event marketing creative capturing momentum after the main event — designed to extend engagement and celebrate community participation.',
            tags: ['Post-Event', 'Marketing', 'Retention']
        },
        {
            id: 'sah-poster',
            src: BASE_PATH + 'SAH_Sample_Poster.png',
            title: 'SAH — Event Poster Concept',
            category: 'ui-ux',
            categoryLabel: 'UI/UX',
            year: '2024',
            layout: 'portrait',
            reveal: 'slide-right',
            software: ['Photoshop', 'Figma', 'Illustrator'],
            story: 'A sample event poster exploring interface-adjacent layout principles — where poster composition borrows from digital product thinking.',
            tags: ['Poster', 'Layout Systems', 'Concept']
        }
    ];

    const gridEl = document.getElementById('gallery-grid');
    const filtersTrack = document.getElementById('gallery-filters-track');
    const filterIndicator = document.getElementById('gallery-filter-indicator');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxBackdrop = document.getElementById('gallery-lightbox-backdrop');
    const lightboxClose = document.getElementById('gallery-lightbox-close');
    const lightboxPrev = document.getElementById('gallery-lightbox-prev');
    const lightboxNext = document.getElementById('gallery-lightbox-next');
    const lightboxImage = document.getElementById('gallery-lightbox-image');
    const lightboxCounter = document.getElementById('gallery-lightbox-counter');
    const lightboxTitle = document.getElementById('gallery-lightbox-title');
    const lightboxCategory = document.getElementById('gallery-lightbox-category');
    const lightboxSoftware = document.getElementById('gallery-lightbox-software');
    const lightboxStory = document.getElementById('gallery-lightbox-story');
    const lightboxTags = document.getElementById('gallery-lightbox-tags');
    const lightboxStage = document.getElementById('gallery-lightbox-stage');

    if (!gridEl) return;

    let activeFilter = 'all';
    let filteredItems = [...GALLERY_ITEMS];
    let lightboxIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let parallaxTicking = false;
    let parallaxBound = false;
    let mouseX = 0.5;
    let mouseY = 0.5;

    function padNumber(n, total) {
        return String(n).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function getFilteredItems() {
        if (activeFilter === 'all') return [...GALLERY_ITEMS];
        return GALLERY_ITEMS.filter(item => item.category === activeFilter);
    }

    function buildCardHTML(item, index) {
        const noteHTML = item.designNote
            ? `<span class="gallery-card-note">${escapeHtml(item.designNote)}</span>`
            : '';

        return `
            <article class="gallery-card gallery-card--${item.layout} gallery-reveal gallery-reveal--${item.reveal}${item.featured ? ' gallery-card--featured' : ''}"
                     role="listitem"
                     data-id="${item.id}"
                     data-category="${item.category}"
                     data-index="${index}"
                     style="--reveal-delay: ${(index % 7) * 0.08 + 0.05}s">
                <button type="button" class="gallery-card-trigger" aria-label="View ${escapeHtml(item.title)}">
                    <div class="gallery-card-frame">
                        <div class="gallery-card-skeleton" aria-hidden="true"></div>
                        <img class="gallery-card-image"
                             src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                             data-src="${encodeURI(item.src)}"
                             alt="${escapeHtml(item.title)}"
                             loading="lazy"
                             decoding="async">
                        <div class="gallery-card-shine" aria-hidden="true"></div>
                        <div class="gallery-card-glow" aria-hidden="true"></div>
                        ${noteHTML}
                    </div>
                    <div class="gallery-card-meta">
                        <div class="gallery-card-meta-top">
                            <span class="gallery-card-category">${escapeHtml(item.categoryLabel)}</span>
                            <span class="gallery-card-year">${escapeHtml(item.year)}</span>
                        </div>
                        <h3 class="gallery-card-title">${escapeHtml(item.title)}</h3>
                        <span class="gallery-card-arrow" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 8h10M9 4l4 4-4 4"/>
                            </svg>
                        </span>
                    </div>
                </button>
            </article>
        `;
    }

    function renderGrid() {
        filteredItems = getFilteredItems();
        gridEl.style.opacity = '0';
        gridEl.style.transform = 'translateY(12px)';

        requestAnimationFrame(() => {
            gridEl.innerHTML = filteredItems.map((item, i) => buildCardHTML(item, i)).join('');
            initLazyImages();
            initCardReveals();
            bindCardClicks();
            if (!prefersReducedMotion) initParallaxCards();

            requestAnimationFrame(() => {
                gridEl.style.opacity = '1';
                gridEl.style.transform = 'translateY(0)';
            });
        });
    }

    function initLazyImages() {
        const images = gridEl.querySelectorAll('.gallery-card-image[data-src]');

        if ('IntersectionObserver' in window) {
            const imgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (!src) return;

                    const loader = new Image();
                    loader.onload = () => {
                        img.src = src;
                        img.removeAttribute('data-src');
                        const card = img.closest('.gallery-card');
                        if (card) card.classList.add('is-loaded');
                    };
                    loader.onerror = () => {
                        img.alt = 'Image unavailable';
                        const card = img.closest('.gallery-card');
                        if (card) card.classList.add('is-loaded', 'is-error');
                    };
                    loader.src = src;
                    imgObserver.unobserve(img);
                });
            }, { rootMargin: '120px 0px', threshold: 0.01 });

            images.forEach(img => imgObserver.observe(img));
        } else {
            images.forEach(img => {
                img.src = img.dataset.src;
                img.closest('.gallery-card')?.classList.add('is-loaded');
            });
        }
    }

    function initCardReveals() {
        const cards = gridEl.querySelectorAll('.gallery-reveal');

        if (prefersReducedMotion) {
            cards.forEach(c => c.classList.add('is-visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        cards.forEach(card => revealObserver.observe(card));
    }

    function bindCardClicks() {
        gridEl.querySelectorAll('.gallery-card-trigger').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.gallery-card');
                const id = card?.dataset.id;
                const idx = filteredItems.findIndex(item => item.id === id);
                if (idx >= 0) openLightbox(idx);
            });
        });
    }

  function updateFilterIndicator(activeBtn) {
        if (!filterIndicator || !activeBtn || !filtersTrack) return;
        const trackRect = filtersTrack.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();
        filterIndicator.style.width = btnRect.width + 'px';
        filterIndicator.style.height = btnRect.height + 'px';
        filterIndicator.style.transform = `translate(${btnRect.left - trackRect.left}px, ${btnRect.top - trackRect.top}px)`;
    }

    function setActiveFilter(filter, btn) {
        activeFilter = filter;
        filtersTrack.querySelectorAll('.gallery-filter').forEach(b => {
            const isActive = b === btn;
            b.classList.toggle('is-active', isActive);
            b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        updateFilterIndicator(btn);
        renderGrid();
    }

    function initFilters() {
        if (!filtersTrack) return;

        const buttons = filtersTrack.querySelectorAll('.gallery-filter');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                setActiveFilter(btn.dataset.filter, btn);
            });
        });

        const activeBtn = filtersTrack.querySelector('.gallery-filter.is-active');
        if (activeBtn) {
            requestAnimationFrame(() => updateFilterIndicator(activeBtn));
        }

        window.addEventListener('resize', () => {
            const current = filtersTrack.querySelector('.gallery-filter.is-active');
            if (current) updateFilterIndicator(current);
        }, { passive: true });
    }

    function populateLightboxDetail(item) {
        lightboxTitle.textContent = item.title;
        lightboxCategory.textContent = item.categoryLabel + ' · ' + item.year;
        lightboxSoftware.innerHTML = item.software
            .map(s => `<li>${escapeHtml(s)}</li>`)
            .join('');
        lightboxStory.textContent = item.story;
        lightboxTags.innerHTML = item.tags
            .map(t => `<span class="gallery-lightbox-tag">${escapeHtml(t)}</span>`)
            .join('');
    }

    function openLightbox(index) {
        if (!lightbox || index < 0 || index >= filteredItems.length) return;

        lightboxIndex = index;
        const item = filteredItems[index];

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        lightboxImage.classList.remove('is-visible');
        lightboxImage.src = encodeURI(item.src);
        lightboxImage.alt = item.title;
        populateLightboxDetail(item);
        lightboxCounter.textContent = padNumber(index + 1, filteredItems.length);

        if (lightboxImage.complete) {
            requestAnimationFrame(() => lightboxImage.classList.add('is-visible'));
        } else {
            lightboxImage.onload = () => {
                lightboxImage.classList.add('is-visible');
            };
        }
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImage.classList.remove('is-visible');
        lightboxImage.src = '';
    }

    function navigateLightbox(direction) {
        const next = (lightboxIndex + direction + filteredItems.length) % filteredItems.length;
        openLightbox(next);
    }

    function initLightbox() {
        if (!lightbox) return;

        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxBackdrop?.addEventListener('click', closeLightbox);
        lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
        lightboxNext?.addEventListener('click', () => navigateLightbox(1));

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        });

        lightboxStage?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        lightboxStage?.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].screenX - touchStartX;
            const dy = e.changedTouches[0].screenY - touchStartY;
            if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
            navigateLightbox(dx > 0 ? -1 : 1);
        }, { passive: true });
    }

    function initParallaxCards() {
        if (parallaxBound) return;
        parallaxBound = true;

        function updateParallax() {
            const cards = gridEl.querySelectorAll('.gallery-card--featured');
            const viewCenter = window.innerHeight / 2;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const scrollOffset = (centerY - viewCenter) * 0.04;
                const moveX = (mouseX - 0.5) * 12;
                const moveY = (mouseY - 0.5) * 12;
                const frame = card.querySelector('.gallery-card-frame');

                if (frame) {
                    frame.style.transform = `translate3d(${moveX}px, ${moveY - scrollOffset}px, 0)`;
                }
            });

            parallaxTicking = false;
        }

        function requestParallax() {
            if (parallaxTicking) return;
            parallaxTicking = true;
            requestAnimationFrame(updateParallax);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            requestParallax();
        }, { passive: true });

        window.addEventListener('scroll', requestParallax, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderGrid();
        initFilters();
        initLightbox();
    });

})();
