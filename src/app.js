const express = require("express");
const cors = require("cors");
const { middlewareLogger , returnLog } = require("./middleware/logger");
// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());
app.use(middlewareLogger);

const repositories = [];


app.get("/repositories", (request, response) => {
  const { title } = request.query;
  if (title) {
    const reposMatched = repositories.filter(repo => {
      return repo.title.includes(title)
    })
    return response.status(200).json(reposMatched);
  }
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

app.get("/log", returnLog);

module.exports = app;
