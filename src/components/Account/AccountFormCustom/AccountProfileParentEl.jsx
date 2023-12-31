import { CardHeader, Divider, TextField, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import { getBookedDays } from '../../../utilities/account-utils';

function AccountProfileParentEl({ userData, onRoleChange, showButton }) {

  console.log(userData)

  return (
    <>
      <CardHeader
        subheader="Children Details"
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Number of Children"
            name="numberOfChildren"
            onChange={onRoleChange}
            required
            value={userData.parent.numberOfChildren}
          />
        </Grid>
      </Grid>
      {showButton && (
        <> 
          <CardHeader
            subheader="Booking details"
          />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <List>
                {userData.bookings.map((booking) => {
                  const bookedDay = getBookedDays(booking)
                  return (
                    <ListItem key={booking._id}>
                      <ListItemIcon>
                        <SquareIcon />
                      </ListItemIcon>
                      <ListItemText 
                        style={{ textAlign: 'left' }}
                        primary={"Booking no: " + booking.orderId}
                        secondary={"Booked nanny: " + booking.nanny.firstName + "  Booked for: " + bookedDay} 
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </> 
      )}
    </>
  );
}

export default AccountProfileParentEl;
