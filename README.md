# Product Explorer

A full-stack product browsing application built for the CodeVector Internship Take-Home Assignment.

## Features

- Browse 200,000+ products
- Category-based filtering
- Fast cursor-based pagination
- PostgreSQL database with indexing
- Stable pagination while data is changing
- Responsive React UI

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL (Neon)

### Frontend
- React (Vite)
- Axios

### Hosting
- Backend: Vercel
- Database: Neon
- Frontend: Vercel

---

## Database Design

Products table:

- id (UUID)
- name
- category
- price
- created_at
- updated_at

Indexes:

```sql
CREATE INDEX idx_products_created_id
ON products(created_at DESC, id DESC);

CREATE INDEX idx_products_category_created_id
ON products(category, created_at DESC, id DESC);
```

These indexes support fast sorting and filtering without requiring full table scans.

---

## Pagination Strategy

I used **cursor-based pagination** instead of offset-based pagination.

Why?

- Better performance on large datasets
- Avoids expensive OFFSET scans
- Prevents duplicate or skipped products when new records are inserted while users are browsing

Cursor format:

```json
{
  "created_at": "...",
  "id": "..."
}
```

Products are ordered by:

```sql
ORDER BY created_at DESC, id DESC
```

---

## Data Generation

A custom seed script generates 200,000 products in batches.

The script inserts records in bulk rather than performing individual insert queries to improve performance.

Run:

```bash
npm run seed
```

---

## API Endpoints

### Get Products

```http
GET /products
```

### Filter by Category

```http
GET /products?category=Electronics
```

### Cursor Pagination

```http
GET /products?cursor=<cursor>
```

---

## What I Would Improve With More Time

- Add automated tests
- Add caching for frequently accessed categories
- Add sorting options
- Add search functionality
- Add Docker configuration
- Improve UI and user experience

---

## AI Usage

I used AI tools as a development assistant to:

- Discuss pagination strategies
- Review implementation choices
- Debug issues
- Improve UI styling

All code was reviewed, understood, tested, and modified during development.

---

## Running Locally

Backend:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```