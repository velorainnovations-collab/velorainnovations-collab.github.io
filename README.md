# VELORA Innovations Private Limited — corporate website

Plain static site: HTML, CSS and vanilla JavaScript. No build step, no dependencies.
Open `index.html` in a browser, or upload the whole folder to any host.

## Structure

```
index.html            Home
about.html            About Us
businesses.html       Our Businesses (overview)
partnerships.html     Partnerships
careers.html          Careers
contact.html          Contact Us (enquiry form)
businesses/
  velora-fresh.html
  maa-enterprise.html
  it-solutions.html
  real-estate.html
  construction.html
  transportation.html
assets/css/site.css   All styles
assets/js/site.js     Nav, scroll reveal, contact config, enquiry form
```

## Before going live — one file to edit

Open `assets/js/site.js` and fill in the block at the top:

```js
var VELORA_CONTACT = {
  whatsapp: "910000000000",            // digits only, with country code, no + or spaces
  email: "info@example.com",
  phone: "+91 00000 00000",
  headOffice: "Rasipuram, Namakkal 637408",
  corporateOffice: "Besant Nagar, Chennai"
};
```

Every phone, email, address and WhatsApp link on every page reads from this one object.

## How the enquiry form works

Submitting the form on `contact.html` does two things at once:

1. Opens WhatsApp with the enquiry pre-filled (name, company, phone, email, division, message).
2. Emails the same enquiry to `VELORA_CONTACT.email` through [FormSubmit](https://formsubmit.co),
   a free form-to-email relay that needs no account or API key.

**One-time activation:** the first time the form is submitted, FormSubmit sends an activation
email to velorainnovations@gmail.com. Click the link in it once; every enquiry after that is
delivered automatically. Until then, submissions are held.

Enquiries are not stored on the website itself. Replies go to the customer's email address
(`_replyto`), so you can reply straight from your inbox.

Division pages link to `contact.html?division=VELORA%20Fresh`, which pre-selects that
division in the form's dropdown.

## Things to replace

- **Photography.** Division cards use royalty-free Unsplash photos in `assets/img/`
  (one per division, 1200px wide). Replace any of them with your own photographs of your
  actual produce, warehouse, sites and vehicles — keep the same filenames and nothing else
  needs to change. The Transportation card currently shows a container port; a photo of
  your own vehicles would suit it better. The home hero cycles through all six photos
  (slides are listed in `index.html`, timing in `site.js`); each division page uses its
  own photo behind the hero.
- **Logo.** The header uses a lettermark ("V") built in CSS. Replace with an SVG logo when
  one exists.
- **Registered details.** Company address, CIN and GST number if you want them in the footer.

## Deploying

Upload the folder contents to the web root of your host, or push to a static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages) and point your domain at it.
Nothing needs to be compiled.
