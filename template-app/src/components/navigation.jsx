import React, { useEffect, useState } from "react";
import "../styles/navigation.css";

function Navigation() {
    const [pages, setPages] = useState([]);
    const apiurl = "http://tbnztest.rebornweb.co.nz/wp-json/wp/v2/pages"
    useEffect(() => {
      // Fetch pages from WordPress API
      fetch(apiurl)
        .then(response => response.json())
        .then(data => setPages(data))
        .catch(error => console.error('Error fetching pages:', error));
    }, []);
  
    return (
      
        <nav>
          <ul>
            {/* Display page links */}
            {pages.map(page => (
              <li key={page.id}>
                <a href={`/page/${page.id}`}>
                  {page.title.rendered}
                </a>
              </li>
            ))}
          </ul>
        </nav>
    
    );
  }
  
  export default Navigation;