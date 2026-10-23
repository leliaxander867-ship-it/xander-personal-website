// Mobile menu
var menuButton = document.getElementById("menuButton");
var navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", function () {
  navMenu.classList.toggle("show-menu");
});

// Close the mobile menu after clicking a navigation link
var navLinks = navMenu.getElementsByTagName("a");

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navMenu.classList.remove("show-menu");
  });
}

// Project information
function showProject(projectName) {
  var category = document.getElementById("projectCategory");
  var title = document.getElementById("projectTitle");
  var description = document.getElementById("projectDescription");
  var details = document.getElementById("projectDetails");

  if (projectName === "healthcore") {
    category.innerHTML = "VIDEO EDITING · VOLUNTEER PROJECT";
    title.innerHTML = "HealthCore Promotional Video";
    description.innerHTML = "I created this promotional video during my work immersion experience for HealthCore Clinics and Diagnostics. It helped me practice video editing and visual storytelling.";
  }

  if (projectName === "pjyc") {
    category.innerHTML = "VIDEO PRODUCTION · CHURCH / VOLUNTEER";
    title.innerHTML = "Passionist Jubilee Youth Camp";
    description.innerHTML = "I helped create promotional video content for the Passionist Jubilee Youth Camp. The project focused on presenting the event in a creative and engaging way.";
  }

  if (projectName === "student") {
    category.innerHTML = "DESIGN · VIDEO · ACADEMIC WORK";
    title.innerHTML = "Student Creative Projects";
    description.innerHTML = "This includes some of my school and student organization work such as video editing, graphics, and event content.";
  }

  if (projectName === "website") {
    category.innerHTML = "FIGMA · UI/UX DESIGN";
    title.innerHTML = "Personal Website UI/UX";
    description.innerHTML = "This personal website started as a Figma design before I converted it into HTML, CSS, and JavaScript for my CCC 110 activity.";
  }

  details.style.display = "block";
  details.scrollIntoView({ behavior: "smooth", block: "center" });
}

function closeProject() {
  document.getElementById("projectDetails").style.display = "none";
}

// Contact form demo
var contactForm = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;

  formMessage.innerHTML = "Thank you, " + name + "! Your message was received by this demo form.";
  contactForm.reset();
});
