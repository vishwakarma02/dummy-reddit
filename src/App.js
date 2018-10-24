import React, { Component } from 'react';
import './App.css';
import './font/flaticon.css';
import Card from './card';
import Modal from './modal';
import Bookmarkbar from './bookmarkbar';

class App extends Component {

  constructor(props){
    super(props);
    this.updateStateObject = this.updateStateObject.bind(this);
    this.setNewTrigger = this.setNewTrigger.bind(this);
    this.loadMorePostOnScroll = this.loadMorePostOnScroll.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.state = {
      data: [],
      isModalOpen: false
    };
  }

  toggleModal(e){
    e.preventDefault();
    if(this.state.isModalOpen){
      this.setState({
        isModalOpen: false
      });
    }
    else{
      this.setState({
        isModalOpen: true
      });
    }
  }

  toggleBookmark(data, key){
    let modInfo = this.state.data.map((info, index)=>{
      if(index === key){
        let url = 'https://www.reddit.com/'+info.data.permalink;
        if(localStorage.getItem(url)){
          localStorage.removeItem(url);
          info.data.bookmark = false;
        }
        else{
          localStorage.setItem(url, info.data.title);   
          info.data.bookmark = true;       
        }
      }
      return info;
    });
    this.setState({
      data: modInfo
    });
  }


  //load more post on scroll
  loadMorePostOnScroll(){
    let body = document.querySelector('body');
    let offsetHeight = parseInt(body.offsetHeight);
    let scrolledAmount = parseInt(window.pageYOffset);
    let triggerPoint = parseInt(scrolledAmount) + parseInt(window.innerHeight);
    if((offsetHeight) < (triggerPoint)){
      if(body.classList.contains('updatingData')){
        return;
      }
      else{
        body.classList.add('updatingData');
        this.updateStateObject();
      }
    }
  }

  setNewTrigger(){
    let posts = document.querySelectorAll('article');
    let postCount = posts.length;
    posts.forEach((element, index)=>{
      if(element.classList.contains('lastPost')){
        element.classList.remove('lastPost');
      }
      if(index === (postCount-1)){
        element.classList.add('lastPost');
      }
    })
  }

  //updating state object
  updateStateObject(){
    const url = 'https://www.reddit.com/.json';

    fetch(url)
      .then(response=> {
        return response.json();
      })
      .then(response=>{
        let newArr = [...this.state.data, ...response.data.children];
        let modInfo = newArr.map(info=>{
          let url = 'https://www.reddit.com/'+info.data.permalink;
          if(localStorage.getItem(url)){
            info.data.bookmark = true;
          }
          else{
            info.data.bookmark = false;
          }
          return info;
        })
        this.setState({
          // data: response.data.children
          data: modInfo
        });
      })
      .catch(error=>{
        console.log('FETCH REQUEST FAILED :'+error);
      });
  }

  

  //load data after component is mounted into the DOM Tree
  componentDidMount(){
    this.updateStateObject();
    window.addEventListener('scroll', this.loadMorePostOnScroll);
  }

  componentDidUpdate(){
    this.setNewTrigger();
    let body = document.querySelector('body');
    if(body.classList.contains('updatingData')){
      body.classList.remove('updatingData');
    }
  }
  
  render() {
    const { data, isModalOpen } = this.state;
    // const { data } = this.state;
    const list = data.map((data, index)=>{
      return (
        <Card data={data} isModalOpen={isModalOpen} key={index} postIndex={index} toggleModal={this.toggleModal} toggleBookmark={this.toggleBookmark}/> //key={data.data.id}
      );
    });
    return (
      <div>
        {
          (localStorage.length>0)? <Bookmarkbar></Bookmarkbar> : ''
        }
        <div className='container' id='wrapper'>
          {list}
        </div>
        {
          (isModalOpen ? <Modal toggleModal={this.toggleModal} /> : '')
        }
      </div>
    )
  }
}

export default App;
