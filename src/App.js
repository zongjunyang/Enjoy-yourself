import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import imageConfig from './images/image-config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }
  
  onChangeIndexHandler = (index, indexLatest, meta) => {
    console.log('page-func: ', index, indexLatest, meta, this);
    this.setState({
      currentIndex: index,
    });
  };
  
  longpressHandler = () => {
    const filmWord = ["We laughed and kept saying\"see u soon\",but inside we both knew we'd never see each other again.  --海上钢琴师",
      "Life was like a box of chocolates, you never know what you’re gonna get. --美丽人生",
      "Happiness is not about being immortal nor having food or rights in one's hand. It’s about having each tiny wish come true, or having something to eat when you are hungry or having someone's love when you need love. --飞屋环游记",
      "Good morning, and in case I don\'t see ya, good afternoon, good evening, and good night! --楚门的世界"]
    
    const randomIndex = ~~(Math.random() * filmWord.length);
    alert(filmWord[randomIndex]);
  };
  
  onTouchStart = () => {
    this.longpressTimer = setTimeout(this.longpressHandler, 1000);
  };
  
  touchDone = () => {
    clearTimeout(this.longpressTimer);
  };
  
  next = () => {
    if (this.state.currentIndex === imageConfig.length - 1) {
      this.setState({currentIndex: 0});
      return;
    }
    
    this.setState({currentIndex: this.state.currentIndex + 1})
  };
  prev = () => {
    if (this.state.currentIndex === 0) {
      this.setState({currentIndex: imageConfig.length - 1});
      return;
    }
    
    this.setState({currentIndex: this.state.currentIndex - 1})
  };
  
  render() {
    return (
      <div className="App unselectable">
        <SwipeableViews
          index={this.state.currentIndex}
          onChangeIndex={this.onChangeIndexHandler}
        >
          {
            imageConfig.map((item, index) => (
              <div className="item-wraper" key={index}>
                <div className="header-wraper">
                  <p className="header-wraper-text">{item.date} ・ {item.location}</p>
                  <p className="header-wraper-text">{item.desc}</p>
                </div>
                <img src={item.image} className="item-img"/>
              </div>
            ))
          }
        </SwipeableViews>
        <div
          className="indicator"
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.touchDone}
          onTouchCancel={this.touchDone}
        >{this.state.currentIndex + 1} / {imageConfig.length}</div>
        <div className="button button-prev" onClick={this.prev}>
          <img src={require('./icon/prev.png')} alt="prev"/>
        </div>
        <div className="button button-next" onClick={this.next}>
          <img src={require('./icon/next.png')} alt="next"/>
        </div>
      </div>
    );
  }
};

export default App;
