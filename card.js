class Card {
    constructor({id, name, card_type, meaning_up, meaning_rev, description, image}) {
        this.id = id;
        this.name = name;
        this.card_type = card_type;
        this.meaning_up = meaning_up;
        this.meaning_rev = meaning_rev;
        this.description = description;
        this.image = image;
    }

    renderCard(cardPositionName) {
        const rev = Math.floor(Math.random() * Math.floor(2));

        const content = 
             `<h2>${cardPositionName}</h2>
             <h3>${this.name}</h3>
              <ul>
                <li>Type: ${this.card_type}</li>
                <li>Meaning: ${rev ? this.meaning_rev : this.meaning_up}</li>
                <li>Description: ${this.description}</li>
              </ul>`
       
         const readingContainer = document.getElementById("reading-container")
         const card = document.createElement("div");
         card.id = `${this.id}`;
         card.className = "reading-card-row";

         const img =  document.createElement("div");
         img.className = "reading-card-img";
         if (rev) { img.style.transform = "rotate(180deg)" };
         img.innerHTML = `<img src=${this.image} width="100%">`;

         const text = document.createElement("div");
         text.className = "reading-card-text";
         text.innerHTML = content;
         text.style.backgroundColor = "darkslateblue";
         text.style.opacity = "0.6";
         text.style.padding = "20px";
         text.style.color = "pink";
         text.style.marginRight = "20px";
         
         card.appendChild(img);
         card.appendChild(text);
         
         readingContainer.appendChild(card);
     
        return card;
    }         
}