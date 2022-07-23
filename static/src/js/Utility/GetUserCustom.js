export class GetUserCustom {
    constructor() {
        this.CustomObj = new Object();
        this.CustomObj.happy = new Object();
        this.CustomObj.sad = new Object();
        this.CustomObj.exciting = new Object();
        this.CustomObj.peaceful = new Object();

        this.HappyData = document.getElementById('custom_data_happy');
        this.SadData = document.getElementById('custom_data_sad');
        this.ExcitingData = document.getElementById('custom_data_exciting');
        this.PeacefulData = document.getElementById('custom_data_peaceful');

        this.initialize();
    }

    initialize(){
        this.CustomObj.happy.palette = this.HappyData[0];
        this.CustomObj.happy.shape = this.HappyData[1];
        this.CustomObj.happy.texture = this.HappyData[2];
        this.CustomObj.happy.transmission = this.HappyData[3];
        this.CustomObj.happy.roughness = this.HappyData[4];
        this.CustomObj.happy.sensitivity = this.HappyData[5];
        this.CustomObj.happy.intensity = this.HappyData[6];

        this.CustomObj.sad.palette = this.SadData[0];
        this.CustomObj.sad.shape = this.SadData[1];
        this.CustomObj.sad.texture = this.SadData[2];
        this.CustomObj.sad.transmission = this.SadData[3];
        this.CustomObj.sad.roughness = this.SadData[4];
        this.CustomObj.sad.sensitivity = this.SadData[5];
        this.CustomObj.sad.intensity = this.SadData[6];
        
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