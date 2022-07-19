import { BrowserRouter, Routes, Route } from "react-router-dom";import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditUser from './pages/EditUser';
import EditPost from './pages/EditPost';
import Signup from './pages/Signup';
import AllUsers from './pages/AllUsers';



const App = () => {

      return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/modifierpost" element={<EditPost />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/membres" element={<AllUsers />} />
              <Route path="/modifierprofil" element={<EditUser />} />
              <Route path="/inscription" element={<Signup />} />
              <Route path="/connexion" element={<Login />} />
            </Routes>
          </BrowserRouter>
      );
};

export default App;