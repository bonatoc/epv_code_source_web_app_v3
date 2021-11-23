// WE USE THIS FOR CONDITIONAL LOADING OF CLASSES AND/OR SCRIPTS ACCORDING TO THE VIEWPORT SIZE. 


	var screen_is; // HOLDER FOR DETECTED VIEWPORT 
	var do_define_what_screen_is; // TRIGGERS VIEWPORT DETECTION

	// SEE COMPASS BOOTSTRAP RESPONSIVE BREAKPOINTS, THEY SHOULD ALWAYS MATCH THESE
	var screen_resolutions = 
	{
		/*
		COMMENTED OUT FOR BACKUP PURPOSES 
		1:{min_width:1,max_width:480,screen_is:"mobile"},					// xxs
		2:{min_width:481,max_width:768,screen_is:"tablet_portrait"},		// xs
		3:{min_width:769,max_width:1024,screen_is:"tablet_landscape"},		// sm
		4:{min_width:1025,max_width:1200,screen_is:"desktop_small"},		// md
		5:{min_width:1201,max_width:1600,screen_is:"desktop"},				// lg
		6:{min_width:1601,max_width:99999,screen_is:"desktop_large"},		// xl
		*/
		
		// IT'S BETTER TO NAME SCREEN RES WITH THE SAME NAMES AS OUR COMPASSS BREAKPOINTS, SO WE CAN HAVE DYNAMIC NAMING
		// 1:{min_width:1,max_width:480,screen_is:"xxs"},			// xxs
		// 2:{min_width:481,max_width:768,screen_is:"xs"},			// xs
		// 3:{min_width:769,max_width:1024,screen_is:"sm"},		// sm
		// 4:{min_width:1025,max_width:1200,screen_is:"md"},		// md
		// 5:{min_width:1201,max_width:1600,screen_is:"lg"},		// lg
		// 6:{min_width:1601,max_width:99999,screen_is:"xl"},		// xl
		
		1:{min_width:1,max_width:480,screen_is:"xxs"},			// xxs
		2:{min_width:481,max_width:768,screen_is:"xs"},			// xs
		3:{min_width:769,max_width:1024,screen_is:"sm"},		// sm
		4:{min_width:1025,max_width:1366,screen_is:"md"},		// md
		5:{min_width:1367,max_width:1600,screen_is:"lg"},		// lg
		6:{min_width:1601,max_width:99999,screen_is:"xl"},		// xl
		
	};
	
	// DETECT VIEWPORT SIZES (VERGE)
	if (typeof(windowWidth) == "undefined") {
		var windowWidth = verge.viewportW();
		var windowHeight = verge.viewportH();
		define_what_screen_is();
	};
	// - EOF - DETECT VIEWPORT SIZES (VERGE)
	
	
	// RECALCULATE VIEWPORT SIZES ON THE FLY, WHEN USER RESIZES VIEWPORT
	function define_what_screen_is(){
	    windowWidth = verge.viewportW();
		windowHeight = verge.viewportH();
		
		$.each(screen_resolutions, function( index, screen_res ) {
			
			// console.log('--->@{45} screen_res : ');
			// console.log(screen_res);
			// console.log('--->@{47} windowWidth : ');
			// console.log(windowWidth);
			// console.log('--->@{49} windowHeight : ');
			// console.log(windowHeight);
			
			
			if ((windowWidth > screen_res.min_width) & (windowWidth <= screen_res.max_width)) {
				screen_is = screen_res.screen_is;
				// console.log('--->@{144} screen dimensions : ');
				// console.log(windowWidth+' >= '+screen_res.min_width+') & ('+windowWidth+' <= '+screen_res.max_width);
				console.log('--->@{48} screen_is '+screen_is);
			}
		});
	};
	// RECALCULATE VIEWPORT SIZES ON THE FLY, WHEN USER RESIZES VIEWPORT
	
	
	// WE USE JS TIMEOUT TO AVOID CONSTANT FIRING OF SCREEN DETECTION BY BROWSERS
	// http://stackoverflow.com/questions/5489946/jquery-how-to-wait-for-the-end-of-resize-event-and-only-then-perform-an-ac
	window.onresize = function(){
		clearTimeout(do_define_what_screen_is);
		do_define_what_screen_is = setTimeout(define_what_screen_is, 300);
	};	
	// - EOF - WE USE THIS FOR CONDITIONAL LOADING OF CLASSES AND/OR SCRIPTS ACCORDING TO THE VIEWPORT SIZE.