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

  submitForm(command) {
    if (command === "description") {
      this.review.description = document.getElementById('description').value;
    } else if (command === "rating") {
      this.review.rating = document.getElementById('rating').value;
    } else {
      console.error("Could not process " + command);
    }
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
