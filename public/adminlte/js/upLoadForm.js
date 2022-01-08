$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
    var fileIdCounter = 0;
    this.closest(".files").change(function (evt) {
        var output = [];

    for (var i = 0; i < evt.target.files.length; i++) {
        fileIdCounter++;
        var file = evt.target.files[i];
        var tmppath = URL.createObjectURL(evt.target.files[i]);
        var fileId = sectionIdentifier + fileIdCounter;

        var xml = `<li><img src="${tmppath}" class="showImagesForm">
            <a class="removeFile" data-fileid="${fileId}"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a></li>`;      

        filesToUpload.push({
            id: fileId,
            file: file
        });
        
        output.push(xml);
    };
    
    
    $(this).children(".fileList")
        .append(output.join(""));
        

        //reset the input to null - nice little chrome bug!
        evt.target.value = null;
    });

    $(this).on("click", ".removeFile", function (e) {
        e.preventDefault();

        var fileId = $(this).parent().children("a").data("fileid");
        var nameImg = $(this).parent().children('img').attr('src').split("/")[2]
        var pathName = window.location.pathname.split("/")[5]
        
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id === fileId)
            filesToUpload.splice(i, 1);
        }
        $(this).parent().remove();
        var valueImg = $('#valueImg').val().split(",");
        
        for (var i = 0; i < valueImg.length; ++i) {
            if (valueImg[i] === nameImg)
            valueImg.splice(i, 1);
        }

        var arrImgNew = valueImg.toString();
        $.ajax({
            url: "adminCCC/shop/article/delete-img",
            data: {'thumb' : nameImg, 'id' : pathName, 'thumbs' : arrImgNew},
            dataType: "JSON",
            type: "POST",
            success: function (data) {
                let thumbsNew = data.item.thumbs.toString();
                let notify = data.notify;
                $('#valueImg').val(thumbsNew);

                $("#thumbs").notify(
                    notify, 
                    { position:"left", className: "success"},
                    
                );
            },
            error: function (data) {
                alert("ERROR - " + data.responseText);
            }
            });
    });

    return this;
};

(function () {
    var filesToUpload = [];
    
    var filesUploader = $("#thumbs").fileUploader(filesToUpload, "files");

    $("#uploadBtn").click(function (e) {
        e.preventDefault();
        let myForm = document.getElementById('fileupload')
        let url = $('#linkPost').val()
        var contentVal = CKEDITOR.instances['content'].getData();
        var formData = new FormData(myForm);

        formData.set('content', contentVal)
        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            formData.append("thumbs", filesToUpload[i].file);
        }

        $.ajax({
            url: `${url}/save`,
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                let notify = data.notify;
                let errors = data.errors;
                
                if(errors){
                    let xml = [];
                    for(i = 0; i < errors.length; i++){
                        let param = errors[i].param;
                        let msg = errors[i].msg;
                        xml += `<li class="text-white"><b>${param.charAt(0).toUpperCase() + param.slice(1)}</b>: ${msg}</li>`
                    } 
                    $('.errors-notify').empty();
                    $(".errors-notify").append(
                        `
                        <div class="alert alert-danger alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h5><i class="icon fas fa-exclamation-triangle"></i> Lỗi!</h5>
                            <ul class="list-unstyled mb-0">
                                ${xml}
                            </ul>
                         </div>
                        `
                    )
                    
                }else{
                    Swal.fire({
                        title: notify,
                        text: 'Ấn vào đây để tiếp tục',
                        icon: 'success',
                        confirmButtonText: 'Tiếp tục'
                    })        
                    $('.swal2-confirm').on('click',function(e){
                        location.reload()
                    })
                }
               
            },
            error: function (data) {
                alert("ERROR - " + data.responseText);
            }
        });
    });
})()
