import { useState } from 'react'
// import Router
import { Routes, Route, Navigate  } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// Page components
import AuthPage from '../AuthPage/AuthPage';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import NewProfilePage from '../NewProfilePage/NewProfilePage';
import NannyProfilePage from '../NannyProfilePage/NannyProfilePage';
// Components
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
    {/* conditionally render based on user - this has the NavBar only for logged in users*/}
    { user ?
        <>
          <NavBar user={user} setUser={setUser}/>
            <Routes>
               {/* index route */}
              {/* <Route index element={<AboutUsPage />} /> */}
              <Route path="/users/account" element={<AccountPage />} />
              <Route path="/team/new" element={<NewProfilePage />} />
              <Route path="/team" element={<NannyProfilePage />} />
               {/* catch all route */}
              <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </> 
        :
        <AuthPage user={user} setUser={setUser} />
    }

    </main>
  );
}

export default App;
