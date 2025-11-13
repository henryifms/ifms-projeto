import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import menu from "../app/controllers/MenuController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = new Router();

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"))
});

routes.get("/menu", menu.index);
routes.post("/menu", menu.create)

export default routes;