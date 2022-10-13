export class Drum {
    constructor(HTMLElementID) {
        this.HTMLElement = document.getElementById(HTMLElementID);
        this.DrumAudio = document.getElementById("drum_audio")
        this.drumsynth = new Tone.MembraneSynth().toDestination();


        this.currentEnergy = 50
        this.currentPitch = 5

        this.duration = 50
        this.noteDuration = 300;
        this.playing = false;

        this.now = Tone.now();
        this.synth = new Tone.Synth().toDestination();
        this.drumsynth = new Tone.MembraneSynth().toDestination();
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

    assignEventOnDrum(onEvent, drawNote, setBeatArray) {
        this.HTMLElement.addEventListener(onEvent, () => {
            drawNote(this.getAudioData(), this.getEnergy(), this.getPitch());
            setBeatArray(this.getAudioData(), this.getEnergy())
            this.play()
        })
    }

    play() {
        // this.DrumAudio.play()
        this.drumsynth.volume.value = this.getEnergy()/100*60;
        this.drumsynth.triggerAttackRelease("C0", this.now);
    }

    getAudioData() {
        return this.audioData = {
            frequency: 0,
            confidence: 1,
            note: "F4",
            midi: 65
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

    setNoteDuration(value) {
        this.noteDuration = value
    }

}


// let DictPitch = {
//     0: "C",
//     1: "C#",
//     2: "D",
//     3: "D#",3
//     4: "E",
//     5: "F",
//     6: "F#",
//     7: "G",
//     8: "G#",
//     9: "A",
//     10: "A#",
//     11: "B"
// };
//--------------------------------
// const now = Tone.now();
// const synth = new Tone.Synth().toDestination();

// let CurrentOctave = 4;
// let CurrentEnergy = 0;
// let CurrentPitch = 0;




// let this_pitch = {
//     frequency: 0,
//     confidence: 1,
//     note: DictPitch[CurrentPitch] + CurrentOctave.toString(),
//     midi: ((CurrentOctave + 1) * 12 + CurrentPitch)
// };



// function playPiano() {
//     console.log(CurrentPitch, DictPitch[CurrentPitch]);
//     synth.triggerAttackRelease(DictPitch[CurrentPitch] + CurrentOctave.toString(), now);
// }

// document.getElementById("btn-square").addEventListener("click", ()=>{console.log("box");myThree.ForceGeometryChange("Box")});
// document.getElementById("btn-circle").addEventListener("click", ()=>{myThree.ForceGeometryChange("Sphere")});
// document.getElementById("btn-triangle").addEventListener("click", ()=>{myThree.ForceGeometryChange("Cone")});


// document.getElementById("Octave2").addEventListener("click", () =>{CurrentOctave = 2});
// document.getElementById("Octave3").addEventListener("click", () =>{CurrentOctave = 3});
// document.getElementById("Octave4").addEventListener("click", () =>{CurrentOctave = 4});
// document.getElementById("Octave5").addEventListener("click", () =>{CurrentOctave = 5});
// document.getElementById("Octave6").addEventListener("click", () =>{CurrentOctave = 6});
// document.getElementById("Octave7").addEventListener("click", () =>{CurrentOctave = 7});
// document.getElementById("Octave8").addEventListener("click", () =>{CurrentOctave = 8});

// document.getElementById("btn-square").addEventListener("click", ()=>{console.log("box");myThree.ForceGeometryChange("Box")});
// document.getElementById("btn-circle").addEventListener("click", ()=>{myThree.ForceGeometryChange("Sphere")});
// document.getElementById("btn-triangle").addEventListener("click", ()=>{myThree.ForceGeometryChange("Cone")});


// document.getElementsByClassName("white do-2")[0].addEventListener("click", () => {
//     CurrentPitch = 0;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("black do-s-2")[0].addEventListener("click", () => {
//     CurrentPitch = 1;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white re-2")[0].addEventListener("click", () => {
//     CurrentPitch = 2;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("black re-s-2")[0].addEventListener("click", () => {
//     CurrentPitch = 3;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white mi-2")[0].addEventListener("click", () => {
//     CurrentPitch = 4;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white fa-2")[0].addEventListener("click", () => {
//     CurrentPitch = 5;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("black fa-s-2")[0].addEventListener("click", () => {
//     CurrentPitch = 6;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white sol-2")[0].addEventListener("click", () => {
//     CurrentPitch = 7;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("black sol-s-2")[0].addEventListener("click", () => {
//     CurrentPitch = 8;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white la-2")[0].addEventListener("click", () => {
//     CurrentPitch = 9;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("black la-s-2")[0].addEventListener("click", () => {
//     CurrentPitch = 10;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })
// document.getElementsByClassName("white si-2")[0].addEventListener("click", () => {
//     CurrentPitch = 11;
//     CurrentOctave = 5;
//     CurrentEnergy = 50;
//     playPiano();
// })

// document.getElementById("Octave2").addEventListener("click", () => {
//     CurrentOctave = 2
// });
// document.getElementById("Octave3").addEventListener("click", () => {
//     CurrentOctave = 3
// });
// document.getElementById("Octave4").addEventListener("click", () => {
//     CurrentOctave = 4
// });
// document.getElementById("Octave5").addEventListener("click", () => {
//     CurrentOctave = 5
// });
// document.getElementById("Octave6").addEventListener("click", () => {
//     CurrentOctave = 6
// });
// document.getElementById("Octave7").addEventListener("click", () => {
//     CurrentOctave = 7
// });
// document.getElementById("Octave8").addEventListener("click", () => {
//     CurrentOctave = 8
// });

// document.getElementById("btn-square").addEventListener("click", () => {
//     console.log("box");
//     myThree.ForceGeometryChange("Box")
// });
// document.getElementById("btn-circle").addEventListener("click", () => {
//     myThree.ForceGeometryChange("Sphere")
// });
// document.getElementById("btn-triangle").addEventListener("click", () => {
//     myThree.ForceGeometryChange("Cone")
// });