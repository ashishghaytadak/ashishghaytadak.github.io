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
const scriptURL = 'https://script.google.com/macros/s/AKfycbxddeY2G51mDM-Ce3IJ_gquo157rh2TGydb_qYnzNZBgmkeXINa0Y00pK957c2s364P/exec';
const form = document.forms['submit-to-google-sheet'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .then(text => {
            console.log('Success!', text);
            messageEl.textContent = "Submitted successfully!";
            messageEl.style.color = "white";
            form.reset();
            setTimeout(() => messageEl.textContent = "", 5000);
        })
        .then(() => form.reset())
        .catch(error => console.error('Error!', error.message));
});

// Clear input fields (if needed in the future)
function clearField() {
    document.querySelectorAll('.input-').forEach(field => field.value = '');
}

// Contact
function doGet(e) {
  return ContentService.createTextOutput("This web app only accepts POST requests.");
}

function doPost(e) {
   // Open spreadsheet by ID
  var ss = SpreadsheetApp.openById('1sU9_18d3UkaASXGY89UNK4x608pA4y9d5qM_DDEoqPE');
  
  // Get the sheet by name
  var sheet = ss.getSheetByName('Sheet1');  // or ss.getSheets()[0]
  

  // Get form fields from request
  var firstName = e.parameter['first-name'];
  var lastName = e.parameter['last-name'];
  var subject = e.parameter['subject'];
  var mobile = e.parameter['mobile'];
  var message = e.parameter['message'];

  // Save to Google Sheet
  sheet.appendRow([
    new Date(),
    firstName,
    lastName,
    subject,
    mobile,
    message
  ]);

  // Send Email
  var emailTo = "ashishghaytadak@gmail.com"; // 🔷 Replace with your email
  var emailSubject = "New Contact Form Submission: " + subject;
  var emailBody =
    "You received a new message via your portfolio contact form:\n\n" +
    "Full Name: " + firstName + " " + lastName + "\n" +
    "Mobile: " + mobile + "\n" +
    "Subject: " + subject + "\n" +
    "Message:\n" + message + "\n\n" +
    "Time: " + new Date();

  MailApp.sendEmail(emailTo, emailSubject, emailBody);

  return ContentService
           .createTextOutput("Success")
           .setMimeType(ContentService.MimeType.TEXT);
}
