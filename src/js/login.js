var jsonData

window.onload = function () {
	if (localStorage.getItem('data') != null) {
		jsonData = JSON.parse(localStorage["data"])
		console.log("Utenti registrati:");
		console.log(jsonData);
	} else {
		console.log("Primo avvio, cario json.");
		getJson()
	}
};

function auth() {
	var email = document.getElementById("emailLogin").value;
	var password = document.getElementById("passwordLogin").value;

	//var jsonData = JSON.parse(data);
	for (var i = 0; i < jsonData.length; i++) {
		console.log(jsonData[i].email);
		console.log(jsonData[i].password);

		if (email == jsonData[i].email && password == jsonData[i].password) {
			console.log("Credenziali corrette");
			localStorage.setItem('utente', JSON.stringify(jsonData[i]));

			if (jsonData[i].type == 'utente') {
				window.location.replace("./home_user.html");
				return;
			} else if (jsonData[i].type == 'shop') {
				window.location.replace("./home_shop.html");
				return;
			}


		} else {
			console.log("Credenziali non corrette");
		}
	}
}

function getJson() {
	$.getJSON("data/data.json", function (json) {
		// this will show the info it in firebug console
		console.log("Caricato utenti pre impostati:");
		console.log(json);
		jsonData = json;
		init(json);
	});
}

function init(json) {
	localStorage.setItem('data', JSON.stringify(json));
}