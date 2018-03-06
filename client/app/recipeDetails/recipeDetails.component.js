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
    this.setData();
  }

  $onInit() {
    if(this.$routeParams.id) {
      this.valueEntered = true;
      this.id = this.$routeParams.id;
    } else {
      this.valueEntered = false;
    }
  }

  setData() {
    this.active = 0;
    this.maxRating = 5;
    this.rate = 8;
    this.isReadOnly = false;
    this.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];
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

  updateReview(review, recipe) {
    console.log(review);
    console.log(recipe);
    this.$uibModal.open({
      template: require('../../components/updateReviewModal/updateReviewModalDescription.html'),
      controller: 'updateReviewController',
      controllerAs: 'updateReviewController',
      resolve: {
        review: () => review,
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

  addDirection(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalDirection.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  deleteDirection(direction) {
    var recipe = this.recipes;
    recipe.directions.splice(recipe.directions.indexOf(direction), 1);
    this.Recipe.updateRecipe(recipe)
      .catch(err => {
        console.error(err);
      });
  }

  updateDirection(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalEditDirections.html'),
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
