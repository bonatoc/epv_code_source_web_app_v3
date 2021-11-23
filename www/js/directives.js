angular.module('starter.directives', [])





// STRING COMPILER
.directive('stringCompiler', function ($filter) {
  return {
    restrict: 'A',
    replace: true,
	  scope: {},
	  template:'<div ng-bind-html="stringname | translate | unsafe"></div>',
    link: function (scope, ele, attrs) {
       scope.stringname = attrs.stringname;
    }
  };
})
// -------- EOF - STRING COMPILER




// .directive('recompiler', function ($compile, $filter) {
//   return {
//     restrict: 'A',
//     replace: true,
//
//     link: function (scope, ele, attrs) {
//
// 		scope.$watch(attrs.stringname, function(html) {
//
// 			if (typeof(html) != "undefined") {
// 				html = $filter('translate')(html);
// 				attrs.stringname = $filter('translate')(attrs.stringname);
// 				ele.html(html);
// 				$compile(ele.contents())(scope);
// 			}
//
//       	});
//     }
//
//   };
// })


.directive('recompiler', function ($compile, $interpolate, $filter, $sce) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.stringid, function(html) {
			html = attrs.alreadytranslated;
			ele.html(html);
	        $compile(ele.contents())(scope);
      });
    }
  };
})







.directive('frontOfficeEdit', [
	'$rootScope',
	'$parse',
	'RESTIntranet', 
	'$translate', 
	'$filter', 
	'$ionicScrollDelegate',
	'$compile',
	
	function (
		$rootScope, 
		$parse, 
		RESTIntranet,
		$translate,
		$filter,
		$ionicScrollDelegate,
		$compile
	) {
	
/*
! ! ! 
CAREFUL ! ON WEBKIT, CKEDITOR BUGS IF PARENT DIV HAS display:none WHILE INITIALIZING.
! ! ! 
*/



// PREVENT EDITING ON MOBILE DEVICES. CKEDITOR BUGS ON SWIPE
if (ionic.Platform.isIOS() || ionic.Platform.isAndroid())
{
	console.log('frontOfficeEdit directive (ckeditor, contenteditable) is set to ignore moble platforms!');
	return;
}



// TODO: 
/*
PREVENT EDITING IF : 
- THE USER IS NOT LOGGED, 
AND
- THE USER HAS NO RIGHTS TO EDIT
AND
- THE USER HAS SET EDITING TO "OFF".
*/


	
// ONLY IF ALLOWED TO EDIT
/*
	if (typeof($rootScope.intranet_session_id) == "undefined") 
	{	
		return;
	}
*/
// - EOF - ONLY IF ALLOWED TO EDIT



// CKEDITOR.disableAutoInline = true;
	
	
	
    var counter = 0,
    prefix = '__ckd_';


    return {
        restrict: 'A',
        link: function (scope, element, attrs, controller) {
			
			
			// console.log('scope ->');
			// console.log(scope);
			// console.log('element ->');
			// console.log(element);
			// console.log('attrs ->');
			// console.log(attrs);
			// console.log('controller ->');
			// console.log(controller);
			
			
			
			scope.$watch('editMode', function(newVal, oldVal) {
				// IF editMode IS SET TO FALSE (OFF)
				if (!newVal)
				{
					
					
					// REMOVE contenteditable FROM ELEMENT
		            attrs.$set('contenteditable', false);
		            // element[0]['parentNode']['parentNode'].setAttribute('overflow-scroll','false');
					
		            // element[0]['parentNode'].style['pointer-events'] = 'auto';
		            // element[0]['parentNode']['parentNode'].style['pointer-events'] = 'auto';
					
		            // element[0]['parentNode'].setAttribute('class', 'scroll');
		            // attrs.$set('scroll', 'true');
					
					
					
					// DESTROY ALL CKEDITOR INSTANCES
					for(name in CKEDITOR.instances)
					{
					    CKEDITOR.instances[name].destroy();
					}
					return;
				}
				// ELSE, editMode IS SET TO TRUE (ON)
				else
				{
	            	var getter = $parse(attrs.frontOfficeEdit), 
	                	setter = getter.assign;
      
					// console.log('element FROM FRONTOFFICEEDIT DIRECTIVE ->');
					// console.log(element);
					//
					// machin = element[0]['parentNode']['parentNode'];
					// console.log('machin FROM FRONTOFFICEEDIT DIRECTIVE ->');
					// console.log(machin);
					
	  				  
		            // element[0]['parentNode']['parentNode'].style['pointer-events'] = 'none';
		            // element[0]['parentNode']['parentNode'].classList.add('scroll-content-false');
		            // element[0]['parentNode']['parentNode'].setAttribute('overflow-scroll','true');
					
					
					// $compile(element[0]['parentNode']['parentNode'])(scope.$parent);
					
		            // element[0]['parentNode'].classList.remove('scroll');
					
					// $compile(element[0]['parentNode']['parentNode']);
					
			        // element.setAttribute( "src", "newsource" );
					
					
		            // element[0]['parentNode'].style['pointer-events'] = 'none';
		            // element[0]['parentNode'].style['pointer-events'] = 'none';
		            // element[0].style['pointer-events'] = 'auto';
					// element.classList.add( "active" );
					        //element.setAttribute( "class", "active" );
					        // element.setAttribute( "src", "newsource" );
					
					
		            attrs.$set('contenteditable', true); // inline ckeditor needs this
		            // attrs.$set('style', 'z-index:9999;');
					
					

		            if (!attrs.id) {
		                attrs.$set('id', prefix + (++counter));
		            }

		            var options = {};
					
		            options.on = {
		                blur: function (e) {
		                    if (e.editor.checkDirty()) {
		                        var ckValue = e.editor.getData();
								
								// TRANSLATE IT?
								ckValue = $filter('translate')(ckValue);
								
		                        scope.$apply(function () {
									console.log('--->@{369} ckValue is going to be inserted/updated in DB through service : ');
									console.log(ckValue);
								
									// CB FRAMEWORK INTRANET REST API CALL
									RESTIntranet.saveContent(ckValue, attrs.stringid, attrs.stringname);
									
									// UPDATE THE STRING IN STRINGS (JSON)
									current_language = $translate.use();
									curlang_caps = current_language.toUpperCase();
									stringname = attrs.stringname;
									// ACCESSING VAR THROUGH WINDOW
									// http://stackoverflow.com/questions/5117127/use-dynamic-variable-names-in-javascript
									// window['strings_'+current_language][stringname] = ckValue;
									// scope.section.title = ckValue;
									// mainarrayData.Strings[attrs.stringid]['StringContent_'+curlang_caps] = ckValue;
									
									// THIS ENSURES THAT SCOPE'S OBJECT IS SET TO THE PROPER VALUE, EVEN ONCE CKEDITOR ARE DESTROYED
									setter(scope, ckValue);
									
									
		                        });
		                        ckValue = null;
		                        e.editor.resetDirty();
		                    }
		                }
		            };
					
		            options.extraPlugins = 'sourcedialog,find,showprotected,dialog,fakeobjects';
		            options.removePlugins = 'sourcearea';	
					
					
					
					// Load from a list of definitions.
					options.stylesSet = [
					    { name: 'Strong Emphasis', element: 'strong' },
					    { name: 'Emphasis', element: 'em' },
					];
					
					// options.allowedContent = true;
					

					
					
					// console.log('CKEDITOR.dtd ->');
					// console.log(CKEDITOR.dtd);
					
					// options.allowedContent = {
					//     $1: {
					//         // Use the ability to specify elements as an object.
					//         elements: CKEDITOR.dtd,
					//         attributes: true,
					//         styles: true,
					//         classes: true,
					//     }
					// };
					// options.disallowedContent = 'script; *[on*]';
					options.allowedContent = true;
					// options.extraAllowedContent = 'md-button[*](*){*};div[*](*){*};span[*](*){*}';
					// options.extraAllowedContent = '*[*](*){*}';
					options.protectedSource = [
					    /{{[\s\S]*?}}/g
					  ];		
					// options.autoParagraph = false;
					  
					  			
		            var editorangular = CKEDITOR.inline(element[0], options); //invoke
					
					scope.$watch(attrs.frontOfficeEdit, function (value) {
						// TRANSLATE IT?
						value = $filter('translate')(value);
						editorangular.setData(value);
					});
					
				} // - EOF - else
				
			}, true); // - EOF - scope.$watch('editMode', function(newVal, oldVal) {

        }
		// - EOF - link
    }
	// - EOF - return
}]) // .directive('frontOfficeEdit', [









.directive('flexGrid', function () {
	  return {
	    controller: function () {
	      var vm = this;
	      vm.ratio = '1:1';
	    },
	    controllerAs: 'vm',
	    link: function (scope, element, attributes, controller) {
	      var container = element.parent();
	      controller.ratio = (container.prop('clientWidth') / 2) +
	        ':' + container.prop('clientHeight');
	    } // link
	  }; // return
})







.directive('checkNameLength', ['$filter','$compile', function ($filter,$compile) {
	return {
	    restrict: 'AE',
		// scope: "&",
	    // replace: true,
		// scope: @,
	  // scope: "@",
		// transclude: 'element',
	    link: function (scope, element, attrs) {
			
			var stringname = attrs.stringname;
			stringname = $filter('translate')(stringname);
			// console.log('stringname ->');
			// console.log(stringname);
			stringname = $filter('removebr')(stringname);
			// console.log('stringname ->');
			// console.log(stringname);
			
			if (element[0].parentElement != null) {
				if (stringname.length > 24) {
					// console.log('too long ! ->');
					element[0].parentElement.classList.add('smaller');
					var html = element.html();
					// html = $filter('removebr')(stringname);
					html = stringname;
					element.replaceWith(html);
					$compile(element)(scope); //<---- recompilation
				}
			}
	    } // link
	} // return
}])







// TODO: MAKE A TEXTMATE SNIPPET 'CREATE DIRECTIVE'
.directive('testDirective', ['$rootScope', function ($rootScope) {
	return {
	    restrict: 'AE',
		scope: "=",
	    replace: true,
		// template: "<div>hello from testDirective - product_families is {{selectedProdFamID}}</div>",
		
	    link: function (scope, ele, attrs) {
			
			alert('test alert FROM TESTDIRECTIVE');
			
			console.log('ele FROM TESTDIRECTIVE ->');
			console.log(ele);
			
			console.log('attrs FROM TESTDIRECTIVE ->');
			console.log(attrs);
			
	    }
	}

}])






