import React from "react";

import ProductsRow from "./productsRow";

import { connect } from "react-redux";
import fetchProducts from "../../action/fetchProducts";

class Market extends React.Component{
    componentWillMount(){
        this.props.handleFetchProducts();
    }

    render(){
        var list = [];
        for(var i=0; i<this.props.products.length; i+=4){
            list.push(
                <ProductsRow key={list.length} products={this.props.products.slice(i,i+4)} />
            );
        }

        return(
            <div>
                {list}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {products: state.products}
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFetchProducts: () => {
            dispatch(fetchProducts());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Market);
