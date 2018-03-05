import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
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
    this.myInterval = 5000;
    this.noWrapSlides = false;
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

  getUserData() {
    this.User.getAllUsers()
      .then(response => {
        this.users = response;
      })
      .catch(error => {
        console.error(error);
      });
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

  createRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/createRecipeModal/createRecipeModal.html'),
      controller: 'createRecipeController as createRecipeController',
      resolve: {
        recipe: () => recipe
      }
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
