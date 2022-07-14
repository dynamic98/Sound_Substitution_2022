
import * as THREE from 'three';

export class MyMaterial{
    constructor(color){
    
        this.material = new THREE.MeshPhysicalMaterial({
            transmission:  0.99,
            thickness: 0.9,
            roughness: 0.9,
            color: color,
            clearcoat:1,
            clearcoatRoughness: 0.1,
        })
    }

    getMaterial(){
        return this.material
    }
}