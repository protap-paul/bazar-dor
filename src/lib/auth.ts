import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.BETTER_AUTH_MONGODB_URL;

if (!mongoUrl) {
    throw new Error(
        "BETTER_AUTH_MONGODB_URL is missing. Check your .env.local or Vercel Environment Variables."
    );
}

const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient || new MongoClient(mongoUrl);
if (process.env.NODE_ENV !== "production") {
    globalForMongo.mongoClient = client;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
        ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ],
    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
