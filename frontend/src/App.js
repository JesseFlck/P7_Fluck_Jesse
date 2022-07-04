import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/profil" exact element={<Profile />} />
        <Route path="/inscription" exact element={<Signup />} />
        <Route path="/connexion" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
