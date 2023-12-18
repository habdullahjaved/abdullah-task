import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router';
const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), {
    addSuffix: true,
  });

  const handleClick = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <Card
      sx={{ padding: '5px', backgroundColor: '#F6F7FA', cursor: 'pointer' }}
      onClick={() => handleClick(blog._id)}
    >
      <CardMedia
        component='img'
        height='140'
        image={blog.image}
        alt={blog.title}
      />
      <CardContent>
        <Typography variant='caption' color='text.secondary'>
          {timeAgo}
        </Typography>
        <Typography variant='h6'>{blog.title}</Typography>
        <Typography variant='body2' color='text.secondary'>
          {blog.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
