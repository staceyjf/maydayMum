import * as usersService from '../../utilities/users-service'; 

function NannyProfilePage() {

   async function handleCheckToken() {
    //  const expDate = await usersService.checkToken();
    //  console.log(expDate);
   }

    return (
      <>
         <h1>Nanny List page</h1>
         {/* <button onClick={handleCheckToken}>Check Login Expires</button> */}
      </>   
    )
   }
   
   export default NannyProfilePage