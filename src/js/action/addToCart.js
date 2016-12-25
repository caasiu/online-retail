import "whatwg-fetch";

export default (cartList, {slug, label, price, stock}) => {
    let addProduct = true;
        
    cartList.forEach((product) => {
        if(product.slug === slug){
            addProduct = false;
        }
    });

    if(addProduct){
        return ({
            type: "ADD_TO_CART",
            data: {slug, label, price, stock}
        });
    }

    return {type: "PRODUCT_IN_CART"};
}
