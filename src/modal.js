import React, {Component} from 'react';
import redditLogo from './images/reddit-logo.png';

class Modal extends Component{
    render(){
        const url = 'https://www.reddit.com/login';


        return (
            <div className='modal-wrapper'>
                <div id='dr-modal'>
                    <img className='img' src={redditLogo} alt='reddit' />
                    <a
                        href={url}
                    >
                        Sign In To reddit
                    </a>
                    <button onClick={this.props.toggleModal}>Hide Modal</button>
                </div>
            </div>
        );
    }
}

export default Modal;