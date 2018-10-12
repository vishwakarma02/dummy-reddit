import React, { Component } from 'react';
import './App.css';
import Card from './card';

class App extends Component {

  constructor(props){
    super(props);
    this.updateStateObject = this.updateStateObject.bind(this);
    this.setNewTrigger = this.setNewTrigger.bind(this);
    this.state = {
      data: []
    };
  }


  //load more post on scroll
  loadMorePostOnScroll(){
    // if(document.querySelector('.lastPost').getBoundingClientRect().top < (this.props.viewportHeight+10)){
    // };
    console.log(this.viewportHeight);
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
        // console.log(newArr);
        this.setState({
          // data: response.data.children
          data: newArr
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
    let viewportHeight = window.innerHeight;
  }
  
  render() {
    const { data } = this.state;
    const list = data.map((data, index)=>{
      return (
        <Card data={data} key={data.data.id}/>
      );
    });
    return (
      <div>
        <div className='container'>
          {list}
        </div>
        <button onClick={this.updateStateObject}>update list</button>
      </div>
    )
  }
}

export default App;
