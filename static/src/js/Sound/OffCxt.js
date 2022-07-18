import {
    getPeaks,
    getIntervals
} from "./getBPM";
import {
    MeydaAnalyser
} from "./MeydaAnalyzer";

//offlineAudioContext

export class OffCxt {
    constructor() {
        this.bpm;
        this.offlineCtx = new OfflineAudioContext(2, 30 * 44100, 44100);
        this.source = this.offlineCtx.createBufferSource();

    }

    async initializeBuffer(arrayBuffer) {
        let decodeAudio = await this.offlineCtx.decodeAudioData(arrayBuffer)
        this.source.buffer = decodeAudio;
        this.source.connect(this.offlineCtx.destination);

        this.source.start(0)
        this.offlineCtx.startRendering();



    }

    calculateBPM() {
        return new Promise((resolve, reject) => {
            this.offlineCtx.oncomplete = function (e) {
                console.log(e)
                let buffer = e.renderedBuffer;
                let peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
                let groups = getIntervals(peaks);

                let top = groups.sort(function (intA, intB) {
                    return intB.count - intA.count;
                }).splice(0, 5);
                this.bpm = Math.round(top[0].tempo);
                this.renderedBuffer = e.renderedBuffer;
                console.log("bpm:", this.bpm)
                resolve()
            }.bind(this)
        });
    }
    getBPM() {
        return this.bpm;
    }

    getSource() {
        return this.source
    }

    getRenderedBuffer() {
        
        return this.renderedBuffer
    }
}