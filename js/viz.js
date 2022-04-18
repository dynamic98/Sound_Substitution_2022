'use strict';

import * as THREE from 'three';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline/src/THREE.MeshLine.js';
import { pickr, analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio} from './modules.js';

// let controls;
let camera, scene, renderer;
let container, stats;
let customMenu;
let FrameRate = 0;

// html buttons (by class name)
const pitchMenu = document.getElementsByClassName("pitchMenu");
const dynamicMenu = document.getElementsByClassName("dynamicMenu");


// Geometry 별 Detail 요소
// 1. Line
const pitch_LineHeight = document.getElementById("pitchLineHeight");
const pitch_LineThickness = document.getElementById("pitchLineThickness");
const pitch_LineType = document.getElementById("pitchLineType");
const dynamic_LineHeight = document.getElementById("dynamicLineHeight");
const dynamic_LineThickness = document.getElementById("dynamicLineThickness");
const dynamic_LineType = document.getElementById("dynamicLineType");

// 3. Ring
const pitch_RingThickness = document.getElementById("pitchRingThickness");
const pitch_RingSize = document.getElementById("pitchRingSize");
const pitch_RingType = document.getElementById("pitchRingType");
const dynamic_RingThickness = document.getElementById("dynamicRingThickness");
const dynamic_RingSize = document.getElementById("dynamicRingSize");
const dynamic_RingType = document.getElementById("dynamicRingType");



let now_geometry;
let group, geometry, material, compoCenter;
let ambientLight, spotLight;


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
  renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
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

  now_geometry = "shape_ring";
  // createShapeRing();
  createShapeRing_Vanilla();
};


// animate function
function animate() {
  // color rendering
  saveColor();
  changeBGColor();
  requestAnimationFrame(animate);
  FrameRate = FrameRate + 1
  // 여기를 기점으로 색깔 등 요소 변경을 추가하면됨
  if (FrameRate % 3 == 0){
    // music rendering
    if (dataArray){
      analyser.getByteFrequencyData(dataArray);

      // Geometry Rendering
      if (typeof now_geometry == 'number'){
        deleteBasics();
        let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
        console.log('GeometryAnalysis: ', [geometry_type, pitch_type, dynamic_type]);
        
        // line custom
        if (geometry_type == 1){
          if (pitch_type == 0 && dynamic_type == 0){
            createShapeLine_Vanilla();
          } else if (pitch_type == 1){
              if (dynamic_type == 0){
                createShapeLine_P1D0();
              }
          } else if (pitch_type == 3){
              if (dynamic_type == 0){
                createShpaeLine_P3D0();
              }
          } else if (pitch_type == 5){
              if (dynamic_type == 0){
                createShapeLine_P5D0();
              }
          } 
          else if (pitch_type == 0){

          }

        };

        // ring custom
        if (geometry_type == 3){
          if (pitch_type == 0 && dynamic_type == 0){
            createShapeRing_Vanilla();
          } else if(pitch_type == 0){
              if (dynamic_type == 1){
              createShapeRing_P0D1();
            } else if (dynamic_type == 2){
              createShapeRing_P0D2();
            } else if (dynamic_type == 3){
              createShapeRing_P0D3();
            }
          }  
          else if(pitch_type == 1){
            if (dynamic_type == 0){
              createShapeRing_P1D0();
            } else if (dynamic_type == 1){
              createShapeRing_P1D1();
            } else if (dynamic_type == 2){
              createShapeRing_P1D2();
            } else if (dynamic_type == 3){
              createShapeRing_P1D3();
            }
          } 
          else if(pitch_type == 2){
            if (dynamic_type == 0){
              createShapeRing_P2D0();
            } else if (dynamic_type == 1){
              createShapeRing_P2D1();
            } else if (dynamic_type == 2){
              createShapeRing_P2D2();
            } else if (dynamic_type == 3){
              createShapeRing_P2D3();
            }
          } 
          else if(pitch_type == 3){
            if (dynamic_type == 0){
              createShapeRing_P3D0();
            } else if (dynamic_type == 1){
              createShapeRing_P3D1();
            } else if (dynamic_type == 2){
              createShapeRing_P3D2();
            } else if (dynamic_type == 3){
              createShapeRing_P3D3();
            }
        }
      }
    }
    // changeColorByChroma(material);
    render();
    }
  }
  // stats.update(); // 왜냐면 여기에서 DOM 에서 바뀐 점이 업데이트되기 때문
}


// render function
function render() {
  renderer.render(scene, camera);
}







function createShapeLineHeightDynamics(){ 
  geometry = new THREE.BoxGeometry( 5, energy * 1.5, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, -20, 0);

  let compoLeft = new THREE.Mesh(geometry, material);
  compoLeft.position.set(-20, -25, 0);
  
  let compoRight = new THREE.Mesh(geometry, material);
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

// 고치기!
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

// 0. Vanilla geometry
function createShapeLine_Vanilla(){
  geometry = new THREE.BoxGeometry( 1, 5, 30 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );
  compoCenter = new THREE.Mesh(geometry, material);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(1, 20, 100)
};


function createShapeRing_Vanilla(){
  geometry = new THREE.RingGeometry(10, 13, 8, 13, 0, 6.28);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
};


// 1. Line geometry
function createShapeLine_P1D0(){
  geometry = new THREE.BoxGeometry( 100, maxChroma * 1.5, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(20, 0, 50);
}

function createShpaeLine_P3D0(){
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
  let custom_maxChroma = maxChroma + 1
  geometry = new THREE.TubeGeometry( path, custom_maxChroma, 2, custom_maxChroma, false );

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

function createShapeLine_P5D0(){ 
  geometry = new THREE.BoxGeometry( 100, 1, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  changeLinePositionbymaxChroma(compoCenter);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(20, 10, 50);
};




// 3. Ring geometry
function createShapeRing_P1D0(){
  let thickness = maxChroma/2+5
  geometry = new THREE.RingGeometry(thickness, 13, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P1D1(){
  let custom_energy = energy*5;
  if(custom_energy>15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }
  let thickness = (maxChroma/2+5 + custom_energy)/2;

  geometry = new THREE.RingGeometry(thickness, 13, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P1D2(){
  let custom_energy = energy*5;
  if(custom_energy > 15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }

  let inner = custom_energy - custom_energy/(maxChroma+2);
  let outer = custom_energy;

  geometry = new THREE.RingGeometry(inner, outer, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P1D3(){
  let custom_energy = Math.round(energy*5);
  if(custom_energy<3){
    custom_energy = custom_energy+3;
  }
  let thickness = maxChroma+2;
  let segments = custom_energy
  let inner = 13 - 13/thickness
  // console.log(energy);
  geometry = new THREE.RingGeometry(inner, 13, segments, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}


function createShapeRing_P2D0(){

  var size = (maxChroma/2+5);
  geometry = new THREE.RingGeometry(size-3, size, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P2D1(){
  let custom_energy = Math.round(energy*5)+2;
  let size = (maxChroma/2+5);
    // console.log(energy);
  let inner = size - size/custom_energy;
  let outer = size;
   
  geometry = new THREE.RingGeometry(inner, outer, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P2D2(){
  let custom_energy = energy*5;
  if(custom_energy>15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }
  let size = ((maxChroma/2+5)+custom_energy)/2;
  geometry = new THREE.RingGeometry(size-3, size, 8, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P2D3(){
  let size = (maxChroma/2+5);
  let custom_energy = Math.round(energy*5);
  if(custom_energy<3){
    custom_energy = custom_energy+3;
  }
  let segments = custom_energy
  // console.log(energy);
  geometry = new THREE.RingGeometry(size-3, size, segments, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P3D0(){
  let segments = (maxChroma+3);

  geometry = new THREE.RingGeometry(10, 13, segments, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
}

function createShapeRing_P3D1(){
  let segments = (maxChroma+3);
  let custom_energy = Math.round(energy*5)+2;
  let inner = 13 - 13/custom_energy
  // console.log(energy);
  geometry = new THREE.RingGeometry(inner, 13, segments, 13, 0, 6.283185307179586);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  // group = new THREE.Group();
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
  // scene.add( group );
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
  // (1) Line EventListener
  pitch_LineHeight.addEventListener("click", ()=>{ 
    pitch_LineHeight.style.background = '#FF5C5C'; // 빨강(활성)
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (pitch_type == 5){
        pitch_type = 0;
        pitch_LineHeight.style.background = '#221E21'; // 검정(비활성)
      } else {
        pitch_type = 5;
        pitch_LineHeight.style.background = '#FF5C5C'; // 빨강(활성)
        pitch_LineThickness.style.background = '#221E21'; // 검정(비활성)
        pitch_LineType.style.background = '#221E21'; // 검정(비활성)
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10500;
    }



  });

  pitch_LineThickness.addEventListener("click", ()=>{
    pitch_LineThickness.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (pitch_type == 1){
        pitch_type = 0;
        pitch_LineThickness.style.background = '#221E21';
      } else {
        pitch_type = 1;
        pitch_LineThickness.style.background = '#FF5C5C';
        pitch_LineHeight.style.background = '#221E21';
        pitch_LineType.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10100;
    }
  });

  pitch_LineType.addEventListener("click", ()=>{
    pitch_LineType.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (pitch_type == 3){
        pitch_type = 0;
        pitch_LineType.style.background = '#221E21';
      } else {
        pitch_type = 3;
        pitch_LineType.style.background = '#FF5C5C';
        pitch_LineThickness.style.background = '#221E21';
        pitch_LineHeight.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10300;
    }
  });


  // (3) Ring Eventlistener
  pitch_RingThickness.addEventListener("click", ()=>{
    pitch_RingThickness.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (pitch_type == 1){
        pitch_type = 0;
        pitch_RingThickness.style.background = '#221E21';
      } else {
        pitch_type = 1;
        pitch_RingThickness.style.background = '#FF5C5C';
        pitch_RingSize.style.background = '#221E21';
        pitch_RingType.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30100;
    }
  })

  pitch_RingSize.addEventListener("click", ()=>{
    pitch_RingSize.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (pitch_type == 2){
        pitch_type = 0;
        pitch_RingSize.style.background = '#221E21';
      } else {
        pitch_type = 2;
        pitch_RingSize.style.background = '#FF5C5C';
        pitch_RingThickness.style.background ='#221E21';
        pitch_RingType.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30200;
    }
  })

  pitch_RingType.addEventListener("click", ()=>{
    pitch_RingType.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (pitch_type == 3){
        pitch_type = 0;
        pitch_RingType.style.background = '#221E21';
      } else {
        pitch_type = 3;
        pitch_RingType.style.background = '#FF5C5C';
        pitch_RingSize.style.background = '#221E21';
        pitch_RingThickness.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30300;
    } 
  })

  dynamic_RingThickness.addEventListener("click", ()=>{
    dynamic_RingThickness.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (dynamic_type == 1){
        dynamic_type = 0;
        dynamic_RingThickness.style.background = '#221E21';
      } else {
        dynamic_type = 1;
        dynamic_RingThickness.style.background = '#FF5C5C';
        dynamic_RingSize.style.background = '#221E21';
        dynamic_RingType.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30001;
    } 
  })

  dynamic_RingSize.addEventListener("click", ()=>{
    dynamic_RingSize.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (dynamic_type == 2){
        dynamic_type = 0;
        dynamic_RingSize.style.background = '#221E21';
      } else {
        dynamic_type = 2;
        dynamic_RingSize.style.background = '#FF5C5C';
        dynamic_RingThickness.style.background = '#221E21';
        dynamic_RingType.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30002;
    } 
  })

  dynamic_RingType.addEventListener("click", ()=>{
    dynamic_RingType.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 3;
      if (dynamic_type == 3){
        dynamic_type = 0;
        dynamic_RingType.style.background = '#221E21';
      } else {
        dynamic_type = 3;
        dynamic_RingType.style.background = '#FF5C5C';
        dynamic_RingThickness.style.background = '#221E21';
        dynamic_RingSize.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 30003;
    } 
  })
};



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

// 각 요소에 해당하는 값(100, 10000 등)으로 나누어 어떤 요소의 무엇을 호출했는지 판별하는 함수
function GeometryAnalysis(GeometryValue){
  let geometry_type = parseInt( GeometryValue / 10000 );
  let remainder_10000 = GeometryValue % 10000;
  let pitch_type = parseInt( remainder_10000 / 100 );
  let dynamic_type = remainder_10000 % 100;
  return [geometry_type, pitch_type, dynamic_type];
};