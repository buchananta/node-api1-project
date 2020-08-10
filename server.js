const express = require('express');
const server = express();
const port = 1234;
let users = [ {'id': 1, 'name': 'Trevor Buchanan'} ];

server.listen(port);

server.get('/', function(req, res) {
  console.log(res);
  res.send(`hello, api is up`);
});

server.get('/api/users', function(req, res) {
  res.json(users);
});

server.get('/api/users/:id', function(req, res) {
  const user = users.find(e => e.id == req.params.id);
  if (user) {
    res.json(user);
  } else res.status(404).json({message: 'not found'});
});