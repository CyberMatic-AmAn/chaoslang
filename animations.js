// animations.js
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    codeBlocks.forEach(block => {
        block.classList.add('animate');
        observer.observe(block);
    });

    // Button hover animation
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 15px #ff3333';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
});