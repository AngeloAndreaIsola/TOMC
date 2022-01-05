var jsonData

window.onload = function () {
	$('#errorCredentials').hide()

	if (localStorage.getItem('data') != null) {
		jsonData = JSON.parse(localStorage["data"])
		console.log("Utenti registrati:");
		console.log(jsonData);
	} else {
		console.log("Primo avvio, cario json.");
		getJson()
	}
};

function _form_error_aria(validator) {
	console.log(validator.target.elements[0]);
}

function auth() {

	var email = document.getElementById("emailLogin").value;
	var password = document.getElementById("passwordLogin").value;

	//var jsonData = JSON.parse(data);
	for (var i = 0; i < jsonData.length; i++) {
		if (email == jsonData[i].email && password == jsonData[i].password) {
			console.log("Credenziali corrette");
			localStorage.setItem('utente', JSON.stringify(jsonData[i]));

			if (jsonData[i].type == 'utente') {
				window.location.replace("./user_home.html");
				return
			} else if (jsonData[i].type == 'shop') {
				window.location.replace("./home_shop.html");
				return
			}

		}
	}
	console.log("credenziali errate");
	alert("Credenziali errate")
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