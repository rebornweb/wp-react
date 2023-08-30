import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from './components/navigation.jsx';
import Blog from './components/blog.jsx';
import Page from './components/page.jsx';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const apiUrl = "http://tbnztest.rebornweb.co.nz/wp-json/wp/v2/";

  const fetchPosts = () => {
    axios
      .get(`${apiUrl}posts`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const fetchPages = () => {
    axios
      .get(`${apiUrl}pages`)
      .then((res) => {
        setPages(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching pages:', error);
      });
  };

  useEffect(() => {
    fetchPosts();
    fetchPages();
  }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <div className="content">
          <Routes>
            {/* Render posts */}
            <Route path="/" element={posts.map((item) => <Blog key={item.id} post={item} />)} />
            {/* Render specific pages using their IDs */}
            {pages.map(page => (
              <Route
                key={page.id}
                path={`/pages/${page.id}`}
                element={<Page page={page} />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
