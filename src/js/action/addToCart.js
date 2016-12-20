var json = require("json-loader!./data/products.json");

const filterProduct = (products, slug) => {
    var temp = products.filter((product) => {
        return product.slug === slug;
    });

    return temp[0];
}

export default (cartList, slug) => {
    let addProduct = true;
        
    cartList.forEach((product) => {
        if(product.slug === slug){
            addProduct = false;
        }
    });

    if(addProduct){
        var result = filterProduct(json, slug)
        return {
            type: "ADD_TO_CART",
            slug: result.slug,
            label: result.label,
            price: result.price,
            stock: result.stock,
            quantity: 1
        };
    }

    return {type: null};
}
