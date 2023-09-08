import { useState } from 'react'
// import Router
import { Routes, Route, Navigate  } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// Page components
import AuthPage from '../AuthPage/AuthPage';
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
              {/* Routes components in here * - instance of the competent provided as a prop
              only renders the best matching path based on the address bar*/}
              <Route path="/team/new" element={<NewProfilePage />} />
              <Route path="/team" element={<NannyProfilePage />} />
               {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above 
               THIS NEEDS TO BE UPDATED*/}
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
