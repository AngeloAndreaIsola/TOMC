var type = 'utente'

//TODO: verificare boostrap e jquery in html
//TODO: Aggiungere uid ad utente
function registerUser() {
    var registerNome = document.getElementById("nomeRegister").value;
    var registerCognome = document.getElementById("cognomeRegister").value;
    var registerEmail = document.getElementById("emailRegister").value;
    var registerPassword = document.getElementById("passwordRegister").value;

    data = JSON.parse(localStorage["data"])
    var newUser = {
        email: "",
        lastname: "",
        name: "",
        password: "",
        type: "",
        filmNoleggiati: [],
        fimlComprati: [],
        history: []
    }

    var newShop = {
        type: "",
        email: "",
        lastname: "",
        name: "",
        password: "",
        palinsesto: [],
        vendite: [],
        partitaIVA: "",
        shopName: ""
    }

    //Controllo su input
    var validName = true;
    var validPsw = true;
    
    for (var i = 0; i < data.length; i++) {
        // check if new username is equal to any already created usernames
        if (registerEmail == data[i].email) {
            // alert user that the username is take
            alert('That email is alreat in user, please choose another')
            // stop the statement if result is found true
            validName = false
            break
            // check if new password is 8 characters or more
        }
    }


    if (registerPassword.length < 3) {
        // alert user that the password is to short
        alert('That is to short, include 3 or more characters')
        // stop the statement if result is found true
        validPsw = false
    }

    if (type == 'utente' && validName == true && validPsw == true) {
        newUser.email = registerEmail
        newUser.name = registerNome
        newUser.lastname = registerCognome
        newUser.password = registerPassword
        newUser.type = type

        data.push(newUser)
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('utente', JSON.stringify(newUser));
        window.location.replace("./user_home.html");
    } else if((type == 'shop' && validName == true && validPsw == true)) {
        newShop.email = registerEmail
        newShop.name = registerNome
        newShop.lastname = registerCognome
        newShop.password = registerPassword
        newShop.type = type

        data.push(newShop)
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('utente', JSON.stringify(newShop));
        window.location.replace("./home_shop.html");
    }
}

//Mostra o nasconde campi per negoziante e cambia tipo di untete salvato
function togleRegisterNegozio() {
    console.log("Click su togle");
    //var type = document.getElementById("registerType");
    var registerNegoziate = document.getElementById("registerNegoziante");
    var registerSelectType = document.getElementById("registerSelectType")


    if (type == 'utente') {
        type = "shop"
        registerNegoziate.style.display = "inline"
        registerSelectType.firstChild.data = "Sei un utente standard?"
    } else {
        type = "utente"
        registerNegoziate.style.display = "none"
        registerSelectType.firstChild.data = "Voui aprire il tuo negozio online?"
    }
}




//FIXME: Primo click non fuzniona
//TODO: Salvare nuovo utente in local storage