const cards = document.querySelectorAll('.card');

let  cartaGirata= false; // false perché ci sono ancora carte da girare 
let primacarta;
let secondacarta;
let bloccaTavola = false;

// creo la funzione flipcard che aggiunge al css la classe flip 
function flipCard() { 
if (bloccaTavola)return;
if(this === primacarta)return;

 this.classList.add('flip');

 //se non ho girato ancora carte allora è true, e posso girare la prima carta
 if(!cartaGirata){
     cartaGirata=true;
     primacarta=this; //se è true, cioè sto per girare, gli applico il flip 
     return;
 } //altrimenti lo appico alla seconda
 else{
    secondacarta=this;
    cartaGirata= false;
 }

 controllaMatch();
 
}

function controllaMatch (){
    if (primacarta.dataset.animale === secondacarta.dataset.animale){
    blocca();  //blocca le carte se risultano uguali --> match :) 
    return;
    }
    rigira(); // condizione non vera --> no match --> rigira le carte
}

// tolgo il listener impostato nella funzione flipcard se la condizione (riga 23) è vera --> riferito a riga 24
function blocca (){
    primacarta.removeEventListener('click',flipCard);
    secondacarta.removeEventListener('click',flipCard);
    reset()
}

//rigira le carte se non si è avverata la condizione della funzione controlla Match. Allo scadere di tempo la carta si gira
function rigira(){
    setTimeout(() => {
        primacarta.classList.remove('flip');
        secondacarta.classList.remove('flip');  
         reset() 
}, 700);
}

function reset(){
    [cartaGirata,bloccaTavola] = [false,false];
    [primacarta, secondacarta] = [null,null]; 
}


//è una funzione life --> è autonoma e viaggia per conto suo appena viene dichiarata 
(function mischia(){
    cards.forEach(card => {
       let mischia = Math.floor(Math.random()*6);
        card.style.order = mischia;
    })
})();

//itero l'event listener su tutte le carte.
cards.forEach(card => card.addEventListener('click', flipCard));
