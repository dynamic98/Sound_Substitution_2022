import * as THREE from 'three';

export class GeometryManager {
    constructor(selectedGeometryType) {
        this.geometryTypeList = ['circle', 'square', 'triangle', 'decagon', 'star']
        this.selectedGeometryType = selectedGeometryType
        this.geometry;
        this.radius

        this.sphereParameters = {
            radius: null,
            widthSegments: 16,
            heightSegments: 8
        }

        this.squareParameters = {
            width: null,
            height: null,
            depth: null,
        }

        this.coneParameters = {
            radius: null,
            height: 5,
            radialSegments: 32
        }

        this.cylinderParameters = {
            radiusTop: null,
            radiusBottom: null,
            height: 10,
            radialSegments: 32
        }

        this.starParameter = {
            size: 0,
            height: 0,
            curveSegments: 1,
            bevelThickness: 1,
            bevelSize: 2,
            bevelEnabled: false
        }

    }

    setRadius(radius) {
        this.radius = radius
    }

    setGeometryType = (selectedGeometryType) => {
        if (!this.geometryTypeList.includes(selectedGeometryType)) {
            console.error(`Unsupported Geometry Type. Only ${this.geometryTypeList} are supported`)
        } else {
            this.selectedGeometryType = selectedGeometryType
        }

    }
    getGeometry() {
        console.log(this.selectedGeometryType)
        switch (this.selectedGeometryType) {
            case "circle":
                this.geometry = new THREE.SphereGeometry(
                    this.radius,
                    this.sphereParameters.widthSegments,
                    this.sphereParameters.heightSegments,
                )
                return this.geometry
            case "square":
                this.geometry = new THREE.BoxGeometry(
                    this.radius * 2,
                    this.radius * 2,
                    this.radius * 2
                );
                return this.geometry

            case 'triangle':
                this.geometry = new THREE.ConeGeometry(
                    this.radius * 2,
                    this.coneParameters.height,
                    this.coneParameters.radialSegments
                );
                return this.geometry

            case 'decagon':
                this.geometry = new THREE.CylinderGeometry(
                    this.radius,
                    this.radius,
                    this.cylinderParameters.height,
                    this.cylinderParameters.radialSegments
                );
                return this.geometry

            case 'star':
                let starPoints = [];
                starPoints.push(new THREE.Vector2(0, 10));
                starPoints.push(new THREE.Vector2(10 / this.radius, 10 / this.radius));
                starPoints.push(new THREE.Vector2(40 / this.radius, 10 / this.radius));
                starPoints.push(new THREE.Vector2(20 / this.radius, -10 / this.radius));
                starPoints.push(new THREE.Vector2(30 / this.radius, -50 / this.radius));
                starPoints.push(new THREE.Vector2(0 / this.radius, -20 / this.radius));
                starPoints.push(new THREE.Vector2(-30 / this.radius, -50 / this.radius));
                starPoints.push(new THREE.Vector2(-20 / this.radius, -10 / this.radius));
                starPoints.push(new THREE.Vector2(-40 / this.radius, 10 / this.radius));
                starPoints.push(new THREE.Vector2(-10 / this.radius, 10 / this.radius));

                let shape = new THREE.Shape(starPoints);
                this.geometry = new THREE.ExtrudeGeometry(shape, this.starParameter);
                return this.geometry

        }

    }

}