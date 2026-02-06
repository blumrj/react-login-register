// src/api/axios.ts
import axios from "axios";


//create an axios instance
export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
