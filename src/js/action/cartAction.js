
export const quantityPlus = (slug, quantity, stock) => {
    if (quantity < stock) {
        return {
            type: "CHANGE_QUANTITY",
            slug,
            quantity: quantity + 1
        };
    }else if(quantity > stock){
        return {
            type: "CHANGE_QUANTITY",
            slug,
            quantity: stock
        }
    }else {
        return {type: null};
    }

}

export const quantityMinus = (slug, quantity) => {
    if (quantity > 1){
        return {
            type: "CHANGE_QUANTITY",
            slug,
            quantity: quantity - 1
        };
    }else{
        return {type: null};
    }
} 

export const removeProduct = (slug) => {
    return {
        type: "REMOVE_PRODUCT",
        slug
    };
}
