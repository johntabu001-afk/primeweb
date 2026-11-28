# PrimeWeb Technologies Website

A responsive static website for PrimeWeb Technologies in Kericho, Kenya. It uses HTML, CSS and vanilla JavaScript, and is ready to host on Firebase Hosting. Contact and training enquiries are saved to Firebase Firestore.

## Set up Firebase

1. Create a Firebase project and register a Web app in Firebase Console.
2. Create a Cloud Firestore database.
3. Copy the Web app configuration into `js/firebase-config.js`.
4. Publish the included `firestore.rules` in Firestore's Rules tab. The rules allow new, validated contact and training submissions only; they do not allow public reads, edits or deletes.
5. These forms accept public writes without authentication. This starter does not initialize App Check; add the App Check web SDK and a provider before enabling enforcement to reduce automated abuse.

The Firebase web configuration is public and is not a secret. Do not put service-account keys or other private credentials in this website.

Form submissions are saved to `contactSubmissions` and `trainingSubmissions` in Firestore. This setup stores submissions; it does not send email notifications. Review submissions in the Firebase Console.

## Publish with Firebase Hosting

The website has no Node.js server or application dependencies. Connect the GitHub repository to Firebase Hosting using Firebase Console's Hosting GitHub integration, or deploy the project with the Firebase CLI. The included `firebase.json` serves the project root and excludes local configuration, dependencies and server files.

Before publishing:

- Replace the blank values in `js/firebase-config.js` with your Firebase Web app configuration.
- Replace `https://www.yourdomain.co.ke` with your real domain in each page's canonical tag, `robots.txt` and `sitemap.xml`.
- Replace placeholder email, phone and WhatsApp details.
- Replace sample portfolio and testimonial content with genuine, authorised examples.
- Add your production domain to Firebase Hosting and verify it over HTTPS.
- Submit `/sitemap.xml` in Google Search Console.

The site includes unique page titles and descriptions, canonical URLs, social-sharing metadata, structured data, `robots.txt` and `sitemap.xml`. The `meta keywords` tags are retained, though major search engines primarily rely on page content, titles, links and structured data.
