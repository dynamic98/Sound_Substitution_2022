import * as THREE from 'three';

export class MaterialManager {
    constructor() {
        this.materialParameters = {
            transmission: 0.5,
            thickness: 1,
            roughness: 0.1,
            color: [255, 255, 255],
            clearcoat: 1,
            clearcoatRoughness: 0,
            map: null
        }
    }

    createMaterial(color, texture) {
        this.materialParameters.map = texture;
        this.materialParameters.color = color

        this.material = new THREE.MeshPhysicalMaterial(this.materialParameters)
        return this.material 
    }
}