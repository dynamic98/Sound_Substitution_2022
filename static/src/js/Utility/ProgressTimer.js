export class ProgressTimer{
    constructor (duration, element) {
        this.element = element;
        // console.log(this.element);
        this.intervalSetted = null;
        this.duration = duration*1000;
        this.played = false;
        // this.play();
        document.getElementById('play').addEventListener("click", () =>{
            if(this.played && (this.getThisSeconds()!=15000)){
                this.pause();
                this.element.value = "0";
            } else{
                this.play();
            }
        })
    }

    pause(){
        clearInterval(this.intervalSetted);
        this.played = false;
    }

    play(){
        let start = new Date().getTime();
        let element = this.element;
        let duration = this.duration;
        let ProgressBarMaxValue = 15000
        this.played = true;
        function timer(){
            let CurrentTime = new Date().getTime();
            let diff = (CurrentTime - start);
            let diff2ProgressValue = diff*(ProgressBarMaxValue/duration)
            element.value = diff2ProgressValue.toString();
            if (diff >= duration) {
                console.log(diff)
                // start = new Date().getTime();
                clearInterval(intervalSetted)
            }
        }
        let intervalSetted = setInterval(timer, 100);
        this.intervalSetted = intervalSetted;
    }
    getThisSeconds(){
        return this.element.value;
    }
    getPlayed(){
        return this.played;
    }
}
