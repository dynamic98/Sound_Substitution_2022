
// const iro=require('@jaames/iro');
// import iro from '@jaames/iro'
var colorPicker = new iro.ColorPicker('#picker',{
    width:200,
});

let picker = document.getElementById("picker_type");
let color=document.getElementById("color_picker")
let palettes = document.getElementById("palettes_candi");


let selected_colors=new Array(12)
let main_color=0
let palette_colorset=[[0, 120, 240], [30, 150, 270], [60, 180, 300], [90, 210, 330]]

init()
function init(){
    set_color(main_color, "saturation")
    set_color(main_color, "lightness")
    // let picker_type="saturation"
    var hex = colorPicker.color.hexString;
    initial_setting()
}
function initial_setting(){
    for(let j=0; j<8; j++){
        set_pal(j+1)
        for(let i=0; i<12;i++){
            var color_box=document.getElementById("p"+(j+1).toString()+"_"+(i+1).toString())
            color_box.style.background=selected_colors[i]
     
        }
    }
}

colorPicker.on('color:change', function(color){
    main_color=color.hsl['h']
    set_color(main_color, "saturation")
    set_color(main_color, "lightness")
})

color.onclick=function(e){
    main_color=e.path[0].id
}
picker.onclick=function(e){
    let picker_type=e.path[0].id
    set_color(main_color, picker_type)
}

function set_color(main_color, picker_type){
    if (picker_type="saturation"){
        for(let i=0;i<12;i++){
            var target = document.getElementById("s_"+(i+1).toString())
            let sat_val=i*8+2
            selected_colors[i]="hsl("+main_color+", "+sat_val+"%, 50%)"
            target.style.backgroundColor=selected_colors[i]
        }

    }
    if(picker_type="lightness"){
        for(let i=0;i<12;i++){
            var target = document.getElementById("l_"+(i+1).toString())
            let light_val=i*8+2
            selected_colors[i]="hsl("+main_color+", 100%, "+light_val+"%)"
            target.style.backgroundColor=selected_colors[i]
        }
    }
}


palettes.onclick=function(e){
    let selected_pal=e.path[0].id
    set_pal(selected_pal)
}

function set_pal(pal_num){
    if(pal_num<=4){
        for(let i=0;i<4;i++){
            let set_val=90-15*(i)
            selected_colors[i]="hsl("+palette_colorset[pal_num-1][0]+", "+set_val+"%, "+set_val+"%)"
            selected_colors[i+4]="hsl("+palette_colorset[pal_num-1][1]+", "+set_val+"%, "+set_val+"%)"
            selected_colors[i+8]="hsl("+palette_colorset[pal_num-1][2]+", "+set_val+"%, "+set_val+"%)"
        }
    }
    if(pal_num==5){
        for(let i=0;i<12;i++){
            let h_val=30*i
            selected_colors[i]="hsl("+h_val.toString()+", 75%, 50%"
        }
    }
    if(pal_num==6){
        for(let i=0;i<12;i++){
            let h_val=10+(i*5)
            selected_colors[i]="hsl("+h_val.toString()+", 75%, 50%"
        }
    }
    if(pal_num==7){
        for(let i=0;i<12;i++){
            let h_val=130+(i*5)
            selected_colors[i]="hsl("+h_val.toString()+", 75%, 50%"
        }
    }
    if(pal_num==8){
        for(let i=0;i<12;i++){
            let h_val=250+(i*5)
            selected_colors[i]="hsl("+h_val.toString()+", 75%, 50%"
        }
    }

}