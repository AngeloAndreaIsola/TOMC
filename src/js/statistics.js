$('document').ready(function () {
    console.log("Document ready!");
    var utente = JSON.parse(localStorage.getItem("utente"))
    var settimana = new Date().getTime() + (60 * 60 * 1000 * 168);
    var mese = new Date().getTime() + (60 * 60 * 1000 * 720);
    var now = new Date().getTime();
    var guadagniMensili =0, guadagniSettimanali =0, guadagniMensiliAcquisto =0, guadagniMensiliNoleggio =0
    console.log(utente.vendite);

    utente.vendite.forEach(element => {
        dataVendita =  new Date(element.date).getTime()

        if(dataVendita<mese){
            guadagniMensili += parseFloat(element.price)

            if(element.type=="noleggio"){
                guadagniMensiliNoleggio += parseFloat(element.price)
            }else{
                guadagniMensiliAcquisto += parseFloat(element.price)
            }
        }

        if(dataVendita<settimana){
            guadagniSettimanali += parseFloat(element.price)
        }
    });

    console.log("Guadagni settimanali: " + guadagniSettimanali);
    console.log("Guadagni mensili: " + guadagniMensili);
    console.log("Guadagni mensili acquisto: " + guadagniMensiliAcquisto);
    console.log("Guadagni mensili noleggio: " + guadagniMensiliNoleggio);

    $('#incassiSettimanali').append(guadagniSettimanali)
    $('#incassiMensili').append(guadagniMensili)
    $('#incassiMensiliAcquisto').append(guadagniMensiliAcquisto)
    $('#incassiMensiliNoleggio').append(guadagniMensiliNoleggio)
    
})