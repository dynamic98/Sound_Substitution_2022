export class PlayInstrument {
    constructor() {
        this.DrumAudio = document.getElementById("drum_audio")
        this.now = Tone.now();
        this.pianosynth = new Tone.Synth().toDestination();
        this.drumsynth = new Tone.MembraneSynth().toDestination();
    }


    playPiano(note, energy) {
        this.pianosynth.volume.value = energy/100*60;
        this.pianosynth.triggerAttackRelease(note, this.now);

    }
    playDrum(energy) {
        // this.DrumAudio.volume = energy/100;
        // this.DrumAudio.play()
        this.drumsynth.volume.value = energy/100*60;
        this.drumsynth.triggerAttackRelease("C0", this.now);

    }

}
