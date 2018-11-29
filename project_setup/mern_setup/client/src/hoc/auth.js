import React , {Component} from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent){
    class Auth extends Component {

        componentDidMount () {
            this.checkAuth();
        }

        componentDidUpdate () {
            this.checkAuth();
        }

        checkAuth () {
            if(!this.props.auth){
                this.props.history.push("/signin");
            }
        }
        render () {
            return <WrappedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state){
        return {
            auth: state.user.auth
        }
    }
    return connect(mapStateToProps)(Auth);
}