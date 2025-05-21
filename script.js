// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');

    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            // Toggle between menu and close icons
            const icon = mobileMenuButton.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                nav.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Add animation to program cards
const animateProgramCards = () => {
    const cards = document.querySelectorAll('.program-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateProgramCards();
});

// Form submission handling
async function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
        timestamp: new Date().toLocaleString()
    };

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Replace with your Google Apps Script Web App URL
        const response = await fetch('https://script.google.com/macros/s/AKfycbzlDGBjur8oKKKZEfk90ZoM9_PhbXD8ikSIpotT4RczIkhoI3LW2sbcwWxup5bKKlnXTw/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you for your message! We will get back to you soon.';
        form.reset();
    } catch (error) {
        // Show error message
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
} 