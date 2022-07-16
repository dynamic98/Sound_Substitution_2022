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
        console.log("length!!!",AudioElementHandler.instanceCounter++)
        this.meydaAnalyer = new MeydaAnalyser();
        this.pitch;
        this.myOffCxt;
        this.audioNodeManager
    }

    addNodes(sourceURL) {
        this.audioElementHandler.initializeAudio(sourceURL);

        this.audioNodeManager = new AudioNodeManager(this.audioElementHandler.getAudioElement());
        this.audioNodeManager.addNode(
            this.audioNodeManager.getSource(), // 0
            this.audioNodeManager.getGainNode(), //1 Gain Node
            this.audioNodeManager.getAnalyser(), //2 Pitch 
        )
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

}

//----------------------------------------------------//

export class Song extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
        this.selectMusicElement = document.getElementById("select-music");
        this.myWaveSurfer = new MyWaveSurfer();
        this.myOffCxt;
    }

    fetchMusic() {
        for (let index in this.audioElementHandler.getFileObject()) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(this.audioElementHandler.getFileObject()[index], index);
        }

        let fileName = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;

        return this.audioElementHandler.fetchMusic(fileName);
    }

    addNodes(sourceURL) {
        super.addNodes(sourceURL);
        this.audioNodeManager.addNode(
            this.audioNodeManager.getLastNode(), //Destination
        )
    }

    createWaveSurfer() {
        this.myWaveSurfer.setAudioElementSource(this.audioElementHandler.getAudioElement());
        this.myWaveSurfer.initialize(this.audioElementHandler.getAudioElement());
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

    isPlaying() {
        return !this.audioElementHandler.getAudioElement().paused
    }
    togglePlay() {
        this.myWaveSurfer.togglePlay();
        this.audioElementHandler.togglePlay();
    }

}

//----------------------------------------------------//

export class Source extends Audio {
    constructor(htmlElementID, folderPath) {
        super(htmlElementID, folderPath)
        this.sourceList;
    }

    fetchMusic(fileIndex) {
        let fileName = this.audioElementHandler.getFileList()[fileIndex]
        return this.audioElementHandler.fetchMusic(fileName.trim());
    }
    addToSourceList(source) {
        this.sourceList.push(source)
    }
    getSourceList() {
        console.log(this.sourceList)
    }

}