//Class that handles the "audio" and 'select-music" div
//----------------------------------------------------//
export class AudioElementHandler {
    //stores  "audio" and 'select-music" in memeber variables
    constructor() {
        this.selectMusicElement = document.getElementById("select-music");
        this.audioElement = document.getElementById("audio")
        this.initializeDirectory();
    }

    //creates the directory for the selected mp3 file. e.g  static/music/songname.mp3
    initializeDirectory() {
        this.selectedText = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;
        this.directory = 'static/music/' + this.selectedText;
        console.log(this.directory)
    }

    //fetches selectedmusic. Returns a promise 
    async fetchSelectedMusic() {
        try {
            return await fetch(this.directory);
        } catch (error) {
            console.error(error);
        }
    }

    //connects the Response Object to this.audioElement & plays 
    initializeAudio(response) {
        this.audioElement.src = response.url;
        console.log("VizInit play", this.audioElement.src);
        
        //must play in order to analyse but using the wavesurfer to play it 
       //by using the following code:  backend: 'MediaElement',
        //this.audioElement.play(); /
    }

    //play or pause
    togglePlay() {
        this.audioElement.paused? this.audioElement.pause : this.audioElement.play()
    }

    //getter for this.audioElement;
    getAudioElement() {
        return this.audioElement;
    }
}