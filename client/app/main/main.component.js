import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, User) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.setData();
    this.getUserData();
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateUser(user) {
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserController as updateUserController',
      resolve: {
        user: () => user
      }
    });
  }

  createUser(user) {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserController as createUserController',
      resolve: {
        user: () => user
      }
    });
  }
}

export function SquareFilter() {
  var squareFunction = function(value) {
    return value * value;
  }
  return squareFunction;
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .filter('Square', SquareFilter)
  .name;
