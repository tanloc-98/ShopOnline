var ITEM_PER_PAGE = 3;


$(document).ready(function(){
    signUp()
    activeMenu()
    loadData()
    renderHeaderUrl()
    getItemsToRenderViews()
    submitSubscrible()
    searchItems()
    submitArticle()
    plusItems()
    minusItems()
    checkBox()
    deleteItemsCheck()
    hanldeChangeFeeShipping()
    renderFeeShipping()
    getInfoToLocals()
    rennderCartPrice()
    sumitCodePromotion()
    handleCheckOut()
    updatePrice()
    submitCodeCheckOrders()
    renderFavorite()
    submitRegister()
})

function signUp(){
    if(localStorage.getItem('user')){
        $('.login_box').css('display', 'none');
    }
    if(localStorage.getItem('user') !== null){
        let user = JSON.parse(localStorage.getItem('user'))
        let favorite = user.favorite;
        favorite = JSON.stringify(favorite).slice(1, -1);
        if(favorite.length > 0){
            $.post('http://localhost:6969/shop/favorite', {'favorite': favorite}, function(data){
                let items = data;
                let xml = '';
                let linkFolderArticle = "/uploads/article/";
                if(items.length > 0){
                    items.forEach( item =>
                        xml += `
                        <div class="col-xs-6 col-sm-4 col-md-6 col-lg-4 shop-item hover-sdw timer"
                        data-timer-date="2018, 2, 5, 0, 0, 0">
                            <div class="wrap">
                                <div class="body">
                                    <div class="comp-header st-4 text-uppercase">
                                        ${item.name}
                                        <span>
                                            ${item.category.name}
                                        </span>
                                        <div class="rate">
                                            <ul class="stars">
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                            </ul>

                                            <div class="rate-info">
                                                24 members rate it
                                            </div>
                                        </div>
                                    </div>
                                    <div class="image">
                                        <img class="hover" src="${linkFolderArticle + item.thumbs[0]}" alt="">
                                        <img class="main" src="${linkFolderArticle + item.thumbs[1]}" alt="">
                                    </div>
                                    <div class="caption">
                                        <div class="rate">
                                            <ul class="stars">
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li class="active">
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                                <li>
                                                    <i class="icofont icofont-star"></i>
                                                </li>
                                            </ul>
                                            <div class="rate-info">
                                                24 members
                                                <span>like it</span>
                                            </div>
                                        </div>
                                        <ul class="features">
                                            <li>
                                                <i class="icofont icofont-shield"></i>
                                                <span>24 days. Money Back Guarantee</span>
                                            </li>
                                            <li>
                                                <i class="icofont icofont-ship"></i>
                                                <span>Free shipping</span>
                                            </li>
                                            <li>
                                                <i class="icofont icofont-hand"></i>
                                                <span>Free help and setup</span>
                                            </li>
                                        </ul>
                                        <p class="text">
                                            ${item.title}
                                        </p>
                                        <div class="info_item">
                                            <div class="color-selecting">   
                                                Color :<ul class="selecter"> ${helperColorItem(item._id,item.color,'popular')}</ul>
                                                <span id="${item._id}-color-popular" class="error_color_item"></span>
                                            </div>
                                            <div class="info_size">
                                                Size : <ul class="size_item">${helperSizeItem(item._id,item.size,'popular')}</ul>
                                                <span id="${item._id}-size-popular" class="error_size_item"></span>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                                <div class="info">
                                    ${helperSpanSubmitItem(item._id,item.price,item.slug,'popular')}
                                </div>
                            </div>
                        </div>
                        `
                    )
                }else{
                    xml = `<p class="items_no_valid">Product Invalid!</p>`;
                }
                $('.item-favorite').html(xml);
                renderFavorite()
            })
        }
        renderLogin(user)
    }
    $('#login').click(function(){
        let link = 'shop/auth/login';
        let username = $('#account').val()
        let password = $('#password').val()
        if(username === '' && password === ''){
            $('.error_name_login').text('Put your Account!')
            $('.error_pass_login').text('Put your Password!')
        }else{
            $('.error_name_login').text('')
            $('.error_pass_login').text('')
            $.post(link,{'username':username, 'password':password}, function(data){
                let err = data.message
                let user = data
                if(err){
                    swal (err,"Enter To Continue!","error")
                }else{
                    localStorage.setItem('user', JSON.stringify({'username':user.username, 'avatar':user.avatar}))
                    swal ("Log In Success","Enter To Continue!","success")
                    renderLogin(user)
                    location.replace(window.location)
                }
            })
        }
    })
    $('#logout').click(function(){
        localStorage.removeItem('user')
        location.replace('/shop')
    })
}


function loadData() {
    $.ajax({
        url:'/shop/pagination',
        data : {
            type: 'list',
            offset: 0,
            limit:ITEM_PER_PAGE
        },
        type: 'GET',
        dataType: 'json'
    }).done(function (data) {
        let params = data.params;
        let linkIndex = '/shop/pagination'
        paginationHelper(params.pagination,linkIndex, params.currentStatus, params.keyword)
        renderItems(data.items)
    })
}

function paginationHelper(paginationObj, linkPrefix, currentStatus, keyword){
    let totalItems          = paginationObj.totalItems;
    let totalItemsPerPage   = paginationObj.totalItemsPerPage;
    let totalPages          = Math.ceil(totalItems/totalItemsPerPage);
    let currentPage         = paginationObj.currentPage;
    let pageRanges          = paginationObj.pageRanges;
    let xhtmlPagination     = '';
    let to                  = totalItemsPerPage * currentPage;
    let from                = to - totalItemsPerPage + 1;
    if(to > totalItems) to  = totalItems;

    if(totalPages > 1) {
        let xhtmlStart = '', xhtmlPrevious = '', xhtmlPages = '', xhtmlNext = '' , xhtmlEnd = '';
        let link       = linkPrefix + '/status/' + currentStatus ;
        if(keyword !== '') link += '?keyword=' + keyword + '&page=';
        else link += '?page=';

        if(currentPage > 1){
            xhtmlStart = `<li><a onclick="pagination('${link}1')"><i class="fas fa-angle-double-left"></i></a></li>`;
            xhtmlPrevious = `<li><a onclick="pagination('${link}${currentPage-1}')"><i class="fas fa-angle-left"></i></a></li>`;
        }

        if(currentPage < totalPages){
            xhtmlEnd = `<li><a onclick="pagination('${link}${totalPages}')"><i class="fas fa-angle-right"></i></a></li>`;
            xhtmlNext = `<li><a onclick="pagination('${link}${currentPage+1}')"><i class="fas fa-angle-double-right"></i></a></li>`;
        }

        let middle = Math.ceil(pageRanges/2);
        let min = currentPage - middle + 1;

        let max = min + pageRanges - 1;
        if(min <= 1){
            min = 1;
            max = pageRanges;
        }

        if(max >= totalPages){  // 3
            max = totalPages;
            min = ((max - pageRanges + 1) >= 1) ? (max - pageRanges + 1) : 1; 
        }

        for(let i = min; i <= max; i++){
            if(i == currentPage) {
                xhtmlPages += `<li class="active"><a>${i}</a></li>`;
            } else {
                xhtmlPages += `<li><a onclick="pagination('${link}${i}')">${i}</a></li>`;
            }
        }
        
        xhtmlPagination = '<ul class="pagination">' + xhtmlStart + xhtmlPrevious + xhtmlPages + xhtmlNext + xhtmlEnd + '</ul>';
    }

    $('.pagination_ajax').html(xhtmlPagination)
}

function pagination(link){
    $.get(link,function(data){
        let params = data.params;
        let linkIndex = '/shop/pagination'
        paginationHelper(params.pagination,linkIndex, params.currentStatus, params.keyword)
        renderItems(data.items)
    })
}

function activeMenu() {
    var url = window.location.pathname, 
    urlRegExp = new RegExp(url.replace(/\/$/,'') + "$");
    // now grab every link from the navigation
    $('.menu a').each(function(){
        $(this).parent().removeClass('active');
        if(urlRegExp.test(this.href.replace(/\/$/,''))){
            $(this).parent().addClass('active');
        }
    });
}


function getInfoToLocals(){
    $('#getAddress').click(function(){
        let infoCustomer = {}
        infoCustomer.fullName = $('input[name=fullName]').val()
        infoCustomer.phone = $('input[name=phone]').val()
        infoCustomer.email = $('input[name=email]').val()
        infoCustomer.street = $('input[name=street]').val()
        infoCustomer.state = $('input[name=state]').val()
        infoCustomer.city = $('input[name=city]').val()
        infoCustomer.country = $('input[name=country]').val()
        infoCustomer.feeShip = parseInt($('.fee b').text())
        if(infoCustomer.fullName === '' && infoCustomer.phone === '' && infoCustomer.phone === '' && infoCustomer.phone === '' && infoCustomer.phone === '' && infoCustomer.phone === ''){
            $('.fullname_err').text('Enter your Name!')
            $('.email_err').text('Enter your Email!')
            $('.phone_err').text('Enter your Phone!')
            $('.street_err').text('Enter your Street!')
            $('.city_err').text('Enter your City!')
            $('.country_err').text('Enter your Country!')
            $('.state_err').text('Enter your State!')
            if(infoCustomer.feeShip === 0){
                $('.fee_err').text('Please! Chooese delivery method')
            }
        }else{
            localStorage.setItem('infoCustomer', JSON.stringify(infoCustomer));
            $('.fullname_err').text('')
            $('.email_err').text('')
            $('.phone_err').text('')
            $('.street_err').text('')
            $('.city_err').text('')
            $('.country_err').text('')
            $('.state_err').text('')
            $('.fee_err').text('')
            location.replace('shop/payment-method')
        }
    })
}

function setItemsToLocalsStorage(data,itemOrder){
    let localsStorageItems = JSON.parse(localStorage.getItem('cart'))
    let cartItems = []
    if(localsStorageItems === null){
        cartItems = [
            ...cartItems,
            data
        ]
        data.info.quantity += 1
    }else{
        cartItems = localsStorageItems;
        var newItem = true;
        for( let i = 0; i < cartItems.length;i++){
            if(cartItems[i].id === itemOrder.id){
                if(cartItems.length < 2){
                    if(cartItems[i].color === itemOrder.color && cartItems[i].size !== itemOrder.size){
                        newItem = true;
                        break;
                    }
                    if(cartItems[i].color !== itemOrder.color && cartItems[i].size === itemOrder.size){
                        newItem = true;
                        break;
                    }
                    if(cartItems[i].color !== itemOrder.color && cartItems[i].size !== itemOrder.size){
                        newItem = true;
                        break;
                    }
                }
                if(cartItems[i].color === itemOrder.color && cartItems[i].size === itemOrder.size){
                    cartItems[i].info.quantity++
                    console.log(cartItems[i].info.quantity)
                    newItem = false;
                    break;
                }
            }else{
                newItem = true;
                break;
            }
        }
        if(newItem) {
            data.info.quantity += 1
            cartItems = [
                ...cartItems,
                data
            ]
        }
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    getItemsToRenderViews()
}

function getItemsToRenderViews(){
    if (localStorage.getItem('cart') !== null){
        let items = JSON.parse(localStorage.getItem('cart'));
        renderListCartHeader(items)
        renderListCart(items)
    }
}

function deleteItem(id,color,size){
    let items = JSON.parse(localStorage.getItem('cart'));
    let cartItems = [];
    if(items.length > 0){
        for(let i = 0; i < items.length; i++){
            if(items[i].id === id && items[i].size === size && items[i].color === color){
                items.splice(i, 1)
            }
        }
    }
    cartItems = items
    localStorage.setItem('cart', JSON.stringify(cartItems));

    getItemsToRenderViews()
}

function updateLocalStorage(id,quantity,size,color){
    let cartItems = [];
    let items = JSON.parse(localStorage.getItem('cart'));
    for(let i = 0; i < items.length; i++){
      if(items[i].id === id && items[i].size === size && items[i].color === color){
        items[i].info.quantity = quantity
          if(items[i].info.quantity === "0"){
            items.splice(i, 1)
          }
      }
    }

    renderListCartHeader(items)

    cartItems = items

    localStorage.setItem('cart', JSON.stringify(cartItems));

}

function getCategoryItems(slug){
    let link = `/shop/${slug}`;
    $.post(link,function(data){
        $('.item-wrapper').html(renderItems(data.items))
    })
}

function selectSize(id,size,display){
    let nameInputSelect = `${display}-color-${id}`;
    let idColorSelect = `${id}-${display}`;
    $('input[id=color-item]').each(function(){
        let nameInputColor = $(this).attr('name')
        if(nameInputColor !== nameInputSelect){
            $(this).attr('value', '');
            $('input[id=size-item]').attr('value', '');
        }
    })
    $('.selecter li').each(function(){
        let idColor = $(this).attr('id')
        if(idColor !== idColorSelect){
            $(this).removeClass('active')
        }
    })
    $('input[name='+ display +'-size-' + id +']').attr('value', size);
    $('.info_size li').removeClass('active');
    $('#'+ id +'-' + display + '-' + size).addClass('active')
}

function selectColor(id,color,display){
    let nameInputSelect = `${display}-size-${id}`;
    let idColorSelect = `${id}-${display}`
    $('input[id=size-item]').each(function(){
        let nameInputColor = $(this).attr('name')
        if(nameInputColor !== nameInputSelect){
            $(this).attr('value', '');
            $('input[id=color-item]').attr('value', '');
        }
    })
    $('.size_item li').each(function(){
        let idColor = $(this).attr('id')
        if(idColor !== idColorSelect){
            $(this).removeClass('active')
        }
    })
    $('input[name='+ display +'-color-' + id +']').attr('value', color);
    $('.selecter li').removeClass('active');
    $('#' + idColorSelect + '.'+ color ).addClass('active')
}

function plusItems(){
    $('.plus').click(function() {
        let total = 0;
        let totalPriceItems = 0;
        let totalsQuantityItems = 0;
        let divPrice = $(this).parent().parent().children('.price')
        let price = parseInt(divPrice.children('span').text())
        let input = $(this).parent().children().children('input')
        input.val(+input.val() + 1);
        total = price * input.val()
        divTotal = $(this).parent().parent().children('.total').children('span');
        divTotal.html(total)
        $('.total span').each(function(){
            totalPriceItems += Number($(this).text());
        })
        $('.totalsPriceItems').html(totalPriceItems)  
        $('.input input').each(function(){
            totalsQuantityItems += Number($(this).val());
        })
        $('.totalsQuantityItems').html(totalsQuantityItems)

        let id = input.attr('id');
        let quantity = parseInt(input.val());
        let size = $(this).parent().parent().children('.size').text().trim()
        let color = $(this).parent().parent().children('.color').text().trim();
        updateLocalStorage(id,quantity,size,color)
    });
}

function minusItems(){
    $('.minus').click(function(){
        let total = 0;
        let totalPriceItems = 0;
        let totalsQuantityItems = 0;
        let divPrice = $(this).parent().parent().children('.price')
        let price = parseInt(divPrice.children('span').text())
        let input = $(this).parent().children().children('input')
        if(+input.val() - 1 >= 0) {
            input.val(+input.val() - 1);
            total = price * input.val()
            divTotal = $(this).parent().parent().children('.total').children('span');
            divTotal.html(total)
        }
        $('.total span').each(function(){
            totalPriceItems += Number($(this).text());
        })
        $('.totalsPriceItems').html(totalPriceItems)
        $('.input input').each(function(){
            totalsQuantityItems += Number($(this).val());
        })
        $('.totalsQuantityItems').html(totalsQuantityItems);
        let id = input.attr('id');
        let quantity = parseInt(input.val());
        let size = $(this).parent().parent().children('.size').text().trim()
        let color = $(this).parent().parent().children('.color').text().trim();
        updateLocalStorage(id,quantity,size,color)
    })
}

function checkBox(){
    $('label').click(function(){
        let $checkBox = $(this).parent().children('input')
        let id = $(this).parent().children('input').attr('id')
            if(id === 'checkAll'){
                $('.list-body .check').each(function(){
                    let $checkAll = $(this).children().children('input');
                    if(!$checkAll.attr("checked")) {
                        $checkBox.attr( "checked", true  )
                        $checkAll.attr( "checked", true  )
                    } else {
                        $checkBox.attr( "checked",false )
                        $checkAll.attr( "checked",false )
                    }
                })
            }
            if(!$checkBox.attr("checked")) {
                $checkBox.attr( "checked", true  )
            } else {
                $checkBox.attr( "checked",false )
            }
         
    })
}

function deleteItemsCheck(){
    $('#detele_items_check').click(function(){
        $('.checkbox input').each(function(){
            if($(this).attr("checked")){
                let id = $(this).parent().parent().parent().children('.qnt').children('.input').children('input').attr('id')
                let color = $(this).parent().parent().parent().children('.color').text().trim()
                let size = $(this).parent().parent().parent().children('.size').text().trim()
                let items = JSON.parse(localStorage.getItem('cart'));
                let cartItems = [];
                    if(items.length > 0){
                        for(let i = 0; i < items.length; i++){
                            if(items[i].id === id && items[i].size === size && items[i].color === color){
                                items.splice(i, 1)
                            }
                        }
                    }

                    renderListCartHeader(items)
                    renderListCart(items)

                    cartItems = items

                    localStorage.setItem('cart', JSON.stringify(cartItems));
                
            }
        })
    })
}

function hanldeChangeFeeShipping(){
    $('select#deliveryComp').change(function(){
        $('.fee b').html($(this).find('option:selected').val())
        $('.fee_ship').html('$' +$(this).find('option:selected').val())   
        updatePrice()  
    });
}

function updatePrice(){
    let  feeShip =  $('.fee_ship').text().split('$')[1]
    let  total   = $('.total_price').text().split('$')[1]
    feeShip =  parseInt(feeShip)
    total   =  parseInt(total)
    if(localStorage.getItem('infoCustomer') !== null){
        let item = JSON.parse(localStorage.getItem('infoCustomer'))
        feeShip = item.feeShip
        $('.fee_ship').html('$' +feeShip)  
    }
    if(feeShip !== 0){
        let lastPrice = 0;
            lastPrice =  total + feeShip;
            $('.total_price').html('$'+ lastPrice)      
    }
}

