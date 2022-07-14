//Class that handles the "audio" and 'select-music" div
//----------------------------------------------------//
export class AudioElementHandler {
    //stores  "audio" and 'select-music" in memeber variables
    constructor(htmlElementID) {
        let filelistText = document.getElementById(htmlElementID).innerText;
        let filelist = filelistText.split(', ');
        let fileobject = new Object;
        filelist.forEach((file, index) => {
            fileobject[index] = file;
        });

        this.selectMusicElement = document.getElementById("select-music");
        for (let index in fileobject) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(fileobject[index], index);
        }
        this.selectedText = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;

        this.audioElement = document.getElementById("audio")
        this.initializeDirectory();
    }

    //creates the directory for the selected mp3 file. e.g  static/music/songname.mp3
    initializeDirectory() {
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
        this.audioElement.paused ? this.audioElement.pause : this.audioElement.play()
    }

    //getter for this.audioElement;
    getAudioElement() {
        return this.audioElement;
    }
    getSelectMusicElement() {
        return this.selectMusicElement

    }
}