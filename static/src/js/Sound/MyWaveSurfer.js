//Wrapper class for WaveSurfer
//----------------------------------------------------//

import {
    Utility
} from '../Utility/Utility.js'
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
    setAudioElementSource(audioElement) {
        this.wavesurfer.load(audioElement);
    }

    //initializes with settings
    onReady(audioElement, ) {
        this.audioElement = audioElement
        this.wavesurfer.on('ready', async () => {
            console.log("wavesurfer is ready");
            await this.wavesurfer.play()

        })
    }

    playWaveSurfer = () => {
        console.log("playing")
        return this.wavesurfer.play()
    }

    setInteractionEventHandler(callback) {
        this.wavesurfer.on('seek', () => {
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