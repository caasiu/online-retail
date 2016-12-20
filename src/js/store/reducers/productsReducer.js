
export default (state = [], action) => {
    switch (action.type){
        case "RECEIVE_PRODUCTS":
            return [...action.productsList];
        case "FILTER_PRODUCT":
            return state.filter((product) => {
                return product.slug === action.slug;
            });
        case "MORE_PRODUCTS":
            return [
                ...state,
                action.productsList
            ];
        default:
            return state;
    }
}
