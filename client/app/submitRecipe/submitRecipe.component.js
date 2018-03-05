import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './submitRecipe.routes';

export class SubmitController {
  /*@ngInject*/
  constructor($http, $uibModal, User, Recipe) {
    this.$http = $http;
    this.User = User;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;
    this.setData();
    this.getUserData();
    this.getRecipeData();
  }

  setData() {

  }
}

export default angular.module('comp3705App.submit', [ngRoute])
  .config(routing)
  .component('submit', {
    template: require('./submitRecipe.html'),
    controller: SubmitController,
    controllerAs: 'submitController'
  })
  .name;
