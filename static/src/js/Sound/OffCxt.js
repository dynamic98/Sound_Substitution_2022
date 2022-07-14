import {
    getPeaks,
    getIntervals
} from "./getBPM";

//offlineAudioContext

export class OffCxt {
    constructor() {
        this.bpm;
        this.offlineCtx = new OfflineAudioContext(2, 30 * 44100, 44100);
    }

    async initializeBuffer(arrayBuffer) {
        return await this.offlineCtx.decodeAudioData(arrayBuffer)
    }

    assignSource(decodeAudio) {
        this.source = this.offlineCtx.createBufferSource();
        this.source.buffer = decodeAudio;
        this.source.start()
        this.offlineCtx.startRendering();
    }

    calucalteBPM() {
        return new Promise((resolve, reject) => {
            this.offlineCtx.oncomplete = function (e) {
                let buffer = e.renderedBuffer;
                let peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
                let groups = getIntervals(peaks);

                let top = groups.sort(function (intA, intB) {
                    return intB.count - intA.count;
                }).splice(0, 5);
                this.bpm = Math.round(top[0].tempo);
                console.log("bpm:", this.bpm)
                resolve()
            }.bind(this)
        });
    }
    getbpm() {
        console.log("bpm: ", this.bpm)
        return this.bpm;
    }

    getSource() {
        return this.source
    }
}