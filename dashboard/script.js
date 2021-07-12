particlesJS.load("particles-js", "particles.json");


const cardContainer = document.querySelector(".card-container");
const logout = document.querySelector(".log");
const createNoteButton = document.querySelector(".sign-in-sign-up");
const apiUrl = "https://rocky-anchorage-64506.herokuapp.com";

const token = localStorage.getItem("jwt");

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "https://bluenote.netlify.app/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
  location.href = "/frontend/create/index.html";
});


const createNotes = (array) => {
  if(array.length > 0)
  {cardContainer.innerHTML = "";}
    
  array.forEach((cardObj) => {
    const { heading, content, noteId } = cardObj;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = noteId;


    const insideHtml = `<div class="card-header"><div class="card-heading">${heading}</div><a href="../update/?id=${noteId}"><div class="edit-note"><i class="far fa-edit"></i></a></div></div><div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);

  });
};

createNotes(cardData);

window.addEventListener("load", () => {
  if (token) {
    fetch(`${apiUrl}/note/getall`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        cardData = data.data;
        if(data.data.length === 0) {
          Swal.fire({
            title: 'Create a blue-note!!',
            width: 600,
            padding: '3em',
            confirmButtonText: 'Create',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://media2.giphy.com/media/3oFzmeVbeXIfBUl5sI/giphy.gif")
              left top
              no-repeat
            `
          })
          .then((result)=> {
            if(result.isConfirmed)
            {
              location.href = "../create"
            }
          })
        }
        createNotes(cardData);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'warning',
          title: 'Warning!',
          text: `Error Occured, Try Reloading the page or Sign-In again!`,
        })
      })
  }

  if (!token) {
    location.href = "../../index.html";
  }
})




