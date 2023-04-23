import Card from '../utils/Card.js';
import { useNavigate, useParams } from "react-router-dom";
import './user.css'

const User = () => {
  const user = useParams();
  return (
    <div id="cardPage">
        <h1>You scanned a <span className='red'>[QSL App Name]</span> QR Code!</h1>
        <p>The person must scan yours back within 30 seconds to see the contents.</p>
        <Card name="fdsf" hometown="ds" notes="dsd"/>
    </div>
  )
}

export default User;