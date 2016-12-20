
export default (state = [], action) => {
    switch (action.type){
        case "SHOW_DETAIL":
            return action.productDetail;
        case "NO_RESULT":
            return [];
        default:
            return state;
    }
}
