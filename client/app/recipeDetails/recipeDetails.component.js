import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetails.routes';

export class RecipeDetailsController {
  /*@ngInject*/
  constructor($routeParams, Recipe, $uibModal) {
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
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

  updateImage(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalImage.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateName(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalName.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateDescription(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalDescription.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updatePrep(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalPrep.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateCook(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalCook.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateIngredient(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalIngredient.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  addIngredient(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalIngredient.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateDirection(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalDirection.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
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
