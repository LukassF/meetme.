gsap.registerPlugin(scrollTo);

function showMenu() {
  document.getElementById("nav-list").classList.toggle("view");
}

let navLinks = [...document.getElementById("nav-list").children];

function activePage(e) {
  navLinks.forEach((link) => {
    link.children[0].classList.remove("active");
  });
  e.target.classList.add("active");
  console.log(e.target.dataset);

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

const hoverEffect = (e) => {
  for (const card of document.querySelectorAll(".skill-card")) {
    const child = e.target.children[0].children[0];

    card.children[0].children[0].style.transform = "none";
    // console.log(child.classList.length);
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    const currentRect = e.target.getBoundingClientRect();

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    console.log(
      ((e.clientX - currentRect.left - card.clientWidth / 2) /
        card.clientWidth) *
        200
    );

    // if (child.classList.length === 0)
    //   child.style.transform = `translate(${
    //     -(
    //       (e.clientX - currentRect.left - card.clientWidth / 2) /
    //       card.clientWidth
    //     ) * 10
    //   }%, ${
    //     -(
    //       (e.clientY - currentRect.top - card.clientHeight / 2) /
    //       card.clientHeight
    //     ) * 10
    //   }%)`;
  }
};

const traits = (e, value) => {
  e.target.parentElement.children[0].classList.toggle("show", value);
  e.target.parentElement.children[2].classList.toggle("show", value);
};

// const showResume = () => {
//   const resumeList = document.getElementById("resume-list");
//   resumeList.style.visibility = "visible";
//   resumeList.style.opacity = "1";
// };
// const hideResume = () => {
//   const resumeList = document.getElementById("resume-list");
//   resumeList.style.opacity = "0";
//   setTimeout(() => {
//     resumeList.style.visibility = "hidden";
//   }, 400);
// };

const containers = [...document.getElementsByTagName("main")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(entry.target.dataset.navlink);
      navLinks.forEach((link) => {
        if (link.innerText === entry.target.dataset.navlink)
          link.children[0].classList.add("active");
        else link.children[0].classList.remove("active");
      });
      // entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.6,
  }
);

containers.forEach((container) => {
  observer.observe(container);
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
