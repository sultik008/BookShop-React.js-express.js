import express from "express";
import cors from "cors";
import router from "./router/router.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use('/api' , router);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("express connected");
});
