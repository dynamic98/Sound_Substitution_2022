//DEBUGGING
//npm run watch -> webpack watches code changes
//press any key in the window to reload the window
// ----------------------------------------------------//
addEventListener('keypress', (event) => {
    location.reload();
});

//libraries
//----------------------------------------------------//
import {
    Visualization
} from './Viz/Visualization.js'
import {
    BPMTimer
} from './Utility/BPMTimer.js'
import {
    Switcher
} from './Utility/Switcher.js'
import {
    Kandinsky
} from './Viz/Kandinsky.js'
import {
    Song
} from './Sound/Audio.js';
import {
    SourceContainer
} from './Sound/SourceContainer.js';



//class instances
//----------------------------------------------------//
let visualization = new Visualization()
let bpmTimer = new BPMTimer();
let switcher = new Switcher();
let stats = new Stats();
let kandinsky;
let sourceContainer;
//HTML element Name  & FOLDER NAME 
let song = new Song("filelist", "static/music/original/")

//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', () => {
    song.togglePlay()
    sourceContainer.togglePlay()
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
document.getElementById("select-music").onchange = async () => {
    await song.changeSong("filelist", "static/music/original/");
    sourceContainer.changeSong("static/music/separated/" + song.getFileName());

    sourceContainer.initialPlay(song.getWaveSurferTime, song.playWaveSurfer)

    kandinsky.setBPM(song.getBPM())
    kandinsky.setMaxVolume(song.getMaxVolume())
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
    visualization.initialize();
    kandinsky = new Kandinsky(song.getBPM(), song.getMaxVolume())
    bpmTimer.setBPM(song.getBPM())

    animate();
};

function animate() {
    requestAnimationFrame(animate);
    stats.begin()

    //only loop when the music is playing
    if (song.isPlaying()) {
        //debug frame rate
        //over 4 beat = delet drawing
        // console.log('original pitch', song.getPitch()) // mixed song
        // console.log('original max chroma', song.getMaxChroma())
        console.log('vocal pitch', sourceContainer.getList()[3].getPitch());  // vocal
        // console.log('bass max chorma', sourceContainer.getList()[3].getMaxChroma())
        // console.log(sourceContainer.getList()[0].getEnergy(), "Bass")
        // console.log(sourceContainer.getList()[1].getEnergy(), "drums")
        // console.log(sourceContainer.getList()[2].getEnergy(), "other")
        // console.log(sourceContainer.getList()[3].getEnergy(), "vocals")

        if (!bpmTimer.isUnderFourBeat()) {
            visualization.reset();
        }
        //under 4 beat = calculate and create Geometry 
        else if (bpmTimer.isUnderFourBeat()) {
            let pitchAndEnergy = switcher.getPitchAndEnergy(song.getPitch(), song.getEnergy(), song.getMaxChroma())

            kandinsky.calculate(pitchAndEnergy);
            visualization.setColor(kandinsky.getNormalizedTone(), kandinsky.getNormalizedOctave())
            visualization.createVisualNote(kandinsky.getPitchEnergy(), kandinsky.getPitchWidth(), kandinsky.getPitchHeight())

        }
        visualization.render();
        visualization.update();
    }
    stats.end();
}
document.body.appendChild(stats.dom);