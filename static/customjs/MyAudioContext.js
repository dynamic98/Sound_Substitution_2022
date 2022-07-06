//Wrapper class for AudioContext
//----------------------------------------------------//
export class MyAudioContext {
    //makes a instance of the AudioContext and creates an analyser from it
    constructor(){
        this.audioContext=new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
    }

    //create audio node from audio element and connect with analyser
    initializeAnalyser(audioElement){
        this.src = this.audioContext.createMediaElementSource(audioElement);
        this.src.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize =512, 

        this.bufferLength= this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
    }

    //create theMeyda Analyser. Accepts a callback from a Chroma Instance
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