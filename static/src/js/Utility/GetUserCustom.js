export class GetUserCustom {
    constructor() {
        this.CustomObj = new Object();
        this.CustomObj.Piano = new Object();
        this.CustomObj.Drum = new Object();
        this.CustomObj.Haptic = new Object();
        this.PianoData = document.getElementById('custom_data_piano').getElementsByTagName('li');
        this.DrumData = document.getElementById('custom_data_drum').getElementsByTagName('li');
        this.HapticData = document.getElementById('custom_data_haptic').getElementsByTagName('li');
        this.UserName = document.getElementById('user_name').innerText;
        this.UserNumber = document.getElementById('user_number').innerText;
        this.CustomObj.UserName = this.UserName
        this.CustomObj.UserNumber = this.UserNumber
        this.initialize();
    }

    initialize(){
        this.CustomObj.Piano.shape = this.PianoData[0].innerText;
        this.CustomObj.Piano.texture = this.PianoData[1].innerText;
        this.CustomObj.Piano.palette_num = parseInt(this.PianoData[2].innerText);
        let palette_set = this.PianoData[3].innerText;
        palette_set = palette_set.substring(2,palette_set.length-2).split("', '")
        this.CustomObj.Piano.palette_set = palette_set;
        this.CustomObj.Piano.interval = parseInt(this.PianoData[4].innerText);
        this.CustomObj.Piano.size = parseInt(this.PianoData[5].innerText);
        this.CustomObj.Piano.line = $.parseJSON(this.PianoData[6].innerText.toLowerCase());

        this.CustomObj.Drum.shape = this.DrumData[0].innerText;
        this.CustomObj.Drum.texture = this.DrumData[1].innerText;
        let Drum_color = this.DrumData[2].innerText;
        Drum_color = Drum_color.substring(1, Drum_color.length-1).split(/:|,/)
        let Drum_object = {h:parseInt(Drum_color[1]), s:parseInt(Drum_color[3]), l:parseInt(Drum_color[5])}
        this.CustomObj.Drum.color = Drum_object;
        this.CustomObj.Drum.size = parseInt(this.DrumData[3].innerText);

        this.CustomObj.Haptic.sensitivity = parseFloat(this.HapticData[0].innerText);
        this.CustomObj.Haptic.intensity = parseFloat(this.HapticData[1].innerText);

    }

    getCustomObj(){
        return this.CustomObj;
    }

    setCustomShape = (inst, para) => {
        if(inst=='piano'){
            this.CustomObj.Piano.shape = para
        }else if(inst=='drum'){
            this.CustomObj.Drum.shape = para
        }
    }
    
    setCustomTexture = (inst, para) => {
        if(inst=='piano'){
            this.CustomObj.Piano.texture = para
        }else if(inst=='drum'){
            this.CustomObj.Drum.texture = para
        }
    }


}