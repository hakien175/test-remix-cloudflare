import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Only log in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Database connection info:');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`User: ${process.env.DB_USER || 'root'}`);
  console.log(`Database: ${process.env.DB_NAME || 'abcya_clone'}`);
}

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'abcya_clone',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function to execute queries
export async function query<T>(sql: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Game type definition
export interface Game {
  id: number;
  name_en: string;
  avatar_hq: string;
  category: string;
  alias: string;
  grade?: string;
  skills?: string;
  featured?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Game-related database functions
export async function getAllGames(): Promise<Game[]> {
  return query<Game[]>('SELECT * FROM games ORDER BY created_at DESC');
}

export async function getFeaturedGames(limit: number = 12): Promise<Game[]> {
  return query<Game[]>('SELECT id,avatar_hq,new_game,hot_game,name_en,alias FROM game  where public=1 and is_delete=0 and type <> 1 and  date_public <= now() ORDER by viewpc DESC LIMIT ?', [limit]);
}


export async function getGameById(id: number): Promise<Game | null> {
  const games = await query<Game[]>('SELECT * FROM games WHERE id = ?', [id]);
  return games.length > 0 ? games[0] : null;
}

export async function searchGames(keyword: string): Promise<Game[]> {
  const searchTerm = `%${keyword}%`;
  return query<Game[]>(
    'SELECT * FROM game WHERE name_en LIKE ?  ORDER BY viewpc DESC',
    [searchTerm]
  );
}

export async function getCategories(): Promise<{id: string, name: string, icon: string}[]> {
  const results = await query<{category: string}[]>('SELECT * FROM category limit 6');
  
  // Map the results to the expected format
  return results.map(result => ({
    // id: result.category.toLowerCase(),
    id: 1,
    name: result.category,
    // icon: `/images/${result.category.toLowerCase()}-icon.png`
    icon: `/images/icon.png`
  }));
}

// Add this function to get new games with pagination
export async function getNewGames(page: number = 1, limit: number = 12): Promise<{ games: Game[], totalPages: number }> {
  // Ensure page and limit are valid numbers
  page = Math.max(1, page);
  limit = Math.max(1, Math.min(50, limit)); // Limit between 1 and 50
  
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  console.log('DB Query - Page:', page);
  console.log('DB Query - Limit:', limit);
  console.log('DB Query - Offset:', offset);
  
  try {
    // Get total count of games for pagination
    const countResult = await query<[{total: number}]>('SELECT COUNT(*) as total FROM game WHERE public=1 AND is_delete=0 AND type <> 1 AND date_public <= now()');
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    console.log('DB Query - Total games:', total);
    console.log('DB Query - Total pages:', totalPages);
    
    // Get games for current page
    const games = await query<Game[]>(
      'SELECT id, avatar_hq, new_game, hot_game, name_en, alias FROM game ' +
      'WHERE public=1 AND is_delete=0 AND type <> 1 AND date_public <= now() ' +
      'ORDER BY date_public DESC LIMIT ? OFFSET ?', 
      [limit, offset]
    );
    
    console.log('DB Query - Games fetched:', games.length);
    
    return {
      games,
      totalPages
    };
  } catch (error) {
    console.error('DB Query Error:', error);
    return {
      games: [],
      totalPages: 1
    };
  }
}

// Get all categories with pagination
export async function getAllCategories(page: number = 1, limit: number = 30): Promise<{ categories: any[], totalPages: number }> {
  // Ensure page and limit are valid numbers
  page = Math.max(1, page);
  limit = Math.max(1, Math.min(100, limit)); // Limit between 1 and 100
  
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  try {
    // Get total count of categories for pagination
    const countResult = await query<[{total: number}]>('SELECT COUNT(*) as total FROM category WHERE is_delete=0');
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Get categories for current page with game count
    const categories = await query(
      `SELECT c.id, c.name_en, c.avatar, c.alias
       FROM category c
       WHERE c.is_delete=0
       ORDER BY c.name_en ASC
       LIMIT ? OFFSET ?`, 
      [limit, offset]
    );
    
    return {
      categories,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      categories: [],
      totalPages: 1
    };
  }
}

// Get hot games with pagination
export async function getHotGames(page: number = 1, limit: number = 18): Promise<{ games: Game[], totalPages: number }> {
  // Ensure page and limit are valid numbers
  page = Math.max(1, page);
  limit = Math.max(1, Math.min(50, limit)); // Limit between 1 and 50
  
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  try {
    // Get total count of hot games for pagination
    const countResult = await query<[{total: number}]>(
      'SELECT COUNT(*) as total FROM game WHERE public=1 AND is_delete=0 AND type <> 1 AND date_public <= now()'
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Get hot games for current page
    const games = await query<Game[]>(
      'SELECT id, avatar_hq, new_game, hot_game, name_en, alias FROM game ' +
      'WHERE public=1 AND is_delete=0 AND type <> 1  AND date_public <= now() ' +
      'ORDER BY viewpc DESC LIMIT ? OFFSET ?', 
      [limit, offset]
    );
    
    return {
      games,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching hot games:', error);
    return {
      games: [],
      totalPages: 1
    };
  }
}

// Get category by slug with SEO content
export async function getCategoryBySlug(slug: string): Promise<any | null> {
  try {
    const categories = await query(
      `SELECT id, name_en, desciption_en, avatar, 
       text_footer , description_seo
       FROM category 
       WHERE alias = ? LIMIT 1`,
      [slug]
    );
    
    return categories.length > 0 ? categories[0] : null;

  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

// Get games by category with pagination
export async function getGamesByCategory(categoryId: number, page: number = 1, limit: number = 18): Promise<{ games: any[], totalPages: number }> {

  page = Math.max(1, page);
  limit = Math.max(1, Math.min(50, limit)); // Limit between 1 and 50
  
  // console.log(categoryId);
  // Calculate offset for pagination
  const offset = (page - 1) * limit;
  
  try {
    // Get total count of games in this category for pagination
    const countResult = await query<[{total: number}]>(
      'SELECT COUNT(*) as total FROM game as a, category as b, game_category as c WHERE a.public=1 and a.is_delete=0 and a.type <> 1 and  a.date_public <= now() and a.id = c.gameid and b.id=c.categoryid and b.id=?',
      [categoryId]
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    // Get games for current page
    const games = await query(
      'SELECT a.id,a.avatar_hq,a.description_en,a.new_game,a.hot_game,a.name_en,a.alias FROM game as a, category as b, game_category as c WHERE a.public=1 and a.is_delete=0 and a.type <> 1 and  a.date_public <= now() and a.id = c.gameid and b.id=c.categoryid and b.id=? order by a.id DESC LIMIT ? OFFSET ?',
  
      [categoryId, limit, offset]
    );
    
    return {
      games,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching games by category:', error);
    return {
      games: [],
      totalPages: 1
    };
  }
}

// Get game by slug
export async function getGameBySlug(slug: string): Promise<any | null> {
  try {
 
      const games = await query(`
        SELECT g.*, c.name_en as category_name_en, c.alias as category_alias 
        FROM game g
        LEFT JOIN category c ON g.category_id = c.id
        WHERE g.alias = ? AND g.public = 1 AND g.is_delete = 0
        LIMIT 1
      `, [slug]);
      
      return games.length > 0 ? games[0] : null;
   
  } catch (error) {
    console.error('Error fetching game by slug:', error);
    return null;
  }
}




