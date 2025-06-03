import { json } from "@remix-run/node";
import {
  useLoaderData,
  Link,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getAllCategories } from "~/utils/db.server";
import { getGameCountByCategory } from "~/utils/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "All Categories - ABCya3" },
    {
      name: "description",
      content:
        "Browse all categories on ABCya3. Find educational games by category including math, reading, science, and more.",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 30; // 30 categories per page

  try {
    const result = await getAllCategories(page, limit);

    return json({
      categories: result.categories,
      pagination: {
        currentPage: page,
        totalPages: result.totalPages,
        limit,
      },
      // Pass environment variables to the client
      env: {
        MEDIA_URL: process.env.MEDIA_URL || "",
      },
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    return json({
      categories: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        limit,
      },
      error: "Failed to load categories. Please try again later.",
      // Pass environment variables to the client
      env: {
        MEDIA_URL: process.env.MEDIA_URL || "",
      },
    });
  }
}

export default function AllCategories() {
  const { categories, pagination, error, env } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Reset loading state when data is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [categories]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (
      page === currentPage ||
      page < 1 ||
      page > pagination.totalPages ||
      isLoading
    ) {
      return; // Prevent unnecessary navigation
    }

    setIsLoading(true);

    // Create new search params with updated page
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());

    // Navigate to the same route with new search params
    navigate(`/all-categories?${newSearchParams.toString()}`, {
      replace: true,
    });

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
        className={`pagination-link ${currentPage === 1 ? "disabled" : ""} ${
          isLoading ? "loading" : ""
        }`}
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
          className={`pagination-link ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          1
        </button>
      );
    }

    // Ellipsis after first page
    if (currentPage > 4) {
      pages.push(
        <span key="ellipsis-start" className="pagination-ellipsis">
          ...
        </span>
      );
    }

    // Pages around current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-link ${currentPage === i ? "active" : ""} ${
            isLoading ? "loading" : ""
          }`}
          disabled={isLoading}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    // Ellipsis before last page
    if (currentPage < totalPages - 3) {
      pages.push(
        <span key="ellipsis-end" className="pagination-ellipsis">
          ...
        </span>
      );
    }

    // Last page
    if (currentPage < totalPages - 2 && totalPages > 3) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`pagination-link ${isLoading ? "loading" : ""}`}
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
        className={`pagination-link ${
          currentPage >= totalPages ? "disabled" : ""
        } ${isLoading ? "loading" : ""}`}
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
      <div className="all-categories-page">
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
          <h1>All Categories</h1>
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          // Loading skeleton
          <div className="categories-list">
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <div key={`skeleton-row-${rowIndex}`} className="categories-row">
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <div
                    key={`skeleton-${rowIndex}-${colIndex}`}
                    className="category-item skeleton"
                  >
                    <div className="category-image skeleton-img"></div>
                    <div className="category-info">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <>
            {categories.length > 0 ? (
              <div className="categories-list">
                {/* Group categories into rows of 5 */}
                {Array.from({ length: Math.ceil(categories.length / 5) }).map(
                  (_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className="categories-row">
                      {categories
                        .slice(rowIndex * 5, rowIndex * 5 + 5)
                        .map((category) => (
                          <Link
                            key={category.id}
                            to={`/${category.alias}`}
                            className="category-item"
                          >
                            <div className="category-image">
                              <img
                                src={env.MEDIA_URL + category.avatar}
                                alt={category.name_en}
                              />
                            </div>
                            <div className="category-info">
                              <h3>{category.name_en}</h3>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="no-results">
                <p>No categories found. Please try again later.</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <nav aria-label="Pagination" className="pagination-container">
                <div className="pagination">{renderPagination()}</div>
              </nav>
            )}
          </>
        )}

        {/* SEO Content */}
        <section className="seo-content">
          <h2>Browse Educational by Category</h2>
          <p>
            Explore our extensive collection of educational games organized by
            category. Whether you're looking for math games, reading activities,
            science simulations, or just fun games to play, we have categories
            to help you find exactly what you need.
          </p>
          <p>
            Each category features carefully selected games that are both
            educational and entertaining. Our games are designed to help
            children learn important skills while having fun, making education
            an enjoyable experience.
          </p>
        </section>
      </div>
    </div>
  );
}
