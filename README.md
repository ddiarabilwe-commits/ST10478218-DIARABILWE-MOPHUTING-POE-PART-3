# Rayton Home Bakery Website – WEDE5020 Part 3

## Project overview
This project presents Rayton Home Bakery and its products to customers in Rayton, Gauteng. The original bakery colour scheme, product photographs and page styling have been retained. Part 3 adds JavaScript interaction, separate enquiry and contact forms, form validation and SEO files.

## Website pages
- `index.html` – home page, bakery information, product menu, product search/filter/sort, specials, gallery lightbox and location map.
- `enquiry.html` – product/service enquiry form. It validates the customer details, calculates an estimated starting price for standard products and sends the enquiry through FormSubmit AJAX.
- `contact.html` – general contact form. After validation, JavaScript compiles the supplied details into a `mailto:` email addressed to `ddiiarabilwe@gmail.com`; the customer must press Send in their email application.

## JavaScript functionality
- Mobile navigation opens and closes with a button.
- Product cards can be searched, filtered by category and sorted by starting price or name.
- Gallery images open in a lightbox; the Escape key or close button closes it.
- Sections use a small scroll-reveal transition, with a fallback where IntersectionObserver is unavailable.
- Reusable validation functions check required values, email and telephone formats, character lengths, number ranges and selected options. Errors are shown beside the relevant fields.
- The enquiry page uses an array-like product price lookup and conditional logic to calculate a starting estimate. Custom orders require an individual quote.
- The contact page creates a pre-filled email using the validated form values.

The code uses the WEDE5020 lesson patterns for conditional statements, arrays, functions and form validation: read field values, test conditions, show feedback and prevent invalid submission (The IIE, 2026).

## Form activation and limitations
The enquiry form posts to FormSubmit at `ddiiarabilwe@gmail.com`. FormSubmit may require the mailbox owner to confirm/activate the address on its first use. Check the inbox and spam folder and complete the activation before expecting live enquiries. A successful browser response should be tested with a real submission. The contact form uses `mailto:`; it depends on the visitor having an email application configured and does not send in the background.

The prices shown are starting estimates only, not confirmed quotes or bookings. Availability and final prices must be confirmed by the bakery. Browser-side validation improves the form experience but is not a security measure; a production service must validate submitted data on the server as well. Do not collect passwords or payment-card details in these forms.

## SEO work
- Each page has a descriptive title, meta description, keywords and canonical URL.
- Heading levels structure the content; images have descriptive alternative text.
- Internal links connect the home, enquiry and contact pages.
- The layout includes mobile navigation and responsive CSS.
- `robots.txt` allows public pages to be crawled and points to the sitemap.
- `sitemap.xml` lists the three published HTML pages.
- The home page includes Bakery structured data and social-sharing metadata.
- Local search wording includes Rayton and Gauteng. External backlinks and social-media promotion require real accounts/partners and have not been fabricated.

## Project structure
- `index.html`, `enquiry.html`, `contact.html` – website pages.
- `css/style.css` – shared stylesheet extracted from the existing page styles; original visual rules retained.
- `js/main.js` – navigation, menu filtering, gallery, animations, price estimate and form validation/submission.
- `robots.txt` and `sitemap.xml` – crawler guidance and page list.

## Run and test in Visual Studio Code
1. Extract the project ZIP.
2. Open the `rayton_unique` folder in Visual Studio Code.
3. Open `index.html` with Live Server or in a browser.
4. Test all navigation links and open `enquiry.html` and `contact.html`.
5. Test empty fields, an invalid email, a short message, an invalid phone number and valid entries.
6. On the enquiry page, select bread, cake and pastries with different quantities and confirm the estimate changes.
7. Search and sort the menu, open a gallery image and close it with Escape.
8. Test form delivery only after FormSubmit activation. For the contact page, confirm that a mail application opens and that the message is populated.
9. Run `node --check js/main.js` if Node.js is installed.

## GitHub Pages deployment
1. Push the contents of `rayton_unique` to the root of the GitHub repository (so `index.html`, `css`, `js`, `enquiry.html`, `contact.html`, `robots.txt` and `sitemap.xml` are at repository root).
2. In GitHub, open **Settings → Pages**.
3. Select the correct publishing branch and `/ (root)` folder, then save. The uploaded deployment guide demonstrates choosing the branch, saving and refreshing for the published URL (The IIE, 2026).
4. Wait for GitHub Pages to publish, then open the generated website URL and test the three pages.
5. If the repository name or published URL changes, update the canonical links in the HTML files and the sitemap/robots URLs.

The repository changes must be committed and pushed from the student's GitHub account. This ZIP does not claim that commits, remote pushes or live deployment have already taken place.

## Changelog

### 2 November 2026 – Part 3 refinements based on Part 2 feedback

The following changes were made after reviewing the Part 2 lecturer feedback (78/100, Level 4). The feedback praised the external stylesheet and responsive breakpoints, while identifying improvements needed in styling consistency, page layout, mobile navigation, documentation, changelog detail and Harvard referencing.

| Part 2 feedback | Improvement recorded in Part 3 |
|---|---|
| Default CSS styles were present but could be improved. | Added a consistent set of CSS custom properties for the bakery's cocoa-brown, cream and gold palette; standardised base font sizing, line-height, headings, borders and form controls. |
| Typography was present but inconsistent. | Standardised heading line-height and responsive heading sizes; improved paragraph line-height, readable text width and section-intro spacing. |
| Layout and alignment needed refinement. | Added consistent section padding, card borders, card spacing and form-control sizing; refined header alignment at desktop, tablet and mobile widths. |
| Decoration and colour were incomplete or inconsistent. | Applied the same warm bakery palette to the header, navigation, cards, buttons, form fields and footer, with clearer contrast between text and backgrounds. |
| Responsive layout and typography needed small adjustments. | Added specific tablet and mobile layout rules, fluid heading sizes, full-width small-screen form controls and responsive image sizing. |
| Mobile navigation had significant issues. | Made the menu toggle visible at tablet/mobile widths, kept navigation hidden until opened, arranged links vertically on phones and in a grid on tablets, and added Escape-key closing plus updated accessible labels. |
| README and changelog needed improvement. | Expanded this README with page descriptions, JavaScript features, form limitations, testing instructions, deployment steps and a feedback-to-change table. Added dated, itemised development records. |
| References were incomplete or incorrectly formatted. | Reorganised the reference list alphabetically and standardised author, date, title, availability and access-date formatting where applicable. |
| GitHub commits lacked detail. | Added suggested commit-message examples below. Actual commits and pushes must still be made from the student's GitHub account. |

### 2 November 2026 – Part 3 implementation

- Separated the original combined order/contact form into `enquiry.html` and `contact.html`, giving each form a distinct purpose.
- Added enquiry fields for customer name, email, telephone, product, quantity, preferred collection date and order details. Added client-side validation for required values, email/telephone formats, minimum text length and quantity range.
- Added a JavaScript starting-price estimate for bread (R30), cake (R280) and pastries (R20), multiplied by quantity. Custom orders require an individual quote; final prices and availability must be confirmed by the bakery.
- Connected the enquiry form to FormSubmit AJAX with sending, success and error feedback. First-use activation by the mailbox owner may be required.
- Added a separate general contact form for contact details, message type and message. After validation, JavaScript prepares an email addressed to the bakery; the visitor must press Send in their own email application.
- Added reusable JavaScript validation helper functions and inline error messages using `.value`, `.trim()`, `.length`, `checkValidity()`, `classList` and `event.preventDefault()`.
- Added product search, category filtering and sorting by price/name using an array of product cards, `filter()`, `sort()` and conditional statements.
- Retained the gallery lightbox, scroll reveal and embedded map. Improved the mobile menu so it closes when a navigation link is selected or the Escape key is pressed. The menu button updates its accessible label and expanded state.
- Extracted the original embedded CSS into `css/style.css` and linked the stylesheet from all three HTML pages. Kept the original warm bakery identity while refining colour consistency, typography, layout spacing, form styling, keyboard focus and responsive navigation.
- Added page-specific SEO titles, descriptions, keywords, canonical links, social metadata, Bakery structured data, internal links, descriptive image alt text, `robots.txt` and a three-page `sitemap.xml`.
- Updated the README with project structure, setup, form limitations, SEO work, deployment instructions, testing steps, feedback mapping and Harvard-style references.

### Suggested GitHub commit history

Use separate commits with clear descriptions rather than one vague commit. For example:

1. `Extract shared CSS and link stylesheet to all pages`
2. `Improve responsive navigation for tablet and mobile`
3. `Add enquiry form validation and price estimate`
4. `Add contact form and JavaScript feedback`
5. `Implement product search filter and sorting`
6. `Add SEO metadata robots and sitemap`
7. `Update README changelog and Harvard references`

These are suggested messages only. They do not mean that commits have already been created or pushed.

## References (Harvard style)

FormSubmit (n.d.) *FormSubmit: Easy form endpoints*. Available at: https://formsubmit.co/ (Accessed: 2 November 2026).

Google (n.d.) *Google Maps URLs*. Available at: https://developers.google.com/maps/documentation/urls (Accessed: 2 November 2026).

MDN Web Docs (n.d.) *Client-side form validation*. Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation (Accessed: 2 November 2026).

MDN Web Docs (n.d.) *JavaScript Guide*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide (Accessed: 2 November 2026).

Schema.org (n.d.) *Bakery*. Available at: https://schema.org/Bakery (Accessed: 2 November 2026).

The Independent Institute of Education (The IIE) (2026a) *WEDE5020 JavaScript Basics: Conditional Statements, Arrays and Functions*. Rosebank International: internal module learning material.

The Independent Institute of Education (The IIE) (2026b) *WEDE5020 JavaScript Form Validation*. Rosebank International: internal module learning material.

The Independent Institute of Education (The IIE) (2026c) *Website Deployment on GitHub*. Rosebank International: internal module learning material.

WHATWG (n.d.) *HTML Living Standard*. Available at: https://html.spec.whatwg.org/ (Accessed: 2 November 2026).


### Enquiry access fix
The full product/order enquiry form is also embedded in `index.html`. The home-page
Enquiry navigation links and the “MAKE AN ENQUIRY” call-to-action now jump directly
to `#enquiry-form-section`. This allows the enquiry form to open even in simple
single-page HTML previews where links to sibling HTML files may not be supported.
The separate `enquiry.html` page is retained for normal multi-page hosting.
