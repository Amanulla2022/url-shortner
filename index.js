import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import {
  createShortUrl,
  redirectToLongUrl,
} from "./controller/urlControllers.js";

const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("view"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/url-shortner", createShortUrl);

app.get("/:shortUrl", redirectToLongUrl);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
