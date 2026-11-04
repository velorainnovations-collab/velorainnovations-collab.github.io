/* ==========================================================================
   VELORA Innovations Private Limited — site behaviour
   Edit VELORA_CONTACT below to go live. Nothing else needs changing.
   ========================================================================== */

var VELORA_CONTACT = {
  // WhatsApp number in international format, digits only, no + or spaces.
  // Example for India: "919876543210"
  whatsapp: "919342011780",
  email: "velorainnovations@gmail.com",
  phone: "+91 93420 11780",
  // Shown in the footer and on the contact page.
  headOffice: "Rasipuram, Namakkal 637408",
  corporateOffice: "Besant Nagar, Chennai"
};

(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Contact details injected from the config above ---------- */

  var waLink = "https://wa.me/" + VELORA_CONTACT.whatsapp;

  document.querySelectorAll("[data-wa-link]").forEach(function (el) {
    var text = el.getAttribute("data-wa-text");
    el.setAttribute("href", text ? waLink + "?text=" + encodeURIComponent(text) : waLink);
  });

  document.querySelectorAll("[data-contact-email]").forEach(function (el) {
    el.textContent = VELORA_CONTACT.email;
    if (el.tagName === "A") el.setAttribute("href", "mailto:" + VELORA_CONTACT.email);
  });

  document.querySelectorAll("[data-contact-phone]").forEach(function (el) {
    el.textContent = VELORA_CONTACT.phone;
    if (el.tagName === "A") el.setAttribute("href", "tel:" + VELORA_CONTACT.phone.replace(/[^+\d]/g, ""));
  });

  document.querySelectorAll("[data-contact-head-office]").forEach(function (el) {
    el.textContent = VELORA_CONTACT.headOffice;
  });

  document.querySelectorAll("[data-contact-corporate-office]").forEach(function (el) {
    el.textContent = VELORA_CONTACT.corporateOffice;
  });

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Reveal on scroll ---------- */

  var revealables = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealables.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealables.forEach(function (el) { observer.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Enquiry form ---------- */

  var form = document.getElementById("enquiry-form");
  if (!form) return;

  // Pre-select a division when arriving from a division page
  // e.g. contact.html?division=VELORA%20Fresh
  var params = new URLSearchParams(window.location.search);
  var requested = params.get("division");
  var divisionField = form.elements.division;

  if (requested && divisionField) {
    Array.prototype.forEach.call(divisionField.options, function (option) {
      if (option.value.toLowerCase() === requested.toLowerCase()) {
        divisionField.value = option.value;
      }
    });
  }

  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = new FormData(form);
    var name = data.get("name") || "-";
    var company = data.get("company") || "-";
    var phone = data.get("phone") || "-";
    var email = data.get("email") || "";
    var division = data.get("division") || "-";
    var message = data.get("message") || "-";

    var lines = [
      "New enquiry from the VELORA website",
      "",
      "Name: " + name,
      "Company: " + company,
      "Phone: " + phone,
      "Email: " + (email || "-"),
      "Division: " + division,
      "",
      "Message:",
      message
    ];

    // 1. Open WhatsApp straight away (must happen inside the click, or browsers block the popup)
    window.open(waLink + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");

    // 2. Email the same enquiry to the company inbox via FormSubmit
    if (status) status.textContent = "Opening WhatsApp and sending your enquiry by email\u2026";

    var payload = {
      _subject: "Website enquiry: " + division + " \u2014 " + name,
      _template: "table",
      _captcha: "false",
      name: name,
      company: company,
      phone: phone,
      email: email,
      division: division,
      message: message
    };
    if (email) payload._replyto = email;

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;

    fetch("https://formsubmit.co/ajax/" + VELORA_CONTACT.email, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json && (json.success === "true" || json.success === true)) {
          if (status) status.textContent = "Thank you. Your enquiry has been emailed to us and is ready to send on WhatsApp.";
          form.reset();
        } else {
          throw new Error((json && json.message) || "Email relay did not accept the enquiry");
        }
      })
      .catch(function () {
        if (status) status.textContent = "WhatsApp is open with your enquiry. Email delivery could not be confirmed \u2014 please send the WhatsApp message or email us directly at " + VELORA_CONTACT.email + ".";
      })
      .then(function () {
        if (button) button.disabled = false;
      });
  });
})();

/* ---------- Home hero slideshow ---------- */

(function () {
  "use strict";

  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length < 2) return;

  var pills = document.querySelectorAll(".hero__divisions a");
  var index = 0;
  var INTERVAL = 5000;

  function show(next) {
    slides[index].classList.remove("is-active");
    if (pills[index]) pills[index].classList.remove("is-current");
    index = next;
    slides[index].classList.add("is-active");
    if (pills[index]) pills[index].classList.add("is-current");
  }

  if (pills[0]) pills[0].classList.add("is-current");

  var timer = setInterval(function () {
    show((index + 1) % slides.length);
  }, INTERVAL);

  // Hovering a division pill previews its photo immediately
  Array.prototype.forEach.call(pills, function (pill, i) {
    pill.addEventListener("mouseenter", function () {
      clearInterval(timer);
      show(i);
      timer = setInterval(function () { show((index + 1) % slides.length); }, INTERVAL);
    });
  });
})();
