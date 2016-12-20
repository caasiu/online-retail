import React from "react";
import { connect } from "react-redux";

class CartSummary extends React.Component{
    render(){
        let subTotal = 0;
        this.props.cartList.map((product) => {
            subTotal = subTotal + product.price * product.quantity
        });
        let shipping = 5
        let total = subTotal + shipping;
        return (
            <div class="well">
                <h4>Cart Summary</h4>
                <br />
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Sub Total</td>
                            <td>${subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>${shipping.toFixed(2)}</td>
                        </tr>
                        <tr class="info">
                            <td>Total</td>
                            <td>${total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                <a class="btn btn-success btn-block" role="button">Check Out</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {cartList: state.cart};
};

export default connect(
    mapStateToProps,
    null
)(CartSummary);
