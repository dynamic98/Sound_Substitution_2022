
			import * as THREE from 'three';

			import Stats from 'three/examples/jsm/libs/stats.module.js';

			import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

			import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
			import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
			import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

			import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

			import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
			import { pickr, analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, audio_context, src } from './modules.js';
			let scene;
			let renderer;
			let camera;
			const container = document.getElementById( "canvas" );


			function saveColor(){
				pickr.on('save', (color, instance) => {
				const userColor = color.toHEXA().toString();
				document.querySelector('#userCustom').innerHTML = userColor;
				
			  })
			  }

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
				

				renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
				renderer.setPixelRatio(window.devicePixelRatio);
				renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
				camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 2, 2000);
				// camera.position.set(1, 20, 100);
				camera.position.set( - 1.8, 0.8, 3 );

			  

				container.appendChild( renderer.domElement )

				// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 20 );

				scene = new THREE.Scene();


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
					// console.log(maxChroma);
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
						// TimeisGold = TimeisGold+delta
						// if (TimeisGold > 1){
						// 	TimeisGold = 0;
						// }
						// face[0] = TimeisGold;
						face[0] = maxChroma/12;
						face[5] = chroma[0]/12;
						face[6] = chroma[0]/12;

						face[13] = chroma[5]/12;
						face[14] = chroma[5]/12;
						// face[8] = maxChroma/12;
						// console.log(energy);
						face[37] = energy/70;
						face[38] = energy/70;


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
