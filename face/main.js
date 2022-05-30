
			import * as THREE from 'three';

			import Stats from 'three/examples/jsm/libs/stats.module.js';

			import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

			import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
			import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
			import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

			import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

			import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';


            let promise = new Promise(function(resolve, reject)
			{	
				try{
					resolve()
				}catch (err){
					reject(new Error ("not defined yet"));
				}
			});
			
            init();

			function init() {

				let mixer;
				let mesh;
				let head;

				const clock = new THREE.Clock();

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );
				camera.position.set( - 1.8, 0.8, 3 );

				const scene = new THREE.Scene();


				const renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );

				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.outputEncoding = THREE.sRGBEncoding;

				container.appendChild( renderer.domElement );

				const ktx2Loader = new KTX2Loader()
					.setTranscoderPath( './basis/' )
					.detectSupport( renderer );

				new GLTFLoader()
					.setKTX2Loader( ktx2Loader )
					.setMeshoptDecoder( MeshoptDecoder )
					.load( './models/facecap.glb', ( gltf ) => {

						// const mesh = gltf.scene.children[ 0 ];
						mesh = gltf.scene.children[ 0 ];

						scene.add( mesh );
						
						// mixer = new THREE.AnimationMixer( mesh );

						// mixer.clipAction( gltf.animations[ 0 ] ).play();

						// GUI

						// const head = mesh.getObjectByName( 'mesh_2' );
						head = mesh.getObjectByName( 'mesh_2' );
						
						// head = mesh.getObjectByName( 'mesh_2' );
						const influences = head.morphTargetInfluences;

						const gui = new GUI();
						gui.close();

						for ( const [ key, value ] of Object.entries( head.morphTargetDictionary ) ) {
							
							gui.add( influences, value, 0, 1, 0.01 )
								.name( key.replace( 'blendShape1.', '' ) )
								.listen( influences );

						}
						return promise;
                    });

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.background = new THREE.Color( 0x666666 );
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 2.5;
				controls.maxDistance = 5;
				controls.minAzimuthAngle = - Math.PI / 2;
				controls.maxAzimuthAngle = Math.PI / 2;
				controls.maxPolarAngle = Math.PI / 1.8;
				controls.target.set( 0, 0.15, - 0.2 );

				const stats = new Stats();
				container.appendChild( stats.dom );
				let TimeisGold = 0;
				renderer.setAnimationLoop( async () => {

					const delta = clock.getDelta();

					// if ( mixer ) {

					// 	mixer.update( delta );

					// }
					

					// console.log(head.morphTargetDictionary);
					// console.log(mesh);
					// console.log(promise);
					promise.then(()=>{
						// head.morphTargetDictionary = 51;
						let face = head.morphTargetInfluences;
						// console.log(face);
						// face['browInnerUp'] = 50;
						TimeisGold = TimeisGold+delta
						if (TimeisGold > 1){
							TimeisGold = 0;
						}
						face[0] = TimeisGold;
						face[1] = 1;
						face[4] = 1;

						// console.log(head.morphTargetDictionary['browInnerUp']);
						// console.log(mesh.getObjectByName('mesh_2'));
					}).catch((err)=>{
						// console.log("not defined Yet")
					});

					renderer.render( scene, camera );

					controls.update();

					stats.update();

				} );

				window.addEventListener( 'resize', () => {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();

					renderer.setSize( window.innerWidth, window.innerHeight );

				} );
            }
