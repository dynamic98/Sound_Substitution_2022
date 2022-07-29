export class GetUserCustom {
    constructor() {
        this.CustomObj = new Object();
        this.CustomObj.Piano = new Object();
        this.CustomObj.Drum = new Object();
        this.CustomObj.exciting = new Object();
        this.CustomObj.peaceful = new Object();

        this.PianoData = document.getElementById('custom_data_piano');
        this.DrumData = document.getElementById('custom_data_drum');

        this.initialize();
    }

    initialize(){
        this.CustomObj.Piano.palette = this.PianoData[0];
        this.CustomObj.Piano.shape = this.HappyData[1];
        this.CustomObj.Piano.texture = this.HappyData[2];
        this.CustomObj.Piano.transmission = this.HappyData[3];
        this.CustomObj.Piano.roughness = this.HappyData[4];
        this.CustomObj.Piano.sensitivity = this.HappyData[5];
        this.CustomObj.Piano.intensity = this.HappyData[6];

        this.CustomObj.Drum.palette = this.SadData[0];
        this.CustomObj.Drum.shape = this.SadData[1];
        this.CustomObj.Drum.texture = this.SadData[2];
        this.CustomObj.Drum.transmission = this.SadData[3];
        this.CustomObj.Drum.roughness = this.SadData[4];
        this.CustomObj.Drum.sensitivity = this.SadData[5];
        this.CustomObj.Drum.intensity = this.SadData[6];
        
        this.CustomObj.exciting.palette = this.ExcitingData[0];
        this.CustomObj.exciting.shape = this.ExcitingData[1];
        this.CustomObj.exciting.texture = this.ExcitingData[2];
        this.CustomObj.exciting.transmission = this.ExcitingData[3];
        this.CustomObj.exciting.roughness = this.ExcitingData[4];
        this.CustomObj.exciting.sensitivity = this.ExcitingData[5];
        this.CustomObj.exciting.intensity = this.ExcitingData[6];

        this.CustomObj.peaceful.palette = this.PeacefulData[0];
        this.CustomObj.peaceful.shape = this.PeacefulData[1];
        this.CustomObj.peaceful.texture = this.PeacefulData[2];
        this.CustomObj.peaceful.transmission = this.PeacefulData[3];
        this.CustomObj.peaceful.roughness = this.PeacefulData[4];
        this.CustomObj.peaceful.sensitivity = this.PeacefulData[5];
        this.CustomObj.peaceful.intensity = this.PeacefulData[6];

    }

    getCustomObj(){
        return this.CustomObj;
    }
}