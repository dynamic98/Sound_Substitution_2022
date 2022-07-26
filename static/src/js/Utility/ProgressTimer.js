export class ProgressTimer{
    constructor (duration, element) {
        this.element = element;
        // console.log(this.element);
        this.intervalSetted = null;
        this.duration = duration*1000;
        this.counter = 1;
        this.play();
        document.getElementById('play').addEventListener("click", () =>{
            this.counter ++;
            if(this.counter%2 == 0){
                this.pause();
            } else{
                this.play();
            }
        })
    }

    pause(){
        clearInterval(this.intervalSetted);
    }

    play(){
        let start = new Date().getTime();
        let element = this.element;
        let duration = this.duration;
        function timer(){
            let CurrentTime = new Date().getTime();
            let diff = (CurrentTime - start);
            element.value = diff.toString();
            if (diff >= duration) {
                start = new Date().getTime();
            }
        }
        this.intervalSetted = setInterval(timer, 100);
    }
    getThisSeconds(){
        return this.element.value;
    }
}
