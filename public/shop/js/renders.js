
function renderFeeShipping(){
    let link = '/shop/cart-address/fee-shipping'
    $.get(link,function(data){
        let items = data.items
        let xmlOption = '<option value="0">Select delivery</option>';
        items.forEach( item =>{
            xmlOption += `
                <option value="${item.price}">${item.method}</option>
            `
        })
        
        $("#deliveryComp").html(xmlOption)
    })
}

function renderListCartHeader(items) {
    let xml = '';
    let linkUploadImg = "/uploads/article/";
    let total = 0;
    let totalItems = 0;
    $('.badge').text('');

    items.forEach(item =>{
        total +=  item.info.price * item.info.quantity;
        totalItems += item.info.quantity
        xml += `
            <li>
                <div class="wrap">
                    <div class="image">
                        <img src="${linkUploadImg + item.info.thumb}" alt="">
                    </div>
                    <div class="caption">
                        <span class="comp-header st-1 text-uppercase">
                            ${item.info.name}
                        </span>
                        <span class="style_list_cart">
                            <span>Size: ${item.size}</span><span>Color: ${item.color}</span>
                        </span>
                        <span class="quanitity_list_cart">
                            Quantity: ${item.info.quantity}
                        </span>
                        <span class="price">
                            <span class="text-grey-dark">$</span>
                            ${item.info.price}
                        </span>
                    </div>
                    <span class="remove-btn bg-blue" onclick="deleteItem('${item.id}','${item.color}','${item.size}')">
                        <i class="icofont icofont-bucket"></i>
                    </span>
                </div>
            </li>                                                           
              
        `
    })
    xml += `
            <li class="total_price_items">
                Total: $ <span>${total}</span>
            </li> 
            <li class="more-btn sdw">
                <a href="/shop/cart-products" class="btn-material btn-primary">
                    View order <i class="icofont icofont-check-circled"></i>
                </a>
            </li> 
        `
    $('.badge').text(totalItems)
    $('.show_list_item').html(xml)
}

function renderListCart(items){
    let xml = '';
    let linkUploadImg = "/uploads/article/";
    let total = 0;
    let totalItems = 0;
    let index = 0
    items.forEach( item =>{
        index++
        totalItems += item.info.quantity;
        total += item.info.price
        xml += `<div class="item">
                <div class="check hidden-xs">
                    <div class="checkbox vers-2">
                        <input type="checkbox" id="item-check-${index}">
                        <label for="item-check">
                            <i class="icofont icofont-check-alt"></i>
                        </label>
                    </div>
                </div>
                <div class="product">
                    <img src="${linkUploadImg + item.info.thumb}" alt="">
                    <span class="comp-header st-8 text-uppercase">
                        ${item.info.name}
                    </span>
                </div>
                <div class="color">
                    <span class="colr">
                        ${item.color}
                    </span>
                </div>
                <div class="size">
                    <span class="siz">
                        ${item.size}
                    </span>
                </div>
                <div class="price">
                    <span class="price">
                        <i class="icofont icofont-cur-dollar"></i>
                        <span class="prc">
                            ${item.info.price}
                        </span>
                    </span>
                </div>
                <div class="qnt">
                        <span class="minus">
                            <i class="icofont icofont-minus"></i>
                        </span>
                        <span class="input">
                            <input id="${item.id}" type="text" value="${item.info.quantity}">
                        </span>
                        <span class="plus">
                            <i class="icofont icofont-plus"></i>
                        </span>
                </div>
                <div class="total">
                    <i class="icofont icofont-cur-dollar"></i>
                    <span>${item.info.quantity * item.info.price}</span>
                </div>
                <div class="rmv text-center">
                    <button class="remove-btn" onclick="deleteItem('${item.id}','${item.color}','${item.size}')">
                        <i class="icofont icofont-close-line"></i>
                    </button>
                </div>
            </div>
        `
    })
    xml += `
            <div class="item">
                <div class="total_info">
                    <ul>
                        <li>Quantity : <span class="totalsQuantityItems">${totalItems}</span></li>
                        <li>Total : 
                        <i class="icofont icofont-cur-dollar"></i> <span class="totalsPriceItems">${total}</span></li>
                    </ul>
                </div>
            </div>
    
    `
    $('.list-body').html(xml)
    return xml;
}

function renderItems(items) { 
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
    $('.item-wrapper').html(xml);
    hanldeAddFavorite()
}

function rennderCartPrice(){
    if (localStorage.getItem('cart') !== null){
        let items = JSON.parse(localStorage.getItem('cart'))
        let totalItems = 0;
        let totalPrice = 0;
        let list = ''
        items.forEach(item =>{
            totalItems += item.info.quantity;
            totalPrice += item.info.price * item.info.quantity;
        })
        list = `<li>
                    <span class="head">Number of items:</span>
                    <span class="sub"> ${totalItems}</span>
                </li>
                <li>
                    <span class="head">Discount:</span>
                    <span class="sub discount_price">$ 0</span>
                </li>
                <li>
                    <span class="head">Cost delivery:</span>
                    <span class="sub fee_ship">$ 0</span>
                </li>
                <li>
                    <span class="head">Total price:</span>
                    <span class="sub total_price">$ ${totalPrice}</span>
                </li>
            `
            $('.list_cart').html(list)
    }
}

function renderHeaderUrl(){
    let url = window.location.pathname.split('/')
    let xml =  ''
    url.forEach( item =>{
        xml = `
            <li><a href="/shop">HOME</a></li>
            <li class="active"><a href="/shop/${url[2]}">${url[2].toUpperCase()}</a></li>
        `
    })
    $('.breadcrumb').html(xml)
}
function renderCheckOrder(items){
    let xml = '';
    let xmlCustomer = '';
    let timeLine = ''
    items.forEach(item =>{
        let cart = JSON.parse(item.cart)
        let totalItems = 0;
        let customer = JSON.parse(item.infoCutomer)
        for(i = 0; i < cart.length; i++){
            totalItems +=  cart[i].info.quantity
        }
        xmlCustomer = `
                    <h4>Your order:</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list_orders_customer">
                                <li>Name: <span>${customer.fullName.toUpperCase()}</span></li>
                                <li>Email: <span>${customer.email}</span></li>
                                <li>Phone: <span>${customer.phone}</span></li>
                                <li>Address: <span>${customer.street} , ${customer.city} , ${customer.state} , ${customer.country}.</span></li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <ul class="list_orders_items">
                                <li>Total Items: <span>${totalItems}</span></li>
                                <li>Fee Ship: <span>$ ${customer.feeShip}</span></li>
                                <li>Total Price: <span>$ ${item.lastPrice}</span></li>
                            </ul>
                        </div>
                    </div>
        
        `
        if(item.status === 'accepted'){
            xml = `
                <div class="order-status-timeline">
                    <div class="order-status-timeline-completion c0"></div>
                </div>

                <div id="accepted" class="image-order-status image-order-status-new active img-circle">
                    <span class="status">Accepted</span>
                    <div class="icon"></div>
                </div>
                <div id="inprogress" class="image-order-status image-order-status-active img-circle">
                    <span class="status">In progress</span>
                    <div class="icon"></div>
                </div>
                <div id="shipped" class="image-order-status image-order-status-intransit img-circle">
                    <span class="status">Shipped</span>
                    <div class="icon"></div>
                </div>
                <div id="delivered" class="image-order-status image-order-status-delivered img-circle">
                    <span class="status">Delivered</span>
                    <div class="icon"></div>
                </div>
                <div id="completed" class="image-order-status image-order-status-completed img-circle">
                    <span class="status">Completed</span>
                    <div class="icon"></div>
                </div> 
            `
            
        }else if(item.status === 'inprogress'){
            xml = `
            <div class="order-status-timeline">
                <div class="order-status-timeline-completion c1"></div>
            </div>

            <div id="accepted" class="image-order-status image-order-status-new active img-circle">
                <span class="status">Accepted</span>
                <div class="icon"></div>
            </div>
            <div id="inprogress" class="image-order-status image-order-status-active active img-circle">
                <span class="status">In progress</span>
                <div class="icon"></div>
            </div>
            <div id="shipped" class="image-order-status image-order-status-intransit img-circle">
                <span class="status">Shipped</span>
                <div class="icon"></div>
            </div>
            <div id="delivered" class="image-order-status image-order-status-delivered img-circle">
                <span class="status">Delivered</span>
                <div class="icon"></div>
            </div>
            <div id="completed" class="image-order-status image-order-status-completed img-circle">
                <span class="status">Completed</span>
                <div class="icon"></div>
            </div> 
            `
        }else if(item.status === 'shipped'){
            xml = `
            <div class="order-status-timeline">
                <div class="order-status-timeline-completion c2"></div>
            </div>

            <div id="accepted" class="image-order-status image-order-status-new active img-circle">
                <span class="status">Accepted</span>
                <div class="icon"></div>
            </div>
            <div id="inprogress" class="image-order-status image-order-status-active active img-circle">
                <span class="status">In progress</span>
                <div class="icon"></div>
            </div>
            <div id="shipped" class="image-order-status image-order-status-intransit active img-circle">
                <span class="status">Shipped</span>
                <div class="icon"></div>
            </div>
            <div id="delivered" class="image-order-status image-order-status-delivered img-circle">
                <span class="status">Delivered</span>
                <div class="icon"></div>
            </div>
            <div id="completed" class="image-order-status image-order-status-completed img-circle">
                <span class="status">Completed</span>
                <div class="icon"></div>
            </div> 
            `
        }else if(item.status === 'delivered'){
            xml = `
            <div class="order-status-timeline">
                <div class="order-status-timeline-completion c3"></div>
            </div>

            <div id="accepted" class="image-order-status image-order-status-new active img-circle">
                <span class="status">Accepted</span>
                <div class="icon"></div>
            </div>
            <div id="inprogress" class="image-order-status image-order-status-active active img-circle">
                <span class="status">In progress</span>
                <div class="icon"></div>
            </div>
            <div id="shipped" class="image-order-status image-order-status-intransit active img-circle">
                <span class="status">Shipped</span>
                <div class="icon"></div>
            </div>
            <div id="delivered" class="image-order-status image-order-status-delivered active img-circle">
                <span class="status">Delivered</span>
                <div class="icon"></div>
            </div>
            <div id="completed" class="image-order-status image-order-status-completed img-circle">
                <span class="status">Completed</span>
                <div class="icon"></div>
            </div> 
            `
        }else if(item.status === 'completed'){
            xml = `
            <div class="order-status-timeline">
                <div class="order-status-timeline-completion c4"></div>
            </div>

            <div id="accepted" class="image-order-status image-order-status-new active img-circle">
                <span class="status">Accepted</span>
                <div class="icon"></div>
            </div>
            <div id="inprogress" class="image-order-status image-order-status-active active img-circle">
                <span class="status">In progress</span>
                <div class="icon"></div>
            </div>
            <div id="shipped" class="image-order-status image-order-status-intransit active img-circle">
                <span class="status">Shipped</span>
                <div class="icon"></div>
            </div>
            <div id="delivered" class="image-order-status image-order-status-delivered active img-circle">
                <span class="status">Delivered</span>
                <div class="icon"></div>
            </div>
            <div id="completed" class="image-order-status image-order-status-completed active img-circle">
                <span class="status">Completed</span>
                <div class="icon"></div>
            </div> 
            `
        }
    })

    $('.list_orders').html(xmlCustomer)
    $('.order-status').html(xml)
}

function renderLogin(user){
    let xml = `
        <div class="img_login">
            <img src="/uploads/users/${user.avatar}">
        </div>
        <div class="title_login">
            <span class="name text-uppercase">${user.username}</span>
            <a id="logout">Log Out</a>
        </div>
        `;
    $('.profile').html(xml)
}

function renderFavorite(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        $('.favorite').each(function(){
            let arrayFavoriteId = user.favorite;
            let id  = $(this).attr('id')
            if(arrayFavoriteId.includes(id) === true){
                $('#'+id +'.favorite').addClass('active')
            }else{
                $('#'+id +'.favorite').removeClass('active')
            }
        })
    }
}


