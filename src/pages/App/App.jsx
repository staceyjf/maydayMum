import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import FindANannyPage from '../FindANannyPage/FindANannyPage';
import BookingsPage from '../BookingsPage/BookingsPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isLoading, setIsLoading] = useState(true); 
  console.log('this is user on the app page', user)
 
  // Fetch initial user data
  useEffect(() => {
    async function fetchProfileData() {
      try {
        const userData = await usersAPI.getUser();
        console.log('My useEffect is running')
        setUser(userData);
        updateUserState(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error with fetching user data", error);
      }
    }

    fetchProfileData();
  }, []);

  // update the user in state / session storage
  function updateUserState(updatedData) {
    localStorage.setItem('user', JSON.stringify(updatedData));
  };

  return (
    <main className="App">
      {['/users/log-in', '/users/sign-up'].includes(window.location.pathname) ? null : (
        <NavBar user={user} setUser={setUser} />
      )}
      {isLoading
        ? ( <div>Loading...</div> ) 
        : (
          <Routes>
            <Route path="/team/find-a-nanny" element={<FindANannyPage />} />
            <Route path="/team/bookings" element={<BookingsPage />} />
            <Route
              path="/accounts/account-profile"
              element={
                <AccountPage
                  user={user}
                  setUser={setUser}
                  updateUserState={updateUserState}
                  />
              }
            />
            <Route path="/users/log-in" element={<AuthPage user={user} setUser={setUser} />} />
            <Route path="/users/sign-up" element={<AuthPage user={user} setUser={setUser} />} />
            <Route path="/"  element={<AboutUsPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
    </main>
  );
}
  
export default App;
