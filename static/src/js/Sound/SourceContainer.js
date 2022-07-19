import {
    Source
} from './Audio.js';

export class SourceContainer {
    constructor(htmlElementID, path) {
        this.htmlElementID = htmlElementID
        this.path = path;
        this.sourceList = []
    }

    async initialize() {

        for (let i = 0; i < Source.getSeparatedFileListLength(this.htmlElementID); i++) {
            let source = new Source(this.htmlElementID, this.path)
            let response = await source.fetchMusic(i)
            source.initializeAudioElement(response.url)
            source.addNodes()
            source.connectNodes();
            source.createMeydaAnalyser();
            source.createPitchFinder();
            this.sourceList.push(source);
        }
        return new Promise((resolve, reject) => {
            resolve();
        })
    }
    
    initialPlay(getWavesurferTime){
        let time = getWavesurferTime()
        console.log("time: ", time)
        for (let source of this.sourceList) {
            source.setTime(time)
            source.play()
        }
    }

    async changeSong(folderPath) {
        for (let i = 0; i < this.sourceList.length; i++) {
            this.sourceList[i].setFolderPath(folderPath)
            let response = await this.sourceList[i].fetchMusic(i)
            this.sourceList[i].initializeAudioElement(response.url)
        }
        return new Promise((resolve, reject) => {
            resolve();
        })
    }

    togglePlay() {
        for (let source of this.sourceList) {
            source.togglePlay()
        }
    }
    forEach(callback) {
        this.sourceList.forEach((source) => callback(source))
    }

    getLength() {
        return this.sourceList.length
    }

    getList() {
        return this.sourceList
    }

    syncTime = (time) => {
        console.log("time:", time)
        for (let source of this.sourceList) {
            source.setTime(time)
        }
    }
}