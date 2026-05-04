// ============================================================
// app.js — Angular module definition
// This file must be loaded first
// ============================================================

angular.module('campusLostFound', []);

// ------------------------------------------------------------
// Page title map
// Used by all controllers to set the topbar title when
// navigating to a new page.
// ------------------------------------------------------------
angular.module('campusLostFound').constant('PAGE_TITLES', {
  'login':          'Login',
  'register':       'Register',
  'dashboard':      'Dashboard',
  'lost-items':     'Lost Items',
  'found-items':    'Found Items',
  'item-detail':    'Item Detail',
  'report-lost':    'Report Lost Item',
  'submit-found':   'Submit Found Item',
  'claims':         'Claims',
  'notifications':  'Notifications',
  'admin-dashboard':'Admin Dashboard'
});
