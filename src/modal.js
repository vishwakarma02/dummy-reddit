import React, {Component} from 'react';

class Modal extends Component{
    render(){
        const url = 'https://www.reddit.com/login';
        const {showModal} = this.state.showModal;


        return (
            <button onClick='this.showModal()'>modal</button>
        );
    }
}

export default Modal;