import React from "react";

import { connect } from "react-redux";
import { IndexLink } from "react-router";

import CartList from "./cartList";
import CartSummary from "./cartSummary";

class Cart extends React.Component{
    render(){
        if (this.props.cartList.length > 0){
            return (
                <div class="row">
                    <div class="col-md-8">
                        <CartList />
                    </div>
                    <div class="col-md-4">
                        <CartSummary cartList={this.props.cartList} />
                    </div>
                </div>
            );
        }else {
            return (
                <div>
                    <h2>Your cart is empty!</h2>
                    <IndexLink class="btn btn-primary" to="/">Go Shopping</IndexLink>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {cartList: state.cart};
};

export default connect(
    mapStateToProps,
    null
)(Cart);
