import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import customers from "../app/controllers/CustomersController.js";
import contacts from "../app/controllers/ContactsController.js";
import users from "../app/controllers/UsersController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = new Router();

// Middleware local:

// const checkPermission = (req, res, next) => {
//   const usersAllowed = ["Henry", "Isis"];
//   const { name } = req.query;

//   if (!usersAllowed.includes(name)) {
//     return res
//       .status(401)
//       .json({ error: "User not allowed to acess this resource." });
//   }

//   next();
// };

// routes.get("/", checkPermission, (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
// });

routes.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

// Customers
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:id", contacts.update);
routes.delete("/customers/:customerId/contacts/:id", contacts.destroy);

// Users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

export default routes;
