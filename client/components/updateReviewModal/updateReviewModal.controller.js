import angular from 'angular';

export class UpdateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe, review) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
    this.review = review;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.review.description = document.getElementById('description').value;
    this.Recipe.updateReview(this.review, this.recipe)
      .then(result => {
        this.formInfo = 'Review ' + result._id + ' successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.updateReviewModal', [])
  .controller('updateReviewController', UpdateReviewController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
