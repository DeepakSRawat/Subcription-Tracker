import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_ENV,
  ARCJET_KEY,
} = process.env;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2UzZjhjOThjNDI4MDljODI4NzIzZGQiLCJpYXQiOjE3NDI5OTM2MDksImV4cCI6MTc0MzA4MDAwOX0.JGnN6s9T-nzl7xAoCVAWTRhBNLZNEHq0sYzWxsscH6o

// _id: 67e3f8c98c42809c828723dd
