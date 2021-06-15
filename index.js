const BASE_URL = "http://localhost:3000/api/v1"
const RANDOM_CARD_URL = `${BASE_URL}/random_card`
const RANDOM_CARDS_URL = `${BASE_URL}/random_cards`
const READINGS_URL = `${BASE_URL}/readings`


document.addEventListener('DOMContentLoaded', () => {
    getDeck();
    cardOftheDay(); 
    const userCmtForm = document.querySelector("#user-comment-form")
    userCmtForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cmt = document.getElementById("user-text")
      const comment = document.getElementById("user-comment")
      comment.innerHTML = cmt.value
})
});

function getRandomCards() {
    return fetch(RANDOM_CARDS_URL)
   .then(resp => resp.json())
   .then(random => {
       return random.card_ids
   }) 
   .catch(err => {
    document.getElementById("message").innerHTML = err.message
})
}

function getCard() {
    return fetch(RANDOM_CARD_URL)
    .then(resp => resp.json())
    .then(card => {
        const newCard = new Card(card.data.attributes)
       return newCard.renderCard()
    })
    .catch(err => {
        document.getElementById("message").innerHTML = err.message
    })
}

function createRefreshHandler(e) {
    e.preventDefault();
    window.location.reload();
  }

function refreshBtn() {
    const refresh = document.getElementById("refresh")
    const btn = document.createElement("BUTTON");
    btn.addEventListener("click", (e) => createRefreshHandler(e));
    btn.innerHTML = "Start Again";
    btn.id = "refresh-button";
    refresh.appendChild(btn);
}



function cardOftheDay() {
    const pickACard = document.getElementById("pick-a-card");
    pickACard.style.cursor = "pointer";
    pickACard.addEventListener("click", (e) => {
        e.preventDefault();
        getCard();
        refreshBtn();
    })
}

function renderReading(reading) {
       const past = new Card(reading.data.attributes.past);
        const present = new Card(reading.data.attributes.present);
        const future =  new Card(reading.data.attributes.future);
        const reason =  new Card(reading.data.attributes.reason);
        const potential =  new Card(reading.data.attributes.potential);

        const introduction = document.getElementsByClassName("introduction-button");
        const cardsContainer = document.getElementById("cards-container");
        const readingContainer = document.getElementById("reading-container");
        const header = document.getElementById("header");
        const o = document.getElementById("or");
        

        header.innerHTML = '<h2>' + `Here is the interpretation of your reading...` + '</h2>';
        header.style.color = "pink";

        for (let i = 0; i < introduction.length; i++) {
            introduction[i].innerHTML = " ";
            const s = introduction[i].style;
            s.backgroundColor = "transparent";
            s.padding = 0;
            s.margin = 0;
        }
        cardsContainer.innerHTML = " ";
        o.innerHTML = " ";
        
        refreshBtn();
        
        readingContainer.innerHTML = " ";
        
        past.renderReadingCard('Card 1 represents the Past');
        present.renderReadingCard('Card 2 represents the Present');
        future.renderReadingCard('Card 3 represents the Future');
        reason.renderReadingCard('Card 4 represents core Reason of the circumstance');
        potential.renderReadingCard('Card 5 represents Potential Outcome of situation');
}

function postReadingFetch(cards_in_position) {
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
    .then(reading => renderReading(reading))
    .catch(err => {
        document.getElementById("message").innerHTML = err.message
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
        card.innerHTML = `<img src="./IMG_1281.jpg" />`;
            card.addEventListener("click", () => {
               if (pickedCards.length < 5 && !pickedCards.includes(card.id)) {
                  card.classList.add("pick-card");
                  pickedCards.push(card.id);
               
                  if (pickedCards.length == 5) {
                      instruction.innerHTML ='<h2>' + `Get Your Reading! >>` + '</h2>';
                      instruction.style.cursor = "pointer";
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
          container.style.paddingTop = "100px";

          
    }

    function createReadingHandler(e) {
        e.preventDefault();
        const pickedCardIds = pickedCards.map(c => parseInt(c));
        postReadingFetch(pickedCardIds);
      }
    
}

