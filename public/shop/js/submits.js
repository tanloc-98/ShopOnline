function searchItems(){
    let link = `shop/search/`;
    $('#search_items').click(function(){
        let keyword = $('input[name=search]').val()
        $.ajax({
            type: 'get',
            url: link,
            data: {'keyword':keyword},
            success: function (data) {
                let items = data;
                renderItems(items)
            }
        })
    });
    $('.selecter_size li').each(function(){
        $(this).click(function(){
            $('.selecter li').removeClass('active')
            $(this).addClass('active')
            let size = $(this).text().toLowerCase();
            $.ajax({
                type: 'get',
                url: link,
                data: {'size':size},
                success: function (data) {
                    let items = data;
                    renderItems(items)
                }
            })
        });
    })
    $('.selecter_color li').each(function(){
        $(this).click(function(){
            $('.selecter li').removeClass('active')
            let color = $(this).attr('class').toLowerCase();
            $(this).addClass('active')
            console.log(color)
            $.ajax({
                type: 'get',
                url: link,
                data: {'color':color},
                success: function (data) {
                    let items = data;
                    renderItems(items)
                }
            })
        });
    })

    $('.btn-search').click(function(){
        let firstPrice = $('input[name="firstPrice"]').val().split('$')[1]
        let lastPrice = $('input[name="lastPrice"]').val().split('$')[1]
        $.ajax({
            type: 'get',
            url: link,
            data: {'firstPrice':firstPrice, 'lastPrice': lastPrice},
            success: function (data) {
                let items = data;
                renderItems(items)
            }
        })
    })
}

function submitItem(id,display){
        let link    = '/shop/cart-products/add-to-cart';
        let color   =  $('input[name='+ display + '-color-'+ id +']').val();
        let size    =  $('input[name='+ display + '-size-'+ id +']').val();
        $('.error_color_item').text('')
        $('.error_size_item').text('')
            if(id){
                if(color === '' && size !== ''){
                    $('.info_item #' + id +'-color-' + display).text("Chooese Color !");
                }else if(color !== '' && size === ''){
                    $('.info_item #' + id +'-size-' + display).text("Chooese size !");
                }else if(color === '' && size === ''){
                    $('.info_item #' + id +'-color-' + display).text("Chooese Color !");
                    $('.info_item #' + id +'-size-' + display).text("Chooese size !");
                }else{
                    submitAjax(link,id,color,size)
                }
            }
}

function submitArticle(){
    $('.size-panel li').each(function(){
        $(this).click(function(){
            $('.size-panel li').removeClass('active');
            let size = $(this).text().toLowerCase()
            $('input[name="size"]').attr('value', size);
            $(this).addClass('active');
        })
    })
    $('.selecter_article li').each(function(){
        $(this).click(function(){
            $('.selecter_article li').removeClass('active');
            let color = $(this).attr('class')
            $('input[name="color"]').attr('value', color);
            $(this).addClass('active');
        })
    })
    $('#submitItem').click(function(){
        let link    = '/shop/cart-products/add-to-cart';
        let id      = window.location.href.split('/')[5];
        let color   = $('input[name=color]').val();
        let size    = $('input[name=size]').val();
        $('.error_color').text('')
        $('.error_size').text('')
        if(color === '' && size === ''){
                $('.error_color').text("Chooese Color !");
                $('.error_size').text("Chooese size !");
        }else if(color !== '' && size === ''){
            $('.error_size').text("Chooese size !");
        }else if(color === '' && size !== ''){
            $('.error_color').text("Chooese Color !");
        }else{
            submitAjax(link,id,color,size);
        }
    })
}

function submitSubscrible(){
    $('#subscribe').submit(function(e){
        e.preventDefault()   
        let name = $('#subscribe input[name=name]').val();
        let email = $('#subscribe input[name=email]').val();
        var url = 'adminCCC/shop/subscribe/save';
        let errorName = `<span class="arrow_down_name"></span>
        <span class="error_name_subscrible">Resigter your Name, PLease!</span>`
        let errorEmail = `<span class="arrow_down_email"></span>
        <span class="error_email_subscrible">Resigter your Email, PLease!</span>`

        if(name === '' && email === ''){
            $('#subscribe .name').append(errorName)
            $('#subscribe .email').append(errorEmail) 
        }else if(name === '' && email !== ''){
            $('#subscribe .name').append(errorName)
        }else if(name !== '' && email === ''){
            $('#subscribe .email').append(errorEmail) 
        }else{
            $.ajax({
                type: "POST",
                url: url,
                data: {'name': name, 'email': email}, 
                success: function(data){
                    swal ("Thank to Subscribe","Enter To Continue!","success")
                    $('#subscribe input[name=name]').val('')
                    $('#subscribe input[name=email]').val('')
                }
            });
        }
    })
}

function sumitCodePromotion() {
    $('#submitCodePromotion').click(function() {
        let link = '/shop/payment-method/check-code-promotion'
        let promotion = $('input[name=codePromotion]').val();
        if(promotion === ''){
            $('.promotion-err').text('Enter Promotion Code')
        }else{
            $('.promotion-err').text('')
            $.post(link, {'promotion':promotion }, function(data) {
                if(data.error){
                    $('.promotion-err').text(data.error)
                }else{
                    let pricePromotion = data.price;
                    let totalPrice = 0;
                    let totalItems = 0;
                    let items = JSON.parse(localStorage.getItem('cart'))
                    items.forEach( item =>{
                        totalItems += item.info.quantity;
                        totalPrice += item.info.price * item.info.quantity;
                    })
                    totalPrice = totalPrice - pricePromotion
                    $('.discount_price').text(`$ ${pricePromotion}`)
                    $('.total_price').text(`$ ${totalPrice}`)
                    updatePrice()
                    swal ("Your Code Accept","Enter To Continue!","success")
                }
            })
        }
    })
}

function submitCodeCheckOrders(){
    $('#shopGetOrderStatusID').click(function(){
        let link = 'shop/tracking/check-orders'
        let code = $('#inputOrderTrackingID').val()
        if(code === ''){
            $('.tracking_err').text('Put your Code, Please!')
        }else{
            $('.tracking_err').text('')
            $.post(link,{'code': code},function(data){
                if(data.error){
                    $('.tracking_err').text(data.error)
                }else{
                    renderCheckOrder(data.items)
                }
            })
        }
    })
}

function  submitRegister() {
    $('#register').submit(function(e){
        e.preventDefault()  
        let name = $('#name_register').val()
        let account = $('#account_register').val()
        let password = $('#password').val()
        let link = "/shop/register";
        $.post(link, {'name': name, 'username': account, 'password': password},function(data){
            swal ("Register success","Enter To Continue!","success")
        })
    })
}