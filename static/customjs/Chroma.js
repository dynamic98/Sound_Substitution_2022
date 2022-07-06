//libraries
//----------------------------------------------------//
import {
    Utility
} from './Utility.js';


// Please Add Description
//----------------------------------------------------//
export class Chroma {

    // creates buffers for each pitch
    constructor() {
        this.pitchClasses = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
        ];

        this.frameBuffer = new Map();

        this.pitchClasses.forEach((pitch) => {
            this.frameBuffer.set(pitch, []);
        });

    }

    //callback function that is called in MyAudioContext's unitializeMeydaAnalyser
    updateChroma(features) {
        try {
            this.chroma = this.update(features['chroma']);
        } catch (err) {
            console.log(err);
        }
        this.maxChroma = this.chroma.indexOf(Utility.max(this.chroma));
        this.energy = features['energy']
    }

    //Please add description
    update(pitchValues) {
        let result = [];
        pitchValues.forEach((value, index) => {
            let currentPitch = this.pitchClasses[index];
            let currentPitchBuffer = this.frameBuffer.get(currentPitch);
            currentPitchBuffer.push(value);
            let framesToBuffer = 20;
            while (currentPitchBuffer.length > framesToBuffer) {
                currentPitchBuffer.shift();
            }
            let framesAverage =
                currentPitchBuffer.reduce((total, value) => total + value, 0) / currentPitchBuffer.length;
            framesAverage = Math.pow(framesAverage, 5);
            result.push(framesAverage);
        });
        return result;
    };


}