import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from 'react-router-dom'
export default class BasicRouter extends React.Component {
    render(){
        return(
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to = '/'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to = '/about'>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to = '/topics'>
                                Topics
                            </Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route exact path = '/'>
                            <Home />
                        </Route>
                        <Route path = '/about'>
                            <About />
                        </Route>
                        <Route path = '/topics'>
                            <Topics />
                        </Route>
                    </Switch>
                </div>    
            </Router>
        )
    }
}
function Home() {
    return (
        <h2>Home</h2>
    )
}
function About() {
    return(
        <h2>About</h2>
    )
}
function Topics() {
    const {path,url} = useRouteMatch();
    return(
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/components`}>
                        Components
                    </Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route path = {`${path}/:topicId`}>
                    <Topic />
                </Route>
                <Route exact path = {path}>
                    <h3>Please select a topic</h3>
                </Route>
            </Switch>
        </div>
    )
}
function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
  }