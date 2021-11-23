angular.module('starter.filters', [])

.filter('object2Array', function() {
  return function(input) {
    return _.toArray(input);
  }
})



.filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
	
	// console.log('--->@{33} val BEFORE : ');
	// console.log(val);
	
	// console.log('--->@{33} val AFTER : ');
	// console.log($sce.trustAsHtml(val));
	
        return $sce.trustAsHtml(val);
    };
}])



.filter('capitalizeFirstLetter', function() {
  return function(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
  }
})


.filter('removebr', function() {
	return function(input, uppercase) {
    var out = "";
    input = input || '';
	out = input.replace("<br>", "");
    return out;
    };
})

