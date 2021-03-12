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

    renderCard() {
        const content = 
        // `<div id=${this.id}>
        //    <div class="reading-card-img">
        //      <img src=${this.image} height="50%" width="125">
        //    </div>
  
        //    <div class="reading-card-text">
             `<h3>${this.name}</h3>
              <ul>
                <li>Type: ${this.card_type}</li>
                <li id="meaning">Meaning: ${this.meaning_up}</li>
                <li>Description: ${this.description}</li>
              </ul>`
            //   </div>
        //   </div>
        //  <br><br>`;
         const card = document.createElement("div");
         card.id = `${this.id}`;

         const img =  document.createElement("div");
         img.className = "reading-card-img";
         img.innerHTML = `<img src=${this.image} height="50%" width="125">`;

         const text = document.createElement("div");
         text.className = "reading-card-text";
         text.innerHTML = content;
         
         card.appendChild(img);
         card.appendChild(text);

        const rev = Math.floor(Math.random() * Math.floor(max));
        if (rev === 1) {
            document.getElementById("id").style.transform = "rotate(180deg)";
            
        }
        return card;
    }         
}