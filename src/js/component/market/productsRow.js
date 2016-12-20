import React from "react";

import ProductsItem from "./productsItem";

export default class ProductsRow extends React.Component{
    render(){
        return(
            <div class="row">
                {this.props.products.map((product) => 
                    <ProductsItem 
                        key={product.id} 
                        stock={product.stock}
                        label={product.label} 
                        image={product.image}
                        slug={product.slug}
                        price={product.price} 
                        introduction={product.introduction}
                    />
                )}
            </div>
        );
    }
}
