//old way. Erase the comments for the line below and comment out the rest of the code to return to the old way. 
// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

//libraries
//----------------------------------------------------//
import {
    AudioElementHandler
} from '../customJS/AudioElementHandler.js';
import {
    MyWaveSurfer
} from '../customJS/MyWaveSurfer.js'
import {
    Pitch
} from '../libs/pitchfind.js';

import {
    AudioNodeManager
}from '../customJS/AudioNodeManager.js'

//class instances
//----------------------------------------------------//
let audioElementHandler = new AudioElementHandler();
let myWaveSurfer = new MyWaveSurfer();
let pitch = new Pitch()
let audioNodeManager;

//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', () => {
    myWaveSurfer.togglePlay();
    audioElementHandler.togglePlay();
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
audioElementHandler.getSelectMusicElement().onchange = () => {
    audioElementHandler.initializeDirectory();

    audioElementHandler.fetchSelectedMusic().then(response => {
        audioElementHandler.initializeAudio(response);

        myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
    })
}

//----------------------------------------------------//
main();

function main() {
    //import the files from html src
    audioElementHandler.fetchSelectedMusic().then(response => {
        //connect the audio to its soruce and set the initial settings
        audioElementHandler.initializeAudio(response);


        //Audio Routing
        //----------------------------------------------------//
        //initialize nodeManager. 
        audioNodeManager=new AudioNodeManager(audioElementHandler.getAudioElement());
        audioNodeManager.addNode(
            audioNodeManager.getSource(), // 0
         // meydaAnalyser node 필요하면 여기에 추가하면 됨                            // 1 Analyser
            audioNodeManager.getGainNode(), //2 Gain Node
            pitch.getAnalyser()//3 Pitch 
        )
        audioNodeManager.connectAllNodes();
        //----------------------------------------------------//

        //아무 키보드나 누르면 피치값 생성됨. 
        document.addEventListener("keypress", function (event) {
            console.log(pitch.getPitch())
        });

        //connect wave surfer to audio source 
        myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
        //initializes with settings
        myWaveSurfer.initialize(audioElementHandler.getAudioElement());

    })
}
//