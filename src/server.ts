import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.contentType("application/json");
  next();
});
app.use(routes);

const port = 8080;

app.listen(port, () => {
  console.log("Server running on port " + port);
});
