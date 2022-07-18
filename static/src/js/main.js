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
    MyThree
} from './Viz/MyThree.js';
import {
    BPMTimer
} from './Utility/BPMTimer.js'
import {
    Kandinsky
} from './Viz/Kandinsky.js'
import {
    Song
} from './Sound/Audio.js';
import {
    Source
} from './Sound/Audio.js';

//class instances
//----------------------------------------------------//
let myThree = new MyThree();
let bpmTimer = new BPMTimer();
let stats = new Stats();
let kandinsky;
//HTML element Name  & FOLDER NAME 
let song = new Song("filelist", "static/music/original/")

//event handlers
//----------------------------------------------------//
//whenever the wavesurfer's play button is pressed execute
document.querySelector('[data-action="play"]').addEventListener('click', () => {
    song.togglePlay()
})

//whenever the sound source changes reset directory, import from directory, reset the sound and wavesurfer settings. 
document.getElementById("select-music").onchange = async () => {
    await song.changeSong("filelist", "static/music/original/");
    kandinsky.setBPM(song.getBPM())
    bpmTimer.setBPM(song.getBPM())
}

//----------------------------------------------------//
main();
async function main() {
    //Audio
    // ----------------------------------------------------/
    let response = await song.fetchMusic()

    song.addNodes(response.url)
    song.connectNodes();
    song.createMeydaAnalyser();
    song.createWaveSurfer();
    song.createPitchFinder();
    await song.createOfflineContext(await response.arrayBuffer());


    myThree.initialize()
    kandinsky = new Kandinsky(song.getBPM())
    bpmTimer.setBPM(song.getBPM())

    let sourceList = []
    for (let i = 0; i < Source.getFileListLength("separatedFileList"); i++) {
        let source = new Source("separatedFileList", "static/music/separated/")
        let response = await source.fetchMusic(i)
        console.log(response.url)
        source.addNodes(response.url)
        source.connectNodes();
        source.createMeydaAnalyser();
        source.createPitchFinder();
        source.addToSourceList(source)
        sourceList.push(source)
    }

    console.log()

    animate();
};

function animate() {

    requestAnimationFrame(animate);
    stats.begin()
    //only loop when the music is playing
    if (song.isPlaying()) {
        //debug frame rate
        //over 4 beat = delet drawing
        if (!bpmTimer.isUnderFourBeat()) {
            myThree.reset();
        }
        //under 4 beat = calculate and create Geomtry 
        else if (bpmTimer.isUnderFourBeat()) {
            let pitchAndEnergy = bpmTimer.getPitchAndEnergy(song.getPitch(), song.getEnergy(), song.getMaxChroma())
            // console.log(pitchAndEnergy);
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