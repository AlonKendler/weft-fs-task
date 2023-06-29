// src/types/index.ts

export interface User {
    id: string;
    name: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
    };
  }
  
  // Define your Post type
  export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
  