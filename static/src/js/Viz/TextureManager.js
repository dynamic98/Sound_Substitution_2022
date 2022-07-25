import * as THREE from 'three';

export class TextureManager {
    constructor() {
        this.textureLoader = new THREE.TextureLoader();
        this.textureObject = {}
    }
    loadTexture(object) {
        for (const key in object) {
            this.textureLoader.load(object[key], (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(0.1, 0.1);
                this.textureObject[key] = texture
            })
        }
    }
    getTextureObject() {
        return this.textureObject
    }
    getTexture(textureName) {
        if (this.textureObject[textureName])
            return this.textureObject[textureName].offeset
        else{
            return
        }
    }
}