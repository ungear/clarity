import * as THREE from "three";

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.set(0, 0, 100);
// camera.lookAt(0, 0, 0);
camera.position.x = 30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(0, 0, 0);
var scene = new THREE.Scene();

var material1 = new THREE.LineBasicMaterial({ color: 0xff0000 });
var geometry1 = new THREE.Geometry();
geometry1.vertices.push(new THREE.Vector3(0, 0, 0));
geometry1.vertices.push(new THREE.Vector3(10, 0, 0));
var line1 = new THREE.Line(geometry1, material1);

var material2 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
var geometry2 = new THREE.Geometry();
geometry2.vertices.push(new THREE.Vector3(0, 0, 0));
geometry2.vertices.push(new THREE.Vector3(0, 10, 0));
var line2 = new THREE.Line(geometry2, material2);

var material3 = new THREE.LineBasicMaterial({ color: 0x0000ff });
var geometry3 = new THREE.Geometry();
geometry3.vertices.push(new THREE.Vector3(0, 0, 0));
geometry3.vertices.push(new THREE.Vector3(0, 0, 10));
var line3 = new THREE.Line(geometry3, material3);

scene.add(line1);
scene.add(line2);
scene.add(line3);

renderer.render(scene, camera);
// var animate = function() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   cube.rotation.z += 0.01;

//   renderer.render(scene, camera);
// };

// animate();
