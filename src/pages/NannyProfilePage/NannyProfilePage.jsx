import * as usersService from '../../utilities/users-service'; 

function OrderHistoryPage() {

   async function handleCheckToken() {
     const expDate = await usersService.checkToken();
     console.log(expDate);
   }

    return (
      <>
         <h1>OrderHistoryPage</h1>
         <button onClick={handleCheckToken}>Check Login Expires</button>
      </>   
    )
   }
   
   export default OrderHistoryPage