import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

export class Visualizer {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            physicallyCorrectLights:true,
        });
        this.scene.add(this.directionalLight);
        this.camera = new THREE.PerspectiveCamera(30, this.renderer.domElement.width / this.renderer.domElement.height, 2, 2000);
        this.container = document.getElementById("canvas");
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 100);
        this.directionalLight = new THREE.DirectionalLight( 0xffffff,1 );
        this.pointLight = new THREE.PointLight(0xffffff, 30, 10);
        this.pointLight.castShadow=true;

        this.group = new THREE.Group();
        this.now_geometry = 30000;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.initialize();
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

    }
    initialize() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
        //카메라 위치가 중간에 있지 않다.  
        this.camera.position.set(100, 0, 150);
        this.container.appendChild(this.renderer.domElement);
        this.directionalLight.position.set(100,100,100)
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight)
        this.scene.add(this.pointLight);
        this.scene.add(this.group);
    
        this.renderer.render(this.scene, this.camera);
        this.options = {
            transmission: 0.99,
            thickness: 0.1,
            roughness: 0.1,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        };

    }

    render() {
        this.renderer.render(this.scene, this.camera);
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
        this.i_PosX = this.counter * PitchWidth;
        this.i_PosY = PitchHeight * (i_Pitch - 60) - 10;
        this.i_Radius = PitchHeight * (i_Energy * 5);
        this.counter += 1;
    }

    createGeometry() {
        let geometry = new THREE.SphereGeometry(this.i_Radius, 16, 8);
        this.pointLight.position.set(this.i_PosX, this.i_PosY,0);

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
        mesh.position.set(this.i_PosX, this.i_PosY, 0);
        this.group.add(mesh);

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


}