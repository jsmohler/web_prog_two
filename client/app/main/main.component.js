import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  /*@ngInject*/
  constructor($http, $uibModal, Recipe) {
    this.$http = $http;
    this.Recipe = Recipe;
    this.$uibModal = $uibModal;
    this.setData();
    this.getRecipeData();
  }

  setData() {
    this.active = 0;
    this.maxRating = 10;
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
    this.Recipe.getAllRecipes()
      .then(response => {
        this.recipes = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteRecipe(recipe) {
    this.Recipe.destroyRecipe(recipe)
      .then(result => {
        location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

  hoveringOver(value) {
    this.overStar = value;
    this.percent = 100 * (value / this.maxRating);
  };

}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'
  })
  .name;
