import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Group, Sphere } from 'three';
import SimplexNoise from "https://cdn.JsDelivr.net/npm/simplex-noise/dist/esm/simplex-noise.min.js";
import { BoundingBoxHelper } from 'three';
import { setQuaternionFromProperEuler } from 'three/src/math/MathUtils';

let controls;
let camera, scene, renderer;
let container, stats;


// 순서: init(필요한 것 만들기) >> animate(render, stats update- 바뀐 점 업데이트) >> vizInit(play)
init();
animate();

// init function
function init() {
    container = document.getElementById( "container" );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(1, 20, 100);


    // Orbit Controller
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPloarAngle = Math.PI * 0.495;
    controls.target.set( 0, 10, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    stats = new Stats();
    container.appendChild( stats.dom );

};


// animate function
function animate() {
    requestAnimationFrame(animate);
    // 여기를 기점으로 색깔 등 요소 변경을 추가하면됨
    render();
    stats.update(); // 왜냐면 여기에 DOM 에서 바뀐 점이 업데이트되기 때문
  }


// render function
function render() {
  renderer.render(scene, camera);
}


// load music
// var noise = new SimplexNoise();

var vizInit = function () {

  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  var fileLabel = document.querySelector("label.file");

  document.onload = function(e){
    audio.play();
    play();
  }

  file.onchange = function(){
    fileLabel.classList.add('normal');
    var files = this.files;

    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play(); // 음악이 load 되자마자 시각화 요소를 불러옴
    play();  // play - 시각화 요소 불러오기
  }

  function play() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
  
    var group = new THREE.Group();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,100);
    camera.lookAt(scene.position);
    scene.add(camera);
  
    // window.addEventListener('resize', 1, false);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry
    var SphereGeometry = new THREE.SphereGeometry(15, 15, 15);
    var SphereMaterial = new THREE.MeshLambertMaterial({
      color: '#FFFFFF',
      wireframe: true
    });

    var ballCenter = new THREE.Mesh(SphereGeometry, SphereMaterial);
    var ballLeft = new THREE.Mesh(SphereGeometry, SphereMaterial);
    var ballRight = new THREE.Mesh(SphereGeometry, SphereMaterial);

    ballCenter.position.set(0, 0, 0);
    ballLeft.position.set(-80, 0, 30);
    ballRight.position.set(80, 0, 30);
    group.add(ballCenter);
    group.add(ballLeft);
    group.add(ballRight);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    
    spotLight.lookAt(ballCenter);
    spotLight.lookAt(ballLeft);
    spotLight.lookAt(ballRight);
    spotLight.castShadow = true;
    scene.add(spotLight);

    scene.add(group);
    document.getElementById('container').appendChild(renderer.domElement);

    
    render(); // render - 음악에 맞는 시각화 모션 불러오기
    


    function render() {
      // customization rendering
      var userColor = document.querySelector('#userCustom').innerHTML;
      SphereMaterial.color = new THREE.Color(userColor);

      // music rendering
      analyser.getByteFrequencyData(dataArray);
      var lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
      var upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);

      var overallAvg = avg(dataArray);
      var lowerMax = max(lowerHalfArray);
      var lowerAvg = avg(lowerHalfArray);
      var upperMax = max(upperHalfArray);
      var upperAvg = avg(upperHalfArray);

      var lowerMaxFr = lowerMax / lowerHalfArray.length;
      var lowerAvgFr = lowerAvg / lowerHalfArray.length;
      var upperMaxFr = upperMax / upperHalfArray.length;
      var upperAvgFr = upperAvg / upperHalfArray.length;

      var time = performance.now() * 0.0001;
      ballCenter.position.z = Math.sin(time) * 20 + 5;
      ballCenter.position.y = upperMaxFr * 50;
      ballCenter.rotation.x = time * 0.7;

      ballLeft.rotation.x = time * 0.7;
      ballLeft.position.z = - upperMaxFr * 50; 
      ballLeft.rotation.y = time * 0.51;

      ballRight.position.z = - upperMaxFr * 50;
      ballRight.rotation.x = time * 0.7;
      ballRight.rotation.y = time * 0.51;

      renderer.render(scene, camera);
      requestAnimationFrame(render);

      audio.play();

    }
  }
}


window.onload = vizInit();
// document.body.addEventListener('touchend', function(ev) { context.resume(); });

//some helper functions here
function fractionate(val, minVal, maxVal) {
  return (val - minVal)/(maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
  var fr = fractionate(val, minVal, maxVal);
  var delta = outMax - outMin;
  return outMin + (fr * delta);
}

function avg(arr){
  var total = arr.reduce(function(sum, b) { return sum + b; });
  return (total / arr.length);
}

function max(arr){
  return arr.reduce(function(a, b){ return Math.max(a, b); })
}