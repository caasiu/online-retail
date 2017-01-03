
export default (state = {
    isSignIn: false,
    error: false,
    token: '',
}, action) => {
    switch(action.type){
        case "SIGNIN_PENDING":
            return state;
        case "SIGNIN_FULFILLED":
            if(action.payload){
                return {
                    isSignIn: true,
                    error: false,
                    token: action.payload
                };
            }else {
                return state;
            }
        case "SIGNIN_REJECTED":
            return {
                ...state,
                error: true
            };
        case "SIGNOUT":
            return {
                isSignIn: false,
                error: false,
                token: ''
            };
        default:
            return state;
    }
}
