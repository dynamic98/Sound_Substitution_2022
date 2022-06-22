import * as THREE from 'three';

let scene, camera, renderer, container, analyser, uniforms;
let group, geometry, material;
let ambientLight, spotLight;



init();

function init() {
    console.log("init function executed.");
    scene = new THREE.Scene();
  
    // canvas
    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.9);
    camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 2, 2000);
    camera.position.set(1, 20, 100);
  
    container = document.getElementById( "canvas" );
    container.appendChild( renderer.domElement )
  
    renderer.toneMapping = THREE.ACESFilmicToneMapping;  
  
    ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);
  
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
  
    spotLight.castShadow = true;
    scene.add(spotLight);
  
    group = new THREE.Group();
    scene.add(group);
  
    renderer.render(scene, camera);

  };