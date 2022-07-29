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

import * as THREE from 'three';



export class Visualization {
    constructor(bloomLength) {
        this.threeSystem = new ThreeSystem()
        //size, color,position
        this.grid = new Grid([400, 100], 0x101010, [0, 0, -100])
        //threshold, strength, radius , bloomLength
        this.bloom = new Bloom(0, 5, 1, bloomLength, this.threeSystem.getRendererSize());
        this.counterTimer = new CounterTimer(1);
        this.progressBar
        this.Bias_X = 115;


        this.instruments = {
            piano: {},
            drum: {},
            savedPiano: {},
            savedDrum: {},
            // NowLocation: {}
        }
        for (let instrumentType in this.instruments) {
            this.instruments[instrumentType].visualNoteList = []
            this.instruments[instrumentType].materialManager = new MaterialManager();
            this.instruments[instrumentType].geometryManager = new GeometryManager("circle");
            this.instruments[instrumentType].colorManager = new Color(1, 1, 1)
            this.instruments[instrumentType].textureManager = new TextureManager({
                wood: 'static/src/texture/wood.jpeg',
                paper: 'static/src/texture/paper.jpeg',
                stone: 'static/src/texture/stone.jpeg',
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

    createVisualNote(instrumentType, radius, positionX, positionY, ) {
        if (this.#instrumentIsValid(instrumentType)) {
            let instrument = this.instruments[instrumentType]

            instrument.geometryManager.setRadius(radius)
            let newPositionX = positionX * this.counterTimer.getTimer() - this.Bias_X

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


            this.threeSystem.updateLightPosition(newPositionX, positionY)
            // console.log(Line.isVisible())
            // Line.isVisible() ? this.createConnectionLine(instrumentType) : null
        }
    }

    createVisualAbsNote(instrumentType, radius, positionX, positionY) {
        // if (this.instruments[instrumentType] == undefined || null) {
        //     console.error("Only Types of piano, input_piano, drum, input_drum are available")
        // } else {
        if (this.#instrumentIsValid(instrumentType)) {
            let instrument = this.instruments[instrumentType]

            instrument.geometryManager.setRadius(radius)

            let texture = instrument.textureManager.getTexture()
            let color = instrument.colorManager.getColor();


            let visualNote = new VisualNote(
                instrument.materialManager.createMaterial(color, texture),
                instrument.geometryManager.getGeometry(),
                positionX - this.Bias_X,
                positionY
            )

            visualNote.setRenderOption(this.bloom.getPassForMoonLight())
            this.threeSystem.addToGroup(visualNote.getMesh(), VisualNote.name)
            instrument.visualNoteList.push(visualNote)

            // Line.isVisible() ? this.createConnectionLine(instrumentType) : null

        }
    }


    createConnectionLine(instrumentType) {
        if (this.#instrumentIsValid(instrumentType)) {
            if (this.instruments[instrumentType].visualNoteList.length > 1 && Line.isVisible()) {
                let visualNoteList = this.instruments[instrumentType].visualNoteList

                let secondLastPoint = visualNoteList[visualNoteList.length - 2].getPosition()
                let lastPoint = visualNoteList[visualNoteList.length - 1].getPosition()
                let connectionLine = new Line(secondLastPoint, lastPoint);
                this.threeSystem.addToGroup(connectionLine.getMesh(), Line.name)
            }
        }
    }

    createProgressBar(width, color, opacity) {
        let geometry = new THREE.BoxGeometry(width, 200, 1);
        let material = new THREE.MeshStandardMaterial({
            color: color,
            opacity: opacity,
            transparent: true
        })
        this.progessBar = new THREE.Mesh(geometry, material);
        this.progessBar.renderOrder = this.bloom.getPassForMoonLight()
        // this.threeSystem.addToScene(this.progessBar, "progressBar")
        this.threeSystem.addToGroup(this.progessBar, "progressBar")

    }


    moveProgressBar(positionX) {
        let newPositionX = positionX * this.counterTimer.getTimer() - this.Bias_X
        this.progessBar.position.set(newPositionX, 0, 0)
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
        if (this.#instrumentIsValid(instrumentType)) {
            this.instruments[instrumentType].colorManager.setColor(hue, saturation)
        }
    }

    setGeometryType = (instrumentType, geometryType) => {
        if (this.#instrumentIsValid(instrumentType)) {
            return this.instruments[instrumentType].geometryManager.setGeometryType(geometryType)
        }
    }

    setTexture = (instrumentType, textureType) => {
        if (this.#instrumentIsValid(instrumentType)) {
            return this.instruments[instrumentType].textureManager.setTexture(textureType)
        }
    }
    setConnectionLineVisibility = (boolean) => {
        Line.setVisibility(boolean)
    }

    getRendererSize() {
        return this.threeSystem.getRendererSize()
    }

    //helper
    //------------------------------------------------------------------// 

    #instrumentIsValid(instrumentType) {
        if (this.instruments[instrumentType] == undefined || null) {
            console.error(`Only Types ${Object.keys(this.instrumentType)} are available`)
            return false
        } else {
            return true
        }
    }
}