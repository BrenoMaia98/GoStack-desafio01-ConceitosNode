let logArray = [];
const Logger = {

  middlewareLogger: (request, response, next) => {
    const { url, method, body, query, params } = request;
    const begin = Date.now();
    next();
    const end = Date.now();

    const msgLog = `[${method}] ${url} :`
    const timeSpent = `${(end - begin) / 1000}ms`;


    logArray.push({
      request: `${msgLog} ${timeSpent}`,
      body,
      query,
      params,
    });
  },

  index: (req, resp, next) =>{
    return resp.status(200).json(logArray)
  }  
}

module.exports = Logger;