
import {
    AudioElementHandler
} from "./AudioElementHandler";

export class SeparatedAudioElementHandler extends AudioElementHandler {
    constructor(htmlElementId, folderPath) {
        super(htmlElementId, folderPath)
        this.responseList = []
    }

    async initializeAndFetchAllMusic() {
        for (let fileName of this.filelist) {
            this.initializeDirectory(fileName.trim())
            this.responseList.push(await this.fetchMusic())
        }
    };

    getResponseList() {
        this.responseList;
    }

}


