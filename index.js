const BASE_URL = "http://localhost:3000/api/v1"
const CARDS_URL = `${BASE_URL}/cards`
const RANDOMS_URL = `${BASE_URL}/randoms`

document.addEventListener('DOMContentLoaded', () => {
   getDeck();
      
});

function getCard() {
    fetch(CARDS_URL)
   .then(resp => resp.json())
   .then(cards => {
     cards.data.forEach(card => renderCard(card))
   
    }) 
}

function renderCard(card) {
    return `<div data-id=${card.id}>
      <img src=${card.attributes.image} height="100%" width="250">
      <h3>Name: ${card.attributes.name}</h3>
       <ul>
         <li>Type: ${card.attributes.card_type}</li>
         <li>Meaning: ${card.attributes.meaning_up}</li>
         <li>Description: ${card.attributes.description}</li>
       </ul>
    </div>
    <br><br>`;

}

function getRandomCards() {
    return fetch(RANDOMS_URL)
   .then(resp => resp.json())
   .then(randoms => {
       return randoms.card_ids
      
   }) 
}

async function getDeck() {
    const container = document.getElementById('cards-container') 
    const pickedCards = [];
    const randomCards =  await getRandomCards();

   
    for(let i = 0; i < randomCards.length; i++) {
        const card = document.createElement("div");
        const instruction = document.getElementById("instruction");
        card.className = "card";
        card.id = randomCards[i];
        card.innerHTML = `<img src="https://di9xswf8hewf3.cloudfront.net/images/Tarot/Decks/TarotOfDreams/back.jpg" />`;
          card.addEventListener("click", () => {
            if (pickedCards.length < 5 && !pickedCards.includes(card.id)) {
                card.classList.add("pick-card");
                pickedCards.push(card.id);
               
                if (pickedCards.length == 5) {
                    instruction.innerHTML ='<h2>' + `Get Your Reading! >>` + '</h2>';
                    instruction.addEventListener("click", (e) => createReadingHandler(e))
                } else {
                    instruction.innerHTML ='<h2>' + `${5 - pickedCards.length} cards left to pick!` + '</h2>';
                }

            } else {
                
                if (!pickedCards.includes(card.id)) {
                    card.classList.remove("pick-card")
                }
            }
           
          })
        
          container.appendChild(card);

          function createReadingHandler(e) {
            e.preventDefault()
            console.log(pickedCards.map(c => parseInt(c)))
            // console.log(pickedCards)
          }
    }

      
    
    
}


   
    // console.log(document.getElementsByClassName('pick-card')[0].id)
  // return r;
