import cors from "cors";
import express, { json } from "express";
import { router as medium } from "./medium.js";
import { router as skip } from "./skip.js";

const origins = ["http://localhost:8080", "http://127.0.0.1:8080", "https://app-dev.nolus.io", "https://app.nolus.io", "https://nolus.io", "https://web-dev.nolus.io"];
const PORT = process.env.PORT || 5051;
const app = express();
const corsOptions = {
  origin: (origin, next) => {
    if (origins.includes(origin)) {
      return next(null, origin);
    }
    return next("Cross-Origin Request Blocked")
  }
};

app.use(json());
app.use(cors(corsOptions));
app.use("/", medium);
app.use("/skip", skip);

app.listen(PORT, () => {
  console.log(`Server running: ${process.pid} on http://localhost:${PORT}`);
});

export { app };
