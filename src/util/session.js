import { Httpx } from "https://jslib.k6.io/httpx/0.1.0/index.js";

export const session = new Httpx({
  baseURL: __ENV.BASE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
