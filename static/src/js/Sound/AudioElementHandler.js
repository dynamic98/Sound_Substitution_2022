export class AudioElementHandler {
    constructor(htmlElementID, folderPath) {
        this.folderPath = folderPath;
        this.directory;

        let filelistText = document.getElementById(htmlElementID).innerText;
        this.filelist = filelistText.split(', ');
        this.fileobject = new Object;

        this.filelist.forEach((file, index) => {
            this.fileobject[index] = file;
        });
        this.directory
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

    //play or pause
    togglePlay() {
        return this.audioElement.paused ? this.audioElement.play() : this.audioElement.pause();
    }

    initializeAudio(sourceURL) {
        this.audioElement.src = sourceURL
    }

    getFileObject() {
        return this.fileobject;
    }

    getFileList() {
        return this.filelist
    }

    getAudioElement() {
        return this.audioElement;
    }

    setTime(time) {


        this.audioElement.currentTime = time
        console.log(this.audioElement.currentTime)
    }

    setFolderPath(folderPath) {
        this.folderPath = folderPath
    }
}