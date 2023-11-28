import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';
import AboutUsPage from '../AboutUsPage/AboutUsPage';
import AccountPage from '../AccountPage/AccountPage';
import FindANannyPage from '../FindANannyPage/FindANannyPage';
import BookingsPage from '../BookingsPage/BookingsPage';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';

function App() {
  const [user, setUser] = useState({});
  const [booking, setBooking] = useState({}); 
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // user's current location 

  // Fetch initial user data
  useEffect(() => {
    async function fetchProfileData() {
      try {
        const userData = await usersAPI.getUser();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error with fetching user data", error);
      }
    }

    fetchProfileData();
  }, []);

  const showNavBar = !['/users/log-in', '/users/sign-up'].includes(location.pathname);

  return (
    <main className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {showNavBar && <NavBar user={user} setUser={setUser} />}
          <Routes>
            <Route path="/team/find-a-nanny" element={
              <FindANannyPage 
                user={user}
                setUser={setUser}
                booking={booking}  
                setBooking={setBooking}/>} 
              />
            <Route path="/team/booking" element={
              <BookingsPage 
                user={user}
                setUser={setUser} 
                booking={booking} 
                setBooking={setBooking}/>}  
              />
            <Route
              path="/accounts/account-profile"
              element={<AccountPage user={user} setUser={setUser} />}
            />
            <Route path="/users/log-in" element={
              <AuthPage 
                user={user} 
                setUser={setUser} />} 
              />
            <Route path="/users/sign-up" element={
              <AuthPage 
                user={user} 
                setUser={setUser} />} 
              />
            <Route path="/" element={<AboutUsPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </main>
  );
}

export default App;
