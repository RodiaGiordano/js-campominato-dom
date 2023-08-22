// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.


const cellContainer = document.getElementById("wrapper");
const buttonGrid = document.getElementById('button')
const difficulty = document.getElementById('difficulty')



buttonGrid.addEventListener('click', function(){ 

    cellContainer.innerHTML = ""; // pulisco la griglia

    let classEl; // variabile d'appoggio per le classi

    let max = parseInt(difficulty.value) // setto max come il value della option difficulty

    if(!max) alert('seleziona una difficoltà')   // controllo che abbia selezionato una difficoltà
    
    
    // istruzioni condizionali per settare classEl
    if(max == 100) classEl = 'box easy' 
    if(max == 81) classEl = 'box medium'
    if(max == 49) classEl = 'box hard'

    
    for(let i = 1; i <= max; i++){
        
        
        const cell = generatedGrid(cellContainer, 'div', classEl, i) // creo gli elementi ed inserisco gli attributi
       
        
    }
    
})



/**
 * modifica l'inner di un object, può avere un counter [da scartare]
 * @param {string} object l'elemento da modificare
 * @param {int} counter possibile inserire un counter
 * 
 *  */

function generatedCell (object, counter) {


    object.setAttribute('data-index', counter);
        
        
    let cellShow = object.getAttribute('data-index')
        
    object.addEventListener('click', function(){
            this.classList.add('bg-primary');
            
            this.innerText = cellShow;
            
        })
}



/**
 * Genera un object e lo appende al container, è possibile inserire le classi [da rivedere: aggiungereil for?]
 * @param {node} container il container in cui inserirlo
 * @param {string} object il tag da creare
 * @param {string} classEl defoult empty. settaggio classi
 * @param {int} counter possibile inserire un counter
 * 
 *  */


function generatedGrid (container, object, classEl, counter){
    
    let cell = document.createElement(object);    
    
    cell.className = classEl

    generatedCell (cell, counter)

    container.append(cell);
    
    return cell;
}