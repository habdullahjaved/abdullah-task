import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const Blog = ({ blog }) => {
  // const { title, image, createdAt, description } = blog;

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant='h4' gutterBottom>
          {blog?.title}
        </Typography>
        <Card>
          <CardMedia
            component='img'
            height='300'
            image={blog?.image}
            alt={blog?.title}
          />
          <CardContent>
            <Typography variant='subtitle2' color='textSecondary'>
              {new Date(blog?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant='body1' paragraph>
              {blog?.description}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default Blog;
