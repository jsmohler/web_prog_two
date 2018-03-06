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

  submitForm() {
    var form = document.getElementById('myForm');
    var formData = new FormData(form);
    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);
  }

  addIngr() {
    var table = document.getElementById('ingredients');
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var amount = document.createElement("td");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("required", "required");
    nameInput.setAttribute("ng-model", "recipeController.recipes.ingredients.name");
    nameInput.setAttribute("class", "form-control");

    var amountInput = document.createElement("input");
    amountInput.setAttribute("required", "required");
    amountInput.setAttribute("ng-model", "recipeController.recipes.ingredients.amount");
    amountInput.setAttribute("class", "form-control");

    name.appendChild(nameInput);
    amount.appendChild(amountInput);

    row.appendChild(name);
    row.appendChild(amount);

    table.appendChild(row);
  }

  addDire() {
    var div = document.getElementById("dir");
    var input = document.createElement("input");
    input.setAttribute("required", "required");
    input.setAttribute("ng-model", "recipeController.recipes.directions[0]");
    input.setAttribute("class", "form-control");

    div.appendChild(input);
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
