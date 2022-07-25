import {
    ThreeSystem
} from "./ThreeSystem"

import {
    Grid
} from "./Grid"

import {
    TextureManager
} from './TextureManager.js';

import {
    Bloom
} from "./Bloom";

import {
    VisualNote
} from "./VisualNote";
import {
    GeometryManager
} from "./GeometryManager";
import {
    MaterialManager
} from "./MaterialManager";

import {
    Color
} from "./Color";

import {
    CounterTimer
} from "../Utility/CounterTimer";

export class Visualization {
    constructor() {
        this.threeSystem = new ThreeSystem()
        //size, color,position
        this.grid = new Grid([400, 100], 0x101010, [0, 0, -100])
        //threshold, strength, radius
        this.bloom = new Bloom(0, 5, 1, 1);
        this.textureManager = new TextureManager();
        this.materialManager = new MaterialManager()
        this.geometryManager = new GeometryManager("circle");
        this.visualNoteList = []
        this.color = new Color(1, 1, 1)
        this.counterTimer = new CounterTimer();

    }

    initialize() {
        this.threeSystem.initialize()

        this.bloom.initialize(
            this.threeSystem.getScene(),
            this.threeSystem.getCamera(),
            this.threeSystem.getRenderer(),
        )

        this.textureManager.loadTexture({
            wood: 'static/src/texture/wood.jpeg',
            paper: 'static/src/texture/paper.jpeg',
            stone: 'static/src/texture/rock.jpeg',
        })
        this.textureManager.setTexture('none')

        this.grid.setRenderOption(this.bloom.getPassForMoonLight())
        this.threeSystem.addToScene(this.grid.getGrid())
    }

    createVisualNote(radius, positionX, positionY) {
        if (this.counterTimer.getTimer() % 100) {
            this.geometryManager.setRadius(radius)
            let newPositionX = positionX * this.counterTimer.getTimer() - 100
            this.threeSystem.updateLightPosition(newPositionX, positionY)

            let texture = this.textureManager.getTexture()
            let color = this.color.getColor();
            let visualNote = new VisualNote(

                this.materialManager.createMaterial(color, texture),

                this.geometryManager.getGeometry(),
                newPositionX,
                positionY
            )
            visualNote.setRenderOption(this.bloom.getPassForSunLight())
            this.threeSystem.addToGroup(visualNote.getMesh())
        }

    }

    render() {
        this.checkAllCandidatesForMoonLight()
        this.bloom.renderBloom()
        this.checkAllCandidatesForRestoration()
        this.bloom.renderFinal()
    }

    update() {
        this.counterTimer.start();

        this.bloom.pickGlowReceivers(this.threeSystem.getElementsInScene())
    }

    reset() {
        this.threeSystem.reset()
        this.counterTimer.reset();
    }

    checkAllCandidatesForMoonLight() {
        this.threeSystem.forEach((obj) => {
            if (this.bloom.isWorthyOfMoonLight(obj.type, obj.renderOrder)) {
                this.bloom.giveMoonLight(obj.uuid, obj.material.color)
            }
        })
    }

    checkAllCandidatesForRestoration() {
        this.threeSystem.forEach((obj) => {
            if (this.bloom.isMoonLightReceiver(obj.uuid)) {
                this.bloom.restoreToOriginalState(obj.material, obj.uuid)
                this.bloom.deleteMoonLightPass(obj.uuid);
            }
        })
    }
    getColor(){
        return this.color
    }

    getGeometryManager() {
        return this.geometryManager
    }
    getTextureManager() {
        return this.textureManager
    }
}