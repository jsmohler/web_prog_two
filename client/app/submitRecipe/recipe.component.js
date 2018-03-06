import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipe.routes';

export class RecipeController {
  /*@ngInject*/
  constructor($routeParams, Recipe, $uibModal) {
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.Recipe = Recipe;
    this.setData();
  }

  $onInit() {
    if (this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

  setData() {

  }
}

export default angular.module('comp3705App.recipe', [ngRoute])
  .config(routing)
  .component('recipe', {
    template: require('./recipe.html'),
    controller: RecipeController,
    controllerAs: 'recipeController'
  })
  .name;
