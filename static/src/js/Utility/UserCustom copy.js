$('#ExecuteJson').click(function(){
    // var left = $('#input-left').val();
    // var right = $('#input-right').val();
    let username = 'default_user';
    let userID = 10000;
    let happy_palette = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    let happy_shape = 'Circle';
    let happy_texture = 'Wood';
    let happy_transmission = 0.7;
    let happy_roughness = 0.8;
    let happy_sensitivity = 0.8;
    let happy_intensity = 0.6;

    let sad_palette = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    let sad_shape = 'Star';
    let sad_texture = 'Wood';
    let sad_transmission = 0.7;
    let sad_roughness = 0.8;
    let sad_sensitivity = 0.8;
    let sad_intensity = 0.6;

    let exciting_palette = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    let exciting_shape = 'Circle';
    let exciting_texture = 'Wood';
    let exciting_transmission = 0.7;
    let exciting_roughness = 0.8;
    let exciting_sensitivity = 0.8;
    let exciting_intensity = 0.6;

    let peaceful_palette = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    let peaceful_shape = 'Square';
    let peaceful_texture = 'Wood';
    let peaceful_transmission = 0.7;
    let peaceful_roughness = 0.8;
    let peaceful_sensitivity = 0.8;
    let peaceful_intensity = 0.6;

    var postdata = {
        'username':username,
        'userID':userID,
        "happy":
                {
                    'palette':happy_palette,
                    'shape':happy_shape,
                    'texture':happy_texture,
                    'transmission':happy_transmission,
                    'roughness':happy_roughness,
                    'sensitivity':happy_sensitivity,
                    'intensity':happy_intensity
                },
        "sad":
                {
                    'palette':sad_palette,
                    'shape':sad_shape,
                    'texture':sad_texture,
                    'transmission':sad_transmission,
                    'roughness':sad_roughness,
                    'sensitivity':sad_sensitivity,
                    'intensity':sad_intensity
                },
        "exciting":
                {
                    'palette':exciting_palette,
                    'shape':exciting_shape,
                    'texture':exciting_texture,
                    'transmission':exciting_transmission,
                    'roughness':exciting_roughness,
                    'sensitivity':exciting_sensitivity,
                    'intensity':exciting_intensity
                },
        "peaceful":
                {
                    'palette':peaceful_palette,
                    'shape':peaceful_shape,
                    'texture':peaceful_texture,
                    'transmission':peaceful_transmission,
                    'roughness':peaceful_roughness,
                    'sensitivity':peaceful_sensitivity,
                    'intensity':peaceful_intensity
                }
    }
    $.ajax({
        type: 'POST',
        url: '/SaveUserCustom',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            alert('Customization 저장완료..')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})