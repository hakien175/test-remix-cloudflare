import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getGameBySlug, getGamesByCategory } from "~/utils/db.server";

export const meta: MetaFunction = ({ data }) => {
  if (!data || !data.game) {
    return [
      { title: "Game Not Found - ABCya3" },
      {
        name: "description",
        content: "The requested game could not be found.",
      },
    ];
  }

  const { game } = data;

  return [
    { title: `${game.name_en} - ABCya3` },
    {
      name: "description",
      content:
        game.description_en ||
        `Play ${game.name_en} online for free. Fun and educational game for kids.`,
    },
    // Open Graph tags
    { property: "og:title", content: `${game.name_en} - ABCya3` },
    {
      property: "og:description",
      content: game.description_en || `Play ${game.name_en} online for free.`,
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: game.image_url },
  ];
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  // Extract slug from params (format: "game-name.html")
  const slugWithHtml = params.slug || "";
  const slug = slugWithHtml.replace(/\.html$/, "");

  // Check if the URL ends with .html
  if (!request.url.endsWith(".html")) {
    return redirect(`/${slug}.html`);
  }

  try {
    // Get game details from database by slug
    const game = await getGameBySlug(slug);

    if (!game) {
      throw new Response("Game not found", { status: 404 });
    }

    // Get related games from the same category
    const relatedGames = await getGamesByCategory(game.category_id, 1, 8);

    // Filter out the current game and limit to 3 related games
    const filteredRelatedGames = relatedGames.games
      .filter((relatedGame) => relatedGame.id !== game.id)
      .slice(0, 8);

    return json({
      game: {
        ...game,
        image_url: process.env.MEDIA_URL + game.avatar_hq,
        embedUrl: `${game.file_url}`,
        relatedGames: filteredRelatedGames,
      },
      env: {
        MEDIA_URL: process.env.MEDIA_URL || "",
      },
    });
  } catch (error) {
    console.error("Error loading game:", error);

    if (error instanceof Response) {
      throw error;
    }

    throw new Response("Error loading game", { status: 500 });
  }
}

export default function GamePage() {
  const { game, env } = useLoaderData<typeof loader>();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Function to enter fullscreen
  const enterFullscreen = () => {
    const container = document.querySelector(
      ".game-frame-container"
    ) as HTMLElement;
    if (container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    }
  };

  // Function to exit fullscreen
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="container">
      {/* Top Ad Section */}
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

      {/* <div className="breadcrumbs">
        <Link to="/">Home</Link> &gt;
        <Link to={`/${game.category_alias}`}>
          {game.category_name_en}
        </Link>{" "}
        &gt;
        <span>{game.name_en}</span>
      </div> */}

      {/* Main Game Content with Side Ads */}
      <div className="game-layout">
        {/* Left Ad */}
        <div className="game-ad game-ad-left">
          <div className="ad-box ad-box-tall">
            <div className="ad-placeholder">
              <span>Advertisement</span>
              <span>300 x 600</span>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="game-content">
          <div className="game-container">
            <div className="game-controls">
              <h1>{game.name_en}</h1>
              <button className="fullscreen-btn" onClick={enterFullscreen}>
                <img src="/images/fullscreen.svg" alt="Fullscreen" />
              </button>
            </div>

            <div className="game-frame-container">
              <iframe
                src={game.embedUrl}
                title={game.name_en}
                className="game-frame"
                allowFullScreen
              ></iframe>

              {/* Exit Fullscreen Button - Now a direct child of game-frame-container */}
              <button
                className="exit-fullscreen-btn"
                onClick={exitFullscreen}
                aria-label="Exit fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Related Games */}
          <section className="related-games">
            <h2>Related Games</h2>
            <div className="games-grid">
              {game.relatedGames.map((relatedGame) => (
                <div key={relatedGame.id} className="game-card">
                  <img
                    src={env.MEDIA_URL + relatedGame.avatar_hq}
                    alt={relatedGame.name_en}
                  />
                  <Link
                    to={`/${relatedGame.id}-${relatedGame.name_en
                      .toLowerCase()
                      .replace(/\s+/g, "-")}.html`}
                    className="play-button"
                  >
                    Play
                  </Link>
                  <div className="game-card-content">
                    <h3>{relatedGame.name_en}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div class="ad-box ad-box-large scale970" bis_skin_checked="1">
            <div class="ad-placeholder" bis_skin_checked="1">
              <span>Advertisement</span>
              <span>970 x 250</span>
            </div>
          </div>

          {/* Game Description */}
          <section className="game-description">
            <h2>About {game.name_en}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  game.description_en ||
                  `
              <p>
                ${game.name_en} is a fun and educational game for kids. Play online for free and enjoy an interactive learning experience.
              </p>
            `,
              }}
            />

            <h3>How to Play</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  game.instructions_en ||
                  `
              <p>
                Use your mouse or keyboard to play. Follow the on-screen instructions to get started.
              </p>
            `,
              }}
            />
          </section>
          <div class="ad-box ad-box-large scale970" bis_skin_checked="1">
            <div class="ad-placeholder" bis_skin_checked="1">
              <span>Advertisement</span>
              <span>970 x 250</span>
            </div>
          </div>
        </div>

        {/* Right Ad */}
        <div className="game-ad game-ad-right">
          <div className="ad-box ad-box-skinny">
            <div className="ad-placeholder">
              <span>Advertisement</span>
              <span>160 x 600</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
