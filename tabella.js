let data ;
let nextid = 10006;

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
    let table = document.getElementById("prova");
    let tbody = table.getElementsByTagName('tbody')[0];
    let colonne = table.getElementsByTagName('th').length;
    let tr = document.createElement('tr');


    for (let i = 0; i < colonne; i++) {
        
            let td = document.createElement('td');
            let tx = document.createTextNode(prompt("Inserisci testo per cella " + (i + 1), ""));

            td.appendChild(tx);
            tr.appendChild(td);
        
    }
  
    tbody.appendChild(tr);
  
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


    for (var j = (colonna - 1); j < celle.length; j = (j + n_colonne)) {


        if (celle[j].innerHTML == identifica) {
            
            val=+j;
            break;
          
        }

    }
   
   val=(val/4)+1;
  
   
   
    return val;

}
