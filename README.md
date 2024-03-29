# Serverless reCAPTCHA

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa8b9790-39ed-4665-bb44-8589eaf09e91/deploy-status)](https://app.netlify.com/sites/mailnovac/deploys)

## Use cases

- Hide email, phone numbers from scrapers
- Hide download links
- Special messages for humans

## To integrate this yourself

- Add the reCAPTCHA elements (`index.html` and `main.js`) to your page
- Register for your reCAPTCHA [here](https://www.google.com/recaptcha/admin/create), using your static site host name
- Obtain your `site key`, set it as `data-site-key` attribute in the reCAPTCHA form
- Obtain your `secret key`, set it as a Netlify environment variable `CAPTCHA_SECRET=...`
- Update your Netlify Function url (ending should resemble `.com/.netlify/functions/{function_name}`)
- Optional: set a Netlify environment variable `SECRET_MESSAGE=..` to return a message, or bake it into your serverless function

For verification flow: https://developers.google.com/recaptcha/docs/verify  
More Netlify Function examples: https://github.com/netlify/functions