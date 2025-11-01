#  MongoDB Week 1 – Data Layer Fundamentals & Advanced Techniques

## Student Info
- **Name:** Shavika S
- **Cohort:** PLP 2025
- **Project:** MongoDB Week 1 – `plp_bookstore`

---

##  Project Overview
This project demonstrates foundational and advanced MongoDB operations using **Node.js** and **MongoDB Shell**.

It includes:
- ✅ `insert_books.js` → Inserts 12 book records into the `plp_bookstore` database  
- ✅ `queries.js` → Demonstrates CRUD and advanced query operations  
- ✅ `aggregations.js` → Performs data analysis using aggregation pipelines  
- ✅ `indexing.js` → Shows how to create and test MongoDB indexes  
- ✅ `books_collection` → a screenshot of books collection in MongoDB Compass
---

## ⚙️ Setup Instructions

### 1️⃣ Start MongoDB Server
Before running any script, ensure MongoDB is running locally:
```bash
net start MongoDB

### 2️⃣ Insert Sample Data
Run this command to populate the books collection:
```bash
mongosh insert_books.js

### 3️⃣ Run Queries
Execute your CRUD and advanced queries:
```bash
node queries.js

### 4️⃣ Run Aggregations
```bash
node aggregations.js

### 5️⃣ Run Indexing Scripts
```bash
node indexing.js

🗄️ **Database Details**

Database Name: plp_bookstore

Collection: books

Documents: 12 book entries with the following fields:

title (string)

author (string)

genre (string)

published_year (number)

price (number)

in_stock (boolean)

pages (number)

publisher (string)

**Features* **Demonstrated**

-CRUD Operations (Create, Read, Update, Delete)

-Query Filtering (by genre, author, year)

-Projection & Sorting

-Pagination using limit() and skip()

-Aggregation Pipelines for analytics

-Indexing for performance optimization

**Notes**

Ensure:

MongoDB Community Edition is installed and running on mongodb://localhost:27017

Node.js is installed to execute .js scripts

All scripts (insert_books.js, queries.js, etc.) are in the same folder

Author:GreenVika