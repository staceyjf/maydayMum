import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';
import * as accountsAPI from '../../utilities/accounts-api';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import FindANannyPage from '../FindANannyPage/FindANannyPage';
import BookingsPage from '../BookingsPage/BookingsPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(usersAPI.getUser());
  const [nannyAvailsData, setNannyAvailsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  console.log('this is user on the app page', user);

  async function fetchProfileData() {
    try {
      if (user.role === 'parent') {
        setIsLoading(false);
      } else {
        const availabilityData = await accountsAPI.getNannyAvailability();
        setNannyAvailsData(availabilityData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error with calling full user data", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfileData();
    }
  }, [user]);

  return (
    <main className="App">
      {/* Conditionally render NavBar based on the route */}
      {['/users/log-in', '/users/sign-up'].includes(window.location.pathname) ? null : (
        <NavBar user={user} setUser={setUser} />
      )}

      <Routes>
        <Route index element={<AboutUsPage />} />
        <Route path="/team/find-a-nanny" element={<FindANannyPage />} />
        <Route path="/team/bookings" element={<BookingsPage />} />
        <Route
          path="/accounts/account-profile"
          element={
            <AccountPage
              isLoading={isLoading}
              user={user}
              setUser={setUser}
              nannyAvailsData={nannyAvailsData}
              setNannyAvailsData={setNannyAvailsData}
            />
          }
        />
        <Route path="/users/log-in" element={<AuthPage user={user} setUser={setUser} />} />
        <Route path="/users/sign-up" element={<AuthPage user={user} setUser={setUser} />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;
