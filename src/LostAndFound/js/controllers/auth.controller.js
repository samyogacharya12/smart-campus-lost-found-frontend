// ============================================================
// auth.controller.js
// Handles login, quick-login, and registration.
// No backend yet 
// ============================================================

angular.module('campusLostFound').controller('AuthCtrl', [
  '$scope',
  'ApiService',
  function($scope, ApiService) {

    // Form models 
    $scope.loginForm = { email: '', password: '' };
    $scope.regForm   = { firstName: '', lastName: '', email: '', studentId: '', password: '', confirmPassword: '' };
    $scope.authError = null;

    // Internal helper: set the logged-in user and navigate to the right starting page 
    function loginAs(role) {
      var parent = $scope.$parent;
      if (role === 'student') {
        parent.user = { name: 'Jordan Lee', initials: 'JL', role: 'student' };
        parent.loadStudentData();
        parent.goTo('dashboard');
      } else {
        parent.user = { name: 'Admin User', initials: 'AU', role: 'admin' };
        parent.loadAdminData();
        parent.goTo('admin-dashboard');
      }
    }

    // Fake login 
    // Clicking Login sends you to the student dashboard.

    $scope.fakeLogin = function() {
      $scope.authError = null;
      loginAs('student');
    };

    // Quick login buttons 
    // One click = logged in as that role (login not necessary)
    $scope.quickLogin = function(role) {
      $scope.authError = null;
      loginAs(role);
    };

    // Register
    // Validates the form then redirects to login.
  
    $scope.register = function() {
      $scope.authError = null;

      // Basic validation
      if (!$scope.regForm.firstName || !$scope.regForm.email || !$scope.regForm.password) {
        $scope.authError = 'Please fill in all required fields.';
        return;
      }
      if ($scope.regForm.password !== $scope.regForm.confirmPassword) {
        $scope.authError = 'Passwords do not match.';
        return;
      }

      // test success - just go back to login
      $scope.$parent.goTo('login');    };

  }
]);