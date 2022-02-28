let data ;
let numero=0;
let nextid=10021;

$.ajax ({
    method:"GET",
    url:"http://localhost:8080/employees"
})
.done(function(msg){
    console.log(msg['_embedded']['employees']);
    data = msg['_embedded']['employees'];
    creaTabella();
})

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
    $.ajax ({
        method:"POST",
        url:"http://localhost:8080/employees",
        contentType: "application/json; charset=utf-8",
        data:{ 

                 "id" : nextid,
                "firstName": dato1,
                "lastName": dato2,
                "gender": dato3,
                
        },
  success: function(data, textStatus, jXHR) {
     console.log("Operazione riuscita", data, textStatus, jXHR);
  },
  error: function(jqXHR, textStatus, errorThrown) {
     console.log("Operazione fallita", jqXHR, textStatus, errorThrown);  
  }
})
   nextid++; 
creaTabella();

}

function rimuovi() {
    let identifica = prompt("Inserisci id della riga da rimuovere");
    let table = document.getElementById("prova");




    if (ricercaInCol(1, identifica) < 1) {
        alert("Nessun elemento possiede questo id ")
    }else{
        table.deleteRow(ricercaInCol(1, identifica));
    }



}
function modifica() {
    let table = document.getElementById("prova");
    let nome=prompt("Inserisci id della riga da modificare");
   
    let selectedCell = selectedRow.cells [targetCell-1];
    selectedCell.innerHTML = fillContents;
     
    $("#tbody td").replaceWith("<td>macaco</td>");
    


}

function ricercaInCol(colonna, identifica) {


    let table = document.getElementById("prova");
    let n_colonne = table.getElementsByTagName('th').length;
    let celle = table.getElementsByTagName('td');
    let val = -1;
    numero++;

    for (var j = (colonna - 1); j < celle.length; j = (j + n_colonne)) {


        if (celle[j].innerHTML == identifica) {
            
            val=+j;
            break;
          
        }
    alert(j);
    }
    
    if (numero==1){
   val=4;
    }else{
   val=(val/4)+1+num;
    }
   
   
    return val;

}
