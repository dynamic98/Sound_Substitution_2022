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
import {
    Utility
} from './Utility/Utility.js'

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

main();
function main(){
    myThree.initialize();
    kandinsky = new Kandinsky(50);
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
        let pitchAndEnergy = bpmTimer.getPitchAndEnergy(this_pitch, CurrentEnergy, CurrentPitch);
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



document.getElementsByClassName("white c")[0].addEventListener("click", () =>{CurrentPitch = 0; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black cs")[0].addEventListener("click", () =>{CurrentPitch = 1; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white d")[0].addEventListener("click", () =>{CurrentPitch = 2; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black ds")[0].addEventListener("click", () =>{CurrentPitch = 3; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white e")[0].addEventListener("click", () =>{CurrentPitch = 4; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white f")[0].addEventListener("click", () =>{CurrentPitch = 5; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black fs")[0].addEventListener("click", () =>{CurrentPitch = 6; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white g")[0].addEventListener("click", () =>{CurrentPitch = 7; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black gs")[0].addEventListener("click", () =>{CurrentPitch = 8; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white a")[0].addEventListener("click", () =>{CurrentPitch = 9; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("black as")[0].addEventListener("click", () =>{CurrentPitch = 10; CurrentEnergy = 50; playPiano();})
document.getElementsByClassName("white b")[0].addEventListener("click", () =>{CurrentPitch = 11; CurrentEnergy = 50; playPiano();})

document.getElementById("Octave2").addEventListener("click", () =>{CurrentOctave = 2});
document.getElementById("Octave3").addEventListener("click", () =>{CurrentOctave = 3});
document.getElementById("Octave4").addEventListener("click", () =>{CurrentOctave = 4});
document.getElementById("Octave5").addEventListener("click", () =>{CurrentOctave = 5});
document.getElementById("Octave6").addEventListener("click", () =>{CurrentOctave = 6});
document.getElementById("Octave7").addEventListener("click", () =>{CurrentOctave = 7});
document.getElementById("Octave8").addEventListener("click", () =>{CurrentOctave = 8});
