import React, { Component } from "react";
import "./App.css";
import Length from "./Length";
import audio from './beep.mp3';

const playBreaksound = () => {
  var breakAudio = new Audio(audio);
  // console.log(breakAudio.currentTime)
  breakAudio.currentTime = 0;
  breakAudio.play();
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 25*60,
      breakTime: 5*60 ,
      sessionTime: 25*60,
      timerOn: false,
      onBreak: false,
    };
    this.formateTime = this.formateTime.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.controlTime = this.controlTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    // this.playBreaksound=this.playBreaksound.bind(this);
  }

  formateTime = (time) => {
    let miniute = Math.floor(time / 60);
    let seconds = time - miniute*60;
    miniute=miniute < 10 ? "0" + miniute : miniute;
    seconds= seconds < 10 ? "0" + seconds : seconds;
  
    return (miniute+":"+seconds)};

  changeTime = (amount, type) => {
    if (type === "break") {
      if (this.state.breakTime<= 60  && amount<0 || this.state.breakTime>=3600) {
        return;
      }
      else{

        this.setState({
          breakTime: this.state.breakTime + amount,
        });
      }
    } else {
      if (this.state.sessionTime<= 60 && amount<0 || this.state.sessionTime>=3600 ) {
        return;
      }
      else{

        this.setState({
          sessionTime: this.state.sessionTime+ amount,
        });
      }
      if (!this.state.timerOn) {
        this.setState({
          display: this.state.display + amount,
        });
      }
    }
  }; //end of change time function
  controlTime = () => {
    let s = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + s;
    let onBreakVariable = this.state.onBreak;
    if (!this.state.timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          if (this.state.display  <= 0 && !onBreakVariable) {
            {
              playBreaksound();
            }
            this.setState({
              onBreak: true,
            });
            this.setState({
              display: this.state.breakTime,
            });
            // return this.state.breakTime;
          } else if (this.state.display <= 0 && onBreakVariable) {
            {
              playBreaksound();
            }
            this.setState({
              onBreak: false,
            });

            this.setState({
              display: this.state.sessionTime ,
            });
            // return this.state.sessionTime;
          }
          // let miniute = Math.floor(time / 60);
          // let seconds = time - miniute*60;
          //here
          // console.log("experiment",this.formateTime(0.017))
          this.setState({
            display: this.state.display -1,
          });
          nextDate += s;
        }
      }, 30);

      // this.setState({
      //   timerOn:true
      // })
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    } //end of if
    if (this.state.timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    this.setState({
      timerOn: !this.state.timerOn,
    });
  }; //end of control time
  resetTime = () => {
    
    this.controlTime();
    
    this.setState({
      display: 25*60 ,
      breakTime: 5 *60,
      sessionTime: 25*60 ,
    
      // timerOn:false
    });
  }; //end of resetTIme
  render() {
    return (
      <div id="container">
        <h1 className="main-title">Pomodaro Clock</h1>
        <div className="dualContainer">
          <Length
            id="break-label"
            title={"Break Length"}
            butdecid="break-decrement"
            btnincid="break-increment"
            lengthId="break-length"
            changeTime={this.changeTime}
            type={"break"}
            time={this.state.breakTime }
            formateTime={this.formateTime}
          />
          <Length
            id="session-label"
            title={"Session Length"}
            butdecid="session-decrement"
            btnincid="session-increment"
            lengthId="session-length"
            changeTime={this.changeTime}
            type={"session"}
            time={this.state.sessionTime}
            formateTime={this.formateTime}
          />
        </div>
        <h3 id="timer-label">{this.state.onBreak ? "Break" : "session"}</h3>
        <h1 id="time-left" className="display-title">
          {this.formateTime(this.state.display )}
        </h1>
    <audio id = "beep" preload = "auto" src=""/>
        <div className="button-center">
          <button
            id="start_stop"
            className="display-button"
            onClick={this.controlTime}
          >
            {this.state.timerOn ? "pause" : "start"}
          </button>
          <button
            id="reset"
            className="display-button"
            onClick={this.resetTime}
          >
            Reset
          </button>
        </div>

      
      </div>
    );
  }
}
