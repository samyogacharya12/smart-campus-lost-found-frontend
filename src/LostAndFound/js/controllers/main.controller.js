// ============================================================
// main.controller.js
// Root controller - attached to <body>.
// Contains: navigation, user session, dummy data, and badge counts.
// ============================================================

angular.module('campusLostFound').controller('MainCtrl', [
  '$scope',
  'PAGE_TITLES',
  function($scope, PAGE_TITLES) {

    // Navigation & session state 
    $scope.currentPage    = 'login';
    $scope.prevPage       = null;
    $scope.pageTitle      = 'Login';
    $scope.user           = null;

    //  Shared UI state 
    $scope.searchQuery    = '';
    $scope.catFilter      = '';
    $scope.claimFilter    = '';
    $scope.formSuccess    = false;
    $scope.selectedItem   = null;

    //  Modal state 
    $scope.showClaimModal = false;
    $scope.claimItem      = null;
    $scope.claimForm      = {};

    // Navigate to a page 
    $scope.goTo = function(page) {
      $scope.prevPage    = $scope.currentPage;
      $scope.currentPage = page;
      $scope.pageTitle   = PAGE_TITLES[page] || page;
      $scope.formSuccess = false;
      $scope.catFilter   = '';
    };

    // Go back 
    $scope.goBack = function() {
      $scope.goTo($scope.prevPage || 'dashboard');
    };

    // Logout 

    $scope.logout = function() {
      $scope.user = null;
      $scope.goTo('login');
    };

    // Badge counts 
    $scope.pendingCount = 0;
    $scope.unreadCount  = 0;

    $scope.$watch('myClaims', function(v) {
      if ($scope.user && $scope.user.role === 'student') {
        $scope.pendingCount = (v || []).filter(function(c) {
          return c.status === 'pending';
        }).length;
      }
    }, true);

    $scope.$watch('allClaims', function(v) {
      if ($scope.user && $scope.user.role === 'admin') {
        $scope.pendingCount = (v || []).filter(function(c) {
          return c.status === 'pending';
        }).length;
      }
    }, true);

    $scope.$watch('notifications', function(v) {
      $scope.unreadCount = (v || []).filter(function(n) {
        return n.unread;
      }).length;
    }, true);

    //  Dummy data 
    // Loaded by loadStudentData() or loadAdminData() after login.

    $scope.DUMMY_LOST = [
      { id:1,  name:'Blue Dell Laptop',   emoji:'💻', category:'Electronics', location:'Library, 2nd Floor',  date:'May 1, 2026',  reportedBy:'Jordan Lee',  type:'lost', description:'Blue Dell Inspiron 15, NASA sticker on the lid.' },
      { id:2,  name:'AirPods Pro Case',   emoji:'🎧', category:'Electronics', location:'Science Hall',        date:'Apr 30, 2026', reportedBy:'Maya Chen',   type:'lost', description:'White AirPods Pro case, scratched on the bottom.' },
      { id:3,  name:'Red Backpack',       emoji:'🎒', category:'Accessories', location:'Cafeteria',           date:'Apr 29, 2026', reportedBy:'Tyler Brown', type:'lost', description:'Red JanSport backpack, keychain on the zipper.' },
      { id:4,  name:'Student ID Card',    emoji:'💳', category:'ID / Cards',  location:'Gym Entrance',        date:'Apr 28, 2026', reportedBy:'Sam Okonkwo', type:'lost', description:'Student ID — Sam Okonkwo, Class of 2027.' },
      { id:5,  name:'Gray Hoodie',        emoji:'👕', category:'Clothing',    location:'Soccer Field',        date:'Apr 27, 2026', reportedBy:'Priya Nair',  type:'lost', description:'Plain gray Champion hoodie, size XL.' },
      { id:6,  name:'Calculus Textbook',  emoji:'📖', category:'Other',       location:'Math Bldg, Rm 204',  date:'Apr 26, 2026', reportedBy:'Chris Evans', type:'lost', description:'Calculus Early Transcendentals, 8th ed.' }
    ];

    $scope.DUMMY_FOUND = [
      { id:7,  name:'Black Umbrella',     emoji:'☂️',  category:'Accessories', location:'Main Entrance',       date:'May 1, 2026',  reportedBy:'Keisha M.',  type:'found', description:'Plain black umbrella, no identifying marks.' },
      { id:8,  name:'YETI Water Bottle',  emoji:'🍶', category:'Accessories', location:'Gym Locker Room',     date:'Apr 30, 2026', reportedBy:'Derek W.',   type:'found', description:'White YETI 30oz, initials T.B. on the bottom.' },
      { id:9,  name:'iPhone 15',          emoji:'📱', category:'Electronics', location:'Parking Lot B',      date:'Apr 30, 2026', reportedBy:'Lena Park',  type:'found', description:'Black iPhone 15, cracked screen protector.' },
      { id:10, name:'Key Ring',           emoji:'🔑', category:'Other',       location:'Student Union',      date:'Apr 28, 2026', reportedBy:'James T.',   type:'found', description:'3 keys and a blue rabbit foot keychain.' },
      { id:11, name:'Reading Glasses',    emoji:'👓', category:'Accessories', location:'Library Quiet Room', date:'Apr 27, 2026', reportedBy:'Dana Reyes', type:'found', description:'Round metal-frame glasses in a brown case.' }
    ];

    $scope.DUMMY_NOTIFICATIONS = [
      { id:1, icon:'✅', bg:'#dcfce7', title:'Claim Approved',       desc:'Your claim for AirPods Pro has been approved. Pick up at Office.', time:'2 hours ago',  unread:true  },
      { id:2, icon:'🔍', bg:'#dbeafe', title:'Possible Match Found', desc:'A found item may match your Blue Dell Laptop report.',                       time:'5 hours ago',  unread:true  },
      { id:3, icon:'📋', bg:'#fef9c3', title:'Claim Submitted',      desc:'Your claim for iPhone 15 is under admin review.',                            time:'1 day ago',    unread:false },
      { id:4, icon:'❗', bg:'#fee2e2', title:'Claim Rejected',       desc:'Your claim for Black Umbrella was rejected. See admin note.',                 time:'3 days ago',   unread:false },
      { id:5, icon:'🎉', bg:'#ede9fe', title:'Item Returned!',       desc:'Your Red Backpack has been marked as resolved.',                              time:'1 week ago',   unread:false }
    ];

    // Load student data 
    $scope.loadStudentData = function() {

      $scope.lostItems = angular.copy($scope.DUMMY_LOST);

      $scope.foundItems = angular.copy($scope.DUMMY_FOUND);

   
      $scope.myClaims = [
        { id:1, itemName:'iPhone 15',        emoji:'📱', claimDate:'Apr 30, 2026', status:'pending',  adminNote: null },
        { id:2, itemName:'AirPods Pro Case',  emoji:'🎧', claimDate:'Apr 25, 2026', status:'approved', adminNote:'Verified. Collect from Security Office.' },
        { id:3, itemName:'Black Umbrella',    emoji:'☂️',  claimDate:'Apr 20, 2026', status:'rejected', adminNote:'Could not verify ownership.' }
      ];


      $scope.notifications = angular.copy($scope.DUMMY_NOTIFICATIONS);

      $scope.dashStats = { myLost:2, myFound:1, myClaims:3, resolved:1 };

      $scope.myRecentItems = [
        { name:'Blue Dell Laptop', type:'lost',  status:'active',   date:'May 1' },
        { name:'Red Backpack',     type:'found', status:'resolved', date:'Apr 22' },
        { name:'Student ID',       type:'lost',  status:'pending',  date:'Apr 18' }
      ];
    };

    // Load admin data 
    $scope.loadAdminData = function() {

      $scope.lostItems = angular.copy($scope.DUMMY_LOST);


      $scope.foundItems = angular.copy($scope.DUMMY_FOUND);


      $scope.allClaims = [
        { id:1, itemName:'iPhone 15',        emoji:'📱', claimantName:'Jordan Lee',  claimDate:'Apr 30, 2026', status:'pending'  },
        { id:2, itemName:'YETI Water Bottle', emoji:'🍶', claimantName:'Tyler Brown', claimDate:'Apr 29, 2026', status:'pending'  },
        { id:3, itemName:'Key Ring',          emoji:'🔑', claimantName:'Sam Okonkwo', claimDate:'Apr 28, 2026', status:'pending'  },
        { id:4, itemName:'AirPods Pro Case',  emoji:'🎧', claimantName:'Priya Nair',  claimDate:'Apr 25, 2026', status:'approved' },
        { id:5, itemName:'Black Umbrella',    emoji:'☂️',  claimantName:'Chris Evans', claimDate:'Apr 20, 2026', status:'rejected' }
      ];


      $scope.notifications = angular.copy($scope.DUMMY_NOTIFICATIONS);


      $scope.adminStats = { totalLost:24, totalFound:18, pendingClaims:3, totalUsers:142 };
    };

    // View item details 
    $scope.viewDetail = function(item) {
      $scope.selectedItem = item;
      $scope.goTo('item-detail');

    };

    // Claim modal 
    $scope.openClaim = function(item) {
      $scope.claimItem  = item;
      $scope.claimForm  = {};
      $scope.showClaimModal = true;
    };

    $scope.closeClaimModal = function() {
      $scope.showClaimModal = false;
      $scope.claimItem = null;
    };

    $scope.submitClaim = function() {
      if (!$scope.claimForm.message) {
        alert('Please describe how you can prove ownership.');
        return;
      }

      $scope.myClaims = $scope.myClaims || [];
      $scope.myClaims.unshift({
        id:        Date.now(),
        emoji:     $scope.claimItem.emoji,
        itemName:  $scope.claimItem.name,
        claimDate: 'Just now',
        status:    'pending',
        adminNote: null
      });
      $scope.notifications = $scope.notifications || [];
      $scope.notifications.unshift({
        id:    Date.now(),
        icon:  '📋',
        bg:    '#fef9c3',
        title: 'Claim Submitted',
        desc:  'Your claim for ' + $scope.claimItem.name + ' is under review.',
        time:  'Just now',
        unread: true
      });
      $scope.closeClaimModal();
    };

    // Mark all notifications read 
    $scope.markAllRead = function() {
      ($scope.notifications || []).forEach(function(n) { n.unread = false; });
    };

  }
]);