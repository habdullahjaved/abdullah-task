import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, TextField, Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const styles = {
  height: '100vh',
};

const gridOneStyle = {
  height: '100vh',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#3949AB',
};

const LoginForm = () => (
  <form>
    <Typography variant='h4'>Login</Typography>
    <TextField margin='normal' fullWidth />
    <TextField type='password' margin='normal' fullWidth />
    <Button variant='contained' color='primary' fullWidth>
      Sign In
    </Button>
  </form>
);

export default function Test() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Left Section - Info */}
        <Grid item xs={12} md={6} sx={gridOneStyle}>
          <Item>
            {/* Add your content like image, title, etc. */}
            <Typography variant='h4'>Section 1</Typography>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
              voluptatibus, corporis, recusandae numquam quae accusantium
              inventore sequi magnam, doloremque id perspiciatis! Aperiam, quam
              dolorem! Sunt dolorum perspiciatis corporis illo natus maiores
              expedita officiis voluptate. Totam, similique! Provident
              aspernatur eos esse inventore, quidem architecto nisi! Delectus
              possimus dolore, quis, mollitia iste similique nesciunt ex
              voluptatibus sed vel a. Facere eos quisquam sit magni maxime
              tempora optio omnis error laboriosam. Quisquam praesentium, nisi
              animi nobis sint in consequuntur quis dolor inventore quas optio
              non, beatae error fugit soluta dolorem libero pariatur architecto!
              Eligendi fugiat corrupti nobis voluptas nesciunt esse, provident
              illum ratione.
            </p>
          </Item>
        </Grid>

        {/* Right Section - Form */}
        <Grid item xs={12} md={6}>
          <Item>
            <LoginForm />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
