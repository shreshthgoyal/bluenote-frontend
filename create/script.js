particlesJS.load("particles-js", "particles.json");

const createNoteInput = document.querySelector(".input");
const head = document.querySelector(".inputhead");

createNoteInput.addEventListener("input", (e) => {
  console.log(e.target.value);
});

head.addEventListener("input", (e) => {
    console.log(e.target.value);
  });