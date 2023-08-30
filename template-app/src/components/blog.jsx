import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/blog.css";

export default function Blog({ post }) {
  const [featuredImage, setFeaturedImage] = useState();

  const getImage = () => {
    if (post?._links["wp:featuredmedia"] && post._links["wp:featuredmedia"][0]?.href) {
      axios
        .get(post._links["wp:featuredmedia"][0].href)
        .then((response) => {
          // Ensure the response has the expected structure
          if (response.data && response.data.source_url) {
            setFeaturedImage(response.data.source_url);
          } else {
            console.error('Featured image data is missing or invalid:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching featured image:', error);
        });
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="container">
      <div className="blog-container">
        {featuredImage && (
          <img className='mask' src={featuredImage} alt="Blog Post Image" />
        )}
        <h2 className="blog-title">{post.title.rendered}</h2>
        <p className="blog-date">
          {new Date(Date.now()).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p
          className="blog-excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </div>
  );
}
