import { useState } from 'react'
// import Router
import { Routes, Route, Navigate  } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// Page components
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import NewNannyProfilePage from '../NewNannyProfilePage/NewNannyProfilePage';
import FindANannyPage from '../FindANannyPage/FindANannyPage';
import BookingsPage from '../BookingsPage/BookingsPage';
import AuthPage from '../AuthPage/AuthPage';
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
              <Route index element={<AboutUsPage />} />
              <Route path="/users/account" element={<AccountPage user={user} setUser={setUser}/>} />
              <Route path="/users/create-a-nanny-profile" element={<NewNannyProfilePage />} />
              <Route path="/team/find-a-nanny" element={<FindANannyPage />} />
              <Route path="/team/bookings" element={<BookingsPage />} />
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
