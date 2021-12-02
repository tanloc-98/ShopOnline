function handleCheckOut(){
    let link = '/shop/check-out/';
    let checkout = {}
    checkout.cart = localStorage.getItem('cart')
    checkout.infoCutomer = localStorage.getItem('infoCustomer')
    hanldeCheckOutBank(link,checkout)
    hanldeCheckOutPayPal(link,checkout)
    hanldeCheckOutCreditCart(link,checkout)
}

function hanldeCheckOutBank(link,checkout){
    $('#checkOutBank').click(function(){
        let bankAccount = $('#bankTransfer').val()
        checkout.lastPrice =  $('.total_price').text().split('$')[1];
        checkout.codePromo =  $('input[name=codePromotion]').val();
        checkout.account = bankAccount;
        checkout.method = "bank"
        if(bankAccount === ''){
            $('.bank-err').text('Enter Your Account Bank!')
        }else{
            ajaxCheckOut(link,checkout)
        }
    })
}

function hanldeCheckOutPayPal(link,checkout){
    $('#checkOutPaypal').click(function(){
        let paypal = $('#paypal').val()
        checkout.lastPrice =  $('.total_price').text().split('$')[1];
        checkout.codePromo =  $('input[name=codePromotion]').val();
        checkout.account = paypal;
        checkout.method = 'paypal'
        if(paypal === ''){
            $('.paypal-err').text('Enter Your Account  Paypal!')
        }else{
            ajaxCheckOut(link,checkout)
        }
    })
}
function hanldeCheckOutCreditCart(link,checkout) {
    checkout.method = 'card';
    let card  = {}
    $('label').click(function(){
        card.name = $(this).parent().children('input').attr('id')
        $('#checkOutCard').click(function(){
            card.firstName = $('#cardHolder').val()
            card.lastName = $('#cardHolderLast').val()
            card.cardNum = $('#cardNum').val()
            card.date = $('#expiryDate').val()
            card.cvc = $('#cvc').val()
            checkout.lastPrice =  $('.total_price').text().split('$')[1];
            checkout.codePromo =  $('input[name=codePromotion]').val();
            checkout.card = JSON.stringify(card)
            if(card.firstName === '' &&  card.lastName === '' &&  card.cardNum === '' &&  card.date === '' &&  card.cvc === ''){
                $('.card_first_error').text('Enter Your First Name!')
                $('.card_last_error').text('Enter Your Last Name!')
                $('.card_num_error').text('Enter Card Number!')
                $('.card_date_error').text('Enter Card Date!')
                $('.card_cvc_error').text('Enter CVC!')
            }else{
                ajaxCheckOut(link,checkout)
            }
        })
    })
}


function hanldeAddFavorite(){
    $('.favorite').click(function(){
        if(localStorage.getItem('user') === null){
            $('#login_box').trigger('click')
        }else{
            let id = $(this).attr('id')
            let user = JSON.parse(localStorage.getItem('user'))
            if(user.favorite === undefined){
                user.favorite = []
                user.favorite = [
                    ...user.favorite,
                    id
                ]
            }else{
                let idArray = user.favorite
                if(idArray.includes(id) === false){
                    user.favorite = [
                        ...user.favorite,
                        id
                    ]
                }   
                for(i = 0;i < idArray.length; i++){
                    if(idArray[i] === id){
                        idArray.splice(i,1)
                        break
                    }
                }
            }
            localStorage.setItem('user',JSON.stringify(user))
            renderFavorite()
        }
    })
}