import * as THREE from 'three';
class Mesh {
    constructor() {}

    setRenderOption(renderOrder) {
        this.mesh.renderOrder = renderOrder
    }

    getMesh() {
        return this.mesh
    }
}

export class VisualNote extends Mesh {
    constructor(material, geometry, positionX, positionY) {
        super()
        this.material = material;
        this.geometry = geometry;
        this.positionX = positionX;
        this.positionY = positionY

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.positionX, this.positionY, 0)
    }

    getPosition() {
        return new THREE.Vector3(this.positionX, this.positionY, 0)
    }
}

export class Line extends Mesh {
    constructor(firstPoint, secondPoint) {
        super();

        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff
        })
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            [
                firstPoint,
                secondPoint
            ]
        )
        this.mesh = new THREE.Line(this.geometry, this.material);
    }
    static visibility = true;

    static isVisible() {
        return this.visibility
    }
    // static element = document.getElementsByClassName("checkbox")


    static setVisibility = (boolean) => {
        console.log("switched")
        this.visibility = boolean
    }
}