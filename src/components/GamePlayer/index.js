import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
import {Component} from 'react'
import ChoiceCard from '../ChoiceCard'

import './index.css'

class GamePlayer extends Component {
  state = {
    scoreValue: 0,
    gameInProgress: false,
    userChoice: null,
    opponentChoice: null,
    result: '',
  }

  clickChoiceItem = id => {
    const {choicesList} = this.props
    const randomItem = Math.floor(Math.random() * choicesList.length)
    const opponentChoice = choicesList[randomItem]
    const userChoice = choicesList.find(choice => choice.id === id)

    this.setState({
      gameInProgress: true,
      userChoice: userChoice,
      opponentChoice: opponentChoice,
    })

    const opponentId = opponentChoice.id
    const userId = userChoice.id

    const displayTxt = this.renderResult(opponentId, userId)

    if (displayTxt === 'YOU WON') {
      this.setState(prevState => ({
        scoreValue: prevState.scoreValue + 1,
        result: displayTxt,
      }))
    } else if (displayTxt === 'YOU LOSE') {
      this.setState(prevState => ({
        scoreValue: prevState.scoreValue - 1,
        result: displayTxt,
      }))
    } else {
      this.setState(prevState => ({
        scoreValue: prevState.scoreValue,
        result: displayTxt,
      }))
    }
  }

  renderResult = (opponentId, userId) => {
    if (userId === 'PAPER' && opponentId === 'ROCK') {
      return 'YOU WON'
    }
    if (userId === 'SCISSORS' && opponentId === 'ROCK') {
      return 'YOU LOSE'
    }
    if (userId === 'ROCK' && opponentId === 'PAPER') {
      return 'YOU LOSE'
    }
    if (userId === 'SCISSORS' && opponentId === 'PAPER') {
      return 'YOU WON'
    }
    if (userId === 'ROCK' && opponentId === 'SCISSORS') {
      return 'YOU WON'
    }
    if (userId === 'PAPER' && opponentId === 'SCISSORS') {
      return 'YOU LOSE'
    } else {
      return 'IT IS DRAW'
    }
  }

  onPlayAgain = () => {
    this.setState({gameInProgress: false})
  }

  renderResultView = () => {
    const {userChoice, opponentChoice, result} = this.state

    return (
      <div className="result-view">
        <div className="results">
          <div className="result-cont">
            <h3 className="you-opp">YOU</h3>
            <img
              src={userChoice.imageUrl}
              alt="your choice"
              className="choice-item"
            />
          </div>
          <div className="result-cont">
            <h3 className="you-opp">OPPONENT</h3>
            <img
              src={opponentChoice.imageUrl}
              alt="opponent choice"
              className="choice-item"
            />
          </div>
        </div>
        <p className="result">{result}</p>
        <button type="button" className="play-btn" onClick={this.onPlayAgain}>
          Play Again
        </button>
      </div>
    )
  }

  renderChoiceView = () => {
    const {choicesList} = this.props
    return (
      <>
        <ul className="choices-list">
          {choicesList.map(eachChoice => (
            <ChoiceCard
              key={eachChoice.id}
              choiceDetails={eachChoice}
              clickChoiceItem={this.clickChoiceItem}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {scoreValue, gameInProgress} = this.state

    return (
      <div className="game-background">
        <div className="card-1">
          <h1 className="game-title">
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div className="score-container">
            <p className="score">SCORE</p>
            <p className="score-value">{scoreValue}</p>
          </div>
        </div>
        {gameInProgress ? this.renderResultView() : this.renderChoiceView()}

        <Popup
          trigger={
            <button type="button" className="rules-btn">
              RULES
            </button>
          }
          position="center-center"
        >
          {close => (
            <div className="rule-container">
              <button
                className="close-btn"
                type="button"
                onClick={() => close()}
              >
                <IoMdClose className="close-icon" />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                className="rule-img"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default GamePlayer
