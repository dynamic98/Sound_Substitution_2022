export class Kandinsky {
    constructor(bpm, MaxVolume = 1, ) {
        this.bpm = bpm;
        this.MaxVolume = MaxVolume;
        this.canvasSizeY = 30
        this.RangeY = 70
        this.canvasSizeX = 200
        this.MIDISCOPE = 35;
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
        this.pitch;
        this.energy;
        this.pitchHeight
        this.octave;
        this.tone;
        this.pitchWidth = this.canvasSizeX / (60 * 60 / this.bpm * 4) // 

    }

    calculate([pitch, energy], frameRate = 60) {

        this.pitch = pitch;
        this.energy = energy / this.MaxVolume;
        // console.log(this.energy)
        this.pitchRadius = this.canvasSizeY / this.MIDISCOPE / 2
        this.pitchHeight = this.RangeY / this.MIDISCOPE
        this.pitchWidth = this.canvasSizeX / (60 * frameRate / this.bpm * 4) // 
        //total frameRate per minute   / 4 bpm 
        this.octave = Math.floor((pitch) / 12) - 1; //옥타브 구하는 방식
        this.tone = (pitch) % 12;
        // Make reminder positive integer
    }

    getNormalizedTone() {
        return this.tone / 12
    }
    getNormalizedOctave() {
        return (this.octave - 1) / 5
    }

    getPitchWidth() {
        // this.positionX= this.counter * this.pitchWidth - 100
        return this.pitchWidth
    }

    getPitchHeight() {
        // return this.pitchHeight * (this.pitch - 65) - (this.canvasSizeY / 2);
        return this.pitchHeight * (this.pitch - 65) - (this.canvasSizeY / 2);
    }

    getPitchEnergy() {
        return this.pitchRadius * this.energy * 5;
    }

    setBPM(bpm) {
        this.bpm = bpm
    }

    setMaxVolume(MaxVolume) {
        this.MaxVolume = MaxVolume;
    }
    setRange(RangeY) {
        // this.RangeY = RangeY / 100 * 70;
        this.RangeY = RangeY
    }

}