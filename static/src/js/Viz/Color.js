import * as THREE from 'three';

export class Color {
    constructor(hue, saturation, lightness) {
        this.color = new THREE.Color(hue, saturation, lightness)
    }

    setColor = (hue, saturation, lightness) => {
        this.color.setHSL(hue, saturation, 0.5)
    }

    getColor() {
        return this.color
    }
    
}