'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/submitRecipe/', {
    template: '<submit-recipe></submit-recipe>'
  });
}
