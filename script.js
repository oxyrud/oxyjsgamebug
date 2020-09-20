const start = document.querySelector('.main__start');
const level = document.querySelectorAll('.main__subtitle');
const gameTable = document.querySelector(".gametable");
let selectLevel = (item) => {
	level.forEach((item)=>item.classList.remove("active"));
	item.target.classList.add("active");
};

level.forEach((item) => item.addEventListener('click',selectLevel ));

function showLevel() {
	let activeLevel = document.querySelector('.active');
	let idActiveLevel = activeLevel.id;
	return idActiveLevel;
}

//получение количества карт в зависимости от уровня игры
function getNumberOfCard () {
	let idActiveLevel = showLevel();
	let numberOfCards = 0;
	switch(idActiveLevel){
		case "medium":
		    numberOfCards = 6;
		    gameTable.classList.add('gametable__six');
		break;
		case "hard":
		    numberOfCards = 10;
            gameTable.classList.add('gametable__ten');
		break;
		default:
		    numberOfCards = 3;
		    gameTable.classList.add('gametable__three');
	}
    return numberOfCards;
}

// создание игрового стола
function createGameTable(){
    let cards = getNumberOfCard ();       
    for (let i=0; i<cards; i++) {
    	    let card = document.createElement("div");
    	    card.classList.add('cardwrap');
    	    gameTable.appendChild(card);
    	    let cardback = document.createElement('div');
    	    cardback.classList.add('cardback');
    	    card.appendChild(cardback);
    	    let cardfront = document.createElement('div');
    	    cardfront.classList.add('cardfront');
    	    card.appendChild(cardfront);
    }
}

// получение случайной карты
function getRandomCard(){
    let playCards = document.querySelectorAll('.cardfront');  
    let gameCards = getNumberOfCard();
    let randomCard =  Math.floor(Math.random() * gameCards);
        for (let i = 0; i < gameCards; i++ ) {
            if (i === randomCard) {
             	playCards[i].classList.add('bug'); 
            } 
        }
}

// переворот карты
/*const flippedCard = document.querySelectorAll('.gametable');
console.log(flippedCard);
let selectCard = (item) => {
     item.target.parentElement.classList.add("onclick");
     flippedCard.forEach((item) => item.addEventListener('click',goToStart))   
}
flippedCard.forEach((item)=> item.addEventListener('click',selectCard));

// подготовка к следующему запуску игры
function goToStart(){
    window.location.reload();	
}
*/

//ДРУГОЙ ВАРИАНТ
// переворот карты

const flippedCard = document.querySelectorAll('.gametable');
let selectCard = (item) => {
    if (item.target.classList.value === 'cardback') {
        item.target.parentElement.classList.add("onclick");
        flippedCard.forEach((item) => item.addEventListener('click',goToStart))
    }  
}

flippedCard.forEach((item) => item.addEventListener('click',selectCard)); 

// подготовка к следующему запуску игры
function goToStart(){
    document.querySelector('.main').classList.remove('hidden');
	gameTable.innerHTML='';
	gameTable.classList.remove('gametable__six','gametable__ten','gametable__three');
    flippedCard.forEach((item) => item.removeEventListener('click',goToStart))
}

//запуск игры
function startGame() {
    getNumberOfCard();
	createGameTable();
    document.querySelector('.main').classList.add('hidden');
    getRandomCard();    
}

start.addEventListener ('click', startGame);

