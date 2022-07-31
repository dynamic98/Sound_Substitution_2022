export class PlayInstrument {
    constructor() {
        this.DrumAudio = document.getElementById("drum_audio")
        this.now = Tone.now();
        this.synth = new Tone.Synth().toDestination();
    }


    playPiano(note, energy) {
        this.synth.volume.value = energy/100*60;
        this.synth.triggerAttackRelease(note, this.now);

    }
    playDrum(energy) {
        this.DrumAudio.volume = energy/100;
        this.DrumAudio.play()
    }

}
