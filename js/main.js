// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Copy to clipboard
function copyCode(button) {
    const line = button.closest('.terminal-line');
    const cmd = line.querySelector('.terminal-cmd');
    if (!cmd) return;

    navigator.clipboard.writeText(cmd.textContent.trim()).then(() => {
        button.classList.add('copied');
        button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 2000);
    });
}

// Smooth scroll for anchor links
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

// Nav background on scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        nav.style.borderBottomColor = 'var(--border-light)';
    } else {
        nav.style.borderBottomColor = 'var(--border)';
    }
    lastScroll = scrollY;
}, { passive: true });
