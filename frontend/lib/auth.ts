import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { Pool } from "pg";
import { randomUUID } from "crypto";

// Use Neon's pooled connection for better performance and reliability
// The pooler is designed for serverless environments and handles connection pooling
const connectionString = process.env.DATABASE_URL || "";

// Create PostgreSQL connection pool for Better Auth
// Note: search_path is set at the database user level via:
// ALTER USER neondb_owner SET search_path TO neon_auth, public;
const pool = new Pool({
  connectionString,
  ssl: true,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Automatically sign in after signup
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // Enable JWT plugin for backend API authentication
  // Use RS256 algorithm (compatible with python-jose on backend)
  plugins: [
    jwt({
      jwks: {
        keyPairConfig: {
          alg: "RS256", // RSA with SHA-256 - widely supported by both jose and python-jose
        },
      },
    }),
  ],

  // Configure to generate UUIDs instead of default string IDs
  // This matches the UUID columns created by Neon's provision_neon_auth
  advanced: {
    database: {
      generateId: () => randomUUID(),
    },
  },
});
