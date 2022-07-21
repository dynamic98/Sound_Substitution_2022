// import * as Tone from "tone";
import {
    MyThree
} from './Viz/MyThree.js';
import {
    Kandinsky
} from './Viz/Kandinsky.js'
import {
    BPMTimer
} from './Utility/BPMTimer.js'
import { Switcher } from './Utility/Switcher.js'
let myThree = new MyThree();
let kandinsky;
let bpmTimer = new BPMTimer();
let stats = new Stats();
let DictPitch = {
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
//--------------------------------


const now = Tone.now();
const synth = new Tone.Synth().toDestination();
let CurrentOctave = 4;
let CurrentEnergy = 0;
let CurrentPitch = 0;
let switcher = new Switcher();

main();
function main(){
    myThree.initialize();
    kandinsky = new Kandinsky(50,1);
    bpmTimer.setBPM(50);
    animate();
}


function animate(){
    requestAnimationFrame(animate);
    stats.begin()
    if (!bpmTimer.isUnderFourBeat()) {
        myThree.reset();
    }
    //under 4 beat = calculate and create Geomtry 
    else if (bpmTimer.isUnderFourBeat()) {
        let this_pitch = {frequency: 0, confidence: 1, note: DictPitch[CurrentPitch]+CurrentOctave.toString(), midi: ((CurrentOctave+1)*12+CurrentPitch)};
        let pitchAndEnergy = switcher.getPitchAndEnergy(this_pitch, CurrentEnergy, CurrentPitch);
        CurrentEnergy = 0;
        // console.log(this_pitch);
        // console.log(pitchAndEnergy);
        kandinsky.calculate(pitchAndEnergy);
        myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
        myThree.createMesh(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
        myThree.pickGlowReceivers();
    }
    myThree.render();
    myThree.update();
}

document.body.appendChild(stats.dom);
function playPiano(){
    console.log(CurrentPitch, DictPitch[CurrentPitch]);
    synth.triggerAttackRelease(DictPitch[CurrentPitch]+CurrentOctave.toString(), now);
}


document.getElementsByClassName("white do-1")[0].addEventListener("click", () =>{CurrentPitch = 0; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black do-s-1")[0].addEventListener("click", () =>{CurrentPitch = 1; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white re-1")[0].addEventListener("click", () =>{CurrentPitch = 2; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black re-s-1")[0].addEventListener("click", () =>{CurrentPitch = 3; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white mi-1")[0].addEventListener("click", () =>{CurrentPitch = 4; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white fa-1")[0].addEventListener("click", () =>{CurrentPitch = 5; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black fa-s-1")[0].addEventListener("click", () =>{CurrentPitch = 6; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white sol-1")[0].addEventListener("click", () =>{CurrentPitch = 7; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black sol-s-1")[0].addEventListener("click", () =>{CurrentPitch = 8; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white la-1")[0].addEventListener("click", () =>{CurrentPitch = 9; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black la-s-1")[0].addEventListener("click", () =>{CurrentPitch = 10; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white si-1")[0].addEventListener("click", () =>{CurrentPitch = 11; CurrentOctave= 4; CurrentEnergy = 50; playPiano();})


document.getElementsByClassName("white do-2")[0].addEventListener("click", () =>{CurrentPitch = 0; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black do-s-2")[0].addEventListener("click", () =>{CurrentPitch = 1; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white re-2")[0].addEventListener("click", () =>{CurrentPitch = 2; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black re-s-2")[0].addEventListener("click", () =>{CurrentPitch = 3; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white mi-2")[0].addEventListener("click", () =>{CurrentPitch = 4; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white fa-2")[0].addEventListener("click", () =>{CurrentPitch = 5; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black fa-s-2")[0].addEventListener("click", () =>{CurrentPitch = 6; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white sol-2")[0].addEventListener("click", () =>{CurrentPitch = 7; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black sol-s-2")[0].addEventListener("click", () =>{CurrentPitch = 8; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white la-2")[0].addEventListener("click", () =>{CurrentPitch = 9; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black la-s-2")[0].addEventListener("click", () =>{CurrentPitch = 10; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white si-2")[0].addEventListener("click", () =>{CurrentPitch = 11; CurrentOctave= 5; CurrentEnergy = 50; playPiano();})

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

