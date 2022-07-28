export class MusicSheet {

    constructor(length = 40) {
        this.length = length
        this.MusicArray = new Array(this.length);
        this.EmptyPitch = {
            frequency: 0,
            confidence: 1,
            note: 0,
            midi: 0
        }
        for (let i = 0; i < this.length; i++) {
            this.MusicArray[i] = {
                keyboard_pitch: this.EmptyPitch,
                keyboard_energy: 0,
                drum_pitch: this.EmptyPitch,
                drum_energy: 0
            };
        }
        this.currentIndex = 0;
        this.lastIndex = -1
    }


    getMusicArray(index) {
        return this.MusicArray[index];
    }
    getLastIndex() {
        return this.lastIndex
    }
    getCurrentIndex() {
        return this.currentIndex
    }
    setLastIndex(index) {
        this.lastIndex = index
    }

    getKeyboardPitch() {
        return this.MusicArray[this.currentIndex].keyboard_pitch
    }
    getKeyboardEnergy() {
        //console.log(this.MusicArray[this.currentIndex].keyboard_energy)
        return this.MusicArray[this.currentIndex].keyboard_energy
    }
    getKeyboardNote() {
        return this.MusicArray[this.currentIndex].keyboard_pitch.midi % 12
    }
    setMusicArray =(keyboard_pitch = this.EmptyPitch, keyboard_energy = 0, drum_pitch = this.EmptyPitch, drum_energy = 0) => {
        this.MusicArray[this.currentIndex].keyboard_pitch = keyboard_pitch;
        this.MusicArray[this.currentIndex].keyboard_energy = keyboard_energy;
        this.MusicArray[this.currentIndex].drum_pitch = drum_pitch;
        this.MusicArray[this.currentIndex].drum_energy = drum_energy;

    }
    setCurrentIndex(index) {
        if (index == this.length) {
            this.currentIndex = 0
        } else {
            this.currentIndex = index
        }

    }
    isCurrentIndexUpdated() {
        return this.currentIndex != this.lastIndex
    }

    // console.log(CurrentIndex);
    // console.log(MyProgressTimer.getThisSeconds(), Math.round(MyProgressTimer.getThisSeconds()/375));
    // console.log(CurrentIndex, MyMusicSheet.getMusicArray(CurrentIndex));
    // let currentMusicArray = musicSheet.getMusicArray(currentIndex)
    // let currentKeyboardPitch = currentMusicArray.keyboard_pitch
    // let currentKeyboardEnergy = currentMusicArray.keyboard_energy
    // let currentKeyboardNote = currentKeyboardPitch.midi % 12
}