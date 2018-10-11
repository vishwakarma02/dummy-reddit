import React, { Component } from 'react';
import './App.css';
import Card from './card';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    };
  }

  //load data after component is mounted into the DOM Tree
  componentDidMount(){
    const url = 'https://www.reddit.com/.json';

    fetch(url)
      .then(response=> {
        return response.json();
      })
      .then(response=>{
        // console.log(response.data.children);
        this.setState({
          data: response.data.children
        })
      })
      .catch(error=>{
        console.log('FETCH REQUEST FAILED :'+error);
      });
  }
  render() {
    const { data } = this.state;
    const list = data.map((data, index)=>{
      console.log(data);
      return (
        <Card data={data} key={data.data.id}/>
      );
    });
    return (
      <div className='container'>
        {list}
      </div>
    )
  }
}

export default App;
