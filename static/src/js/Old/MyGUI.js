import * as THREE from 'three';
import {
    GUI
} from 'three/examples/jsm/libs/lil-gui.module.min.js';

export class MyGUI {
    constructor() {
        this.controls = {
            geometry: "Sphere"
        }
        this.gui = new GUI();
        this.guiGeometryFolder = this.gui.addFolder('Selet Geometry');
        this.guiGeometryFolder.add(this.controls, 'geometry', ["Sphere", "Box", "Cone", "Cylinder"]).listen()
    }

    switchGeometry(radius) {
        switch (this.controls.geometry) {
            case "Sphere":
                return new THREE.SphereGeometry(radius, 16, 8);

            case "Box":
                return new THREE.BoxGeometry(radius * 2, radius * 2, radius * 2);

            case 'Cone':
                return new THREE.ConeGeometry(radius * 2, radius * 2, 8);

            case 'Cylinder':
                return new THREE.CylinderGeometry(radius, radius, 20, 32);
        }
    }
    


}