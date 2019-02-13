import * as THREE from "three";

const boxes = [
  {
    w: 5,
    h: 20,
    d: 5,
    x: 2.5,
    y: 10,
    z: 2.5,
    boxColor: 0x003300,
    cageColor: 0xffffff
  },
  {
    w: 5,
    h: 24,
    d: 5,
    x: 7.5,
    y: 12,
    z: 2.5,
    boxColor: 0x003377,
    cageColor: 0xffffff
  },
  {
    w: 5,
    h: 18,
    d: 5,
    x: 2.5,
    y: 9,
    z: 7.5,
    boxColor: 0x663377,
    cageColor: 0xffffff
  }
];

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

var material4 = new THREE.LineBasicMaterial({ color: 0xffffff });
var geometry4 = new THREE.Geometry();
geometry4.vertices.push(new THREE.Vector3(5, 0, 12));
geometry4.vertices.push(new THREE.Vector3(5, 30, 12));
var line4 = new THREE.Line(geometry4, material4);
scene.add(line4);

boxes.forEach(x => addBox({ box: x, scene }));

renderer.render(scene, camera);
// var animate = function() {
//   requestAnimationFrame(animate);

//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   cube.rotation.z += 0.01;

//   renderer.render(scene, camera);
// };

// animate();

function addBox({ box, scene }) {
  var bodyGeometry = new THREE.BoxGeometry(box.w, box.h, box.d);
  var bodyMaterial = new THREE.MeshBasicMaterial({ color: box.boxColor });
  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.x = box.x;
  body.position.y = box.y;
  body.position.z = box.z;
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
