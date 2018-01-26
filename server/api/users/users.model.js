import uuidv4 from 'uuid/v4';

class User {
  users = [];

  find() {
    return this.users.join();
  }

  findById(userId) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == userId) {
        return this.users[i];
      }
    }
    return null;
  }

  create(user) {
    // Create a new user
    var newUser = {
      id: uuidv4(),
      name: user.name,
      address: user.address,
      age: user.age
    };
    this.users.push(newUser);

    // Return created user
    return newUser;
  }

  findOneAndUpdate(user) {
    var index = -1;
    var newUser;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == user.id) {
         index = i;
      }
    }

    if (index == -1) {
      newUser = null;
    } else {
      newUser = this.users[index];
    }

    if(newUser == null) {
      newUser = {
        id: user.id,
        name: user.name,
        address: user.address,
        age: user.age
      };
      this.users.push(newUser);
      return false;
    } else {
      newUser.name = user.name;
      newUser.address = user.address;
      newUser.age = user.age;
      return true;
    }
  }

  remove(user) {
    // Remove user if exists with the Id provided
    // Return true if removed
    // Return false if did user not exist
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == user.id) {
        this.users.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}

export default new User();
