const express = require("express");
const cors = require("cors");

const { middlewareLogger, index : returnLogs } = require("./middleware/logger");
const { 
  loadPortifolio, 
  savePortifolio, 
  index, 
  create, 
  edit, 
  deleteRepo, 
  like 
} = require("./controller/portifolioController");


const app = express();


app.use(express.json());

app.use(cors());

app.use(middlewareLogger);


app.get("/portifolio", loadPortifolio);
app.post("/portifolio", savePortifolio);

app.get("/repositories", index);
app.post("/repositories", create);
app.put("/repositories/:id", edit);
app.delete("/repositories/:id", deleteRepo);

app.post("/repositories/:id/like", like);


app.get("/log", returnLogs);

module.exports = app;
