// MongoDB CRUD operations and advanced queries

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database and collection
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // --- Task 2: Basic CRUD Operations ---

    // 1️⃣ Find all books in a specific genre
    console.log('\n Books in the Fiction genre:');
    console.log(await books.find({ genre: 'Fiction' }).toArray());

    // 2️⃣ Find books published after a certain year
    console.log('\n Books published after 1950:');
    console.log(await books.find({ published_year: { $gt: 1950 } }).toArray());

    // 3️⃣ Find books by a specific author
    console.log('\n Books by George Orwell:');
    console.log(await books.find({ author: 'George Orwell' }).toArray());

    // 4️⃣ Update the price of a specific book
    console.log('\n Updating price of "The Alchemist"...');
    await books.updateOne(
      { title: 'The Alchemist' },
      { $set: { price: 15.99 } }
    );
    console.log(await books.findOne({ title: 'The Alchemist' }));

    // 5️⃣ Delete a book by its title
    console.log('\n Deleting "Moby Dick"...');
    await books.deleteOne({ title: 'Moby Dick' });
    console.log('Remaining books:', await books.countDocuments());

    // --- Task 3: Advanced Queries ---

    // 6️⃣ Find books in stock and published after 2010
    console.log('\n In-stock books published after 2010:');
    console.log(await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

    // 7️⃣ Projection: show only title, author, and price
    console.log('\n Projection (title, author, price):');
    console.log(await books.find({}, { projection: { _id: 0, title: 1, author: 1, price: 1 } }).toArray());

    // 8️⃣ Sorting: books by price ascending
    console.log('\n⬆️ Books sorted by price (ascending):');
    console.log(await books.find().sort({ price: 1 }).toArray());

    // 9️⃣ Sorting: books by price descending
    console.log('\n⬇️ Books sorted by price (descending):');
    console.log(await books.find().sort({ price: -1 }).toArray());

    // 🔟 Pagination: limit 5 per page, skip first 5
    console.log('\n Page 2 (skip first 5, limit 5):');
    console.log(await books.find().skip(5).limit(5).toArray());

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
    console.log('\n Connection closed.');
  }
}

// Run all queries
runQueries();
