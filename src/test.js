const sound = document.getElementById("beep");

class Timer extends React.Component{
  constructor(props) {
  
    super(props);
        
    this.state = {
      brkLength : 5,
      sesLength : 25,
      timerState : 'Stopped',
      timerType: 'Session',
      timeLeft : 25*60,
      loop: undefined
    };
    this.setBrkLength = this.setBrkLength.bind(this)
    this.setSesLength = this.setSesLength.bind(this)
    this.resetBtn = this.resetBtn.bind(this)
    this.clockify = this.clockify.bind(this)
    this.StartStop = this.StartStop.bind(this)
    
  }
  setBrkLength(e){
    if (this.state.timerState == "Running") return;
    if(e.currentTarget.value == "minus"){
      if(this.state.brkLength <=1) return;
    this.setState ({brkLength : this.state.brkLength - 1});
    } else if(e.currentTarget.value == "plus"){
       if(this.state.brkLength >=60) return;
      this.setState ({brkLength : this.state.brkLength + 1});
    } 
  }
  setSesLength(e){
     if (this.state.timerState == "Running") return;
    if(e.currentTarget.value == "minus"){
      if(this.state.sesLength <=1) return;
    this.setState ({sesLength : this.state.sesLength - 1,
                   timeLeft : this.state.timeLeft - 60});
    } else if(e.currentTarget.value == "plus"){
       if(this.state.sesLength >=60) return;
      this.setState ({sesLength : this.state.sesLength + 1,
                     timeLeft: this.state.timeLeft + 60});
    }
  }
  
  StartStop = () => {
  
    if (this.state.timerState == "Running"){
            
      this.setState({timerState : "Stopped"});
      clearInterval(this.state.loop);

    } else {
      this.setState({timerState: "Running"}),
    this.state.loop = setInterval(() => {
      const {timeLeft, 
             timerType,
             brkLength,
             sesLength
            } = this.state;
      if (timeLeft === 0) {
          this.setState({
            timerType : (timerType === "Session") ? "Break" : "Session",
            timeLeft : (timerType === "Session") ? 
                       (brkLength * 60) : (sesLength * 60)
          });
        sound.currentTime = 0;   
        sound.play();
          
          } else {
        this.setState({
          timeLeft : (timeLeft - 1)
        });
      }  
      },1000);
    }    
  }
  
  componentWillUnmount(){
      clearInterval(this.state.loop);
    }


  
  resetBtn(){
    this.setState({
      brkLength : 5,
      sesLength : 25,
      timerState : 'Stopped',
      timerType: 'Session',
      timeLeft : 1500
    });
    clearInterval(this.state.loop);
    sound.pause();
    sound.currentTime=0;
  }
  
  clockify(){
    let minutes = Math.floor(this.state.timeLeft / 60);
    let seconds = this.state.timeLeft - minutes * 60;
    minutes = minutes<10 ? '0' + minutes : minutes;
    seconds = seconds<10 ? '0' + seconds : seconds;    
    return minutes + ':' + seconds;
  }
  
  render(){
    return(
    <div id="container">
        <h1>Pomodoro Clock</h1>
        <br/>
        <div className = "length-control">
        <p id= "break-label">Break Length</p> 
          <button id="break-decrement"
          onClick = {this.setBrkLength}
          value = "minus"
            className = "length-items">
          <i className="fa fa-minus-circle"/></button>
          <div id= "break-length" className = "length-items">{this.state.brkLength}</div>
        <button id="break-increment"
          onClick = {this.setBrkLength}
          value = "plus"
          className = "length-items"> 
          <i className="fa fa-plus-circle"/></button>
        </div>
        
        <div className = "length-control">
        <p id= "session-label" >Session Length</p>
        <button id="session-decrement"
          onClick = {this.setSesLength}
          value = "minus"
          className = "length-items"> 
          <i className="fa fa-minus-circle"/></button>
          <div id="session-length" className = "length-items">{this.state.sesLength}</div>
        <button id="session-increment"
          onClick = {this.setSesLength}
          value = "plus"
          className = "length-items">
          <i className="fa fa-plus-circle"/></button>
        </div>
        <br/>
        <div>
          
          <div id="timer-contain">
            <p id="timer-label">{this.state.timerType}</p>
            {this.state.timerState}
            <p id = "time-left">{this.clockify()}</p>
          </div>
          
          
        <button id="start_stop"
          onClick = {this.StartStop}>
          <i className="fa fa-play fa-2x"/>
          <i className="fa fa-pause fa-2x"/> </button>
        <button id="reset"
          onClick = {this.resetBtn}>
          <i className="fa fa-refresh fa-2x"></i> </button>
        </div>
    </div>
    )
  }
}

ReactDOM.render(<Timer />, document.getElementById('app'))