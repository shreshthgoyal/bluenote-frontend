const createNoteButton = document.querySelector(".btn");
const apiUrl = "https://rocky-anchorage-64506.herokuapp.com";
const token = localStorage.getItem("jwt");

particlesJS.load("particles-js", "particles.json");

document.querySelector(".log").addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "https://bluenote.netlify.app/"
})

const createNoteInput = document.querySelector(".input");
const head = document.querySelector(".inputhead");

createNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".inputhead").value;
  const heading = document.querySelector(".input").value;

  if (token) {
  if(content != "" && heading != "")
 {   fetch(`${apiUrl}/note/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ heading, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "../dashboard";
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="../dashboard">Try Creating a Note again</a>'
        })
      });}
    else
    {
      Swal.fire(
        'Content and Heading of blue-note can not be empty!',
        '😐',
        'warning'
      )
    }
  }
});
