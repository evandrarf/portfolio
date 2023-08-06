import projects from "../data/projects.json" assert { type: "json" };
import languages from "../data/languages.json" assert { type: "json" };

const renderProjects = () => {
  const projectContainer = document.querySelector(".project_list_container");

  projects.forEach((project) => {
    const projectElem = document.createElement("div");
    projectElem.classList.add("project");
    projectElem.innerHTML = `<a
      href="${project.url}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="${project.image_path}" alt="${project.title}" />
      <span>
        <h5>${project.title}</h5>
      </span>
    </a>`;
    projectContainer.append(projectElem);
  });
};

const goToSection = (section) => {
  const sectionElem = document.querySelector(`#${section}`);
  sectionElem.scrollIntoView({ behavior: "smooth" });
};

const scrollTo = () => {
  const scrollBtn = document.querySelectorAll(".nav_link");

  scrollBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      goToSection(btn.dataset.section);
    });
  });

  const navTitle = document.querySelector(".nav_title");
  navTitle.addEventListener("click", (e) => {
    e.preventDefault();
    goToSection(navTitle.dataset.section);
  });
};

const hideNav = () => {
  const nav = document.querySelector(".nav");

  let prevScroll = window.scrollY;

  window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;
    if (prevScroll < currentScroll) {
      nav.classList.add("hide");
    } else {
      nav.classList.remove("hide");
    }
    prevScroll = currentScroll;
  });
};

const sendEmail = () => {
  const form = document.querySelector(".contact_form");
  const name = document.getElementById("contact_name");
  const email = document.getElementById("contact_email");
  const message = document.getElementById("contact_message");
  const submit = document.getElementById("contact_submit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      name: name.value,
      email: email.value,
      text: message.value,
      subject: `You have a new message from ${name.value}`,
    };

    const url = "https://send-email.evandrarf.my.id/send-email";

    const lang = document.body.dataset.lang;

    const submitTextLoading = lang === "en" ? "Sending..." : "Mengirim...";
    const submitText = lang === "en" ? "Send" : "Kirim";

    submit.disabled = true;
    submit.innerHTML = submitTextLoading;
    form.classList.add("loading");

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        submit.disabled = false;
        submit.innerHTML = submitText;
        form.classList.remove("loading");
        if (res.status === 200) {
          alert("Email sent!");
          name.value = "";
          email.value = "";
          message.value = "";
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => {
        alert("Something went wrong!");
        submit.disabled = false;
        submit.innerHTML = submitText;
        form.classList.remove("loading");
      });
  });
};

const changeLanguageText = (langData) => {
  // Nav
  // const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav_link");

  navLinks.forEach((link, index) => {
    link.querySelector("a").innerHTML =
      langData.sections[0].content[index > 2 ? index - 3 : index];
  });

  // Home
  const homeHello = document.querySelector(".home_hello");
  const homeTitle = document.querySelector(".home_title");
  const homeDesc = document.querySelector(".home_desc");

  homeHello.innerHTML = langData.sections[1].content[1].content;
  homeTitle.innerHTML = langData.sections[1].content[0].content;
  homeDesc.innerHTML = langData.sections[1].content[2].content;

  // About
  const aboutTitle = document.querySelector(".about_me h4");

  aboutTitle.innerHTML = langData.sections[2].content;

  // Projects
  const projectTitle = document.querySelector(".project_list_title");
  const project_list_link = document.querySelector(".project_list_link");

  projectTitle.innerHTML = langData.sections[3].content[0].content;
  project_list_link.innerHTML = langData.sections[3].content[1].content;

  // Contact
  const contactTitle = document.querySelector(".contact_title");
  const contactButton = document.querySelector("#contact_submit");
  const contactName = document.querySelector(".contact_name");
  const contactEmail = document.querySelector(".contact_email");
  const contactMessage = document.querySelector(".contact_message");

  contactTitle.innerHTML = langData.sections[4].content[1].content;
  contactButton.innerHTML = langData.sections[4].content[0].content;
  contactName.placeholder = langData.sections[4].content[2].content[0];
  contactEmail.placeholder = langData.sections[4].content[2].content[1];
  contactMessage.placeholder = langData.sections[4].content[2].content[2];
};

const changeLanguage = () => {
  const languageBtns = document.querySelectorAll(".nav_lang");

  languageBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;

      const langData = languages.find((language) => {
        return language.lang === lang.toLowerCase();
      });

      document.body.dataset.lang = lang;

      btn.parentElement.querySelectorAll("a").forEach((link) => {
        link.classList.remove("active");
      });
      btn.querySelector("a").classList.add("active");

      changeLanguageText(langData);
    });
  });
};

const toggleMenu = () => {
  const menuBtn = document.querySelector(".nav_bar_icon");

  menuBtn.addEventListener("click", () => {
    const nav = document.querySelector(".nav_menu");
    nav.classList.add("active");
  });

  const closeBtn = document.querySelector(".nav_menu_close");

  closeBtn.addEventListener("click", () => {
    const nav = document.querySelector(".nav_menu");
    nav.classList.remove("active");
  });
};

toggleMenu();
renderProjects();
scrollTo();
hideNav();
sendEmail();
changeLanguage();
