import {  Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

function AccountProfile({user}) {
  // console.log('this is the account profile component fulluserprofile', fullUserProfile);
  // const [image, setImage] = useState('');

  // function uploadImage(image) {
  //   const data = new FormData()
  //   data.append("file", image)
  //   data.append("upload_preset", "react-uploads")
  //   data.append("cloud_name", "maydaymum")
  //   return fetch(" https://api.cloudinary.com/v1_1/maydaymum/image/upload ",{
  //       method:"post",
  //       body: data
  //   })
  //   .then(res => res.json())
  //   .catch(err => console.log(err))
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
            src={user.image}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
              color: '#fff',
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.fullName}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          > 
            {user.location} 
          </Typography>
        </Box>
      </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
        type="file"
        
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  </>
)};

export default AccountProfile