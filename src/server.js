import app from "./app.js";
import dotenv from "dotenv";

const config = dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Rodando na porta: ", PORT)
})