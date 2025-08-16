// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1200,
  once: true,
  easing: 'ease-in-out-cubic',
});

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('open'));
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    nav.classList.toggle('open');
    e.preventDefault();
  }
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.carousel-controls .prev');
const nextBtn = document.querySelector('.carousel-controls .next');
let testimonialIndex = 0;
function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
}
prevBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
});
nextBtn.addEventListener('click', () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
});
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 8000);

const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea');
function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const messageElem = field.nextElementSibling.nextElementSibling;
  if (!value) {
    messageElem.textContent = 'This field is required';
    field.setAttribute('aria-invalid', 'true');
    return false;
  }
  if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      messageElem.textContent = 'Please enter a valid email';
      field.setAttribute('aria-invalid', 'true');
      return false;
    }
  }
  messageElem.textContent = '';
  field.removeAttribute('aria-invalid');
  return true;
}
inputs.forEach(input => {
  input.addEventListener('input', () => validateField(input));
});
form.addEventListener('submit', e => {
  e.preventDefault();
  let allValid = true;
  inputs.forEach(input => { if (!validateField(input)) allValid = false; });
  if (!allValid) return;
  document.getElementById('thankyou-modal').classList.remove('hidden');
  form.reset();
  inputs.forEach(input => {
    const messageElem = input.nextElementSibling.nextElementSibling;
    messageElem.textContent = '';
    input.removeAttribute('aria-invalid');
  });
  document.getElementById('close-modal').focus();
});
const modal = document.getElementById('thankyou-modal');
document.getElementById('close-modal').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) modal.classList.add('hidden');
});

// Hero Parallax Background
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (window.scrollY < window.innerHeight) {
    hero.style.backgroundPosition = `center ${window.scrollY * 0.4}px`;
  }
});
