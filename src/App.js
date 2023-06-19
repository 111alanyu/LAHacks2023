import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Login, Profile, Card, User } from './pages';
import {useEffect, useState } from 'react'
import { auth } from "./firebase-config"
import { signOut } from 'firebase/auth';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <div className="App">
      
      <Router>
        <nav>
          {!isAuth ? (
            <div></div>
          ):(
            <button onClick={signUserOut}>Log out</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
