import {
    getPeaks,
    getIntervals
} from "./getBPM";

//offlineAudioContext


export class OffCxt {
    constructor() {
        this.bpm;
        this.offlineCtx = new OfflineAudioContext(2, 30 * 44100, 44100);

        this.lowpass = this.offlineCtx.createBiquadFilter();
        this.lowpass.type = "lowpass";
        this.lowpass.frequency.value = 150;
        this.lowpass.Q.value = 1;

        this.highpass = this.offlineCtx.createBiquadFilter();
        this.highpass.type = "highpass";
        this.highpass.frequency.value = 100;
        this.highpass.Q.value = 1;

    }

    async initializeBuffer(arrayBuffer) {
        return await this.offlineCtx.decodeAudioData(arrayBuffer)
    }

    assignSource(decodeAudio) {
        this.source = this.offlineCtx.createBufferSource();
        this.source.buffer = decodeAudio;
        this.source.start();
        this.offlineCtx.startRendering();
    }

    connectNodes() {
        this.source.connect(this.lowpass);
        this.lowpass.connect(this.highpass);
        this.highpass.connect(this.offlineCtx.destination);
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
        return this.bpm;
    }

    getSource() {
        return this.source
    }
}