$('document').ready(function () {
    console.log("Document ready!");
    var utente = JSON.parse(localStorage.getItem("utente"))
    var settimana = new Date().getTime() + (60 * 60 * 1000 * 168);
    var mese = new Date().getTime() + (60 * 60 * 1000 * 720);
    var now = new Date().getTime();
    var guadagniMensili =0, guadagniSettimanali =0, guadagniMensiliAcquisto =0, guadagniMensiliNoleggio =0
    console.log(utente.vendite);

    if( JSON.parse(localStorage.getItem("utente")) != null || JSON.parse(localStorage.getItem("utente")) != undefined){
        utente.vendite.forEach(element => {
            dataVendita =  new Date(element.date).getTime()
    
            if(dataVendita<mese){
                guadagniMensili += parseInt(element.price)
    
                if(element.type=="noleggio"){
                    guadagniMensiliNoleggio += parseInt(element.price)
                }else{
                    guadagniMensiliAcquisto += parseInt(element.price)
                }
            }
    
            if(dataVendita<settimana){
                guadagniSettimanali += parseInt(element.price)
            }
        });
    }


    console.log("Guadagni settimanali: " + guadagniSettimanali/100);
    console.log("Guadagni mensili: " + guadagniMensili/100);
    console.log("Guadagni mensili acquisto: " + guadagniMensiliAcquisto/100);
    console.log("Guadagni mensili noleggio: " + guadagniMensiliNoleggio/100);

    $('#incassiSettimanali').append(guadagniSettimanali/100)
    $('#incassiMensili').append(guadagniMensili/100)
    $('#incassiMensiliAcquisto').append(guadagniMensiliAcquisto/100)
    $('#incassiMensiliNoleggio').append(guadagniMensiliNoleggio/100)
    
})