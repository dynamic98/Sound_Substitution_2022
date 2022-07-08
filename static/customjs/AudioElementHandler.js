//Class that handles the "audio" and 'select-music" div
//----------------------------------------------------//
export class AudioElementHandler {
    //stores  "audio" and 'select-music" in memeber variables
    constructor() {
        this.selectMusicElement = document.getElementById("select-music");
        this.audioElement = document.getElementById("audio")

        this.audioContext = new AudioContext();

        Tone.setContext(this.audioContext);

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
        this.audioElement.play(); //must play in order to analyse
    }

    //creates a gain Node nad connects with mediaElementSource
    connectAudioToGain() {
        this.src = this.audioContext.createMediaElementSource(this.audioElement);
        this.gainNode = this.audioContext.createGain();
        Tone.connect(this.src, this.gainNode);
    }

    //play or pause
    togglePlay() {
        this.audioElement.paused? this.audioElement.pause : this.audioElement.play()
    }

    //coonects node to final destination
    connect(node) {
        Tone.connect(node, this.audioContext.destination)
        console.log("last node connected")
    }

    //getter for this.audioElement;
    getAudioElement() {
        return this.audioElement;
    }

    //getter for this.selectMusicElement;
    getSelectMusicElement() {
        return this.selectMusicElement;
    }

    getGainNode() {
        return this.gainNode
    }

}