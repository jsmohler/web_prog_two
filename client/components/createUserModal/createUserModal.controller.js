import angular from 'angular';

export class CreateUserController {
  /*@ngInject*/
  constructor($uibModalInstance, User, user) {
    this.User = User;
    this.$uibModalInstance = $uibModalInstance;
    this.user = user;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.User.createUser(this.user)
      .then(result => {
        this.formInfo = 'New User ID: ' + result._id;
        location.reload();
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.createUserModal', [])
  .controller('createUserController', CreateUserController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
