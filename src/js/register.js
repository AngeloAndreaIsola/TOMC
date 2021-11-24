var obj = [{
    type: "utente",
    name: "Andrea",
    lastname: "Isola",
    email: "andrea.isola@me.com",
    password: "1234"
}]

function registerUser() {

    getJson()

    var registerNome = document.getElementById("nomeRegister").value;
    var registerCognome = document.getElementById("cognomeRegister").value;
    var registerEmail = document.getElementById("emailRegister").value;
    var registerPassword = document.getElementById("passwordRegister").value;

    newUser = {
        type: "utente",
        name: registerNome,
        lastname: registerCognome,
        email: registerEmail,
        password: registerPassword
    }

    //Controllo su input
    for (var i = 0; i < obj.length; i++) {
        // check if new username is equal to any already created usernames
        if (registerEmail == obj[i].email) {
            // alert user that the username is take
            alert('That email is alreat in user, please choose another')
            // stop the statement if result is found true
            break
            // check if new password is 8 characters or more
        } else if (registerPassword.length < 3) {
            // alert user that the password is to short
            alert('That is to short, include 3 or more characters')
            // stop the statement if result is found true
            break
        }
    }

    //Salva utente e display pagina inziale
    obj.push(newUser)
    console.log(obj);

    var type = document.getElementById("registerType");
    if (type == 'utente') {
        window.location.replace("./home_user.html");
    } else {
        window.location.replace("./home_shop.html");
    }

}

//Mostra o nasconde campi per negoziante e cambia tipo di untete salvato
function togleRegisterNegozio() {
    console.log("Click su togle");
    var type = document.getElementById("registerType");
    var registerNegoziate = document.getElementById("registerNegoziante");
    var registerSelectType = document.getElementById("registerSelectType")


    if (type.value == 'utente') {
        type.value = "negoziante"
        registerNegoziate.style.display = "inline"
        registerSelectType.firstChild.data = "Sei un utente standard?"
    } else {
        type.value = "utente"
        registerNegoziate.style.display = "none"
        registerSelectType.firstChild.data = "Voui aprire il tuo negozio online?"
    }
}

 
function init(json){
	localStorage.setItem('data', json);
}

function getJson(){
	$.getJSON("js/data.json", function(json) {
		// this will show the info it in firebug console
	   console.log(json);
	   jsonData = json;
	   init(json);
   });
}


 //FIXME: Primo click non fuzniona
 //TODO: Salvare nuovo utente in local storage