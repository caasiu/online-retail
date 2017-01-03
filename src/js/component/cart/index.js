import React from "react";

import { connect } from "react-redux";
import { IndexLink } from "react-router";

import CartList from "./cartList";
import CartSummary from "./cartSummary";
import CartSignin from "./cartSignin";
import Account from "./account";

class Cart extends React.Component{
    render(){
        if (this.props.cartList.length > 0 && this.props.auth.isSignIn){
            return (
                <div class="row">
                    <div class="col-md-8">
                        <CartList />
                    </div>
                    <div class="col-md-4">
                        <Account />
                        <CartSummary cartList={this.props.cartList} />
                    </div>
                </div>
            );
        }else if(this.props.auth.isSignIn){
            return (
                <div>
                    <h2>Your cart is empty!</h2>
                    <IndexLink class="btn btn-primary" to="/">Go Shopping</IndexLink>
                    <a class="btn btn-danger" onClick={this.props.handleSignOut}>
                        Sign Out
                    </a>
                </div>
            );
        }else {
            return (
                <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 well">
                    <CartSignin />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cartList: state.cart,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => {
            dispatch({type: "SIGNOUT"});
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
