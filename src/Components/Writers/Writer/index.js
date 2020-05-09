import React, { Fragment } from 'react'
import { Link, useRouteMatch, Route, useParams } from 'react-router-dom'
import {NotFound} from '../../Errors'
import Text from './Text'
export default writer => {
    const {
        name,
        description,
        born,
        deceased,
        image,
        texts
    } = writer;
    const {url} = useRouteMatch()
    return(
    <Fragment>
        <img src = {image} alt = {name} style = {{maxWidth: '300px'}} />
        <h1>{name}</h1>
        <h3>{born} &mdash; {deceased}</h3>
        <p>{description}</p>
        <ul>
            {texts.map(({id,title}) => (
                <li>
                    <Link to = {`${url}/texts/${id}`}>
                        {title}
                    </Link>
                </li>
            ))}
        </ul>
        <Route path = {`${url}/texts/:textId`} render = {
            props => {
                const text = texts.find(({id}) => id === props.match.params.textId)
                if(!text) {
                    return <NotFound />
                }
                return <Text {...text} />
            }
        } />
    </Fragment>
    )
}