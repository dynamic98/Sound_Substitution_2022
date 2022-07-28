import {
    Source
} from './Audio.js';

export class SourceContainer {
    constructor(htmlElementID, path) {
        this.htmlElementID = htmlElementID
        this.path = path;
        this.sourceList = [] // 0 bass, 1 drums 2 other 3 vocals
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

    async initialPlay(getWavesurferTime, playWaveSurfer) {
        playWaveSurfer()
        for (let source of this.sourceList) {
            await source.play()
            source.setTime(getWavesurferTime())
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

    async togglePlay() {
        for (let source of this.sourceList) {
            await source.togglePlay()
        }
    }

    syncTime = (time) => {
        for (let i = 0; i < this.sourceList.length; i++) {
            this.sourceList[i].setTime(time)
        }
      
    }

    getLength() {
        return this.sourceList.length
    }

    getList() {
        return this.sourceList
    }

    // 0 bass, 1 drums 2 other 3 vocals
    getSource(sourceName) {
        for (let source of this.sourceList) {
            if (sourceName == source.getFileName()) {
                return source
            }
        }
        console.error(`Source Name Incorrect. Only "bass", "drums", "other", "vocals" are available`)
    }
}