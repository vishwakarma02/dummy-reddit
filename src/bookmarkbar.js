import React, {Component} from 'react';
import redditLogo from './images/reddit-logo.png';

class Bookmarkbar extends Component{
    render(){

        function toggleBookmarkBox(){
            document.querySelector('body').classList.toggle('showBookmark');
        }

        //blank array to store all bookmarks
        let bmArr = [];
        let i=0;

        //reading all bookmarks and pushing into bookmarks array
        while(i<localStorage.length){
            let el = {link: localStorage.key(i), title: localStorage.getItem(localStorage.key(i))};
            bmArr.push(el);
            i++;
        }

        //creating nodes from bookmark array
        let bmList = bmArr.map((el, index)=>{
            return (
                <li key={index}><a href='el.link' className='bmLinks' title={el.title}>{el.title}</a></li>
            );
        });
        return(
            <section className='container bookmark__outer'>
                <div className='bookmarkWrapper'>
                    <header>
                        <div className='logo'><img src={redditLogo} alt='reddit' /></div>
                        <div className='bmLabel bookmark active' onClick={toggleBookmarkBox}><i className='flaticon-bookmark'></i></div>
                    </header>
                    <div className='mask' onClick={toggleBookmarkBox}></div>
                    <span className='bmList'>
                        <div className='closeWrapper'><button className='close' onClick={toggleBookmarkBox}>Close</button></div>
                        <div className='ulWrapper'>
                            <ul>{bmList}</ul>
                        </div>
                    </span>
                </div>
            </section>
        )
    }
}

export default Bookmarkbar;