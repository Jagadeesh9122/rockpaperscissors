import './index.css'

const ChoiceCard = props => {
  const {choiceDetails, clickChoiceItem} = props
  const {id, imageUrl} = choiceDetails

  const onClickChoice = () => {
    clickChoiceItem(id)
  }

  return (
    <li className="list-item">
      <button className="btn" type="button" onClick={onClickChoice}>
        <img src={imageUrl} className="choice-item" />
      </button>
    </li>
  )
}

export default ChoiceCard
