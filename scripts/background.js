chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	switch(request.cmd){
	case "doAuthorize":doAuthorize(sendResponse);break;
	case "getAuthorize":getAuthorize(sendResponse);break;
	case "signOut":signOut(sendResponse);break;
	}
	return true;
  });
  
  
  function getAuthorize(sendResponse){
	chrome.identity.getAuthToken({interactive: true}, function(token) {
	console.log('got the token', token);
	chrome.storage.local.set({getToken: token}, function() {
	console.log(token);
	sendResponse(token)
	});
})
   
}
  
function signOut(sendResponse){
	chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
	let url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
	window.fetch(url);
	chrome.identity.removeCachedAuthToken({token: token}, function (){  
	console.log("signed out")
	chrome.storage.local.remove(["getToken"],function(){
	let error = chrome.runtime.lastError;
	if (error) {
		console.error(error);
		}
	})
  });
})
   sendResponse();
}
  function doAuthorize(sendResponse){
	  chrome.identity.getAuthToken(
		{'interactive': true},
		function(token){
			console.log('this is the token: ', token);
			
	});

}
  
  



