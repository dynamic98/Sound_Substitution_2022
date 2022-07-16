import * as THREE from 'three';
import {
    EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {
    RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {
    ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {
    UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export class Bloom {
    constructor(threshold,strength,radius) {
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth / 2.24, window.innerHeight / 2.1), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = threshold
        this.bloomPass.strength = strength
        this.bloomPass.radius = radius

        this.passForSunLight = 1;
        this.passForMoonLight = 0;

        this.moonLightReceiverList = []
    }

    initialize(scene,camera,renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer

        this.renderScene = new RenderPass(this.scene, this.camera);
        this.bloomComposer = new EffectComposer(this.renderer);
        this.bloomComposer.addPass(this.renderScene);
        this.bloomComposer.addPass(this.bloomPass)
        this.bloomComposer.renderToScreen = false;

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: {
                        value: null
                    },
                    bloomTexture: {
                        value: this.bloomComposer.renderTarget2.texture
                    }
                },
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,
                defines: {}
            }), 'baseTexture'
        );
        finalPass.needsSwap = true;

        this.finalComposer = new EffectComposer(this.renderer);
        this.finalComposer.addPass(this.renderScene);
        this.finalComposer.addPass(finalPass);
    }

    renderBloom() {
        this.bloomComposer.render();
    }
    renderFinal(){
        this.finalComposer.render();
    }
    

    getPassForMoonLight() {
        return this.passForMoonLight
    }

    getPassForSunLight() {
        return this.passForSunLight
    }

    isWorthyOfMoonLight(isMesh, renderOrder) {
        if (isMesh && renderOrder == this.passForMoonLight)
            return true
        else {
            return false
        }
    }

    giveMoonLight(name, originalColor) {
        const moonLight = 0;
        //saves the receiver's name and original List 
        this.moonLightReceiverList[name] = _.cloneDeep(originalColor)
        //then gives the moonLight
        originalColor.r = moonLight;
        originalColor.g = moonLight;
        originalColor.b = moonLight;
    }

    isMoonLightReceiver(name) {
        if(this.moonLightReceiverList[name]){
            return true
        }
        else{
            return false
        }
    }

    restoreToOriginalState(material, name) {
        material.color.r = this.moonLightReceiverList[name].r;
        material.color.g = this.moonLightReceiverList[name].g;
        material.color.b = this.moonLightReceiverList[name].b;
    }

    deleteMoonLightPass(name) {
        delete this.moonLightReceiverList[name];
    }
}