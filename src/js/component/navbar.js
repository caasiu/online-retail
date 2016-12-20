import React from "react";
import { Link, IndexLink } from "react-router";

import { connect } from "react-redux";

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {toggleStyle: "collapse"};
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(event){
        event.preventDefault();
        var toggleStyle = this.state.toggleStyle === "collapse" ? "" : "collapse";
        this.setState({toggleStyle});
    }

    render(){
        return (
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" aria-expanded="false" onClick={this.onToggle}>
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <IndexLink to="/" class="navbar-brand">Market</IndexLink>
                    </div>

                    <div class={"navbar-collapse " + this.state.toggleStyle}>
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/cart">
                                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                    Cart ({this.props.cartList.length})
                                </Link>
                            </li>
                        </ul>
                        <form class="navbar-form navbar-form-center">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-search"></span>
                                </span>
                                <input type="text" class="form-control" placeholder="Search..." />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {cartList: state.cart};
};

export default connect(
    mapStateToProps,
    null
)(NavBar);
