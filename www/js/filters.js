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
	out = out.replace("<br />", "");
    return out;
    };
})


.filter('longtitle', function(){
	return function(page_title){

		if (typeof(page_title) != "undefined") 
		{
			var page_titleLength = page_title.length;
			
			if (typeof(page_titleLength) == "undefined") 
			{
				// DEBUGGING page_titleLength
				console.log('---> page_titleLength UNDEFINED : ');
				console.log(page_titleLength);
				
			};
			
			
			console.log('---> page_titleLength : ');
			console.log(page_titleLength);
			
			return page_title;
			return page_title+' test';
		};
		
	}
})
