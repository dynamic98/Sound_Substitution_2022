
//Wrapper class for WaveSurfer
//----------------------------------------------------//
export class MyWaveSurfer {

    //creates a waveSurfer object 
    constructor() {
        this.wavesurfer = WaveSurfer.create({
            container: document.querySelector('#waveform'),
            backend: 'MediaElement',
            waveColor: '#A8DBA8',
            progressColor: '#3B8686',
            cursorWidth: 5,
            normalize: true,
        });
        console.log('audio input completed')

    }

    //connects wave surfet to audioElement
    setAudioElementSource(audioElement){
        this.wavesurfer.load(audioElement);
    }

     //initializes with settings
    initialize(audioElement,offline) {
        this.wavesurfer.on('ready', async () =>
         {
            console.log("wavesurfer is ready");
            this.wavesurfer.play()
            audioElement.currentTime = this.wavesurfer.getCurrentTime();
        })
    }
    setInteractionEventHandler(callback){
        this.wavesurfer.drawer.on('click', () =>
        {
            callback(this.wavesurfer.getCurrentTime());
         
       })
    }

    //play/pause
    togglePlay() {
        this.wavesurfer.playPause();
    }

    //returns wavesurfer
    getWavesurfer() {
        return this.wavesurfer;
    }

}
//----------------------------------------------------//