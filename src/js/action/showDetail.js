var json = require("json-loader!./data/products.json");

const filterProduct = (products, slug) => {
    var result = products.filter((product) => {
        return product.slug === slug;
    });

    return result;
}

export default (slug) => {
    var result = filterProduct(json, slug);

    if ( result.length > 0 ){
        return {
            type: "SHOW_DETAIL",
            productDetail: result
        };
    }else {
        return { type: "NO_RESULT" };
    }
}
