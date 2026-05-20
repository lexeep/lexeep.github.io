import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

fetch("/assets/icons/dice.svg")
  .then((r) => r.text())
  .then((svg) => {
    const fixed = svg.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    document.getElementById("dice-btn").innerHTML = fixed;
  });

const list = document.querySelector(".model-list");

function updateMask() {
  const atStart = list.scrollLeft <= 4;
  const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;

  list.classList.remove("fade-left", "fade-right", "fade-both");

  if (!atStart && !atEnd) list.classList.add("fade-both");
  else if (!atStart) list.classList.add("fade-left");
  else if (!atEnd) list.classList.add("fade-right");
}

list.addEventListener("scroll", updateMask);
updateMask();

const canvas = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
camera.position.set(0, 0, 4);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.cursorStyle = "grab";

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xfff5e0, 4);
keyLight.position.set(5, 10, 5);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xc9e8ff, 1.5);
fillLight.position.set(-5, 2, -3);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xffffff, 2);
rimLight.position.set(0, -3, -6);
scene.add(rimLight);

// Handles all resize logic in one place
function onResize() {
  const W = canvas.parentElement.clientWidth;
  const H = Math.round(W * 0.6);
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
}

// Run once on init, then on every resize
onResize();
window.addEventListener("resize", onResize);

let model = null;
const loader = new GLTFLoader();

function loadModel(path) {
  if (model) {
    scene.remove(model);
    model = null;
  }

  loader.load(
    path,
    (gltf) => {
      model = gltf.scene;

      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.roughness = Math.min(
            child.material.roughness ?? 0.8,
            0.6,
          );
          child.material.metalness = Math.max(
            child.material.metalness ?? 0.2,
            0.3,
          );
          child.material.needsUpdate = true;
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
      scene.add(model);

      const sphere = box.getBoundingSphere(new THREE.Sphere());
      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const distance = (sphere.radius / Math.sin(fovRad / 2)) * 1.2;

      camera.position.set(0, 0, distance);
      camera.near = distance / 100;
      camera.far = distance * 100;
      camera.updateProjectionMatrix();

      controls.target.set(0, 0, 0);
      controls.update();
    },
    (xhr) =>
      console.log(`${((xhr.loaded / xhr.total) * 100).toFixed(0)}% loaded`),
    (err) => console.error("Load error:", err),
  );
}

loadModel("/assets/models/Truck/TruckTest.glb");

document.querySelectorAll(".model-card").forEach((card) => {
  card.addEventListener("click", () => {
    document
      .querySelectorAll(".model-card")
      .forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    loadModel(card.dataset.path);
  });
});

const diceBtn = document.getElementById("dice-btn");

diceBtn.addEventListener("click", () => {
  const models = window.MODELS;
  const randomModel = models[Math.floor(Math.random() * models.length)];

  loadModel(randomModel.path);

  const isHovered = diceBtn.matches(":hover");
  diceBtn.style.setProperty("--spin-end", isHovered ? "345deg" : "360deg");
  diceBtn.classList.add("spinning");

  if (isHovered) {
    diceBtn.addEventListener(
      "mouseleave",
      () => {
        diceBtn.style.setProperty("--spin-end", "360deg");
      },
      { once: true },
    );
  }

  diceBtn.addEventListener(
    "animationend",
    () => {
      diceBtn.classList.remove("spinning");
    },
    { once: true },
  );
});

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.001;
    model.rotation.y += 0.001;
    model.rotation.z += 0.001;
  }
  renderer.render(scene, camera);
}

animate();
