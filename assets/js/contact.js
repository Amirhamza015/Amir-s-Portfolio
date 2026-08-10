/* =====================================================================
   CONTACT.JS — Form, EmailJS, Clipboard, Footer, Toasts
   ===================================================================== */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── EmailJS Configuration ───
       Replace placeholders before deploying to production.
       Template should include: from_name, from_email, project_type,
       budget, message, to_email (starkamir01@gmail.com)
    */
    const EMAILJS_CONFIG = {
        serviceId: 'service_1wsf5hq',
        templateId: 'template_a4pmhd7',
        publicKey: '-r8RHUJd3Q9G-Bamq'
    };

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const toastContainer = document.getElementById('contact-toast-container');

    let emailjsReady = false;


    /* =================================================================
       EMAILJS INITIALIZATION
       ================================================================= */

    function initEmailJS() {
        if (typeof emailjs === 'undefined') return;

        if (
            EMAILJS_CONFIG.publicKey === '-r8RHUJd3Q9G-Bamq' ||
            EMAILJS_CONFIG.templateId === 'template_a4pmhd7'
        ) {
            return;
        }

        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        emailjsReady = true;
    }


    /* =================================================================
       TOAST NOTIFICATIONS
       ================================================================= */

    function showToast(message, type) {
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'contact-toast contact-toast--' + type;
        toast.setAttribute('role', 'alert');

        const icon = type === 'success'
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

        toast.innerHTML = icon + '<span>' + message + '</span>';
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('is-visible'));

        setTimeout(() => {
            toast.classList.remove('is-visible');
            setTimeout(() => toast.remove(), 500);
        }, 4200);
    }


    /* =================================================================
       FORM VALIDATION
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

        const fields = form.querySelectorAll('.contact-input, .contact-select, .contact-textarea');
        let valid = true;

        fields.forEach(field => {
            if (!validateField(field)) valid = false;
        });

        return valid;
    }


    /* =================================================================
       FORM SUBMISSION
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

        if (!emailjsReady) {
            showToast('Email service is not configured yet. Please add your EmailJS keys.', 'error');
            return;
        }

        setSubmitLoading(true);

        try {
            await emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                form
            );

            showToast('Message sent successfully. I\'ll be in touch soon.', 'success');
            form.reset();
            form.querySelectorAll('.contact-field').forEach(f => {
                f.classList.remove('is-valid', 'is-invalid');
            });
        } catch (err) {
            console.error('EmailJS error:', err);
            showToast('Something went wrong. Please try again or email directly.', 'error');
        } finally {
            setSubmitLoading(false);
        }
    }


    /* =================================================================
       COPY TO CLIPBOARD
       ================================================================= */

    function initCopyButtons() {
        document.querySelectorAll('.contact-copy-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const text = btn.dataset.copy;
                if (!text) return;

                try {
                    await navigator.clipboard.writeText(text);
                    btn.classList.add('is-copied');
                    const label = btn.querySelector('.contact-copy-text');
                    if (label) label.textContent = 'Copied';

                    setTimeout(() => {
                        btn.classList.remove('is-copied');
                        if (label) label.textContent = 'Copy';
                    }, 2000);
                } catch {
                    showToast('Unable to copy. Please select the text manually.', 'error');
                }
            });
        });
    }


    /* =================================================================
       INPUT FOCUS & VALIDATION FEEDBACK
       ================================================================= */

    function initFormFields() {
        if (!form) return;

        const fields = form.querySelectorAll('.contact-input, .contact-select, .contact-textarea');

        fields.forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) validateField(field);
            });

            field.addEventListener('input', () => {
                const wrap = field.closest('.contact-field');
                if (wrap) wrap.classList.remove('is-invalid');
            });
        });

        form.addEventListener('submit', handleSubmit);
    }


    /* =================================================================
       INITIALIZE
       ================================================================= */

    document.addEventListener('DOMContentLoaded', () => {
        initEmailJS();
        initCopyButtons();
        initFormFields();
    });

})();
