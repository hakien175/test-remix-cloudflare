import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLoaderData,
  Form,
  useNavigate
} from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { json } from "@remix-run/node";

// Change this import to use the compiled CSS file
import stylesUrl from "~/styles/global.css?url";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    // { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" },
    { rel: "icon", href: "/favicon.ico" }
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: "ABCya 3: ABCya Games, ABCya3 Online - Free Educational Games for Kids" },
    { name: "description", content: "ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more. Perfect for classroom and home learning.ABCya add new games every day and Free Online Games for Kids." },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ];
};

// Add a loader to provide initial state for server-side rendering
export const loader = async () => {
  return json({
    // Any global data you want to provide to all routes
    env: {
      NODE_ENV: process.env.NODE_ENV,
    }
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  
  // Now use data.env instead of process.env directly
  const isDevelopment = data.env.NODE_ENV === "development";
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Add state for back to top button
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Listen for scroll events to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Focus the search input when the modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [searchOpen]);
  
  // Handle search form submission
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('q') || '';
    
    // Navigate to new search URL format
    setSearchOpen(false);
    navigate(`/s=${encodeURIComponent(query.toString())}`);
  };
  
  // Use useEffect for client-side only code
  useEffect(() => {
    // Any client-side only initialization
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);
  
  // Close search modal when clicking outside
  useEffect(() => {
    if (!searchOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);
  
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        
        {/* Script to detect JavaScript and add a class to the HTML element */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.classList.remove('no-js');
            document.documentElement.classList.add('js');
          `
        }} />
      </head>
      <body className={searchOpen ? 'modal-open' : ''} suppressHydrationWarning={true}>
        <header>
          <div className="top-bar">
            <div className="container">
              <div className="top-links">
                <Link to="/information-for-parents">Information for Parents</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/testimonials">Testimonials</Link>
              </div>
            </div>
          </div>
          
          <nav className="main-nav">
            <div className="container">
              {/* Logo */}
              <div className="logo">
                <Link to="/">
                  <img src="https://media.abcya3.net/logo1.jpg" alt="ABCya3" />
                </Link>
              </div>
              
              {/* Mobile menu button */}
              <button 
                className="mobile-menu-button" 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`menu-icon ${menuOpen ? 'active' : ''}`}></span>
              </button>
              
              {/* Navigation links */}
              <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <Link to="/all-categories" className="nav-link">All Category</Link>
                <Link to="/hot-games" className="nav-link">Hot</Link>
                <Link to="/skibidi-toilet-games" className="nav-link">Skibidi Toilet</Link>
                <Link to="/cooking" className="nav-link">Cooking</Link>
                <Link to="/puzzle" className="nav-link">Puzzle</Link>
                <Link to="/action" className="nav-link">Action</Link>
                <Link to="/racing" className="nav-link">Racing</Link>
                <Link to="/sports" className="nav-link">Sports</Link>
                <Link to="/io-games" className="nav-link">.IO</Link>
                <Link to="/girls" className="nav-link">Girls</Link>
                <Link to="/shooting" className="nav-link">Shooting</Link>
                <Link to="/math" className="nav-link">Math</Link>
              </div>
              
              {/* Search button */}
              <div className="search-container">
                <button 
                  className="search-button"
                  onClick={() => setSearchOpen(!searchOpen)} 
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/>
                  </svg>
                </button>
                
                {/* Search Modal */}
                {searchOpen && (
                  <div className="search-modal">
                    <Form method="get" action="/s=" onSubmit={handleSearchSubmit}>
                      <div className="search-input-container">
                        <input 
                          type="text" 
                          name="q" 
                          placeholder="Enter your search game" 
                          ref={searchInputRef}
                        />
                        <button type="submit" className="search-submit">SEARCH</button>
                      </div>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
        
        <main>
          <Outlet />
        </main>
        
        <footer>
          <div className="container">
            <div className="footer-grid">
              <div className="footer-column">
                <h3>About ABCya3</h3>
                <p>ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more.</p>
              </div>
              
              <div className="footer-column">
                <h3>Quick Links</h3>
                <ul>
                  <li><Link to="/games/popular">Popular Games</Link></li>
                  <li><Link to="/games/new">New Games</Link></li>
                  <li><Link to="/games/skill">Skill Games</Link></li>
                  <li><Link to="/games/puzzle">Puzzle Games</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3>Resources</h3>
                <ul>
                  <li><Link to="/parents">Parents Section</Link></li>
                  <li><Link to="/teachers">Teachers Section</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms of Use</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3>Legal</h3>
                <ul>
                  <li><Link to="/terms">Terms of Service</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                  <li><Link to="/cookies">Cookie Policy</Link></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3>Connect With Us</h3>
                <div className="social-links">
                  <a href="https://www.youtube.com/channel/UCJeShGXn8D7x-oC01lhmvTA" target="_blank" rel="noopener noreferrer">Youtube channel</a>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} ABCya3. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        {/* Back to Top Button - Now in root layout */}
        {showBackToTop && (
          <button 
            className="back-to-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        )}
        
        <ScrollRestoration />
        <Scripts />
        {isDevelopment && <LiveReload />}
      </body>
    </html>
  );
}



























