// YourMainComponent.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import BlogList from './BlogList';
import { API_LINK } from '../../utils/Constant';
import { useSelector } from 'react-redux';
import { Box, Grid, Stack, Typography } from '@mui/material';

const Blogs = () => {
  const user = useSelector((state) => state.user.user);
  const token = user?.data;
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getBlogs = async (page) => {
    const config = {
      method: 'get',
      url: `${API_LINK}blogs?page=${page}&limit=${perPage}`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios(config);
      if (response.data.message === 'Success') {
        setIsLoading(false);
        setBlogs(response.data.data.result);
        setTotalPages(response.data.data.page_total);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs(currentPage);
  }, [currentPage]); // Fetch blogs when currentPage changes

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        padding: '10px',
      }}
    >
      <Typography variant='h4' sx={{ color: '#3E53D7' }}>
        Articles
      </Typography>
      <Grid>
        <BlogList blogs={blogs} sx={{ marginBottom: '10px' }} />
      </Grid>
      <Grid>
        <Stack spacing={2} sx={{ textAlign: 'right' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              marginLeft: 'auto !important',
              '& .MuiPaginationItem-root': {
                borderRadius: '50%',
              },
              '& .MuiPaginationItem-contained': {
                backgroundColor: 'primary.main',
                color: 'white',
              },
              '& .MuiPaginationItem-contained:hover': {
                backgroundColor: 'primary.dark',
              },
              '& .Mui-selected': {
                backgroundColor: 'primary.dark',
              },
            }}
          />
        </Stack>
      </Grid>
    </Box>
  );
};

export default Blogs;
