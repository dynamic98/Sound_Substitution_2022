//libraries
//----------------------------------------------------//
import {
    Utility
} from '../Utility/Utility.js'
//----------------------------------------------------//


//MeydaAnalyser Controller Class
//----------------------------------------------------//
export class MeydaAnalyser {
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
        
        this.meydaAnalyser;
        this.energy;
        this.chroma;
        this.maxChroma;
    }

    //intitialize with source(AudioElement) and audioContext
    initializeMeydaAnalyser(source) {
        this.meydaAnalyser = Meyda.createMeydaAnalyzer({
            audioContext: Tone.context._context._nativeAudioContext,
            source: source._nativeAudioNode,
            buffersize: 1024,
            featureExtractors: ["energy", "chroma"],
            callback: (features) => {
                try {
                    this.chroma = this.updateChroma(features['chroma']);
                } catch (err) {
                    console.log(err);
                }
                //console.log(features['loudness'], "loudness");
                this.maxChroma = this.chroma.indexOf(Utility.max(this.chroma));
                this.energy = features['energy']
            }
        })

        this.meydaAnalyser.start();
    }

    updateChroma(pitchValues) {
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

    getEnergy() {
        return this.energy
    }
    getMaxChroma() {
        return this.maxChroma
    }
}