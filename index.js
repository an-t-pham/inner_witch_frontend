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
        card.innerHTML = `<img src="https://scontent.fltn3-1.fna.fbcdn.net/v/t1.0-9/161131568_10218879958857117_6901733784538859194_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=730e14&_nc_ohc=wf9LX1RKug4AX_V3qjl&_nc_ht=scontent.fltn3-1.fna&oh=5f80b32bddbe1e083a615558ba6a2dfe&oe=6076CDB6" />`;
            card.addEventListener("click", () => {
               if (pickedCards.length < 5 && !pickedCards.includes(card.id)) {
                  card.classList.add("pick-card");
                  pickedCards.push(card.id);
               
                  if (pickedCards.length == 5) {
                      instruction.innerHTML ='<h2>' + `Get Your Reading! >>` + '</h2>';
                      instruction.addEventListener("click", (e) => createReadingHandler(e))
                  } else if (pickedCards.length == 4) {
                      instruction.innerHTML ='<h2>' + `1 card left to pick!` + '</h2>';
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
        const past = new Card(reading.data.attributes.past);
        const present = new Card(reading.data.attributes.present);
        const future =  new Card(reading.data.attributes.future);
        const reason =  new Card(reading.data.attributes.reason);
        const potential =  new Card(reading.data.attributes.potential);
        const instruction = document.getElementById("instruction");
        const cardContainer = document.getElementById("cards-container");
        const readingContainer = document.getElementById("reading-container");
        const header = document.getElementById("header");
        // readingContainer.innerHTML = past.renderCard();

        // readingContainer.appendChild(test.renderCard())

        header.innerHTML = '<h2>' + `Here is the interpretation of your reading...` + '</h2>';
        instruction.innerHTML = " ";
        instruction.style.backgroundColor = "white";
        cardContainer.innerHTML = " ";
        
        
        // const cardRow = document.createElement("div");
        // cardRow.className = "reading-card-row";
        document.getElementById("reading-container").innerHTML = " ";
        // const cardRow = document.getElementsByClassName("reading-card-row");
        // cardRow[0].innerHTML = 'Current Situation';
        past.renderCard('Card 1 represents the Past');
        // cardRow[1].innerHTML = 'Tasks at hand';
        present.renderCard('Card 2 represents the Present');
        future.renderCard('Card 3 represents the Future');
        reason.renderCard('Card 4 represents core Reason of the circumstance');
        potential.renderCard('Card 5 represents Potential Outcome of situation');
        

    })
}
