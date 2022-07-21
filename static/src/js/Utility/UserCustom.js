$('#ExecuteJson').click(function(){
    // var left = $('#input-left').val();
    // var right = $('#input-right').val();
    let username = 'default_user';
    let userID = 10000;
    let happy_palette = [];
    let happy_shape = 'Sphere';
    let happy_texture = 'Wood';
    let happy_shader = 'Diffuse';
    let happy_sensitivity = 0.8;
    let happy_intensity = 0.6;

    let sad_palette = [];
    let sad_shape = 'Sphere';
    let sad_texture = 'Wood';
    let sad_shader = 'Diffuse';
    let sad_sensitivity = 0.8;
    let sad_intensity = 0.6;

    let exciting_palette;
    let exciting_shape = 'Sphere';
    let exciting_texture = 'Wood';
    let exciting_shader = 'Diffuse';
    let exciting_sensitivity = 0.8;
    let exciting_intensity = 0.6;

    let peaceful_palette;
    let peaceful_shape = 'Box';
    let peaceful_texture = 'Wood';
    let peaceful_shader = 'Diffuse';
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
                    'shader':happy_shader,
                    'sensitivity':happy_sensitivity,
                    'intensity':happy_intensity
                },
        "sad":
                {
                    'palette':sad_palette,
                    'shape':sad_shape,
                    'texture':sad_texture,
                    'shader':sad_shader,
                    'sensitivity':sad_sensitivity,
                    'intensity':sad_intensity
                },
        "exciting":
                {
                    'palette':exciting_palette,
                    'shape':exciting_shape,
                    'texture':exciting_texture,
                    'shader':exciting_shader,
                    'sensitivity':exciting_sensitivity,
                    'intensity':exciting_intensity
                },
        "peaceful":
                {
                    'palette':peaceful_palette,
                    'shape':peaceful_shape,
                    'texture':peaceful_texture,
                    'shader':peaceful_shader,
                    'sensitivity':peaceful_sensitivity,
                    'intensity':peaceful_intensity
                }
    }
    $.ajax({
        type: 'POST',
        url: '/SendHapticCustom',
        data: JSON.stringify(postdata),
        dataType : 'JSON',
        contentType: "application/json",
        success: function(data){
            alert('Haptic Customization 저장완료..')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
})