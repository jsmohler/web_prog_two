import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetails.routes';
import {UserService} from "../main/main.component";

export class UserDetailsController {
  /*@ngInject*/
  constructor($routeParams, User) {
    this.$routeParams = $routeParams;
    this.User = User;
    this.getUserData();
  }

  $onInit() {
    if (this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

  getUserData() {
    this.User.getUserById(this.$routeParams.id)
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default angular.module('comp3705App.userDetails', [ngRoute])
  .config(routing)
  .component('userDetails', {
    template: require('./userDetails.html'),
    controller: UserDetailsController,
    controllerAs: 'userDetailsController'
  })
  .name;
