const Card = () => {
  return (
    <div id="card">
        <div>
          <b className="inputHeader">Name</b>
          <input id="nameInput" placeholder="John"></input>
        </div>
        <div>
          <b className="inputHeader">Hometown</b>
          <input id="nameInput" placeholder="Los Angeles, CA"></input>
        </div>
    </div>
  )
}

export default Card;