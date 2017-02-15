import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Feed = { 
  "slider":[
    {
      "hero": " https://placeimg.com/640/480/animals", 
      "text": "Animals are here.", 
      "image": " https://placeimg.com/150/150/animals/sepia" 
    },
    {
      "hero": " https://placeimg.com/640/480/people", 
      "text": "People are here.", 
      "image": " https://placeimg.com/150/150/people/sepia" 
    },
    {
      "hero": " https://placeimg.com/640/480/tech",
      "text": "Tech is here.", 
      "image": " https://placeimg.com/150/150/tech/sepia" 
    }
  ]
}

const NavButton = (props) =>
  <button className={props.class} >{props.text}</button>
 
class ImageDiv extends React.Component {

  constructor(props) {
    super(props);
    this.state = {index: 0};
    this.stopTimer = this.stopTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pullLeft = this.pullLeft.bind(this);
    this.pullRight = this.pullRight.bind(this);
  }

  startTimer(){
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );
  }

  stopTimer(){
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  pullLeft(){
    this.setState({
      index: (this.state.index === 0) ? this.state.index = Feed.slider.length-1 : this.state.index -= 1
    });
    this.stopTimer();
    this.startTimer();
  }  

  pullRight(){
    this.setState({
      index: (this.state.index === Feed.slider.length-1) ? this.state.index = 0 : this.state.index += 1
    });
    this.stopTimer();
    this.startTimer();
  }

  tick() {
    this.setState({
      index: (this.state.index >= Feed.slider.length-1) ? this.state.index = 0 : this.state.index += 1
    });
  }

  render() {
    return (
      <div className=" divWithImage ">
        <NavButton text=" Left " onClick={ this.pullLeft } class=" leftButton " />
        <NavButton text=" Right " onClick={ this.pullRight } class=" rightButton " />
        <img className=" imageHero " src={ Feed.slider[this.state.index].hero } onMouseEnter={ this.stopTimer } onMouseLeave={ this.startTimer } />
        <ImageWithText index={ this.state.index } />
      </div>
      );
  }
}

function ImageWithText(props){
  return (
    <div className=" imageWithText " >
      <img src={ Feed.slider[props.index].image } />
      <div className=" text " > { Feed.slider[props.index].text } </div>
    </div>
    );
}

export default ImageDiv;
