import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './SocialCard.css'
class SocialCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className = 'social-card'>
                <div className = 'author'>
                <img 
                    className = 'avatar' 
                    src = './avatar-small.jpg' 
                    alt = 'No image' />
                    <span><b>Kaustubh </b></span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className = 'post-body'>
                    <img 
                        className = 'post-image' 
                        src = './avatar.jpg' />
                    <div className = 'post-text'>
                        Insert random text here
                    </div>
                </div> 
            </div>
        )
    }
}
export default SocialCard