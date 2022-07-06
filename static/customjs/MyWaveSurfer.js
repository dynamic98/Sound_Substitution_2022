//libraries
//----------------------------------------------------//
import {
    Utility
} from '../customjs/Utility.js';

//Wrapper class for WaveSurfer
//----------------------------------------------------//
export class MyWaveSurfer {

    //creates a waveSurfer object 
    constructor() {
        this.wavesurfer = WaveSurfer.create({
            container: document.querySelector('#waveform'),
            waveColor: '#A8DBA8',
            progressColor: '#3B8686',
            cursorWidth: 5,
            normalize: true,
        });

        console.log('audio input completed')
        this.wavesurferClickElement = document.querySelector("#waveform");
    }

    //connects wave surfet to audioElement
    setAudioElementSource(audioElement){
        this.wavesurfer.load(audioElement);
    }

     //initializes with settings
    initialize(audioElement) {
        this.wavesurfer.on('ready', async () => {
            console.log("wavesurfer is ready");
            this.wavesurfer.play();

            //automatically plays when user enters. sometimes causes errors
            audioElement.play();
            await Utility.sleep(1);
            //

            audioElement.currentTime = this.wavesurfer.getCurrentTime();
        })
    }

    //play/pause
    togglePlay() {
        this.wavesurfer.playPause();
    }

    //event handler. syncs the audioElement'stime to  the wavesurfer. 
    sync(audioElement) {
        this.wavesurferClickElement.addEventListener("click", async () => {
            await Utility.sleep(1);
            audioElement.currentTime = this.wavesurfer.getCurrentTime();
        })
    }

    //returns wavesurfer
    getWavesurfer() {
        return this.wavesurfer;
    }

    //returns wavesurferElement
    getWavesurferClickElement() {
        return this.wavesurferClickElement;
    }
}
//----------------------------------------------------//