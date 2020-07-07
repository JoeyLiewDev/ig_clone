import * as express from "express";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token_version: number;
  created_at: string;
  updated_at: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
