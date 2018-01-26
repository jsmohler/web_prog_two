import User from './users.model';

//Sends the users array as json to the res object
export function index(req, res) {
  res.send(User.find());
}

//Extracts a parameter named id and searches the users list for a user with a matching id
export function show(req, res) {
  var id = req.params.id;
  let user = User.findById(id);

  if (user === null) {
    res.status(404);
    res.send('{message:\"Not Found\"}');
  } else {
    res.send(user);
  }
}

//Add new user object to the in-memory users list
export function create(req, res) {
  let user = {
    id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age
  };

  res.status(201);
  res.send(User.create(user));
}

//Edit user information if it exists, otherwise create new user with specified id
export function upsert(req, res) {
  let user = {
    id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age
  };

  let bool = User.findOneAndUpdate(user);

  if (bool) {
    res.status(200);
    res.send(user);
  } else {
    res.status(201);
    res.send(user);
  }
}

//Remove user from local memory if exists
export function destroy(req, res) {
  let user = {
    id: req.params.id,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age
  };

  let bool = User.remove(user);

  if(bool) {
    res.status(204).send();
  } else {
    res.status(404);
    res.send('{message:\"Not Found\"}');
  }
}
