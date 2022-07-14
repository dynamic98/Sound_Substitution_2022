import { AudioElementHandler } from "./AudioElementHandler";


export class HearingAudioElementHandler extends AudioElementHandler{
    constructor(htmlElementId){
        super(htmlElementId);

        this.audioElement = document.getElementById("audio")
        this.selectMusicElement = document.getElementById("select-music");
        this.folderPath="original/"
    }

    initializeDirectory() {
        for (let index in this.fileobject) {
            this.selectMusicElement.options[this.selectMusicElement.options.length] = new Option(this.fileobject[index], index);
        }
        this.selectedText = this.selectMusicElement.options[this.selectMusicElement.selectedIndex].text;
        super.initializeDirectory(this.selectedText)
    }

    initializeAudio(response) {
        this.audioElement.src = response.url;
    }

    getAudioElement() {
        return this.audioElement;
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