// ===== AOS INIT (Scroll Animations) =====
AOS.init({
  duration: 800,
  once: true,
  offset: 80
});

// ===== VARIABLES =====
const skills   = ["HTML5","CSS3","JavaScript","Java","Python","C","MySQL","Git"];
const projects = ["RHYTHM Music App","Colour Sensing Detection"];

// ===== TYPING EFFECT =====
const words  = ["Balaji G.", "a Web Developer.", "a Problem Solver.", "an ECE Student."];
let wIndex   = 0;
let cIndex   = 0;
let deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = words[wIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, cIndex + 1);
    cIndex++;
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, cIndex - 1);
    cIndex--;
    if (cIndex === 0) {
      deleting = false;
      wIndex   = (wIndex + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}

window.addEventListener("load", function () {
  setTimeout(type, 500);
  animateSkillBars();
  console.log("Portfolio loaded! Skills:", skills);
  console.log("Projects:", projects);
});

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById("particles-canvas");
const ctx    = canvas.getContext("2d");
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseleave", function () {
  mouse.x = null;
  mouse.y = null;
});

function Particle() {
  this.x    = Math.random() * canvas.width;
  this.y    = Math.random() * canvas.height;
  this.size = Math.random() * 2 + 0.5;
  this.speedX = (Math.random() - 0.5) * 0.6;
  this.speedY = (Math.random() - 0.5) * 0.6;
  this.color = Math.random() > 0.5 ? "rgba(0,212,255," : "rgba(168,85,247,";
  this.opacity = Math.random() * 0.5 + 0.1;
}

Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
  if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

  // Mouse repel effect
  if (mouse.x !== null) {
    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.x += dx * 0.02;
      this.y += dy * 0.02;
    }
  }
};

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color + this.opacity + ")";
  ctx.fill();
};

function initParticles() {
  particles = [];
  var count = Math.floor((canvas.width * canvas.height) / 12000);
  for (var i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
initParticles();
window.addEventListener("resize", initParticles);

function connectParticles() {
  for (var i = 0; i < particles.length; i++) {
    for (var j = i + 1; j < particles.length; j++) {
      var dx   = particles[i].x - particles[j].x;
      var dy   = particles[i].y - particles[j].y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        var alpha = 1 - dist / 120;
        ctx.strokeStyle = "rgba(0,212,255," + alpha * 0.15 + ")";
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function (p) { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== 3D TILT EFFECT ON CARDS =====
document.querySelectorAll(".tilt-card").forEach(function (card) {
  card.addEventListener("mousemove", function (e) {
    var rect   = card.getBoundingClientRect();
    var x      = e.clientX - rect.left;
    var y      = e.clientY - rect.top;
    var cx     = rect.width  / 2;
    var cy     = rect.height / 2;
    var rotateX = ((y - cy) / cy) * -8;
    var rotateY = ((x - cx) / cx) *  8;
    card.style.transform    = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale(1.03)";
    card.style.transition   = "transform 0.1s ease";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform  = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
    card.style.transition = "transform 0.5s ease";
  });
});

// ===== NAVBAR SHRINK ON SCROLL =====
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== MOBILE MENU =====
function toggleMenu() {
  var ul = document.querySelector("nav ul");
  ul.classList.toggle("open");
}

// ===== ANIMATED SKILL BARS =====
function animateSkillBars() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fills = entry.target.querySelectorAll(".skill-bar-fill");
        fills.forEach(function (fill) {
          var width = fill.getAttribute("data-width");
          fill.style.width = width + "%";
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var barsSection = document.querySelector(".skill-bars");
  if (barsSection) observer.observe(barsSection);
}

// ===== EVENT HANDLING =====
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    var ul = document.querySelector("nav ul");
    ul.classList.remove("open");
  }
});

document.addEventListener("change", function (e) {
  console.log("Field changed:", e.target.id || e.target.name);
});

// ===== FORM VALIDATION =====
function validateForm() {
  var name     = document.getElementById("fname").value.trim();
  var email    = document.getElementById("femail").value.trim();
  var password = document.getElementById("fpassword").value;
  var subject  = document.getElementById("fsubject").value;
  var message  = document.getElementById("fmessage").value.trim();
  var agree    = document.getElementById("fagree").checked;
  var msg      = document.getElementById("formMsg");

  if (!name)    { showMsg(msg, "#ff6b6b", "❌ Please enter your name!"); return; }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) { showMsg(msg, "#ff6b6b", "❌ Please enter a valid email!"); return; }

  if (password.length < 6) { showMsg(msg, "#ff6b6b", "❌ Password must be at least 6 characters!"); return; }
  if (!subject)             { showMsg(msg, "#ff6b6b", "❌ Please select a subject!"); return; }
  if (!message)             { showMsg(msg, "#ff6b6b", "❌ Please write a message!"); return; }
  if (!agree)               { showMsg(msg, "#ff6b6b", "❌ Please agree to be contacted!"); return; }

  showMsg(msg, "#00d4ff", "✅ Message sent! I'll get back to you soon.");

  setTimeout(function () {
    document.getElementById("fname").value     = "";
    document.getElementById("femail").value    = "";
    document.getElementById("fpassword").value = "";
    document.getElementById("fsubject").value  = "";
    document.getElementById("fmessage").value  = "";
    document.getElementById("fagree").checked  = false;
    msg.textContent = "";
  }, 3000);
}

function showMsg(el, color, text) {
  el.style.color   = color;
  el.textContent   = text;
}
