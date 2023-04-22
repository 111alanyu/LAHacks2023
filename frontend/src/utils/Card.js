import './Card.css'

const Card = (props) => {
  return (
    <div className='card'>
      <p>Name: {props.name}</p>
      <p>Hometown: {props.hometown}</p>
      <p>Notes: {props.notes}</p>
    </div>
  )
}

export default Card;