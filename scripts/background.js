chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	switch(request.cmd){
	case "doAuthorize":doAuthorize(sendResponse);break;
	case "getAuthorize":getAuthorize(sendResponse);break;
	case "signOut":signOut(sendResponse);break;
	case "addval":addValue(sendResponse);break;
	}
	return true;
  });
  

const API_KEY = "AIzaSyAY1cpbmg0W0eNcteAiuinALFue--hKM0I";
const CLIENT_ID = "125271549057-gqgbtjucihnisg32tuatrpd9dqnm8m5s.apps.googleusercontent.com";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
 let params = {
  "range":"Sheet1!A:C",
  "majorDimension": "ROWS",
  "values": [
    
   ],
 }

let SPREADSHEET_ID;
let SPREADSHEET_TAB_NAME;
let index;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.message === 'getval'){
  console.log(request.val)
  console.log(request.val2)
  SPREADSHEET_ID = request.val;
  SPREADSHEET_TAB_NAME = request.val2;
  }
 
  if(request.message==='getvalue'){
  console.log(request.value1);
  console.log(request.value2)
  let text1 = request.value1;
  let text2 = request.value2;
  let date = new Date().toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"});
  
chrome.storage.local.get(['getToken'], function(result) {
  let access_token = result.getToken;
  if(access_token){
  let array = [];
  array.push(date, text1, text2)
  params.values.push(array);
 
  let init = {
    method: 'PUT',
    async: true,
    body:JSON.stringify(params),
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    },
      'contentType': 'json',
    };
  fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SPREADSHEET_TAB_NAME}!A:C?valueInputOption=USER_ENTERED`,
      init)
     .then((response) => console.log(response))
     }
       })
          }


    if(request.removeVal === 'delete'){
      let index = request.ind;
      chrome.storage.local.get(['getToken'], function(result) {
        let access_token = result.getToken;
        if(access_token){
          
        let request = {
          method: 'GET',
          async: true,
          headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json'
            },
            'contentType': 'json',
            };
        fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SPREADSHEET_TAB_NAME}!A:C`,
            request)
            .then((response) => response.json())
            .then(function(data) {
              data.values.pop()
              console.log(data)
            })
              }
            })
          }
})

function doAuthorize(sendResponse){
	chrome.identity.getAuthToken(
		{'interactive': true},
		function(token){
      console.log('this is the token: ', token);
      chrome.storage.local.set({getToken: token}, function() {
        sendResponse(token)
    });
  });
}











function signOut(sendResponse){
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
      let url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
      window.fetch(url);
      chrome.identity.removeCachedAuthToken({token: token}, function (){  
    console.log("signed out")
    chrome.storage.local.remove(["getToken"],function(){
      var error = chrome.runtime.lastError;
         if (error) {
             console.error(error);
         }
     })
          });
})
sendResponse();
}


