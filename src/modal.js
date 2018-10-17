import React, {Component} from 'react';
import redditLogo from './images/reddit-logo.png';

class Modal extends Component{
    render(){
        const url = 'https://www.reddit.com/login';


        return (
            <div className='modal-wrapper'>
                <div id='dr-modal'>
                    <button className='dr-close-modal' onClick={this.props.toggleModal}>X</button>
                    <img className='img' src={redditLogo} alt='reddit' />
                    <br />
                    <a
                        href={url}
                        className='dr-signin'
                    >
                        Sign In To reddit
                    </a>
                    <br />
                </div>
            </div>
        );
    }
}

export default Modal;