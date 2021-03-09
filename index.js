const endPoint = "http://localhost:3000/api/v1/cards"

document.addEventListener('DOMContentLoaded', () => {
   getDeck()
});

function getCard() {
    fetch(endPoint)
   .then(resp => resp.json())
   .then(cards => {
     cards.data.forEach(card => renderCard(card))
    }) 
}

function renderCard(card) {
    const cardHTML= `
    <div data-id=${card.id}>
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

function getDeck() {
    const container = document.getElementById('cards-container') 
    const pickedCards = [];
    for(let i = 0; i < 23; i++) {
        const card = document.createElement("div");
        const instruction = document.getElementById("instruction");
        card.className = "card";
        card.id = i;
        card.innerHTML = `<img src="https://di9xswf8hewf3.cloudfront.net/images/Tarot/Decks/TarotOfDreams/back.jpg" />`;
          card.addEventListener("click", () => {
            if (pickedCards.length < 5) {
                card.classList.add("pick-card");
                pickedCards.push(card.id);
               
                if (pickedCards.length == 5) {
                    instruction.innerHTML ='<h2>' + `Get Your Reading! >>` + '</h2>';
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

      
      
    
    
}

function getReading() {
    const instruction = document.getElementById("instruction");

    if (instruction.innerHTML == "Get Your Reading! >>" ) {
       instruction.addEventListener("click", () => {
           const reading = [];
           for (let i = 0; i < 6; i++) {
               const num = Math.floor(Math.random() * 5) + 1;
               reading.push(num);
           }
       })
    }
}