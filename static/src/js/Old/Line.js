export class Line {

    constructor() {

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


}