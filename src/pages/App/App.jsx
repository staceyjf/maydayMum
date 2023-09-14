// Hooks
import { useState, useEffect } from 'react';

// Routing
import { Routes, Route, Navigate, useResolvedPath } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';
import * as accountsAPI from '../../utilities/accounts-api';
// import * as teamAPI from '../../utilities/team-api';

// Page components
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import FindANannyPage from '../FindANannyPage/FindANannyPage';
import BookingsPage from '../BookingsPage/BookingsPage';
import AuthPage from '../AuthPage/AuthPage';
// Components
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(usersAPI.getUser()); // associate token with the user 
  const [fullUserProfile, setFullUserProfile] = useState({}); // combines user with nanny or parent
  const [nannyAvailsData, setNannyAvailsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(function () { // ensuring that the user has logged in / signed up before running fetchData()
    if (user) {
      console.log(user)
      async function fetchProfileData() {
        try {
          if (user.role === 'parent') {
            // const parentData = await accountsAPI.getParentData();
            setFullUserProfile(user);
            setIsLoading(false);
          } else {
            // const nannyData = await accountsAPI.getNannyData();
            // const avaibilityData = await accountsAPI.getNannyAvailability(); // don't need to make another call TODO: FIX
            // setNannyAvailsData(user.weeklyAvaibility);
            setFullUserProfile(user);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error with calling full user data", error);
        }
      }
      fetchProfileData();
    }
  }, [user]); // only needs to run once

  return (
    <main className="App">
      {user ?
        <>
          <NavBar user={user} setUser={setUser} />
          {isLoading
            ? (<div>Loading...</div>)
            :
            (
              <Routes>
                {/* index route */}
                <Route index element={<AboutUsPage />} />
                {/* <Route path="/accounts" element={
                  <AccountPage
                    isLoading={isLoading}
                    fullUserProfile={fullUserProfile}
                    setFullUserProfile={setFullUserProfile}
                    nannyAvailsData={nannyAvailsData}
                    setNannyAvailsData={setNannyAvailsData}
                  />}
                /> */}
                {/* <Route path="/team/find-a-nanny"
                  element={<FindANannyPage
                    nannyAvailsData
                  />} /> */}
                <Route path="/team/bookings" element={<BookingsPage />} />
                {/* catch all route */}
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            )}
        </>
        :
        <AuthPage 
          user={user} 
          setUser={setUser} 
        />
      }

    </main>
  );
}

export default App;
