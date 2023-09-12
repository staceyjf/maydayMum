// Hooks
import { useState, useEffect } from 'react'
// Routing
import { Routes, Route, Navigate  } from 'react-router-dom';
import * as usersAPI  from '../../utilities/users-service';
import * as accountsAPI from '../../utilities/accounts-api';
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
  const [user, setUser] = useState(usersAPI.getUser()); // associate token with the user 
  const [fullUserProfile, setFullUserProfile ] = useState({}); // combines user with nanny or parent
  const [nannies, setNannies ] = useState([]); // all nannies
  const [isLoading, setIsLoading] = useState(true);  
  const [isLoadingAllData, setIsLoadingAllData] = useState(true); 

  useEffect(function() {
    async function fetchProfileData() {
      try {
        if (user.role === 'parent') {
          const parentData = await accountsAPI.getParentData();
          setFullUserProfile(parentData); // 
        } else {
          const nannyData = await accountsAPI.getNannyData();
          setFullUserProfile(nannyData);
        }
        setIsLoading(false); // FullUserProfile has successfully loaded, safe to render
      } catch (error) {  
        console.error("Error with calling full user data", error);
        setIsLoading(false); 
      }
      setIsLoading(false);
    }
    fetchProfileData();

    async function fetchAllNannies() {
      try {
        const nannies = await accountsAPI.getAllNannies();
        setNannies(nannies);
      } catch (error) {
        console.error("Error with calling full all nanny data", error);
        setIsLoadingAllData(false);
      }
      setIsLoadingAllData(false);
    }
    fetchAllNannies();
  }, [user.role]);

  return (
    <main className="App">
    { user ?
        <>
          <NavBar user={user} setUser={setUser}/>
            <Routes>
               {/* index route */}
              <Route index element={<AboutUsPage />} />
              <Route path="/accounts" element={<AccountPage isLoading={isLoading} fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>} />
              <Route path="/users/create-a-nanny-profile" element={<NewNannyProfilePage />} />
              <Route path="/team/find-a-nanny" element={<FindANannyPage isLoadingAllData={isLoadingAllData} nannies={nannies} fullUserProfile={fullUserProfile} setFullUserProfile={setFullUserProfile}/>} />
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
