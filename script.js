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

    const bombNumber = 16; //il numero di bombe
    
    let max = parseInt(difficulty.value) // setto max come il value della option difficulty
    
    if(!max) alert('seleziona una difficoltà')   // controllo che abbia selezionato una difficoltà


    
    const whitelistCell = generateProgressiveArray (1, max, 1); // creo una whitelist 
    console.log("whitelistCell: " + whitelistCell)

    const listBomb = []; // creo un array in cui aggiungero i numeri bomba

    for(let i = 0; i < bombNumber; i++){
 
        const bombEl = whitelistCell.splice((randomNumber(0, (max - listBomb.length), false)), 1); // la bomba è uguale all'elemento rimosso casualmente dalla whitelist, il numero da cui lo splice inizia a contare si adatta alla lunghezza della whitelist

        console.log("genero numero casuale: " + bombEl)
        console.log("numero tolto: " + bombEl)
        
        listBomb.unshift(bombEl); //aggiungo alla lista bombe l'elemento rimosso dalal whitelist
    }
   
    console.log("lista bombe: " + listBomb)



    // istruzioni condizionali per settare classEl
    if(max == 100) classEl = 'box easy' 
    if(max == 81) classEl = 'box medium'
    if(max == 49) classEl = 'box hard'

    
    for(let i = 1; i <= max; i++){
        
        const cell = generatedGrid(cellContainer, 'div', classEl, i, listBomb) // creo gli elementi ed inserisco gli attributi
    }
})
        
       
        
    



/**
 * Genera un object e lo appende al container, è possibile inserire le classi [da rivedere: aggiungereil for?]
 * @param {node} container il container in cui inserirlo
 * @param {string} object il tag da creare
 * @param {string} classEl defoult empty. settaggio classi
 * @param {int} counter possibile inserire un counter
 * 
 *  */


function generatedGrid (container, object, classEl, counter, whitelist){
    
    let cell = document.createElement(object);    
    
    cell.className = classEl
       
    generatedCell (cell, counter, whitelist)

    container.append(cell);
    
    return cell;
}



/**
 * modifica l'inner di un object, può avere un counter [da scartare]
 * @param {string} object l'elemento da modificare
 * @param {int} counter possibile inserire un counter
 * 
 *  */

function generatedCell (object, counter, whitelist) {

    object.setAttribute('data-index', counter);
        
        
    let cellShow = object.getAttribute('data-index')
        
    object.addEventListener('click', function(){
        if(whitelist.includes(counter)){
            this.classList.add('bg-danger')
        }
            this.classList.add('bg-primary');
            
            this.innerText = cellShow;
            
        })
}



/**
 * Genera una whitelist
 * @param {int} from da dove inizia a contare
 * @param {int} to fino a dove contare
 * @param {int} step progressione del counter del ciclo
 * @returns {object} restituisce un array di int
 *  */

function generateProgressiveArray (from, to, step){
    const whitelist  = [];
 
    for(let i = from; i <= to; i += step){
       whitelist.unshift(i);
    }
 
    return whitelist;
 }
 

/**
 * funzione che genera un numero random, posso scegliere se includere l'ultimo o no
 * @param {int} min 
 * @param {int} max
 * @param {boolean} [lastIncluded=true] 
 * @returns {int} il numero randomico generato fra massimo e minimo
 *  */

function randomNumber(min, max, lastIncluded = true){
    if(lastIncluded) max++
    
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber; 
 }