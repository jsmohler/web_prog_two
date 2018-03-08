import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipe.routes';

export class RecipeController {
  /*@ngInject*/
  constructor($routeParams, Recipe, $uibModal) {
    this.$routeParams = $routeParams;
    this.$uibModal = $uibModal;
    this.Recipe = Recipe;
  }

  $onInit() {
  }

  submitForm() {
    var form = document.getElementById('myForm');
    var formData = new FormData(form);
    var object = {
      "directions": [],
      "ingredients": []
    };
    var ingredient = {};
    formData.forEach(function(value, key) {
      if (key == "directions") {
        object.directions.push(value);
      } else if (key == "ingredients[name]") {
        ingredient = {};
        ingredient.name = value;
      } else if (key == "ingredients[amount]") {
        ingredient.amount = value;
        object.ingredients.push(ingredient);
      } else {
        object[key] = value;
      }
    });
    var json = JSON.stringify(object);

    this.Recipe.createRecipe(json)
      .then(result => {
        location.reload();
        window.alert('Recipe successfully created!');
      })
      .catch(err => {
        console.error(err);
        window.alert(err.data);
      });
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
    nameInput.setAttribute("name", "ingredients[name]");

    var amountInput = document.createElement("input");
    amountInput.setAttribute("required", "required");
    amountInput.setAttribute("ng-model", "recipeController.recipes.ingredients.amount");
    amountInput.setAttribute("class", "form-control");
    amountInput.setAttribute("name", "ingredients[amount]");

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
    input.setAttribute("ng-model", "recipeController.recipes.directions");
    input.setAttribute("class", "form-control");
    input.setAttribute("name", "directions");

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
