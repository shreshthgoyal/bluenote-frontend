particlesJS.load("particles-js", "particles.json");

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("id");

const updateNoteButton = document.querySelector(".btn");

const apiUrl = "https://rocky-anchorage-64506.herokuapp.com";

const token = localStorage.getItem("jwt");

updateNoteButton.addEventListener("click", () => {
  const content = document.querySelector(".input").value;
  const heading = document.querySelector(".inputhead").value;

  if (token) {
    if(content != "" && heading != "")
    {fetch(`${apiUrl}/note/update/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "/frontend/dashboard/index.html";
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="../dashboard">Try updating again!</a>'
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
