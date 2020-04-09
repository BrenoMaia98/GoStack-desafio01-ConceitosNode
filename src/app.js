const express = require("express");
const cors = require("cors");
const { middlewareLogger, index } = require("./middleware/logger");
const {portifolioController } = require("./controller/portifolioController");
// const {loadPortifolio,savePortifolio } = require("./controller/fakeDatabase");



const app = express();


app.use(express.json());

app.use(cors());

app.use(middlewareLogger);


app.get("/portifolio", portifolioController.loadPortifolio);
app.post("/portifolio", portifolioController.savePortifolio);

app.get("/repositories", portifolioController.index);
app.post("/repositories", portifolioController.create);
app.put("/repositories/:id", portifolioController.edit);
app.delete("/repositories/:id", portifolioController.delete);

app.post("/repositories/:id/like", portifolioController.like);


app.get("/log", index);

module.exports = app;
