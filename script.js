// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// Scroll reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.hero h2, .hero p, h2', { origin: 'top' });
ScrollReveal().reveal('.project, form', { origin: 'bottom' });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// Typed.js animation

const typed = new Typed(".multiple-text", {
    strings: ["a Salesforce Developer", "a Data Analyst", "a Business Analyst", "a Business Intelligence Analyst"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
  });

// Google Sheets form submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4O-4eDCShExgtQPuRAL2kPF92Z_tfIfr-irqQoZV0M-WpqdxU2rBVd25rAD8cwv-q/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .then(() => form.reset())
        .catch(error => console.error('Error!', error.message));
});

// Clear input fields (if needed in the future)
function clearField() {
    document.querySelectorAll('.input-').forEach(field => field.value = '');
}
