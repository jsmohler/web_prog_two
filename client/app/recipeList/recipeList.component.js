import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeList.routes';

export class AllRecipesController {
  /*@ngInject*/
  constructor($http, $uibModal, Recipe) {
    this.$http = $http;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;
  }

  setData() {

  }
}

export default angular.module('comp3705App.recipes', [ngRoute])
  .config(routing)
  .component('recipes', {
    template: require('./recipeList.html'),
    controller: AllRecipesController,
    controllerAs: 'recipesController'
  })
  .name;
