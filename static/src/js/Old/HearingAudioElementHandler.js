import {
    AudioElementHandler
} from "../Sound/AudioElementHandler";


export class HearingAudioElementHandler extends AudioElementHandler {
    constructor(htmlElementId, folderPath) {
        super(htmlElementId,folderPath);

        this.selectMusicElement = document.getElementById("select-music");
    }

    fetchMusic() {
        for (let index in this.fileobject) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(this.fileobject[index], index);
        }
        this.selectedText = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;
        return super.fetchMusic(this.selectedText)
    }
}

/*
 노래 듣기 -> 어차피 하나를 전체적으로 듣는 경우만 있다. 
 다만 노래 분석의 경우, 전체를 분석하는 것 + 따로 따로 분석하는 것이 예가 있을 수 있다. 
  
 따라서 중요한 건 이제 오디오 분석의 경우, 듣고 있는 소스와 별개로 모든 분석을 진행해야하
 는 점이 유의사항이다.
 
 그래서 듣기용 하나. 
 그리고 그외의 모든 연산을 처리하는 것 하나. 

 듣는 음악에도 피치+ BPM 등을 연산할 필요는 있다. 
 



*/