import React from 'react';
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
  <button className={ props.class } onClick={ props.func } >{props.text}</button>
 
class Slider extends React.Component {

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

  pullLeft(){
    let index = this.state.index;
    this.setState({
      index: (this.state.index === 0) ? Feed.slider.length-1 : --index
    });
    this.stopTimer();
    this.startTimer();
  }  

  pullRight(){
    let index = this.state.index;
    this.setState({
      index: (this.state.index === Feed.slider.length-1) ? 0 : ++index
    });
    this.stopTimer();
    this.startTimer();
  }

  tick() {
    let index = this.state.index;
    this.setState({
      index: (this.state.index >= Feed.slider.length-1) ? 0 : ++index
    });
  }

  render() {
    const index = this.state.index;
    return (
      <div className=" divWithImage ">
        <NavButton text=" Left " func={ this.pullLeft } class=" leftButton " />
        <NavButton text=" Right " func={ this.pullRight } class=" rightButton " />
        <div onMouseEnter={ this.stopTimer } onMouseLeave={ this.startTimer } >
          <img className=" imageHero " src={ Feed.slider[index].hero } role="presentation" />
          <ImageWithText index={ index } />
        </div>
      </div>
      );
  }
}

function ImageWithText(props){
  return (
    <div className=" imageWithText " >
      <img src={ Feed.slider[props.index].image } role="presentation" />
      <div className=" text " > { Feed.slider[props.index].text } </div>
    </div>
    );
}

export default Slider;
