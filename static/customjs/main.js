//old way. Erase the comments for the line below and comment out the rest of the code to return to the old way. 
// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

//libraries
//----------------------------------------------------//
import {
    AudioElementHandler
} from './AudioElementHandler.js';
import {
    MyWaveSurfer
} from './MyWaveSurfer.js'
import {
    Pitch
} from '../libs/pitchfind.js';
import {
    AudioNodeManager
} from './AudioNodeManager.js'
import {
    MeydaAnalyser
} from './MeydaAnalyzer.js';
import {
    OffCxt
} from './OffCxt.js';
import {
    Visualizer
} from './MyViz.js';
import {
    Utility
} from './Utility.js'

//class instances
//----------------------------------------------------//
let audioElementHandler = new AudioElementHandler();
let myWaveSurfer = new MyWaveSurfer();
let pitch = new Pitch()
let audioNodeManager;
let meydaAnalyer = new MeydaAnalyser();
let myOffCxt = new OffCxt();
let myViz = new Visualizer();
//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', () => {
    myWaveSurfer.togglePlay();
    audioElementHandler.togglePlay();
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
audioElementHandler.getSelectMusicElement().onchange = async () => {
    audioElementHandler.initializeDirectory();
    let response = await audioElementHandler.fetchSelectedMusic();
    audioElementHandler.initializeAudio(response);
    myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
    myOffCxt.initialize(await response.arrayBuffer());
}

//----------------------------------------------------//
const startTime = new Date();
let LastTime = startTime.getTime();
main();

async function main() {
    //import the files from html src
    let response = await audioElementHandler.fetchSelectedMusic()
    //connect the audio to its soruce and set the initial settings
    audioElementHandler.initializeAudio(response);
    //Audio Routing
    //----------------------------------------------------//
    audioNodeManager = new AudioNodeManager(audioElementHandler.getAudioElement());
    audioNodeManager.addNode(
        audioNodeManager.getSource(), // 0
        audioNodeManager.getGainNode(), //1 Gain Node
        pitch.getAnalyser() //2 Pitch 
    )
    // connect all the nodes 
    audioNodeManager.showConnection()
    audioNodeManager.connectAllNodes();
    // ----------------------------------------------------//

    // meydaAnalyser create and start
    meydaAnalyer.initializeMeydaAnalyser(audioNodeManager.getSource())

    //connect wave surfer to audio source 
    myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
    //initializes with settings
    myWaveSurfer.initialize(audioElementHandler.getAudioElement());

    myOffCxt.initialize(await response.arrayBuffer());
    animate();
};

function animate(){
    requestAnimationFrame(animate);

    const d = new Date()
    let CurrentTime = d.getTime();
    let DeltaTime = CurrentTime - LastTime;
    let bpm = myOffCxt.getbpm();
    let FourBeatTime = 60/bpm*1000*4;
    if (DeltaTime>FourBeatTime){
        LastTime = CurrentTime;
        myViz.PitchNote = [];
        myViz.EnergyNote = [];
    }
    let FramePitch = pitch.getPitch()
    let midi = null;
    if (FramePitch.frequency==-1){
        midi = meydaAnalyer.getMaxChroma()+72;
    } else{
        midi = FramePitch.midi;
    }
    if(midi){
        myViz.PitchNote.push(midi);
        let AdjustEnergy = Utility.sigmoid(10, meydaAnalyer.getEnergy());
        myViz.EnergyNote.push(AdjustEnergy);
    }
    myViz.deleteBasics();
    myViz.Kandinsky(bpm);
    myViz.render();
}

//디버깅
//----------------------------------------------------//
//아무 키보드나 누르면 피치값, 메이다 에너지 출력시킴
document.addEventListener("keypress", function (event) {
    console.log("pitch:", pitch.getPitch());
    console.log("Meyda Energy: ", meydaAnalyer.getEnergy());
    console.log("Meyda Pitch: ", meydaAnalyer.getMaxChroma());
    console.log(myOffCxt.getbpm());
});