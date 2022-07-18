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
            source.addNodes(response.url)
            source.connectNodes();
            source.createMeydaAnalyser();
            source.createPitchFinder();
            this.sourceList.push(source);
        }

        return new Promise((resolve, reject) => {
            //play
            for (let source of this.sourceList) {
                source.togglePlay()

            }
            console.log("sources are playing ")
            resolve();
        })
    }

    changeSong() {
        for (let [index, source] of this.sourceList.entries()) {
            source.changeSong(index)
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
            for (let [index, source] of this.sourceList.entries()) {
                source.setTime(time)
            }
        }

    }


}