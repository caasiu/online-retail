import "whatwg-fetch";

export default (cartList, slug) => {
    let addProduct = true;
        
    cartList.forEach((product) => {
        if(product.slug === slug){
            addProduct = false;
        }
    });

    if(addProduct){
        return ({
            type: "ADD_TO_CART",
            payload: fetch("http://localhost:3000/api/product/" + slug)
                .then((response) => response.json())
        });
    }

    return {type: "PRODUCT_IN_CART"};
}
