import uuidv4 from 'uuid/v4';

let users = [];

//Sends the users array as json to the res object
export function listContents(req, res) {
  res.send(users);
}

//Extracts a parameter named id and searches the users list for a user with a matching id
export function findOne(req, res) {
  var id = req.params.id;
  var bool = false;

  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      bool = true;
      res.send(users[i]);
    }
  }

  if (!bool) {
    res.status(404);
    res.send('{message:\"Not Found\"}');
  }
}

//Add new user object to the in-memory users list
export function createUser(req, res) {
  var user = {
    id: uuidv4(),
    name: req.body.name,
    address: req.body.address,
    age: req.body.age
  };

  users.push(user);
  res.status(201);
  res.send(user);
}
