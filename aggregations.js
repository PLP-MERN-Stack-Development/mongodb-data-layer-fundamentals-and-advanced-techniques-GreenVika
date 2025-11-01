// aggregations.js - MongoDB Aggregation Pipelines

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runAggregations() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // --- Task 4.1: Average price of books by genre ---
    console.log('\n Average book price by genre:');
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
      { $sort: { averagePrice: -1 } }
    ]).toArray();
    console.table(avgPriceByGenre);

    // --- Task 4.2: Author with the most books ---
    console.log('\n Author with the most books:');
    const topAuthor = await books.aggregate([
      { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
      { $sort: { totalBooks: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.table(topAuthor);

    // --- Task 4.3: Group books by publication decade ---
    console.log('\n Number of books by publication decade:');
    const booksByDecade = await books.aggregate([
      {
        $project: {
          title: 1,
          decade: { $concat: [ { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, "s" ] }
        }
      },
      { $group: { _id: "$decade", totalBooks: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.table(booksByDecade);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
    console.log('\n Connection closed.');
  }
}

runAggregations();
