import React from "react";
import { Link } from "react-router";

import { connect } from "react-redux";
import addToCart from "../../action/addToCart";

class ProductsItem extends React.Component{
    render(){
        var btnClass  = this.props.stock > 0 ? "btn-primary" : "btn-default disabled";
        var btnString = this.props.stock > 0 ? "Add to Cart" : "Out of Stock";
        return(
            <div class="col-sm-6 col-md-3">
                <div class="thumbnail">
                    <Link to={"product/" + this.props.slug}>
                        <img src={this.props.image} alt="image" />
                    </Link>
                    <div class="caption">
                        <h3><Link to={"product/" + this.props.slug}>{this.props.label}</Link></h3>
                        <h4>{"$" + this.props.price}</h4>
                        <p>{this.props.introduction}</p>
                    </div>
                    <a class={"btn btn-block " + btnClass} 
                       role="button"
                       onClick={() => {
                           this.props.handleAddToCart(this.props.cartList, this.props.slug);
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
    return {cartList: state.cart};
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
)(ProductsItem);
