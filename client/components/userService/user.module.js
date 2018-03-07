'use strict';

import angular from 'angular';
import {UserService} from './user.service';
import resource from 'angular-resource';

export default angular.module('comp3705App.user', [resource])
.factory('User', UserService)
.name;
