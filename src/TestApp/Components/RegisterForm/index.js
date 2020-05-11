import React ,{Component} from 'react'
import axios from 'axios'
//import {API_BASE_URL} from '../../constants/apiConstants';
import './RegisterForm.css'
class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            conf_password : '',
            successMessage: null,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this)
        this.redirectToLogin = this.redirectToLogin.bind(this)
    }
    sendDetails = () =>{
        if(this.state.username && this.state.password) {
            const payload = {
                "email": this.state.email,
                "password": this.state.password,
            }
            axios.post('./' + 'register', payload)
            .then(res =>{
                if(res.data.code === 200) {
                    this.setState({
                        successMessage: 'Registration successful. Redirecting to home page..'
                    })
                    this.redirectToHome()
                    this.props.showError(null)
                }
                this.setState({
                    error:'Some error occured'
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else{
            this.setState({
                error:'Please enter a valid username and password'
            })
        }
        
    }
    redirectToHome() {
        this.props.history.push('./home');
    }
    redirectToLogin() {
        this.props.history.push('./login');
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.password === this.state.conf_password) {
            this.sendDetails()
        }
        else{
            this.setState({
                error:'Passwords do not match'
            })
        }
    }
    handleChange(e) {
        const {name, value} = e.target
        this.setState({
            [name] : value,
        });
    }
    render() {
        const {
            username,
            password,
            conf_password,
            error
        } = this.state
        return (
            <form className = 'form-body' onSubmit = {this.handleSubmit}>
                <div className = 'form-heading'>create your account</div>
                {this.state.error &&
                    <div className = 'error-msg'>
                        {error}
                    </div>
                }
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
                <input 
                    className = 'input'
                    type = 'password'
                    name = 'conf_password' 
                    minLength = '8'
                    value  = {conf_password} 
                    onChange = {this.handleChange} 
                    placeholder = 'Confirm Password'
                    required 
                />
                <input type = 'submit' className = 'submit-btn' value = 'Sign Up' />
                <div className = 'alt-text'>Have an account? 
                    <span 
                        className  = 'login-text'
                        onClick = {this.redirectToLogin}>
                            Log in
                    </span>
                </div>
            </form>
        )
    }
}
export default RegisterForm