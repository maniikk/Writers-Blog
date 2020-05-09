import React,{Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Writers from './Writers'
import {NotFound } from './Errors'
import Layout from './Layout'
export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      writers: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:3004/writers?_embed=texts')
    .then(res => res.json())
    .then(writers => this.setState({writers}))
    .catch(err => {
      console.log(err)
    })
  }
  render(){
    const {writers} = this.state
    return(
      <Router>
        <Layout writers = {writers}>
          <Switch>
            <Route exact path = '/' render = {() => <div>Home</div>} />
            <Route path = '/writers' render = {
              props => <Writers {...props} writers = {writers} />} />
            <Route >
              <NotFound />
            </Route>
          </Switch>
        </Layout>  
      </Router>
    )
  }
}