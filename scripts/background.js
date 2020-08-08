let manifestData = chrome.runtime.getManifest();
let authorizationObject = {
	client_id: manifestData.oauth2.client_id,
	immediate: true,
	scope: manifestData.oauth2.scopes.join(', ')
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch(request.cmd){
		case "doAuthorize":doAuthorize(sendResponse);break;
		case "getAuthorize":getAuthorize(sendResponse);break;
        case "signOut":signOut(sendResponse);break;
    }
    return true;
});


function getAuthorize(sendResponse){
	chrome.identity.getAuthToken({'interactive': true}, function(token) {
		console.log('user token: ' + token);
		let isSingedIn = false;
		if(token){
			isSingedIn = true;
			chrome.storage.local.set({tokens: token}, function() {
				console.log(token);
			  });	
			
		}
	 
	});
	sendResponse();
}

function signOut(sendResponse){
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        let url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
        window.fetch(url);
        chrome.identity.removeCachedAuthToken({token: token}, function (){  
            console.log("signed out")
            chrome.storage.local.remove(["tokens"],function(){
                var error = chrome.runtime.lastError;
                   if (error) {
                       console.error(error);
                   }
               })
		});
	})
	sendResponse();
}

