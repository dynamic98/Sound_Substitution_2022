export class AudioElementHandler {
    constructor(htmlElementID, folderPath) {
        let filelistText = document.getElementById(htmlElementID).innerText;
        this.filelist = filelistText.split(', ');
        this.fileobject = new Object;

        this.filelist.forEach((file, index) => {
            this.fileobject[index] = file;
        });

        this.folderPath=folderPath
    }

    initializeDirectory(fileName) {
        this.directory = 'static/music/' + this.folderPath+ fileName
    }

    fetchMusic() {
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
}