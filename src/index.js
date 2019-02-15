import * as THREE from "three";
import { boxes } from "./objects.js";
import { addAxes, addBox } from "./utils";

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.set(0, 0, 100);
// camera.lookAt(0, 0, 0);
camera.position.x = -30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(0, 0, 0);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);

addAxes(scene)

//point light
var light = new THREE.PointLight(0xffffff, 1, 100);
var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);
light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));
light.position.set(15, 20, 15);
light.castShadow = true;
scene.add(light);

//ambient light
var amlight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(amlight);

//plane
var planeGeometry = new THREE.PlaneBufferGeometry(50, 50, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

boxes.forEach(x => addBox({ box: x, scene }));


//Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

var angle = 0;
var radius = 30;
var animate = function () {
  requestAnimationFrame(animate);

  camera.position.x = radius * Math.cos(angle);
  camera.position.z = radius * Math.sin(angle);
  camera.lookAt(0, 0, 0);
  angle += 0.01;

  renderer.render(scene, camera);
};

animate();

