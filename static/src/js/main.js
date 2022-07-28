
//libraries
//----------------------------------------------------//
import {
    Visualization
} from './Viz/Visualization.js'
import {
    BPMTimer
} from './Utility/BPMTimer.js'

import {
    Song
} from './Sound/Audio.js';
import {
    SourceContainer
} from './Sound/SourceContainer.js';


//class instances
//----------------------------------------------------//
let visualization = new Visualization(5)
let bpmTimer = new BPMTimer();
let stats = new Stats();
document.body.appendChild(stats.dom);
let sourceContainer;
//HTML element Name  & FOLDER NAME 
let song = new Song("filelist", "static/music/original/")
let drum;

//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', async () => {
    await song.togglePlay()
    sourceContainer.togglePlay()
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
document.getElementById("select-music").onchange = async () => {
    await song.changeSong("filelist", "static/music/original/");
    await sourceContainer.changeSong("static/music/separated/" + song.getFileName());
    sourceContainer.initialPlay(song.getWaveSurferTime, song.playWaveSurfer)
    bpmTimer.setBPM(song.getBPM())
}

//----------------------------------------------------//
main();
async function main() {
    //Audio
    // ----------------------------------------------------/
    let response = await song.fetchMusic()
    console.log(response)
    song.initializeAudioElement(response.url)
    song.addNodes()
    song.connectNodes();
    song.createMeydaAnalyser();
    song.createWaveSurfer();
    song.createPitchFinder();
    await song.createOfflineContext(await response.arrayBuffer());

    sourceContainer = new SourceContainer("separatedFileList", "static/music/separated/" + song.getFileName());
    await sourceContainer.initialize()
    sourceContainer.initialPlay(song.getWaveSurferTime, song.playWaveSurfer)
    song.setWaveSurferCallback(sourceContainer.syncTime)

    //VISUALS & OTHERS
    // ----------------------------------------------------/
    drum = sourceContainer.getSource("drums")
    song.initializeKandinsky(song.getBPM(), song.getMaxVolume())
    drum.initializeKandinsky(song.getBPM(), song.getMaxVolume())
    bpmTimer.setBPM(song.getBPM())

    animate();
};

// let pitchList = [];

function animate() {
    // console.log(sourceContainer.getSource("vocals").getPitch())
    requestAnimationFrame(animate);
    stats.begin()

    //only loop when the music is playing
    if (song.isPlaying() && song.getOriginalEnergy() > 0) {
        if (!bpmTimer.isUnderFourBeat()) {
            visualization.reset();
        }
        //under 4 beat = calculate and create Geometry 
        else if (bpmTimer.isUnderFourBeat()) {
            draw(song, "piano")
            draw(drum, "drum")
        }
        visualization.render();
        visualization.update();
    }
    stats.end();
    // console.log(pitchList);
}

function draw(instance, instrumentType) {
    // console.log(instance.getOriginalEnergy())
    if (instance.getOriginalEnergy() > 0.01) {
        instance.calculateSignal();
        if (instance.getFileName() == "drums") {
            visualization.createVisualNote(instrumentType, instance.getPitchEnergy(), instance.getPitchWidth(), -60)
        } else {
            visualization.createVisualNote(instrumentType, instance.getPitchEnergy(), instance.getPitchWidth(), instance.getPitchHeight())
            visualization.setColor(instrumentType, instance.getNormalizedTone(), instance.getNormalizedOctave())
        }
        visualization.createConnectionLine(instrumentType)
    }
}

//debug frame rate
//over 4 beat = delet drawing
// console.log('original pitch', song.getPitch()) // mixed song
// console.log('original max chroma', song.getMaxChroma())
//console.log('vocal pitch', sourceContainer.getList()[3].getPitch()); // vocal
// console.log('bass max chorma', sourceContainer.getList()[3].getMaxChroma())
// console.log(sourceContainer.getList()[0].getEnergy(), "Bass")
// console.log(sourceContainer.getList()[1].getEnergy(), "drums")
// console.log(sourceContainer.getList()[2].getEnergy(), "other")
// console.log(sourceContainer.getList()[3].getEnergy(), "vocals")