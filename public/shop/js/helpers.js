

function helperColorItem(id,colors,display){ 
    let colorItem = colors.split(',');
    let xml = '';
    colorItem.forEach( color => {
        xml += `
            <li class="${color}" id="${id}-${display}" onclick="selectColor('${id}','${color}','${display}')" ></li>
        `
    })
    return xml;
} 

function helperSizeItem(id,size,display){
    let sizeItem = size.split(',');
    let xml = '';
    sizeItem.forEach( size => {
        xml += `
            <li id="${id}-${display}-${size}" onclick="selectSize('${id}','${size}','${display}')">${size.toUpperCase()}</li>
        `
    })
    return xml;
} 

function helperSpanSubmitItem(id,price,slug,display){
    let inputVal = `
            <input id="color-item" name="${display}-color-${id}" value="" hidden/>
            <input id="size-item" name="${display}-size-${id}" value="" hidden/>
    `
    let spanSubmit = `
        ${inputVal}
        <span onclick="submitItem('${id}','${display}')" class="btn-material btn-price">
            <span class="price price_style">
                <span class="curr curr_style">
                    $
                </span>
                <span class="price">
                    ${price}
                </span>
                <span class="icon-card icon_card_style">
                    <i class="icofont icofont-cart-alt"></i>
                </span>
            </span>
        </span>
            <a href="javascript:void(0)" id="${id}" class="favorite-link favorite">
                <i class="icofont icofont-star"></i>
                to favorite
            </a>
            <a href="/shop/${slug}/${id}" class="more-link">More info</a>
    
    `

    return spanSubmit;
} 




