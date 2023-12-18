import React from 'react';
import Grid from '@mui/material/Grid';
import BlogCard from './BlogCard';

const BlogList = ({ blogs }) => {
  return (
    <Grid container spacing={2}>
      {blogs.map((blog) => (
        <Grid item key={blog._id} xs={12} sm={6} md={4}>
          <BlogCard blog={blog} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;
