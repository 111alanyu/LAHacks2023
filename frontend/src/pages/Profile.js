import { useEffect, useState } from 'react';
import Card from '../utils/Card';

const Profile = () => {

  const [collection, setCollection] = useState([]); 


  return (
    <div id="profilePage">
        <div id="myCard">
          <h1>My Card</h1>
          <Card/>
        </div>
        
        <h1>Card Collection</h1>
        
    </div>
  )
}

export default Profile;