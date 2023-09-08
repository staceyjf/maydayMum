import { useState } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"

function AuthPage({user, setUser}) {
  // 'clicked' state variable - data-related
  const [clicked, setClicked] = useState(true);
  // const buttonText = !clicked ? 'Login' : 'Sign up';

  function handleToggle() {
    setClicked(!clicked) // toggle the value which is why it is negative
  }

 return (
   <main>
     <>
        
        {clicked ? (
          <>
            <LoginForm user={user} setUser={setUser} handleToggle={handleToggle}/>
          </>
        ) : (
          <>
            <SignUpForm setUser={setUser} handleToggle={handleToggle}/>
          </>
        )}
      </>
   </main>
 )
}

export default AuthPage