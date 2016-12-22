
export default (state = [], action) => {
    switch (action.type){
        case "SHOW_DETAIL":
            return action.productDetail;
        case "SHOW_DETAIL_PENDING":
            return [{
                fetching: true,
                fetched: false
            }];
        case "SHOW_DETAIL_FULFILLED":
            return [{
                ...action.payload[0],
                fetching: false,
                fetched: true
            }];
        default:
            return state;
    }
}
