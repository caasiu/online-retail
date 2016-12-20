import React from "react";
import { IndexLink } from "react-router";

export default class NoProduct extends React.Component{
    render(){
        return (
            <div>
                <h1>Oooss......</h1>
                <h2>Can't find the product!</h2>
                <IndexLink class="btn btn-primary" to="/">Back to Market</IndexLink>
            </div>
        );
    }
}
