'use strict';

import * as THREE from 'three';
// import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline/src/THREE.MeshLine.js';
import { audio_do, audio_re, audio_mi, audio_fa, audio_sol, audio_la, audio_si, pickr, analyser, chroma, maxChroma, energy, dataArray } from './modules.js';

// let controls;
let camera, scene, renderer;
let container, stats;
let customMenu;
let FrameRate = 0;



// Geometry 별 Detail 요소
// 1. Line
const pitch_LineHeight = document.getElementById("pitchLineHeight");
const pitch_LineThickness = document.getElementById("pitchLineThickness");
const pitch_LineType = document.getElementById("pitchLineType");
const dynamic_LineHeight = document.getElementById("dynamicLineHeight");
const dynamic_LineThickness = document.getElementById("dynamicLineThickness");
const dynamic_LineColor = document.getElementById("dynamicLineColor");

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

      // geometry rendering
      if (typeof now_geometry == 'number'){
        deleteBasics();
        let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
        
        // line custom
        if (geometry_type == 1){
          if (pitch_type == 0 && dynamic_type == 0){
            createShapeLine_Vanilla();
          } else if (pitch_type == 1){
              if (dynamic_type == 0){
                createShapeLine_P1D0();
              } else if (dynamic_type == 5){
                createShapeLine_P1D5();
              } else if (dynamic_type == 4){
                createShapeLine_P1D4();
              }
          } else if (pitch_type == 3){
              if (dynamic_type == 0){
                createShpaeLine_P3D0();
              } else if (dynamic_type == 1){
                createShapeLine_P3D1();
              } else if (dynamic_type == 4){
                createShapeLine_P3D4();
              } else if (dynamic_type == 5){
                createShapeLine_P3D5();
              }
          } else if (pitch_type == 5){
              if (dynamic_type == 0){
                createShapeLine_P5D0();
              } else if (dynamic_type == 1){
                createShapeLine_P5D1();
              } else if (dynamic_type == 4){
                createShapeLine_P5D4();
              }
          } 
          else if (pitch_type == 0){
              if (dynamic_type == 5){
                createShapeLine_P0D5();
              } else if (dynamic_type == 1){
                createShapeLine_P0D1();
              } else if (dynamic_type == 4){
                createShapeLine_P0D4(); 
              }
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
    render();
    }
  }
}


// render function
function render() {
  renderer.render(scene, camera);
}




// 0. Vanilla geometry
function createShapeLine_Vanilla(){
  geometry = new THREE.BoxGeometry( 50, 1, 1);
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );
  compoCenter = new THREE.Mesh(geometry, material);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(1, 5, 100)
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

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
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
  geometry = new THREE.BoxGeometry( 100, 0.5, 1 );
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


function createShapeLine_P0D5(){
  geometry = new THREE.BoxGeometry( 5, energy * 20, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, -27, 0);

  let compoLeft = new THREE.Mesh(geometry, material);
  compoLeft.position.set(-20, -30, 0);
  
  let compoRight = new THREE.Mesh(geometry, material);
  compoRight.position.set(20, -30, 0);

  spotLight.lookAt( compoCenter );
  spotLight.lookAt( compoLeft );
  spotLight.lookAt( compoRight );
  group.add( compoCenter );
  group.add( compoLeft );
  group.add( compoRight );
  camera.position.set(1, -5, 100);
}


function createShapeLine_P0D1(){
  geometry = new THREE.BoxGeometry( energy * 10, 30, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, 0, 0);

  spotLight.lookAt( compoCenter );
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeLine_P0D4(){
  geometry = new THREE.BoxGeometry( 50, 1, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );
  changeLineColorbyEnergy(material)
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, 8, 0);

  spotLight.lookAt( compoCenter );
  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}


function createShapeLine_P5D1(){
  let thickness = (maxChroma + 1) * 0.5
  geometry = new THREE.BoxGeometry( 100, thickness, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  changeLinePositionbymaxChroma(compoCenter);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(20, 10, 80);
}


function createShapeLine_P5D4(){
  geometry = new THREE.BoxGeometry( 100, 1, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  changeLineColorbymaxChroma(material);
  changeLinePositionbymaxChroma(compoCenter);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(20, 10, 80);
}


function createShapeLine_P1D5(){
  geometry = new THREE.BoxGeometry( maxChroma, energy * 20, 5 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(0, -27, 0);

  let compoLeft = new THREE.Mesh(geometry, material);
  compoLeft.position.set(-20, -30, 0);
  
  let compoRight = new THREE.Mesh(geometry, material);
  compoRight.position.set(20, -30, 0);

  spotLight.lookAt( compoCenter );
  spotLight.lookAt( compoLeft );
  spotLight.lookAt( compoRight );
  group.add( compoCenter );
  group.add( compoLeft );
  group.add( compoRight );
  camera.position.set(1, -5, 100);
}


function createShapeLine_P1D4(){
  geometry = new THREE.BoxGeometry( 100, maxChroma * 1.5, 1 );
  material = new THREE.MeshBasicMaterial( {
    color: '#FFFFFF',
    wireframe: false
  } );

  changeLineColorbymaxChroma(material);

  compoCenter = new THREE.Mesh(geometry, material);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(20, 0, 50);
}

function createShapeLine_P3D1(){
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
  let custom_maxChroma = maxChroma + 1;
  let thickness = energy * 5;
  geometry = new THREE.TubeGeometry( path, custom_maxChroma, thickness, custom_maxChroma, false );

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


function createShapeLine_P3D4(){
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

  changeLineColorbymaxChroma(material);
  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, 0, 0);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(0, 0, 130);
}

function createShapeLine_P3D5(){
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
  let height = energy * 10
  console.log('위치(높이)', height)
  geometry = new THREE.TubeGeometry( path, custom_maxChroma, 2, custom_maxChroma, false );

  material = new THREE.MeshBasicMaterial( { 
    color: '#FFFFFF',
    wireframe: false
  } );

  compoCenter = new THREE.Mesh( geometry, material );
  compoCenter.position.set(0, height, 0);
  spotLight.lookAt(compoCenter);
  group.add( compoCenter );
  camera.position.set(0, 0, 130);
}



// =======================================================================


// 3. Ring geometry
function createShapeRing_P0D1(){
  let thickness = energy*5+1;
  let inner = 13 - 13/thickness

  geometry = new THREE.RingGeometry(inner, 13, 8, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P0D2(){
  let custom_energy = energy*5;
  if(custom_energy>15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }

  let size = custom_energy
  geometry = new THREE.RingGeometry(size-3, size, 8, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P0D3(){
  let segments = (Math.round(energy)+3);

  geometry = new THREE.RingGeometry(10, 13, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

// >>>>>>> 547641bbc724e13bf499baf9a4e6eb3b521b2734
function createShapeRing_P1D0(){
  let thickness = maxChroma/2+5
  geometry = new THREE.RingGeometry(thickness, 13, 8, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
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

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
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

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P1D3(){
  let custom_energy = Math.round(energy*5);
  if(custom_energy<3){
    custom_energy = custom_energy+3;
  }
  let thickness = maxChroma+2;
  let segments = custom_energy
  let inner = 13 - 13/thickness
  geometry = new THREE.RingGeometry(inner, 13, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}


function createShapeRing_P2D0(){

  let size = (maxChroma/2+5);
  geometry = new THREE.RingGeometry(size-3, size, 8, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P2D1(){
  let custom_energy = Math.round(energy*5)+2;
  let size = (maxChroma/2+5);
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

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P2D2(){
  let custom_energy = energy*5;
  if(custom_energy>15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }
  let size = ((maxChroma/2+5)+custom_energy)/2;
  geometry = new THREE.RingGeometry(size-3, size, 8, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P2D3(){
  let size = (maxChroma/2+5);
  let custom_energy = Math.round(energy*5);
  if(custom_energy<3){
    custom_energy = custom_energy+3;
  }
  let segments = custom_energy
  geometry = new THREE.RingGeometry(size-3, size, segments, 13, 0, 6.283);
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

  geometry = new THREE.RingGeometry(10, 13, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P3D1(){
  let segments = (maxChroma+3);
  let custom_energy = Math.round(energy*5)+2;
  let inner = 13 - 13/custom_energy

  geometry = new THREE.RingGeometry(inner, 13, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P3D2(){
  let segments = (maxChroma+3);
  let custom_energy = energy*5;
  if(custom_energy>15){
    custom_energy = 15;
  } else if(custom_energy<10){
    custom_energy = custom_energy/2+5
  }
  let size = custom_energy
  geometry = new THREE.RingGeometry(size-3, size, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
}

function createShapeRing_P3D3(){
  let custom_energy = energy*5;
  let segments = Math.round((maxChroma+custom_energy)/2+3);

  geometry = new THREE.RingGeometry(10, 13, segments, 13, 0, 6.283);
  material = new THREE.MeshLambertMaterial({
    color: '#FFFFFF',
    wireframe: true,
    side: THREE.DoubleSide
  });
  compoCenter = new THREE.Mesh(geometry, material);
  compoCenter.position.set(1, 10, 0);
  spotLight.lookAt(compoCenter);

  group.add( compoCenter );
  camera.position.set(1, 10, 70);
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


// =======================================================================


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


  dynamic_LineHeight.addEventListener("click", ()=>{
    dynamic_LineHeight.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (dynamic_type == 5){
        dynamic_type = 0;
        dynamic_LineHeight.style.background = '#221E21';
      } else {
        dynamic_type = 5;
        dynamic_LineHeight.style.background = '#FF5C5C';
        dynamic_LineThickness.style.background = '#221E21';
        dynamic_LineColor.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10005;
    }
  });


  dynamic_LineThickness.addEventListener("click", ()=>{
    dynamic_LineThickness.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (dynamic_type == 1){
        dynamic_type = 0;
        dynamic_LineThickness.style.background = '#221E21';
      } else {
        dynamic_type = 1;
        dynamic_LineThickness.style.background = '#FF5C5C';
        dynamic_LineHeight.style.background = '#221E21';
        dynamic_LineColor.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10001;
    }
  });


  dynamic_LineColor.addEventListener("click", ()=>{
    dynamic_LineColor.style.background = '#FF5C5C';
    if (typeof now_geometry == 'number'){
      let [geometry_type, pitch_type, dynamic_type] = GeometryAnalysis(now_geometry);
      geometry_type = 1;
      if (dynamic_type == 4){
        dynamic_type = 0;
        dynamic_LineColor.style.background = '#221E21';
      } else {
        dynamic_type = 4;
        dynamic_LineColor.style.background = '#FF5C5C';
        dynamic_LineHeight.style.background = '#221E21';
        dynamic_LineThickness.style.background = '#221E21';
      }
      now_geometry = geometry_type*10000+pitch_type*100+dynamic_type
    } else {
    now_geometry = 10004;
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


// 각 요소에 해당하는 값(100, 10000 등)으로 나누어 어떤 요소의 무엇을 호출했는지 판별하는 함수
function GeometryAnalysis(GeometryValue){
  let geometry_type = parseInt( GeometryValue / 10000 );
  let remainder_10000 = GeometryValue % 10000;
  let pitch_type = parseInt( remainder_10000 / 100 );
  let dynamic_type = remainder_10000 % 100;
  return [geometry_type, pitch_type, dynamic_type];
};



// 색깔 관련 함수 모음
function saveColor(){
  pickr.on('save', (color, instance) => {
  const userColor = color.toHEXA().toString();
  document.querySelector('#userCustom').innerHTML = userColor;
  
})
}

function changeBGColor(){
  let userColor = document.querySelector('#userCustom').innerHTML;
  scene.background = new THREE.Color(userColor);
}


function changeLineColorbymaxChroma(Material){
  // color rendering by pitch
  let plainRed = new THREE.Color('rgba(255, 31, 15)');
  let plainRedOrange = new THREE.Color('rgba(255, 114, 15)');
  let plainOrange = new THREE.Color('rgba(255, 153, 0)');
  let plainOrangeYellow = new THREE.Color('rgba(255, 200, 0)');
  let plainYellow = new THREE.Color('rgba(255, 229, 0)');
  let plainYeondu = new THREE.Color('rgba(166, 255, 0)');
  let plainGreen = new THREE.Color('rgba(0, 255, 25)');
  let plainCyan = new THREE.Color('rgba(0, 255, 210)');
  let plainBlue = new THREE.Color('rgba(0, 132, 255)');
  let plainViolet = new THREE.Color('rgba(83, 0, 255)');
  let plainMagenta = new THREE.Color('rgba(255, 0, 248)');
  let plainPink = new THREE.Color('rgba(255, 0, 152)');

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
    mesh.position.set(30, -2, 10);
  } else if (maxChroma == 1) {
    mesh.position.set(30, 0, 10);
  } else if (maxChroma == 2){
    mesh.position.set(30, 2, 10);
  } else if (maxChroma == 3){
    mesh.position.set(30, 4, 10);
  } else if (maxChroma == 4){
    mesh.position.set(30, 6, 10);
  } else if (maxChroma == 5){
    mesh.position.set(30, 8, 10);
  } else if (maxChroma == 6){
    mesh.position.set(30, 10, 10);
  } else if (maxChroma == 7){
    mesh.position.set(30, 12, 10);
  } else if (maxChroma == 8){
    mesh.position.set(30, 14, 10);
  } else if (maxChroma == 9){
    mesh.position.set(30, 16, 10);
  } else if (maxChroma == 10){
    mesh.position.set(30, 18, 10);
  } else {
    mesh.position.set(30, 20, 10);
  }
}


function changeLineColorbyEnergy(Material){
  let cu_energy = (Math.round(energy) + 1) * 50;
  if (cu_energy >= 0 && cu_energy < 0.05){
    Material.color = new THREE.Color('rgba(76, 175, 80)');
  } else if (cu_energy >= 0.05 && cu_energy < 0.5){
    Material.color = new THREE.Color('rgba(139, 195, 74)');
  } else if (cu_energy >= 0.5 && cu_energy < 1){
    Material.color = new THREE.Color('rgba(205, 220, 57)');
  } else if (cu_energy >= 1 && cu_energy < 10){
    Material.color = new THREE.Color('rgba(255, 235, 59)');
  } else if (cu_energy >= 10 && cu_energy < 50){
    Material.color = new THREE.Color('rgba(255, 193, 7)');
  } else if (cu_energy >= 50 && cu_energy < 80){
    Material.color = new THREE.Color('rgba(255, 144, 7)');
  } else if (cu_energy <= 80 && cu_energy < 100){
    Material.color = new THREE.Color('rgba(244, 67, 54)');
  } else if (cu_energy >= 100){
    Material.color = new THREE.Color('rgba(255, 0, 0)');
  } 
}