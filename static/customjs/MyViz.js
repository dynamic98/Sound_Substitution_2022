import * as THREE from 'three'

export class Visualizer{
    constructor(){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        this.camera = new THREE.PerspectiveCamera(30, this.renderer.domElement.width/this.renderer.domElement.height, 2, 2000);
        this.container = document.getElementById( "canvas" );
        this.ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this.spotLight = new THREE.SpotLight(0xffffff);
        this.group = new THREE.Group();
        this.now_geometry = 30000;
        this.initialize();
        this.DictPitch = {0:"C",1:"C#",2:"D",3:"D#",4:"E",5:"F",6:"F#",7:"G",8:"G#",9:"A",10:"A#",11:"B"};
        this.PitchNote = [], this.EnergyNote = [];

    }
    initialize(){
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth / 2.24, window.innerHeight / 2.1);
        this.camera.position.set(1,10,70);
        this.container.appendChild(this.renderer.domElement);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.scene.add(this.ambientLight);
        this.spotLight.intensity = 0.9;
        this.spotLight.position.set(-10, 40, 20);
        this.spotLight.castShadow = true;
        this.scene.add(this.spotLight);
        this.scene.add(this.group);
        this.renderer.render(this.scene, this.camera);
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }

    Kandinsky(bpm){
        let PitchHeight = 40/59;
        let PitchWidth = 40/(60*4*13/bpm)
      
        for (let i=0; i<this.PitchNote.length; i++){
            let i_Pitch = this.PitchNote[i];      
            let octave = Math.floor((i_Pitch)/12)-1;
            let tone = (i_Pitch)%12;
            // Make reminder positive integer

            if (tone<0){
                tone = tone+12
            }
            let i_Energy = this.EnergyNote[i];
            // console.log(i_Energy);
            if (i_Energy<0.15){
                i_Energy = 0;
            }
            let i_PosX = i*PitchWidth-20;
            let i_PosY = PitchHeight*(i_Pitch-60)-10;
            let i_Radius = PitchHeight*(i_Energy*5);
      
            // let geometry = new THREE.CircleGeometry(i_Radius*10, 32);
            let geometry = new THREE.CircleGeometry(i_Radius, 32);
            let Color = new THREE.Color();
            Color.setHSL(tone/12, (octave-1)/5, 0.5)
            let material = new THREE.MeshLambertMaterial({color: Color});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(i_PosX,i_PosY,0);
            this.group.add(mesh);
        }
        // console.log(PitchNote, EnergyNote);
        // this.camera.position.set(1, 10, 70);

    }

    deleteBasics(){
        this.group.parent.remove(this.group);
        this.group = new THREE.Group();
        this.scene.add(this.group);
    }

}
