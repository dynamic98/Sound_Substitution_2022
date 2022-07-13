import * as THREE from 'three';
import { Mesh } from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
    EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {
    RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {
    ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {
    UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class Visualizer {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            physicallyCorrectLights: true,
        });
        this.camera = new THREE.PerspectiveCamera(30, this.renderer.domElement.width / this.renderer.domElement.height, 2, 2000);
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 100);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.pointLight = new THREE.PointLight(0xffffff, 30, 15);
        this.pointLight.castShadow = true;
        this.group = new THREE.Group();
        this.DictPitch = {
            0: "C",
            1: "C#",
            2: "D",
            3: "D#",
            4: "E",
            5: "F",
            6: "F#",
            7: "G",
            8: "G#",
            9: "A",
            10: "A#",
            11: "B"
        };
        this.counter = 0;
        this.materials = []
    }

    initialize() {
        this.camera.position.set(0, 0, 150);

        this.darkMaterial = new THREE.MeshBasicMaterial({
            color: 'black'
        });


        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        document.getElementById("canvas").appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.directionalLight.position.set(100, 100, 100)

        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight)
        this.scene.add(this.pointLight);
        this.scene.add(this.group);

        this.options = {
            transmission: 0.99,
            thickness: 0.9,
            roughness: 0.9,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        };

    }

    render() {
        this.renderBloom();
        this.finalComposer.render();

    }

    Kandinsky(bpm, [pitch, energy]) {
        let PitchHeight = 40 / 59; //40은 캔버스 59는 미디 범위 c0가 0인가 1 음 간격 수직 
        let PitchWidth = 40 / (60 * 4 * 13 / bpm) // 음사이의 간격. 수평 13 프레임레이트. 

        let i_Pitch = pitch
        this.octave = Math.floor((i_Pitch) / 12) - 1; //옥타브 구하는 방식
        this.tone = (i_Pitch) % 12;
        // Make reminder positive integer

        let i_Energy = energy
        // console.log(i_Energy);
        if (i_Energy < 0.15) {
            i_Energy = 0;
        }
        this.i_PosX = this.counter * PitchWidth - 100
        this.i_PosY = PitchHeight * (i_Pitch - 60) - 10;
        this.i_Radius = PitchHeight * (i_Energy * 5);


    }

    createGeometry() {
        let geometry = new THREE.SphereGeometry(this.i_Radius, 16, 8);
        this.pointLight.position.set(this.i_PosX, this.i_PosY, 0);

        let Color = new THREE.Color();
        Color.setHSL(this.tone / 12, (this.octave - 1) / 5, 0.5) //도를 빨강으로 hsv 12 normalize, s는 적당히
        const material = new THREE.MeshPhysicalMaterial({
            transmission: this.options.transmission,
            thickness: this.options.thickness,
            roughness: this.options.roughness,
            color: Color,
            clearcoat: this.options.clearcoat,
            clearcoatRoughness: this.options.clearcoatRoughness,
        });
        let mesh = new THREE.Mesh(geometry, material);

        mesh.renderOrder=1
        mesh.position.set(this.i_PosX, this.i_PosY, 0);
        this.group.add(mesh);


        if (this.counter > 5) {
            this.group.children[this.counter - 6].renderOrder=0
        }
        this.counter += 1;
        console.log(this.counter)
    }

    cameraUpdate() {
        this.camera.position.x = this.i_PosX - 60;
    }

    deleteDrawing() {
        this.group.parent.remove(this.group);
        this.group = new THREE.Group();
        this.scene.add(this.group)

        this.counter = 0;
    }

    initializeBloom() {

        const BLOOM_SCENE = 1;
        this.bloomLayer = new THREE.Layers();
        this.bloomLayer.set(BLOOM_SCENE);

        const params = {
            exposure: 0,
            bloomStrength: 5,
            bloomThreshold: 0,
            bloomRadius: 0,
        };

        this.renderScene = new RenderPass(this.scene, this.camera);

        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth / 2.24, window.innerHeight / 2.1), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = params.bloomThreshold;
        this.bloomPass.strength = params.bloomStrength;
        this.bloomPass.radius = params.bloomRadius;

        this.bloomComposer = new EffectComposer(this.renderer);
        this.bloomComposer.addPass(this.renderScene);
        this.bloomComposer.addPass(this.bloomPass)
        this.bloomComposer.renderToScreen = false;

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: {
                        value: null
                    },
                    bloomTexture: {
                        value: this.bloomComposer.renderTarget2.texture
                    }
                },
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,
                defines: {}
            }), 'baseTexture'
        );
        finalPass.needsSwap = true;

        this.finalComposer = new EffectComposer(this.renderer);
        this.finalComposer.render();
        this.finalComposer.addPass(this.renderScene);
        this.finalComposer.addPass(finalPass);

    }
    renderBloom() {
       this.scene.traverse(this.darkenNonBloomed.bind(this));
        this.bloomComposer.render();
        this.scene.traverse(this.restoreMaterial.bind(this));
    }
    darkenNonBloomed(obj) {
        const show=1
        if (obj.isMesh && obj.renderOrder !=show) {
            this.materials[obj.uuid] = _.cloneDeep(obj.material.color)
            obj.material.color.r = 0;
            obj.material.color.g = 0;
            obj.material.color.b = 0;
        }
    }

    restoreMaterial(obj) {
        if (this.materials[obj.uuid]) {
            obj.material.color.r = this.materials[obj.uuid].r;
            obj.material.color.g = this.materials[obj.uuid].g;
            obj.material.color.b = this.materials[obj.uuid].b;
            delete this.materials[obj.uuid];
        }

    }

}