let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true: strawberry (O), false: cupcake (X)

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8],
];

// Set image file paths (you can also use full URLs)
const cupcakeImg = "cupcake.png";
const strawberryImg = "strawbery.png";

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = ""; // Remove the image
    box.removeAttribute("data-value");
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congrats, Winner is ${winner === "O" ? "Strawberry" : "Cupcake"}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();

  // 🎉 Confetti animation
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#ff8eb7', '#f9c6d0', '#ffd700', '#ffffff'],
    shapes: ['circle', 'square']
  });
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].getAttribute("data-value");
    let pos2Val = boxes[pattern[1]].getAttribute("data-value");
    let pos3Val = boxes[pattern[2]].getAttribute("data-value");

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const img = document.createElement("img");
    img.classList.add("icon");

    if (turnO) {
      img.src = strawberryImg;
      box.setAttribute("data-value", "O");
      turnO = false;
    } else {
      img.src = cupcakeImg;
      box.setAttribute("data-value", "X");
      turnO = true;
    }

    box.appendChild(img);
    box.disabled = true;
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
