export class AudioElementHandler {
    constructor(htmlElementID, folderPath) {
        console.log(folderPath)
        let filelistText = document.getElementById(htmlElementID).innerText;
        this.filelist = filelistText.split(', ');
        this.fileobject = new Object;

        this.filelist.forEach((file, index) => {
            this.fileobject[index] = file;
        });

        this.folderPath = folderPath

        this.audioElement = document.createElement('audio');
        this.audioElement.setAttribute("id", AudioElementHandler.instanceCounter);
        AudioElementHandler.instanceCounter++
    }

    fetchMusic(fileName) {
        this.directory = this.folderPath + fileName
        try {
            return fetch(this.directory);
        } catch (error) {
            console.error(error);
        }
    }

    getFileObject() {
        return this.fileobject;
    }

    getFileList() {
        return this.filelist
    }

    initializeAudio(sourceURL) {
        this.audioElement.src = sourceURL
    }

    getAudioElement() {
        return this.audioElement;
    }
    //play or pause
    togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play()
        } else {
            this.audioElement.pause();
        }

    }
    setTime(time) {
        console.log("original", this.audioElement.currentTime)

        this.audioElement.currentTime = time;
        console.log("changed", this.audioElement.currentTime)
    }
    setFolderPath(folderPath) {
        this.folderpath=folderPath
    }
}