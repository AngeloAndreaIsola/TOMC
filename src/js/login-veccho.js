$(document).ready(function() { 
	(function () {
		'use strict'
	
		var objUser = [{
				"type": "utente",
				"name": "Mario",
				"lastname":"Rossi",
				"email": "mario.rossi@gmail.com",
				"password": "1234"
			},
			{
				"type": "negozio",
				"name": "Andrea",
				"lastname":"Bianchi",
				"email": "andrea.bianchi@gmail.com",
				"password": "1234"
			},
			{
				"type": "utente",
				"name": "Andrea",
				"lastname": "Neri",
				"email": "andrea.neri@gmail.com",
				"password": "1234"
			},
			{
				"type": "utente",
				"name": "Andrea",
				"lastname": "Isola",
				"email": "andrea.isola@me.com",
				"password": "1234"
			},
		]
	
		var obj = [
			{
				email: "andrea.isola@me.com",
				password: "1234"
			}
		]
	
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.querySelectorAll('.needs-validation')
	
		// Loop over them and prevent submission
		Array.prototype.slice.call(forms)
			.forEach(function (form) {
				form.addEventListener('submit', function (event) {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
					}
	
					//login
					//var name = document.getElementById("name").value
					var email = document.getElementById("email").value
					var password = document.getElementById("password").value
	
					//console.log(name, password);
	
					//window.location.href = "./profile_user.html";
	
					/*
					var jsonData = JSON.parse(objUser);
					for (var i = 0; i < jsonData.length; i++) {
						var storedEmail = jsonData.email[i];
						var storedPassword = jsonData.password[i];
	
						if (storedEmail == email && storedPassword== password){
							form.classList.add('was-validated')
	
						}else{
	
						}
					}
					*/
					auth()
	
	
	
				}, false)
			})
	})()
	
	function auth() {
		var obj = [
			{
				email: "andrea.isola@me.com",
				password: "1234"
			}
		]
	
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
	
	
		//var jsonData = JSON.parse(objUser);
		var jsonData = obj;
		for (var i = 0; i < jsonData.length; i++) {
			if (email === jsonData[i].email && password === jsonData[i].password) {
				//form.classList.add('was-validated')
				console.log("Valid information");
				//window.location.replace("./home_user.html");
				// alert("You Are a ADMIN");
				return;
	
			} else {
				console.log("Invalid information");
				return;
			}
		}
	}

		
})