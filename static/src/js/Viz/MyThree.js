import * as THREE from 'three';
import {
    Bloom
} from './Bloom.js'

import {
    GUI
} from 'three/examples/jsm/libs/lil-gui.module.min.js';

export class MyThree {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            physicallyCorrectLights: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.pointLight = new THREE.PointLight(0xffffff, 30, 15);
        this.camera = new THREE.PerspectiveCamera(30, this.renderer.domElement.width / this.renderer.domElement.height, 2, 2000);
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa, 100);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        this.directionalLight.castShadow

        this.group = new THREE.Group();

        //threshold, strength, radius
        this.bloom = new Bloom(0, 5, 1);

        this.counter = 0;
        this.createGUI();

    }

    initialize() {
        this.camera.position.set(0, 0, 150);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        document.getElementById("canvas").appendChild(this.renderer.domElement);
        this.directionalLight.position.set(100, 100, 100)

        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight)
        this.scene.add(this.group);
        this.scene.add(this.pointLight)

        this.bloom.initialize(this.scene,this.camera,this.renderer)
    }

    render() {
        this.checkAllCandidatesForMoonLight()
        this.bloom.renderBloom()
        this.checkAllCandidatesForRestoration()
        this.bloom.renderFinal()
    }

    update() {
        this.pointLight.position.set(this.positionX, this.positionY, 0)
    }

    createColor(hue, saturation) {
        const lightness = 0.5
        this.color = new THREE.Color();
        this.color.setHSL(hue, saturation, lightness)
    }

    createMesh(radius, positionX, positionY) {
        this.positionY = positionY
        this.positionX = positionX * this.counter - 100

        this.GUIGeometry(radius)
        // this.geometry = new THREE.SphereGeometry(radius, 16, 8);
        this.material = new THREE.MeshPhysicalMaterial({
            transmission: 0.99,
            thickness: 0.1,
            roughness: 0.1,
            color: this.color,
            clearcoat: 1,
            clearcoatRoughness: 0.1,
        })
        let mesh = new THREE.Mesh(this.geometry, this.material);

        mesh.position.set(this.positionX, this.positionY, 0);
        mesh.renderOrder = this.bloom.getPassForSunLight()
        this.group.add(mesh);
    }


    pickGlowReceivers() {
        const tailStart = 5
        const head = tailStart + 1
        const tailEnd = this.counter - head
        if (this.counter > tailStart) {
            this.group.children[tailEnd].renderOrder = this.bloom.getPassForMoonLight()
        }
        this.counter += 1;
    }

    reset() {
        this.group.parent.remove(this.group);
        this.group = new THREE.Group();
        this.scene.add(this.group)

        this.counter = 0;
    }


    checkAllCandidatesForMoonLight() {
        this.scene.traverse((obj) => {
            if (this.bloom.isWorthyOfMoonLight(obj.isMesh, obj.renderOrder)) {
                this.bloom.giveMoonLight(obj.uuid, obj.material.color)
            }
        })
    }

    checkAllCandidatesForRestoration() {
        this.scene.traverse((obj) => {
            if (this.bloom.isMoonLightReceiver(obj.uuid)) {
                this.bloom.restoreToOriginalState(obj.material, obj.uuid)
                this.bloom.deleteMoonLightPass(obj.uuid);
            }

        })
    }


    GUIGeometry(radius) {
        switch (this.controls.geometry) {
            case "Sphere":
                this.geometry = new THREE.SphereGeometry(radius, 16, 8);
                break;
            case "Box":
                this.geometry = new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);
                break;
            case 'Cone':
                this.geometry = new THREE.ConeGeometry(radius * 2, radius * 2, 8);
                break;
            case 'Cylinder':
                this.geometry = new THREE.CylinderGeometry(radius, radius, 20, 32);
                break;
        }

    }
    createGUI() {
        this.controls = {
            geometry: "Sphere"
        }
        this.gui = new GUI();
        this.guiFolder = this.gui.addFolder('Selet Geometry');
        this.guiFolder.add(this.controls, 'geometry', ["Sphere", "Box", "Cone", "Cylinder"]).listen()

    }

}