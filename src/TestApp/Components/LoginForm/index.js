import React ,{Component} from 'react'
import axios from 'axios'
//import {API_BASE_URL} from '../../constants/apiConstants';
import './index.css'
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            successMessage: null,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this)
        this.redirectToRegister = this.redirectToRegister.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        const payload = {
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post('/' + 'login', payload)
        .then(res => {
            if(res.data.code === 200) {
                this.setState({
                    successMessage: 'Login successful. Redirecting to home page...'
                })
                this.redirectToHome();
                this.props.showError(null)
            }
            else if(res.data.code === 204){
                this.setState({
                    error:"Username and password do not match"
                });
            }
            else{
                this.setState({
                    error:"Username does not exists"
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    redirectToHome() {
        this.props.history.push('/')
    }
    redirectToRegister() {
        this.props.history.push('/register')
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }
    render(){
        const {username, password} = this.state
        return(
            <form className = 'form-body' onSubmit = {this.handleSubmit}>
                <div className = 'form-heading'>Login to continue</div>
                {this.state.error && <div className = 'error-msg'>{this.state.error}</div>}
                <input 
                    className = 'input'
                    type = 'text'
                    name = 'username' 
                    value  = {username} 
                    onChange = {this.handleChange} 
                    placeholder = 'Username'
                    required
                />
                <input 
                    className = 'input'
                    type = 'password'
                    name = 'password' 
                    minLength = '8'
                    value  = {password} 
                    onChange = {this.handleChange} 
                    placeholder = 'Password' 
                    required
                />
                <input type = 'submit' className = 'submit-btn' value = 'Login' />
                <div className = 'alt-text'>Don't have an account? 
                    <span 
                        className  = 'login-text'
                        onClick = {this.redirectToRegister}>
                            Register
                    </span>
                </div>
            </form>
        )
    }
}