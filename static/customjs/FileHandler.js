//외부 파일을 임포팅하는 과정과 연관된 클래스 


export class FileHandler {
    
    constructor() {
        this.musicElement = document.getElementById("select-music");
        this.audio = document.getElementById("audio")

        this.selectedValue=  this.musicElement.options[this.musicElement.selectedIndex].value;
        this.selectedText =  this.musicElement.options[this.musicElement.selectedIndex].text;
        this.directory = 'static/music/'+ this.selectedText;

    }
    
    //try importing
    async fileImport(){
            try{
            return await fetch(this.directory);
            }
            catch(error){
                console.error(error);
            }
    }

initializeFile(response){
        this.audio.src = response.url;
        console.log("VizInit play");
        this.audio.load();
        this.audio.volume = 1;
}

getAudio(){
    return this.audio;
}

togglePlay(){
        this.audio.paused ? this.audio.play() : this.audio.pause();
    }

 syncAudio(){
   this.wavesurfer.getWavesurferClick().addEventListener("click", async ()=>{
        await sleep(1);
        this.audio.currentTime  = this.wavesurfer.getWavesurfer().getCurrentTime();
})}

changeAudio(){
    this.selectedValue=  this.musicElement.options[this.musicElement.selectedIndex].value;
    this.selectedText =  this.musicElement.options[this.musicElement.selectedIndex].text;
    this.directory = 'static/music/'+ this.selectedText;
    console.log(this.directory)
}

getElement(){
    return this.musicElement;
}

}
