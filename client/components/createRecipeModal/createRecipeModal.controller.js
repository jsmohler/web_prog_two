import angular from 'angular';

export class CreateRecipeController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Recipe.createRecipe(this.recipe)
      .then(result => {
        this.formInfo = 'New Recipe ID: ' + result._id;
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.createRecipeModal', [])
  .controller('createRecipeController', CreateRecipeController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
