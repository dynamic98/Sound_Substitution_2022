function titleAudio(){
    target = document.getElementById('thefile');
    target.addEventListener('change', function(){
        var fileList = "";
        var audioFile = "";
        for(i = 0; i < target.files.length; i++){
            fileList += target.files[i].name;
            audioFile = target.files[i];
        }

        realTitle = document.getElementById('title');
        realTitle.innerText = fileList;
    });
}



const button = document.getElementById("thefile");

button.addEventListener('click', titleAudio);