import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { pickr } from './pickr.js';

let controls;
let camera, scene, renderer;
let container, stats;

// BASIC EVENTS
init();
animate();


// REQUIRED FUNCTIONS
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
    stats.update(); // 왜냐면 여기에서 DOM 에서 바뀐 점이 업데이트되기 때문
  }


// render function
function render() {
  renderer.render(scene, camera);
}



// LOAD MUSIC (vizIntit)
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


    // meyda analyser
    var chroma = 0;
    var maxChroma = 0;
    var energy = 0;
    var amplitudeSpectrum = 0;
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

    var group = new THREE.Group();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,100);
    camera.lookAt(scene.position);
    scene.add(camera);
  

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry
    var Geometry = new THREE.RingGeometry(13, 10, 8, 13, 6, 6.283185307179586);
    var Material = new THREE.MeshLambertMaterial({
      color: '#FFFFFF',
      wireframe: true,
      side: THREE.DoubleSide
    });

    // * 중요 * Geometry + Material = Mesh(최종) 형태로 바꾸어줌
    var compoCenter = new THREE.Mesh(Geometry, Material);
    // var compoLeft = new THREE.Mesh(Geometry, Material);
    // var compoRight = new THREE.Mesh(Geometry, Material);

    compoCenter.position.set(0, 0, 0);
    // compoLeft.position.set(-80, 0, 30);
    // compoRight.position.set(80, 0, 30);

    group.add(compoCenter);
    // group.add(compoLeft);
    // group.add(compoRight);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    
    spotLight.lookAt(compoCenter);
    // spotLight.lookAt(compoLeft);
    // spotLight.lookAt(compoRight);
    spotLight.castShadow = true;
    scene.add(spotLight);

  
    document.getElementById('container').appendChild(renderer.domElement);

    render();         // render - 음악에 맞는 시각화 모션 불러오기

    scene.add(group); // 마지막에 group 을 scene 에 추가
    




    // EVENTS
    var saveButton = document.getElementsByClassName("pcr-save");
    const shape_heart = document.getElementById("shape_heart");

    // GEOMETRY
    var now_geometry = '';
    let shape_heart_cnt = 0;
    let button_shape_heart_cnt = 0;


    // EVENT LISTENERS
    shape_heart.addEventListener("click", ()=>{
      shape_heart_cnt += 1
      console.log('하트가 눌린 갯수', shape_heart_cnt);
      deleteBasics();
      containerRender();
      createShapeHeart();
      now_geometry = 'shape_heart';
    });


    // save 버튼을 누르면 하트의 색을 바꿔주는 함수
    saveButton[0].addEventListener("click", ()=>{
       button_shape_heart_cnt += 1;
       console.log('버튼이 눌린 갯수', button_shape_heart_cnt);
       if (shape_heart_cnt != 0 && shape_heart_cnt % 2 == 1 && now_geometry == 'shape_heart') {
          deleteBasics();
          containerRender();
          createShapeHeart();
          now_geometry = 'shape_heart';
       }
    });
    
    // RENDER FUNCTION
    function containerRender(){
      container = document.getElementById( "container" );
      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);
    }

    // COLOR SAVE & CHANGE FUNCTION
    function saveColor(){
      pickr.on('save', (color, instance) => {
        const userColor = color.toHEXA().toString();
        document.querySelector('#userCustom').innerHTML = userColor;
      })
    };

    function changeColor(){
      var userColor = document.querySelector('#userCustom').innerHTML;
      Material.color = new THREE.Color(userColor);
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


    // DELETE FUNCTION
    function deleteBasics(){
      group.remove(compoCenter);
      // group.remove(compoLeft);
      // group.remove(compoRight);
    };


    // UPDATING GEOMETRY FUNCTION
    function updateGroupGeometry( mesh, geometry ) {
      mesh.geometry.dispose();
      mesh.geometry = geometry;
    }


    // ** CUSTOMIZING BUTTON FUNCTIONS **
    // (1) ShapeGeometry - heart
    function createShapeHeart(){
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 20000);
      camera.position.set(1, 20, 100);

      const x = 0;
      const y = 0;
  
      const heartShape = new THREE.Shape();
  
      heartShape.moveTo( x + 5, y + 5 );
      heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
      heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
      heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
      heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
      heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
      heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
  
      var shapeHeartGeometry = new THREE.ShapeGeometry(heartShape);
      
      var shapeHeartMaterial = new THREE.MeshBasicMaterial({
          color: '#FFFFFF',
          wireframe: false
      });

      // color
      var userColor = document.querySelector('#userCustom').innerHTML;
      shapeHeartMaterial.color = new THREE.Color(userColor);
      changeColorByChroma(shapeHeartMaterial);

      // mesh position
      var shapeHeartMeshCenter = new THREE.Mesh(shapeHeartGeometry, shapeHeartMaterial);

      shapeHeartMeshCenter.position.set(0, 0, 0);
      group.add(shapeHeartMeshCenter);

      // light
      var ambientLight = new THREE.AmbientLight(0xaaaaaa);
      scene.add(ambientLight);
  
      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.intensity = 0.9;
      spotLight.position.set(-10, 40, 20);
      
      spotLight.lookAt(shapeHeartMeshCenter);
      // spotLight.lookAt(shapeHeartMeshLeft);
      // spotLight.lookAt(shapeHeartMeshRight);
      spotLight.castShadow = true;
      scene.add(spotLight);
      scene.add(group);
      return shapeHeartMeshCenter
  }


    // * 중요 * 렌더링 할 때 시각화 output 의 요소를 바꿔주기
    // * 중요 * 버튼 하나를 클릭할 때마다 렌더링이 된다
    function render() {
      // color rendering
      saveColor();
      changeColor();

      changeColorByChroma(Material);


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

      // SHAPE (HEART) Rendering
      if (now_geometry == 'shape_heart') {
        var shapeHeartMeshCenter = createShapeHeart();
        
        // // mesh position changing
        // shapeHeartMeshCenter.rotation.z = time * 1.2;
        shapeHeartMeshCenter.position.y = maxChroma  * 10;
        shapeHeartMeshCenter.position.x = energy * 3;
        // shapeHeartMeshCenter.position.z = Math.sin(time) * 20 + 5;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        audio.play();
        console.log('rendering finished!');

      } else { 
        
        updateGroupGeometry( compoCenter,
          new THREE.RingGeometry(
            13, amplitudeSpectrum[1], 8, 13, 6, maxChroma
        ));
        // compoCenter.rotation.z = time * 1.2;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        audio.play();
      }

    }
  }
}

window.onload = vizInit();


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

