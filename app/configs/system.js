
module.exports = {
    prefixAdmin: 'adminCCC',
    prefixBlog: '',
    prefixShop: 'shop',
    format_long_time: 'DD-MM-YYYY',
    format_time_frontend: 'DD-MM-YYYY',
    env:'dev', //dev or production
    status_value: [
        {id: 'novalue', name: 'Choose Status'},
		{id: 'active', name: 'Active'},
		{id: 'inactive', name: 'InActive'},
    ],
    special_value: [
        {id: 'novalue', name: 'Choose Status'},
		{id: 'active', name: 'Active'},
		{id: 'inactive', name: 'InActive'},
    ],
    status_order: [
        {id: 'accepted', name: 'Accepted'},
        {id: 'inprogress', name: 'In progress'},
		{id: 'shipped', name: 'Shipped'},
		{id: 'delivered', name: 'Delivered'},
        {id: 'completed', name: 'Completed'},
    ],
    groupacp_value: [
        {id: 'novalue', name: 'Choose Group ACP'},
		{id: 'yes', name: 'Yes'},
		{id: 'no', name: 'No'},
    ]
};