// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
	'ionic', 
	'starter.controllers', 
	'starter.services', 
	'starter.directives', 
	'starter.filters', 
	'ngMaterial',
	'ngMap',
	'ngMdIcons',
	'pascalprecht.translate',
	'ngCookies',
	'youtube-embed'
])

.run(function($ionicPlatform, $rootScope, $state, $stateParams, $timeout, $translate) {
	
		/*
		UI-ROUTER :
		IT'S VERY HANDY TO ADD REFERENCES TO $STATE AND $STATEPARAMS TO THE $ROOTSCOPE
        SO THAT YOU CAN ACCESS THEM FROM ANY SCOPE WITHIN YOUR APPLICATIONS.FOR EXAMPLE,
        <li ng-class="{ active: $state.includes('contacts.list') }"> WILL SET THE <li>
        TO ACTIVE WHENEVER 'contacts.list' OR ONE OF ITS DECENDENTS IS ACTIVE.
		*/
    	// $rootScope.$state = $state;
    	// $rootScope.$stateParams = $stateParams;
		// console.log('$rootScope.$stateParams ->');
		// console.log($rootScope.$stateParams);
		// console.log('$rootScope.$state ->');
		// console.log($rootScope.$state);
		
		
		var appLocalesArray = ['en', 'fr', 'es'];
		$rootScope.appLocalesArray = appLocalesArray;
		
		
// THIS IS EMITTED TO THE TopnavController CONTROLLER - TODO: MAKE THE CONTROLLER A DIRECTIVE
$rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){ 
				$rootScope.$emit('rootScope:toState', toState.name, toParams);	
        	});
// THIS IS EMITTED TO THE TopnavController CONTROLLER - TODO: MAKE THE CONTROLLER A DIRECTIVE
		
		
$rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ 
				// $timeout(function(){
				// 	$('#background-image-stretchable').addClass('image-stretchable');
				// }, 300);
        	});		
		
	
	
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)		
		

	    var tag = document.createElement('script');
	    tag.src = "https://www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		
		
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
  }); // $ionicPlatform.ready
  
  
  
// EQUIVALENT OF JQUERY'S document.ready

angular.element(document).ready(function () {	
	
}); // angular.element(document).ready(function
  
// - EOF - EQUIVALENT OF JQUERY'S document.ready
  
  
}) // run()













.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, $translateProvider, $mdThemingProvider) {



	// ANGULAR MATERIAL THEMING 
	/*
	https://material.angularjs.org/#/Theming/03_configuring_a_theme
	
red
pink
purple
deep-purple
indigo
blue
light-blue
cyan
teal
green
light-green
lime
yellow
amber
orange
deep-orange
brown
grey
blue-grey
	
	*/
	$mdThemingProvider.theme('subnav_1')
	    .primaryPalette('blue-grey')
	    .accentPalette('amber',{
	    	'default': '100',
	    })
	.warnPalette('red');
		
		
	$mdThemingProvider.theme('subnav_2')
	    .primaryPalette('cyan', {
			'hue-1': '800'
	    })
	    .accentPalette('teal')
	    .warnPalette('blue');
		
		
	$mdThemingProvider.theme('subnav_3')
	    .primaryPalette('blue-grey', {
			'default': '400', // by default use shade 400 from the pink palette for primary intentions
			'hue-1': '900', // use shade 100 for the <code>md-hue-1</code> class
			'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
			'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
	    })
	    .accentPalette('light-blue')
	    .warnPalette('lime');	

		// SPECIFY DEFAULT THEME
		$mdThemingProvider.setDefaultTheme('subnav_1');
	// - EOF - ANGULAR MATERIAL THEMING 


	// ANGULAR TRANSLATE 
		
		
		var appLocalesArray = ['en', 'fr', 'es'];
		
	
		$translateProvider
		// .translations
		// ('en',
		// 		strings_en
		// 	)
		// 	.translations('fr',
		// 		strings_fr
		// 	)
		.useStaticFilesLoader({
           prefix: 'data/',
           suffix: '.js'
        })
		.registerAvailableLanguageKeys(appLocalesArray, {
		    'en_US': 'en',
		    'en_UK': 'en',
		    // 'de_DE'; 'de',
		    // 'de_CH': 'de',
		    'fr_CH': 'fr',
		    'fr_FR': 'fr',
		    'es_ES': 'es'
		})
 		 
		.determinePreferredLanguage();
	
 		$translateProvider.useCookieStorage();
 		$translateProvider.useLocalStorage();
		
	// - EOF - ANGULAR TRANSLATE 




	// THIS ALLOWS IFRAME CONTENT FROM YOUTUBE
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
    // $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?google\.fr/.+$')]);
	
	


	

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js




  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  
  







  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })


  .state('tab.productfamilies', {
      // url: '/productfamilies/prodFamID/{prodFamID:[0-9]{1,4}}',
      url: '/productfamilies/prodFamID/:prodFamID',
	  params: { prodFamID: 12 }, // TODO: DON'T HARDCODE IT, WIRE THIS TO A FUNCTION THAT RETRIEVES THE FIRST ID TO DISPLAY TO THE UI
	  
   // cache: false,
	  
      views: {
        'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
          templateUrl: 'templates/tab-productfamilies.html',
          controller: 'ProductFamiliesCtrl'
        }
      }
    })


    .state('tab.products', {
        url: '/productfamilies/prodFamID/:prodFamID/productID/:productID',
     // cache: false,
	  
        views: {
          'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
            templateUrl: 'templates/tab-products.html',
            controller: 'ProductsCtrl'
          }
        }
      })
	  
	  
	  
	  
	  .state('tab.categories', {
	      url: '/categories/categoryID/:categoryID',
		  params: { categoryID: 4 },
	   // cache: false,
	  
	      views: {
	        'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
	          templateUrl: 'templates/tab-categories.html',
	          controller: 'CategoriesCtrl'
	        }
	      }
	    })


	    .state('tab.services', {
	        url: '/categories/categoryID/:categoryID/serviceID/:serviceID',
	     // cache: false,
	  
	        views: {
	          'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
	            templateUrl: 'templates/tab-services.html',
	            controller: 'ServicesCtrl'
	          }
	        }
	      })
	
  
		// TAB 2, "TOOLS" (MEDIAS) 
		  .state('tab.assetcategories', {
		      url: '/assetcategories/assetCategoryID/:assetCategoryID',
		  params: { assetCategoryID: 1 },
			  
		   // cache: false,
	  
		      views: {
		        'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
		          templateUrl: 'templates/tab-assetcategories.html',
		          controller: 'AssetcategoriesCtrl'
		        }
		      }
		    })


		    .state('tab.assetgalleries', { // TODO: RENAME THIS (RENAME BATCH THROUGH ALL APP'S FOLDER)
		        url: '/assetcategories/assetCategoryID/:assetCategoryID/assetGalleryID/:assetGalleryID',
		     // cache: false,
	  
		        views: {
		          'tab-dash': { // REQUIRED FOR HISTORY STACKS AND THEREFORE PAGE TRANSITIONS (? TODO: INVESTIGATE)
		            templateUrl: 'templates/tab-assetgalleries.html',
		            controller: 'AssetgalleriesCtrl'
		          }
		        }
		      })
			  // - EOF - TAB 2, "TOOLS" (MEDIAS) 
  
  
  
  .state("tab.saveddata", {
    url:"/saveddata", 
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-saved-data.html',
        controller: 'SavedDataCtrl'
      },
      'search': {
        template: 'zalut',
        // controller: 'SavedDataCtrl'
      }
    }
  })
  .state("tab.saveddata.search", {
    // url:"/saveddata", 
    views: {
      'search': {
        template: 'zalut',
        // controller: 'SavedDataCtrl'
      }
    }
  })
  // .state("tab.saveddata@machin", {
  //   url:"/saveddata/:machinId", 
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-saved-data2.html',
  //       controller: 'SavedDataCtrl'
  //     }
  //   }
  // })


  .state('tab.pages', {
      url: '/pages',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.pages-detail', {
      url: '/pages/:pageId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })



  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');


  $urlRouterProvider.otherwise('/tab/dash');
  // $urlRouterProvider.otherwise('/tab/productfamilies');
  
  
  

});



// $stateProvider
//     .state('tabs', {
//       url: "/tab",
//       abstract: true,
//       templateUrl: "templates/tabs.html"
//     })
//     .state('tabs.home', {
//       url: "/home",
//       views: {
//         'home-tab': {
//           templateUrl: "templates/home.html",
//           controller: 'HomeTabCtrl'
//         }
//       }
//     })
//     .state('tabs.facts', {
//       url: "/facts",
//       views: {
//         'home-tab': {
//           templateUrl: "templates/facts.html"
//         }
//       }
//     })
//     .state('tabs.facts2', {
//       url: "/facts2",
//       views: {
//         'home-tab': {
//           templateUrl: "templates/facts2.html"
//         }
//       }
//     })
//     .state('tabs.about', {
//       url: "/about",
//       views: {
//         'about-tab': {
//           templateUrl: "templates/about.html"
//         }
//       }
//     })
//     .state('tabs.navstack', {
//       url: "/navstack",
//       views: {
//         'about-tab': {
//           templateUrl: "templates/nav-stack.html"
//         }
//       }
//     })
//     .state('tabs.contact', {
//       url: "/contact",
//       views: {
//         'contact-tab': {
//           templateUrl: "templates/contact.html"
//         }
//       }
//     });
// 
// 
//    $urlRouterProvider.otherwise("/tab/home");
// 
// })
// 
// .controller('HomeTabCtrl', function($scope) {
//   console.log('HomeTabCtrl');
// });
