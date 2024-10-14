const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017'; // or your MongoDB Atlas connection string
const client = new MongoClient(url);

// Database Name
const dbName = 'Tasks';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to MongoDB server');
  
  const db = client.db(dbName);
  const TasksCollection = db.collection('Tasks');

  return { db, TasksCollection };
}

main().catch(console.error);

async function insertTasks() {
    const { TasksCollection } = await main();
  
    const newTasks = [
      { name: 'some', Due: 22, Remind: 'False' },
      { name: 'thing', Due: 23, Remind: 'False' },
      { name: 'else', Due: 24, Remind: 'False' }
    ];
  
    const result = await TasksCollection.insertMany(newTasks);
    console.log(`${result.insertedCount} Tasks were added.`);
  }
  
  insertTasks();

  async function findTasks() {
    const { TasksCollection } = await main();
  
    const Tasks = await TasksCollection.find({}).toArray();
    console.log('Tasks:');
    console.log(Tasks);
  }
  
  findTasks();

  async function updateTask() {
    const { TasksCollection } = await main();
  
    const updateResult = await TasksCollection.updateOne(
      { name: 'some' },
      { $set: { Remind: 'False' } }
    );
  
    console.log(`Updated ${updateResult.matchedCount} Task's Remind.`);
  }
  
  updateTask();

  async function deleteTask() {
    const { TasksCollection } = await main();
  
    const deleteResult = await TasksCollection.deleteOne({ name: 'thing' });
    console.log(`Deleted ${deleteResult.deletedCount} Task's record.`);
  }
  
  deleteTask();

  