import React, { Component } from "react";
import "./App.css";
import Length from "./Length";


const playBreaksound=()=>{
  let  breakAudio= new Audio("./beep.mp3")
  // this.breakAudio.setStatecurrentTime=0;
  breakAudio.play();
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 25 * 60,
      breakTime: 5 * 60 ,
      sessionTime:25*60,
      timerOn:false,
      onBreak:false,
    };
    this.formateTime = this.formateTime.bind(this);
    this.changeTime=this.changeTime.bind(this);
    this.controlTime=this.controlTime.bind(this);
    this.resetTime=this.resetTime.bind(this);
    // this.playBreaksound=this.playBreaksound.bind(this);
  }
  
  formateTime = (time) => {
    let miniute = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (miniute < 10 ? "0" + miniute : miniute) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  changeTime=(amount,type)=>{
      if(type ==="break"){
        if(this.state.breakTime<=60 && amount<0){
          return;
        }
        this.setState({
          breakTime:this.state.breakTime+amount
        })
      }else{
        if(this.state.sessionTime<=60 && amount<0){
          return;
        }
        this.setState({
          sessionTime:this.state.sessionTime+amount

        })
        if(!this.state.timerOn){
          this.setState({
            display:this.state.display+amount
          })
      }

      }
  }//end of change time function
  controlTime=()=>{
    let s=1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + s;
    let onBreakVariable=this.state.onBreak;
    if(!this.state.timerOn){
      let interval=setInterval(() => {
        date=new Date().getTime();
        if(date>nextDate){
          if(this.state.display<=0 && !onBreakVariable ){
            {playBreaksound()};
            this.setState({
              onBreak:true
            })
            this.setState({
              display:this.state.breakTime
            })
            // return this.state.breakTime;
          }
          else if(this.state.display<=0 && onBreakVariable ){
            {playBreaksound()};
            this.setState({
              onBreak:false
            })
            
            this.setState({
              display:this.state.sessionTime
            })
            // return this.state.sessionTime;
          }
          this.setState({
            
            display:this.state.display-1
          })  
          nextDate+=s;
        }
      }, 30);
      
      // this.setState({
      //   timerOn:true
      // })
      localStorage.clear();
      localStorage.setItem('interval-id',interval)
    }//end of if
    if(this.state.timerOn){
      clearInterval(localStorage.getItem('interval-id'));
    }

      this.setState({
        timerOn:!this.state.timerOn
      })
    
  }//end of control time
  resetTime=()=>{
    this.setState({
      display: 25 * 60,
      breakTime: 5 * 60,
      sessionTime:25*60,

    })

  }//end of resetTIme
  render() {
    return (
      <div>
        <h1 className="main-title">Pomodaro Clock</h1>
        <div className="dualContainer">

        <Length
          title={"break length"}
          changeTime={this.changeTime}
          type={"break"}
          time={this.state.breakTime}
          formateTime={this.formateTime}
          />
        <Length
          title={"session length"}
          changeTime={this.changeTime}
          type={"session"}
          time={this.state.sessionTime}
          formateTime={this.formateTime}
        />
          </div>
        <h3>{this.state.onBreak? "Break" : "session"}</h3>
        <h1 className="display-title">{this.formateTime(this.state.display)}</h1>
        <button className="display-title" onClick={this.controlTime}>
        {this.state.timerOn?"pause":"start"}
        </button>
        <button className="display-title" onClick={this.resetTime}>
          Reset
        </button>
      </div>
    );
  }
}
