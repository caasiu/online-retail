import "whatwg-fetch";

export default (id, pwd) => {
    return ({
        type: "SIGNIN",
        payload: fetch("http://localhost:3000/api/userid/"+ id + "/password/" + pwd, {method: 'POST'})
                     .then((response) => {
                         if(response.status == 200){
                             return response.text()
                         }else{ return '' }
                     })
    });
}
