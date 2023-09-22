import { useState } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'

function AuthPage({user, setUser}) {
  const [clicked, setClicked] = useState(true);

  function handleToggle() {
    setClicked(!clicked) 
  }

 return (
   <main>
      {user ? (
        <>
          <LoginForm 
            user={user} 
            setUser={setUser} 
            handleToggle={handleToggle}
          />
        </>
      ) : (
        <>
          <SignUpForm 
            setUser={setUser} 
            handleToggle={handleToggle}
          />
        </>
      )}
   </main>
 )
}

export default AuthPage