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
    ConnectionLine,
    VisualNote
} from "./Mesh";

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
        this.bloom = new Bloom(0, 5, 1, 1, this.getRendererSize());
        this.textureManager = new TextureManager();
        this.materialManager = new MaterialManager()
        this.geometryManager = new GeometryManager("circle")

        this.visualNoteList = []
        this.color = new Color(1, 1, 1)
        this.counterTimer = new CounterTimer(1);
        this.visualNoteList = []

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
        // this.counterTimer.setSpeed(this.threeSystem.getRendererSize().width, 100)
    }

    createVisualNote(radius, positionX, positionY) {
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
        this.threeSystem.addToGroup(visualNote.getMesh(), VisualNote.name)
        this.visualNoteList.push(visualNote)
    }

    createConnectonLine() {
        if (this.visualNoteList.length > 1 && ConnectionLine.isVisible()) {
            let secondLastPoint = this.visualNoteList[this.visualNoteList.length - 2].getPosition()
            let lastPoint = this.visualNoteList[this.visualNoteList.length - 1].getPosition()

            let connectionLine = new ConnectionLine(secondLastPoint, lastPoint);
            this.threeSystem.addToGroup(connectionLine.getMesh(), ConnectionLine.name)
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
        this.bloom.pickGlowReceivers(this.visualNoteList)
    }

    reset() {
        this.threeSystem.reset()
        this.counterTimer.reset();
        this.visualNoteList = []
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

    //getter & settter
    //------------------------------------------------------------------// 
    setColor(hue, saturation) {
        this.color.setColor(hue, saturation)
    }

    setGeometryType = (geometryType) => {
        return this.geometryManager.setGeometryType(geometryType)
    }
    setTexture = (textureType) => {
        return this.textureManager.setTexture(textureType)
    }
    getRendererSize() {
        return this.threeSystem.getRendererSize()
    }

}