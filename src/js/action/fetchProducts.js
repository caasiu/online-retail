import "whatwg-fetch";

export default () => {
    return ({
        type: "FETCH_PRODUCTS",
        payload: fetch("http://localhost:3000/api/products")
                     .then((response) => response.json())
    });
}
