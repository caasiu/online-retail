import "whatwg-fetch";

export default (slug) => {
    return ({
        type: "SHOW_DETAIL",
        payload: fetch("http://localhost:3000/api/product/" + slug)
                     .then((response) => response.json())
    });
}
