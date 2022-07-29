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
                let scaler = 12;
                let decagonshape = new THREE.Shape()
                    .moveTo(-20 * this.radius/scaler, 0 * this.radius/scaler)
                    .lineTo(-9.96 * this.radius/scaler, 3.13 * this.radius/scaler)
                    .lineTo(-16.06 * this.radius/scaler, 12.35 * this.radius/scaler)
                    .lineTo(-6.17 * this.radius/scaler, 8.1 * this.radius/scaler)
                    .lineTo(-6.07 * this.radius/scaler, 20 * this.radius/scaler)
                    .lineTo(0 * this.radius/scaler, 10 * this.radius/scaler)
                    .lineTo(6.07 * this.radius/scaler, 20 * this.radius/scaler)
                    .lineTo(6.17 * this.radius/scaler, 8.1 * this.radius/scaler)
                    .lineTo(16.06 * this.radius/scaler, 12.35 * this.radius/scaler)
                    .lineTo(9.96 * this.radius/scaler, 3.13 * this.radius/scaler)
                    .lineTo(20 * this.radius/scaler, 0 * this.radius/scaler)
                    .lineTo(9.96 * this.radius/scaler, -3.13 * this.radius/scaler)
                    .lineTo(16.06 * this.radius/scaler, -12.35 * this.radius/scaler)
                    .lineTo(6.17 * this.radius/scaler, -8.1 * this.radius/scaler)
                    .lineTo(6.07 * this.radius/scaler, -20 * this.radius/scaler)
                    .lineTo(0 * this.radius/scaler, -10 * this.radius/scaler)
                    .lineTo(-6.07 * this.radius/scaler, -20 * this.radius/scaler)
                    .lineTo(-6.17 * this.radius/scaler, -8.1 * this.radius/scaler)
                    .lineTo(-16.06 * this.radius/scaler, -12.35 * this.radius/scaler)
                    .lineTo(-9.96 * this.radius/scaler, -3.13 * this.radius/scaler)
                    .lineTo(-20 * this.radius/scaler, 0 * this.radius/scaler);
                this.geometry = new THREE.ShapeGeometry(decagonshape);
                return this.geometry

            case 'star':
                let starPoints = [];
                let starscaler = 30;

                starPoints.push(new THREE.Vector2(0*this.radius/5, 10*this.radius/5));
                starPoints.push(new THREE.Vector2(10 * this.radius / starscaler, 10 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(40 * this.radius / starscaler, 10 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(20 * this.radius / starscaler, -10 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(30 * this.radius / starscaler, -50 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(0 * this.radius / starscaler, -20 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(-30 * this.radius / starscaler, -50 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(-20 * this.radius / starscaler, -10 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(-40 * this.radius / starscaler, 10 * this.radius / starscaler));
                starPoints.push(new THREE.Vector2(-10 * this.radius / starscaler, 10 * this.radius / starscaler));

                let starShape = new THREE.Shape(starPoints);
                this.geometry = new THREE.ExtrudeGeometry(starShape, this.starParameter);
                return this.geometry
            
        }

    }

}