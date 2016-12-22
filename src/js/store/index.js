import { createStore, combineReducers, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import logger from "redux-logger";

import productsReducer from "./reducers/productsReducer";
import detailReducer from "./reducers/detailReducer";
import cartReducer from "./reducers/cartReducer";

const reducer = combineReducers({
    products: productsReducer,
    detail: detailReducer,
    cart: cartReducer
});

const middleware = applyMiddleware( promise(), logger() );

export default createStore(reducer, middleware);
