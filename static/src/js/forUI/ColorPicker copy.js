
// const iro=require('@jaames/iro');
// import iro from '@jaames/iro'
var colorPicker = new iro.ColorPicker('#picker',{
    width:100
});
var colorPicker2 = new iro.ColorPicker('#picker2',{
    width:100
});

let picker = document.getElementById("picker_type");
let color=document.getElementById("color_picker")
let palettes = document.getElementById("palettes_candi");
let PaletteValue = document.getElementById("PaletteValue");

let setted_color=new Array(12)
let selected_colors=new Array(10)
let main_color=0
let palette_colorset=[[0, 120, 240], [30, 150, 270], [60, 180, 300], [90, 210, 330]]

const palette_candidate = document.getElementsByClassName('Palette')
const picker_candidate = document.getElementsByClassName('Picker')

picker_candidate[0].onclick=function(e){
    set_final(0)
}
picker_candidate[1].onclick=function(e){
    set_final(1)
}
palette_candidate[0].onclick=function(e){
    set_final(2)
}
palette_candidate[1].onclick=function(e){
    set_final(3)
}
palette_candidate[2].onclick=function(e){
    set_final(4)
}
palette_candidate[3].onclick=function(e){
    set_final(5)
}
palette_candidate[4].onclick=function(e){
    set_final(6)
}
palette_candidate[5].onclick=function(e){
    set_final(7)
}
palette_candidate[6].onclick=function(e){
    set_final(8)
}
palette_candidate[7].onclick=function(e){
    set_final(9)
}


function piano_coloring(set_num, colors){
    for(let i=0; i<36; i++){    
        let color_num=i%12
        let piano_set = document.getElementById("key"+(i+1).toString())
        piano_set.style.background=colors[color_num]
    }
}



function set_final(num){
    setted_color=selected_colors[num]
    console.log(num, setted_color)
    PaletteValue.value = num.toString()+"#"+setted_color.toString();
    console.log(PaletteValue.value, "value")

    piano_coloring(num, setted_color)

    // set_piano_color(setted_color)

    
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
        for(let j=0; j<8; j++){
            palette_class[j].style.backgroundColor="rgb(250, 250, 250)"
        }
    }else{
        for(let i=0; i<2; i++){
            picker_class[i].style.backgroundColor="rgb(250, 250, 250)"
        }
        for(let j=0; j<8; j++){
            
            if(j==(num-2)){
                palette_class[j].style.backgroundColor="rgb(248, 87, 87)"
            }else{
                palette_class[j].style.backgroundColor="rgb(250, 250, 250)"
            }
        }
    }
       

}

init()
function init(){
    for(let i=0; i<10; i++){
        selected_colors[i]=new Array(12)
    }
    set_color(main_color, "saturation")
    set_color(main_color, "lightness")
    set_beat(main_color)
    setted_color=selected_colors[0]
    // let picker_type="saturation"
    var hex = colorPicker.color.hexString;
    initial_setting()
}
function initial_setting(){
    for(let j=0; j<8; j++){
        set_pal(j+1)
        for(let i=0; i<12;i++){
            var color_box=document.getElementById("p"+(j+1).toString()+"_"+(i+1).toString())
            color_box.style.background=selected_colors[j+2][i]
        }
        // console.log(j+1, selected_colors[j+2])
    }
}

colorPicker.on('color:change', function(color){
    main_color=color.hsl['h']
    set_color(main_color, "saturation")
    set_color(main_color, "lightness")
    // set_beat(main_color)
})

colorPicker2.on('color:change', function(color){
    console.log(color)
    main_color=color.hsl['h']
    main_light=color.hsl['l']
    set_beat(main_color, main_light)
})

function set_beat(main_color, main_light){
    var target = document.getElementById("b_1")
    target.style.backgroundColor="hsl("+main_color+", 100%, "+main_light+"%)"
    
}

function set_color(main_color, picker_type){
    if (picker_type="saturation"){
        for(let i=0;i<12;i++){
            var target = document.getElementById("s_"+(i+1).toString())
            let sat_val=i*8+2
            selected_colors[0][i]="hsl("+main_color+", "+sat_val+"%, 50%)"
            target.style.backgroundColor=selected_colors[0][i]
        }

    }
    if(picker_type="lightness"){
        for(let i=0;i<12;i++){
            var target = document.getElementById("l_"+(i+1).toString())
            let light_val=i*8+2
            selected_colors[1][i]="hsl("+main_color+", 100%, "+light_val+"%)"
            target.style.backgroundColor=selected_colors[1][i]
        }
    }


    
}


function set_pal(pal_num){
    if(pal_num<=4){
        for(let i=0;i<4;i++){
            let set_val=90-15*(i)
            selected_colors[pal_num+1][i]="hsl("+palette_colorset[pal_num-1][0]+", "+set_val+"%, "+set_val+"%)"
            selected_colors[pal_num+1][i+4]="hsl("+palette_colorset[pal_num-1][1]+", "+set_val+"%, "+set_val+"%)"
            selected_colors[pal_num+1][i+8]="hsl("+palette_colorset[pal_num-1][2]+", "+set_val+"%, "+set_val+"%)"
        }
    }
    if(pal_num==5){
        for(let i=0;i<12;i++){
            let h_val=30*i
            selected_colors[6][i]="hsl("+h_val.toString()+", 75%, 50%)"
        }
    }
    if(pal_num==6){
        for(let i=0;i<12;i++){
            let h_val=10+(i*5)
            selected_colors[7][i]="hsl("+h_val.toString()+", 75%, 50%)"
        }
    }
    if(pal_num==7){
        for(let i=0;i<12;i++){
            let h_val=130+(i*5)
            selected_colors[8][i]="hsl("+h_val.toString()+", 75%, 50%)"
        }
    }
    if(pal_num==8){
        for(let i=0;i<12;i++){
            let h_val=250+(i*5)
            selected_colors[9][i]="hsl("+h_val.toString()+", 75%, 50%)"
        }
    }

}