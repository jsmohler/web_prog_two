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
    this.rate = 5;
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

  updateIngredients(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModalEditIngredients.html'),
      controller: 'updateRecipeController as updateRecipeController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  addReview(recipe) {
    this.$uibModal.open({
      template: require('../../components/createReviewModal/createReviewModal.html'),
      controller: 'createReviewController as createReviewController',
      resolve: {
        recipe: () => recipe
      }
    });
  }

  updateReviewDescription(review, recipe) {
    this.$uibModal.open({
      template: require('../../components/updateReviewModal/updateReviewModal.html'),
      controller: 'updateReviewController as updateReviewController',
      resolve: {
        recipe: () => recipe,
        review: () => review
      }
    });
  }

  updateReviewRating(review, recipe) {
    this.$uibModal.open({
      template: require('../../components/updateReviewModal/updateReviewRatingModal.html'),
      controller: 'updateReviewController as updateReviewController',
      resolve: {
        recipe: () => recipe,
        review: () => review
      }
    });
  }

  deleteReview(recipe, review) {
    this.Recipe.destroyReview(recipe, review)
      .then(result => {
        location.reload();
      })
      .catch(err => {
        console.error(err);
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

  deleteIngredient(name, amount) {
    var recipe = this.recipes;
    var ingredient = {
      name: name,
      amount: amount
    };
    recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1);
    this.Recipe.updateRecipe(recipe)
      .catch(err => {
        console.error(err);
      });
  }

  updateDirections(recipe) {
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
