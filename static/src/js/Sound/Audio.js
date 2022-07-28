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
    Switcher
} from '../Utility/Switcher.js'
import {
    Kandinsky
} from '../Utility/Kandinsky.js';

//----------------------------------------------------//

export class Audio {
    constructor(htmlElementID, folderPath) {
        this.audioElementHandler = new AudioElementHandler(htmlElementID, folderPath)
        this.meydaAnalyer = new MeydaAnalyser();
        this.pitch;
        this.myOffCxt;
        this.audioNodeManager
        this.url
        this.fileName;
        this.kandinsky
        this.switcher = new Switcher()
    }

    initializeAudioElement(url) {
        this.url = url;
        this.audioElementHandler.initializeAudio(this.url)
    }
    initializeKandinsky(bpm, maxVolume) {
        this.kandinsky = new Kandinsky(bpm, maxVolume)
    }
    calculateSignal() {
        let pitchAndEnergy = this.switcher.getPitchAndEnergy(
            this.pitch.getPitch(),
            this.meydaAnalyser.getEnergy(),
            this.meydaAnalyser.getMaxChroma()
        )
        this.kandinsky.calculate(pitchAndEnergy);
    }

    addNodes() {
        this.audioNodeManager = new AudioNodeManager(this.audioElementHandler.getAudioElement());
        this.audioNodeManager.addNode(
            this.audioNodeManager.getSource(), // 0
            this.audioNodeManager.getGainNode(), //1 Gain Node
            this.audioNodeManager.getAnalyser(), //2 Pitch 
          
        )
    }
    fetchMusic(fileName) {
        return this.audioElementHandler.fetchMusic(fileName);
    }

    connectNodes() {
        this.audioNodeManager.connectAllNodes();
    }

    createMeydaAnalyser() {
        this.meydaAnalyser = new MeydaAnalyser();
        //provide context
        this.meydaAnalyser.initializeMeydaAnalyser(this.audioNodeManager.getSource())
    }

    createPitchFinder() {
        this.pitch = new Pitch(this.audioNodeManager.getAnalyser())
    }
    togglePlay() {
        return this.audioElementHandler.togglePlay();
    }
    isPlaying() {
        return !this.audioElementHandler.getAudioElement().paused
    }

    getOriginalEnergy() {
        return this.meydaAnalyser.getEnergy()
    }

    getNormalizedTone() {
        return this.kandinsky.getNormalizedTone()
    }
    getNormalizedOctave() {
        return this.kandinsky.getNormalizedOctave()
    }
    getPitchEnergy() {
        return this.kandinsky.getPitchEnergy()
    }
    getPitchWidth() {
        return this.kandinsky.getPitchWidth()
    }
    getPitchHeight() {
        return this.kandinsky.getPitchHeight()
    }
    getFileListLength() {
        return this.audioElementHandler.getFileList().length;
    }
    getURL() {
        return this.url
    }
    setTime(time) {
        this.audioElementHandler.setTime(time);
    }


}

//----------------------------------------------------//

export class Song extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
        this.selectMusicElement = document.getElementById("select-music");
        this.myWaveSurfer = new MyWaveSurfer();
        this.myOffCxt;

        for (let index in this.audioElementHandler.getFileObject()) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(this.audioElementHandler.getFileObject()[index], index);
        }
    }

    fetchMusic() {
        this.fileName = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;
        return super.fetchMusic(this.fileName)
    }

    addNodes() {
        super.addNodes();
        this.audioNodeManager.addNode(
            this.audioNodeManager.getLastNode(), //Destination
        )
    }

    createWaveSurfer() {
        this.myWaveSurfer.setAudioElementSource(this.audioElementHandler.getAudioElement());
    }

    async createOfflineContext(arrayBuffer) {
        this.myOffCxt = new OffCxt();
        this.myOffCxt.initializeBuffer(arrayBuffer);
        return this.myOffCxt.calculateBPM() //promise
    }

    async changeSong() {
        let response = await this.fetchMusic();
        this.audioElementHandler.initializeAudio(response.url)
        this.myWaveSurfer.setAudioElementSource(this.audioElementHandler.getAudioElement())
        return this.createOfflineContext(await response.arrayBuffer())
    }

    playWaveSurfer = () => {
        return this.myWaveSurfer.playWaveSurfer()
    }
    getFileName() {
        //delete .mp3 & add  / in the end
        return this.fileName.substring(0, this.fileName.length - 4) + "/"
    }

    getBPM() {
        return this.myOffCxt.getBPM();
    }

    getMaxVolume() {
        return this.myOffCxt.getMaxvolume();
    }

    getWaveSurferTime = () => {
        return this.myWaveSurfer.getWavesurfer().getCurrentTime()
    }
    async setWaveSurferCallback(callback) {
        this.myWaveSurfer.setInteractionEventHandler(callback)
    }
    setTime(time) {
        this.audioElementHandler.setTime(time);
    }
}

//----------------------------------------------------//

export class Source extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
    }

    static separatedFileList = ["bass.mp3", "drums.mp3", "other.mp3", "vocals.mp3"];

    static getSeparatedFileListLength() {
        return Source.separatedFileList.length
    }
    static getSeparatedFileList() {
        return this.separatedFileList
    }

    fetchMusic(fileIndex) {
        this.fileName = Source.getSeparatedFileList()[fileIndex]
        return super.fetchMusic(this.fileName);
    }
    play() {
        return this.audioElementHandler.getAudioElement().play()
    }
    getFileName() {
        return this.fileName.substring(0, this.fileName.length - 4)
    }

    setFolderPath(folderPath) {
        this.audioElementHandler.setFolderPath(folderPath)
    }

}