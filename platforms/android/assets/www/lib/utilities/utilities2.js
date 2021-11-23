// CB FRAMEWORK SPECIFIC FUNCTIONS

function vanillaApplyClass (dom_target, operation, css_class) {
	
	
	// TODO : MONITOR WHICH ONE HAS BETTER ANIMATION PERFORMANCE (CHROME DEV TOOLS TIMELINE)
	
	// -------- EOF - TODO : MONITOR WHICH ONE HAS BETTER ANIMATION PERFORMANCE (CHROME DEV TOOLS TIMELINE)
	
	
	// 1 - LOOP METHOD
		
		/*
		targets = document.querySelectorAll(dom_target);

		for (var i = 0; i < targets.length; i++) {

			// console.log('--->@{40} dom_target : ');
			// console.log(dom_target);
			// console.log('--->@{40} operation : ');
			// console.log(operation);
			// console.log('--->@{40} css_class : ');
			// console.log(css_class);

			// NOT KEEN ON USING eval...
			if (operation == "add") 
			{
				targets[i].classList.add(css_class);
				// requestAnimationFrame(function() {
				// 	$(dom_target).addClass(css_class);
				// }, 1000 / 40);
			};

			if (operation == "remove") 
			{
				targets[i].classList.remove(css_class);
				// requestAnimationFrame(function() {
				// 	$(dom_target).removeClass(css_class);
				//   }, 1000 / 40);
			};
		}
		*/
		
	// -------- EOF - 1 - LOOP METHOD
	
		
	// 2 - requestAnimationFrame METHOD
		if (operation == "add") 
		{
			// targets[i].classList.add(css_class);
			requestAnimationFrame(function() {
				$(dom_target).addClass(css_class);
			}, 1000 / 40);
		};
		
		if (operation == "remove") 
		{
			// targets[i].classList.remove(css_class);
			requestAnimationFrame(function() {
				$(dom_target).removeClass(css_class);
			  }, 1000 / 40);
		};
	// -------- EOF - 2 - requestAnimationFrame METHOD	
	
}

// -------- EOF - CB FRAMEWORK SPECIFIC FUNCTIONS




// REQUEST ANIMATION FRAME POLYFILL


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


// -------- EOF - REQUEST ANIMATION FRAME POLYFILL



// YOUTUBE IFRAME API CONTROL, TO MUTE "DECORATIVE" VIDEOS
function getFrameID(id){
    var elem = document.getElementById(id);
    if (elem) {
        if(/^iframe$/i.test(elem.tagName)) return id; //Frame, OK
        // else: Look for frame
        var elems = elem.getElementsByTagName("iframe");
        if (!elems.length) return null; //No iframe found, FAILURE
        for (var i=0; i<elems.length; i++) {
           if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
        }
        elem = elems[i]; //The only, or the best iFrame
        if (elem.id) return elem.id; //Existing ID, return it
        // else: Create a new ID
        do { //Keep postfixing `-frame` until the ID is unique
            id += "-frame";
        } while (document.getElementById(id));
        elem.id = id;
        return id;
    }
    // If no element, return null.
    return null;
}

// Define YT_ready function.
var YT_ready = (function() {
    var onReady_funcs = [], api_isReady = false;
    /* @param func function     Function to execute on ready
     * @param func Boolean      If true, all qeued functions are executed
     * @param b_before Boolean  If true, the func will added to the first
                                 position in the queue*/
    return function(func, b_before) {
        if (func === true) {
            api_isReady = true;
            while (onReady_funcs.length) {
                // Removes the first func from the array, and execute func
                onReady_funcs.shift()();
            }
        } else if (typeof func == "function") {
            if (api_isReady) func();
            else onReady_funcs[b_before?"unshift":"push"](func); 
        }
    }
})();
// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {
	// alert('onYouTubePlayerAPIReady');
	YT_ready(true)
}

// Load YouTube Frame API
(function() { // Closure, to not leak to the scope
  var s = document.createElement("script");
  s.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();
var player; //Define a player object, to enable later function calls, without
            // having to create a new class instance again.

// Add function to execute when the API is ready
YT_ready(function(){

	// JEEP THIS BELOW : THE NUMBER OF IFRAMES SHOULD MATCH
	// a.forEach(function(entry) {
	//     console.log(entry);
	// });

	for (counter = 0; counter < 4; counter++){
		
	    var frameID = getFrameID("frame"+counter);
	
		// alert('frameID : '+frameID)
	
	    if (frameID) { //If the frame exists
	        player = new YT.Player(frameID, {
	            events: {
	                "onStateChange": stopCycle,
					// ,
					      		  'onReady': onPlayerReady
	            }
	        });
	    }
		
	} // for (counter = 0; 

});


// Example: function stopCycle, bound to onStateChange
function stopCycle(event) {
    // alert("onStateChange has fired!\nNew state:" + event.data);
	// player.mute();
	
	// FALSE LOOP, AS loop=1 (IN VIDEO'S URL) DOES NOT SEEM TO WORK
	if(event.data == 0) // IF STOPPED, REPLAY. REMEMBER, WE PREVENT THE USER FROM CLICKG THE "DECORATIVE" VIDEO, SO "STOPPED" MEANS "END OF VIDEO HAS BEEN REACHED".
		// CAREFUL, THERE'S A FLOUC AT THE END OF THE VIDEO, WE BRIEFLY SEE THE SUGGESTED VIDEOS (COMING FROM YOUTUBE'S IFRAME). BEST SOLUTION WOULD BE TO "POLL" AT REGULAR INTERVALS, SEE THE CURRENT VIDEO TIMING, COMPARE IT TO THE TOTAL TIMING, AND MAKES SURE WE START THE VIDEO AGAIN BEFORE THE VERY END, SO WE CAN AVOID THE FLOUC.
		// https://developers.google.com/youtube/iframe_api_reference#Examples
	{
		onPlayerReady(event);
	}
	
}
//
// // setTimeout(function(){alert("HI")}, 1000); // using native
// // setTimeout(function(){alert("HI")}, 1000, true); // using workaround
//
function onPlayerReady(event) {


setTimeout(function(){
    event.target.setPlaybackQuality('large');

}, 30, true);


setTimeout(function(){
    event.target.mute();
  	event.target.setVolume(0);
  
}, 60, true);


setTimeout(function(){
    event.target.playVideo();

}, 90, true);
	
	
	// setTimeout(function(){
	//   //   	  event.target.mute();
	//   // event.target.setVolume(0);
	//
	//   // alert("Hello");
	//   }, 300, true);
  
  
// setTimeout(function(){
// 	  event.target.mute();
//   event.target.setVolume(0);
//
//   // alert("Hello");
// }, 9000, true);
  
}