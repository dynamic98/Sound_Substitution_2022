export class MyAudioContext {
    constructor(){
        this.audioContext=new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
    }

    initialize(audio){
        
        this.audioContext.resume(); //에러? 창을 새로 고침하면 음악 정보가 에널라이저로 들어가지 않는다.
        this.src = this.audioContext.createMediaElementSource(audio);
    }

    initializeAnalyser(){
        this.src.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize =512, 

        this.bufferLength= this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    initializeMeydaAnalyser(updateChroma){
        this. meyda_analyser = Meyda.createMeydaAnalyzer({
            audioContext: this.audioContext,
            source: this.src,
            buffersize: 1024,
            featureExtractors: ["energy", "chroma"],
            callback: (features) => {
             updateChroma(features);
            }
        }
        )
        this.meyda_analyser.start();
    }
    
}