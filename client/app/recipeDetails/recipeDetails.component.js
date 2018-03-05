import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetails.routes';

export class RecipeDetailsController {
  /*@ngInject*/
  constructor($routeParams, Recipe) {
    this.$routeParams = $routeParams;
    this.Recipe = Recipe;
    this.getRecipeData();
  }

  $onInit() {
    if(this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

  getRecipeData() {
    this.Recipe.getRecipeById(this.$routeParams.id)
      .then(response => {
        this.recipes = response;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default angular.module('comp3705App.recipeDetails', [ngRoute])
  .config(routing)
  .component('recipeDetails', {
    template: require('./recipeDetails.html'),
    controller: RecipeDetailsController,
    controllerAs: 'recipeDetailsController'
  })
  .name;
