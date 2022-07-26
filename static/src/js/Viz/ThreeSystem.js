import * as THREE from 'three';

export class ThreeSystem {
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
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        this.directionalLight.castShadow
        this.groups = {

        }
    }

    initialize() {
        this.camera.position.set(0, 0, 200);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 1.8, window.innerHeight / 1.5);
        this.renderer.toneMapping = THREE.ReinhardToneMapping;

        document.getElementById("canvas").appendChild(this.renderer.domElement);
        this.directionalLight.position.set(100, 100, 100)

        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight)
        this.scene.add(this.pointLight);
    }

    getScene() {
        return this.scene
    }

    getCamera() {
        return this.camera
    }
    getRenderer() {
        return this.renderer
    }
    addToScene(element) {
        this.scene.add(element)
    }

    addToGroup(element, groupName) {

        if (this.groups[groupName] == undefined) {
            this.groups[groupName] = new THREE.Group();
            this.scene.add(this.groups[groupName])
        }
        this.groups[groupName].add(element)
    }

    forEach(callback) {
        this.scene.traverse((obj) => {
            callback(obj)
        })
    }

    updateLightPosition(positionX, positionY) {
        this.pointLight.position.set(positionX, positionY, 0)
    }

    reset() {
        for (let index in this.groups) {

            this.scene.remove(this.groups[index])
            this.groups[index] = new THREE.Group();
            this.scene.add(this.groups[index])


        }
    }




}