import React from "react";

import { connect } from "react-redux";
import showDetail from "../../action/showDetail";

import Loading from "./loading";
import ProductDetail from "./productDetail";
import NoProduct from "./noProduct";

class Detail extends React.Component{
    componentWillMount(){
        this.props.handleFilterProducts(this.props.params.slug);
    }

    render(){
        if (this.props.product.length > 0){
            if (this.props.product[0].fetching === true){
                return (<Loading />);
            }else if(this.props.product[0].fetched === true){
                return (<ProductDetail />);
            }
        }else{
            return (<NoProduct />);
        }
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
