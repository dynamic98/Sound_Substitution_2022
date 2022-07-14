//old way. Erase the comments for the line below and comment out the rest of the code to return to the old way. 
// import {analyser, chroma, maxChroma, energy, amplitudeSpectrum, dataArray, bufferLength, audio, wavesurfer, show_canvas, audio_context, src } from './modules.js';

//libraries
//----------------------------------------------------//
import {
    AudioElementHandler
} from './Sound/AudioElementHandler.js';
import {
    MyWaveSurfer
} from './Sound/MyWaveSurfer.js'
import {
    Pitch
} from './libs/pitchfind.js';
import {
    AudioNodeManager
} from './Sound/AudioNodeManager.js'
import {
    MeydaAnalyser
} from './Sound/MeydaAnalyzer.js';
import {
    OffCxt
} from './Sound/OffCxt.js';
import {
    MyThree
} from './Viz/MyThree.js';
import {
    BPMTimer
} from './Sound/BPMTimer.js'
import {
    Kandinsky
} from './Viz/Kandinsky.js'


//class instances
//----------------------------------------------------//
let audioElementHandler = new AudioElementHandler();
let myWaveSurfer = new MyWaveSurfer();
let pitch = new Pitch()
let audioNodeManager;
let meydaAnalyer = new MeydaAnalyser();
let myThree = new MyThree();
let bpmTimer = new BPMTimer();
let stats = new Stats();
let kandinsky;


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
    let myOffCxt = new OffCxt();
    let decodedAudio = await myOffCxt.initializeBuffer(await response.arrayBuffer());
    myOffCxt.assignSource(decodedAudio)
    myOffCxt.connectNodes();
    await myOffCxt.calucalteBPM()
    kandinsky.setBPM(myOffCxt.getbpm())
    bpmTimer.setBPM(myOffCxt.getbpm())
}

//----------------------------------------------------//
main();
async function main() {

    //Audio
    // ----------------------------------------------------//
    //import the files from html src
    let response = await audioElementHandler.fetchSelectedMusic()

    let myOffCxt = new OffCxt();
    let decodedAudio = await myOffCxt.initializeBuffer(await response.arrayBuffer());
    myOffCxt.assignSource(decodedAudio)
    myOffCxt.connectNodes();
    await myOffCxt.calucalteBPM()


    //connect the audio to its soruce and set the initial settings
    audioElementHandler.initializeAudio(response);

    audioNodeManager = new AudioNodeManager(audioElementHandler.getAudioElement());
    audioNodeManager.addNode(
        audioNodeManager.getSource(), // 0
        audioNodeManager.getGainNode(), //1 Gain Node
        pitch.getAnalyser() //2 Pitch 
    )
    audioNodeManager.connectAllNodes();

    // meydaAnalyser create and start
    meydaAnalyer.initializeMeydaAnalyser(audioNodeManager.getSource())

    //connect wave surfer to audio source 
    myWaveSurfer.setAudioElementSource(audioElementHandler.getAudioElement());
    //initializes with settings
    myWaveSurfer.initialize(audioElementHandler.getAudioElement());

    myWaveSurfer.setInteractionEventHandler(myThree)

    
    //VISUALS 
    // ----------------------------------------------------//
    myThree.initialize()
    kandinsky = new Kandinsky(myOffCxt.getbpm())
    bpmTimer.setBPM(myOffCxt.getbpm())
    console.log("BPM:", myOffCxt.getbpm())

    animate();

};

function animate() {

    requestAnimationFrame(animate);
    stats.begin()
    //only loop when the music is playing
    if (!audioElementHandler.getAudioElement().paused) {
        //debug frame rate
        stats.begin()
        //over 4 beat = delet drawing
        if (!bpmTimer.isUnderFourBeat()) {
            myThree.reset();
        }
        //under 4 beat = calculate and create Geomtry 
        else if (bpmTimer.isUnderFourBeat()) {
            let pitchAndEnergy = bpmTimer.getPitchAndEnergy(pitch.getPitch(), meydaAnalyer.getEnergy(), meydaAnalyer.getMaxChroma())
            kandinsky.calculate(pitchAndEnergy);
            myThree.createColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
            myThree.createMesh(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())
            myThree.pickGlowReceivers();
        }
        myThree.render();
        myThree.update();

    }
    stats.end();
}
document.body.appendChild(stats.dom);