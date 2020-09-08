const express = require('express');
const server = express();
const port = 1234;
let users = [ {'id': 1, 'name': 'Trevor Buchanan'} ];

server.use(express.json());
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

server.post('/api/users', function(req, res) {
  if (req.body.name) {
    users.push({ id: 1 + users.reduce((acc, user) => user.id > acc ? acc = user.id : acc, 0),
    name: req.body.name})
    console.log(users);
    res.status(200).send();
  } else {
    res.status(500).send();
  }
});

server.delete('/api/users/:id', function(req, res) {
  const result = users.filter((user) => user.id != req.params.id);
  if (result.length < users.length) {
    res.status(200).send();
    users = result;
  } else {
    res.status(500).json({message: `user with id ${req.params.id} does not exist`});
  }
  console.log(users)
})