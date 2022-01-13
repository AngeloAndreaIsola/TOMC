data = JSON.parse(localStorage["utente"])
var alphaExp = /^[a-zA-Z]+ [a-zA-Z]+$/;

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: ");
    console.log(JSON.parse(localStorage["utente"]));


    document.getElementById("profileName").innerHTML = data.name;
    document.getElementById("profileLastname").innerHTML = data.lastname;
    document.getElementById("profileEmail").innerHTML = data.email;
    document.getElementById("profileShopName").innerHTML = data.shopName;
    document.getElementById("profilePIVA").innerHTML = data.partitaIVA;
    document.getElementById("cellulare").innerHTML = data.numero;
    document.getElementById("indirizzo").innerHTML = data.indirizzo + ", " + data.zip + ", " + data.provincia
    console.log(data.indirizzo);
    console.log(data.provincia);
    console.log(data.zip);

    document.getElementById("numeroCarta").innerHTML = data.dettagliPAgamento.numeroCarta;
    document.getElementById("Intestatario").innerHTML = data.dettagliPAgamento.nomeCarta;
    document.getElementById("cvv").innerHTML = data.dettagliPAgamento.cvv;
    document.getElementById("expM").innerHTML = data.dettagliPAgamento.expM;
    document.getElementById("expA").innerHTML = data.dettagliPAgamento.expY;

})

function modificaNome() {
    var newNome = prompt("Nuovo nome: ");
    if (newNome.match(/^[a-z ,.'-]+$/i)) {
        document.getElementById("profileName").innerHTML = newNome

        //salva cambiamento per utente
        var data = JSON.parse(localStorage["utente"])
        data.name = newNome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));
    } else {
        alert("Nome non valido")
    }
}

//TODO: Non far modificare campo quando è nullo o withespace
function modificaCognome() {
    var newCognome = prompt("Nuovo cognome: ");
    if (newCognome.match(/^[a-z ,.'-]+$/i)) {
        document.getElementById("profileLastname").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.lastname = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));
    } else {
        alert("Cognome non valido")
    }
}

function modificaNomeNegozio() {
    var newNome = prompt("Nuovo nome negozio: ");
    d = JSON.parse(localStorage.getItem("data"));

    for (i = 0; i < d.length; i++) {
        if (d[i].type == "shop" && d[i].shopName == newNome) {
            alert("Nome negozio già usato")
            return
        }
    }



    if (newNome !=null & newNome.length>0) {
        document.getElementById("profileShopName").innerHTML = newNome
        
        //salva cambiamento per utente
        var data = JSON.parse(localStorage["utente"])
        data.shopName = newNome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));
    } else {
        alert("Nome negozio non valido")
    }
}

function modificaNumeroCarta() {
    var newCognome = prompt("Nuovo numero carta: ");
    if (newCognome.match("^\s*-?[0-9]{16,17}\s*$")) {
        document.getElementById("numeroCarta").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.numeroCarta = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("Numero non valido")
    }
}

function modificaIntestatario() {
    var newCognome = prompt("Nuovo nome intestatario: ");
    if (newCognome.match(alphaExp)) {
        document.getElementById("Intestatario").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.nomeCarta = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("Intestatario non valido")
    }
}

function modificaMese() {
    var newCognome = prompt("Nuovo mese di scadenza (MM): ");
    if (newCognome.match(/^(0[1-9]|1[012])$/)) {
        document.getElementById("expM").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.expM = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("Mese non valido")
    }
}

function modificaAnno() {
    var newCognome = prompt("Nuovo anno di scadenza (YY): ");
    if (parseInt(newCognome) > 21) {
        document.getElementById("expA").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.expY = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("Anno non valido")
    }
}

function modificaCvv() {
    var newCognome = prompt("Nuovo cvv: ");
    if (newCognome.match("^\s*-?[0-9]{3,5}\s*$")) {
        document.getElementById("cvv").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.dettagliPAgamento.cvv = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("CVV non valido")
    }
}

function modificaNumero() {
    var newCognome = prompt("Nuovo numero di telefono: ");
    if (newCognome.match("^\s*-?[0-9]{10,11}\s*$")) {
        document.getElementById("cellulare").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.cellulare = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

        //salva cambiamento in data
        d = JSON.parse(localStorage.getItem("data"));
        for (i = 0; i < d.length; i++) {
            if (d[i].email == data.email) {
                d[i] = data
            }
        }
        localStorage.setItem("data", JSON.stringify(d));

    } else {
        alert("Numero di telefono non valido")
    }
}

function modificaCarta() {
    var nomeCarta = document.getElementById("cc-name").value;
    var numeroCarta = document.getElementById("cc-number").value;
    var expM = document.getElementById("cc-expiration-M").value;
    var expY = document.getElementById("cc-expiration-Y").value;
    var cvv = document.getElementById("cc-cvv").value;

    var utente = JSON.parse(localStorage["utente"])
    var data = JSON.parse(localStorage.getItem("data"));

    var dataScadenza = new Date(parseInt(expY), parseInt(expM) - 1, 0)
    var now = Date.now()
    if (dataScadenza < now) {
        validCard = false
        alert("Carta scaduta")
        $('#cardModal').modal('hide');
    } else if (numeroCarta.length != 16) {
        validCard = false
        alert("Carta non valida")
        $('#cardModal').modal('hide');
    } else {
        $('#cardModal').modal('hide');

        utente.dettagliPAgamento.cvv = cvv
        utente.dettagliPAgamento.expM = expM
        utente.dettagliPAgamento.expY = expY
        utente.dettagliPAgamento.nomeCarta = nomeCarta
        utente.dettagliPAgamento.numeroCarta = numeroCarta

        $("#numeroCarta").text(numeroCarta)
        $("#Intestatario").text(nomeCarta)
        $("#expM").text(expM)
        $("#expA").text(expY)
        $("#cvv").text(cvv)

        for (i = 0; i < data.length; i++) {
            if (data[i].email == utente.email) {
                data[i] = utente
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem('utente', JSON.stringify(utente));
    }

}

function modificaIndirizzo() {
    var utente = JSON.parse(localStorage["utente"])
    console.log($("#via").val());
    console.log($("#zip").val());
    console.log($("#formIndirizzo").val());

    if ($("#via").val() != null && $("#formIndirizzo").val() != null && $("#zip").val() != null) {
        data.indirizzo = $("#via").val()
        data.provincia = $("#formIndirizzo").val()
        data.zip = $("#zip").val()

        //aggiorna display indirizzo
        document.getElementById("indirizzo").innerHTML = data.indirizzo + ", " + data.zip + ", " + data.provincia

        //salva nel localstorage
        for (i = 0; i < data.length; i++) {
            if (data[i].email == utente.email) {
                data[i] = utente
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
        localStorage.setItem('utente', JSON.stringify(utente));
        $('#exampleModal').modal('hide');

    } else {
        $('#exampleModal').modal('hide');
        alert("Indirizzo non valido")
    }



}

function deleteProfile() {
    var data = JSON.parse(localStorage["data"])
    var utente = JSON.parse(localStorage["utente"])
    var newData = []

    for (var i = 0; i < data.length; i++) {
        if (data[i].email != utente.email) {
            newData.push(data[i])
        }
    }

    localStorage.setItem('data', JSON.stringify(newData));
    localStorage.removeItem("utente");
    console.log("Profilo cancellato");
    window.location.replace("./login.html");
}