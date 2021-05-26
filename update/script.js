particlesJS.load("particles-js", "particles.json");

  
const createNoteInput = document.querySelector(".input");

createNoteInput.addEventListener("input", (e) => {
  console.log(e.target.value);
});

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

console.log(noteId);
