import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Login, Profile, Card, User } from './pages';
import {useEffect, useState } from 'react'

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="App">
      <Router>
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
