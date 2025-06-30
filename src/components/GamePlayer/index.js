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
      userChoice,
      opponentChoice,
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
    const outcomes = {
      ROCK: 'SCISSORS',
      PAPER: 'ROCK',
      SCISSORS: 'PAPER',
    }

    if (userId === opponentId) return 'IT IS DRAW'
    return outcomes[userId] === opponentId ? 'YOU WON' : 'YOU LOSE'
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
        <div className="score-popup-container">
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
          <Popup
            modal
            closeOnDocumentClick
            contentStyle={{
              background: '#ffffff',
              borderRadius: '10px',
              padding: '20px',
              width: '90%',
              maxWidth: '400px',
              margin: 'auto',
            }}
            trigger={
              <button type="button" className="rules-btn">
                RULES
              </button>
            }
          >
            {close => (
              <div className="rule-container">
                <button className="close-btn" type="button" onClick={close}>
                  <IoMdClose className="close-icon" />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  className="rule-img"
                  alt="rules"
                />
              </div>
            )}
          </Popup>
        </div>
        {gameInProgress ? this.renderResultView() : this.renderChoiceView()}
      </div>
    )
  }
}

export default GamePlayer
