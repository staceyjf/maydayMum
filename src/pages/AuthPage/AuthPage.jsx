import { useState } from 'react'
import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from "../../components/SignUpForm/SignUpForm"

function AuthPage({user, setUser}) {
  // 'clicked' state variable - data-related
  const [clicked, setClicked] = useState(true);
  const buttonText = !clicked ? 'Login' : 'Sign up';

  function handleToggle() {
    setClicked(!clicked) // toggle the value which is why it is negative
  }

 return (
   <main>
     <>
        
        {clicked ? (
          <>
            <h1>Login</h1>
            <LoginForm user={user} setUser={setUser} />
          </>
        ) : (
          <>
            <h1>Sign up</h1>
            <SignUpForm setUser={setUser} />
          </>
        )}
        <button onClick={handleToggle}>{buttonText}</button>
      </>
   </main>
 )
}

export default AuthPage