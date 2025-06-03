import { json } from "@remix-run/node";
import { useLoaderData, useLocation, Link, useSearchParams, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getGamesByCategory, getCategoryBySlug } from "~/utils/db.server";

export const meta: MetaFunction = ({ params, data }) => {
  if (!data || !data.category) {
    return [
      { title: "Category Not Found - ABCya3" },
      { name: "description", content: "The requested category could not be found." }
    ];
  }
  
  const { category } = data;
  
  return [
    { title: category.meta_title || `${category.name_en} Games - ABCya3` },
    { name: "description", content: category.meta_description || `Play free ${category.name_en.toLowerCase()} games for kids. Fun and educational ${category.name_en.toLowerCase()} games to help children learn while having fun.` },
    // Open Graph tags
    { property: "og:title", content: category.meta_title || `${category.name_en} Games - ABCya3` },
    { property: "og:description", content: category.meta_description || `Play free ${category.name_en.toLowerCase()} games for kids.` },
    { property: "og:type", content: "website" },
    { property: "og:image", content: data.env.MEDIA_URL + category.avatar }
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const categorySlug = params.category || "";
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "18");
  
  try {
    // Get category details by slug
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
      throw new Response("Category not found", { status: 404 });
    }
    
    // Get games by category ID with pagination
    const result = await getGamesByCategory(category.id, page, limit);
    
    return json({
      category,
      games: result.games,
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
    console.error("Error loading category games:", error);
    
    if (error instanceof Response) {
      throw error;
    }
    
    return json({
      category: null,
      games: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        limit
      },
      error: "Failed to load games. Please try again later.",
      // Pass environment variables to the client
      env: {
        MEDIA_URL: process.env.MEDIA_URL || ''
      }
    });
  }
}

export default function CategoryGames() {
  const { category, games, pagination, error, env } = useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  // Reset loading state when data is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [games]);
  
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
  
  // If category is null, show error page
  if (!category) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>Category Not Found</h1>
          <p>The category you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="button">Go to Homepage</Link>
        </div>
      </div>
    );
  }
  
  // Helper function to render SEO content with fallbacks
  const renderSeoContent = () => {
    return (
      <section className="seo-content">
        <h2>{category.seo_heading || `${category.name_en} Games for Kids`}</h2>
        <div dangerouslySetInnerHTML={{ __html: category.seo_content || `
          <p>
            Our collection of ${category.name_en.toLowerCase()} games offers a fun and educational experience for children of all ages. 
            These games are designed to help kids develop important skills while having a great time.
          </p>
        `}} />
        
        <h3>Benefits of {category.name_en} Games</h3>
        <div dangerouslySetInnerHTML={{ __html: category.seo_benefits || `
          <p>
            Playing ${category.name_en.toLowerCase()} games helps children develop critical thinking, problem-solving abilities, 
            and subject-specific knowledge. Our games are carefully designed to be both entertaining and educational, 
            making learning an enjoyable experience.
          </p>
        `}} />
        
        <h3>How to Play</h3>
        <div dangerouslySetInnerHTML={{ __html: category.seo_how_to_play || `
          <p>
            Our ${category.name_en.toLowerCase()} games are easy to play. Simply click on a game to start playing instantly in your browser. 
            No downloads or installations are required. Each game includes simple instructions to help kids get started quickly.
          </p>
        `}} />
        
        <h3>Why Choose Our {category.name_en} Games</h3>
        <div dangerouslySetInnerHTML={{ __html: category.seo_why_choose || `
          <p>
            Our ${category.name_en.toLowerCase()} games are designed by educational experts and game developers who understand 
            what makes learning fun for kids. We regularly update our collection with new games to keep the experience fresh and engaging.
          </p>
        `}} />
      </section>
    );
  };
  
  return (
    <div className="container">
      {/* Add canonical link for SEO */}
      <link rel="canonical" href={`${location.pathname}`} />
      
      <div className="category-page">
       
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
        
        <div className="section-title featured">
          <h1>{category.name_en}</h1>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {/* Category Description */}
        <div className="category-description">
          <p>
            {category.short_description || `Explore our collection of fun and educational ${category.name_en.toLowerCase()} games for kids. These games are designed to help children learn while having fun.`}
          </p>
        </div>
        
        {/* Games Grid */}
        <section className="games-section">
          <div className="games-grid">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: pagination.limit }).map((_, index) => (
                <div key={`skeleton-${index}`} className="game-card skeleton featured">
                  <div className="skeleton-img"></div>
                  <div className="game-card-content">
                    <div className="skeleton-title"></div>
                  </div>
                </div>
              ))
            ) : (
              Array.isArray(games) && games.length > 0 ? (
                games.map(game => (
                  <div key={game.id} className="game-card featured">
                    <img src={env.MEDIA_URL + game.avatar_hq} alt={game.name_en} />
                    <Link to={`/${game.name_en.toLowerCase().replace(/\s+/g, '-')}.html`} className="play-button">Play</Link>
                    <div className="game-card-content">
                      <h3>{game.name_en}</h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No {category.name_en.toLowerCase()} games found.</p>
                  <p>Please check back later or explore other categories.</p>
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
        
        {/* SEO Content from database */}
        {renderSeoContent()}
      </div>
      
      {/* Removed back-to-top button from here */}
    </div>
  );
}



