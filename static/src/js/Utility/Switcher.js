import {
    Utility
} from './Utility.js'

export class Switcher{
    constructor(){
        this.ERROR = -1;
        this.midi = null;
    }

    getPitchAndEnergy( pitch, energy, midi) {
        if (pitch.frequency == this.ERROR) {
            this.midi =midi + 72
        } else {
            this.midi = pitch.midi;
        }
        //return midi and adjust the energy 
        if (this.midi) {
            let AdjustEnergy = 5*Utility.sigmoid(50, energy);
            return [this.midi, AdjustEnergy]
        }
    }

}