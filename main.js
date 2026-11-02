const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('header nav');
if (navToggle && navigation) {
  navToggle.addEventListener('click', function () {
    const isOpen = navigation.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navToggle.textContent = isOpen ? 'Close menu' : '☰ Menu';
  });
  navigation.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      navToggle.textContent = '☰ Menu';
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      navToggle.textContent = '☰ Menu';
      navToggle.focus();
    }
  });
}


const productCards = Array.from(document.querySelectorAll('#menu .card'));
function filterProducts(items, searchText, category) {
  return items.filter(function (card) {
    const productName = (card.dataset.name || card.textContent).toLowerCase();
    const matchesText = productName.includes(searchText.toLowerCase());
    const matchesCategory = category === 'all' || card.dataset.category === category;
    return matchesText && matchesCategory;
  });
}
function sortProducts(items, choice) {
  const sortedItems = [...items];
  if (choice === 'low') {
    sortedItems.sort(function (a, b) { return Number(a.dataset.price) - Number(b.dataset.price); });
  } else if (choice === 'high') {
    sortedItems.sort(function (a, b) { return Number(b.dataset.price) - Number(a.dataset.price); });
  } else if (choice === 'name') {
    sortedItems.sort(function (a, b) { return (a.dataset.name || '').localeCompare(b.dataset.name || ''); });
  }
  return sortedItems;
}
function displayProducts(items) {
  const container = document.querySelector('#menu .cards');
  if (!container) return;
  productCards.forEach(function (card) { card.hidden = true; });
  items.forEach(function (card) { card.hidden = false; container.appendChild(card); });
  const count = document.getElementById('product-count');
  if (count) count.textContent = items.length + ' product(s) found.';
  let emptyMessage = document.getElementById('no-products');
  if (emptyMessage) emptyMessage.remove();
  if (items.length === 0) {
    emptyMessage = document.createElement('p');
    emptyMessage.id = 'no-products';
    emptyMessage.textContent = 'No products match your search. Please try another search.';
    container.appendChild(emptyMessage);
  }
}
function updateMenu() {
  const search = document.getElementById('product-search');
  const category = document.getElementById('category-filter');
  const sort = document.getElementById('sort-products');
  const filtered = filterProducts(productCards, search ? search.value.trim() : '', category ? category.value : 'all');
  displayProducts(sortProducts(filtered, sort ? sort.value : 'default'));
}
['product-search', 'category-filter', 'sort-products'].forEach(function (id) {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('input', updateMenu);
    field.addEventListener('change', updateMenu);
  }
});
if (productCards.length) updateMenu();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
document.querySelectorAll('.gallery-item').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    const image = item.querySelector('img');
    if (image && lightbox && lightboxImage) {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  });
});
function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', function (event) { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeLightbox(); });

const revealSections = document.querySelectorAll('main section');
revealSections.forEach(function (section) { section.classList.add('reveal'); });
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); sectionObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealSections.forEach(function (section) { sectionObserver.observe(section); });
} else {
  revealSections.forEach(function (section) { section.classList.add('visible'); });
}

function showFieldError(field, message) {
  const error = document.getElementById(field.id + '-error');
  field.classList.add('error-input');
  field.classList.remove('success-input');
  field.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
}
function clearFieldError(field) {
  const error = document.getElementById(field.id + '-error');
  field.classList.remove('error-input');
  field.classList.add('success-input');
  field.setAttribute('aria-invalid', 'false');
  if (error) error.textContent = '';
}
function validateFields(fieldIds) {
  let isValid = true;
  fieldIds.forEach(function (id) {
    const field = document.getElementById(id);
    if (!field) return;
    const value = field.value.trim();
    let message = '';
    if (field.required && value === '') message = 'This field is required.';
    else if (field.type === 'email' && value !== '' && !field.checkValidity()) message = 'Enter a valid email address.';
    else if (field.type === 'tel' && value !== '' && !field.checkValidity()) message = 'Enter a valid phone number.';
    else if (field.minLength > 0 && value.length > 0 && value.length < field.minLength) message = 'Please enter at least ' + field.minLength + ' characters.';
    else if (field.type === 'number' && (Number(value) < Number(field.min) || Number(value) > Number(field.max))) message = 'Enter a quantity from ' + field.min + ' to ' + field.max + '.';
    if (message !== '') { showFieldError(field, message); isValid = false; }
    else clearFieldError(field);
  });
  return isValid;
}
function attachLiveValidation(fieldIds) {
  fieldIds.forEach(function (id) {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('input', function () { if (field.value.trim() !== '') validateFields([id]); });
      field.addEventListener('change', function () { validateFields([id]); });
    }
  });
}

const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  const enquiryFields = ['enq-name', 'enq-email', 'enq-phone', 'enq-product', 'enq-quantity', 'enq-date', 'enq-details'];
  const productInput = document.getElementById('enq-product');
  const quantityInput = document.getElementById('enq-quantity');
  const estimate = document.getElementById('estimate');
  const dateInput = document.getElementById('enq-date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
  attachLiveValidation(enquiryFields);
  function calculateEstimate() {
    const prices = { bread: 30, cake: 280, pastries: 20 };
    const product = productInput.value;
    const quantity = Number(quantityInput.value);
    if (product === 'custom') estimate.textContent = 'A custom order or catering request needs an individual quote. The bakery will confirm the price and availability.';
    else if (Object.prototype.hasOwnProperty.call(prices, product) && quantity > 0) estimate.textContent = 'Estimated starting price: R' + (prices[product] * quantity).toFixed(2) + '. Final price and availability will be confirmed by the bakery.';
    else estimate.textContent = 'Choose a product and quantity to see an estimated starting price.';
  }
  productInput.addEventListener('change', calculateEstimate);
  quantityInput.addEventListener('input', calculateEstimate);
  enquiryForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const feedback = document.getElementById('enquiry-feedback');
    const submitButton = enquiryForm.querySelector('button[type="submit"]');
    const isValid = validateFields(enquiryFields);
    if (!isValid) { feedback.textContent = 'Please correct the highlighted fields before submitting.'; return; }
    calculateEstimate();
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'SENDING...'; }
    feedback.textContent = 'Your details are being sent. Please wait.';
    try {
      const response = await fetch(enquiryForm.action, { method: 'POST', body: new FormData(enquiryForm), headers: { Accept: 'application/json' } });
      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') throw new Error('The email service did not accept the enquiry.');
      feedback.textContent = 'Thank you. Your enquiry has been submitted. The bakery will contact you to confirm the final price and availability.';
      enquiryForm.reset();
      enquiryFields.forEach(function (id) { const field = document.getElementById(id); if (field) { field.classList.remove('success-input', 'error-input'); field.removeAttribute('aria-invalid'); } const error = document.getElementById(id + '-error'); if (error) error.textContent = ''; });
      calculateEstimate();
    } catch (error) {
      feedback.textContent = 'The enquiry could not be sent right now. Please email ddiiarabilwe@gmail.com or try again later. The estimate above is not a confirmed booking.';
      console.error('Enquiry submission error:', error);
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = 'SUBMIT ENQUIRY'; }
    }
  });
  enquiryForm.addEventListener('reset', function () { window.setTimeout(calculateEstimate, 0); });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const contactFields = ['contact-name', 'contact-email', 'contact-phone', 'contact-type', 'contact-message'];
  attachLiveValidation(contactFields);
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const feedback = document.getElementById('contact-feedback');
    if (!validateFields(contactFields)) { feedback.textContent = 'Please correct the highlighted fields before preparing your email.'; return; }
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim() || 'Not provided';
    const type = document.getElementById('contact-type').value;
    const message = document.getElementById('contact-message').value.trim();
    const subject = encodeURIComponent('Rayton Home Bakery - ' + type);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nMessage type: ' + type + '\n\nMessage:\n' + message);
    feedback.textContent = 'Your email application should open with the message prepared. Please review it and press Send in your email application.';
    window.location.href = 'mailto:ddiiarabilwe@gmail.com?subject=' + subject + '&body=' + body;
  });
}
