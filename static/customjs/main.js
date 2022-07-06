//old way. Erase the comments for the line below and comment out the rest of the code to return to the old way. 
// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

//libraries
//----------------------------------------------------//
import{AudioElementHandler} from '../customJS/AudioElementHandler.js';
import{MyWaveSurfer} from '../customJS/MyWaveSurfer.js';
import{MyAudioContext} from '../customJS/MyAudioContext.js';
import{Chroma} from '../customJS/Chroma.js';


import {Pitch} from '../libs/pitchfind.js';



//class instances
//----------------------------------------------------//
let audioElementHandler= new AudioElementHandler();
let myWaveSurfer = new MyWaveSurfer();
let myAudioContext = new MyAudioContext();
// let chroma= new Chroma();

let pitchfinder = new Pitch(new Tone.Gain());

console.log("gain: ", pitchfinder.getPitch());




//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', ()=>{ 
    myWaveSurfer.togglePlay();
    audioElementHandler.togglePlay();
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
audioElementHandler.getSelectMusicElement().onchange=()=>{
    audioElementHandler.initializeDirectory();

    audioElementHandler.fetchSelectedMusic().then(response=>{
        audioElementHandler.initializeAudio(response);
        myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
    })
}
    
//----------------------------------------------------//
main();

function main(){
    
    //import the files from html src
    audioElementHandler.fetchSelectedMusic().then(response=>{

    //connect the audio to its soruce and set the initial settings
    audioElementHandler.initializeAudio(response);
    //createmediaelementsource e.g. node and uses it to create an analyser
    myAudioContext.initializeAnalyser(audioElementHandler.getAudioElement());
    //conntect wave surfer to audio source 
    myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());

    //initializes with settings
    myWaveSurfer.initialize(audioElementHandler.getAudioElement());

    //match the waveserfer timeline to audio source/ event handler
    myWaveSurfer.sync();

    // myAudioContext.initializeMeydaAnalyser(chroma.updateChroma);

    })
}

//----------------------------------------------------//