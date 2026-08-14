/* =====================================================================
   CONTACT.JS — Form handler, EmailJS integration, clipboard, toasts
   - Preserves UI and behavior
   - Shows a clear diagnostic message when EmailJS isn't configured
   - Uses safe DOM APIs only (no innerHTML)
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* -----------------------
       EmailJS configuration
       Replace placeholders with your real values from EmailJS dashboard
       ----------------------- */
    const EMAILJS_CONFIG = {
        serviceId: 'service_1wsf5hq',
        templateId: 'template_bxbetzp',
        publicKey: '-r8RHUJd3Q9G-Bamq'
    };

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const toastContainer = document.getElementById('contact-toast-container');

    let emailjsReady = false;


    /* =================================================================
       Initialize EmailJS (safe, diagnostic)
       - Will only initialize when serviceId, templateId and publicKey are present
       - If placeholders remain, initialization is skipped so the user sees the diagnostic toast
       ================================================================= */
    function initEmailJS() {
        if (typeof emailjs === 'undefined') return;

        if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
            console.warn('EmailJS config incomplete; initialization skipped.', {
                serviceId: EMAILJS_CONFIG.serviceId,
                templateId: EMAILJS_CONFIG.templateId,
                publicKeyPresent: !!EMAILJS_CONFIG.publicKey
            });
            emailjsReady = false;
            return;
        }

        try {
            if (typeof emailjs.init === 'function') {
                // EmailJS init expects the public key string in many releases
                try {
                    emailjs.init(EMAILJS_CONFIG.publicKey);
                } catch (e) {
                    // Fallback to object form if library expects it
                    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
                }
            }
            emailjsReady = true;
            console.info('EmailJS initialized');
        } catch (err) {
            console.error('EmailJS initialization failed:', err);
            emailjsReady = false;
        }
    }


    /* =================================================================
       Toast notifications (DOM-only)
       ================================================================= */
    function showToast(message, type = 'info') {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'contact-toast contact-toast--' + type;
        toast.setAttribute('role', 'alert');

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '1.5');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');

        if (type === 'success') {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
            const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('points', '22 4 12 14.01 9 11.01');
            icon.appendChild(path);
            icon.appendChild(polyline);
        } else {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '10');
            const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line1.setAttribute('x1', '15');
            line1.setAttribute('y1', '9');
            line1.setAttribute('x2', '9');
            line1.setAttribute('y2', '15');
            const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line2.setAttribute('x1', '9');
            line2.setAttribute('y1', '9');
            line2.setAttribute('x2', '15');
            line2.setAttribute('y2', '15');
            icon.appendChild(circle);
            icon.appendChild(line1);
            icon.appendChild(line2);
        }

        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;

        toast.appendChild(icon);
        toast.appendChild(messageSpan);
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('is-visible'));

        setTimeout(() => {
            toast.classList.remove('is-visible');
            setTimeout(() => toast.remove(), 500);
        }, 4200);
    }


    /* =================================================================
       Validation helpers
       ================================================================= */
    function validateField(field) {
        const wrap = field.closest('.contact-field');
        if (!wrap) return field.checkValidity();

        if (!field.checkValidity()) {
            wrap.classList.add('is-invalid');
            return false;
        }

        wrap.classList.remove('is-invalid');
        wrap.classList.add('is-valid');
        return true;
    }

    function validateForm() {
        if (!form) return false;

        // Honeypot
        const botField = form.querySelector('input[name="bot_field"]');
        if (botField && botField.value.trim() !== '') return false;

        const fields = form.querySelectorAll('.contact-input, .contact-select, .contact-textarea');
        let valid = true;
        fields.forEach(field => { if (!validateField(field)) valid = false; });
        return valid;
    }

    function sanitizeInput(value, maxLen) {
        if (typeof value !== 'string') return '';
        return value.replace(/\s+/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLen || 500);
    }

    function isSubmissionAllowed() {
        if (!form) return false;
        const lastSubmit = Number(form.dataset.lastSubmit || '0');
        const now = Date.now();
        const cooldownMs = 10 * 1000;
        if (now - lastSubmit < cooldownMs) return false;
        form.dataset.lastSubmit = String(now);
        return true;
    }


    /* =================================================================
       Submission
       - Uses emailjs.send when available and falls back to sendForm
       - If EmailJS is not initialized, shows the requested diagnostic toast
       ================================================================= */
    function setSubmitLoading(loading) {
        if (!submitBtn) return;
        submitBtn.classList.toggle('is-loading', loading);
        submitBtn.disabled = loading;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form) return;

        if (!validateForm()) {
            showToast('Please complete all fields correctly.', 'error');
            return;
        }

        if (!isSubmissionAllowed()) {
            showToast('Please wait a few seconds before submitting again.', 'error');
            return;
        }

        if (!emailjsReady) {
            // User-requested exact message
            showToast('Mail service is not configured yet. Please add your EmailJS keys.', 'error');
            return;
        }

        setSubmitLoading(true);

        try {
            const params = {
                from_name: sanitizeInput((form.querySelector('[name="from_name"]') || {}).value || '', 100),
                from_email: sanitizeInput((form.querySelector('[name="from_email"]') || {}).value || '', 254),
                project_type: sanitizeInput((form.querySelector('[name="project_type"]') || {}).value || '', 80),
                budget: sanitizeInput((form.querySelector('[name="budget"]') || {}).value || '', 80),
                message: sanitizeInput((form.querySelector('[name="message"]') || {}).value || '', 2000)
            };

            if (typeof emailjs.send === 'function') {
                await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, params);
            } else {
                await emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form);
            }

            showToast("Message sent successfully. I'll be in touch soon.", 'success');
            form.reset();
            form.querySelectorAll('.contact-field').forEach(f => f.classList.remove('is-valid', 'is-invalid'));
        } catch (err) {
            console.error('EmailJS error:', err);
            showToast('Something went wrong. Please try again or email directly.', 'error');
        } finally {
            setSubmitLoading(false);
        }
    }


    /* =================================================================
       Clipboard copy helper for contact info
       ================================================================= */
    function initCopyButtons() {
        document.querySelectorAll('.contact-copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const text = btn.dataset.copy;
                if (!text) return;
                try {
                    await navigator.clipboard.writeText(text);
                    btn.classList.add('is-copied');
                    const label = btn.querySelector('.contact-copy-text'); if (label) label.textContent = 'Copied';
                    setTimeout(() => { btn.classList.remove('is-copied'); if (label) label.textContent = 'Copy'; }, 2000);
                } catch (e) {
                    showToast('Unable to copy. Please select the text manually.', 'error');
                }
            });
        });
    }


    /* =================================================================
       Form field helpers
       ================================================================= */
    function initFormFields() {
        if (!form) return;
        const fields = form.querySelectorAll('.contact-input, .contact-select, .contact-textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => { if (field.value.trim()) validateField(field); });
            field.addEventListener('input', () => { const wrap = field.closest('.contact-field'); if (wrap) wrap.classList.remove('is-invalid'); });
        });
        form.addEventListener('submit', handleSubmit);
    }


    /* =================================================================
       Initialize everything on DOMContentLoaded
       ================================================================= */
    document.addEventListener('DOMContentLoaded', () => {
        initEmailJS();
        initCopyButtons();
        initFormFields();
    });

})();