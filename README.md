# ABCya3 - Educational Games for Kids

A modern educational games platform built with Remix, React, and MySQL.

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE abcya_clone;
```

2. Import the database schema:
```bash
mysql -u root -p abcya_clone < database/schema.sql
```

3. Configure your database connection:
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=abcya_clone

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

