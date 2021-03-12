const BASE_URL = "http://localhost:3000/api/v1"
const CARDS_URL = `${BASE_URL}/cards`
const RANDOMS_URL = `${BASE_URL}/randoms`
const READINGS_URL = `${BASE_URL}/readings`


document.addEventListener('DOMContentLoaded', () => {
   getDeck();
      
});

// function getCard() {
//     fetch(CARDS_URL)
//    .then(resp => resp.json())
//    .then(cards => {
//      cards.data.forEach(card => renderCard(card))
   
//     }) 
// }



// }

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

          
    }

    function createReadingHandler(e) {
        e.preventDefault();
        const pickedCardIds = pickedCards.map(c => parseInt(c));
        postFetch(pickedCardIds);
      }
    
}

function postFetch(cards_in_position) {
    fetch(READINGS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            cards_in_position: cards_in_position
        })
    })
    .then(resp => resp.json())
    .then(reading => {
        const current_situation = new Card(reading.data.attributes.current_situation);
        const tasks_at_hand = new Card(reading.data.attributes.tasks_at_hand);
        const new_challenges =  new Card(reading.data.attributes.new_challenges);
        const strength =  new Card(reading.data.attributes.strength);
        const ideal_outcome =  new Card(reading.data.attributes.ideal_outcome);
        const instruction = document.getElementById("instruction");
        const cardContainer = document.getElementById("cards-container");
        const readingContainer = document.getElementById("reading-container");
        const header = document.getElementById("header");
        // readingContainer.innerHTML = current_situation.renderCard();

        // readingContainer.appendChild(test.renderCard())

        header.innerHTML = '<h2>' + `Here is the interpretation of your reading...` + '</h2>';
        instruction.innerHTML = " ";
        instruction.style.backgroundColor = "white";
        cardContainer.innerHTML = " ";
        
        // const cardRow = document.createElement("div");
        // cardRow.className = "reading-card-row";
        const cardRow = document.getElementsByClassName("reading-card-row");
        cardRow[0].innerHTML = current_situation.renderCard();
        cardRow[1].innerHTML = tasks_at_hand.renderCard();
        cardRow[2].innerHTML = new_challenges.renderCard();
        cardRow[3].innerHTML = strength.renderCard();
        cardRow[4].innerHTML = ideal_outcome.renderCard();

    })
}
