data = JSON.parse(localStorage["utente"])

$('document').ready(function () {
    console.log("Document ready!");
    console.log("Local storage: ");
    console.log(JSON.parse(localStorage["utente"]));


    document.getElementById("profileName").innerHTML = data.name;
    document.getElementById("profileLastname").innerHTML = data.lastname;
    document.getElementById("profileEmail").innerHTML = data.email;
    document.getElementById("profileEmail").innerHTML = data.email;
    document.getElementById("profileShopName").innerHTML = data.shopName;
    document.getElementById("profilePIVA").innerHTML = data.partitiaIVA;



})

function modificaNome() {
    var newNome = prompt("Please enter your name");
    if (newNome != null || newNome == "" || newNome == "") {
        document.getElementById("profileName").innerHTML = newNome

        var data = JSON.parse(localStorage["utente"])
        data.name = newNome
        localStorage.setItem('utente', JSON.stringify(data));

    }  
}

//TODO: Non far modificare campo quando è nullo o withespace
function modificaCognome() {
    var newCognome = prompt("Please enter your name");
    if (newCognome != null || newCognome == "" || newCognome == "") {
        document.getElementById("profileLastname").innerHTML = newCognome

        var data = JSON.parse(localStorage["utente"])
        data.lastname = newCognome
        localStorage.setItem('utente', JSON.stringify(data));

    }  
}

function deleteProfile(){
    console.log("Da impelmentare canellea proiflo");
}