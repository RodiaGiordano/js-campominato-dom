

const cellContainer = document.getElementById("wrapper");
const buttonGrid = document.getElementById('button')
const difficulty = document.getElementById('difficulty')




buttonGrid.addEventListener('click', function(){ 

    const playerScore = []; // tiene il conto delle celle buone cliccate

    cellContainer.innerHTML = ""; // pulisco la griglia
    
    let classEl; // variabile d'appoggio per le classi

    const bombNumber = 16; //il numero di bombe
    
    let max = parseInt(difficulty.value) // setto max come il value della option difficulty
    
    if(!max) alert('seleziona una difficoltà')   // controllo che abbia selezionato una difficoltà


   
    const whitelistCell = generateProgressiveArray (1, max, 1); // creo una White List 
    

    const listBomb = []; // creo un array in cui aggiungero i numeri bomba
    
    for(let i = 0; i < bombNumber; i++){ // seleziona randomicamente da whitelist e pusha in balck (tiene conto della lunghezza progressivamente minore della whitelist)
        
        const bombEl = randomNumber(0, ((max -1) - listBomb.length), true);

        listBomb.push(whitelistCell[bombEl]);

        whitelistCell.splice(bombEl, 1);
        
    }
    

    
    // istruzioni condizionali per settare classEl
    if(max == 100) classEl = 'box easy' 
    if(max == 81) classEl = 'box medium'
    if(max == 49) classEl = 'box hard'

   
 
    for(let i = 1; i <= max; i++){
       
    const cell = generatedGrid(cellContainer, 'div', classEl, i, listBomb) // creo gli elementi
    const cellShow = generatedCell(cell, i, listBomb, whitelistCell, playerScore) // inserisco gli attributi

    
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


function generatedGrid (container, object, classEl){
       
    const cell = document.createElement(object);    
    
    cell.className = classEl
    
    // const result = generatedCell (cell, counter, whitelist)
    
    container.append(cell); // inserisco l'elemento nel container

    return cell; // lo ritorno per l'altra funzione
    
}



/**
 * modifica l'inner di un object, può avere un counter [da scartare]
 * @param {string} object l'elemento da modificare
 * @param {int} counter possibile inserire un counter
 * 
 *  */

function generatedCell (object, counter, listBomb, whitelist, playerScore) {
    // let selected;
    
    object.setAttribute('id', 'unSelected') // setto un id per tutti gli object
    let lose; // variabile di appoggio per il true/false

    
    
    object.addEventListener('click', function (){
        lose = object.getAttribute('id')         
        
        if(lose){ //se lose true setto l'object con gli attributi 
            object.setAttribute('data-index', counter); 
            
            let cellShow = parseInt(object.getAttribute('data-index'))
            
            
            const selectedCell = cellShow;
            
            const pointScore = playerScore.length
            
            if(listBomb.includes(counter)){ //se la lista delle bombe contiene l'elemento selezionato

                this.classList.add('bg-danger')
                this.innerHTML = '<i class="fa-solid fa-bomb fa-2xl"></i>'     
                                
                alert('hai perso! hai totalizzato: ' + pointScore + ' punti!') // restituisco il punteggio (0)

                const lose = document.querySelectorAll('#unSelected') //prendo tutti gli object con id unSelector
                

                for(i = 0; i < lose.length; i++){ // prendo tutti gli object creati ed elimino l'id

                    lose[i].removeAttribute('id')

                }
                return // interrompo la funzione se si verifica una bomba
            }

                
            
            
            this.classList.add('bg-primary'); // setto la classe per la cella numerica
            this.innerText = cellShow; // aggiungo il numero progressivo all'inner
            
            playerScore.push(this.innerHTML) // inserisco l'elemento nell'array playerScore
            
            
            object.removeAttribute('id') // rimuovo l'id di questo elemento
            
            if(playerScore.length == whitelist.length){ // se clicca tutte quelle disponibili buone
                
                alert('hai vinto! hai totalizzato: ' + pointScore + ' punti!')} //vittoria max punteggio == whitelist.length (100, 81, 49)
                
                               
            }
        }
        )}
    
        
            
           
        
    
    
    
    
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
       whitelist.push(i);
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