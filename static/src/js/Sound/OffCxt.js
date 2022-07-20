import {
    getPeaks,
    getIntervals
} from "./getBPM";

export class OffCxt {
    constructor() {
        this.bpm;
        this.maxVolume;
        this.renderedBuffer
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

                let buffer = e.renderedBuffer;
                let peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
                let volumes = peaks.map(row => row.volume)
                this.maxVolume = volumes.reduce((acc, cur) => {
                    return acc + cur
                }, 0) / volumes.length;
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

    getMaxvolume() {
        return this.maxVolume
    }

    getRenderedBuffer() {
        return this.renderedBuffer
    }
}