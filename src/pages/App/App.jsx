// Hooks
import { useState, useEffect } from 'react';

// Routing
import { Routes, Route, Navigate } from 'react-router-dom';
import * as usersAPI from '../../utilities/users-service';

// Pages
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { // ensuring that the user has logged in / signed up before running fetchData()
    if (user) {
      // console.log(user);
      setIsLoading(false);
    }
  }, [user]); 
  
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
                <Route path="/accounts" 
                  element={<AccountPage
                    isLoading={isLoading}
                    user={user}
                    setUser={setUser}
                  />}
                />
                <Route path="/team/find-a-nanny"
                  element={<FindANannyPage
                    user={user}
                    setUser={setUser}
                  />} />
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
