import { useState } from 'react'
// import Router
import { Routes, Route } from 'react-router-dom';
import { getUser } from "../../utilities/users-service"
// Page components
import AuthPage from "../AuthPage/AuthPage"
import NewOrderPage from "../NewOrderPage/NewOrderPage"
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage"
// Components
import NavBar from "../../components/NavBar/NavBar"

import './App.css';
// don't need to import react with later versions of react


function App() {
  // // user state using useState hook
  // const [ user, setUser ] = useState(null);
  // updating now with the token logic defined
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
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </> 
        :
        <AuthPage user={user} setUser={setUser} />
    }

    
  
    </main>
  );
}

export default App;
