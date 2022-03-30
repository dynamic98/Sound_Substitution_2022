import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { pickr } from './pickr.js';

let controls;
let camera, scene, renderer;
let container, stats;

const shape_heart = document.getElementById("shape_heart");
const shape_ring = document.getElementById("shape_ring");
const shape_sphere = document.getElementById("shape_sphere");
const shape_box = document.getElementById("shape_box");
const shape_torus = document.getElementById("shape_torus");
const shape_cone = document.getElementById("shape_cone");

var now_geometry;
var group, geometry, material, compoCenter;
var ambientLight, spotLight;

var context, src, audio, file, fileLabel;
var analyser, dataArray, bufferLength;
var chroma, maxChroma,energy, amplitudeSpectrum;


// BASIC EVENTS
init();
vizInit();
animate();



// REQUIRED FUNCTIONS
// init function
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 2, 2000);

    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2.4, window.innerHeight/1.3);
    container = document.getElementById( "container" );
    container.appendChild( renderer.domElement )

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // Orbit Controller
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(1, 20, 100);

    controls.maxPloarAngle = Math.PI * 0.495;
    controls.target.set( 0, 10, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    stats = new Stats();
    container.appendChild( stats.dom );


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
    changeColorByChroma(material);

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

    // SHAPE (HEART) Rendering
    if (now_geometry == 'shape_heart') {
      deleteBasics();     
      createShapeHeart(); 
      changeColorByChroma(material); 
      compoCenter.position.x = maxChroma  * 10;
      compoCenter.position.y = energy * 3;

    } else if (now_geometry == 'shape_ring') { 
        deleteBasics();
        createShapeSphere();
        changeColorByChroma(material);
        updateGroupGeometry( compoCenter,
          new THREE.RingGeometry(
            13, energy, 8, 13, 6.283, 6.283
        ));
    } else if (now_geometry == 'shape_sphere') { 
        deleteBasics();
        createShapeSphere();
        changeColorByChroma(material);
        updateGroupGeometry( compoCenter,
          new THREE.SphereGeometry(
            energy * 0.5, 64, 32, 0, 6.283, 6.283, 6.283
        ));
    } else if (now_geometry == 'shape_box') { 
        deleteBasics();
        createShapeBox();
        changeColorByChroma(material);
        updateGroupGeometry( compoCenter,
          new THREE.BoxGeometry(
            energy, energy, 1
      ));
    } else if (now_geometry == 'shape_torus') { 
        deleteBasics();
        createShapeTorus();
        changeColorByChroma(material);
        updateGroupGeometry( compoCenter,
          new THREE.TorusGeometry(
            energy, 3, 16, 100
    ));
    } else if (now_geometry == 'shape_cone') { 
        deleteBasics();
        createShapeCone();
        changeColorByChroma(material);
        updateGroupGeometry( compoCenter,
          new THREE.ConeGeometry(
            energy, 20, 32
    ));
    } 
    render();
  }
    stats.update(); // 왜냐면 여기에서 DOM 에서 바뀐 점이 업데이트되기 때문
  }


// render function
function render() {
  renderer.render(scene, camera);
}


function createShapeHeart(){
  var x = 0;
  var y = 0;
  var heartShape = new THREE.Shape();
  
  heartShape.moveTo( x + 5, y + 5 );
  heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
  heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
  heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
  heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
  heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
  heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

  geometry = new THREE.ShapeGeometry(heartShape);
  material = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      wireframe: false
  });


  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );

}


function createShapeRing(){
  geometry = new THREE.RingGeometry(13, 10, 8, 13, 6, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt( compoCenter );

  group.add( compoCenter );
}


function createShapeSphere(){
  geometry = new THREE.SphereGeometry( 15, 32, 16 );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: true
  });
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt( compoCenter );

  group.add( compoCenter );
}


function createShapeBox(){
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: false
  });
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt( compoCenter );

  group.add( compoCenter );
}


function createShapeTorus(){
  geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: false
  });
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt( compoCenter );

  group.add( compoCenter );
}

function createShapeCone(){
  geometry = new THREE.ConeGeometry( 5, 20, 32 );
  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: false
  });
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt( compoCenter );

  group.add( compoCenter );
}



function deleteBasics(){
  group.parent.remove(group);
  group = new THREE.Group();
  scene.add(group);
  
  compoCenter.geometry.dispose();
  compoCenter.material.dispose();
}



function updateGroupGeometry( mesh, geometry ) {
  mesh.geometry.dispose();
  mesh.geometry = geometry;
}



// LOAD MUSIC (vizInit)
function vizInit() {
  file = document.getElementById("thefile");
  audio = document.getElementById("audio");
  fileLabel = document.querySelector("label.file");
  
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

  context = new AudioContext();
  src = context.createMediaElementSource(audio);
  var CountingStars = 0;

  // EVENTS
  // var saveButton = document.getElementsByClassName("pcr-save");

  // // GEOMETRY

  // // let shape_heart_cnt = 0;
  // // let button_shape_heart_cnt = 0;


  // EVENT LISTENERS
  shape_heart.addEventListener("click", ()=>{
    deleteBasics();
    createShapeHeart();
    now_geometry = 'shape_heart';
  });

  shape_ring.addEventListener("click", ()=>{
    deleteBasics();
    createShapeRing();
    now_geometry = 'shape_ring';
  });

  shape_sphere.addEventListener("click", ()=>{
    deleteBasics();
    createShapeSphere();
    now_geometry = 'shape_sphere';
  });

  shape_box.addEventListener("click", ()=>{
    deleteBasics();
    createShapeBox();
    now_geometry = 'shape_box';
  });


  shape_torus.addEventListener("click", ()=>{
    deleteBasics();
    createShapeTorus();
    now_geometry = 'shape_torus';
  });


  shape_cone.addEventListener("click", ()=>{
    deleteBasics();
    createShapeCone();
    now_geometry = 'shape_cone';
  });

};


function play() {
  analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 512;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  // meyda analyser
  chroma = 0;
  maxChroma = 0;
  energy = 0;
  amplitudeSpectrum = 0;
  // var powerSpectrum = 0;

  const meyda_analyser = Meyda.createMeydaAnalyzer({
    audioContext: context,
    source: src,
    buffersize: 64,
    featureExtractors: ["energy", "chroma", "amplitudeSpectrum"],
    callback: (features) => {
      maxChroma = features['chroma'].indexOf(max(features['chroma']))
      energy = features['energy']
      amplitudeSpectrum = features['amplitudeSpectrum']
    }
  })
  meyda_analyser.start();
}


// COLOR SAVE & CHANGE FUNCTION on Pickr
function saveColor(){
    pickr.on('save', (color, instance) => {
    const userColor = color.toHEXA().toString();
    document.querySelector('#userCustom').innerHTML = userColor;
  })
};

function changeBGColor(){
  var userColor = document.querySelector('#userCustom').innerHTML;
  scene.background = new THREE.Color(userColor);
};


function changeColorByChroma(Material){
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


  plainRed = changeColorByChromaVolume(plainRed);
  plainRedOrange = changeColorByChromaVolume(plainRedOrange);
  plainOrange = changeColorByChromaVolume(plainOrange);
  plainOrangeYellow = changeColorByChromaVolume(plainOrangeYellow);
  plainYellow = changeColorByChromaVolume(plainYellow);
  plainYeondu = changeColorByChromaVolume(plainYeondu);
  plainGreen = changeColorByChromaVolume(plainGreen);
  plainCyan = changeColorByChromaVolume(plainCyan);
  plainBlue = changeColorByChromaVolume(plainBlue);
  plainViolet = changeColorByChromaVolume(plainViolet);
  plainMagenta = changeColorByChromaVolume(plainMagenta);
  plainPink = changeColorByChromaVolume(plainPink);

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

function changeColorByChromaVolume(color){
  var pitchPoint = document.querySelector('#pitchPoint').innerHTML;
  var rValue = color.toArray()[0];
  var gValue = color.toArray()[1];
  var bValue = color.toArray()[2];

  // 조건을 더 다양화 시켜야함
  if (bValue <= 0.70) {
    bValue = bValue * (10 - pitchPoint) * 0.1
  } else if (rValue <= 0.70) {
    rValue = rValue * (10 - pitchPoint) * 0.1
  } else if (gValue <= 0.70) {
    gValue = gValue * (10 - pitchPoint) * 0.1
  }

  rValue = Math.floor(rValue * 255)
  gValue = Math.floor(gValue * 255)
  bValue = Math.floor(bValue * 255)

  String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

  var colorRGB = "rgba({0}, {1}, {2}, 1)".format(rValue, gValue, bValue);
  var newColor = new THREE.Color(colorRGB);
  return newColor
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
