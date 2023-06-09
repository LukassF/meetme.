import * as THREE from "three";
// import "./styles/style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
scene.background = null;

const sizes = {
  width: window.innerWidth / 2,
  height: window.innerHeight - 80,
};

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

const loadingManager = new THREE.LoadingManager();
const progressBar = document.querySelector("#progress-bar");
const loaderDiv = document.querySelector(".loader");
const navbar = document.querySelector("#nav-home");
const mainHome = document.querySelector("#main-home");

window.onload = () => {
  navbar.style.visibility = "hidden";
  mainHome.style.visibility = "hidden";
};

loadingManager.onProgress = (url, loaded, total) => {
  progressBar.value = (loaded / total) * 100;
};
loadingManager.onLoad = () => {
  loaderDiv.style.display = "none";
  navbar.style.visibility = "visible";
  mainHome.style.visibility = "visible";
  mainHome.classList.add("animate");
};

let loader = new GLTFLoader(loadingManager);
loader.load("./assets/earth.glb", (gltf) => {
  scene.add(gltf.scene);
});

window.addEventListener("resize", () => {
  if (window.innerHeight < 600) return;
  sizes.width =
    window.innerWidth > 1120 ? window.innerWidth / 2 : window.innerWidth;
  sizes.height =
    window.innerWidth > 1120
      ? window.innerHeight - 80
      : window.innerHeight - 270;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});
setInterval(() => {
  if (window.innerHeight < 600) return;
  sizes.width =
    window.innerWidth > 1120 ? window.innerWidth / 2 : window.innerWidth;
  sizes.height =
    window.innerWidth > 1120
      ? window.innerHeight - 80
      : window.innerHeight - 270;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
}, 10);

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
