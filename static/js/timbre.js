class Instrument {
    constructor(name){
        this.name = name;
        let ToneBuffer = new Map();
        for (let i=0; i<256; i++){
            ToneBuffer.set(i, []);
        };
        this.ToneBuffer = ToneBuffer;

        let LoudBuffer = [];
        this.LoudBuffer = LoudBuffer;
    }

    updateTone(amplitudeSpectrum){
        let result = [];
        amplitudeSpectrum.forEach((value, index) => {
            let currentToneBuffer = this.ToneBuffer.get(index);
            currentToneBuffer.push(value);
            let framesToBuffer = 20;
            while (currentToneBuffer.length > framesToBuffer) {
                currentToneBuffer.shift();
            }
            let framesAverage = 
                currentToneBuffer.reduce((total, value) => total+value, 0)/currentToneBuffer.length;
            framesAverage = Math.pow(framesAverage, 5);
            result.push(framesAverage);
        });
        return result;
    };

    updateLoud(energy){
        let result;
        this.LoudBuffer.push(energy);
        let framesToBuffer = 20;
        while (this.LoudBuffer.length > framesToBuffer) {
            this.LoudBuffer.shift();
        }
        let framesAverage = 
            this.LoudBuffer.reduce((total, value) => total+value, 0)/this.LoudBuffer.length;
        // framesAverage = Math.pow(framesAverage, 5);
        result = framesAverage;
        return result;
    };
}

export {Instrument};