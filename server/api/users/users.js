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
      break;
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

//Edit user information if it exists, otherwise create new user with specified id
export function updateUser(req, res) {
  var id = req.params.id;
  var bool = false;
  var found;

  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      bool = true;
      found = users[i];
      break;
    }
  }

  if (bool) {
    found.name = req.body.name;
    found.address = req.body.address;
    found.age = req.body.age;
    res.status(200);
    res.send(found);
  } else {
    var user = {
      id: id,
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    };

    users.push(user);
    res.status(201);
    res.send(user);
  }
}

//Remove user from local memory if exists
export function removeUser(req, res) {
  var id = req.params.id;
  var bool = false;
  var index;

  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      bool = true;
      index = i;
      break;
    }
  }

  if(bool) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404);
    res.send('{message:\"Not Found\"}');
  }
}
