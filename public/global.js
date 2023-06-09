function showMenu() {
  document.getElementById("nav-list").classList.toggle("view");
}

function activePage(e) {
  let children = document.getElementById("nav-list").children;
  for (let i = 0; i < children.length; i++) {
    children[i].classList.remove("active");
  }
  e.target.classList.add("active");
}

const hoverEffect = (e) => {
  for (const card of document.querySelectorAll(".skill-card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

window.onload = () => {
  const containerSkills = document.getElementById("skills-container")
    ? document.getElementById("skills-container")
    : "";
  const containerAbout = document.getElementById("about-main")
    ? document.getElementById("about-main")
    : "";

  const containerContact = document.getElementById("contact-main")
    ? document.getElementById("contact-main")
    : "";
  if (containerSkills !== "") containerSkills.classList.add("animate");
  if (containerAbout !== "") containerAbout.classList.add("animate");

  if (containerContact !== "") containerContact.classList.add("animate");
};

const gallery = document.getElementById("gallery");
let counter = 0;

const slideLeft = () => {
  if (counter > 3) {
    gallery.style.transition = "none";
    gallery.style.transform = "translateX(0%)";

    counter = 0;
  }
  counter++;

  setTimeout(() => {
    gallery.style.transform = `translateX(-${counter * 100}vw)`;
    gallery.style.transition = "transform 0.5s";
  }, 10);

  for (let i = 0; i < 4; i++) {
    document.documentElement.style.setProperty(`--dot-${i}`, "transparent");
  }
  document.documentElement.style.setProperty(
    `--dot-${counter}`,
    "rgb(80, 80, 80)"
  );
  if (counter === 4) {
    document.documentElement.style.setProperty(`--dot-0`, "rgb(80, 80, 80)");
  }
};

const slideRight = () => {
  if (counter <= 0) {
    gallery.style.transition = "none";
    gallery.style.transform = "translateX(-400vw)";

    counter = 4;
  }
  counter--;

  setTimeout(() => {
    gallery.style.transform = `translateX(-${counter * 100}vw)`;
    gallery.style.transition = "transform 0.5s";
  }, 10);

  for (let i = 0; i < 4; i++) {
    document.documentElement.style.setProperty(`--dot-${i}`, "transparent");
  }
  document.documentElement.style.setProperty(
    `--dot-${counter}`,
    "rgb(80, 80, 80)"
  );
};

window.onresize = () => {
  if (gallery) gallery.style.transition = "none";

  if (window.innerWidth <= 700 && gallery)
    gallery.style.transform = "translateX(0)";
};

const showResume = () => {
  const resumeList = document.getElementById("resume-list");
  resumeList.style.visibility = "visible";
  resumeList.style.opacity = "1";
};
const hideResume = () => {
  const resumeList = document.getElementById("resume-list");
  resumeList.style.opacity = "0";
  setTimeout(() => {
    resumeList.style.visibility = "hidden";
  }, 400);
};

const projects = document.querySelectorAll(".phone-container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (window.innerWidth < 750) console.log(entry);
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  {
    threshold: 0.2,
  }
);

projects.forEach((project) => {
  observer.observe(project);
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
