const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

let Globallikes = 0;

app.get("/repositories", (request, response) => {
   return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  
  const { url, title, techs } = request.body;
  
  const repository = { id:uuid(), title, url, techs, likes:0 }
  
  repositories.push(repository);

  // console.log(repository);
  return response.send(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs, likes} = request.body;
 
  const indexRepositories = repositories.findIndex(repository => repository.id === id) ;
  
  if(indexRepositories < 0){
    return response.status(400).json({ error:'Project not found. ou numero de likes' });
  }
 

  const repository ={
      id,
      title,
      url,
      techs,
      likes: repositories[indexRepositories].likes
  }
  
  repositories[indexRepositories] = repository;
  return response.send(repository);

 });

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const indexRepositories = repositories.findIndex(repository => repository.id === id);
  
  if(indexRepositories < 0){
    return response.status(400).json({ error:'Registro não existente' });
  }

  repositories.splice(indexRepositories, 1);
  response.status(204).send("No Content");
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
    
  
  const indexRepositories = repositories.findIndex(repository => repository.id === id)

  if(indexRepositories < 0){
    return response.status(400).json({error:'Usuário não existente'});
  }

  repositories[indexRepositories].likes++;
  
  response.json(repositories[indexRepositories]);

});


module.exports = app;
