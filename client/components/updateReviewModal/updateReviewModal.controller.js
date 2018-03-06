import angular from 'angular';

export class UpdateReviewController {
  /*@ngInject*/
  constructor($uibModalInstance, Review, review, Recipe, recipe) {
    console.log("controller");
    this.Review = Review;
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.review = review;
    this.recipe = recipe;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.updateReview(this.review, this.recipe)
      .then(result => {
        console.log("uPM controller");
        this.formInfo = 'Review successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err;
      });
  }
}

export default angular.module('comp3705App.updateReviewModal', [])
  .controller('updateReviewController', UpdateReviewController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
