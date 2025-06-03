import { json } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { searchGames } from "~/utils/db.server";

export const meta: MetaFunction = ({ params }) => {
  const keyword = params.keyword || "";
  return [
    { title: `Search: ${keyword} - ABCya3` },
    { name: "description", content: `Search results for "${keyword} - Find fun educational games for kids.` }
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const keyword = params.keyword || "";
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "18");
  
  // Ensure page and limit are valid numbers
  const validPage = Math.max(1, page);
  const validLimit = Math.max(1, Math.min(50, limit));
  
  try {
    // Search games from database
    const games = await searchGames(keyword);
    
    // Calculate total pages
    const total = games.length;
    const totalPages = Math.ceil(total / validLimit);
    
    // Get games for current page
    const offset = (validPage - 1) * validLimit;
    const paginatedGames = games.slice(offset, offset + validLimit);
    
    return json({
      keyword,
      games: paginatedGames,
      pagination: {
        currentPage: validPage,
        totalPages,
        total,
        limit: validLimit
      },
      env: {
        MEDIA_URL: process.env.MEDIA_URL || ''
      }
    });
  } catch (error) {
    console.error("Error searching games:", error);
    return json({
      keyword,
      games: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: validLimit
      },
      error: "Failed to search games. Please try again later.",
      env: {
        MEDIA_URL: process.env.MEDIA_URL || ''
      }
    });
  }
}

export default function Search() {
  const { keyword, games, pagination, error, env } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Add state to control when to render JSON-LD
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Reset loading state when data is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [games]);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === pagination.currentPage || page < 1 || page > pagination.totalPages || isLoading) {
      return; // Prevent unnecessary navigation
    }
    
    setIsLoading(true);
    
    // Create new search params with updated page
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    
    // Update the URL without reloading the page
    setSearchParams(newSearchParams);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Render pagination controls
  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    
    if (totalPages <= 1) return null;
    
    const pages = [];
    
    // Always show first page
    pages.push(
      <button 
        key="first" 
        onClick={() => handlePageChange(1)} 
        className={currentPage === 1 ? "active pagination-link" : "pagination-link"}
        disabled={currentPage === 1}
      >
        1
      </button>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(<span key="ellipsis1" className="ellipsis pagination-link">...</span>);
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last page as they're always shown
      
      pages.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)} 
          className={currentPage === i ? "active pagination-link" : "pagination-link"}
        >
          {i}
        </button>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis2" className="ellipsis">...</span>);
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button 
          key="last" 
          onClick={() => handlePageChange(totalPages)} 
          className={currentPage === totalPages ? "active pagination-link" : "pagination-link"}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    }
    
    return (
      <>
        <button 
          className="pagination-link prev-page" 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          &laquo; Prev
        </button>
        
        {pages}
        
        <button 
          className="pagination-link next-page" 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </>
    );
  };
  
  // Generate JSON-LD structured data
  const generateJsonLd = () => {
    if (!games || games.length === 0) {
      return '';
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "headline": `Search Results for "${keyword}"`,
      "url": `https://abcya3.net/search/${encodeURIComponent(keyword)}`,
      "description": `Search results for "${keyword} - Find fun educational games for kids."`,
      "itemListElement": games.map((game, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": game.name_en,
        "url": `https://abcya3.net/${game.name_en.toLowerCase().replace(/\s+/g, '-')}.html`,
        "image": env.MEDIA_URL + game.avatar_hq,
        "description": game.description_en || "A fun educational game for kids"
      })),
      "totalItems": games.length
    };

    return JSON.stringify(jsonLd);
  };
  
  // Pre-generate the JSON-LD strings
  const searchResultsJsonLd = generateJsonLd();
  
  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://abcya3.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Search",
        "item": "https://abcya3.net/search"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Results for "${keyword}"`,
        "item": `https://abcya3.net/search/${encodeURIComponent(keyword)}`
      }
    ]
  });
  
  // Organization JSON-LD
  const organizationJsonLd = `
  {
    "@context": "https://schema.org",
    "@type":["Organization","NewsMediaOrganization","WebSite"],
    "name": "ABCya 3",
    "alternateName": "ABCya 3: ABCya Games, ABCya3 Online",
    "@id": "https://abcya3.net/",
    "logo": "https://abcya3.net/css/images/logo.png",
    "image": "https://abcya3.net/css/images/logo.png",
    "description": "ABCya3 only publish the top rated hot games on our ABCya3.net. ABCya add new games every day and Free. We pledged that all the latest and hottest games on the market are updated every second, every minute, every hour on the system.",
    "url": "https://abcya3.net/",
    "keywords":"Abcya3,ABCya 3,ABCya Games,ABCya3 Online",
    "telephone": "+18063620952",
    "foundingDate": "2016-02-13",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "User Feedback",
      "url": "https://abcya3.net/site/contact",
      "email": "contact@abcya3.net",
      "telephone": "+18063620952"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2012 34th St",
      "addressLocality": "Lubbock",
      "addressRegion": "Texas",
      "postalCode": "79411",
      "addressCountry": "US",
      "telephone": "+18063620952"
    },
    "location": {
      "@type": "PostalAddress",
      "streetAddress": "2012 34th St",
      "addressLocality": "Lubbock",
      "addressRegion": "Texas",
      "postalCode": "79411",
      "addressCountry": "US",
      "telephone": "+18063620952"
    },
    "founder": {
      "@type": "Person",
      "name": "Phu Nguyen",
      "gender": "Male",
      "jobTitle": "CEO",
      "sameAs": "https://www.facebook.com/aphu7/"
    },
    "sameAs": [
      "https://www.facebook.com/abcya3.net/",
      "https://twitter.com/abcya3games",
      "https://www.linkedin.com/in/abcya3-online-games/",
      "https://www.pinterest.com/abcya3games/",
      "https://www.youtube.com/channel/UCJeShGXn8D7x-oC01lhmvTA",
      "https://sites.google.com/view/abcya3/",
      "https://abcya3games.weebly.com/"
    ]
  }
  `;
  
  return (
    <div className="container">
      {/* Only render JSON-LD on the client side to avoid hydration mismatches */}
      {isClient && (
        <>
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: searchResultsJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
          />
        </>
      )}
      
      <div className="search-results-page">
        
        
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
        
        <div className="search-box">
          <form action={`/search/`} method="get" onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector('input[name="keyword"]') as HTMLInputElement;
            window.location.href = `/search/${encodeURIComponent(input.value || '')}`;
          }}>
            <input 
              type="text" 
              name="keyword" 
              defaultValue={keyword} 
              placeholder="Search games..." 
            />
            <button type="submit">Search</button>
          </form>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {!error && games.length > 0 ? (
          <>
            <div className="results-count">
              <h1>{keyword ? `Search Results for "${keyword}"` : 'All Games'}</h1> <span>{pagination.total} games found </span>
            </div>
            
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
                games.map(game => (
                  <div key={game.id} className="game-card">
                    <img src={env.MEDIA_URL + game.avatar_hq} alt={game.name_en} />
                    <Link to={`/${game.name_en.toLowerCase().replace(/\s+/g, '-')}.html`} className="play-button">Play</Link>
                    <div className="game-card-content">
                      <h3>{game.name_en}</h3>
                    </div>
                  </div>
                ))
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
          </>
        ) : (
          <div className="no-results">
            <p>No games found matching "{keyword}"</p>
            <p>Try different keywords or browse our categories below</p>
            
            <div className="grade-buttons">
              <Link to="/preschool" className="grade-button">Preschool</Link>
              <Link to="/kindergarten" className="grade-button">Kindergarten</Link>
              <Link to="/grade-1" className="grade-button">Grade 1</Link>
              <Link to="/grade-2" className="grade-button">Grade 2</Link>
              <Link to="/grade-3" className="grade-button">Grade 3</Link>
              <Link to="/grade-4" className="grade-button">Grade 4</Link>
              <Link to="/grade-5" className="grade-button">Grade 5</Link>
              <Link to="/grade-6" className="grade-button">Grade 6+</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
