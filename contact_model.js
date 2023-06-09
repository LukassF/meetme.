import * as THREE from "three";
// import "./styles/style.css";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const scene = new THREE.Scene();
scene.background = null;
let mixer;
const clock = new THREE.Clock();

const sizes = {
  width: 190,
  height: window.innerHeight - 80,
};
const loadingManager = new THREE.LoadingManager();
const progressBar = document.querySelector("#progress-bar");
const loaderDiv = document.querySelector(".loader");
const navbar = document.querySelector("#nav-home");
const mainContact = document.querySelector("#contact-main");
window.onload = () => {
  navbar.style.visibility = "hidden";
};
loadingManager.onProgress = (url, loaded, total) => {
  progressBar.value = (loaded / total) * 250;
};
loadingManager.onLoad = () => {
  loaderDiv.style.display = "none";
  navbar.style.visibility = "visible";
  mainContact.style.visibility = "visible";
  mainContact.classList.add("animate");
};

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = -100;
dirLight.shadow.camera.left = -120;
dirLight.shadow.camera.right = 120;
scene.add(dirLight);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
camera.position.y = 7;
scene.add(camera);

const canvas = document.querySelector("#contact-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const loader = new FBXLoader(loadingManager);
loader.load("./assets/Leaning On A Wall.fbx", (fbx) => {
  fbx.scale.setScalar(0.06);
  fbx.position.y = 0.2;

  mixer = new THREE.AnimationMixer(fbx);
  const animation = mixer.clipAction(fbx.animations[0]);
  animation.play();

  scene.add(fbx);
});

const loop = () => {
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
