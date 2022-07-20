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

        this.audioElement
    }

    //connects wave surfet to audioElement
    setAudioElementSource(audioElement) {
        this.audioElement = audioElement
        this.wavesurfer.load(this.audioElement);
    }

    playWaveSurfer = () => {
        console.log("playing")
        return this.wavesurfer.play()
    }

    setInteractionEventHandler(callback) {
        this.wavesurfer.on('seek', async () => {
            callback(this.wavesurfer.getCurrentTime());
        })
    }

    //play/pause
    togglePlay() {
        this.wavesurfer.playPause();
    }

    //returns wavesurfer
    getWavesurfer = () => {
        return this.wavesurfer;
    }
}
//----------------------------------------------------//