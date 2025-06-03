import { json } from "@remix-run/node";
import {
  useLoaderData,
  useLocation,
  Link,
  Form,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getFeaturedGames, getNewGames } from "~/utils/db.server";

export const meta: MetaFunction = () => {
  return [
    
    { title: "ABCya 3: ABCya Games, ABCya3 Online - Free Educational Games for Kids" },
    { 
      name: "description", 
      content: "ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more. Perfect for classroom and home learning.ABCya add new games every day and Free Online Games for Kids." 
    },
    { name: "keywords", content: "ABCya3, ABCya 3, ABCya Games, ABCya3 Online, educational games, kids games, learning games" },
    // Open Graph tags
    { property: "og:title", content: "ABCya 3: ABCya Games, ABCya3 Online - Free Educational Games for Kids" },
    { property: "og:description", content: "ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more. Perfect for classroom and home learning.ABCya add new games every day and Free Online Games for Kids." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://abcya3.net/" },
    { property: "og:image", content: "https://abcya3.net/images/logo1.png" },
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "ABCya 3: ABCya Games, ABCya3 Online - Free Educational Games for Kids" },
    { name: "twitter:description", content: "ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more. Perfect for classroom and home learning.ABCya add new games every day and Free Online Games for Kids." },
    { name: "twitter:image", content: "https://abcya3.net/images/logo1.png" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Server-side code can use process.env
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "18");

  const featuredGames = await getFeaturedGames(18);
  const newGamesData = await getNewGames(page, limit);

  return json({
    featuredGames,
    newGames: newGamesData.games || [], // Ensure newGames is always an array
    pagination: {
      currentPage: page,
      totalPages: newGamesData.totalPages || 1,
      limit,
    },
    // Pass any environment variables you need to the client here
    env: {
      NODE_ENV: process.env.NODE_ENV,
      MEDIA_URL: process.env.MEDIA_URL || "",
    },
  });
};

export default function Index() {
  const { featuredGames, newGames, pagination, env } =
    useLoaderData<typeof loader>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  // Add state to control when to render JSON-LD
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Scroll to new games section if page parameter exists
  useEffect(() => {
    // Check if page parameter exists and is not the first page
    if (searchParams.has("page") && currentPage > 1) {
      // Scroll to the new games section with a small delay to ensure the section is rendered
      setTimeout(() => {
        const newGamesSection = document.querySelector(".new-games-section");
        if (newGamesSection) {
          window.scrollTo({
            top: newGamesSection.offsetTop,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [searchParams, currentPage]);

  // Reset loading state when data is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [newGames]);

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
    navigate(`${location.pathname}?${newSearchParams.toString()}`, {
      replace: true,
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

  // Generate JSON-LD structured data for the homepage
  const generateHomePageJsonLd = () => {
    // Create a WebPage structured data
    const webPageData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://abcya3.net/#webpage",
      "url": "https://abcya3.net/",
      "name": "ABCya3 - Free Educational Games for Kids",
      "description": "ABCya3 offers free educational games for kids. Play fun and interactive games covering math, language arts, science, and more.",
      "isPartOf": {
        "@id": "https://abcya3.net/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://abcya3.net/#primaryimage"
      },
      "datePublished": "2016-02-13T08:00:00+00:00",
      "dateModified": new Date().toISOString(),
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "ReadAction",
          "target": ["https://abcya3.net/"]
        }
      ]
    };
    
    return JSON.stringify(webPageData);
  };
  
  // Generate JSON-LD structured data for featured games
  const generateFeaturedGamesJsonLd = () => {
    const featuredGamesData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": featuredGames.map((game, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": game.name_en,
          "image": env.MEDIA_URL + game.avatar_hq,
          "url": `https://abcya3.net/${game.name_en.toLowerCase().replace(/\s+/g, "-")}.html`,
          "applicationCategory": "GameApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }))
    };
    
    return JSON.stringify(featuredGamesData);
  };
  
  // Generate JSON-LD structured data for new games
  const generateNewGamesJsonLd = () => {
    const newGamesData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": newGames.map((game, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": game.name_en,
          "image": env.MEDIA_URL + game.avatar_hq,
          "url": `https://abcya3.net/${game.name_en.toLowerCase().replace(/\s+/g, "-")}.html`,
          "applicationCategory": "GameApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }))
    };
    
    return JSON.stringify(newGamesData);
  };
  
  // Generate FAQ structured data
  const generateFaqJsonLd = () => {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the pros of ABCya3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ABCya3 offers educational content with games covering various subjects like math and language arts. The games are age-appropriate, categorized by grade level, and provide interactive learning experiences. They feature colorful and engaging graphics, cover a variety of subjects, and provide a safe online environment for children."
          }
        },
        {
          "@type": "Question",
          "name": "How can ABCya3 be used in the classroom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ABCya3 can be used in the classroom for supplemental learning, interactive reviews, differentiation, group activities, rewards and breaks, individualized learning, developing critical skills, hands-on learning, homework extensions, parent engagement, and project-based learning."
          }
        },
        {
          "@type": "Question",
          "name": "What is the purpose of ABCYa3?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The purpose of ABCya3 is to provide educational games and activities for children that make learning fun, engaging, and interactive. The platform aims to leverage the appeal of technology and gaming to help children develop and strengthen various skills while enjoying themselves."
          }
        },
        {
          "@type": "Question",
          "name": "Can you play ABCya3 offline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, ABCya3 is an online platform that hosts educational games and activities for children. ABCya3 requires an internet connection to access and play the games on website."
          }
        }
      ]
    };
    
    return JSON.stringify(faqData);
  };

  // Pre-generate the JSON-LD strings
  const homePageJsonLd = generateHomePageJsonLd();
  const featuredGamesJsonLd = generateFeaturedGamesJsonLd();
  const newGamesJsonLd = generateNewGamesJsonLd();
  const faqJsonLd = generateFaqJsonLd();
  
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
      }
    ]
  });

  return (
    <div className="container">
      {/* Add canonical link for SEO */}
      <link rel="canonical" href={`${location.pathname}`} />
      
      {/* Only render JSON-LD on the client side to avoid hydration mismatches */}
      {isClient && (
        <>
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: homePageJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: featuredGamesJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: newGamesJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: faqJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
          />
          
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
          />
        </>
      )}

      {/* Ad Section (replacing Hero Section) */}
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

      {/* Featured Games */}
      <section>
        <div className="section-title featured">
          <h2>Featured Games</h2>
        </div>

        <div className="games-grid">
          {featuredGames.map((game) => (
            <div key={game.id} className="game-card featured">
              <img src={env.MEDIA_URL +'resize/181x181/'+ game.avatar_hq}  alt={game.name_en} />
              <Link
                to={`/${game.name_en.toLowerCase().replace(/\s+/g, "-")}.html`}
                className="play-button"
              >
                Play
              </Link>
              <div className="game-card-content">
                <h3>{game.name_en}</h3>
                {/* <span className="category">{game.category_name_en}</span> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Games Section */}
      <section className="new-games-section" id="new-games">
        <div className="section-title">
          <h2>New Games</h2>
        </div>

        <div className="games-grid">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: pagination.limit }).map((_, index) => (
              <div key={`skeleton-${index}`}  className="game-card skeleton">
                <div className="skeleton-img"></div>
                <div className="game-card-content">
                  <div className="skeleton-title"></div>
                </div>
              </div>
            ))
          ) : Array.isArray(newGames) && newGames.length > 0 ? (
            newGames.map((game) => (
              <div key={game.id} className="game-card">
                <img src={env.MEDIA_URL +'resize/181x181/'+ game.avatar_hq} alt={game.name_en} />
                <Link
                  to={`/${game.name_en
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.html`}
                  className="play-button"
                >
                  Play
                </Link>
                <div className="game-card-content">
                  <h3>{game.name_en}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No games found. Please try again later.</p>
            </div>
          )}
        </div>

        {/* Client-side Pagination */}
        {pagination.totalPages > 1 && (
          <nav aria-label="Pagination" className="pagination-container">
            <div className="pagination">{renderPagination()}</div>
          </nav>
        )}
      </section>

      {/* SEO Text Content */}
      <section className="seo-content">
        <div className="section-title featured">
          <h1>ABCya 3, ABCya 3 games, ABCya online</h1>
        </div>
        <div className="seo-text">
          <p>
            <strong>ABCya3.net</strong> is a unique website with free online
            games that come in many different topics suitable for all ages when
            they are interested in relaxation. Every day the best games are
            always updated carefully and the fun world will appear continuously
            for players to explore the wonderful space. You will never be bored
            because we always suggest the most suitable games based on your
            favorite topics. If you like adventure racing games with the stunt
            or traffic control on the way to move to the final destination,
            update your favorite game list at <strong>ABCya 3</strong>. Our
            games are similar to any device, so you'll be able to play anywhere
            with any line of computers or smartphones. Here you can be ready to
            discover an unprecedented game paradise.
          </p>
          <p>
            Thousands of latest games take you to the battle where you have to
            use combat skills, shooting or even directly against the enemy.
            These zombies, killers or city attacks are going on and this war
            needs a hero to help. Combining the shooting genres and fighting the
            "unique" experience from ABCya3 will help players unleash the thrill
            on the battlefield. Newly updated games at our website are invested,
            carefully cared for, giving gamers diverse choices to start their
            expeditions. World game simulator and 3D show most vividly these
            games.
          </p>
          <p>
            When using a computer, phone or tablet, players can relax new games
            by visiting our website. You will be able to use your phone,
            keyboard or touch screen to shape, control characters and
            participate in favorite games like easy cooking, sports, football,
            basketball, ice skating or even skill games for babies. Feel the
            adrenaline rush as you try action games, use your brain with clever
            puzzles, and show off your fashion talent with dolls or girls.
            Perhaps you can insist on your talent in the list of new games such
            as <a href="https://abcya3.net/apple-shooter.html">Apple Shooter</a>
            ,{" "}
            <a href="https://abcya3.net/duck-life-adventure.html">Duck Life</a>,{" "}
            <a href="https://abcya3.net/color-switch.html">Color Switch</a>,{" "}
            <a href="https://abcya3.net/moto-x3m-games">Moto X3M</a>,{" "}
            <a href="https://abcya3.net/tomb-runner-mobile.html">Tomb Runner</a>
            ,{" "}
            <a href="https://abcya3.net/fireboy-and-watergirl-games">
              Fireboy and WaterGirl
            </a>
            ...
          </p>
          <p>
            List of games with attractive games will attract players of{" "}
            <strong>ABCya3 games</strong>. Along with the members of the team,
            players will, in turn, explore the sacred lands in human history,
            the ruins, mysteries that existed for thousands of years or the war
            of survival among characters in the IO game or famous Minecraft
            world with bricks and materials that you have to build in your city.
            They all have their own rules and tricks that players can draw to
            share with other players as they try to make the top rankings. Your
            friends will choose new games on our website. Therefore, don't
            hesitate to unlock the levels with different challenges.
          </p>
          <p>
            New lands will open for your lessons or just for entertainment that
            you can hardly recognize if you have not tried to join or overcome
            in your spare time. A fascinating journey appeared and players felt
            as if they were entering a magical maze with brilliant rainbow light
            appearing only at <strong>ABCya3</strong>.
          </p>

          <h2>What are the pros of ABCya3?</h2>
          <p>
            <strong>Educational Content:</strong> ABCya3 offers a wide range of
            educational games covering various subjects such as math, language
            arts, science, and more. The games are designed to make learning fun
            and engaging for children.
          </p>
          <p>
            <strong>Age-Appropriate:</strong> The games on ABCya3 are
            categorized by grade level, making it easier for parents and
            educators to find suitable content for their children's age and
            skill level.
          </p>
          <p>
            <strong>Interactive Learning:</strong> The interactive nature of the
            games helps children learn through hands-on experience, promoting
            active engagement and understanding of concepts.
          </p>
          <p>
            <strong>Colorful and Engaging:</strong> The games often feature
            vibrant graphics, animations, and characters that appeal to
            children, making the learning process visually exciting.
          </p>
          <p>
            <strong>Variety of Subjects:</strong> ABCya3 covers a wide spectrum
            of subjects, allowing children to explore various areas of knowledge
            and skills in a playful manner.
          </p>
          <p>
            <strong>Safe Environment:</strong> ABCya3 aims to provide a safe
            online environment for children, with measures in place to protect
            them from inappropriate content and interactions.
          </p>
          <h2>How can ABCya3 be used in the classroom?</h2>
          <p>
            ABCya3 can be a valuable resource in the classroom, offering
            educational games that engage students and reinforce various skills.
            Here's how ABCya3 can be effectively integrated into classroom
            activities: Supplemental Learning, Interactive Reviews,
            Differentiation, Group Activities, Rewards and Breaks,
            Individualized Learning, Developing Critical Skills, Hands-On
            Learning, Homework Extensions, Parent Engagement, Project-Based
            Learning.
          </p>
          <p>
            Remember to review games beforehand to ensure they align with your
            educational objectives and classroom environment. While ABCya3 can
            be a powerful tool, it should be integrated thoughtfully to enhance
            learning outcomes and engagement in the classroom.
          </p>
          <h2>What is the purpose of ABCYa3?</h2>
          <p>
            The purpose of ABCya3 is to provide educational games and activities
            for children that make learning fun, engaging, and interactive. The
            platform aims to leverage the appeal of technology and gaming to
            help children develop and strengthen various skills while enjoying
            themselves. Overall, the purpose of ABCya3 is to combine
            entertainment and education, providing a platform where children can
            have fun while developing essential skills and gaining knowledge. It
            aims to leverage technology to create an innovative and engaging
            learning experience for young learners.
          </p>
          <h2>Can you play ABCya3 offline?</h2>
          <p>
            No, ABCya3 is an online platform that hosts educational games and
            activities for children. ABCya3 requires an internet connection to
            access and play the games on website.
          </p>
        </div>
      </section>

      {/* Organization structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: `
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
          `
        }}
      />
      
      {/* BreadcrumbList structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://abcya3.net/"
              }
            ]
          })
        }}
      />
    </div>
  );
}


