import * as THREE from 'three';

import {
    Bloom
} from './Bloom.js'
import {
    TextureManager
} from './TextureManager.js';
export class MyThree {
    constructor(defaultShape) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            physicallyCorrectLights: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.pointLight = new THREE.PointLight(0xffffff, 30, 15);
        this.camera = new THREE.PerspectiveCamera(30, this.renderer.domElement.width / this.renderer.domElement.height, 2, 2000);
        this.ambientLight = new THREE.AmbientLight(0x000000, 100);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        this.directionalLight.castShadow

        this.group = new THREE.Group();

        //threshold, strength, radius
        this.bloom = new Bloom(0, 5, 1);

        this.counter = 0
        this.tailLength

        this.geometryType = defaultShape
        this.rotationSpeed = 0.01;

        this.geometryType = "square"

        this.materialParameters = {
            transmission: 0,
            thickness: 10,
            roughness: 0,
            color: [255, 255, 255],
            clearcoat: 1,
            clearcoatRoughness: 0,
            //texture: null,
        }

        this.textureManager = new TextureManager();
    }

    initialize() {
        // this.camera.position.set(0, 0, 150);
        this.camera.position.set(0, 0, 200);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 1.8, window.innerHeight / 1.5);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        document.getElementById("canvas").appendChild(this.renderer.domElement);
        this.directionalLight.position.set(100, 100, 100)

        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight)
        this.scene.add(this.group);
        this.scene.add(this.pointLight);
        this.GridHelper = new THREE.GridHelper(400, 100, 0x101010, 0x101010);
        this.GridHelper.rotateX(Math.PI * 0.5);
        this.GridHelper.position.set(0, 0, -100);
        this.GridHelper.receiveShadow = true;

        // this.GridMesh = new THREE.Mesh(this.GridHelper);
        // console.log(this.GridMesh.isMesh);
        this.GridHelper.renderOrder = this.bloom.getPassForMoonLight();
        this.scene.add(this.GridHelper);

        this.bloom.initialize(this.scene, this.camera, this.renderer)
        this.textureManager.loadTexture({
            wood: 'static/src/texture/wood.jpeg',
            // paper,
            // rock,
        })
    }

    render() {
        this.checkAllCandidatesForMoonLight()
        this.bloom.renderBloom()
        this.checkAllCandidatesForRestoration()
        this.bloom.renderFinal()
    }

    update() {
        this.startTime();
        this.pointLight.position.set(this.positionX, this.positionY, 0)
        // this.scene.traverse((obj) => {
        //     if (obj.isMesh) {
        //         obj.rotation.x += this.rotationSpeed
        //     }
        // })
    }

    startTime() {
        this.counter++
    }


    createColor(hue, saturation) {
        const lightness = 0.5
        this.color = new THREE.Color();
        this.color.setHSL(hue, saturation, lightness)
        this.materialParameters.color = this.color
    }

    createMesh(radius, positionX, positionY) {
        if (this.counter % 4 == 0) {
            this.radius = radius
            this.positionY = positionY
            this.positionX = positionX * this.counter - 100
            this.setTexture("wood")
            this.switchGeometry(this.geometryType)
            this.material = new THREE.MeshPhysicalMaterial(this.materialParameters)
            let mesh = new THREE.Mesh(this.geometry, this.material);

            mesh.position.set(this.positionX, this.positionY, 0);
            mesh.renderOrder = this.bloom.getPassForSunLight()
            this.group.add(mesh);
        }
    }


    pickGlowReceivers(tailLength) {
        this.tailLength = tailLength
        const head = this.tailLength + 1
        const tailEnd = this.group.children.length - head
        if (this.group.children.length > this.tailLength) {
            this.group.children[tailEnd].renderOrder = this.bloom.getPassForMoonLight()
        }

    }

    reset() {
        this.group.parent.remove(this.group);
        this.group = new THREE.Group();
        this.scene.add(this.group)

        this.counter = 0;
    }


    checkAllCandidatesForMoonLight() {
        this.scene.traverse((obj) => {
            if (this.bloom.isWorthyOfMoonLight(obj.type, obj.renderOrder)) {
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

    setMateriaParamaters = (materialParameters) => {
        this.materialParameters.transmission = materialParameters.transmission
        this.materialParameters.roughness = materialParameters.roughness
    }
    setTexture(textureName) {

        this.materialParameters.map = this.textureManager.getTexture(textureName)
    }

    switchGeometry = (geometry) => {
        this.geometryType = geometry
        switch (this.geometryType) {
            case "circle":
                this.geometry = new THREE.SphereGeometry(this.radius, 16, 8);
                //this.geometry = new THREE.CircleGeometry(this.radius, 32);
                break;
            case "square":
                this.geometry = new THREE.BoxGeometry(this.radius * 2, this.radius * 2, this.radius * 2);
                break;
            case 'triangle':
                this.geometry = new THREE.ConeGeometry(this.radius * 2, 20, 32);
                break;
            case 'decagon':
                this.geometry = new THREE.CylinderGeometry(this.radius, this.radius, 10, 32);
                break;
            case 'star':
                let starPoints = [];

                let scale = this.radius
                starPoints.push(new THREE.Vector2(0, 10));
                starPoints.push(new THREE.Vector2(10 / scale, 10 / scale));
                starPoints.push(new THREE.Vector2(40 / scale, 10 / scale));
                starPoints.push(new THREE.Vector2(20 / scale, -10 / scale));
                starPoints.push(new THREE.Vector2(30 / scale, -50 / scale));
                starPoints.push(new THREE.Vector2(0 / scale, -20 / scale));
                starPoints.push(new THREE.Vector2(-30 / scale, -50 / scale));
                starPoints.push(new THREE.Vector2(-20 / scale, -10 / scale));
                starPoints.push(new THREE.Vector2(-40 / scale, 10 / scale));
                starPoints.push(new THREE.Vector2(-10 / scale, 10 / scale));

                let extrusionSettings = {
                    size: 0,
                    height: 0,
                    curveSegments: 1,
                    bevelThickness: 1,
                    bevelSize: 2,
                    bevelEnabled: false

                };
                let shape = new THREE.Shape(starPoints);
                this.geometry = new THREE.ExtrudeGeometry(shape, extrusionSettings);

                break;
        }

    }
}