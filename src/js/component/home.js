import React from "react";

import NavBar from "./navbar";

export default class Home extends React.Component{
    render(){
        return (
            <div>
                <NavBar />
                <div class="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
