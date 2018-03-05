'use strict';

import angular from 'angular';
import {RecipeService} from './recipe.service';

export default angular.module('comp3705.recipe', [])
  .factory('Recipe', RecipeService)
  .name;
