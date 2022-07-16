// import * as Tone from "tone";
const now = Tone.now();
const synth = new Tone.Synth().toDestination();
let CurrentOctave = 4;


function playC(){ synth.triggerAttackRelease("C"+CurrentOctave.toString(), now);}
function playCS(){synth.triggerAttackRelease("C#"+CurrentOctave.toString(), now);}
function playD(){synth.triggerAttackRelease("D"+CurrentOctave.toString(), now);}
function playDS(){synth.triggerAttackRelease("D#"+CurrentOctave.toString(), now);}
function playE(){synth.triggerAttackRelease("E"+CurrentOctave.toString(), now);}
function playF(){synth.triggerAttackRelease("F"+CurrentOctave.toString(), now);}
function playFS(){synth.triggerAttackRelease("F#"+CurrentOctave.toString(), now);}
function playG(){synth.triggerAttackRelease("G"+CurrentOctave.toString(), now);}
function playGS(){synth.triggerAttackRelease("G#"+CurrentOctave.toString(), now);}
function playA(){synth.triggerAttackRelease("A"+CurrentOctave.toString(), now);}
function playAS(){synth.triggerAttackRelease("A#"+CurrentOctave.toString(), now);}
function playB(){synth.triggerAttackRelease("B"+CurrentOctave.toString(), now);}



document.getElementsByClassName("white c")[0].addEventListener("click", () =>{playC()})
document.getElementsByClassName("black cs")[0].addEventListener("click", () =>{playCS()})
document.getElementsByClassName("white d")[0].addEventListener("click", () =>{playD()})
document.getElementsByClassName("black ds")[0].addEventListener("click", () =>{playDS()})
document.getElementsByClassName("white e")[0].addEventListener("click", () =>{playE()})
document.getElementsByClassName("white f")[0].addEventListener("click", () =>{playF()})
document.getElementsByClassName("black fs")[0].addEventListener("click", () =>{playFS()})
document.getElementsByClassName("white g")[0].addEventListener("click", () =>{playG()})
document.getElementsByClassName("black gs")[0].addEventListener("click", () =>{playGS()})
document.getElementsByClassName("white a")[0].addEventListener("click", () =>{playA()})
document.getElementsByClassName("black as")[0].addEventListener("click", () =>{playAS()})
document.getElementsByClassName("white b")[0].addEventListener("click", () =>{playB()})

document.getElementById("Octave2").addEventListener("click", () =>{CurrentOctave = 2});
document.getElementById("Octave3").addEventListener("click", () =>{CurrentOctave = 3});
document.getElementById("Octave4").addEventListener("click", () =>{CurrentOctave = 4});
document.getElementById("Octave5").addEventListener("click", () =>{CurrentOctave = 5});
document.getElementById("Octave6").addEventListener("click", () =>{CurrentOctave = 6});
document.getElementById("Octave7").addEventListener("click", () =>{CurrentOctave = 7});
document.getElementById("Octave8").addEventListener("click", () =>{CurrentOctave = 8});
