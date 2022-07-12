import { getPeaks, getIntervals } from "./getBPM";

//offlineAudioContext
let bpm;

export class OffCxt{
    constructor(){
        let OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;

    }
    initialize(arrayBuffer){

        this.offlineCtx = new OfflineAudioContext(2, 30*44100, 44100);
        // this.bpm;
        this.source = this.offlineCtx.createBufferSource();
        this.arrayBuffer = arrayBuffer;

        this.offlineCtx.decodeAudioData(this.arrayBuffer).then(buffer => {
            console.log('buffer~')
            this.source.buffer = buffer;
            let lowpass = this.offlineCtx.createBiquadFilter();
            lowpass.type = "lowpass";
            lowpass.frequency.value = 150;
            lowpass.Q.value = 1;
    
            // Run the output of the source through the low pass.
    
            this.source.connect(lowpass);
    
            // Now a highpass to remove the bassline.
    
            let highpass = this.offlineCtx.createBiquadFilter();
            highpass.type = "highpass";
            highpass.frequency.value = 100;
            highpass.Q.value = 1;
    
            // Run the output of the lowpass through the highpass.
    
            lowpass.connect(highpass);
    
            // Run the output of the highpass through our offline context.
    
            highpass.connect(this.offlineCtx.destination);
    
            // Start the source, and render the output into the offline conext.
    
            this.source.start(0);
            this.offlineCtx.startRendering();
        })

        this.offlineCtx.oncomplete = function(e){
            let buffer = e.renderedBuffer;
            let peaks = getPeaks([buffer.getChannelData(0), buffer.getChannelData(1)]);
            let groups = getIntervals(peaks);
  
            let top = groups.sort(function(intA, intB) {
              return intB.count - intA.count;
            }).splice(0, 5);
            bpm = Math.round(top[0].tempo);
            // console.log("tempo",Math.round(top[0].tempo), top[1].tempo);
        }

    }
    getbpm(){
        this.bpm = bpm;
        return this.bpm;
    }
}

