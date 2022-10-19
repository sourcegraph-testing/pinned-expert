import express from "express";
import cors from "cors";
import {} from "dotenv/config";
import { searchByCategory, searchByName } from "./searchEmoji.js";
import productsRoute from "./routes/products.js";
import usersRoute from "./routes/users.js";
import { sender } from "./sendMassage.js";

const app = express();
const PORT = 8080;

// sender();

app.use(cors());
app.use(express.json());

app.use("/products", productsRoute);
app.use("/users", usersRoute);

app.listen(PORT, () => console.log("listening on PORT " + PORT));

app.get("/", (req, res) => {
  res.send(searchByCategory(req.query.s));
});
