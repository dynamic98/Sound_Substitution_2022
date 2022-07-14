import {
    Utility
} from '../Utility/Utility.js'

export class BPMTimer {
    constructor() {
        this.startTime = new Date()
        this.LastTime = this.startTime.getTime();

        this.cFive = 5
        this.error = -1;
    }

    setBPM(bpm) {
        this.bpm = bpm
    }

    isUnderFourBeat(){
        let CurrentTime = new Date().getTime()
        let DeltaTime = CurrentTime - this.LastTime;
        let FourBeatTime = 60 / this.bpm * 1000 * 4; //one beat in millisecond 60,000 / bpm *4= four beat

        //reset
        if (DeltaTime > FourBeatTime) {
            this.LastTime = CurrentTime;
            return false
        }
        else{
            return true
        }
    }

    getPitchAndEnergy( pitch, energy, maxChroma) {
        let midi = null;
        if (pitch.frequency == this.error) {
            midi = maxChroma + 72
        } else {
            midi = pitch.midi;
        }
        //return midi and adjust the energy 
        if (midi) {
            let AdjustEnergy = Utility.sigmoid(10, energy);
            return [midi, AdjustEnergy]
        }
    }
}