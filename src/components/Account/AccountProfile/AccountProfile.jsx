import {  Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

function AccountProfile({fullUserProfile, setFullUserProfile}) {


   /* -----Event Handlers ---- */
  // // adding the order to the cart via the add btn
  // async function handleAddToOrder(itemId) {
  //   // Call the addItemToCart function in ordersAPI, 
  //   // passing to it the itemId, and assign the resolved promise to a variable named cart.
  //   const updatedCart = await ordersAPI.addItemToCart(itemId);
  //   // Update the cart state with the updated cart received from the server
  //   setCart(updatedCart);
  // }

  // // programmatically routing via client side 
  // async function handleCheckout() {
  //   await ordersAPI.checkout();
  //   navigate('/orders');
  // }

  return (
    <>
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={fullUserProfile.image}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {fullUserProfile.firstName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >Location: 
            {fullUserProfile.location} 
          </Typography>
        </Box>
      </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  </>
)};

export default AccountProfile