import{Utility} from '../customjs/Utility.js';

export class MyWaveSurfer{
    constructor(){
        this.wavesurfer = WaveSurfer.create({
            container: document.querySelector('#waveform'),
            waveColor: '#A8DBA8',
            progressColor: '#3B8686',
            cursorWidth : 5,
            normalize: true,
        });
    
        console.log('audio input completed')
        this.wavesurferClick = document.querySelector("#waveform");
    }

initialize(audio){

    this.wavesurfer.load(audio);
    this.wavesurfer.on('ready', async () => {
        console.log("wavesurfer is ready");
        this.wavesurfer.play();
        audio.play();
        await Utility.sleep(1);
        audio.currentTime   = this.wavesurfer.getCurrentTime();
    })
}

    togglePlay(){
       this.wavesurfer.playPause();
    }

    sync(audio){
        this.wavesurferClick.addEventListener("click", async ()=>{
            await Utility.sleep(1);
            audio.currentTime  =this.wavesurfer.getCurrentTime();
        })
    }

    getWavesurfer(){
        return this.wavesurfer;
    }

    getWavesurferClick(){
        return this.wavesurferClick;
    }
}