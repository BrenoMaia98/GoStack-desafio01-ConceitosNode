
const { uuid, isUuid } = require("uuidv4");
const fs = require("fs");


let repositories = [];

const portifolioController = {
  index(request, response) {
    const { title } = request.query;
    if (title) {
      const reposMatched = repositories.filter(repo => {
        return repo.title.includes(title)
      })
      return response.status(200).json(reposMatched);
    }
    return response.status(200).json(repositories);
  },

  create(request, response) {
    const { title, url, techs } = request.body;
    let errors = []
    let newRepo = {
      id: '',
      url,
      title,
      techs,
      likes: 0,
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
    repositories.push(newRepo)
    return response.status(200).json(newRepo);
  },

  edit(request, response) {
    const { title, url, techs } = request.body;
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: `Requested id is not a valid id!` });
    }

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: `There is no repository with id : ${id}` });
    }
    const modifiedRepo = {
      id,
      url,
      title,
      techs,
      likes: repositories[repositoryIndex].likes,
    }
    repositories[repositoryIndex] = modifiedRepo;

    return response.status(200).json(modifiedRepo);
  },

  deleteRepo(request, response) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: `Requested id is not a valid id!` });
    }

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: `There is no repository with id : ${id}` });
    }

    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  },

  like(request, response) {
    const { id } = request.params;

    if (!isUuid(id)) {
      return response.status(400).json({ error: `Requested id is not a valid id!` });
    }

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex < 0) {
      return response.status(400).json({ error: `There is no repository with id : ${id}` });
    }

    repositories[repositoryIndex].likes += 1;

    return response.status(200).json(repositories[repositoryIndex])

  },


  loadPortifolio(request, response) {
    fs.readFile("FakeDatabase.txt", "utf-8", (err, data) => {
      if (err) return response.status(400).json({ error: 'An error occured while reading database :( ' });
        repositories = JSON.parse(data)
        return response.status(200).json(repositories);
    })
  },


  savePortifolio(request, response) {
    const stringData = JSON.stringify(repositories);
    fs.writeFile("FakeDatabase.txt", stringData, (err) => {
      if (err) return response.status(400).json({ error: 'An error occured while saving database :( ' });
      return response.status(204).send();
    });
  },

}

module.exports = portifolioController