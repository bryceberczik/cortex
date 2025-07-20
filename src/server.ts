import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT!;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(process.cwd(), "../client/dist")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});
