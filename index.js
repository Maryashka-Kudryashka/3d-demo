import { vertices, faces } from "./coordinates.js"

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
const spotLight = new THREE.SpotLight();
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
const light = new THREE.AmbientLight(0x404040); // soft white light
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const geometry = new THREE.Geometry();
const verticesVectors = vertices.map(el => new THREE.Vector3(el[0], el[1], el[2]))
const facesVectors = faces.map(el => new THREE.Face3(el[0], el[1], el[2]))

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
spotLight.position.set(300, 200, 100);
spotLightHelper.update();
// spotLight.add(spotLightHelper);
scene.background = new THREE.Color("#ffffff");
scene.add(spotLight);
scene.add(light);
geometry.vertices.push(...verticesVectors)
geometry.faces.push(...facesVectors)
geometry.computeVertexNormals();
geometry.normalize();

const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshPhongMaterial({
    color: "#ba8da0",
    side: THREE.DoubleSide,
    flatShading: true
  })
);

scene.add(mesh);

camera.position.z = 1.5;
camera.position.y = 1;
camera.position.x = 1.3;
camera.rotation.x = -0.8;
camera.rotation.y = 0.4;
camera.rotation.z = 0.4;

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
