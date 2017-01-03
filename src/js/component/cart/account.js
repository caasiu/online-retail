import React from "react";
import { connect } from "react-redux";
import "whatwg-fetch";

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {name: ''};
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/account', {headers: {
            'Authorization': 'Bearer ' + this.props.auth.token
        }}).then(res => res.json())
           .then(json => this.setState({name: json.name}));
    }

    render(){
        return (
            <div class="well">
                <h4>Account</h4>
                <hr />
                <div class="row">
                    <a class="col-xs-9">
                        <h4>
                            <span class="glyphicon glyphicon-user"></span>
                            {this.state.name}
                        </h4>
                    </a>
                    <a class="btn btn-danger col-xs-3" onClick={this.props.handleSignOut}>
                        Sign Out
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => {
            dispatch({type: "SIGNOUT"});
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);
