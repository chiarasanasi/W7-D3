const booksUrl = " https://striveschool-api.herokuapp.com/books"
const booksStored = []
sessionStorage.setItem("booksStored", JSON.stringify(booksStored))

const getBookStore = function () {
  fetch(booksUrl)
    .then((response) => {
      if (response.ok) {
        console.log(
          "Di seguito troveria un array di oggetti, ogni oggetto corrisponde ad un libro diverso!"
        )
        return response.json()
      } else {
        throw new Error("Errore nel recupero dati della Libreria!")
      }
    })
    .then((data) => {
      console.log("LIBRI", data)
      // ora vado a prendermi il riferimento alla row creata nell'html
      const rowHtml = document.getElementById("libreria")
      const carrello = document.getElementById("carrello")

      //ora vado a prendermi tutti gli elementi che mi serviranno per creare la card
      data.forEach((libro) => {
        const card = document.createElement("div")
        card.classList.add(
          "card",
          "border",
          "border-3",
          "border-secondary",
          "rounded-3"
        )
        card.innerHTML = `<img src="${libro.img}" class="card-img-top" alt="img-${libro.title}">`

        const cardText = document.createElement("div")
        const cardButtonsDiv = document.createElement("div")
        cardButtonsDiv.classList.add("d-flex", "justify-content-evenly")
        cardText.classList.add(
          "card-body",
          "d-flex",
          "flex-column",
          "justify-content-between",
          "bg-dark",
          "text-info",
          "rounded-bottom-2"
        )
        cardText.innerHTML = `<div>
        <h5 class="card-title fw-semibold">${libro.title}</h5>
              <p class="card-text"><span class="fw-semibold">Prezzo</span> ${libro.price}€</p>
              </div>
              `

        // creo BOTTONO SCARTA
        const buttonScarta = document.createElement("button")
        buttonScarta.innerText = "Scarta!"
        buttonScarta.classList.add("btn", "btn-danger", "mt-1", "fs-6")

        buttonScarta.addEventListener("click", function () {
          card.classList.add("d-none")
        })

        //CREO BOTTONE CARRELLO

        const buttonCarrello = document.createElement("button")
        buttonCarrello.innerText = "Carrello"
        buttonCarrello.classList.add("btn", "btn-info", "mt-1", "fs-6")

        buttonCarrello.addEventListener("click", function () {
          buttonScarta.remove()
          buttonCarrello.remove()

          //CREO BOTTONE RIMUOVI
          const buttonRimuovi = document.createElement("button")
          buttonRimuovi.innerText = "Rimuovi"
          buttonRimuovi.classList.add("btn", "btn-warning", "mt-1", "fs-6")

          buttonRimuovi.addEventListener("click", function () {
            card.remove()
            const nLibro = booksStored.indexOf(libro.title)

            if (index > -1) {
              booksStored.splice(index, 1)
            }
            sessionStorage.setItem("booksStored", JSON.stringify(booksStored))
          })

          cardText.appendChild(buttonRimuovi)

          carrello.appendChild(card)

          // Aggiorna lo storage
          booksStored.push(libro.title)
          sessionStorage.setItem("booksStored", JSON.stringify(booksStored))
        })
        cardText.appendChild(cardButtonsDiv)
        cardButtonsDiv.appendChild(buttonScarta)
        cardButtonsDiv.appendChild(buttonCarrello)
        card.appendChild(cardText)
        rowHtml.appendChild(card)
      })
    })

    .catch((err) => {
      console.log("C'è stato un errore", err)
    })
}
getBookStore()
