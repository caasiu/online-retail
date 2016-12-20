import React from "react";
import ReactDom from "react-dom";
import  { Router, Route, IndexRoute, browserHistory } from "react-router";

import { Provider } from "react-redux";
import store from "./store/index";

import Home from "./component/home";
import Market from "./component/market/index";
import Detail from "./component/detail/index";
import Cart from "./component/cart/index";
import PageNotFound from "./component/pagenotfound";

ReactDom.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
                <IndexRoute component={Market} />
                <Route path="product/:slug" component={Detail} />
                <Route path="cart" component={Cart} />
                <Route path="/*" component={PageNotFound} />
            </Route>
        </Router>
    </Provider>
), document.getElementById("app"));
