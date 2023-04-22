import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const user = useParams();
  return (
    <div id="cardPage">
        <p>Insert Card Here</p>
        <p>id: {user.id}</p>
    </div>
  )
}

export default User;