const express = require("express");
const cors = require("cors");
const { middlewareLogger, returnLog } = require("./middleware/logger");
const { uuid } = require("uuidv4");

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
  const { title, url, techs } = request.body;
  let errors = []
  let newRepo = {
    id: '',
    title,
    url,
    techs,
  }

  if (!newRepo.title)
    errors.push("Missing body parameter : title");

  if (!newRepo.url)
    errors.push("Missing body parameter : url");

  if (!newRepo.techs)
    errors.push("Missing body parameter : techs");
  else {
    const hasEmptyValue = newRepo.techs.filter(repo => repo === '');
    if (hasEmptyValue.length > 0)
      errors.push("Tech name cannot be empty")
  }

  if (errors.length > 0) {
    return response.status(400).json(errors)
  }

  newRepo.id = uuid();
  return response.status(200).json(newRepo);
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
