let data ;
let numero=0;


getTabella();


function getTabella(){
$.ajax ({
    method:"GET",
    url:"http://localhost:8080/employees"
})
.done(function(msg){
    console.log(msg['_embedded']['employees']);
    data = msg['_embedded']['employees'];
    creaTabella();
})
}


function creaTabella() {
    let table = "";
    $.each(data, function (chiave, valore) {
        table = table + "<tr>";
        table = table + "<td>" + valore.id + "</td>";
        table = table + "<td>" + valore.firstName + "</td>";
        table = table + "<td>" + valore.lastName + "</td>";
        table = table + "<td>" + valore.gender + "</td>";
        table = table + "</tr>"
    });

    $("#tbody").append(table);
}

//$(document).ready(function () { creaTabella(); });

function aggiungi() {

    let dato1=prompt("Inserisci nome");
    let dato2=prompt("Inserisci cognome");
    let dato3=prompt("Inserisci sesso");
    let dati = {
        firstName: dato1,
        lastName: dato2,
        birthDate: "",
        hireDate: "",
        gender: dato3,
      };

    $.ajax ({
        method:"POST",
        url:"http://localhost:8080/employees",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(dati),

  success: function(data, textStatus, jXHR) {
     console.log("Operazione riuscita", data, textStatus, jXHR);
     svuotaTabella();
     getTabella();
  },
  error: function(jqXHR, textStatus, errorThrown) {
     console.log("Operazione fallita", jqXHR, textStatus, errorThrown);  
  }
})
   


}

function rimuovi() {
     let id=prompt("Inserisci id del dipendente da eliminare")


    $.ajax({
        url: "http://localhost:8080/employees/"+id,
        type: 'DELETE',
        success: function(data, textStatus, jXHR) {
            console.log("Operazione riuscita", data, textStatus, jXHR);
            svuotaTabella();
            getTabella();
           window.location.reload();
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log("Operazione fallita", jqXHR, textStatus, errorThrown);  
         }
      });
    

}
function modifica() {
let identifica=prompt("inserisci l'id utente da modificare");
let dato1=prompt("Inserisci nome");
let dato2=prompt("Inserisci cognome");
let dato3=prompt("Inserisci sesso");
let dati = {
    firstName: dato1,
    lastName: dato2,
    birthDate: "",
    hireDate: "",
    gender: dato3,
  };

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/employees/"+identifica,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(dati),
        success: function(data, textStatus, jXHR) {
            console.log("Operazione riuscita", data, textStatus, jXHR);
            svuotaTabella();
            getTabella();
           window.location.reload();
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log("Operazione fallita", jqXHR, textStatus, errorThrown);  
         }
      });
   

}




function svuotaTabella() {
    $("#prova tr").remove();

}

function restituisciPagina(){
    $.ajax ({
        method:"GET",
        url:"http://localhost:8080/employees"
    })
    .done(function(msg){
        console.log(msg['_page'])
        data = msg['page'];
        JSON.stringify(data);
      
    })
    return data;
}


function primaPagina(){

}
function prossimaPagina(){
    $.ajax ({
        method:"GET",
        url:"http://localhost:8080/employees"
    })
    .done(function(msg){
        console.log(msg['page']);
        data = msg['page'];
        console.log(data);
    })
}
function precedentePagina(){
    $.ajax ({
        method:"GET",
        url:"http://localhost:8080/employees"
    })
    .done(function(msg){
        console.log(msg['_links']['previous']);
        data = msg['_links'][''];
        
    })
}
function ultimaPagina(){

}