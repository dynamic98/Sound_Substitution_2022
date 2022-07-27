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
    Line,
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
    constructor(bloomLength) {
        this.threeSystem = new ThreeSystem()
        //size, color,position
        this.grid = new Grid([400, 100], 0x101010, [0, 0, -100])
        //threshold, strength, radius , bloomLength
        this.bloom = new Bloom(0, 5, 1, bloomLength, this.threeSystem.getRendererSize());
        this.counterTimer = new CounterTimer(1);

        this.instruments = {
            piano: {},
            drum: {}
        }
        for (let instrumentType in this.instruments) {
            this.instruments[instrumentType].visualNoteList = []
            this.instruments[instrumentType].materialManager = new MaterialManager();
            this.instruments[instrumentType].geometryManager = new GeometryManager("circle");
            this.instruments[instrumentType].colorManager = new Color(1, 1, 1)
            this.instruments[instrumentType].textureManager = new TextureManager({
                wood: 'static/src/texture/wood.jpeg',
                paper: 'static/src/texture/paper.jpeg',
                stone: 'static/src/texture/rock.jpeg',
            })
            this.instruments[instrumentType].textureManager.setTexture('none')
        }

        this.bloom.initialize(
            this.threeSystem.getScene(),
            this.threeSystem.getCamera(),
            this.threeSystem.getRenderer(),
        )

        this.grid.setRenderOption(this.bloom.getPassForMoonLight())
        this.threeSystem.addToScene(this.grid.getGrid())
    }

    createVisualNote(instrumentType, radius, positionX, positionY) {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error("Only Types Piano and Drum are available")
        } else {
            let instrument = this.instruments[instrumentType]

            instrument.geometryManager.setRadius(radius)
            let newPositionX = positionX * this.counterTimer.getTimer() - 100

            let texture = instrument.textureManager.getTexture()
            let color = instrument.colorManager.getColor();


            let visualNote = new VisualNote(
                instrument.materialManager.createMaterial(color, texture),
                instrument.geometryManager.getGeometry(),
                newPositionX,
                positionY
            )

            visualNote.setRenderOption(this.bloom.getPassForSunLight())
            this.threeSystem.addToGroup(visualNote.getMesh(), VisualNote.name)
            instrument.visualNoteList.push(visualNote)
        }
    }

    createConnectionLine(instrumentType) {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error("Only Types Piano and Drum are available")

        } else if (this.instruments[instrumentType].visualNoteList.length > 1 && Line.isVisible()) {
            let visualNoteList = this.instruments[instrumentType].visualNoteList

            let secondLastPoint = visualNoteList[visualNoteList.length - 2].getPosition()
            let lastPoint = visualNoteList[visualNoteList.length - 1].getPosition()
            let connectionLine = new Line(secondLastPoint, lastPoint);
            this.threeSystem.addToGroup(connectionLine.getMesh(), Line.name)
        }
    }

    render() {
        this.checkAllCandidatesForMoonLight()
        this.bloom.renderBloom()
        this.checkAllCandidatesForRestoration()
        this.bloom.renderFinal()
    }

    update() {
        this.counterTimer.run();
        for (let instrumentType in this.instruments) {
            this.bloom.pickGlowReceivers(this.instruments[instrumentType].visualNoteList)
            //this.threeSystem.updateLightPosition(newPositionX, positionY)
        }
    }

    reset() {
        this.threeSystem.reset()
        this.counterTimer.reset();
        for (let instrumentType in this.instruments) {
            this.instruments[instrumentType].visualNoteList = []
        }
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
    setColor(instrumentType, hue, saturation) {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error("Only Types Piano and Drum are available")
        } else {
            this.instruments[instrumentType].colorManager.setColor(hue, saturation)
        }
    }

    setGeometryType = (instrumentType, geometryType) => {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error("Only Types Piano and Drum are available")
        } else {
            return this.instruments[instrumentType].geometryManager.setGeometryType(geometryType)
        }
    }

    setTexture = (instrumentType, textureType) => {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error("Only Types Piano and Drum are available")
        } else {
            return this.instruments[instrumentType].textureManager.setTexture(textureType)
        }
    }

    getRendererSize() {
        return this.threeSystem.getRendererSize()
    }

}