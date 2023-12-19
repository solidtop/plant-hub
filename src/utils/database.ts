import mongoose from "mongoose";

export default async function connectToDatabase() {
  if (mongoose.connection.readyState != 0) {
    return;
  }

  const url = process.env.MONGODB_URL as string;
  mongoose.connect(url);

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to database");
  });

  db.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });
}
