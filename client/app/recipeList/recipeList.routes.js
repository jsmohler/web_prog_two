'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/recipes/', {
    template: '<recipe-list></recipe-list>'
  });
}
