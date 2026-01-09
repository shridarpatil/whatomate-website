// Mouse parallax effect for hero
const hero = document.querySelector('.hero');
const bubbles = document.querySelectorAll('.bubble');
const rings = document.querySelectorAll('.ring');

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    bubbles.forEach((bubble, index) => {
        const speed = (index + 1) * 15;
        bubble.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    rings.forEach((ring, index) => {
        const speed = (index + 1) * 5;
        ring.style.transform = `translate(calc(-50% + ${x * speed}px), calc(-50% + ${y * speed}px))`;
    });
});

hero.addEventListener('mouseleave', () => {
    bubbles.forEach(bubble => {
        bubble.style.transform = '';
    });
    rings.forEach(ring => {
        ring.style.transform = 'translate(-50%, -50%)';
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Stats counter animation
function animateCounter(element, target, suffix, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;

    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

        element.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
            element.parentElement.classList.add('animated');
        }
    }

    requestAnimationFrame(updateCounter);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat');
            stats.forEach((stat, index) => {
                const target = parseInt(stat.dataset.target);
                const suffix = stat.dataset.suffix;
                const valueElement = stat.querySelector('.stat-value');

                // Stagger the animations
                setTimeout(() => {
                    animateCounter(valueElement, target, suffix, 1500);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Copy to clipboard
function copyCode(button) {
    const codeBlock = button.parentElement;
    const text = codeBlock.textContent.replace('Copy', '').replace('Copied!', '').replace('$', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
