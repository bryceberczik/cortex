import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
// import path from "path";
import routes from "./routes/index";
import "./auth/strategies";
import "./auth/serializers";

dotenv.config();

const app = express();
const PORT = process.env.PORT!;

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true in production
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(process.cwd(), "../client/dist")));
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}.`);
});
