gsap.registerPlugin(scrollTo);
gsap.registerPlugin(ScrollTrigger);

let showmenu = false;

function showMenu(e) {
  showmenu = !showmenu;
  e.target.classList.toggle("shown", showmenu);
  document.getElementById("nav-list").classList.toggle("view", showmenu);
}

function navigateTo(href, e) {
  if (e.target.localName === "i" || e.target.localName === "a") return;
  window.open(href, "_blank").focus();
}

let navLinks = [...document.getElementById("nav-list").children];

function activePage(e) {
  navLinks.forEach((link) => {
    link.children[0].classList.remove("active");
  });
  e.target.classList.add("active");

  switch (e.target.dataset.value) {
    case "home":
      gsap.to(window, { duration: 0.3, scrollTo: "#main-home" });
      console.log("home");
      break;
    case "about":
      gsap.to(window, { duration: 0.3, scrollTo: "#about-main" });
      console.log("about");
      break;
    case "skills":
      gsap.to(window, { duration: 0.3, scrollTo: "#skills-main" });
      console.log("skills");
      break;
    case "projects":
      gsap.to(window, { duration: 0.3, scrollTo: "#projects-main" });
      break;
    case "contact":
      gsap.to(window, { duration: 0.3, scrollTo: "#contact-main" });
      break;
    default:
      break;
  }
}

const wobbleStripe = (el) => {
  el.style.backgroundColor = "#0dd3a8";
  el.style.animationPlayState = "running";
};

const stopWobbleStripe = (el) => {
  setTimeout(() => {
    el.style.backgroundColor = "grey";
    el.style.animationPlayState = "paused";
  }, 800);
};

const hoverEffect = (e) => {
  for (const card of document.querySelectorAll(".skill-card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

const traits = (e, value) => {
  e.target.parentElement.children[0].classList.toggle("show", value);
  e.target.parentElement.children[2].classList.toggle("show", value);
};

const containers = [...document.getElementsByTagName("main")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      navLinks.forEach((link) => {
        if (link.innerText === entry.target.dataset.navlink)
          link.children[0].classList.add("active");
        else link.children[0].classList.remove("active");
      });
    });
  },
  {
    threshold: 0.6,
  }
);

containers.forEach((container) => {
  observer.observe(container);
});

const projects = [...document.getElementsByClassName("phone-container")];

const observerProjects = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (window.innerWidth < 850) {
        entry.target.classList.toggle("show", entry.isIntersecting);
        entry.target.style.transition = "all 0.3s";
      } else {
        entry.target.style.transition = "none";
      }
    });
  },
  {
    threshold: 0.3,
  }
);

projects.forEach((project) => {
  observerProjects.observe(project);
});

//checking if the gifs are loaded
const projectImages = document.querySelectorAll(".project-image");

let intervalID;
intervalID = setInterval(() => {
  let images = [];
  projectImages.forEach((image) => {
    images.push(image.complete);
  });

  if (images.filter((image) => image === false).length === 0) {
    console.log("loaded all");
    clearInterval(intervalID);

    const containerProjects = document.getElementById("projects-main")
      ? document.getElementById("projects-main")
      : "";
    const projectsLoader = document.getElementById("projects-loader")
      ? document.getElementById("projects-loader")
      : "";
    if (containerProjects !== "") containerProjects.classList.add("animate");
    if (projectsLoader !== "") projectsLoader.classList.add("fadeOut");
  }
});

//GSAP animations

gsap.to(".home-background", {
  scrollTrigger: {
    trigger: ".home-background",
    scrub: 1,
  },
  yPercent: -30,
  opacity: 0.01,
});

gsap.to(".skills-background", {
  scrollTrigger: {
    trigger: ".skills-background",
    scrub: 1,
  },
  yPercent: -30,
  opacity: 0.01,
});

gsap.from(".home-el", {
  scrollTrigger: {
    trigger: "#main-home",
    toggleActions: "restart reset restart pause ",
    start: "20% 80%",
    end: "80% 20%",
  },
  delay: 0.2,
  x: -300,
  opacity: 0,
  duration: 1.2,
  ease: "back",
});

gsap.from(".social-link", {
  scrollTrigger: {
    trigger: "#main-home",
    toggleActions: "restart reset restart pause ",
    start: "20% 80%",
    end: "80% 20%",
  },
  delay: 0.4,
  yPercent: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.3,
});

gsap.from("#images-home", {
  scrollTrigger: {
    trigger: "#main-home",
    toggleActions: "restart reset restart pause ",
    start: "20% 80%",
    end: "80% 20%",
  },
  scale: 0.3,
  duration: 0.5,
});

const frameTl = gsap.timeline({
  defaults: { duration: 0.4 },
  scrollTrigger: {
    trigger: "#about-main",
    toggleActions: "restart none none pause ",
    start: "20% 80%",
    end: "80% 20%",
  },
});

frameTl.to(".frame-about-top", { scaleX: 1 });
frameTl.to(".frame-about-left", { scaleY: 1 });
frameTl.to(".frame-about-bottom", { scaleX: 1 });
frameTl.to(".frame-about-right", { scaleY: 1 });

gsap.from(".about-el", {
  scrollTrigger: {
    trigger: "#about-main",
    toggleActions: "restart none none reset ",
    start: "20% 80%",
    end: "80% 20%",
  },

  xPercent: 10,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});

gsap.to(".h-line", {
  scrollTrigger: {
    trigger: "#skills-main",
    toggleActions: "restart none none reset ",
    start: "20% 80%",
    end: "80% 20%",
  },
  scaleX: 1,
  duration: 1.2,
});

gsap.from(".skill-card", {
  scrollTrigger: {
    trigger: "#skills-main",
    toggleActions: "restart none none reset ",
    start: "20% 80%",
    end: "80% 20%",
  },
  xPercent: -10,
  duration: 0.3,
  stagger: 0.1,
});

gsap.from(".skill-card-img", {
  scrollTrigger: {
    trigger: "#skills-main",
    toggleActions: "restart none none reset ",
    start: "20% 80%",
    end: "80% 20%",
  },
  yPercent: -20,
  opacity: 0.6,
  duration: 0.3,
  stagger: 0.1,
  delay: 0.4,
});
gsap.from(".projects-h1", {
  scrollTrigger: {
    trigger: "#projects-main",
    toggleActions: "restart none none reset ",
  },
  xPercent: -15,
  opacity: 0,
  duration: 0.5,
  ease: "back",
});

if (window.innerWidth > 850)
  gsap.from(".phone-container", {
    scrollTrigger: {
      trigger: "#projects-main",
      toggleActions: "restart none none reset ",
      start: "20% 80%",
      end: "80% 20%",
    },
    xPercent: -15,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "back",
  });
