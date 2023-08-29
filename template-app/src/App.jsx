import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './components/blog.jsx';

export default function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get('http://localhost:70/wp-json/wp/v2/posts') //For local use 'http://localhost:port/wp-json/wp/v2/posts'
      .then((res) => {
        setPosts(res.data);
        console.log(res.data); 
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((item) => (
        <Blog key={item.id} post={item} /> 
      ))}
    </div>
  );
}
