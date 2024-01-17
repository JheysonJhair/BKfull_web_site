const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const aptitudesRouter = require("./routes/aptitudes.routes");
const briefcaseRouter = require("./routes/briefcase.routes");
const interestsRouter = require("./routes/interests.routes");
const db = require("./db/database");
const app = express();
require("dotenv").config;

const port = process.env.PORT;

(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    throw new Error(error);
  }
})();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:6996",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/user/", userRouter);
app.use("/api/interests/", interestsRouter);
app.use("/api/briefcase/", briefcaseRouter);
app.use("/api/aptitudes/", aptitudesRouter);

app.listen(port, () => {
  console.log("Servidor escuchando en http://localhost:" + port);
});
