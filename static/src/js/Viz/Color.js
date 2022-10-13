import * as THREE from 'three';

export class Color {
    constructor(hue, saturation, lightness) {
        this.color = new THREE.Color(hue, saturation, lightness)
    }

    setColor = (hue, saturation, lightness=0.5) => {
        this.color.setHSL(hue, saturation, lightness)
    }

    getColor() {
        return this.color
    }
    
}