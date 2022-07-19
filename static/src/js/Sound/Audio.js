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

//----------------------------------------------------//

export class Audio {
    constructor(htmlElementID, folderPath) {
        this.audioElementHandler = new AudioElementHandler(htmlElementID, folderPath)
        this.meydaAnalyer = new MeydaAnalyser();
        this.pitch;
        this.myOffCxt;
        this.audioNodeManager
        this.url
    }

    initializeAudioElement(url) {
        this.url=url;
        this.audioElementHandler.initializeAudio(this.url)
    }

    addNodes() {
        this.audioNodeManager = new AudioNodeManager(this.audioElementHandler.getAudioElement());
        this.audioNodeManager.addNode(
            this.audioNodeManager.getSource(), // 0
            this.audioNodeManager.getGainNode(), //1 Gain Node
            this.audioNodeManager.getAnalyser(), //2 Pitch 
            this.audioNodeManager.getLastNode(),
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
    getPitch() {
        return this.pitch.getPitch()
    }
    getEnergy() {
        return this.meydaAnalyser.getEnergy()
    }
    getMaxChroma() {
        return this.meydaAnalyser.getMaxChroma()
    }

    getFileListLength() {
        return this.audioElementHandler.getFileList().length;
    }
    isPlaying() {
        return !this.audioElementHandler.getAudioElement().paused
    }
    togglePlay() {
        this.audioElementHandler.togglePlay();
    }
    getURL(){
        return this.url
    }

}

//----------------------------------------------------//

export class Song extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
        this.selectMusicElement = document.getElementById("select-music");
        this.myWaveSurfer = new MyWaveSurfer();
        this.myOffCxt;
        this.fileName;

        for (let index in this.audioElementHandler.getFileObject()) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(this.audioElementHandler.getFileObject()[index], index);
        }
    }

    fetchMusic() {
        this.fileName = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;
        return super.fetchMusic(this.fileName)
    }

    // addNodes() {
    //     super.addNodes();
    //     this.audioNodeManager.addNode(
    //         this.audioNodeManager.getLastNode(), //Destination
    //     )
    // }

    createWaveSurfer() {
        this.myWaveSurfer.setAudioElementSource(this.audioElementHandler.getAudioElement());
        this.myWaveSurfer.onReady(this.audioElementHandler.getAudioElement());
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

    getBPM() {
        return this.myOffCxt.getBPM();
    }

    getMaxVolume() {
        return this.myOffCxt.getMaxvolume();
    }

    async setWaveSurferCallback(callback) {
        this.myWaveSurfer.setInteractionEventHandler(callback)
    }
    getWaveSurferTime = () => {
        return this.myWaveSurfer.getWavesurfer().getCurrentTime()
    }
    getFileName() {
        //delete .mp3 & add  / in the end
        return this.fileName.substring(0, this.fileName.length - 4) + "/"
    }
    playWaveSurfer=() => {
        return this.myWaveSurfer.playWaveSurfer()
    }

}

//----------------------------------------------------//

export class Source extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
    }
    static separatedFileList = ["bass.mp3", "drums.mp3", "other.mp3", "vocals.mp3"];

    static getSeparatedFileListLength() {
        return  Source.separatedFileList.length
    }
    static getSeparatedFileList(){
        return this.separatedFileList
    }

    fetchMusic(fileIndex) {
        return super.fetchMusic(Source.getSeparatedFileList()[fileIndex]);
    }
    play() {
        this.audioElementHandler.getAudioElement().play()
    }

    setTime(time) {
        this.audioElementHandler.setTime(time);
    }
    setFolderPath(folderPath){
        this.audioElementHandler.setFolderPath(folderPath)
    }

    
}