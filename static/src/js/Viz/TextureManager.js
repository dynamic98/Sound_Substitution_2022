import * as THREE from 'three';
export class TextureManager {
    constructor(texture) {
        this.textureLoader = new THREE.TextureLoader();
        this.textureObject = {}
        this.texture;
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

    setTexture = (textureType) => {
        if (this.textureObject[textureType])
            this.texture = this.textureObject[textureType]
        else if (textureType == 'none') {
            this.texture = null

        } else {
            console.error("Unsupported Texture Type")
            return null;
        }
    }

    getTexture() {
        return this.texture;
    }
}