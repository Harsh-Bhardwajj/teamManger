import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI must be set");
}

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(uri!);
}

export * from "./models/User";
export * from "./models/Project";
export * from "./models/Task";
export * from "./models/Activity";
