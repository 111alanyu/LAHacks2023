import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { Login, Profile, Card, User } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:id" element={<User />} />
            
          </Routes>
        </Router>
    </div>
  );
}

export default App;
