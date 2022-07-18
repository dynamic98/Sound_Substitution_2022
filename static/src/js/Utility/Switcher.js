import {
    Utility
} from './Utility.js'

export class Switcher{
    constructor(){
        this.error = -1;
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