document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Make Lenis accessible globally
    window.lenis = lenis;

    // 2. Mobile Burger Menu Toggling
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksMenu = document.querySelector('.nav-links');
    
    if (navToggle && navLinksMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinksMenu.classList.toggle('active');
            
            // Toggle body scroll locking using Lenis
            if (navLinksMenu.classList.contains('active')) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });

        // Close menu when clicking a link
        const menuLinks = navLinksMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinksMenu.classList.remove('active');
                lenis.start();
            });
        });
    }

    // 3. Navbar Scrolled Background Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Custom Cursor Logic (Desktops only, CSS media hides cursor element)
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let mouseMoved = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!mouseMoved) {
                ringX = mouseX;
                ringY = mouseY;
                mouseMoved = true;
            }
        });

        function animateCursor() {
            cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover expansions for links, buttons, cards, inputs
        const updateHoverEffects = () => {
            const hoverTargets = document.querySelectorAll('a, button, .service-card, .why-card, .portfolio-card, .blog-card, .team-card, input, textarea, select, .modal-close, .faq-question');
            
            hoverTargets.forEach(el => {
                // Remove existing to avoid duplicates
                el.removeEventListener('mouseenter', onMouseEnterHover);
                el.removeEventListener('mouseleave', onMouseLeaveHover);
                
                el.addEventListener('mouseenter', onMouseEnterHover);
                el.addEventListener('mouseleave', onMouseLeaveHover);
            });
        };

        function onMouseEnterHover() {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorRing.style.width = '55px';
            cursorRing.style.height = '55px';
            cursorRing.style.borderColor = 'rgba(37, 99, 235, 0.8)';
            cursorRing.style.backgroundColor = 'rgba(37, 99, 235, 0.05)';
        }

        function onMouseLeaveHover() {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(37, 99, 235, 0.4)';
            cursorRing.style.backgroundColor = 'transparent';
        }

        // Run hover updater
        updateHoverEffects();
        // Expose helper to refresh listeners if DOM changes dynamically
        window.refreshCursorHovers = updateHoverEffects;
    }

    // 5. Contact Modal Logic
    const modal = document.getElementById('contactModal');
    const modalFormContainer = document.getElementById('modalFormContainer');
    const modalSuccess = document.getElementById('modalSuccess');
    const projectForm = document.getElementById('projectForm');

    function openModal() {
        if (modal) {
            modal.classList.add('active');
            if (modalFormContainer) modalFormContainer.style.display = 'block';
            if (modalSuccess) modalSuccess.style.display = 'none';
            if (projectForm) projectForm.reset();
            lenis.stop();
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            lenis.start();
        }
    }

    window.openModal = openModal;
    window.closeModal = closeModal;

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Modal Formspree Ajax Submission
    if (projectForm) {
        projectForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = projectForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            const formData = new FormData(projectForm);

            try {
                const response = await fetch(projectForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (modalFormContainer) modalFormContainer.style.display = 'none';
                    if (modalSuccess) modalSuccess.style.display = 'block';
                    projectForm.reset();
                } else {
                    throw new Error("Submission error");
                }
            } catch (error) {
                alert("Something went wrong. Please check your connection and try again.");
            }

            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        });
    }

    // 6. Contact Page Form Submission (if on contact page)
    const contactPageForm = document.getElementById('contactPageForm');
    const contactSuccessMsg = document.getElementById('contactSuccessMsg');
    
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactPageForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactPageForm);
            
            try {
                const response = await fetch(contactPageForm.action, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactPageForm.style.display = 'none';
                    if (contactSuccessMsg) contactSuccessMsg.style.display = 'block';
                    contactPageForm.reset();
                } else {
                    throw new Error("Submission error");
                }
            } catch (error) {
                alert("Something went wrong. Please check your connection and try again.");
            }
            
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        });
    }

    // 7. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Toggle active state
            item.classList.toggle('active');
            
            // Optional: Close other FAQs (Accordion style)
            const siblingItems = item.parentElement.querySelectorAll('.faq-item');
            siblingItems.forEach(sib => {
                if (sib !== item) {
                    sib.classList.remove('active');
                }
            });
        });
    });

    // 8. Card Tilt Effects using VanillaTilt
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".service-card, .why-card, .testimonial-card, .team-card"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.12,
            scale: 1.015
        });
    }
});
