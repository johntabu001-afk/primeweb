document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("show");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) link.classList.add("active");
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("#contact-form, #training-form");
  if (!forms.length) return;

  function showStatus(form, message, isError) {
    const status = form.querySelector(".form-status");
    status.textContent = message;
    status.style.color = isError ? "#b42318" : "#16834a";
  }

  if (!window.firebase || !window.firebaseConfig
    || !window.firebaseConfig.apiKey
    || !window.firebaseConfig.projectId
    || !window.firebaseConfig.appId) {
    forms.forEach(form => showStatus(form, "Form setup is incomplete. Please contact us directly.", true));
    return;
  }

  let database;
  try {
    database = window.firebase.initializeApp(window.firebaseConfig).firestore();
  } catch (error) {
    console.error("Could not initialize Firebase:", error);
    forms.forEach(form => showStatus(form, "Could not connect to the form service. Please contact us directly.", true));
    return;
  }

  forms.forEach(form => {
    form.addEventListener("submit", async event => {
      event.preventDefault();

      const submitButton = form.querySelector('[type="submit"]');
      const values = new FormData(form);
      if (values.get("companyWebsite")) return;

      const isContactForm = form.id === "contact-form";
      const submission = {
        name: values.get("name").trim(),
        email: values.get("email").trim(),
        phone: (values.get("phone") || "").trim(),
        createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
      };

      if (isContactForm) {
        submission.subject = values.get("subject").trim();
        submission.message = values.get("message").trim();
      } else {
        submission.course = values.get("course").trim();
        submission.level = (values.get("level") || "").trim();
      }

      submitButton.disabled = true;
      showStatus(form, "Submitting your enquiry...", false);

      try {
        const collection = isContactForm ? "contactSubmissions" : "trainingSubmissions";
        await database.collection(collection).add(submission);
        form.reset();
        showStatus(form, "Thank you. Your enquiry has been submitted.", false);
      } catch (error) {
        console.error("Could not submit enquiry:", error);
        showStatus(form, "Could not submit your enquiry. Please try again or contact us directly.", true);
      } finally {
        submitButton.disabled = false;
      }
    });
  });
});
