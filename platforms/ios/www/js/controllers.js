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
		// $scope.theLangKey = $scope.getCurrentLanguage();
	
	
	
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
	
	console.log('mainarrayData ->');
	console.log(mainarrayData);
	
	
	$scope.noInkBar = true;
	
	
	// ANGULAR MATERIAL DESIGN SIDENAV 

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
					// $('#burgerIcon').attr('icon', "send");
					// $('#burgerIcon').attr({'background':'orange'});
					// document.getElementById("burgerIcon").setAttribute("icon", "send");
				});
		};
	
		$scope.close = function() {
			$mdSidenav('right').close()
			.then(function(){
				$log.debug("close RIGHT is done");
			});
		 };
	 
	// - EOF - ANGULAR MATERIAL DESIGN SIDENAV 

	
	
	
	// TABS (TOPNAV AND SUBNAV) - TODO: MAKE THIS A DIRECTIVE HOOKED TO THE SERVICES
	
		// MD-TABS DO NOT REACT TO ROUTE CHANGES YET. THIS IS NEEDED FOR THE LOGO (SEE TOPNAV TEMPLATE)
			$scope.setSelectedTopnavIndex = function(index) {
				$scope.selectedTopnavIndex = index; // THIS TARGET MD-TABS
			};
			

			
			
			
			
			
			// THIS IS FOR TAB.DASH
			// $scope.setSelectedTopnavIndex(0);
			
			// THIS IS FOR TAB.PRODUCTS OR TAB.PRODUCTSFAMILY
			
		
		
		// BECAUSE MD-TABS DO NOTHING BY THEMSELVES, WE WATCH THEM (TOPNAV AND SUBNAV TAB INDEXES) TO CHANGE THE ROUTES ACCORDINGLY 
		
			// $scope.$watch(function($scope) { return $scope.selectedTopnavIndex },
			// 	function(newValue, oldValue) {
			//
			// 		// console.log('newValue ->');
			// 		// console.log(newValue);
			// 		// console.log('oldValue ->');
			// 		// console.log(oldValue);
			// 		// console.log('$scope.tabs ->');
			// 		// console.log($scope.tabs);
			// 		//
			// 		// if(newValue == 0)
			// 		// {
			// 		// 	$state.go('tab.productfamilies', {prodFamID:12});
			// 		// 	return{};
			// 		// }
			// 		//
			// 		// if ($scope.tabs[newValue]['url'] != "") {
			// 		// 	$state.go($scope.tabs[newValue]['url']);
			// 		// }
			// 		// else
			// 		// {
			// 		// 	alert('dev : no url has been set for this tab !');
			// 		// }
			// 	}
			// ); // $scope.$watch(function($scope) { return $scope.selectedTopnavIndex
			
			
			$scope.selectedSubnavIndex = [];
			$scope.selectedSubnavIndex[1] = 0;
			$scope.selectedSubnavIndex[2] = 0;
			$scope.selectedSubnavIndex[3] = 0;
			
			$scope.latestSelectedSubnavIndex = [];
				
				
			// FIX THIS UGLY CODE BELOW, MAKE A for counter<.length LOOP
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
				
		
		
		
		// - EOF - BECAUSE MD-TABS DO NOTHING BY THEMSELVES, WE WATCH THEM (TOPNAV AND SUBNAV TAB INDEXES) TO CHANGE THE ROUTES ACCORDINGLY 
		
	
		// TOPNAV TABS DATA 
				
			// DUMMY DATA - THIS SHOULD BE SET IN mainarrayData
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
						url:"/tab/categories/categoryID/"
			  	  	},
					{
						title: 'str_AppTopNav3',
						// url:"#/tab/tools"
						url:"/tab/assetcategories/assetCategoryID/"
			  	  	}
			    ];
			$scope.tabs = tabs;
			console.log('$scope.tabs ->');
			console.log($scope.tabs);
				
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
						$scope.Productfamilies = appDataFactory.getObject('Productfamilies');
						// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
						$scope.Productfamilies = stringsFactory.retrieveAndInjectStringNames($scope.Productfamilies, mainarrayData.Strings);
						angular.forEach($scope.Productfamilies, function(Productfamily, ProductfamilyKey) {
							
							Productfamily.stringToDisplay = Productfamily.Productfamily;
							Productfamily.url = "/tab/productfamilies/prodFamID/"+Productfamily.id;
							
							subnavTabs[tabKey].push(Productfamily);

						});
						
						$scope.subnavs[tabKey] = subnavTabs[tabKey];
					}
					
					
					// SUBNAV TABS DATA, FOR TAB = 1 (INFORMATIONS) 
					if (tabKey == 2) {
						$scope.Categories = appDataFactory.getObject('Categories');
						// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
						$scope.Categories = stringsFactory.retrieveAndInjectStringNames($scope.Categories, mainarrayData.Strings);
						angular.forEach($scope.Categories, function(Category, CategoryKey) {
							
							Category.stringToDisplay = Category.Category;
							Category.url = "/tab/categories/categoryID/"+Category.id;
							
							subnavTabs[tabKey].push(Category);
							
						});
						
						$scope.subnavs[tabKey] = subnavTabs[tabKey];
					}
					
					
					// SUBNAV TABS DATA, FOR TAB = 2 (OUTILS) 
					if (tabKey == 3) {
						$scope.Assetcategories = appDataFactory.getObject('Assetcategories');
						// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
						$scope.Assetcategories = stringsFactory.retrieveAndInjectStringNames($scope.Assetcategories, mainarrayData.Strings);
						angular.forEach($scope.Assetcategories, function(Assetcategory, AssetcategoryKey) {
							
							Assetcategory.stringToDisplay = Assetcategory.Assetcategory;
							Assetcategory.url = "/tab/assetcategories/assetCategoryID/"+Assetcategory.id;
							
							subnavTabs[tabKey].push(Assetcategory);
							
						});
						
						$scope.subnavs[tabKey] = subnavTabs[tabKey];
					}
				}
			});
			
		// SUBNAVS TABS DATA
			
			
			// console.log('$scope.subnavs ->');
			// console.log($scope.subnavs);
			
			$scope.subnavTabs = subnavTabs;
			// console.log('$scope.subnavTabs ->');
			// console.log($scope.subnavTabs);
			
			
			
			// UI - SEE TEMPLATE
			
			$scope.subnavFolded = [];
			$scope.subnavFolded[1] = true;
			$scope.subnavFolded[2] = true;
			$scope.subnavFolded[3] = true;
			
			
			// UNFOLD OR FOLD SUBNAVS 
			$rootScope.$on('rootScope:toState', function (event, toState, toParams) {
			
				// toState = data;
				console.log('toState FROM ROOTSCOPE:TOSTATE ->');
				console.log(toState);
				
				
				// TODO: FIX THIS UGLY CODE, WITH PHP'SEQUIVALENT OF case switch
				if (toState == "tab.dash") {
					// console.log('toState FROM TOPNAVCONTROLLER ->');
					// console.log(toState);
					
					$scope.setSelectedTopnavIndex(0);
					
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = true;
					
					// $scope.$apply();
				}
				
				
				if (toState == "tab.productfamilies" || toState == "tab.products") {
					// console.log('toState FROM TOPNAVCONTROLLER tab.productfamilies ->');
					// console.log(toState);
					
					$scope.setSelectedTopnavIndex(1);
					
					angular.forEach($scope.subnavs[1], function(subnavValue, subnavKey) {
						if (subnavValue.id == toParams.prodFamID) {
							$scope.selectedSubnavIndex[1] = subnavKey;
						}
					});
					
					
					$scope.subnavFolded[1] = false;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = true;
					
					// $scope.$apply();
				}
				
				
				if (toState == "tab.categories" || toState == "tab.services") {
					// console.log('toState FROM TOPNAVCONTROLLER ->');
					// console.log(toState);
					
					$scope.setSelectedTopnavIndex(2);
					
					angular.forEach($scope.subnavs[2], function(subnavValue, subnavKey) {
						if (subnavValue.id == toParams.prodFamID) {
							$scope.selectedSubnavIndex[2] = subnavKey;
						}
					});
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = false;
					$scope.subnavFolded[3] = true;
					
					// $scope.$apply();
				}
				if (toState == "tab.assetcategories" || toState == "tab.assetgalleries") {
					// console.log('toState FROM TOPNAVCONTROLLER ->');
					// console.log(toState);
					
					$scope.setSelectedTopnavIndex(3);
					
					angular.forEach($scope.subnavs[3], function(subnavValue, subnavKey) {
						if (subnavValue.id == toParams.prodFamID) {
							$scope.selectedSubnavIndex[3] = subnavKey;
						}
					});
					
					$scope.subnavFolded[1] = true;
					$scope.subnavFolded[2] = true;
					$scope.subnavFolded[3] = false;
					
					// $scope.$apply();
				}
				
				
				
				
				// else
				// {
				// 	$scope.subnavFolded = false;
				// 	// $scope.$apply();
				// }
			
			});
			// - EOF - UNFOLD OR FOLD SUBNAVS 
			
	
	
	// - EOF - TABS (TOPNAV AND SUBNAV) 
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

















.controller('ProductFamiliesCtrl', [
	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$translate', 
	'$filter', 
	'$rootScope',
	'$state',
	'$stateParams',
	
	function(
		$scope, 
		appDataFactory, 
		stringsFactory,
		$translate,
		$filter,
		$rootScope,
		$state,
		$stateParams
		) 
		{
	
			// APP'S DATA DEBUG
			// console.log('mainarrayData ->');
			// console.log(mainarrayData);
			
	
			// TODO: DETECT WHICH PLATFORM THE USER IS ON, TO AVOID SPECIFIC STUFF IF NEEDED
			// $scope.isIOS = ionic.Platform.isIOS();
	
	
	
			// TODO : TERNARY OPERATOR, AND DEFAULT ID SHOULD BE RETRIEVED FROM APP'S DATA, NOT HARDCODED
			$scope.selectedProdFamID = $state.params.prodFamID;
			if ($scope.selectedProdFamID == "") {
				$scope.selectedProdFamID = 12;
			}



			// HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
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
			// - EOF - HIDE OR SHOW YOUTUBE IFRAME VIDEOS INSTEAD OF IMAGES IN PLACEHOLDERS 
	
	
	
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
			
	
	
	// $scope.initializeObjects = function(){
		
		
		// console.log('mainarrayData FROM CONTROLLER‘S FUNCTION initializeObjects ->');
		// console.log(mainarrayData);
		
		
		// GET THE PRODUCT FAMILIES
		$scope.Productfamilies = appDataFactory.getObject('Productfamilies');
			// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
			$scope.Productfamilies = stringsFactory.retrieveAndInjectStringNames($scope.Productfamilies, mainarrayData.Strings);
			$scope.ProductfamiliesOrderKeys = [];
			
			// console.log('$scope.Productfamilies FROM CONTROLLER‘S FUNCTION initializeObjects ->');
			// console.log($scope.Productfamilies);
	
	
		// GET THE PRODUCTS 
		$scope.Products = appDataFactory.getObject('Products');
			// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
			$scope.Products = stringsFactory.retrieveAndInjectStringNames($scope.Products, mainarrayData.Strings);
	
	
	
		// REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
			angular.forEach($scope.Productfamilies, function(Productfamily, ProductfamilyID) {
				
				// console.log('ProductfamilyID ->');
				// console.log(ProductfamilyID);
				//
				// $scope.ProductfamiliesOrderKeys.push(ProductfamilyID)
				
				angular.forEach(Productfamily.Products, function(ProductID, ProductKey) {
					
					// console.log('ProductID ->');
					// console.log(ProductID);
					// console.log('ProductKey ->');
					// console.log(ProductKey);
					
					$scope.Productfamilies[ProductfamilyID]['Products'][ProductID] = $scope.Products[ProductID];
				});
			});
		// - EOF - REPLACE ID'S (PRODUCTS) IN PRODUCT FAMILIES BY THEIR OBJECTS
		
		// $scope.ProductfamiliesCopy = _.toArray($scope.Productfamilies);
		//
		// console.log('$scope.ProductfamiliesCopy FROM CONTROLLER‘S FUNCTION initializeObjects ->');
		// console.log($scope.ProductfamiliesCopy);
		
		$scope.Products = "";
		
		
		// $scope.Services = appDataFactory.getObject('Services');
			// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
			// $scope.Services = stringsFactory.retrieveAndInjectStringNames($scope.Services, mainarrayData.Strings);
		// console.log('$scope.Services FROM TOPNAVCONTROLLER ->');
		// console.log($scope.Services);
	
	
		
			
			// current_language = $translate.use();
			
			
			
			// var strings_fr_array = _.values(window['strings_'+current_language]);
			// console.log('strings_fr_array ->');
			// console.log(strings_fr_array);
			
			// $translate(['str_ProductfamilyString_ID_productfamilies_12']).then(function (translations) {
			//     $scope.headline = translations.str_ProductfamilyString_ID_productfamilies_12;
			// 	console.log('$scope.headline ->');
			//
			//
			//
			//
			// 	console.log($scope.headline);
			//   });
		
		
		
		
		// PAGE TITLE (SHOULD USE A SERVICE ?)
			$scope.page_title = "catalogue produits";
	
		
		// RIGHT SIDE DISPLAY
			$scope.section = [];
		
			// FOR MOCKUPS ONLY : SET A TEMPORARY FIXED PRODUCT FAMILY
			
			
			
			ProductfamilyID = parseInt($scope.selectedProdFamID);
			// console.log('ProductfamilyID FROM BOTTOM ->');
			// console.log(ProductfamilyID);
			
			// console.log('$scope.Productfamilies FROM CONTROLLER‘S FUNCTION initializeObjects ->');
			// console.log($scope.Productfamilies);
			
			// console.log('$scope.Productfamilies[ProductfamilyID] ->');
			// console.log($scope.Productfamilies[ProductfamilyID]);
			$scope.Products = $scope.Productfamilies[ProductfamilyID]['Products'];
			
			// console.log('$scope.Products ->');
			// console.log($scope.Products);
			
			
			angular.forEach($scope.Products, function(ProductID, ProductKey) {
				// console.log('ProductID ->');
				// console.log(ProductID);
				// console.log('ProductKey ->');
				// console.log(ProductKey);
				
				if(typeof(ProductID) == "undefined"){
					console.log('deleting... ->');
					delete($scope.Products[ProductKey]);
				}
				
			});
			
			
			
			
			var youtube_video_options = "?autoplay=1&controls=0&loop=1&amp;showinfo=0&modestbranding=1&disablekb=1&enablejsapi=1";
		
			// $scope.Products[27]['youtube_video'] = "//www.youtube.com/embed/d1zeF2_1KWU"+youtube_video_options;
			// $scope.Products[24]['youtube_video'] = "//www.youtube.com/embed/pXFI4_TphM4"+youtube_video_options;
			// $scope.Products[25]['youtube_video'] = "//www.youtube.com/embed/ip9J8rfxbgA"+youtube_video_options;
			// $scope.Products[14]['youtube_video'] = "//www.youtube.com/embed/g-LlBxk0-Gg"+youtube_video_options;
		
			
			// TEST OF MOVING YOUTUBE API OUT OF TEMPLATE 
			
			// - EOF - TEST OF MOVING YOUTUBE API OUT OF TEMPLATE 
			
			
				// youtube_video:"//www.youtube.com/embed/d1zeF2_1KWU"+youtube_video_options
				// youtube_video:"//www.youtube.com/embed/eccGEz5VeVA"+youtube_video_options
				// youtube_video:"//www.youtube.com/embed/Dz2ZTfc4jpg"+youtube_video_options
				// youtube_video:"//www.youtube.com/embed/wSiD-EmaaJ0"+youtube_video_options
			
			
			// console.log('$scope.Products ->');
			// console.log($scope.Products);
		
			// $scope.section.title_translated = $filter('translate')($scope.Productfamilies[$scope.ProductfamilyID]['Productfamily']);
			$scope.section.title = $scope.Productfamilies[ProductfamilyID]['Productfamily'];
			$scope.section.title_stringid = $scope.Productfamilies[ProductfamilyID]['ProductfamilyString_ID'];
		
		
			$scope.section.text = $scope.Productfamilies[ProductfamilyID]['FullDescription'];
		
		
	// };
	//
	// $scope.initializeObjects();


		// $rootScope.$on('$translateChangeSuccess', function(){
		//
		// });

	
	
	// YOUTUBE IFRAME API OPTIONS
	var youtube_video_options = "?autoplay=1&amp;controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1";
	
	
	// MOCKUPS DUMMY DATA
	var product_families = [
	      	{ 
			// USE ng-bind-hml TO ECHO OUT HTML CONTENT COMING FROM CMS
			  // title: '<i class="icon ion-home"></i>',
			  title: 'passeport', 
			  content: "Le sésame qui ouvre la porte à 350 ans d’histoire.",
				background_image_url:"img/backgrounds/chapelle.jpg",
				youtube_video:"//www.youtube.com/embed/d1zeF2_1KWU"+youtube_video_options
				
				
		  	},
	      	{ 
			  title: 'passeport 2 jours', 
			  content: "Un nouveau billet pour prendre le temps de découvrir Versailles autrement.",
				background_image_url:"img/backgrounds/temple2.jpg",
				youtube_video:"//www.youtube.com/embed/eccGEz5VeVA"+youtube_video_options
				// pXFI4_TphM4
				
	  		},
			{ 
				title: 'billet château', 
				content: "Les lieux les plus célèbres du Château en toute liberté.",
				background_image_url:"img/backgrounds/detail.jpg",
				youtube_video:"//www.youtube.com/embed/Dz2ZTfc4jpg"+youtube_video_options
				// ip9J8rfxbgA
				
				
	  	  	},
			{ 
				title: 'billet châteaux de trianon', 
				content: "Dans l’intimité de Louis XIV, Marie-Antoinette et Napoléon.",
				background_image_url:"img/backgrounds/trianon.jpg",
				youtube_video:"//www.youtube.com/embed/wSiD-EmaaJ0"+youtube_video_options
				// g-LlBxk0-Gg
	  	  	}
	    ];
	    $scope.product_families = product_families;
	
	
		// MATERIAL DESIGN GRID
		
		if (ProductfamilyID == 13) {
			$scope.md_cols_gt_lg="3";
		}
		else{
			$scope.md_cols_gt_lg="2";
		}
		
	
	
	
// $scope.Products[] = 'pXFI4_TphM4';

console.log('$scope.Products FROM  ->');
console.log($scope.Products);

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
	$scope.Products[30]['youtube_url'] = 'ip9J8rfxbgA';
}



console.log('$scope.Products FROM  ->');
console.log($scope.Products);


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
	
// $scope.$on('youtube.player.ended', function ($event, player) {
//     player.playVideo();
//   });
	

// youtube.player.ready
// youtube.player.ended
// youtube.player.playing
// youtube.player.paused
// youtube.player.buffering
// youtube.player.queued
// youtube.player.error
	
}]) // ProductFamiliesCtrl








.controller('ProductsCtrl', [
	'$scope',
	'appDataFactory', 
	'stringsFactory', 
	'$rootScope',
	'$state',
	'$ionicScrollDelegate',
	
	function(
		$scope, 
		appDataFactory, 
		stringsFactory,
		$rootScope,
		$state,
		$ionicScrollDelegate
	) 
		{
			// console.log('$state.params -> FROM PRODUCTFAMILIESCTRL');
			// console.log($state.params);
			
			// CHECK PRODUCT ID CALLED
			var selectedProductID = $state.params.productID;
	
			
			if (selectedProductID == "") {
				selectedProductID = 12; // TODO: DEFAULT IS WRONG, THIS IS DEFAULT FOR PRODUCTFAMILY - DON'T DEFINE IT LIKE THIS, 
			}
			
			
			// CKEDITOR (EDIT IN-LINE, DB REST API) 
			// TODO: THIS HAS TO BE MOVED TO AN ANGULAR SERVICE, OR $rootScope : editMode SHOULD BE TRIGGERED FOR ANY CONTROLLER (ANY VIEW)
			$scope.editMode = false;
			$scope.scrollMode = true;
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
					
					window.location.reload();
					
					// $ionicScrollDelegate.$getByHandle('tab_target_0').freezeScroll(false);
					$ionicScrollDelegate.freezeAllScrolls(false);
					// $scope.scrollMode = 'true';
					
					
					// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: false });
				}
				else
				{
					// $ionicScrollDelegate.freezeAllScrolls(1);
					$ionicScrollDelegate.freezeAllScrolls(true);
					// $scope.scrollMode = 'false';
					
					// $ionicScrollDelegate.$getByHandle('tab_target_0').freezeScroll(true);
					// $ionicScrollDelegate.freezeAllScrolls(true);
					
					// $ionicScrollDelegate.$getByHandle('small').freezeScroll(true);
				}
				
		    };
			// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 			
			
			// APP'S DATA DEBUG
			console.log('mainarrayData FROM PRODUCTFAMILIESCTRL ->');
			console.log(mainarrayData);
			
			
			// GET THE PRODUCTS 
			$scope.Products = appDataFactory.getObject('Products');
				// INJECT STRINGS NAMES INTO OBJECTS, SO ANGULAR TRANSLATE CAN "CATCH" THEM 
				$scope.Products = stringsFactory.retrieveAndInjectStringNames($scope.Products, mainarrayData.Strings);
			
			// console.log('$scope.Products FROM PRODUCTFAMILIESCTRL ->');
			// console.log($scope.Products);
			console.log('selectedProductID FROM PRODUCTFAMILIESCTRL ->');
			console.log(selectedProductID);
			
			$scope.selectedProductID = selectedProductID;
			
			$scope.Product = $scope.Products[selectedProductID];
			
			console.log('$scope.Product FROM PRODUCTFAMILIESCTRL ->');
			console.log($scope.Product);
			
			
			
			$scope.scrollTop = function(tab_target) {
			    $ionicScrollDelegate.$getByHandle('tab_target_'+tab_target+'').scrollTop();
			  };
			  
			  $scope.disableVerticalScrolling = function(tab_target) {
			      var scrollPos = $ionicScrollDelegate.$getByHandle('tab_target_'+tab_target+'').getScrollPosition().top;
			      $ionicScrollDelegate.$getByHandle('tab_target_'+tab_target+'').scrollTo(0, scrollPos, false);
			  }
			  
			  // $scope.scrollTop = function() {
			  //     $ionicScrollDelegate.scrollTop();
			  //   };
			
			
}]) // .controller('ProductsCtrl', [












.controller('CategoriesCtrl', function($scope) {
	
	// alert('CategoriesCtrl');
})


.controller('ServicesCtrl', function($scope) {
	
	alert('ServicesCtrl');
	
})











.controller('AssetcategoriesCtrl', function($scope) {
	
	// alert('AssetcategoriesCtrl');
})


.controller('AssetgalleriesCtrl', function($scope) {
	
	alert('AssetgalleriesCtrl');
	
})












.controller('DashCtrl', function($scope, $translate, $filter) {	
	
	// APP'S DATA DEBUG
	console.log('mainarrayData ->');
	console.log(mainarrayData);
	
	
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
			
			window.location.reload();
			
			// $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: false });
		}
		
    };
	// - EOF - CKEDITOR (EDIT IN-LINE, DB REST API) 	
	
	
	
	
	
	
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
      
      console.log("swipeRightToPage Link");
	  
	  // PREVENT SWIPING ON DESKTOPS. TODO: SHOULD USE AN ANGULAR SERVICE TO CHECK IF THE USER IS LOGGED AND CAN EDIT CONTENT.
	  // DISABLING OF SWIPING IS PRIMARILY NEEDED TO AVOID CURSOR BUG WITH CKEDITOR : YOU CAN'T SELECT CONTENTEDITABLE'S... CONTENT.
	  if (!ionic.Platform.isIOS() && !ionic.Platform.isAndroid())
	  {
	  	console.log('this is neither ios or android !');
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
      
      console.log("swipeLeftToPage Link");
	  
	  // PREVENT SWIPING ON DESKTOPS. TODO: SHOULD USE AN ANGULAR SERVICE TO CHECK IF THE USER IS LOGGED AND CAN EDIT CONTENT.
	  // DISABLING OF SWIPING IS PRIMARILY NEEDED TO AVOID CURSOR BUG WITH CKEDITOR : YOU CAN'T SELECT CONTENTEDITABLE'S... CONTENT.
	  if (!ionic.Platform.isIOS() && !ionic.Platform.isAndroid())
	  {
	  	console.log('this is neither ios or android !');
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







