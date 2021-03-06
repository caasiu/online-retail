
export default (state = [], action) => {
    switch (action.type){
        case "ADD_TO_CART":
            return [
                ...state,
                {
                    ...action.data,
                    quantity: 1
                }
            ]
        case "CHANGE_QUANTITY":
            return state.map((product) => {
                if (product.slug !== action.slug){
                    return product;
                }

                return {
                    ...product,
                    quantity: action.quantity
                };
            });
        case "REMOVE_PRODUCT":
            return state.filter((product) => {
                return product.slug !== action.slug;
            });
        default:
            return state;
    }
}
