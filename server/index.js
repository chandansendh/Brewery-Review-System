require("dotenv").config();
const express = require("express");
const authRouter = require("./Router/auth-route");
const reviewRouter = require("./Router/review-route");
const app = express();
const connectdb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

// const corsOptions = {
//   origin: ["http://localhost:3001", "http://localhost:3000"],
//   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//   credentials: true,
// };

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use(("/api/review"),reviewRouter);

app.use(errorMiddleware);

const PORT = 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
