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
            height: 10,
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
        this.decagonParameter = {
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
                let decagonshape = new THREE.Shape()
                    .moveTo(-20 / this.radius, 0 / this.radius)
                    .lineTo(-9.96 / this.radius, 3.13 / this.radius)
                    .lineTo(-16.06 / this.radius, 12.35 / this.radius)
                    .lineTo(-6.17 / this.radius, 8.1 / this.radius)
                    .lineTo(-6.07 / this.radius, 20 / this.radius)
                    .lineTo(0 / this.radius, 10 / this.radius)
                    .lineTo(6.07 / this.radius, 20 / this.radius)
                    .lineTo(6.17 / this.radius, 8.1 / this.radius)
                    .lineTo(16.06 / this.radius, 12.35 / this.radius)
                    .lineTo(9.96 / this.radius, 3.13 / this.radius)
                    .lineTo(20 / this.radius, 0 / this.radius)
                    .lineTo(9.96 / this.radius, -3.13 / this.radius)
                    .lineTo(16.06 / this.radius, -12.35 / this.radius)
                    .lineTo(6.17 / this.radius, -8.1 / this.radius)
                    .lineTo(6.07 / this.radius, -20 / this.radius)
                    .lineTo(0 / this.radius, -10 / this.radius)
                    .lineTo(-6.07 / this.radius, -20 / this.radius)
                    .lineTo(-6.17 / this.radius, -8.1 / this.radius)
                    .lineTo(-16.06 / this.radius, -12.35 / this.radius)
                    .lineTo(-9.96 / this.radius, -3.13 / this.radius)
                    .lineTo(-20 / this.radius, 0 / this.radius);
                this.geometry = new THREE.ShapeGeometry(decagonshape);
                return this.geometry

            case 'star':
                let starPoints = [];
                starPoints.push(new THREE.Vector2(0, 10));
                starPoints.push(new THREE.Vector2(10 / this.radius / 2, 10 / this.radius / 2));
                starPoints.push(new THREE.Vector2(40 / this.radius / 2, 10 / this.radius / 2));
                starPoints.push(new THREE.Vector2(20 / this.radius / 2, -10 / this.radius / 2));
                starPoints.push(new THREE.Vector2(30 / this.radius / 2, -50 / this.radius / 2));
                starPoints.push(new THREE.Vector2(0 / this.radius / 2, -20 / this.radius / 2));
                starPoints.push(new THREE.Vector2(-30 / this.radius / 2, -50 / this.radius / 2));
                starPoints.push(new THREE.Vector2(-20 / this.radius / 2, -10 / this.radius / 2));
                starPoints.push(new THREE.Vector2(-40 / this.radius / 2, 10 / this.radius / 2));
                starPoints.push(new THREE.Vector2(-10 / this.radius / 2, 10 / this.radius / 2));

                let starShape = new THREE.Shape(starPoints);
                this.geometry = new THREE.ExtrudeGeometry(starShape, this.starParameter);
                return this.geometry
            
        }

    }

}