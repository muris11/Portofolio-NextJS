// Authentication utilities and constants
export const ADMIN_SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN;

if (!ADMIN_SESSION_TOKEN) {
  throw new Error(
    "ADMIN_SESSION_TOKEN environment variable is required. Please set it in your .env file."
  );
}
