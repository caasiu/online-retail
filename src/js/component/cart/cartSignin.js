import React from "react";
import { connect } from "react-redux";

import signInAction from "../../action/signInAction";

class CartSignin extends React.Component{
    render(){
        return (
            <form class="form-horizontal">
                <div class="form-group row">
                    <label class="col-xs-3">UserID</label>
                    <div class="col-xs-9">
                        <input 
                            type="text" 
                            class="form-control" 
                            ref="userid"
                            placeholder="UserID is 348689" 
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Password</label>
                    <div class="col-xs-9">
                        <input 
                            type="password" 
                            class="form-control" 
                            ref="password"
                            placeholder="Password is onlineretail" 
                        />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-xs-offset-3 col-xs-9">
                        <div class="checkbox">
                            <label><input type="checkbox" />Remember Me</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-xs-offset-3 col-xs-9">
                        <button 
                            type="submit" 
                            class="btn btn-primary"
                            onClick={(event) => {
                                event.preventDefault();
                                var {userid, password} = this.refs;
                                this.props.handleSignIn(userid.value, password.value);
                                userid.value = "";
                                password.value = "";
                            }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignIn: (userid, password) => {
            if(userid.length > 0 && password.length > 0){
                dispatch(signInAction(userid, password));
            }
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CartSignin);
