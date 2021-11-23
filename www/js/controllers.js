angular.module('starter.controllers', [])


// TRANSLATION CONTROLLER
/*
- GETS ALL AVAILABLE LANGUAGES
- GET THE CURRENT LANGUAGE (ALREADY FROM A SERVICE (angular-translate)? TODO: TO BE CONFIRMED)
- EVALUATE THE CURRENT LANGUAGE AGAINST USER SELECTION THROUGH THE UI
- CHANGES THE CURRENT LANGUAGE
*/
.controller('TranslateController', [
	'$translate', 
	'$scope', 

	function
	(
		$translate, 
		$scope 
	) 
	{
		// AVAILABLE LANGUAGES TO THE USER
		// TODO : RETRIEVE THIS FROM ANGULAR TRANSLATE - AND mainarrayData
		$scope.availableLang = [
			'en',
			'es',
			'fr'
		]; 
	
	
		// GET THE CURRENT ANGULAR TRANSLATE LANGUAGE (MAY HAVE BEEN DETECTED DURING BOOTSTRAPPING)
		$scope.getCurrentLanguage = function () {
		    return $translate.use();
		};
	
	
		// BOOLEAN USED IN ng-class FOR THE UI
		$scope.isCurrentLanguage = function(language){
			var isCurrentLanguageBool = false;
		
			var currentLang = $scope.getCurrentLanguage();
			currentLang = String(currentLang);
		
			if (currentLang == language) {
				isCurrentLanguageBool = true;
			}
			return isCurrentLanguageBool;
		};
	
		
		// CHANGE LANGUAGE
		$scope.changeLanguage = function (langKey) {
			$translate.use(langKey); 
		};

}]) // - EOF - .controller('TranslateController'
// - EOF - TRANSLATION CONTROLLER




// TOPNAV CONTROLLER
/*
HANDLES THE PRIMARY AND SECONDARY APP'S NAVIGATIONS
*/
.controller('TopnavController', [
	
	'$scope',
	'$state',
	'$rootScope',
	'appDataFactory', 
	'stringsFactory', 
	'$mdSidenav',
	'$log',

	function(
	$scope,
	$state,
	$rootScope,
	appDataFactory,
	stringsFactory,
	$mdSidenav,
	$log
	) 
	{
		// APP DATA DEBUG
		// console.log('mainarrayData ->');
		// console.log(mainarrayData);
		
		
	
	
		// UI : ANGULAR MATERIAL DESIGN SIDENAV 
			sidenavIsOpen = false;

			$scope.iconburger = "menu";
			$scope.icon_size = "33";

			$scope.toggleRight = function() {
				if ($scope.iconburger == "close") {
					$scope.iconburger = "menu"
				}
				else {
					$scope.iconburger = "close"
				}
				
					$mdSidenav('right').toggle()
					.then(function(){
						$log.debug("toggle RIGHT is done");
					});
			};
	
			$scope.close = function() {
				$mdSidenav('right').close()
				.then(function(){
					$log.debug("close RIGHT is done");
				});
			};
		// - EOF - UI : ANGULAR MATERIAL DESIGN SIDENAV 

	
	
	
		// UI : TABS (TOPNAV AND SUBNAV) - TODO: MAKE THIS A DIRECTIVE HOOKED TO THE SERVICES
	
			// MD-TABS DO NOT REACT TO ROUTE CHANGES YET. THIS IS NEEDED FOR THE LOGO (SEE TOPNAV TEMPLATE)
				$scope.setSelectedTopnavIndex = function(index) {
					$scope.selectedTopnavIndex = index; // THIS TARGET MD-TABS
				};

			
			// SUBNAV USES MD-TABS. DEFINE INDEXES FOR EACH ONE OF THE SUBNAVS, AND STORE LATEST SUBNAV SECTION VISITED
				// TODO: SEE IF ANGULAR $watchCollection DOES THE TRICK
				$scope.selectedSubnavIndex = [];
				$scope.selectedSubnavIndex[1] = 0;
				$scope.selectedSubnavIndex[2] = 0;
				$scope.selectedSubnavIndex[3] = 0;
			
				$scope.latestSelectedSubnavIndex = [];
				
				// FIX THIS UGLY CODE BELOW, MAKE A for counter<.length LOOP. NOT SURE
				$scope.$watch(function($scope) { return $scope.selectedSubnavIndex[1] },
				    function(newValue, oldValue) {
						$scope.latestSelectedSubnavIndex[1] = $scope.subnavs[1][newValue]['id'];
				    }
				); // $scope.$watch(function($scope) { return $scope.selectedTopnavIndex
		
		
				$scope.$watch(function($scope) { return $scope.selectedSubnavIndex[2] },
				    function(newValue, oldValue) {
						$scope.latestSelectedSubnavIndex[2] = $scope.subnavs[2][newValue]['id'];
				    }
				); // $scope.$watch(function($scope) { return $scope.selectedTopnavIndex
				
				
				$scope.$watch(function($scope) { return $scope.selectedSubnavIndex[3] },
				    function(newValue, oldValue) {
						$scope.latestSelectedSubnavIndex[3] = $scope.subnavs[3][newValue]['id'];
				    }
				); // $scope.$watch(function($scope) { return $scope.selectedTopnavIndex
			// SUBNAV USES MD-TABS. DEFINE INDEXES FOR EACH ONE OF THE SUBNAVS, AND STORE LATEST SUBNAV SECTION VISITED
		
	
			// TOPNAV TABS DATA 
				
				// TODO: THIS SHOULD BE SET IN mainarrayData
				var tabs =
					[
				      	{
							title: '', // IMPORTANT HACK : first-child HAS display:none;
							// url:"#/tab/productfamilies"
							url:""
				  		},
				      	{
						  title: 'str_AppTopNav1',
							// url:"#/tab/productfamilies"
							url:"/tab/productfamilies/prodFamID/"
				  		},
						{
							title: 'str_AppTopNav2',
							// url:"#/tab/services"
							url:"/tab/categories/categoryID/",
							closeWith:"/serviceID/"
				  	  	},
						{
							title: 'str_AppTopNav3',
							// url:"#/tab/tools"
							url:"/tab/assetcategories/assetCategoryID/"
				  	  	}
				    ];
				$scope.tabs = tabs;
				
			// - EOF - TOPNAV TABS DATA
	
	
	
	
			// SUBNAVS TABS DATA
			
				$scope.subnavs = [];
			    var subnavTabs = [];
			
				// actualTabs = $scope.tabs.shift(); // THE FIRST TOPNAV TAB IS EMPTY, SEE ABOVE. TO REMOVE WHEN MD-TABS WORK AS EXPECTED/DESIRED
				angular.forEach($scope.tabs, function(tabValue, tabKey) {
				
					if (tabKey > 0) {
					
						subnavTabs[tabKey] = [];
					
						// SUBNAV TABS DATA, FOR TAB = 0 (PRODUITS) 
						if (tabKey == 1) {
							// GET PRODUCT FAMILIES
							var Productfamilies = appDataFactory.getObject('Productfamilies');
							
							// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
							Productfamilies = stringsFactory.retrieveAndInjectStringNames(Productfamilies, mainarrayData.Strings);
							
							// TRANSFORM INTO ARRAY AND ORDER
							var ProductfamiliesArray = _.values(Productfamilies);
							ProductfamiliesArray = _.sortBy(ProductfamiliesArray, "Order");
							
							
							angular.forEach(ProductfamiliesArray, function(Productfamily, ProductfamilyKey) {
								Productfamily.stringToDisplay = Productfamily.Productfamily;
								Productfamily.url = "/tab/productfamilies/prodFamID/"+Productfamily.id;
								
								subnavTabs[tabKey].push(Productfamily);
							});
							$scope.subnavs[tabKey] = subnavTabs[tabKey];
							
						}
					
					
						// SUBNAV TABS DATA, FOR TAB = 1 (INFORMATIONS) 
						if (tabKey == 2) {
							// GET CATEGORIES
							var Categories = appDataFactory.getObject('Categories');
							
							// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
							Categories = stringsFactory.retrieveAndInjectStringNames(Categories, mainarrayData.Strings);
							
							// TRANSFORM INTO ARRAY AND ORDER
							var CategoriesArray = _.values(Categories);
							CategoriesArray = _.sortBy(CategoriesArray, "Order");
							
							angular.forEach(CategoriesArray, function(Category, CategoryKey) {
								Category.stringToDisplay = Category.Category;
								Category.url = "/tab/categories/categoryID/"+Category.id+"/serviceID/";
								subnavTabs[tabKey].push(Category);
							});
							$scope.subnavs[tabKey] = subnavTabs[tabKey];
						}
					
					
						// SUBNAV TABS DATA, FOR TAB = 2 (OUTILS) 
						if (tabKey == 3) {
							// GET ASSETS CATEGORIES
							var Assetcategories = appDataFactory.getObject('Assetcategories');
							
							// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
							Assetcategories = stringsFactory.retrieveAndInjectStringNames(Assetcategories, mainarrayData.Strings);
							
							// TRANSFORM INTO ARRAY AND ORDER
							var AssetcategoriesArray = _.values(Assetcategories);
							AssetcategoriesArray = _.sortBy(AssetcategoriesArray, "Order");
							
							
							angular.forEach(AssetcategoriesArray, function(Assetcategory, AssetcategoryKey) {
								Assetcategory.stringToDisplay = Assetcategory.Assetcategory;
								Assetcategory.url = "/tab/assetcategories/assetCategoryID/"+Assetcategory.id;
								subnavTabs[tabKey].push(Assetcategory);
							});
							$scope.subnavs[tabKey] = subnavTabs[tabKey];
							
						}
					}
				});
			
			// - EOF - SUBNAVS TABS DATA
			
			
			$scope.subnavTabs = subnavTabs;
			
			
			// UI - SEE TEMPLATE
			
			$scope.subnavFolded = [];
			$scope.subnavFolded[1] = true;
			$scope.subnavFolded[2] = true;
			$scope.subnavFolded[3] = true;
			
			
			// UNFOLD OR FOLD SUBNAVS 
			$rootScope.$on('rootScope:toState', function (event, toState, toParams) {
				
				// TODO: FIX THIS UGLY CODE, WITH PHP'SEQUIVALENT OF case switch
				if (toState == "tab.dash") {
					$scope.setSelectedTopnavIndex(0);
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = true;

					vanillaApplyClass(".subnav", "add", "folded");
				}
				
				
				if (toState == "tab.productfamilies" || toState == "tab.products") {
					$scope.setSelectedTopnavIndex(1);
					
					angular.forEach($scope.subnavs[1], function(subnavValue, subnavKey) {
						if (subnavValue.id == toParams.prodFamID) {
							$scope.selectedSubnavIndex[1] = subnavKey;
						}
					});
					
					$scope.subnavFolded[1] = false;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = true;
					
					vanillaApplyClass(".subnav", "add", "folded");
					vanillaApplyClass("#subnav_1", "remove", "folded");
				}
				
				
				if (toState == "tab.categories" || toState == "tab.services") {
				// if (toState == "tab.services") {
					$scope.setSelectedTopnavIndex(2);
					
					angular.forEach($scope.subnavs[2], function(subnavValue, subnavKey) {
						
						if (subnavValue.id == toParams.categoryID) {
							$scope.selectedSubnavIndex[2] = subnavKey;
						}
					});
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = false;
					$scope.subnavFolded[3] = true;
					
					vanillaApplyClass(".subnav", "add", "folded");
					vanillaApplyClass("#subnav_2", "remove", "folded");
				}
				
				
				if (toState == "tab.assetcategories" || toState == "tab.assetgalleries") {
					$scope.setSelectedTopnavIndex(3);
					
					angular.forEach($scope.subnavs[3], function(subnavValue, subnavKey) {
						if (subnavValue.id == toParams.prodFamID) {
							$scope.selectedSubnavIndex[3] = subnavKey;
						}
					});
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = false;
					
					vanillaApplyClass(".subnav", "add", "folded");
					vanillaApplyClass("#subnav_3", "remove", "folded");
				}
			});
			// - EOF - UNFOLD OR FOLD SUBNAVS 
	
	
	}
]) 
// - EOF - TOPNAV CONTROLLER











// ANGULAR MATERIAL DESIGN SIDENAV 
.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function() {
			$mdSidenav('right').close()
				.then(function(){
					$log.debug("close RIGHT is done");
				});
	  };
})
// - EOF - ANGULAR MATERIAL DESIGN SIDENAV 






.controller('ProductFamiliesCtrl', [
	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$translate', 
	'$filter', 
	'$rootScope',
	'$state',
	'$stateParams',
	'$timeout',
	
	function(
	$scope, 
	appDataFactory, 
	stringsFactory,
	$translate,
	$filter,
	$rootScope,
	$state,
	$stateParams,
	$timeout
	) 
	{
	
		// APP'S DATA DEBUG
			// console.log('mainarrayData ->');
			// console.log(mainarrayData);
			
			
			$timeout(function(){
				$('.product_card').addClass("box_shadow");
			},500);
		
	
		// TODO: DETECT WHICH PLATFORM THE USER IS ON, TO AVOID SPECIFIC STUFF IF NEEDED
			// $scope.isIOS = ionic.Platform.isIOS();
	
			
		// RETRIEVE PRODUCTFAMILY ID BY URL, OR FALLBACK TO DEFAULT
			// TODO : WRITE AS A TERNARY OPERATOR, AND DEFAULT ID SHOULD BE RETRIEVED FROM APP'S DATA, NOT HARDCODED
			$scope.selectedProdFamID = $state.params.prodFamID;
			if ($scope.selectedProdFamID == "") {
				$scope.selectedProdFamID = 12;
			}
			
			
		// PAGE TITLE TODO: ASSIGN A STRING FROM THE GLOBAL STRINGS OBJECT
			$scope.page_title = "catalogue produits";


		// UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
			$scope.iframesStatus = true;
			$scope.hide_iframes = function(iframesStatus){
				if (iframesStatus) {
					$('iframe').css({'opacity':'1'});
				}
				else
				{
					$('iframe').css({'opacity':'0'});
				}
			}
		// - EOF - UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
	
	
		// CKEDITOR (EDIT IN-LINE, DB REST API) 
			// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
			$scope.editMode = false;
		    $scope.toggleEditMode = function() {
		        $scope.editMode = $scope.editMode === false ? true: false;
				// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
				if ($scope.editMode === false) {
					window.location.reload();
				}
		    };
		// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 
	
		
		
		// GET THE PRODUCT FAMILIES
			$scope.Productfamilies = appDataFactory.getObject('Productfamilies');
		// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
			$scope.Productfamilies = stringsFactory.retrieveAndInjectStringNames($scope.Productfamilies, mainarrayData.Strings);
	
	
		// GET THE PRODUCTS 
			$scope.Products = appDataFactory.getObject('Products');
		// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
			$scope.Products = stringsFactory.retrieveAndInjectStringNames($scope.Products, mainarrayData.Strings);
	
	
	
		// REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
			// TODO: appDataFactory HAS BEEN IMPROVED, THERE IS NOW A FUNCTION TO POPULATE A PARENT WITH ITS CHILDREN. MAKE A CALL TO appDataFactory.
			angular.forEach($scope.Productfamilies, function(Productfamily, ProductfamilyID) {
				angular.forEach(Productfamily.Products, function(ProductID, ProductKey) {
					$scope.Productfamilies[ProductfamilyID]['Products'][ProductID] = $scope.Products[ProductID];
				});
			});
		// - EOF - REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
		
		
	
		// REASSIGN PRODUCTS	
			ProductfamilyID = parseInt($scope.selectedProdFamID);
			$scope.Products = $scope.Productfamilies[ProductfamilyID]['Products'];
		
		
			// SECURITY MEASURE - THERE SEEM TO BE A STRANGE BUG HERE (RELATED MAYBE TO ANGULAR MATERIAL MD-GRID)
			angular.forEach($scope.Products, function(ProductID, ProductKey) {
				if(typeof(ProductID) == "undefined"){
					console.log('deleting... ->');
					delete($scope.Products[ProductKey]);
				}
			});
		// - EOF - REASSIGN PRODUCTS	
			
			
			
	// SET FLEXBOX OPTIONS ACCORDING TO HOW MANY PRODUCTS THERE ARE 
			
		// TODO: THESE SETTINGS ARE FOR LARGE DESKTOPS ONLY. SMALLER DEVICES NEED ANOTHER CALCULUS
			var productsTotal = _.size($scope.Products);
			
			
		// DEFAULT SCREEN HALVES
			$scope.half1 = 66;
			$scope.half2 = 33;
			
			if(productsTotal >= 5)
			{
				$scope.half1 = 75;
				$scope.half2 = 25;
			}
			
		// NO MORE THAN 2 ROWS (BUT SUBJECT TO CHANGE)
			var nrOfRows = 2;
			var perRow = productsTotal / nrOfRows;
			
		// IF UNDER 2 PER ROW, MAKE ONE ROW AND 2 COLUMNS
			if (perRow == 1) {
				nrOfRows = 1;
				perRow = 2;
			}
			
			// console.log('perRow ->');
			// console.log(perRow);
			
		// SET FLEX WIDTHS FOR ANGULAR MATERIAL
			$scope.mdFlexValue = Math.floor(100 / perRow);
			// console.log('$scope.mdFlexValue ->');
			// console.log($scope.mdFlexValue);
			
		// SET FLEX HEIGHTS
			$scope.mdFlexHeight = 100 / nrOfRows;
			// console.log('$scope.mdFlexHeight ->');
			// console.log($scope.mdFlexHeight);
			
			$scope.mdFlexValues = [];
			
			if ($scope.mdFlexValue == 50) {
				$scope.mdFlexValues[0] = 50;
				$scope.mdFlexValues[1] = 50;
				$scope.mdFlexValues[2] = 50;
				$scope.mdFlexValues[3] = 50;
			}
			
			if ($scope.mdFlexValue == 40) {
				// $scope.mdFlexValues[0] = 50;
				// $scope.mdFlexValues[1] = 50;
				
				$scope.mdFlexValues[0] = 44.333;
				$scope.mdFlexValues[1] = 55.668;
				
				
				$scope.mdFlexValues[2] = 33.3333;
				$scope.mdFlexValues[3] = 33.3333;
				$scope.mdFlexValues[4] = 33.3333;
			}
			
	// - EOF - SET FLEXBOX OPTIONS ACCORDING TO HOW MANY PRODUCTS THERE ARE 
			
			
			
		// UI : PRODUCT FAMILY TEXTS
			$scope.section =[];
			$scope.section.title = $scope.Productfamilies[ProductfamilyID]['Productfamily'];
			$scope.section.title_stringid = $scope.Productfamilies[ProductfamilyID]['ProductfamilyString_ID'];
			$scope.section.text = $scope.Productfamilies[ProductfamilyID]['FullDescription'];
			$scope.section.text_stringid = $scope.Productfamilies[ProductfamilyID]['FullDescriptionString_ID'];
		// - EOF - UI : PRODUCT FAMILY TEXTS
	
	
		// MATERIAL DESIGN GRID (COMMENTED UNTIL A STABLE VERSION OF ANGULAR MATERIAL IS OUT)
			// if (ProductfamilyID == 13) {
			// 	$scope.md_cols_gt_lg="3";
			// }
			// else{
			// 	$scope.md_cols_gt_lg="2";
			// }
		// - EOF - MATERIAL DESIGN GRID (COMMENTED UNTIL A STABLE VERSION OF ANGULAR MATERIAL IS OUT)
	
	
	
		// YOUTUBE IFRAME API THROUGH ANGULAR YOUTUBE DIRECTIVE 
		// *** YOUTUBE VIDEOS - THIS IS AN INTERESTING PROTOTYPE, BUT IS A REAL BANDWIDTH SUCKER
			// TODO: ADD A YOUTUBE IFRAME API LIST (SINGLE VIDEO ID, OR MULTIPLE) FIELD IN THE DB, SO A VIDEO OR A PLAYLIST OF VIDEOS CAN BE ATTACHED TO THE PRODUCT
			
			var youtube_video_options = "?autoplay=1&amp;controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1";
			
			
			if ($scope.selectedProdFamID == 12) {
				$scope.Products[14]['youtube_url'] = 'g-LlBxk0-Gg';
				$scope.Products[24]['youtube_url'] = 'pXFI4_TphM4';
				$scope.Products[25]['youtube_url'] = 'ip9J8rfxbgA';
				$scope.Products[27]['youtube_url'] = 'ETmC3jkDAwY';
			}

			if ($scope.selectedProdFamID == 13) {
				$scope.Products[4]['youtube_url'] = 'ETmC3jkDAwY';
				$scope.Products[7]['youtube_url'] = 'ETmC3jkDAwY';
				$scope.Products[8]['youtube_url'] = 'ETmC3jkDAwY';
				$scope.Products[19]['youtube_url'] = 'g-LlBxk0-Gg';
				$scope.Products[28]['youtube_url'] = 'pXFI4_TphM4';
				// $scope.Products[30]['youtube_url'] = 'ip9J8rfxbgA';
			}


			$scope.$on('youtube.player.ready', function ($event, player) {
				// play it again
				player.playVideo();
				player.mute();
				player.c.style.opacity = '0';
			});
  
			$scope.$on('youtube.player.buffering', function ($event, player) {
				// play it again
				player.c.style.opacity = '0';
			});

			$scope.$on('youtube.player.ended', function ($event, player) {
				// play it again
				player.c.style.opacity = '0';
				player.playVideo();
				player.mute();
			});
  
			$scope.$on('youtube.player.playing', function ($event, player) {
				// play it again
				player.mute();
				player.c.style.opacity = '1';
			});

			$scope.playerVars = { 
				// 'autoplay': 1,
				'controls': 0, 
				'loop':1, 
				'rel': 0 
			};
		// - EOF - YOUTUBE IFRAME API THROUGH ANGULAR YOUTUBE DIRECTIVE 
			
			
	}
]) // ProductFamiliesCtrl







.controller('ProductsCtrl', [
	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$rootScope',
	'$state',
	'$ionicScrollDelegate',
	'$timeout',
	'$filter',
	'$translate',
	'$mdDialog',
	
	function(
		$scope, 
		appDataFactory, 
		stringsFactory,
		$rootScope,
		$state,
		$ionicScrollDelegate,
		$timeout,
		$filter,
		$translate,
		$mdDialog
	) 
	{
		// APP'S DATA DEBUG
		// console.log('mainarrayData FROM PRODUCTSCTRL ->');
		// console.log(mainarrayData);
		
		
		$timeout(function(){
			$('#CSS3Slideshow img').css({'animation-play-state': 'paused'});
			// $('#CSS3Slideshow .img1').css({'opacity': '1'});
		},17);
		
		
		$timeout(function(){
			$('#CSS3Slideshow img').css({'animation-play-state': 'running'});
			
		},550);
		
		


		// POP-UPS (MD-DIALOG) 
		function DialogController($scope, $mdDialog) {
			$scope.testVar = "machin";
			$scope.hide = function() {
			    $mdDialog.hide();
			};
			$scope.cancel = function() {
			    $mdDialog.cancel();
			};
			$scope.answer = function(answer) {
			    $mdDialog.hide(answer);
			};
		}

		$scope.showAlert = function(ev) {
		    // Appending dialog to document.body to cover sidenav in docs app
		    // Modal dialogs should fully cover application
		    // to prevent interaction outside of dialog
		    // $mdDialog.show(
		    //   $mdDialog.alert()
		    //     .parent(angular.element(document.body))
		    //     .title('This is an alert title')
		    //     .content('You can specify some description text in here.')
		    //     .ariaLabel('Alert Dialog Demo')
		    //     .ok('Got it!')
		    //     .targetEvent(ev)
		    // );
			
		    $mdDialog.show({
		         controller: DialogController,
		         templateUrl: 'templates/dialog1.tmpl.html',
		         targetEvent: ev,
		       })
		  };
		  
		  
		  
  		$scope.showAlert2 = function(ev) {
  		    // Appending dialog to document.body to cover sidenav in docs app
  		    // Modal dialogs should fully cover application
  		    // to prevent interaction outside of dialog
  		    // $mdDialog.show(
  		    //   $mdDialog.alert()
  		    //     .parent(angular.element(document.body))
  		    //     .title('This is an alert title')
  		    //     .content('You can specify some description text in here.')
  		    //     .ariaLabel('Alert Dialog Demo')
  		    //     .ok('Got it!')
  		    //     .targetEvent(ev)
  		    // );
			
  		    $mdDialog.show({
  		         controller: DialogController,
  		         templateUrl: 'templates/dialog2.tmpl.html',
  		         targetEvent: ev,
  		       })
  		  };
		  
		  // - EOF - POP-UPS (MD-DIALOG) 

		
		
		// MAKE GO BACK OPAQUE 
		$scope.makeOpaque = function(classTarget,opacity){
			$(classTarget).css({'opacity':opacity});
		};
		// - EOF - MAKE GO BACK OPAQUE 
		
	
		// SHARE ICONS 
		$scope.socialNetworksIcons = [
			{
				label:'facebook',
				iconCssClass:'ion-social-facebook',
				buttonCssClass:'facebook',
				tooltipString:'str_ShareOnFacebook'
			},
			{
				label:'twitter',
				iconCssClass:'ion-social-twitter',
				buttonCssClass:'twitter',
				tooltipString:'str_ShareOnTwitter'
			},
			{
				label:'e-mail',
				iconCssClass:'ion-email',
				buttonCssClass:'e_mail',
				tooltipString:'str_SendByEmail'
			},
		];
		// - EOF - SHARE ICONS 
		
		// $timeout(function(){
		// 	// $('#CSS3Slideshow img').removeClass('paused');
		// 	vanillaApplyClass('#CSS3Slideshow img', 'remove', 'paused');
		// },500);
		
		
		// DO NOT DELETE sayHi BELOW. JUST TO DEMONSTRATE THAT DB STRINGS MAY NOW CONTAIN DIRECTIVES, AS THEY ARE COMPILED
			// $scope.sayHi = function(string){
			// 	string = $filter('translate')(string);
			// 	alert('string : '+string);
			// }
		// - EOF - DO NOT DELETE sayHi BELOW. JUST TO DEMONSTRATE THAT DB STRINGS MAY NOW CONTAIN DIRECTIVES, AS THEY ARE COMPILED
		
		// CHECK PRODUCT ID CALLED
		var selectedProductID = $state.params.productID;
		if (selectedProductID == "") {
			selectedProductID = 12; // TODO: DEFAULT IS WRONG, THIS IS DEFAULT FOR PRODUCTFAMILY - DON'T DEFINE IT LIKE THIS, 
		}
		
		
		// GET PROFDAM ID DETAILS
		$scope.selectedProdFamID = $state.params.prodFamID;
		$scope.Productfamily = appDataFactory.getObjectByID('Productfamilies',$scope.selectedProdFamID);
		// console.log('$scope.Productfamily ->');
		// console.log($scope.Productfamily);
		
		
		
		// CKEDITOR (EDIT IN-LINE, DB REST API) 
		// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
			$scope.editMode = false;
			$scope.scrollMode = true;
			$scope.toggleEditMode = function() {
				$scope.editMode = $scope.editMode === false ? true: false;
			
				// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
				if ($scope.editMode === false) {
					
					$timeout(function(){
						window.location.reload();
					},300);
					// RELEASE IONIC SCROLLS
					// $ionicScrollDelegate.freezeAllScrolls(false);
					// $scope.scrollableTabs.scroll = false;
				}
				else
				{
					// FREEZE IONIC SCROLLS
					$('.tab_gradient').hide();
					$ionicScrollDelegate.freezeAllScrolls(true);
				}
	    	};
		// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 			
		
		
		// GET THE PRODUCT 
			$scope.selectedProductID = selectedProductID;
			$scope.Product = appDataFactory.getObjectByID('Products',selectedProductID);
			
		// TODO : MOVE THIS LOGIC TO stringsFactory.retrieveAndInjectStringNames : EVALUATE IF A SINGLE OBJECT IS PASSED, OR A AN ARRAY-LIKE OBJECT
			var empty_array = [];
			empty_array.push($scope.Product);
			// INJECT STRINGS (TODO: INVESTIGATE, THERE MUST BE A BETTER WAY, AT A LOWER LEVEL)
			$scope.Product = stringsFactory.retrieveAndInjectStringNames(empty_array, mainarrayData.Strings);
			$scope.Product = empty_array[0];
		// GET THE PRODUCT 
			
			
		// GET THE PRODUCT PRICES
			$scope.Productprices = appDataFactory.getChildren($scope.Product.Productprices,'Productprices');
			$scope.Productprices = stringsFactory.retrieveAndInjectStringNames($scope.Productprices, mainarrayData.Strings);
		// - EOF - GET THE PRODUCT PRICES


		// GET THE PRODUCT OPTIONS
			$scope.Productoptions = appDataFactory.getChildren($scope.Product.Productoptions,'Productoptions');
			$scope.Productoptions = stringsFactory.retrieveAndInjectStringNames($scope.Productoptions, mainarrayData.Strings);
		// - EOF - GET THE PRODUCT OPTIONS
			
			
		// GET THE PRODUCT WIDGETS (SALES CHANNELS)
			$scope.Productwidgets = appDataFactory.getChildren($scope.Product.Saleschannels,'Saleschannels');
			$scope.Productwidgets = stringsFactory.retrieveAndInjectStringNames($scope.Productwidgets, mainarrayData.Strings);
		// - EOF - GET THE PRODUCT WIDGETS (SALES CHANNELS)
			
		
		
		
		// UPON PRODUCT TAB CHANGE, SCROLL PRODUCT TAB TO TOP
			$scope.scrollTop = function(tab_target) {
				$ionicScrollDelegate.$getByHandle('tab_target_'+tab_target+'').scrollTop();
			};
		
		
		// FORCE TOPNAV TABS TO THE CORRECT TAB
			$scope.selectedProductTabsIndex = 0;
  			$scope.setSelectedProductTabsIndex = function(index) {
  				$scope.selectedProductTabsIndex = index; // THIS TARGET MD-TABS
  			};
  			$scope.setSelectedProductTabsIndex(0);
			
			// MAKE SURE SAFARI DOES IT : DOES EVERYTHING GO TOO FAST (SYNCHRONOUS)?
			$timeout(function(){
				// $('#CSS3Slideshow img').removeClass('paused');
	  			$scope.setSelectedProductTabsIndex(0);
			},400);
			
		
		
		// MAKE PRODUCT SIDENAV (PROCÉDURES) APPEAR
			// $scope.trigger_icon = "ion-information";
			
			$scope.trigger_icon = "ion-ios-information-empty";
			$scope.productSidePanelIsTranslated = false;
			
		// SLIDE LEFT
			$scope.onDragLeft = function(){
				// console.log('you drag!');
				//
				$scope.productSidePanelIsTranslated = true;
				$scope.trigger_icon = "ion-ios-close-empty";
				// CAREFUL: -20rem APPLIES TO FULLSCREEN 1920x1080
				$('._720kb-tooltip').css({'transform': 'translate3d(-20rem,0,0)'});
				
				// $scope.toogleProductSidePanel();
			}
			
		// SLIDE RIGHT
			$scope.onDragRight = function(){
				// console.log('you drag!');
				//
				$scope.productSidePanelIsTranslated = false;
				$scope.trigger_icon = "ion-ios-information-empty";
				$('._720kb-tooltip').css({'transform': 'none'});
				// $scope.toogleProductSidePanel();
			}
			
		// TOOGLE SIDE PANEL
			$scope.toogleProductSidePanel = function(){
		        $scope.productSidePanelIsTranslated = $scope.productSidePanelIsTranslated === false ? true: false;
				if ($scope.productSidePanelIsTranslated === false) {
					$scope.trigger_icon = "ion-ios-information-empty";
					$('._720kb-tooltip').css({'transform': 'none'});
				}
				if ($scope.productSidePanelIsTranslated === true) {
					$scope.trigger_icon = "ion-ios-close-empty";
					$('._720kb-tooltip').css({'transform': 'translate3d(-20rem,0,0)'});
				}
			}
		// - EOF - MAKE PRODUCT SIDENAV (PROCÉDURES) APPEAR
			
			
			// 	string = $filter('translate')(string);
			// console.log('$scope.Product ->');
			// TODO: FIX THIS IN STRING SERVICE : ALWAYS APPLY A DUMMY VALUE IF EMPTY, SO contenteditable HAS AT LEAST A 'START' CONTENT, SO AREA IS FOCUSABLE.
			var machin = $scope.Product.ShortDescription;
			machin = $filter('translate')(String(machin));
			if (machin == ""){
				$scope.Product.ShortDescription = "emptyString";
			}
			
			
			
			
			
	}
]) // .controller('ProductsCtrl', [













.controller('ServicesCtrl', [
	
	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$rootScope',
	'$state',
	'$sce',
	// '$ionicScrollDelegate',
	'$timeout',
	'$filter',
	// '$translate',
	// '$mdDialog',
	
	function(
		$scope, 
		appDataFactory, 
		stringsFactory,
		$rootScope,
		$state,
		$sce,
		// $ionicScrollDelegate,
		$timeout,
		$filter
		// $translate,
		// $mdDialog
	) 
	{
		
		
	
		// CKEDITOR (EDIT IN-LINE, DB REST API) 
		// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
			$scope.editMode = false;
			$scope.scrollMode = true;
			$scope.toggleEditMode = function() {
				$scope.editMode = $scope.editMode === false ? true: false;
		
				// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
				if ($scope.editMode === false) {
				
					$timeout(function(){
						window.location.reload();
					},300);
					// RELEASE IONIC SCROLLS
					// $ionicScrollDelegate.freezeAllScrolls(false);
					// $scope.scrollableTabs.scroll = false;
				}
				else
				{
					// FREEZE IONIC SCROLLS
					// $ionicScrollDelegate.freezeAllScrolls(true);
				}
	    	};
		// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 			
		
	
	// APP'S DATA DEBUG
	// console.log('mainarrayData FROM SERVICESCTRL ->');
	// console.log(mainarrayData);
	
	// console.log('$state.params ->');
	// console.log($state.params);
	
	
// RETRIEVE PRODUCTFAMILY ID BY URL, OR FALLBACK TO DEFAULT
	// TODO : WRITE AS A TERNARY OPERATOR, AND DEFAULT ID SHOULD BE RETRIEVED FROM APP'S DATA, NOT HARDCODED
	$scope.selectedCategoryID = $state.params.categoryID;
	if ($scope.selectedCategoryID == 4) {
		$scope.selectedServiceID = 8;
	}

	if ($scope.selectedCategoryID == 6) {
		$scope.selectedServiceID = 75;
	}
	
	if ($scope.selectedCategoryID == 2) {
		$scope.selectedServiceID = 86;
	}
	
	if ($scope.selectedCategoryID == 1) {
		$scope.selectedServiceID = 73;
	}
	
	
	
	
	
	

	
	
	
	
	
	
	
	
// PAGE TITLE TODO: ASSIGN A STRING FROM THE GLOBAL STRINGS OBJECT
	$scope.page_title = "services";


// UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
	// $scope.iframesStatus = true;
	// $scope.hide_iframes = function(iframesStatus){
	// 	if (iframesStatus) {
	// 		$('iframe').css({'opacity':'1'});
	// 	}
	// 	else
	// 	{
	// 		$('iframe').css({'opacity':'0'});
	// 	}
	// }
// - EOF - UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 


// CKEDITOR (EDIT IN-LINE, DB REST API) 
	// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
	$scope.editMode = false;
    $scope.toggleEditMode = function() {
        $scope.editMode = $scope.editMode === false ? true: false;
		// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
		if ($scope.editMode === false) {
			window.location.reload();
		}
    };
// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 



// GET THE PRODUCT FAMILIES
	$scope.Categories = appDataFactory.getObject('Categories');
// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
	$scope.Categories = stringsFactory.retrieveAndInjectStringNames($scope.Categories, mainarrayData.Strings);

// GET THE PRODUCTS 
	$scope.Services = appDataFactory.getObject('Services');
// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
	$scope.Services = stringsFactory.retrieveAndInjectStringNames($scope.Services, mainarrayData.Strings);


// REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
	// TODO: appDataFactory HAS BEEN IMPROVED, THERE IS NOW A FUNCTION TO POPULATE A PARENT WITH ITS CHILDREN. MAKE A CALL TO appDataFactory.
	angular.forEach($scope.Categories, function(Category, CategoryID) {
		angular.forEach(Category.Services, function(ServiceID, ServiceKey) {
			$scope.Categories[CategoryID]['Services'][ServiceID] = $scope.Services[ServiceID];
		});
	});

	
	$scope.Services = $scope.Categories[$scope.selectedCategoryID]['Services'];
	bienvenue_iframe = $filter('translate')($scope.Services[$scope.selectedServiceID].ShortDescription);
 	$scope.bienvenue_iframe = $sce.trustAsResourceUrl(bienvenue_iframe);
	
	

	// TODO: WE ALSO NEED TO FORMAT THE PHONE AND FAX NUMBERS BY STRIPPING OUT : DOTS, SPACES, PARENTHESIS AND ADDING A PLUS ('+') AS A PREFIX, SO 33 (0) 6 50... BECOMES '+33650...' 
	var contactPlaceholders = [
		{
			databaseColumn:'Email',
			urlPrefix: 'mailto:',
			hrefTarget: '',
		},
		{
			databaseColumn:'Phone',
			urlPrefix: 'tel:',
			hrefTarget: '',
		},
		{
			databaseColumn:'Fax',
			urlPrefix: 'fax:',
			hrefTarget: '',
		},
		{
			databaseColumn:'Website',
			urlPrefix: 'http://',
			hrefTarget: '_blank',
		},
	];
	
	
	var getEntityContacts = function(entityName, entityID){
		var contactsArray = {};
		
		angular.forEach(contactPlaceholders, function(placeholder, placeholderKey) {
			if ($scope[entityName][entityID][placeholder.databaseColumn] != "") {
				// contactsArray[placeholder.databaseColumn] = $scope[entityName][entityID][placeholder.databaseColumn];
				contactsArray[placeholderKey] = placeholder;
				contactsArray[placeholderKey][placeholder.databaseColumn] = $scope[entityName][entityID][placeholder.databaseColumn];
			}
		});
		return contactsArray;
	}; // - EOF - getEntityContacts = function
	
	
	$scope.setSelectedServiceID = function(serviceID){
		$('.service_container').css({'opacity':0});
		// TODO: NOT THE BEST METHOD FOR ANIMATE THE DETAILS... IT IS TIED TO THE CSS : SEE service_container CSS TRANSITION TIMING.
		// IT SHOULD USE ng-animate
		$timeout(function(){
			$scope.selectedServiceID = serviceID;
			$scope.contactsArray = getEntityContacts('Services', serviceID);
			
			$rootScope.selectedSideNav = serviceID;
			
			// IF SELECTED CATEGORY IS "ACCES ET PLANS", TRUST IFRAME URL PUT IN ShortDescription 
			
			// - EOF - IF SELECTED CATEGORY IS "ACCES ET PLANS", TRUST IFRAME URL PUT IN ShortDescription 
			if ($scope.selectedCategoryID == 1) {
					bienvenue_iframe = $filter('translate')($scope.Services[serviceID].ShortDescription);
 			   	 	$scope.bienvenue_iframe = $sce.trustAsResourceUrl(bienvenue_iframe);
			}
			
			$('.service_container').css({'opacity':1});
		}, 200);
	}
	
	// $scope.serviceID
	if(!$scope.serviceID){
		if ($scope.selectedCategoryID == 4) {
			$scope.serviceID = 8;
			$scope.contactsArray = getEntityContacts('Services', $scope.serviceID);
		}
	}
	
}]) // - EOF - .controller('ServicesCtrl', [











.controller('CategoriesCtrl', function($scope) {
	
	alert('CategoriesCtrl');
	
})











.controller('AssetcategoriesCtrl', [

	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$rootScope',
	'$state',
	'$sce',
	// '$ionicScrollDelegate',
	'$timeout',
	'$filter',
	// '$window',
	// '$translate',
	// '$mdDialog',
	
	function(
		$scope, 
		appDataFactory, 
		stringsFactory,
		$rootScope,
		$state,
		$sce,
		// $ionicScrollDelegate,
		$timeout,
		$filter
		// $window
		// $translate,
		// $mdDialog
	) 
	{
		// $scope.mediaSelectedIndex = 0;
		// $rootScope.mediaSelectedIndex = 0;
		
	
		// CKEDITOR (EDIT IN-LINE, DB REST API) 
		// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
			$scope.editMode = false;
			$scope.scrollMode = true;
			$scope.toggleEditMode = function() {
				$scope.editMode = $scope.editMode === false ? true: false;
		
				// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
				if ($scope.editMode === false) {
				
					$timeout(function(){
						window.location.reload();
					},300);
					// RELEASE IONIC SCROLLS
					// $ionicScrollDelegate.freezeAllScrolls(false);
					// $scope.scrollableTabs.scroll = false;
				}
				else
				{
					// FREEZE IONIC SCROLLS
					// $ionicScrollDelegate.freezeAllScrolls(true);
				}
	    	};
		// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 			
		
	
	// APP'S DATA DEBUG
	console.log('mainarrayData FROM ASSETCATEGORIESCTRL ->');
	console.log(mainarrayData);
	
	// console.log('$state.params ->');
	// console.log($state.params);
	
	
// RETRIEVE PRODUCTFAMILY ID BY URL, OR FALLBACK TO DEFAULT
	// TODO : WRITE AS A TERNARY OPERATOR, AND DEFAULT ID SHOULD BE RETRIEVED FROM APP'S DATA, NOT HARDCODED
	$scope.selectedAssetCategoryID = $state.params.assetCategoryID;
	
	
	

// PHOTOS 
	if ($scope.selectedAssetCategoryID == 1) {
		$scope.selectedAssetGalleryID = 3;
	}
// - EOF - PHOTOS 




// VIDEOS 

	if ($scope.selectedAssetCategoryID == 2) {
		$scope.selectedAssetGalleryID = 2;
		
		
	// YOUTUBE IFRAME API THROUGH ANGULAR YOUTUBE DIRECTIVE 
		// TODO: ADD A YOUTUBE IFRAME API LIST (SINGLE VIDEO ID, OR MULTIPLE) FIELD IN THE DB, SO A VIDEO OR A PLAYLIST OF VIDEOS CAN BE ATTACHED TO THE PRODUCT
	
		var youtube_video_options = "?autoplay=1&amp;controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1";
	
		$scope.videos = [];
	
		$scope.videos.push({
			'youtube_url': 'g-LlBxk0-Gg',
			'youtube_thumbnail': 'http://img.youtube.com/vi/g-LlBxk0-Gg/1.jpg'
		});
		$scope.videos.push({
			'youtube_url': 'pXFI4_TphM4',
			'youtube_thumbnail': 'http://img.youtube.com/vi/pXFI4_TphM4/1.jpg'
		
		});
		$scope.videos.push({
			'youtube_url': 'ip9J8rfxbgA',
			'youtube_thumbnail': 'http://img.youtube.com/vi/ip9J8rfxbgA/1.jpg'
		
		});
		$scope.videos.push({
			'youtube_url': 'ETmC3jkDAwY',
			'youtube_thumbnail': 'http://img.youtube.com/vi/ETmC3jkDAwY/1.jpg'
		
		});
	
			// $scope.videos[0]['youtube_url'] = ;
			// $scope.videos[1]['youtube_url'] = '';
			// $scope.videos[2]['youtube_url'] = '';
			// $scope.videos[3]['youtube_url'] = '';
			// console.log('$scope.videos ->');
			// console.log($scope.videos);
		

			$scope.updateVideoTitle = function(videoKey){
				$scope.youtube_title = $scope.videos[videoKey]['youtube_title'];
				// alert('$scope.youtube_title : '+$scope.youtube_title);
				console.log('$scope.youtube_title ->');
				console.log($scope.youtube_title);
			};



		$scope.$on('youtube.player.ready', function ($event, player) {
			// play it again
			// player.playVideo();
			player.mute();
			player.c.style.opacity = '1';
		
			$scope.video_title = player.getVideoData().title;
		
			var debugText = JSON.parse(player.B.debugText);
			var debug_videoId = debugText.debug_videoId
		
			angular.forEach($scope.videos, function(videoItem, videoKey) {
				if (videoItem.youtube_url == debug_videoId) {
					$scope.videos[videoKey]['youtube_title'] = $scope.video_title;
				}
			});
		
			$scope.youtube_title = $scope.videos[0]['youtube_title'];
		});

		$scope.$on('youtube.player.buffering', function ($event, player) {
			// play it again
			player.c.style.opacity = '0';
		});

		$scope.$on('youtube.player.ended', function ($event, player) {
			// play it again
			player.c.style.opacity = '0';
			player.playVideo();
			player.mute();
		});

		$scope.$on('youtube.player.playing', function ($event, player) {
			// play it again
			player.mute();
			player.c.style.opacity = '1';
		});

		$scope.playerVars = { 
			// 'autoplay': 1,
			'controls': 0, 
			'loop':1, 
			'rel': 0 
		};
	// - EOF - YOUTUBE IFRAME API THROUGH ANGULAR YOUTUBE DIRECTIVE 
		
		
	}
// - EOF - VIDEOS 
	
	
	
	
	// DEFAULT LAYOUT VALUES 
		// var layout = {};
		$scope.layout = {
			'columns_wrapper':
				{
					'layout_align':'end center',
				},
			'columns_container':
				{
					'flex': 66,
				},
			'left_column':
				{
					'flex': 25,
				},
			'right_column':
				{
					'flex': 100,
					'style': {'transform': 'translate3d(-25%,0,0)'}, 	
				},
		};
		console.log('$scope.layout ->');
		console.log($scope.layout);
	// - EOF - DEFAULT LAYOUT VALUES 
	
	
	
	
	
// PRESSE 

// - EOF - PRESSE 	
	if ($scope.selectedAssetCategoryID == 3) {
		$scope.selectedAssetGalleryID = 4;
		
		$scope.layout.columns_wrapper = {
					'layout_align':'center center',
				};
		$scope.layout.right_column = {
					'flex': 75,
					'style': {'transform': 'translate3d(0,0,0)'}, 	
				};
	}
	
	
// NUMERIQUE 
	if ($scope.selectedAssetCategoryID == 4) {
		$scope.selectedAssetGalleryID = 2;
	}
	
// - EOF - NUMERIQUE 	
	
	
	
	// PRESSE ET NUMERIQUE 
		
	if ($scope.selectedAssetCategoryID == 3 || $scope.selectedAssetCategoryID == 4) {
		
		
		
		// var testString = $.parseJSON(frames["iframe_1"].document.getElementsByTagName("body")[0].innerHTML);
		
		// var testString = $('#iframe_1');
		//
		// console.log('testString ->');
		// console.log(testString);
		
		
		// $window.addAttachment=function(){
		//         if($.parseJSON(frames["iframe_1"].document.getElementsByTagName("body")[0].innerHTML)!=null){
		//             $scope.attachments.push($.parseJSON(frames["iframe_1"].document.getElementsByTagName("body")[0].innerHTML));
		//             console.log($scope.attachments);
		//            $scope.$apply();
		//         }
		//     }
		
	}
		
	// - EOF - PRESSE ET NUMERIQUE 
	
	


	
	
	
	
// PAGE TITLE TODO: ASSIGN A STRING FROM THE GLOBAL STRINGS OBJECT
	$scope.page_title = "media";


// UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
	// $scope.iframesStatus = true;
	// $scope.hide_iframes = function(iframesStatus){
	// 	if (iframesStatus) {
	// 		$('iframe').css({'opacity':'1'});
	// 	}
	// 	else
	// 	{
	// 		$('iframe').css({'opacity':'0'});
	// 	}
	// }
// - EOF - UI : HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 


// CKEDITOR (EDIT IN-LINE, DB REST API) 
	// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
	$scope.editMode = false;
    $scope.toggleEditMode = function() {
        $scope.editMode = $scope.editMode === false ? true: false;
		// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
		if ($scope.editMode === false) {
			window.location.reload();
		}
    };
// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 



// GET THE PRODUCT FAMILIES
	$scope.Assetcategories = appDataFactory.getObject('Assetcategories');
// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
	$scope.Assetcategories = stringsFactory.retrieveAndInjectStringNames($scope.Assetcategories, mainarrayData.Strings);



// GET THE PRODUCTS 
	$scope.Assetgalleries = appDataFactory.getObject('Assetgalleries');
	$scope.Assetgalleries = stringsFactory.retrieveAndInjectStringNames($scope.Assetgalleries, mainarrayData.Strings);



// REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
	// TODO: appDataFactory HAS BEEN IMPROVED, THERE IS NOW A FUNCTION TO POPULATE A PARENT WITH ITS CHILDREN. MAKE A CALL TO appDataFactory.
	angular.forEach($scope.Assetcategories, function(assetCategory, assetCategoryID) {
		angular.forEach(assetCategory.Assetgalleries, function(AssetgalleryID, AssetgalleryKey) {
			$scope.Assetcategories[assetCategoryID]['Assetgalleries'][AssetgalleryID] = $scope.Assetgalleries[AssetgalleryID];
		});
	});


	
	$scope.Assetgalleries = $scope.Assetcategories[$scope.selectedAssetCategoryID]['Assetgalleries'];
	
	
	var getAssets = function(assetGalleryID){
		Assets = appDataFactory.getObject('Assets');
		Assets = stringsFactory.retrieveAndInjectStringNames(Assets, mainarrayData.Strings);
		
		var assetsArray = [];
		angular.forEach($scope.Assetgalleries[assetGalleryID]['Assets'], function(asset, assetID) {
			assetsArray.push(Assets[assetID]);
		});
		return assetsArray;
	};
		
	$scope.mediaSelectedIndex = [];
	$scope.mediaSelectedIndex[3] = 0;
	$scope.mediaSelectedIndex[5] = 0;
	$scope.mediaSelectedIndex[6] = 0;

	
	
	$scope.setSelectedAssetGalleryID = function(assetGalleryID){
		$('.asset_wrapper').css({'opacity':0});
		// $scope.mediaSelectedIndex = 0;
		// $rootScope.mediaSelectedIndex = 0;
		
		// $scope['mediaSelectedIndex'][assetGalleryID] = 0;
		// $scope.mediaSelectedIndex[assetGalleryID] = 0;
		
		
		
		// $('.asset_wrapper .innertabs .asset_big_image').css({'opacity':0});
		// TODO: NOT THE BEST METHOD FOR ANIMATE THE DETAILS... IT IS TIED TO THE CSS : SEE service_container CSS TRANSITION TIMING.
		// IT SHOULD USE ng-animate
		$timeout(function(){
			
			// $scope.mediaSelectedIndex = 0;
			// $rootScope.mediaSelectedIndex = 0;
			// $scope.mediaSelectedIndex[assetGalleryID] = 0;
			
			
			$scope.selectedAssetGalleryID = assetGalleryID;
			$scope.assets = getAssets(assetGalleryID);
			$rootScope.selectedSideNav = assetGalleryID;
			$('.asset_wrapper').css({'opacity':1});
			// $('.asset_wrapper .innertabs .asset_big_image').css({'opacity':1});
		}, 350);
	}
	
	
	// $scope.assetGalleryID
	if(!$scope.assetGalleryID){
		$('.asset_wrapper').css({'opacity':0});
		// $('.asset_wrapper .innertabs .asset_big_image').css({'opacity':0});
		
		$scope.assetGalleryID = $scope.selectedAssetGalleryID;
		// DEFAULT ASSETS DISPLAYED 
		$scope.setSelectedAssetGalleryID($scope.selectedAssetGalleryID);
	}
	
	
	// $scope.title = $document[0].title;
	// $scope.windowTitle = angular.element(window.document)[0].title;
	
	// var doc = $document[0].getElementById("iframe_1").contentDocument;
	// var doc = $document[0].getElementById("iframe_1");
	// console.log('doc ->');
	// console.log(doc);
	
	// var contentDocument = angular.element(window.frames['iframe_1']);
	// console.log('contentDocument ->');
	// console.log(contentDocument);
	// var elFoo = window.frames['loader_frame'].document
	
	
	
}])	
// - EOF - .controller('AssetcategoriesCtrl', [









.controller('AssetgalleriesCtrl', function($scope) {
	
	alert('AssetgalleriesCtrl');
	
})












.controller('DashCtrl', function($scope, $translate, $filter, $timeout, Fullscreen) {	
	
	// APP'S DATA DEBUG
	// console.log('mainarrayData ->');
	// console.log(mainarrayData);
	
	
    $scope.goFullscreen = function () {

       // Fullscreen
       if (Fullscreen.isEnabled())
          Fullscreen.cancel();
       else
          Fullscreen.all();

       // Set Fullscreen to a specific element (bad practice)
       // Fullscreen.enable( document.getElementById('img') )

    };

    $scope.isFullScreen = false;

    $scope.goFullScreenViaWatcher = function() {
       $scope.isFullScreen = !$scope.isFullScreen;
    };
	
	
	// PAGE TITLE (SHOULD USE A SERVICE ?)
	$scope.page_title = "accueil";
	// $rootScope.page_title = "Accueil";
	// console.log('rootScope -> ');
	// console.log($rootScope);
	
	$scope.section = [];
	$scope.section.title = "Bienvenue";
	$scope.section.title_stringid = "99";
	
	$scope.section.text = "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.";
	
	
	// CKEDITOR (EDIT IN-LINE, DB REST API) 
	// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
	$scope.editMode = false;
    $scope.toggleEditMode = function() {
        $scope.editMode = $scope.editMode === false ? true: false;
		
		// SINCE WE HAVEN'T FOUND YET THE PROPER WAY TO UPDATE THE UI STRINGS ACCORDINGLY WITH DB UPDATES (SEE CK-EDITOR DIRECTIVE AND REST API SERVICE), WE ARE GONNA BRUTE-FORCE RELOAD THE APP WHEN THE USER QUITS 'EDIT' MODE
		if ($scope.editMode === false) {
			// alert('scope.editMode is false');
			// $state.go($state.current);
			// console.log('$state.current ->');
			// console.log($state.current);
			// console.log('$stateParams ->');
			// console.log($stateParams);
			$timeout(function(){
				window.location.reload();
			}, 300);
			
			// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: false });
		}
		
    };
	// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 	
	
	
	
	
	
	
	// $scope.$on('youtube.player.ready', function ($event, player) {
	//     // play it again
	// 	player.playVideo();
	// 	player.mute();
	// 	player.c.style.opacity = '0';
	//   });
	//
	//
	// $scope.$on('youtube.player.buffering', function ($event, player) {
	//     // play it again
	// 	player.c.style.opacity = '0';
	// });
	//
	// $scope.$on('youtube.player.ended', function ($event, player) {
	//     // play it again
	// 	player.c.style.opacity = '0';
	// 	player.playVideo();
	// 	player.mute();
	// });
	//
	// $scope.$on('youtube.player.playing', function ($event, player) {
	//       // play it again
	//   	player.mute();
	//   	player.c.style.opacity = '1';
	// });
	//
	//
	// $scope.playerVars = {
	// 	// 'autoplay': 1,
	// 	'controls': 0,
	// 	'loop':1,
	// 	'rel': 0
	// };
	
	
	
	
	var youtube_video_options = "?autoplay=1&amp;controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1";
	
	$scope.videos = [];
	
	$scope.videos.push({
		'youtube_url': 'ETmC3jkDAwY',
		// 'youtube_thumbnail': 'http://img.youtube.com/vi/g-LlBxk0-Gg/2.jpg'
	});



	$scope.$on('youtube.player.ready', function ($event, player) {
		// play it again
		player.playVideo();
		player.mute();
		player.c.style.opacity = '1';
	});

	$scope.$on('youtube.player.buffering', function ($event, player) {
		// play it again
		player.c.style.opacity = '0';
	});

	$scope.$on('youtube.player.ended', function ($event, player) {
		// play it again
		player.c.style.opacity = '0';
		player.playVideo();
		player.mute();
	});

	$scope.$on('youtube.player.playing', function ($event, player) {
		// play it again
		player.mute();
		player.c.style.opacity = '1';
	});

	$scope.playerVars = { 
		// 'autoplay': 1,
		'controls': 0, 
		'loop':1, 
		'rel': 0 
	};
// - EOF - YOUTUBE IFRAME API THROUGH ANGULAR YOUTUBE DIRECTIVE 
	
	
	
	
}) // .controller('DashCtrl', function($scope) {	








.controller('SavedDataCtrl', function($scope) {})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.pageId);
	// console.log('--->@{17} $scope.chat : ');
	// console.log($scope.chat);
	
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})







.directive('dragBack', function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
		
		
	    console.log("Dragback Link");
		
	
  	  // PREVENT SWIPING ON DESKTOPS. TODO: SHOULD USE AN ANGULAR SERVICE TO CHECK IF THE USER IS LOGGED AND CAN EDIT CONTENT.
  	  // DISABLING OF SWIPING IS PRIMARILY NEEDED TO AVOID CURSOR BUG WITH CKEDITOR : YOU CAN'T SELECT CONTENTEDITABLE'S... CONTENT.
  	  if (!ionic.Platform.isIOS() && !ionic.Platform.isAndroid())
  	  {
  	  	console.log('this is neither ios or android !');
  		return;
  	  }
	
      


console.log('--->@{48} attr.target : ');
console.log(attr.target);

      
      $ionicGesture.on('swiperight', function(event) {
      
        console.log('Got swiped!');
        event.preventDefault();
        window.history.back();
        
      }, elem);
      
    }
  }  
}) // .directive('dragBack', function($ionicGesture, $state) {
















.directive('swipeRightToPage', function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      // console.log("swipeRightToPage Link");
	  
	  // PREVENT SWIPING ON DESKTOPS. TODO: SHOULD USE AN ANGULAR SERVICE TO CHECK IF THE USER IS LOGGED AND CAN EDIT CONTENT.
	  // DISABLING OF SWIPING IS PRIMARILY NEEDED TO AVOID CURSOR BUG WITH CKEDITOR : YOU CAN'T SELECT CONTENTEDITABLE'S... CONTENT.
	  if (!ionic.Platform.isIOS() && !ionic.Platform.isAndroid())
	  {
	  	// console.log('this is neither ios or android !');
		return;
	  }


targetStateOptions = {};

if (attr.swipeRightTarget != "none") {
	 pageIdTarget = parseInt(attr.swipeRightTarget);
	 targetStateOptions = {pageId:pageIdTarget};
};


theGesture = 'swipeleft';

      
      $ionicGesture.on(theGesture, function(event) {
	
		console.log('--->@{48} attr : ');
		console.log(attr);

		console.log('--->@{48} attr.swipeRightTarget : ');
		console.log(attr.swipeRightTarget);
		console.log('--->@{48} attr.swipeRightState : ');
		console.log(attr.swipeRightState);
		
		stateTarget = attr.swipeRightState;
		console.log('--->@{89} stateTarget : ');
		console.log(stateTarget);
      
        console.log('Got swiped RIGHT!');
        event.preventDefault();
        // window.history.back();
// console.log('--->@{101} stateTarget : ');
// console.log(stateTarget);

		$state.go(stateTarget);
        
      }, elem);
      
    }
  }  
}) //  - EOF - .directive('swipeRightToPage', function($ionicGesture, $state) {








.directive('swipeLeftToPage', function($ionicGesture, $state) {
  return {
    restrict : 'EAC',
    link : function(scope, elem, attr) {
      
      // console.log("swipeLeftToPage Link");
	  
	  // PREVENT SWIPING ON DESKTOPS. TODO: SHOULD USE AN ANGULAR SERVICE TO CHECK IF THE USER IS LOGGED AND CAN EDIT CONTENT.
	  // DISABLING OF SWIPING IS PRIMARILY NEEDED TO AVOID CURSOR BUG WITH CKEDITOR : YOU CAN'T SELECT CONTENTEDITABLE'S... CONTENT.
	  if (!ionic.Platform.isIOS() && !ionic.Platform.isAndroid())
	  {
	  	// console.log('this is neither ios or android !');
		return;
	  }



targetStateOptions = {};

if (attr.swipeLeftTarget != "none") {
	 pageIdTarget = parseInt(attr.swipeLeftTarget);
	 targetStateOptions = {pageId:pageIdTarget};
};


theGesture = 'swiperight';

      
      $ionicGesture.on(theGesture, function(event) {
	
		console.log('--->@{48} attr : ');
		console.log(attr);

		console.log('--->@{48} attr.swipeLeftTarget : ');
		console.log(attr.swipeLeftTarget);
		console.log('--->@{48} attr.swipeLeftState : ');
		console.log(attr.swipeLeftState);
		
		stateTarget = attr.swipeLeftState;
		console.log('--->@{89} stateTarget : ');
		console.log(stateTarget);
      
        console.log('Got swiped LEFT!');
        event.preventDefault();
        // window.history.back();
		// console.log('--->@{101} stateTarget : ');
		// console.log(stateTarget);

		$state.go(stateTarget);
        
      }, elem);
      
    }
  }  
}); // - EOF - .directive('swipeLeftToPage', function($ionicGesture, $state) {







