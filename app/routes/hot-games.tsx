import { json } from "@remix-run/node";
import { useLoaderData, useLocation, Link, useSearchParams, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getHotGames } from "~/utils/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Hot Games - ABCya3" },
    { name: "description", content: "Play the most popular and trending games on ABCya3. Our hot games collection features the most played educational games that kids love." }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "18");
  
  try {
    const result = await getHotGames(page, limit);
    
    return json({
      hotGames: result.games,
      pagination: {
        currentPage: page,
        totalPages: result.totalPages,
        limit
      },
      // Pass environment variables to the client
      env: {
        MEDIA_URL: process.env.MEDIA_URL || ''
      }
    });
  } catch (error) {
    console.error("Error loading hot games:", error);
    return json({
      hotGames: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        limit
      },
      error: "Failed to load hot games. Please try again later.",
      // Pass environment variables to the client
      env: {
        MEDIA_URL: process.env.MEDIA_URL || ''
      }
    });
  }
}

export default function HotGames() {
  const { hotGames, pagination, error, env } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  // Reset loading state when data is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [hotGames]);
  
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
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > pagination.totalPages || isLoading) {
      return; // Prevent unnecessary navigation
    }
    
    setIsLoading(true);
    
    // Create new search params with updated page
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    
    // Navigate to the same route with new search params
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Generate pagination links
  const renderPagination = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    
    // Previous page button
    pages.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className={`pagination-link ${currentPage === 1 ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        &laquo; Prev
      </button>
    );
    
    // First page
    if (currentPage > 3) {
      pages.push(
        <button 
          key={1} 
          onClick={() => handlePageChange(1)}
          className={`pagination-link ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          1
        </button>
      );
    }
    
    // Ellipsis after first page
    if (currentPage > 4) {
      pages.push(<span key="ellipsis-start" className="pagination-ellipsis">...</span>);
    }
    
    // Pages around current page
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={`pagination-link ${currentPage === i ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
    
    // Ellipsis before last page
    if (currentPage < totalPages - 3) {
      pages.push(<span key="ellipsis-end" className="pagination-ellipsis">...</span>);
    }
    
    // Last page
    if (currentPage < totalPages - 2 && totalPages > 3) {
      pages.push(
        <button 
          key={totalPages} 
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-link ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next page button
    pages.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className={`pagination-link ${currentPage >= totalPages ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
        disabled={currentPage >= totalPages || isLoading}
        aria-label="Next page"
      >
        Next &raquo;
      </button>
    );
    
    return pages;
  };
  
  return (
    <div className="container">
      {/* Add canonical link for SEO */}
      <link rel="canonical" href={`${location.pathname}`} />
      
      <div className="hot-games-page">
       
        {/* Ad Section */}
        <section className="ad-section">
          <div className="ad-container">
            <div className="ad-box ad-box-small">
              <div className="ad-placeholder">
                <span>Advertisement</span>
                <span>300 x 250</span>
              </div>
            </div>
            <div className="ad-box ad-box-large">
              <div className="ad-placeholder">
                <span>Advertisement</span>
                <span>970 x 250</span>
              </div>
            </div>
          </div>
        </section>
        
        <div className="section-title">
          <h1>Hot Games</h1>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {/* Hot Games Grid */}
        <section className="games-section">
          <div className="games-grid">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: pagination.limit }).map((_, index) => (
                <div key={`skeleton-${index}`} className="game-card skeleton">
                  <div className="skeleton-img"></div>
                  <div className="game-card-content">
                    <div className="skeleton-title"></div>
                  </div>
                </div>
              ))
            ) : (
              Array.isArray(hotGames) && hotGames.length > 0 ? (
                hotGames.map(game => (
                  <div key={game.id} className="game-card">
                    <img src={env.MEDIA_URL + game.avatar_hq} alt={game.name_en} />
                    <Link to={`/${game.name_en.toLowerCase().replace(/\s+/g, '-')}.html`} className="play-button">Play</Link>
                    <div className="game-card-content">
                      <h3>{game.name_en}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No hot games found. Please try again later.</p>
                </div>
              )
            )}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav aria-label="Pagination" className="pagination-container">
              <div className="pagination">
                {renderPagination()}
              </div>
            </nav>
          )}
        </section>
        
        {/* SEO Content */}
        <section className="seo-content">
          <h2>Popular Games for Kids</h2>
          <p>
            Our hot games collection features the most popular and trending educational games that kids love. 
            These games have been played millions of times by children around the world, making them the top choices 
            for fun and learning.
          </p>
          
          <h3>Why Kids Love Our Hot Games</h3>
          <p>
            The games in our hot collection are designed to be both entertaining and educational. 
            They feature engaging gameplay, colorful graphics, and intuitive controls that make them 
            accessible to children of all ages. Whether your child is interested in math, reading, science, 
            or just wants to have fun, our hot games collection has something for everyone.
          </p>
          
          <h3>Educational Benefits</h3>
          <p>
            While kids are having fun playing these popular games, they're also developing important skills. 
            Our hot games help improve problem-solving abilities, critical thinking, hand-eye coordination, 
            and subject-specific knowledge. Parents and teachers appreciate that children can learn while playing 
            games they genuinely enjoy.
          </p>
          
          <h3>Regularly Updated</h3>
          <p>
            Our hot games collection is regularly updated based on player activity and feedback. 
            We monitor which games are being played the most and feature them in this collection, 
            ensuring that you always have access to the latest and greatest educational games.
          </p>
        </section>
      </div>
      
      {/* Removed back-to-top button from here */}
    </div>
  );
}
