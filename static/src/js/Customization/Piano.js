export class Piano {
    constructor(HTMLClassContainer) {
        this.HTMLClassContainer = HTMLClassContainer
        this.currentPitch = 0;
        this.currentOctave = 0;
        this.currentEnergy = 50

        this.now = Tone.now();
        this.synth = new Tone.Synth().toDestination();

        this.playing = false;

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
    assignEventOnPianoRow(onEvent, offEvent, pianoRow, pianoOctave) {
        let object = {}
        let index = 0;

        for (let innerClass of $("." + this.HTMLClassContainer)[0].children) {
            for (let child of innerClass.children) {
                if (child.className.charAt(child.className.length - 1) == pianoRow) {
                    object[child.className] = index;
                    index++
                    document.getElementsByClassName(child.className)[0].addEventListener(onEvent, () => {
                        this.currentPitch = object[child.className]
                        this.currentOctave = pianoOctave
                        this.playing = true;
                        this.play()
                    })

                }
            }
        }
        document.addEventListener(offEvent, () => {
            this.playing = false;
        })
    }


    play() {
        this.synth.triggerAttackRelease(this.DictPitch[this.currentPitch] + this.currentOctave.toString(), this.now);

    }
    getAudioData() {
        return this.audioData = {
            frequency: 0,
            confidence: 1,
            note: this.DictPitch[this.currentPitch] + this.currentOctave.toString(),
            midi: ((this.currentOctave + 1) * 12 + this.currentPitch)
        };
    }
    getEnergy() {
        return this.currentEnergy
    }
    getPitch() {
        return this.currentPitch
    }

    setCurrentEnergy(value) {
        this.currentEnergy = value
    }
    isPlaying() {

        return this.playing
    }
}