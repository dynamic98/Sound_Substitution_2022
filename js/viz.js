'use strict';

import * as THREE from 'three';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline/src/THREE.MeshLine.js';
import { pickr, analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength} from './modules.js';
import { PlaneGeometry } from 'three';

// let controls;
let camera, scene, renderer;
let container, stats;
let customMenu;


// 소메뉴 클릭 html 요소
// 1. Line
const pitch_lineHeight = document.getElementById("pitchLineHeight");
const pitch_lineThickness = document.getElementById("pitchLineThickness");
const pitch_lineType = document.getElementById("pitchLineType");
const dynamic_lineHeight = document.getElementById("dynamicLineHeight");
const dynamic_lineThickness = document.getElementById("dynamicLineThickness");
const dynamic_lineType = document.getElementById("dynamicLineType");

// 2. Sphere
const pitch_sphereSize = document.getElementById("pitchSphereSize");

var now_geometry;
var group, geometry, material, compoCenter;
var ambientLight, spotLight;

// export var audio_context, audio, file, fileLabel, src;
// var dataArray, bufferLength;
// var chroma, maxChroma,energy, amplitudeSpectrum;
// BASIC EVENTS
init();
vizInit();
animate();


// REQUIRED FUNCTIONS
// init function
function init() {
  console.log("Main is Initiated");
  scene = new THREE.Scene();

  // canvas
  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth/2.24, window.innerHeight/2.1);
  camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 2, 2000);
  camera.position.set(1, 20, 100);

  container = document.getElementById( "canvas" );
  container.appendChild( renderer.domElement )

  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // Orbit Controller
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.maxPloarAngle = Math.PI * 0.495;
  // controls.target.set( 0, 10, 0 );
  // controls.minDistance = 40.0;
  // controls.maxDistance = 200.0;
  // controls.update();


  // stats = new Stats();
  // container.appendChild( stats.dom );
  // console.log(stats.dom);
  // document.getElementById("canvas1").appendChild( stats.dom );


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

  now_geometry = "shape_ring";
  createShapeRing();
};


// animate function
function animate() {

  // color rendering
  saveColor();
  changeBGColor();
  requestAnimationFrame(animate);
  // 여기를 기점으로 색깔 등 요소 변경을 추가하면됨

  // music rendering
  if (dataArray){
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

  // Geometry Rendering !
  if (now_geometry == 'pitch_line_height') {
    deleteBasics();     
    createShapeLineHeightPitch();
  } else if (now_geometry == 'pitch_line_thickness') {
    deleteBasics();     
    createShapeLineThicknessPitch();
  } else if (now_geometry == 'pitch_line_type') {
    deleteBasics();
    createShapeLineTypePitch();
  } else if (now_geometry == 'dynamic_line_height') {
    deleteBasics();
    createShapeLineHeightDynamics();
  } else if (now_geometry == 'dynamic_line_thickness') {
    deleteBasics();
    createShapeLineThicknessDynamics();
  } else if (now_geometry == 'dynamic_line_type') {
    deleteBasics();
    createShapeLineTypeDynamics();
  } else if (now_geometry == 'pitch_sphere_size'){
    deleteBasics();
    createShapeSphereSize();
  }
  // changeColorByChroma(material);
  render();
  }
  // stats.update(); // 왜냐면 여기에서 DOM 에서 바뀐 점이 업데이트되기 때문
}


// render function
function render() {
  renderer.render(scene, camera);
}

// geometry function
function createShapeLineHeightPitch(){ 

  const points = [];
  points.push( new THREE.Vector3( 30, -80, 0 ) );
  points.push( new THREE.Vector3( -100, 30, 0 ) );
  points.push( new THREE.Vector3( 70, 30, 0 ) );

  geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new MeshLine();
  line.setGeometry(geometry);
  line.setPoints(points);


  material = new MeshLineMaterial( {
    color: '#FFFFFF',
    lineWidth: 1 // linethickness >> 여기를 변수로 업뎃해주기
  } );

  changeLineColorbymaxChroma(material);
  compoCenter = new THREE.Mesh(line, material);
  changeLinePositionbymaxChroma(compoCenter);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(1, 20, 100);

}


function createShapeLineThicknessPitch(){ 

  const points = [];
  points.push( new THREE.Vector3( 30, -80, 0 ) );
  points.push( new THREE.Vector3( -100, 30, 0 ) );
  points.push( new THREE.Vector3( 70, 30, 0 ) );

  geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new MeshLine();
  line.setGeometry(geometry);
  line.setPoints(points);


  material = new MeshLineMaterial( {
    color: '#FFFFFF',
    lineWidth: (maxChroma + 1)  * 2  // 여기가 바뀌어야 하는 값
  } );

  // changeLineColorbymaxChroma(material);
  compoCenter = new THREE.Mesh(line, material);
  compoCenter.position.set(25, -20, 0);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(1, 10, 100);

}


function createShapeLineTypePitch(){ 
  class CustomSinCurve extends THREE.Curve {
    constructor( scale = 1 ) {
      super();
      this.scale = scale;
    }
  
    getPoint( t, optionalTarget = new THREE.Vector3() ) {
      const tx = t * 3 - 1.5;
      const ty = Math.sin( 10 * Math.PI * t );
      const tz = 0;
      return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
    }
  }
    const path = new CustomSinCurve( 40 );
    geometry = new THREE.TubeGeometry( path, maxChroma, 1, maxChroma, false );
    material = new THREE.MeshBasicMaterial( { 
      color: '#FFFFFF',
      wireframe: false
    } );

    compoCenter = new THREE.Mesh( geometry, material );
    compoCenter.position.set(0, 0, 0);
    spotLight.lookAt(compoCenter);
    group.add( compoCenter );
    camera.position.set(0, 0, 130);

}




function createShapeLineHeightDynamics(){ 
  geometry = new THREE.BoxGeometry( 5, energy * 1.5, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, -20, 0);

  var compoLeft = new THREE.Mesh(geometry, material);
  compoLeft.position.set(-20, -25, 0);
  
  var compoRight = new THREE.Mesh(geometry, material);
  compoRight.position.set(20, -30, 0);

  spotLight.lookAt( compoCenter );
  spotLight.lookAt( compoLeft );
  spotLight.lookAt( compoRight );
  group.add( compoCenter );
  group.add( compoLeft );
  group.add( compoRight );
  camera.position.set(1, 10, 100);

}



function createShapeLineThicknessDynamics(){ 
  geometry = new THREE.BoxGeometry( energy, 30, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, 5, 0);

  spotLight.lookAt( compoCenter );
  group.add( compoCenter );
  camera.position.set(1, 10, 70);

}


function createShapeLineTypeDynamics(){ 
  geometry = new THREE.TorusKnotGeometry( energy * 0.5 , 0.1, energy * 2, 16, energy );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: true
  } );

  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 10, 0);
  spotLight.lookAt( compoCenter );
  group.add( compoCenter );
  camera.position.set(1, 10, 70);

}


function createShapeSphereSize(){
  geometry = new THREE.SphereGeometry( 15, 32, 16, 0, maxChroma * 0.7 );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: true
  } );
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 10, 0);
  spotLight.lookAt( compoCenter );
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}


// function createShapeHeart(){
//   var x = 0;
//   var y = 0;
//   var heartShape = new THREE.Shape();

//   heartShape.moveTo( x + 5, y + 5 );
//   heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
//   heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
//   heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
//   heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
//   heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
//   heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

//   geometry = new THREE.ShapeGeometry(heartShape);
//   material = new THREE.MeshBasicMaterial({
//       color: '#FFFFFF',
//       wireframe: false
//   });
//   compoCenter = new THREE.Mesh(geometry, material);
//   compoCenter.position.set(0, 0, 0);
//   spotLight.lookAt(compoCenter);

//   // group = new THREE.Group();
//   group.add( compoCenter );
//   // scene.add( group );
// }


function createShapeRing(){
  geometry = new THREE.RingGeometry(13, 10, 8, 13, 6, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  // scene.add( group );
}

function deleteBasics(){
//   console.log(scene);
  group.parent.remove(group);
  group = new THREE.Group();
  scene.add(group);
  
  compoCenter.geometry.dispose();
  compoCenter.material.dispose();

//   console.log("deleteBasics");
}



function updateGroupGeometry( mesh, geometry ) {
  mesh.geometry.dispose();
  mesh.geometry = geometry;
}



// LOAD MUSIC (vizIntit)
function vizInit() {
  // file = document.getElementById("thefile");
  // audio = document.getElementById("audio");
  // fileLabel = document.querySelector("label.file");
  // audio_context = audio_context || new AudioContext();
  // document.onload = function(e){
  //   audio.play();
  //   play();
  // }
  // // var CountingStars = 0;
  // // EVENTS
  // var saveButton = document.getElementsByClassName("pcr-save");
  // GEOMETRY

  // EVENT LISTENERS
  pitch_lineHeight.addEventListener("click", ()=>{
    now_geometry = 'pitch_line_height';
  });

  pitch_lineThickness.addEventListener("click", ()=>{
    now_geometry = 'pitch_line_thickness';
  });

  pitch_lineType.addEventListener("click", ()=>{
    now_geometry = 'pitch_line_type';
  });

  dynamic_lineHeight.addEventListener("click", ()=>{
    now_geometry = 'dynamic_line_height';
  });

  dynamic_lineThickness.addEventListener("click", ()=>{
    now_geometry = 'dynamic_line_thickness';
  });

  dynamic_lineType.addEventListener("click", ()=>{
    now_geometry = 'dynamic_line_type';
  });

  pitch_sphereSize.addEventListener("click", ()=>{
    now_geometry = 'pitch_sphere_size';
  });

  // // EVENT LISTENERS
  // shape_heart.addEventListener("click", ()=>{
  //   console.log('하트');
  //   // containerRender();
  //   deleteBasics();
  //   createShapeHeart();
  //   now_geometry = 'shape_heart';
  // });
  // shape_ring.addEventListener("click", ()=>{
  //   console.log('링');
  //   // containerRender();
  //   deleteBasics();
  //   createShapeRing();
  //   now_geometry = 'shape_ring';
  // });
}


// async function filechanged(){
//   file.onchange = function(){
//     fileLabel.classList.add('normal');
//     var files = this.files;
//     audio.src = URL.createObjectURL(files[0]);
//     console.log("VizInit play");
//     src = src || audio_context.createMediaElementSource(audio);
//     // console.log(audio);
//     audio.load();
//     haptic_change();
//     // let AudioIsReady = haptic_change();
//     // let result = await AudioIsReady;
//     // console.log(result);
//     audio.play();
//     console.log("Viz Audio Starts");
//     play(src);
//     // async () =>{ 
//     // AudioIsReady = await import AudioIsReady from ("./modules.js")
//     // console.log(AudioIsReady);
    
//     // AudioIsReady.onchange = function(){
//       // console.log(AudioIsReady);
//     // }
//     // await AudioIsReady;
//     // AudioIsReady.onchange = ()=>{
//     // audio.play(); // 음악이 load 되자마자 시각화 요소를 불러옴
//     // play(src);  // play - 시각화 요소 불러오기
//     }
//   }

//   // audio_context = new AudioContext();
//   // src = audio_context.createMediaElementSource(audio);



// AudioIsReady.onchange = function AudioPlay(){
//   audio.play(); // 음악이 load 되자마자 시각화 요소를 불러옴
//   play(src);  // play - 시각화 요소 불러오기
//   // haptic_change();
// }

// function play(src) {
//   analyser = audio_context.createAnalyser();
//   src.connect(analyser);
//   analyser.connect(audio_context.destination);
//   analyser.fftSize = 512;
//   bufferLength = analyser.frequencyBinCount;
//   dataArray = new Uint8Array(bufferLength);

//   // meyda analyser
//   chroma = 0;
//   maxChroma = 0;
//   energy = 0;
//   amplitudeSpectrum = 0;
//   // var powerSpectrum = 0;

//   const meyda_analyser = Meyda.createMeydaAnalyzer({
//     audioContext: audio_context,
//     source: src,
//     buffersize: 64,
//     featureExtractors: ["energy", "chroma", "amplitudeSpectrum"],
//     callback: (features) => {
//       maxChroma = features['chroma'].indexOf(max(features['chroma']))
//       energy = features['energy']
//       amplitudeSpectrum = features['amplitudeSpectrum']
//     }
//   })
//   meyda_analyser.start();
// }

function saveColor(){
  pickr.on('save', (color, instance) => {
  const userColor = color.toHEXA().toString();
  document.querySelector('#userCustom').innerHTML = userColor;
  
})
}

function changeBGColor(){
var userColor = document.querySelector('#userCustom').innerHTML;
scene.background = new THREE.Color(userColor);
}


function changeLineColorbymaxChroma(Material){
  // color rendering by pitch
  var plainRed = new THREE.Color('rgba(247, 152, 152, 1)');
  var plainRedOrange = new THREE.Color('rgba(247, 189, 152, 1)');
  var plainOrange = new THREE.Color('rgba(247, 206, 152, 1)');
  var plainOrangeYellow = new THREE.Color('rgba(205, 159, 59, 1)');
  var plainYellow = new THREE.Color('rgba(247, 233, 152, 1)');
  var plainYeondu = new THREE.Color('rgba(203, 247, 152, 1)');
  var plainGreen = new THREE.Color('rgba(152, 247, 177, 1)');
  var plainCyan = new THREE.Color('rgba(152, 246, 247, 1)');
  var plainBlue = new THREE.Color('rgba(152, 179, 247, 1)');
  var plainViolet = new THREE.Color('rgba(178, 152, 247, 1)');
  var plainMagenta = new THREE.Color('rgba(241, 152, 247, 1)');
  var plainPink = new THREE.Color('rgba(247, 152, 213, 1)');

  if (maxChroma == 0){ 
    Material.color = plainRed;
  } else if (maxChroma == 1) {
    Material.color = plainRedOrange;
  } else if (maxChroma == 2){
    Material.color = plainOrange;
  } else if (maxChroma == 3){
    Material.color = plainOrangeYellow;
  } else if (maxChroma == 4){
    Material.color = plainYellow;
  } else if (maxChroma == 5){
    Material.color = plainYeondu;
  } else if (maxChroma == 6){
    Material.color = plainGreen;
  } else if (maxChroma == 7){
    Material.color = plainCyan;
  } else if (maxChroma == 8){
    Material.color = plainBlue;
  } else if (maxChroma == 9){
    Material.color = plainViolet;
  } else if (maxChroma == 10){
    Material.color = plainMagenta;
  } else {
    Material.color = plainPink;
  }
}


function changeLinePositionbymaxChroma(mesh){
  if (maxChroma == 0){ 
    mesh.position.set(30, -40, 10);
  } else if (maxChroma == 1) {
    mesh.position.set(30, -35, 10);
  } else if (maxChroma == 2){
    mesh.position.set(30, -30, 10);
  } else if (maxChroma == 3){
    mesh.position.set(30, -25, 10);
  } else if (maxChroma == 4){
    mesh.position.set(30, -20, 10);
  } else if (maxChroma == 5){
    mesh.position.set(30, -15, 10);
  } else if (maxChroma == 6){
    mesh.position.set(30, -10, 10);
  } else if (maxChroma == 7){
    mesh.position.set(30, -5, 10);
  } else if (maxChroma == 8){
    mesh.position.set(30, 0, 10);
  } else if (maxChroma == 9){
    mesh.position.set(30, 5, 10);
  } else if (maxChroma == 10){
    mesh.position.set(30, 10, 10);
  } else {
    mesh.position.set(30, 15, 10);
  }
}

// some helper functions here
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


// function changeColorByChroma(Material){
//   // color rendering by pitch
//   var plainRed = new THREE.Color('rgba(247, 152, 152, 1)');
//   var plainRedOrange = new THREE.Color('rgba(247, 189, 152, 1)');
//   var plainOrange = new THREE.Color('rgba(247, 206, 152, 1)');
//   var plainOrangeYellow = new THREE.Color('rgba(205, 159, 59, 1)');
//   var plainYellow = new THREE.Color('rgba(247, 233, 152, 1)');
//   var plainYeondu = new THREE.Color('rgba(203, 247, 152, 1)');
//   var plainGreen = new THREE.Color('rgba(152, 247, 177, 1)');
//   var plainCyan = new THREE.Color('rgba(152, 246, 247, 1)');
//   var plainBlue = new THREE.Color('rgba(152, 179, 247, 1)');
//   var plainViolet = new THREE.Color('rgba(178, 152, 247, 1)');
//   var plainMagenta = new THREE.Color('rgba(241, 152, 247, 1)');
//   var plainPink = new THREE.Color('rgba(247, 152, 213, 1)');


//   plainRed = changeColorByChromaVolume(plainRed);
//   plainRedOrange = changeColorByChromaVolume(plainRedOrange);
//   plainOrange = changeColorByChromaVolume(plainOrange);
//   plainOrangeYellow = changeColorByChromaVolume(plainOrangeYellow);
//   plainYellow = changeColorByChromaVolume(plainYellow);
//   plainYeondu = changeColorByChromaVolume(plainYeondu);
//   plainGreen = changeColorByChromaVolume(plainGreen);
//   plainCyan = changeColorByChromaVolume(plainCyan);
//   plainBlue = changeColorByChromaVolume(plainBlue);
//   plainViolet = changeColorByChromaVolume(plainViolet);
//   plainMagenta = changeColorByChromaVolume(plainMagenta);
//   plainPink = changeColorByChromaVolume(plainPink);

//   if (maxChroma == 0){ 
//     Material.color = plainRed;
//   } else if (maxChroma == 1) {
//     Material.color = plainRedOrange;
//   } else if (maxChroma == 2){
//     Material.color = plainOrange;
//   } else if (maxChroma == 3){
//     Material.color = plainOrangeYellow;
//   } else if (maxChroma == 4){
//     Material.color = plainYellow;
//   } else if (maxChroma == 5){
//     Material.color = plainYeondu;
//   } else if (maxChroma == 6){
//     Material.color = plainGreen;
//   } else if (maxChroma == 7){
//     Material.color = plainCyan;
//   } else if (maxChroma == 8){
//     Material.color = plainBlue;
//   } else if (maxChroma == 9){
//     Material.color = plainViolet;
//   } else if (maxChroma == 10){
//     Material.color = plainMagenta;
//   } else {
//     Material.color = plainPink;
//   }
// }

// function changeColorByChromaVolume(color){
//   var pitchPoint = document.querySelector('#pitchPoint').innerHTML;
//   var rValue = color.toArray()[0];
//   var gValue = color.toArray()[1];
//   var bValue = color.toArray()[2];

//   // 조건을 더 다양화 시켜야함
//   if (bValue <= 0.70) {
//     bValue = bValue * (10 - pitchPoint) * 0.1
//   } else if (rValue <= 0.70) {
//     rValue = rValue * (10 - pitchPoint) * 0.1
//   } else if (gValue <= 0.70) {
//     gValue = gValue * (10 - pitchPoint) * 0.1
//   }

//   rValue = Math.floor(rValue * 255)
//   gValue = Math.floor(gValue * 255)
//   bValue = Math.floor(bValue * 255)

//   String.prototype.format = function() {
//     var formatted = this;
//     for( var arg in arguments ) {
//         formatted = formatted.replace("{" + arg + "}", arguments[arg]);
//     }
//     return formatted;
// };

//   var colorRGB = "rgba({0}, {1}, {2}, 1)".format(rValue, gValue, bValue);
//   var newColor = new THREE.Color(colorRGB);
//   return newColor
// }



// export {audio};