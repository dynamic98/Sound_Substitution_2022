import * as THREE from 'three';

export class VisualNote {
    constructor(material, geometry, positionX, positionY) {
        this.material = material;
        this.geometry = geometry;
        this.positionX = positionX;
        this.positionY = positionY

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.positionX, this.positionY, 0)
    }

    setRenderOption(renderOrder) {
        this.mesh.renderOrder = renderOrder
    }

    getMesh() {
        return this.mesh
    }

}