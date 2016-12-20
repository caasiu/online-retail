import React from "react";

import { connect } from "react-redux";
import showDetail from "../../action/showDetail";

import ProductDetail from "./productDetail";
import NoProduct from "./noProduct";

class Detail extends React.Component{
    componentWillMount(){
        this.props.handleFilterProducts(this.props.params.slug);
    }

    render(){
        var DetailPage = this.props.product.length > 0 ? ProductDetail : NoProduct;
        return ( <DetailPage /> );
    }
}

const mapStateToProps = (state) => {
    return { product: state.detail };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFilterProducts: (slug) => {
            dispatch(showDetail(slug));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
