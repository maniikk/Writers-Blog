import React, {Component, Fragment} from 'react'
import Header from './Header/Header'
import RegisterForm from './RegisterForm'
import {Route, Switch, Redirect,BrowserRouter as Router} from 'react-router-dom'
import LoginForm from './LoginForm'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated : false
        }
    }
    showError(err) {
        return <div className = 'error-msg'>err</div>
    }
    render(){
        return(
            <Fragment>
                <Router>
                    <Header isAuthenticated = {this.state.isAuthenticated} />
                    <Switch>
                        <Route exact path = '/'>
                            <div>Home</div>
                        </Route>
                        <Route path = '/register' render = {(props) => <RegisterForm {...props} />} />
                        <Route path = '/login' render = {props => <LoginForm {...props} />} />
                        <Route>
                            <div>Not found</div>
                        </Route>
                    </Switch>
                </Router>
            </Fragment>
            
        )
    }
}
export default App