export class MusicSheet {

    constructor(length=40) {
        this.length = length
        this.MusicArray = new Array(this.length);
        this.EmptyPitch =  {                   
                            frequency: 0,
                            confidence: 1,
                            note: 0,
                            midi: 0
                            }
        for(let i=0; i<this.length; i++){
            this.MusicArray[i] = {
                keyboard_pitch: this.EmptyPitch,
                keyboard_energy: 0,
                drum_pitch: this.EmptyPitch,
                drum_energy: 0
            };
        }
    }

    getMusicArray(index){
        return this.MusicArray[index];
    }

    setMusicArray(index, keyboard_pitch=this.EmptyPitch, keyboard_energy=0, drum_pitch=this.EmptyPitch, drum_energy=0){
        this.MusicArray[index].keyboard_pitch = keyboard_pitch;
        this.MusicArray[index].keyboard_energy = keyboard_energy;
        this.MusicArray[index].drum_pitch = drum_pitch;
        this.MusicArray[index].drum_energy = drum_energy;
    }
}