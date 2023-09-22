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
  const [fullUserProfile, setFullUserProfile] = useState({});
  const [nannyAvailsData, setNannyAvailsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      if (user.role === 'parent') {
        const parentData = await accountsAPI.getParentData();
        setFullUserProfile(parentData);
        setIsLoading(false);
      } else {
        const nannyData = await accountsAPI.getNannyData();
        setFullUserProfile(nannyData);
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
      console.log(user.role);
      fetchProfileData();
    }
  }, [user]);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route index element={<AboutUsPage />} />
          <Route path="/team/find-a-nanny" element={<FindANannyPage />} />
          <Route path="/team/bookings" element={<BookingsPage />} />
          <Route
              path="/accounts/account-profile"
              element={
                <AccountPage
                  isLoading={isLoading}
                  fullUserProfile={fullUserProfile}
                  setFullUserProfile={setFullUserProfile}
                  nannyAvailsData={nannyAvailsData}
                  setNannyAvailsData={setNannyAvailsData}
                />}/>
          <Route path="/users/log-in" element={<AuthPage user={user} setUser={setUser}/>}/>
          <Route path="/users/sign-up" element={<AuthPage user={user} setUser={setUser}/>}/>
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    </main>
  );
}

export default App;
