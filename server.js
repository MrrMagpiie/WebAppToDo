const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(express.json());

// Connection URL
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);
const dbName = 'To-Do-List';

async function connectDB() {
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  return client.db(dbName);
}

// Route to create (insert) Tasks
app.post('/Tasks', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('Tasks');
  const result = await collection.insertOne(req.body);
  res.status(201).send(`Task added with ID: ${result.insertedId}`);
});

// Route to read (find) Tasks
app.get('/Tasks', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('Tasks');
  const Tasks = await collection.find({}).toArray();
  res.json(Tasks);
});

// Route to update a Task
app.put('/Tasks/:name', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('Tasks');
  const result = await collection.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  res.send(`Updated ${result.matchedCount} Task(s)`);
});

// Route to delete a Task
app.delete('/Tasks/:name', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('Tasks');
  const result = await collection.deleteOne({ name: req.params.name });
  res.send(`Deleted ${result.deletedCount} Task(s)`);
});

/*
app.get('/Tasks', async (req, res) => {
  const db = await connectDB();
  const collection = db.collection('Tasks');
  const Tasks = await collection.find({}).toArray();
  res.json(Tasks);
});
*/
const path = require('path');

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});