// ==========================================================================
// Nexora Creations - Visual Animations (GSAP & Three.js)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Integrate Lenis with GSAP ScrollTrigger if Lenis exists
        if (window.lenis) {
            window.lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                window.lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0, 0);
        }

        // Initialize GSAP animations
        initHeroAnimations();
        initRevealAnimations();
        initMarqueeAnimations();
        initServicesAnimations();
        initStatsAnimations();
        initPortfolioAnimations();
        initProcessAnimations();
        initTestimonialAnimations();
        initCounterAnimations();
    }

    // Initialize Three.js Scene
    initThreeJsScene();
});

// 1. Hero entry text-reveal timeline
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const tl = gsap.timeline();
    
    tl.to('.hero-title .word', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        startAt: { y: 100, opacity: 0 }
    })
    .to('.hero-tag', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
    }, '-=0.6')
    .to('.hero-sub', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
    }, '-=0.6')
    .to('.hero-btns', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
    }, '-=0.6');
}

// 2. Generic GSAP Scroll reveal hook
function initRevealAnimations() {
    const reveals = gsap.utils.toArray('.gs-reveal');
    if (reveals.length === 0) return;

    reveals.forEach(elem => {
        gsap.fromTo(elem, {
            opacity: 0,
            y: 40
        }, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// 3. Ribbon Marquee scroll control
function initMarqueeAnimations() {
    const marquee = document.querySelector('.marquee');
    if (!marquee) return;

    gsap.to('.marquee-content', {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: marquee,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// 4. Service cards stagger popup
function initServicesAnimations() {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    ScrollTrigger.create({
        trigger: grid,
        start: 'top 80%',
        onEnter: () => {
            gsap.fromTo('.service-card',
                { opacity: 0, y: 70, rotationX: -10 },
                { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }
            );
        },
        once: true
    });
}

// 5. Stats counters card entry
function initStatsAnimations() {
    const statsWrap = document.querySelector('.stats-wrap');
    if (!statsWrap) return;

    ScrollTrigger.create({
        trigger: statsWrap,
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo('.stat-box',
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        },
        once: true
    });
}

// 6. Portfolio card reveals & Image cover vertical parallax
function initPortfolioAnimations() {
    const cards = gsap.utils.toArray('.portfolio-card');
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
        // Staggered entry
        gsap.fromTo(card,
            { opacity: 0, y: 80 },
            {
                scrollTrigger: { 
                    trigger: card, 
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: 'power3.out', 
                delay: i % 2 === 0 ? 0 : 0.15
            }
        );
    });

    // Image Parallax Effect on Scroll
    const images = gsap.utils.toArray('.portfolio-img-cover');
    images.forEach(img => {
        const parentCard = img.closest('.portfolio-card');
        gsap.to(img, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
                trigger: parentCard,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// 7. Step by Step process progress mapping
function initProcessAnimations() {
    const timeline = document.querySelector('.process-timeline');
    if (!timeline) return;

    // Draw progression line
    gsap.to('.process-line-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1
        }
    });

    // Step cards popup and dot states triggers
    const steps = gsap.utils.toArray('.process-step');
    steps.forEach((step, i) => {
        ScrollTrigger.create({
            trigger: step,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(step,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.2)' }
                );
                
                const dot = step.querySelector('.process-dot');
                if (dot) dot.classList.add('active');
            },
            once: true
        });
    });
}

// 8. Testimonial card stagger reveals
function initTestimonialAnimations() {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    ScrollTrigger.create({
        trigger: grid,
        start: 'top 85%',
        onEnter: () => {
            gsap.fromTo('.testimonial-card',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
            );
        },
        once: true
    });
}

// 9. Interactive number count trigger
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 92%',
            once: true,
            onEnter: () => {
                const targetValue = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                
                gsap.to(counter, {
                    innerHTML: targetValue,
                    duration: 1.8,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out',
                    onUpdate: function () {
                        counter.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix;
                    }
                });
            }
        });
    });
}

// 10. Three.js scene initializer (with intersection checks to optimize CPU load)
function initThreeJsScene() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();

    // Perspective Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Renderer setup (limiting device pixel ratios to maintain decent FPS on high-res displays)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));

    // Outer premium digital wireframe shape (using royal blue primary token)
    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.14
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner glowing network core (using indigo accent token)
    const innerGeometry = new THREE.IcosahedronGeometry(1.4, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x4f46e5,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerSphere);

    // Orbiting particle systems (reduced density to save GPU resource cycles)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 240;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 16;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.035,
        color: 0x2563eb,
        transparent: true,
        opacity: 0.55
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse positions mappings
    let mouseXThree = 0;
    let mouseYThree = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseXThree = (event.clientX - windowHalfX);
        mouseYThree = (event.clientY - windowHalfY);
    });

    // Pause WebGL loops if hero isn't inside browser frame (Intersection Observer)
    const heroSection = document.getElementById('home') || canvas.parentElement;
    let isThreeVisible = true;
    
    if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isThreeVisible = entry.isIntersecting;
            });
        }, { threshold: 0 });
        observer.observe(heroSection);
    }

    const clock = new THREE.Clock();

    function animateThree() {
        requestAnimationFrame(animateThree);

        // Terminate computations if element is out of viewport
        if (!isThreeVisible) return;

        const elapsedTime = clock.getElapsedTime();

        // Rotate primary shapes
        sphere.rotation.y += 0.0015;
        sphere.rotation.x += 0.0008;

        innerSphere.rotation.y -= 0.0022;
        innerSphere.rotation.z -= 0.0015;

        particlesMesh.rotation.y = -elapsedTime * 0.04;

        // Smooth mouse interactive float response
        targetX = mouseXThree * 0.0008;
        targetY = mouseYThree * 0.0008;

        sphere.rotation.y += 0.05 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);

        innerSphere.rotation.y += 0.05 * (targetX - innerSphere.rotation.y);
        innerSphere.rotation.x += 0.05 * (targetY - innerSphere.rotation.x);

        renderer.render(scene, camera);
    }

    animateThree();

    // Update dimensions on resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
