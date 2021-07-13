import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// console.log(THREE.PerspectiveCamera);

//Cursor
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);
});

//Scene
const scene = new THREE.Scene();

//Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Debug
const gui = new dat.GUI();
const params = {
	color: 0xff0000, // material ke color jaise rkh yeh bar ka h vo material ka tha
	spin: () => {
		gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
	},
};
gui.add(mesh.position, "x", -3, 3, 0.01).name("twekX");
// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "z", -3, 3, 0.01);
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(params, "color").onChange(() => {
	material.color.set(params.color);
});
gui.add(params, "spin");

//sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	//Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	//Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	//Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

//Camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	1,
	1000
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );
// camera.position.x = 2;
// camera.position.y  = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas
	canvas,
});
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

renderer.setSize(sizes.width, sizes.height);

// //Time
// let time = Date.now();

// //Clock
const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

//Animation
const tick = () => {
	// //time ms
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	//clock sec
	const elapsedTime = clock.getElapsedTime();

	//Update objects
	// mesh.rotation.y += 0.002 * deltaTime;
	// mesh.rotation.y += 1 * elapsedTime; wrong ab add nhi karega bar bar
	// mesh.rotation.y = elapsedTime;

	// mesh.rotation.y = elapsedTime * Math.PI * 2; //360
	// mesh.position.y = Math.sin(elapsedTime); //sin ka graph
	// mesh.position.x = Math.cos(elapsedTime);
	// camera.position.y = Math.sin(elapsedTime); //sin ka graph
	// camera.position.x = Math.cos(elapsedTime);
	// camera.lookAt(mesh.position); // camera circle meh ghumke obj ko dekh rha h

	//Update Camera
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
	// camera.position.y = cursor.y * 5;
	// // camera.lookAt(new THREE.Vector3());
	// camera.lookAt(mesh.position);

	//Update controls
	controls.update();

	//Renderer
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
