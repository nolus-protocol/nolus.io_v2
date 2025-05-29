import cors from "cors";
import express, { json } from "express";
import { router as medium } from "./medium.js";
import { router as skip } from "./skip.js";
import { router as intercom } from "./intercom.js";

const PORT = process.env.PORT || 5051;
const app = express();

app.use(json());
app.use(cors());
app.use("/", medium);
app.use("/skip", skip);
app.use("/intercom", intercom);

app.listen(PORT, () => {
  console.log(`Server running: ${process.pid} on http://localhost:${PORT}`);
});

export { app };
