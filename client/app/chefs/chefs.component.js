import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './chefs.routes';

export class ChefController {
  /*@ngInject*/
  constructor($http, $uibModal, User) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.getUserData();
  }

  $onInit() {}

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  add(user) {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController',
      resolve: {
        user: () => user
      }
    });
  }

  edit(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    });
  }

  deleteUser(user) {
    this.User.destroyUser(user)
      .then(result => {
        location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default angular.module('comp3705App.users', [ngRoute])
  .config(routing)
  .component('users', {
    template: require('./chefs.html'),
    controller: ChefController,
    controllerAs: 'chefController'
  })
  .name;
