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

    assignEventHandler(onEvent, offEvent) {
        let firstObject = {}
        let firstIndex = 0;
        let secondObject = {}
        let secondIndex = 0;

        for (let innerClass of $("." + this.HTMLClassContainer)[0].children) {
            for (let child of innerClass.children) {
                if (child.className.charAt(child.className.length - 1) == 1) {
                    firstObject[child.className] = firstIndex;
                    firstIndex++
                    document.getElementsByClassName(child.className)[0].addEventListener(onEvent, () => {
                        this.currentPitch = firstObject[child.className]
                        this.currentOctave = 4
                        this.playing = true;
                        this.play()
                    })
                    document.getElementsByClassName(child.className)[0].addEventListener(offEvent, () => {
                        this.playing = false;
                    })

                } else if (child.className.charAt(child.className.length - 1) == 2) {
                    secondObject[child.className] = secondIndex;
                    secondIndex++
                    document.getElementsByClassName(child.className)[0].addEventListener(onEvent, () => {
                        this.currentPitch = secondObject[child.className]
                        this.currentOctave = 5
                        this.playing = true;
                        this.play()
                    })
                    document.getElementsByClassName(child.className)[0].addEventListener(offEvent, () => {
                        this.playing = false;
                    })
                }
            }
        }
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