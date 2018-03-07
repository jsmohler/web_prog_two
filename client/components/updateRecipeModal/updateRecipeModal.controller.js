import angular from 'angular';

export class UpdateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
    this.command = "";
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  cmand(cmd) {
    this.command = cmd;
  }

  submitForm() {
    if (this.command === "addIng") {
      var name = document.getElementById('ingredient').value;
      var amount = document.getElementById('ingredientAmount').value;
      var ingredient = {
        name: name,
        amount: amount
      }
      this.recipe.ingredients.push(ingredient);
    } else if (this.command === "cook") {
      this.recipe.cookTime = parseInt(document.getElementById('cook').value);
    } else if (this.command === "description") {
      this.recipe.description = document.getElementById('description').value;
    } else if (this.command === "image") {
      this.recipe.image = document.getElementById('image').value;
    } else if (this.command === "name") {
      this.recipe.name = document.getElementById('name').value;
    } else if (this.command === "prep") {
      this.recipe.prepTime = parseInt(document.getElementById('prep').value);
    } else if (this.command === "addDir") {
      this.recipe.directions.push(document.getElementsByName('direction')[0].value);
    } else if (this.command === "editDir") {
      var directions = document.getElementsByName('direction');
      var newDirections = [];
      for (var i = 0; i < directions.length; i++) {
        newDirections.push(directions[i].value);
      }

      this.recipe.directions = newDirections;
    } else if (this.command === "editIng") {
      var ingredientNames = document.getElementsByName('ingredientName');
      var ingredientAmounts = document.getElementsByName('ingredientAmount');
      var newIngredients = [];
      for (var i = 0; i < ingredientNames.length; i++) {
        var ingredient = {};
        ingredient.name = ingredientNames[i].value;
        ingredient.amount = ingredientAmounts[i].value;
        newIngredients.push(ingredient);
      }
      this.recipe.ingredients = newIngredients;
    } else {
      this.formError("Error processing " + this.command);
      return;
    }

    this.Recipe.updateRecipe(this.recipe)
      .then(result => {
        this.formInfo = 'Recipe successfully updated!';
      })
      .catch(err => {
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.updateRecipeModal', [])
  .controller('updateRecipeController', UpdateRecipeController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
