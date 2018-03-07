import angular from 'angular';

export class CreateReviewController {
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
    var description = document.getElementById('description').value;
    var rating = document.getElementById('rating').value;
    var user = document.getElementById('user').value;
    var review = {
      description: description,
      rating: rating,
      user: user
    };

    this.Recipe.createReview(this.recipe, review)
      .then(result => {
        this.formInfo = 'New Review ID: ' + result._id;
        location.reload();
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.createReviewModal', [])
  .controller('createReviewController', CreateReviewController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
