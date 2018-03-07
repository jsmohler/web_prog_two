'use strict';

export function UserService($resource) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $resource('/api/users/').query().$promise;
    },

    getUserById(userId) {
      return $resource('/api/users/:id').get({id: userId}).$promise;
    },

    updateUser(user) {
      let updateResource = $resource('api/users/:id', null, {
        update: {method:'PUT'}
      });
      return updateResource.update({id: user._id}, user).$promise;
    },

    createUser(user) {
      let createResource = $resource('api/users/', null, {
        create: {method : 'POST'}
      });
      return createResource.save({id: user._id}, user).$promise;
    },

    destroyUser(user) {
      let destroyResource = $resource('api/users/:id', null, {
        destroy: {method : 'DELETE'}
      });
      return destroyResource.remove({id: user._id}, user).$promise;
    },
  };
  return User;
}
