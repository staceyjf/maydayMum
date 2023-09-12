import { useState, useEffect } from 'react'
// import Router
import { Routes, Route, Navigate  } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// API calls
import * as usersAPI from '../../utilities/accounts-api';
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
  const [user, setUser] = useState(getUser()); // associate token with the user 
  const [fullUserProfile, setFullUserProfile ] = useState({});
  const [isLoading, setIsLoading] = useState(true); // 

  useEffect(function() {
    async function fetchData() {
      try {
        if (user.role === 'parent') {
          const parentData = await usersAPI.getParentData();
          setFullUserProfile(parentData); // 
        } else {
          const nannyData = await usersAPI.getNannyData();
          setFullUserProfile(nannyData);
        }
        setIsLoading(false); // FullUserProfile has successfully loaded, safe to render
      } catch (error) {  
        console.error("Error with calling full user data", error);
        setIsLoading(false); 
      }
      setIsLoading(false);
    }
    fetchData();
  }, [user.role]);

  return (
    <main className="App">
    {/* conditionally render based on user - this has the NavBar only for logged in users*/}
    { user ?
        <>
          <NavBar user={user} setUser={setUser}/>
            <Routes>
               {/* index route */}
              <Route index element={<AboutUsPage />} />
              <Route path="/accounts" element={<AccountPage isLoading={isLoading} fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>} />
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
