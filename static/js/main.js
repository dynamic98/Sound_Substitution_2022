// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

//원래 코드로 실행하려면 이 밑의 전부 주석처리를 하고 윗 줄 하나의 주석을 풀먼 된다. 
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

