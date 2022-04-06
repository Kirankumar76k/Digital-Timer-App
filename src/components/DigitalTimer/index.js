import {Component} from 'react'
import './index.css'

const initialState = {
  toggleSwitch: false,
  TimeInSeconds: 0,
  IntialTimer: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecrease = () => {
    const {IntialTimer} = this.state
    if (IntialTimer > 1) {
      this.setState(prevState => ({IntialTimer: prevState.IntialTimer - 1}))
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({IntialTimer: prevState.IntialTimer + 1}))
  }

  onResetBtnClick = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  IncrementedTimeInSeconds = () => {
    const {IntialTimer, TimeInSeconds} = this.state
    const isTimerCompleted = TimeInSeconds === IntialTimer * 60
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({toggleSwitch: false})
    } else {
      this.setState(prevState => ({
        TimeInSeconds: prevState.TimeInSeconds + 1,
      }))
    }
  }

  onClickStartPauseBtn = () => {
    const {toggleSwitch, IntialTimer, TimeInSeconds} = this.state

    const isTimerCompleted = TimeInSeconds === IntialTimer * 60
    if (isTimerCompleted) {
      this.setState({TimeInSeconds: 0})
    }
    if (toggleSwitch) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.IncrementedTimeInSeconds, 1000)
    }
    this.setState(prevState => ({toggleSwitch: !prevState.toggleSwitch}))
  }

  getTimeInStopClock = () => {
    const {IntialTimer, TimeInSeconds} = this.state
    const totalRemainingSeconds = IntialTimer * 60 - TimeInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 0 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {toggleSwitch, IntialTimer, TimeInSeconds} = this.state
    const startPauseTxt = toggleSwitch ? 'Pause' : 'Start'
    const startPauseImg = toggleSwitch
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const LabelText = toggleSwitch ? 'Running' : 'Paused'
    const startPauseAlttext = toggleSwitch ? 'pause icon' : 'play icon'
    const isBtnDisaplayed = TimeInSeconds > 0
    return (
      <div className="bg-container">
        <div className="responsive-container">
          <h1 className="heading">Digital Timer</h1>
          <div className="digital-timer-container">
            <div className="timer-bg">
              <div className="inside-bg">
                <h1 className="time">{this.getTimeInStopClock()}</h1>
                <p className="time-status">{LabelText}</p>
              </div>
            </div>
            <div className="digital-cls">
              <div className="pause-reset-container">
                {/* <div className="pause-conainert"> */}
                <button
                  className="transparent-btn pause-container"
                  type="button"
                  onClick={this.onClickStartPauseBtn}
                >
                  <img
                    src={startPauseImg}
                    alt={startPauseAlttext}
                    className="small-icon"
                  />
                  <p className="start-name">{startPauseTxt}</p>
                </button>
                {/* </div> */}
                {/* <div className="pause-container"> */}
                <button
                  className="transparent-btn pause-container"
                  type="button"
                  onClick={this.onResetBtnClick}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="small-icon"
                  />
                  <p className="start-name">reset</p>
                </button>

                {/* </div> */}
              </div>
              <p className="limit-name">Set Timer limit</p>
              <div className="set-timer-container">
                <button
                  className="transparent-btn btn2"
                  type="button"
                  onClick={this.onDecrease}
                  disabled={isBtnDisaplayed}
                >
                  -
                </button>
                <div className="count-container">
                  <p className="count-name">{IntialTimer}</p>
                </div>
                <button
                  className="transparent-btn btn2"
                  type="button"
                  onClick={this.onIncrease}
                  disabled={isBtnDisaplayed}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
