import * as THREE from "three";
import { boxes } from "./objects.js";

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

var material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
var geometry1 = new THREE.Geometry();
geometry1.vertices.push(new THREE.Vector3(0, 0, 0));
geometry1.vertices.push(new THREE.Vector3(30, 0, 0));
var line1 = new THREE.Line(geometry1, material1);

var material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 30, 0));
var line2 = new THREE.Line(geometry2, material2);

var material3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry3 = new THREE.Geometry();
geometry3.vertices.push(new THREE.Vector3(0, 0, 0));
geometry3.vertices.push(new THREE.Vector3(0, 0, 30));
var line3 = new THREE.Line(geometry3, material3);

scene.add(line1);
scene.add(line2);
scene.add(line3);

var light = new THREE.PointLight(0xffffff, 1, 100);
var sphere = new THREE.SphereBufferGeometry(0.5, 16, 8);
light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff })));
light.position.set(15, 20, 15);
light.castShadow = true;
scene.add(light);

var amlight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(amlight);

boxes.forEach(x => addBox({ box: x, scene }));

var planeGeometry = new THREE.PlaneBufferGeometry(50, 50, 32, 32);
var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

//Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

renderer.render(scene, camera);
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

function addBox({ box, scene }) {
  var bodyGeometry = new THREE.BoxGeometry(box.w, box.h, box.d);
  var bodyMaterial = new THREE.MeshStandardMaterial({ color: box.boxColor });
  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.x = box.x;
  body.position.y = box.y;
  body.position.z = box.z;
  body.castShadow = true;
  scene.add(body);

  //var cageGeometry = new THREE.BoxBufferGeometry(box.w, box.h, box.d);
  var edge = new THREE.EdgesGeometry(bodyGeometry);
  var line = new THREE.LineSegments(
    edge,
    new THREE.LineBasicMaterial({ color: box.cageColor })
  );
  line.position.x = box.x;
  line.position.y = box.y;
  line.position.z = box.z;
  scene.add(line);
}
