document.querySelectorAll(".studio-piece img").forEach((image) => {
  image.draggable = false;
  image.addEventListener("dragstart", (event) => event.preventDefault());
});

document.querySelectorAll(".studio-piece").forEach((piece) => {
  piece.addEventListener("contextmenu", (event) => event.preventDefault());
});
