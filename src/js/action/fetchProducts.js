var json = require("json-loader!./data/products.json");

export default () => {
    return ({
        type: "RECEIVE_PRODUCTS",
        productsList: json
    });
}
