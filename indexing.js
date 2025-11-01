// indexing.js - Demonstrating MongoDB Indexing & Performance

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runIndexingDemo() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    const db = client.db(dbName);
    const books = db.collection(collectionName);

    // --- Task 5.1: Check existing indexes ---
    console.log('\n Existing indexes:');
    const existingIndexes = await books.indexes();
    console.table(existingIndexes);

    // --- Task 5.2: Create an index on author field ---
    console.log('\n Creating index on "author" field...');
    await books.createIndex({ author: 1 });
    console.log('✅ Index created on "author"');

    // --- Task 5.3: Run query without index (explain plan) ---
    console.log('\n Query performance WITHOUT index (before index creation):');
    const explainNoIndex = await books.find({ author: "George Orwell" }).explain("executionStats");
    console.log(`Documents returned: ${explainNoIndex.executionStats.nReturned}`);
    console.log(`Execution time (ms): ${explainNoIndex.executionStats.executionTimeMillis}`);

    // --- Task 5.4: Run query with index (after index creation) ---
    console.log('\n Query performance WITH index (after index creation):');
    const explainWithIndex = await books.find({ author: "George Orwell" }).hint({ author: 1 }).explain("executionStats");
    console.log(`Documents returned: ${explainWithIndex.executionStats.nReturned}`);
    console.log(`Execution time (ms): ${explainWithIndex.executionStats.executionTimeMillis}`);

    // --- Task 5.5: View final index list ---
    console.log('\n Final list of indexes:');
    const finalIndexes = await books.indexes();
    console.table(finalIndexes);

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.close();
    console.log('\n Connection closed.');
  }
}

runIndexingDemo();
