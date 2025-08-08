// Basic interactive JS: filtering, search, modal, and simple form handling

document.addEventListener('DOMContentLoaded', function () {
  // set copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  const levelFilter = document.getElementById('levelFilter');
  const searchInput = document.getElementById('searchInput');
  const coursesGrid = document.getElementById('coursesGrid');
  const courseCards = Array.from(coursesGrid.querySelectorAll('.card'));
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = modal.querySelector('.modal-close');

  // Course details (could be richer; kept inline for demo)
  const courseDetails = {
    "HTML & CSS Fundamentals": {
      body: "Structure pages with HTML and style them with CSS. Build responsive layouts and a final project.",
      enroll: "#contact"
    },
    "JavaScript Essentials": {
      body: "Learn DOM, events, fetch API, promises, async/await and build interactive web pages.",
      enroll: "#contact"
    },
    "React & Component Design": {
      body: "Component patterns, hooks, state management basics, and small project using Create React App or Vite.",
      enroll: "#contact"
    },
    "Deploying on Cloud": {
      body: "Deploy static & dynamic apps to the cloud using VMs, storage, simple CI/CD, and HTTPS.",
      enroll: "#contact"
    }
  };

  // Filter logic
  function applyFilters() {
    const level = levelFilter.value;
    const q = (searchInput.value || '').trim().toLowerCase();

    courseCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('.card-desc').textContent.toLowerCase();
      const cardLevel = card.getAttribute('data-level');

      const matchesLevel = (level === 'all') || (cardLevel === level);
      const matchesQuery = title.includes(q) || desc.includes(q);

      card.style.display = (matchesLevel && matchesQuery) ? '' : 'none';
    });
  }

  levelFilter.addEventListener('change', applyFilters);
  searchInput.addEventListener('input', applyFilters);

  // Modal open when clicking Details
  coursesGrid.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-course]');
    if (!btn) return;
    const name = btn.getAttribute('data-course');
    const info = courseDetails[name] || { body: 'Details coming soon', enroll: '#contact' };
    modalTitle.textContent = name;
    modalBody.textContent = info.body;
    document.getElementById('modalEnroll').setAttribute('href', info.enroll);
    showModal();
  });

  function showModal() {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', hideModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) hideModal();
  });
  document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') hideModal();
  });

  // Simple contact form behavior (no server)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill all fields.';
      return;
    }

    // Simulate sending
    status.textContent = 'Sending message...';
    setTimeout(() => {
      status.textContent = 'Message sent! We will contact you soon.';
      form.reset();
    }, 900);
  });

  // Subscribe button behavior
  document.getElementById('subscribeBtn').addEventListener('click', () => {
    const email = prompt('Enter your email to subscribe:');
    if (email && email.includes('@')) {
      alert('Thanks! Subscribed: ' + email);
    } else if (email) {
      alert('Please enter a valid email.');
    }
  });
});
