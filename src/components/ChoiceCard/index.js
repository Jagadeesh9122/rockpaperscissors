import './index.css'

const ChoiceCard = props => {
  const {choiceDetails, clickChoiceItem} = props
  const {id, imageUrl} = choiceDetails
  const testid = id.toLowerCase()

  const onClickChoice = () => {
    clickChoiceItem(id)
  }

  return (
    <li className="list-item">
      <button
        className="btn"
        type="button"
        onClick={onClickChoice}
        data-testid={`${testid}Button`}
      >
        <img src={imageUrl} className="choice-item" alt={id} />
      </button>
    </li>
  )
}

export default ChoiceCard
