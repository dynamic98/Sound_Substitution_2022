// const iro=require('@jaames/iro');
// import iro from '@jaames/iro'
export class ColorPicker {

    constructor(){
        this.colorPicker = new iro.ColorPicker('#picker',{width:100});
        this.colorPicker2 = new iro.ColorPicker('#picker2',{width:100});
        this.picker = document.getElementById("picker_type");
        this.color=document.getElementById("color_picker")
        this.palettes = document.getElementById("palettes_candi");
        this.PaletteValue = document.getElementById("PaletteValue");
        this.setted_color = new Array(12)
        this.selected_colors = new Array(11)
        this.main_color=0
        this.palette_colorset=[[0, 120, 240], [30, 150, 270], [60, 180, 300], [90, 210, 330]]
        this.num = null;
        this.palette_candidate = document.getElementsByClassName('Palette')
        this.picker_candidate = document.getElementsByClassName('Picker')
        this.initialize();
        // this.set_final(0);
    }
    initialize(){
        for(let i=0; i<11; i++){
            this.selected_colors[i]=new Array(12)
        }
        this.set_color(this.main_color, "saturation")
        this.set_color(this.main_color, "lightness")
        this.set_beat(this.main_color)
        this.setted_color=this.selected_colors[0]
        // let picker_type="saturation"
        let hex = this.colorPicker.color.hexString;
        this.initial_setting()

        // this.colorPicker.on('color:change', function(color){
        //     this.main_color=color.hsl['h']
        //     this.set_color(this.main_color, "saturation")
        //     this.set_color(this.main_color, "lightness")
        //     // set_beat(main_color)
        // })
        let self = this;
        this.colorPicker.on('color:change', function(color){
            this.main_color=color.hsl['h']
            self.set_color(this.main_color, "saturation")
            self.set_color(this.main_color, "lightness")
            // set_beat(main_color)
        })


        // this.picker_candidate[0].onclick= event => {this.set_final(0)}
        // this.picker_candidate[1].onclick= event => {this.set_final(1)}
        // this.palette_candidate[0].onclick= event => {this.set_final(2)}
        // this.palette_candidate[1].onclick= event => {this.set_final(3)}
        // this.palette_candidate[2].onclick= event => {this.set_final(4)}
        // this.palette_candidate[3].onclick= event => {this.set_final(5)}
        // this.palette_candidate[4].onclick= event => {this.set_final(6)}
        // this.palette_candidate[5].onclick= event => {this.set_final(7)}
        // this.palette_candidate[6].onclick= event => {this.set_final(8)}
        // this.palette_candidate[7].onclick= event => {this.set_final(9)}

    }

    PitchOnclickListener(callback){
        for(let i=0; i<2; i++){
            this.picker_candidate[i].onclick = event => {
                this.set_final(i)
                callback(i, this.GetSettedColor())
            }
        }
        // }
        for(let i=0; i<9; i++){
            this.palette_candidate[i].onclick = event => {
                this.set_final(i+2)
                callback(i+2, this.GetSettedColor())
            }
        }
    }

    BeatOnclickListener(callback){
        let self = this;
        this.colorPicker2.on('color:change', function(color){
            this.main_color=color.hsl
            // hue 값이 아닌 hsl 전체값이 main_color에 저장됨
            self.set_beat(this.main_color)
            callback(this.main_color)
        })
    }

    

    initial_setting(){
        for(let j=0; j<9; j++){
            this.set_pal(j+1)
            for(let i=0; i<12;i++){
                let color_box=document.getElementById("p"+(j+1).toString()+"_"+(i+1).toString())
                color_box.style.background=this.selected_colors[j+2][i]
            }
            
        
        }
    }
    
    set_final(num){
        this.setted_color=this.selected_colors[num]
        // console.log(num, this.setted_color)
        this.num = num;
        this.piano_coloring(num, this.setted_color)

        const picker_class = document.getElementsByClassName('Picker')
        const palette_class = document.getElementsByClassName('Palette')
        if(num<2){
            for(let i=0; i<2; i++){
                if(i==num){
                    picker_class[i].style.backgroundColor="rgb(248, 87, 87)"
                }else{
                    picker_class[i].style.backgroundColor="rgb(250, 250, 250)"
                }
            }
            for(let j=0; j<9; j++){
                palette_class[j].style.backgroundColor="rgb(250, 250, 250)"
            }
        }else{
            for(let i=0; i<2; i++){
                picker_class[i].style.backgroundColor="rgb(250, 250, 250)"
            }
            for(let j=0; j<9; j++){
                
                if(j==(num-2)){
                    palette_class[j].style.backgroundColor="rgb(248, 87, 87)"
                }else{
                    palette_class[j].style.backgroundColor="rgb(250, 250, 250)"
                }
            }
        }
    
    }

    set_beat(main_color){
        let target = document.getElementById("b_1")
        target.style.backgroundColor="hsl("+main_color['h']+", 100%, "+main_color['l']+"%)"
        
    }

    set_color(main_color, picker_type){
        if (picker_type="saturation"){
            for(let i=0;i<12;i++){
                var target = document.getElementById("s_"+(i+1).toString())
                let sat_val=i*8+2
                this.selected_colors[0][i]="hsl("+main_color+", "+sat_val+"%, 50%)"
                target.style.backgroundColor=this.selected_colors[0][i]
            }

        }
        if(picker_type="lightness"){
            for(let i=0;i<12;i++){
                let target = document.getElementById("l_"+(i+1).toString())
                let light_val=i*5+20
                this.selected_colors[1][i]="hsl("+main_color+", 100%, "+light_val+"%)"
                target.style.backgroundColor=this.selected_colors[1][i]
            }
        }      
    }

    set_SaturationAndLightness(hue){
        for(let i=0;i<12;i++){
            var target = document.getElementById("s_"+(i+1).toString())
            let sat_val=i*8+2
            let satu_color="hsl("+hue+", "+sat_val+"%, 50%)"
            target.style.backgroundColor=satu_color
        }
        for(let i=0;i<12;i++){
            let target = document.getElementById("l_"+(i+1).toString())
            let light_val=i*5+20
            let light_color ="hsl("+hue+", 100%, "+light_val+"%)"
            target.style.backgroundColor=light_color
        }
    }

    set_pal(pal_num){
        if(pal_num<=4){
            for(let i=0;i<4;i++){
                let set_val=90-15*(i)
                this.selected_colors[pal_num+1][i]="hsl("+this.palette_colorset[pal_num-1][0]+", "+set_val+"%, "+set_val+"%)"
                this.selected_colors[pal_num+1][i+4]="hsl("+this.palette_colorset[pal_num-1][1]+", "+set_val+"%, "+set_val+"%)"
                this.selected_colors[pal_num+1][i+8]="hsl("+this.palette_colorset[pal_num-1][2]+", "+set_val+"%, "+set_val+"%)"
            }
        }
        if(pal_num==5){
            for(let i=0;i<12;i++){
                let h_val=30*i
                this.selected_colors[6][i]="hsl("+h_val.toString()+", 75%, 50%)"
            }
        }
        if(pal_num==6){
            for(let i=0;i<12;i++){
                let h_val=10+(i*5)
                this.selected_colors[7][i]="hsl("+h_val.toString()+", 75%, 50%)"
            }
        }
        if(pal_num==7){
            for(let i=0;i<12;i++){
                let h_val=130+(i*5)
                this.selected_colors[8][i]="hsl("+h_val.toString()+", 75%, 50%)"
            }
        }
        if(pal_num==8){
            for(let i=0;i<12;i++){
                let h_val=250+(i*5)
                this.selected_colors[9][i]="hsl("+h_val.toString()+", 75%, 50%)"
            }
        }
        if(pal_num==9){
            for(let i=0;i<12;i++){
                if(i==0 || i==2||i==4||i==5 || i==7||i==9||i==11){
                    this.selected_colors[10][i]="hsl(0, 75%, 100%)"
                }else{
                    this.selected_colors[10][i]="hsl(0, 75%, 0%)"
                }

            }
        }

    }

    piano_coloring(set_num, colors){
        for(let i=0; i<36; i++){    
            let color_num=i%12
            let piano_set = document.getElementById("key"+(i+1).toString())
            piano_set.style.background=colors[color_num]
        }
    }

    drum_coloring(color){
    }

    GetSettedColor(){
        return this.setted_color
    }
    getNum(){
        return this.num
    }
}