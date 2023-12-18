import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { API_LINK } from '../../../utils/Constant';

const BlogPage = () => {
  const user = useSelector((state) => state.user.user);
  const token = user?.data;
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getBlog = async (id) => {
    const config = {
      method: 'get',
      url: `${API_LINK}blogs/${id}`,
      // params: { id: id },
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
        setBlog(response.data.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBlog(id);
  }, []);
  return <div>{blog ? <Blog blog={blog} /> : <p>Loading...</p>}</div>;
};

export default BlogPage;
