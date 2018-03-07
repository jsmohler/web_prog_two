'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
const ngRoute = require('angular-route');
import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import chefs from './chefs/chefs.component';
import submitRecipe from './submitRecipe/recipe.component';
import recipeDetail from './recipeDetails/recipeDetails.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import user from '../components/userService/user.module';
import recipe from '../components/recipeService/recipe.module';
import updateUserModal from '../components/updateUserModal/updateUserModal.controller';
import updateReviewModal from '../components/updateReviewModal/updateReviewModal.controller';
import updateRecipeModal from '../components/updateRecipeModal/updateRecipeModal.controller';
import createUserModal from '../components/createUserModal/createUserModal.controller';
import createReviewModal from '../components/createReviewModal/createReviewModal.controller';

import './app.scss';

angular.module('comp3705App', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap,
main, chefs, constants, util, recipeDetail, submitRecipe, user, updateUserModal,
updateRecipeModal, createUserModal, createReviewModal, updateReviewModal, recipe])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['comp3705App'], {
      strictDi: true
    });
  });
