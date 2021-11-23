angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perrrrrrry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})








// CB FRAMEWORK 

.factory('appDataFactory', function() {
	
	// console.log('mainarrayData ->');
	// console.log(mainarrayData);
	
	
	// REST-LIKE FUNCTIONS
    return {
      // all: function() {
      //   return friends;
      // },
      getObject: function(objectName) {
        // Simple index lookup
        return mainarrayData[objectName];
      },
	  
      getObjectByID: function(objectName, objectID) {
        // Simple index lookup
        return mainarrayData[objectName][objectID];
      },
	  
	  getChildren: function(siblingObject,siblingIdentifier){
  		mother = [];
		for (sibling in siblingObject) // ASSUME parsedColumn IS ALSO AN OBJECT
		{
			mother.push(this.getObjectByID(siblingIdentifier,sibling));
		}
  		return mother;
	  }
	  
    }
}) // - EOF - .factory('appDataFactory', function() {

	
	
	
	
	
	
	
	
	
	
.factory('stringsFactory', function($filter) {
	
	// console.log('mainarrayData FROM STRINGSFACTORY ->');
	// console.log(mainarrayData);
	
	
 	var myRegEx = /\[(.*?)\]/g; // DON'T FORGET THE FINAL "g", OR YOU'LL GET STUCK IN AN INFINITE LOOP
 	var myRegExForStringID = /(.*?)String_ID/g; // DON'T FORGET THE FINAL "g", OR YOU'LL GET STUCK IN AN INFINITE LOOP
	
	
	// REST-LIKE FUNCTIONS
    return {

	extractShortCodes: function(string, regex, index) {
	    index || (index = 1); // default to the first capturing group
	     matches = [];
	    // var match;
	    while (match = regex.exec(string)) {
	        matches.push(match[index]);
	    }
	    return matches;
	}, // - EOF - extractShortCodes
	  
	  
	retrieveAndInjectStringNames: function (passedObject,Strings)
	{
		
		newObject = {};

		for (parsedSubObject in passedObject) // ASSUME parsedColumn IS ALSO AN OBJECT
		{
			parsedColumn_id = parsedSubObject;

			newObject[parsedColumn_id] = {};

			for (parsedColumn in passedObject[parsedSubObject]) // ARRAY COLUMNS
			{
				valueOfParsedColumn = passedObject[parsedSubObject][parsedColumn];
			 	typeOfParsedColumn = typeof(passedObject[parsedSubObject][parsedColumn]);
				newObject[parsedColumn_id] = passedObject[parsedSubObject];

				if (valueOfParsedColumn !== null)
				{
					if (typeOfParsedColumn != 'object') 
					{
						testForStringID = this.extractShortCodes(parsedColumn, myRegExForStringID, 1);

						if (testForStringID.length > 0) 
						{
							columnName = testForStringID[0];
							newObject[parsedColumn_id][columnName] = '';

							if(typeof(Strings[valueOfParsedColumn]) != "undefined")
							{
								passedObject[parsedSubObject][columnName] = Strings[valueOfParsedColumn]['StringName'];
								newObject[parsedColumn_id][columnName] = Strings[valueOfParsedColumn]['StringName'];
							}
							else
							{
								passedObject[parsedSubObject][columnName] = 'StringName_is_Empty';
								newObject[parsedColumn_id][columnName] = 'StringName_is_Empty';
							}
							
							// TODO: WE SHOULD NOT DO THIS TEST HERE, BECAUSE WE ALSO USE $translate AS FILTER IN THE TEMPLATES
							// WE CAN PROBABLY TARGET THE STRING DIRECTLY INTO THE [lang].js FILE
								translationTest = $filter('translate')(newObject[parsedColumn_id][columnName]);
								
								if (translationTest == "") {
									passedObject[parsedSubObject][columnName] = 'StringName_is_Empty1';
									newObject[parsedColumn_id][columnName] = testForStringID[0];
								}
						}
						
						
						// MAKE SURE Order IS A NUMBER, OTHERWISE ng-repeat's orderBy DOES NOT FUNCTION PROPERLY (ORDERS AS STRINGS : 1, 10, ETC.)
						if (parsedColumn == "Order") {
							newObject[parsedColumn_id]["Order"] = Number(passedObject[parsedSubObject]["Order"]);
						}
						
					}
				}
			}
		}
		
		return(newObject);
	},					
	// ------- EOF - function retrieveAndInjectStringNames(passedObject,Strings)
	  
	  
    } // - EOF - return
}) // - EOF - 	.factory('stringsFactory', function() {














.factory("RESTIntranet", ["$http", "$rootScope", "$translate", function($http, $rootScope, $translate) {

			return {
			    saveContent : function(htmlcontent,stringid,stringname) {
		
				currentlang = $translate.use();
		
		
				customerIntranetFolder = "castle_intranet/"; // TODO : THIS SHOULD NOT BE HARDCODED, IT SHOULD BE A KEY/VALUE PAIR IN mainarrayData.
				IntranetController = "strings/";
				RESTaction = "editAPI/";
		
				RESTurl = window.location.protocol + "//" + window.location.host + "/"+customerIntranetFolder+IntranetController+RESTaction;
				
			 	var regExForLocationHost = /localhost/g; // DON'T FORGET THE FINAL "g", OR YOU'LL GET STUCK IN AN INFINITE LOOP
			    match = regExForLocationHost.exec(window.location.host);
				
				if(!match)
				{
					// console.log('did not match ->');
				}
				else
				{
					localhostPort = "8888"; // MAMP DEFAULT (MAC OS X). WE HAVE TO CHANGE THIS BECAUSE
					
					RESTurl = window.location.protocol + "//localhost:"+localhostPort+"/"+customerIntranetFolder+IntranetController+RESTaction;
				}
				
				
				
	
			dataToSend = {
				stringcontent: htmlcontent,
				id: stringid,
				lang: currentlang,
				screenresolution: screen_is // GLOBAL VAR - TODO: MAKE IT REALTIME (LIVE) IF WINDOW IS RESIZED. CURRENTLY WORKS ONLY IF PAGE IS RELOADED (VAR IS GLOBAL VANILLA JS)
				};
	
			// $http({
			// url: RESTurl ,
			// method: "POST",
			// data:  dataToSend,
			// headers: {'Content-Type': 'text/plain'}
			// })
			// .then(function(response) {
			//     console.log(response);
			//     // $location.url('/employee');
			// }, 
			// function(response) { // optional
			//     // failed
			//     console.log(response);
			// };
	
	
				$http.post(RESTurl, dataToSend)
		          .success(function(returnedData) {
					  
		            console.log('--->@{371} returnedData : ');
		            console.log(returnedData);
					
					
					// TODO: IF RESPONSE (returnedData) CONTAINS '<DOCTYPE!>', IT MEANS WE ARE REDIRECTED TO A WEBPAGE INSTEAD OF THE REST API POINT, SO WE CAN ASSUME USER IS NOT LOGGED ON THE INTRANET.
					// THEREFORE WE HAVE TO DISPLAY THE USER A WARNING THAT HIS CHANGES HAVE NOT BEEN TAKEN INTO ACCOUNT, AND THAT HE MUST LOG AGAIN INTO THE INTRANET.
					// IDEALLY, WE HAVE TO SET A TIMER (COMPARING IT TO A "SESSION" START IN LOCALSTORAGE ?), SO WE CAN WARN THE USER BEFORE THE SESSION (PHP) ENDS ON THE INTRANET. OR SET THE CODEIGNITER SESSION TO AN INFINITE DURATION, OR RATHER, THE BROWSER'S SESSION DURATION.
					
		          });	
	
			    } // saveContent
	
			  	}; // return
	
}])





	

// - EOF - CB FRAMEWORK 






/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})





