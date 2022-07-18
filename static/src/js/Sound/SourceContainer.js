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

        for (let i = 0; i < Source.getFileListLength(this.htmlElementID); i++) {
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
            //play
            for (let source of this.sourceList) {
                source.play()
            }

            resolve();
        })
    }

    async changeSong() {
        for (let [index, source] of this.sourceList.entries()) {
            let response = await source.fetchMusic(index);
            source.initializeAudioElement(response.url)
        }
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

    syncTime() {
        return (time) => {
            console.log("time:", time)
            for (let source of this.sourceList) {
                source.setTime(time)
            }
        }
    }

    start(){
        return () => {
            for (let source of this.sourceList) {
                source.play();
            }
        }
    }
}