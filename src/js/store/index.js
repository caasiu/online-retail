import { createStore, combineReducers } from "redux";

import productsReducer from "./reducers/productsReducer";
import detailReducer from "./reducers/detailReducer";
import cartReducer from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productsReducer,
    detail: detailReducer,
    cart: cartReducer
});

export default createStore(reducer);
