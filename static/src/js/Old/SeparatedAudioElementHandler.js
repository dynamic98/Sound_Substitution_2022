import {
    AudioElementHandler
} from "../Sound/AudioElementHandler";

export class SeparatedAudioElementHandler extends AudioElementHandler {
    constructor(htmlElementId, folderPath) {
        super(htmlElementId, folderPath)

    }
    async fetchMusic(fileIndex) {
        return super.fetchMusic(this.filelist[fileIndex])
    };

}