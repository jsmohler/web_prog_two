'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },

    getRecipeById(recipeId) {
      return $resource('/api/recipes/:id').get({id: recipeId}).$promise;
    },

    updateRecipe(recipe) {
      let updateResource = $resource('api/recipes/:id', null, {
        update: {method:'PUT'}
      });
      return updateResource.update({id: recipe._id}, recipe).$promise;
    },

    updateReview(review, recipe) {
      let updateResource = $resource('api/recipes/:recipeId/reviews/:reviewId', null, {
        update: {method:'PUT'}
      });
      return updateResource.update({reviewId: review._id, recipeId: recipe._id}, review).$promise;
    },

    createRecipe(recipe) {
      let createResource = $resource('api/recipes/', null, {
        create: {method : 'POST'}
      });
      return createResource.save({id: recipe._id}, recipe).$promise;
    },

    createReview(recipe, review) {
      let createResource = $resource('api/recipes/:recipeId/reviews', null, {
        create: {method : 'POST'}
      });
      return createResource.save({recipeId: recipe._id}, review).$promise;
    },

    destroyRecipe(recipe) {
      let destroyResource = $resource('api/recipes/:id', null, {
        destroy: {method : 'DELETE'}
      });
      return destroyResource.remove({id: recipe._id}, recipe).$promise;
    },

    destroyReview(recipe, review) {
      let destroyResource = $resource('api/recipes/:recipeId/reviews/:id', null, {
        destroy: {method : 'DELETE'}
      });
      return destroyResource.remove({recipeId: recipe._id, id: review._id}, review).$promise;
    }
  };
  return Recipe;
}
