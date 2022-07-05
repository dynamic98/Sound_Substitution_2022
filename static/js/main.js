// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

import{FileHandler} from '../customjs/FileHandler.js';
import{MyWaveSurfer} from '../customjs/MyWaveSurfer.js';
import{MyAudioContext} from '../customjs/MyAudioContext.js';
import{Chroma} from '../customjs/Chroma.js';

let fileHandler= new FileHandler();
let myWaveSurfer = new MyWaveSurfer();
let myAudioContext = new MyAudioContext();
// let chroma= new Chroma();

document.querySelector('[data-action="play"]').addEventListener('click', ()=>{ 
    myWaveSurfer.togglePlay();
    fileHandler.togglePlay();
})

fileHandler.getElement().onchange=()=>{
    fileHandler.changeAudio();
    
}
    
main();

function main(){
    
    fileHandler.fileImport().then(response=>{

    fileHandler.initializeFile(response);
    myAudioContext.initialize(fileHandler.getAudio());
    myWaveSurfer.initialize(fileHandler.getAudio());

    myAudioContext.initializeAnalyser();
    // myAudioContext.initializeMeydaAnalyser(chroma.updateChroma);

    myWaveSurfer.initialize(fileHandler.getAudio());
    })
}

