document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add glow effect when hovering over interactive elements
    const interactives = document.querySelectorAll('a, .bento-item, .bento-card, .gallery-item');
    
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '400px';
            cursor.style.height = '400px';
            cursor.style.background = 'radial-gradient(circle, rgba(188, 19, 254, 0.15) 0%, rgba(0,0,0,0) 70%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '300px';
            cursor.style.height = '300px';
            cursor.style.background = 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, rgba(0,0,0,0) 70%)';
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    // Initial setup for reveal elements
    const revealElements = document.querySelectorAll('.bento-item, .bento-card, .gallery-item, .section-title, .lead-text, .about-content p');
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Interactive Name Click -> Reveal Subtitle
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    
    if(heroName && heroSubtitle) {
        heroName.addEventListener('click', () => {
            heroSubtitle.classList.toggle('show-subtitle');
        });
    }

    // Crazy Canvas Particle Animation
    const canvas = document.getElementById('hero-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        function initCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', () => {
            initCanvas();
            initParticles();
        });

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if(e.touches.length > 0) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
                this.baseX = this.x;
                this.baseY = this.y;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                // Bounce off edges
                if (this.x > width || this.x < 0) this.dx = -this.dx;
                if (this.y > height || this.y < 0) this.dy = -this.dy;

                // Mouse interaction
                if (mouse.x !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    
                    if (distance < mouse.radius) {
                        this.x -= forceDirectionX * force * 5;
                        this.y -= forceDirectionY * force * 5;
                    } else {
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx/20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy/20;
                        }
                    }
                } else {
                    // Return to base when no mouse/touch
                    if (this.x !== this.baseX) {
                        this.x -= (this.x - this.baseX)/20;
                    }
                    if (this.y !== this.baseY) {
                        this.y -= (this.y - this.baseY)/20;
                    }
                }
                
                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            // Increase density slightly for mobile
            let numberOfParticles = (width * height) / 6000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let dx = (Math.random() * 2) - 1;
                let dy = (Math.random() * 2) - 1;
                let color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
                particles.push(new Particle(x, y, dx, dy, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance/100})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        initCanvas();
        initParticles();
        animate();
    }

    // Navbar background blur on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});
