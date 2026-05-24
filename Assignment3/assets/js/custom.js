/*
	custom.js
	Monash Pixel Arts Society — custom interactive features
	Two features:
	  1. Event filter (filter event cards by type)
	  2. FAQ accordion (expand/collapse answers)
	  3. Contact form validation
*/

(function () {

	/* ----------------------------------------
	   1. Event Filter
	   Clicking a filter button shows only
	   event cards matching that data-type.
	   "All" shows every card.
	---------------------------------------- */
	var filterButtons = document.querySelectorAll('.filter-btn');
	var eventCards = document.querySelectorAll('.event-card');

	filterButtons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			// Update active button
			filterButtons.forEach(function (b) {
				b.classList.remove('active');
			});
			btn.classList.add('active');

			var filter = btn.getAttribute('data-filter');

			eventCards.forEach(function (card) {
				if (filter === 'all' || card.getAttribute('data-type') === filter) {
					card.classList.remove('hidden');
				} else {
					card.classList.add('hidden');
				}
			});
		});
	});


	/* ----------------------------------------
	   2. FAQ Accordion
	   Clicking a question toggles its answer
	   open or closed. Only one open at a time.
	---------------------------------------- */
	var faqItems = document.querySelectorAll('.faq-item');

	faqItems.forEach(function (item) {
		var questionBtn = item.querySelector('.faq-question');
		if (!questionBtn) return;

		questionBtn.addEventListener('click', function () {
			var isOpen = item.classList.contains('open');

			// Close all items first
			faqItems.forEach(function (i) {
				i.classList.remove('open');
			});

			// If it was closed, open it now
			if (!isOpen) {
				item.classList.add('open');
			}
		});
	});


	/* ----------------------------------------
	   3. Contact Form Validation
	   Validates all fields before submission.
	   Shows inline error messages.
	   On success, hides the form and shows
	   a confirmation message.
	---------------------------------------- */
	var contactForm = document.getElementById('contact-form');
	var formSuccess = document.getElementById('form-success');

	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();

			var valid = true;

			// Helper: show or clear an error
			function setError(fieldId, errorId, message) {
				var field = document.getElementById(fieldId);
				var errorSpan = document.getElementById(errorId);
				if (!field || !errorSpan) return;

				if (message) {
					errorSpan.textContent = message;
					field.classList.add('input-error');
					valid = false;
				} else {
					errorSpan.textContent = '';
					field.classList.remove('input-error');
				}
			}

			// Name: required, at least 2 characters
			var nameVal = document.getElementById('contact-name').value.trim();
			if (nameVal.length < 2) {
				setError('contact-name', 'error-name', 'Please enter your full name (at least 2 characters).');
			} else {
				setError('contact-name', 'error-name', '');
			}

			// Email: required, basic format check
			var emailVal = document.getElementById('contact-email').value.trim();
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailVal)) {
				setError('contact-email', 'error-email', 'Please enter a valid email address.');
			} else {
				setError('contact-email', 'error-email', '');
			}

			// Topic: must select one
			var topicVal = document.getElementById('contact-topic').value;
			if (!topicVal) {
				setError('contact-topic', 'error-topic', 'Please select a topic.');
			} else {
				setError('contact-topic', 'error-topic', '');
			}

			// Message: required, at least 10 characters
			var messageVal = document.getElementById('contact-message').value.trim();
			if (messageVal.length < 10) {
				setError('contact-message', 'error-message', 'Please enter a message (at least 10 characters).');
			} else {
				setError('contact-message', 'error-message', '');
			}

			// If all valid, show success
			if (valid) {
				contactForm.style.display = 'none';
				if (formSuccess) {
					formSuccess.style.display = 'block';
				}
			}
		});

		// Clear error on input
		['contact-name', 'contact-email', 'contact-topic', 'contact-message'].forEach(function (id) {
			var el = document.getElementById(id);
			if (!el) return;
			var eventName = (el.tagName === 'SELECT') ? 'change' : 'input';
			el.addEventListener(eventName, function () {
				el.classList.remove('input-error');
				var errorId = 'error-' + id.replace('contact-', '');
				var errEl = document.getElementById(errorId);
				if (errEl) errEl.textContent = '';
			});
		});

		// Reset also clears errors
		contactForm.addEventListener('reset', function () {
			['contact-name', 'contact-email', 'contact-topic', 'contact-message'].forEach(function (id) {
				var el = document.getElementById(id);
				if (el) el.classList.remove('input-error');
			});
			['error-name', 'error-email', 'error-topic', 'error-message'].forEach(function (id) {
				var el = document.getElementById(id);
				if (el) el.textContent = '';
			});
		});
	}

})();
