// utils/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB; // wartość z .env.local

if (!uri) {
  throw new Error("Brakuje zmiennej MONGODB_URI w .env.local");
}
if (!dbName) {
  throw new Error("Brakuje zmiennej MONGODB_DB w .env.local");
}

const options = {};
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Aby w trybie deweloperskim nie tworzyć multiple połączeń:
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // W produkcji po prostu twórz nowe połączenie
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { client, db };
}
