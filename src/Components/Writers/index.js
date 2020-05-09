import React, {Fragment} from 'react'
import {Link, Route, Redirect, useRouteMatch} from 'react-router-dom'
import Writer from './Writer'
import {NotFound} from '../Errors'
export default ({writers}) => {
    const {url} = useRouteMatch()
    return(
        <Fragment>
            <ul>
                {writers.map(({name,id}) => (
                    <li key = {id}>
                        <Link to = {`${url}/${id}`}>{name}</Link>
                    </li>
                ))}
            </ul>
            <Route exact path = {url}>
                <h3>Please select a writer from above</h3>
            </Route>
            <Route path = {`${url}/:writerId`} render = {
                ({match}) => {
                    const writer = writers.find(({id}) => id === match.params.writerId)
                    if(!writer) {
                        return <NotFound />
                    }
                    return <Writer {...writer} />} 
            } />
        </Fragment>
    )
}