import React from "react";

import { connect } from "react-redux";
import addToCart from "../../action/addToCart";

class ProductDetail extends React.Component{
    render(){
        var btnClass  = this.props.product.stock > 0 ? "btn-primary" : "btn-default disabled";
        var btnString = this.props.product.stock > 0 ? "Add to Cart" : "Out of Stock";
        var stockState = ((this.props.product.stock < 5) && (this.props.product.stock > 0)) ? "Low Stock" : "";

        return(
            <div class="row">
                <div class="col-sm-5">
                    <img src={this.props.product.image} alt="image" class="img-thumbnail img-responsive" />
                </div>
                <div class="col-sm-7">
                    <div class="caption">
                        <h2>{this.props.product.label}</h2>
                        <span class="label label-warning">{stockState}</span>
                        <h3>{"$" + this.props.product.price}</h3>
                        <div>
                            <span class="glyphicon glyphicon-star full-star"></span>
                            <span class="glyphicon glyphicon-star full-star"></span>
                            <span class="glyphicon glyphicon-star full-star"></span>
                            <span class="glyphicon glyphicon-star half-star"></span>
                        </div>
                        <h4>description:</h4>
                        <p>{this.props.product.description}</p>
                    </div>
                    <a class={"btn " + btnClass} 
                       role="button" 
                       onClick={() => {
                            this.props.handleAddToCart(this.props.cartList, this.props.product.slug);
                       }}
                    >
                            {btnString}
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.detail[0],
        cartList: state.cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddToCart: (cartList, slug) => {
            dispatch(addToCart(cartList, slug));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);
