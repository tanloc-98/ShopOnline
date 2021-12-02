function ajaxCheckOut(link,checkout){
    $.post(link,{'checkout': checkout},function(data){
        location.replace('/shop/check-out')
        localStorage.removeItem("cart");
        localStorage.removeItem("infoCustomer");
    })
}

function submitAjax(link,id,color,size){
    let itemOrder = {'id': id, 'color': color, 'size' : size}
    $.ajax({
        type: 'POST',
        url: link,
        data: {'id': id, 'color': color, 'size' : size},
        success: function (data) {
            setItemsToLocalsStorage(data,itemOrder)
            swal ("Your Item's Ordered","Enter To Continue!","success")
        }
    });
}
