import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './components/navigation.jsx';
import Blog from './components/blog.jsx';

export default function App() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    const apiurl = "http://tbnztest.rebornweb.co.nz/wp-json/wp/v2/posts";
    axios
      .get(apiurl)
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
      <Navigation />
      <div>
        {posts.map((item) => (
          <Blog key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
}
