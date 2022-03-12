// let controls;
// let camera, scene, renderer;
// let container, stats;


// function createShapeHeart(){

//     container = document.getElementById( "container" );
//     renderer = new THREE.WebGLRenderer();
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.toneMapping = THREE.ACESFilmicToneMapping;
//     container.appendChild(renderer.domElement);

//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 20000);
//     camera.position.set(1, 20, 100);


//     const x = 0;
//     const y = 0;

//     const heartShape = new THREE.Shape();

//     heartShape.moveTo( x + 5, y + 5 );
//     heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
//     heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
//     heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
//     heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
//     heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
//     heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

//     const shapeHeartGeometry = new THREE.ShapeGeometry(heartShape);

//     const shapeHeartMaterial = new THREE.MeshBasicMaterial({
//         color: '#FFFFFF',
//         wireframe: true
//     });

//     var shapeHeartMesh = new THREE.Mesh(shapeHeartGeometry, shapeHeartMaterial);
    
//     shapeHeartMesh.position.set(0, 0, 0);

//     group.add(shapeHeartMesh);

//     var ambientLight = new THREE.AmbientLight(0xaaaaaa);
//     scene.add(ambientLight);

//     var spotLight = new THREE.SpotLight(0xffffff);
//     spotLight.intensity = 0.9;
//     spotLight.position.set(-10, 40, 20);
    
//     spotLight.lookAt(shapeHeartMesh);
//     spotLight.castShadow = true;
//     scene.add(spotLight);

//     // document.getElementById('container').appendChild(renderer.domElement);
//     scene.add(group);
// }

// // function decideShow(){
// //     // 시각화 보여주기
// //     const x = 0;
// //     const y = 0;

// //     const heartShape = new THREE.Shape();

// //     heartShape.moveTo( x + 5, y + 5 );
// //     heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// //     heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// //     heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// //     heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// //     heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// //     heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// //     const GeometryNew = new THREE.ShapeGeometry(heartShape);

// //     const MaterialNew = new THREE.MeshBasicMaterial({
// //         color: '#FFFFFF',
// //         wireframe: true
// //     });

// //     // var compoNew = new THREE.Mesh(GeometryNew, MaterialNew);


// //     // 여기서 원래 있던 sphere geometry 를 삭제하고 새로 올려야함 (delete >>> append)
// //     // document.getElementById('container').appendChild (renderer.domElement);
// //     return GeometryNew, MaterialNew
// // };

// // var GeometryNew, MaterialNew = decideShow();


// export { createShapeHeart };