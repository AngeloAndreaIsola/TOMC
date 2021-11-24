
var jsonData

window.onload = function() {
	getJson()
  };

function auth() {
	var email = document.getElementById("emailLogin").value;
	var password = document.getElementById("passwordLogin").value;

	//var jsonData = JSON.parse(data);
	for (var i = 0; i < jsonData.length; i++) {
		if (email === jsonData[i].email && password === jsonData[i].password) {
			console.log("Credenziali corrette");
			localStorage.setItem('utente', JSON.stringify(jsonData[i]));

			if (jsonData[i].type == 'utente'){
				window.location.replace("./home_user.html");
				return;
			}else{
				window.location.replace("./home_shop.html");
				return;
			}


		} else {
			console.log("Credenziali non corrette");
			return;
		}
	}
}

function getJson(){
	$.getJSON("data/data.json", function(json) {
		// this will show the info it in firebug console
	   console.log(json);
	   jsonData = json;
	   init(json);
   });
}

function init(json){
	localStorage.setItem('data', JSON.stringify(json));
}