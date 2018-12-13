import React , {Component} from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent , to = "/signin", requireAuth = true){
    class Auth extends Component {

        componentDidMount () {
            this.checkAuth();
        }

        componentDidUpdate () {
            this.checkAuth();
        }

        checkAuth () {
            if(this.props.auth !== requireAuth){
                this.props.history.push(to);
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