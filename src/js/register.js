(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();






var type = 'utente'

//TODO: verificare boostrap e jquery in html
//TODO: Aggiungere uid ad utente
function registerUser() {
    var registerNome = document.getElementById("firstName").value;
    var registerCognome = document.getElementById("lastName").value;
    var registerEmail = document.getElementById("email").value;
    var registerPassword = document.getElementById("password").value;
    

    var shopName = document.getElementById("shop").value;
    var addres  = document.getElementById("address").value;
    var prov = document.getElementById("prov").value;
    var zip = document.getElementById("zip").value;
    var piva = document.getElementById("PIVA").value;
    var numero = document.getElementById("number").value;

    var nomeCarta = document.getElementById("cc-name").value;
    var numeroCarta = document.getElementById("cc-number").value;
    var expM = document.getElementById("cc-expiration-M").value;
    var expY = document.getElementById("cc-expiration-Y").value;
    var cvv = document.getElementById("cc-cvv").value;

    data = JSON.parse(localStorage["data"])
    var newUser = {
        type: "",
        email: "",
        password: "",
        name: "",
        lastname: "",
        dettagliPAgamento:{
            cvv:"",
            expM:"",
            expY:"",
            nomeCarta:"",
            numeroCarta:""
        },
        filmNoleggiati: [],
        fimlComprati: [],
        history: []
    }

    var newShop = {
        type: "",
        shopName: "",
        email: "",
        password: "",
        name: "",
        lastname: "",
        dettagliPAgamento:{
            cvv:"",
            expM:"",
            expY:"",
            nomeCarta:"",
            numeroCarta:""
        },
        palinsesto: [],
        vendite: [],
        partitaIVA: "",
        numero:"",
        indirizzo:"",
        provincia:"",
        zip:""
    }

    //Controllo su input
    var validName = true;
    var validPsw = true;
    
    for (var i = 0; i < data.length; i++) {
        // check if new username is equal to any already created usernames
        if (registerEmail == data[i].email) {
            // alert user that the username is take
            alert('La mail è gia in uso')
            // stop the statement if result is found true
            validName = false
            break
            // check if new password is 8 characters or more
        }

        if (type=="shop" && shopName == data[i].shopName) {
            // alert user that the username is take
            alert('Il negozio è gia registrato')
            // stop the statement if result is found true
            validName = false
            break
            // check if new password is 8 characters or more
        }

        if (data[i].type=="shop" && piva == data[i].piva) {
            // alert user that the username is take
            alert('Partita IVA gia registrata')
            // stop the statement if result is found true
            validName = false
            break
            // check if new password is 8 characters or more
        }
    }


    if (registerPassword.length < 3) {
        // alert user that the password is to short
        //alert('That is to short, include 3 or more characters')
        // stop the statement if result is found true
        validPsw = false
    }

    if (type == 'utente' && validName == true && validPsw == true) {
        newUser.email = registerEmail
        newUser.name = registerNome
        newUser.lastname = registerCognome
        newUser.password = registerPassword
        newUser.type = type

        newUser.dettagliPAgamento.cvv = cvv
        newUser.dettagliPAgamento.expM= expM
        newUser.dettagliPAgamento.expY= expY
        newUser.dettagliPAgamento.nomeCarta= nomeCarta
        newUser.dettagliPAgamento.numeroCarta= numeroCarta

        data.push(newUser)
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('utente', JSON.stringify(newUser));
        window.location.replace("./user_home.html");
    } else if(validName == true && validPsw == true) {
        newShop.email = registerEmail
        newShop.name = registerNome
        newShop.lastname = registerCognome
        newShop.password = registerPassword
        newShop.type = type

        newShop.dettagliPAgamento.cvv = cvv
        newShop.dettagliPAgamento.expM= expM
        newShop.dettagliPAgamento.expY= expY
        newShop.dettagliPAgamento.nomeCarta= nomeCarta
        newShop.dettagliPAgamento.numeroCarta= numeroCarta

        newShop.partitaIVA = piva
        newShop.numero = numero
        newShop.indirizzo =  addres
        newShop.provincia = prov
        newShop.zip = zip


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
        $("#shop").attr("required", true);
        $("#address").attr("required", true);
        $("#country").attr("required", true);
        $("#zip").attr("required", true);
        $("#PIVA").attr("required", true);
        $("#number").attr("required", true);
    } else {
        type = "utente"
        registerNegoziate.style.display = "none"
        registerSelectType.firstChild.data = "Voui aprire il tuo negozio online?"
        $("#shop").removeAttr('required');
        $("#address").removeAttr('required');
        $("#country").removeAttr('required');
        $("#zip").removeAttr('required');
        $("#PIVA").removeAttr('required');
        $("#number").removeAttr('required');
    }
}




//FIXME: Primo click non fuzniona
//TODO: Salvare nuovo utente in local storage