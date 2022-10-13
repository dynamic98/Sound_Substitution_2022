export class BPMTimer {
    constructor() {
        this.startTime = new Date()
        this.LastTime = this.startTime.getTime();
        this.CFIVE = 5
        this.FOUR = 4
        this.bpm = 60;
    }

    setBPM = (bpm) => {
        this.bpm = bpm
    }

    isUnderFourBeat() {
        let CurrentTime = new Date().getTime() //millisecond. 
        let DeltaTime = CurrentTime - this.LastTime;
        let FourBeatTime = (60 * 1000) / this.bpm * 4; // convert 4beat per minue to millisecond
        //reset
        if (DeltaTime > FourBeatTime) {
            this.LastTime = CurrentTime;
            return false
        } else {
            return true
        }
    }
    getBPM() {
        return this.bpm
    }
    getFourBeatTime(){
        return (60 * 1000) / this.bpm * 4;
    }

    setBPMByMeshCount(meshCount) {
        this.bpm = this.bpm / meshCount * 15 //그냥 때려박은 숫자 ㅋ
    }
    restart(){
        this.startTime = new Date()
        this.LastTime = this.startTime.getTime();
    }
}