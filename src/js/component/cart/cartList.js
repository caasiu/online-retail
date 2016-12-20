import React from "react";
import { Link } from "react-router";

import { connect } from "react-redux";
import { quantityPlus, quantityMinus, removeProduct } from "../../action/cartAction";

class CartList extends React.Component{
    render(){
        return (
            <div class="well">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cartList.map((product, index) => 
                            <tr key={index}>
                                <td><Link to={"/product/" + product.slug}>{product.label}</Link></td>
                                <td>{"$" + product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <div class="btn-group btn-group-xs">
                                        <a class="btn btn-default" 
                                            onClick={()=>{
                                                this.props.handleQuantityPlus(
                                                    product.slug,
                                                    product.quantity,
                                                    product.stock
                                                );
                                            }}
                                        >
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </a>
                                        <a class="btn btn-default"
                                            onClick={()=>{
                                                this.props.handleQuantityMinus(
                                                    product.slug,
                                                    product.quantity,
                                                );
                                            }}
                                        >
                                            <span class="glyphicon glyphicon-minus"></span>
                                        </a>
                                        <a class="btn btn-default"
                                            onClick={()=>{
                                                this.props.handleProductRemove(product.slug);
                                            }}
                                        >
                                            <span class="glyphicon glyphicon-remove"></span>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {cartList: state.cart};
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleQuantityPlus: (slug, quantity, stock) => {
            dispatch(quantityPlus(slug, quantity, stock));
        },
        handleQuantityMinus: (slug, quantity) => {
            dispatch(quantityMinus(slug, quantity));
        },
        handleProductRemove: (slug) => {
            dispatch(removeProduct(slug));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartList);
