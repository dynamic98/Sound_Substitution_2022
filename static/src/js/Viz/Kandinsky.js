import { Utility } from "../Utility/Utility";

export class Kandinsky {
    constructor(bpm , canvasSize= 40) {
        this.bpm = bpm;
        this.canvasSize = canvasSize
        this.midiScope=59;
        // this.midiScope=35;

        this.DictPitch = {
            0: "C",
            1: "C#",
            2: "D",
            3: "D#",
            4: "E",
            5: "F",
            6: "F#",
            7: "G",
            8: "G#",
            9: "A",
            10: "A#",
            11: "B" 
        };
    }

    calculate([pitch, energy],frameRate =13 ) {

        this.pitch=pitch;
        this.energy = energy;

        this.pitchHeight = this.canvasSize / this.midiScope 
        this.pitchWidth = this.canvasSize / (60 * 4 * frameRate / this.bpm) // 

        this.octave = Math.floor((pitch) / 12) - 1; //옥타브 구하는 방식
        this.tone = (pitch) % 12;
        // Make reminder positive integer

        if (this.energy < 0.15) {
            this.energy = 0;
        }
    }

    getNormalizedTone() {
        return this.tone / 12
    }
    getNormalizedOctave(){
        return (this.octave - 1) / 5
    }

    getPitchWidth(){
        // this.positionX= this.counter * this.pitchWidth - 100
        return this.pitchWidth 
    }
    
    getPitchHeight(){
        return this.pitchHeight * (this.pitch - 60) - 10;
    }

    getPitchEnergy(){
       return this.pitchHeight * (this.energy * 5);
    }
    
    setBPM(bpm){
        this.bpm=bpm
    }
    

}