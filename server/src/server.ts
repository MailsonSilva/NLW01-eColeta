import express from "express";

const app = express();

app.get("/users", (request, response) => {
  console.log("Listagem de usuarios");
  response.json(["MAilson", "Davi", "Vilene", "Bel"]);
});

app.listen("3333");
