import angular from 'angular';

export class UpdateUserController {
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
    var form = document.getElementById('updateUser');
    var formData = new FormData(form);
    var user = this.user;
    formData.forEach(function(value, key) {
      if (key == "first") {
        user.name.firstName = value;
      } else if (key == "last") {
        user.name.lastName = value;
      } else if (key == "email") {
        user.email = value;
      }
    });
    this.User.updateUser(user)
      .then(result => {
        this.formInfo = 'User ' + result._id + ' successfully updated!';
      })
      .catch(err => {
        console.error(err);
        this.formError = err.data;
      });
  }
}

export default angular.module('comp3705App.updateUserModal', [])
  .controller('updateUserController', UpdateUserController)
  .config(['$qProvider', function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .name;
