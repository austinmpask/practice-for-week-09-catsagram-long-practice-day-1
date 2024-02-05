let score = 0;
let comments = [];
let typingComment = "";
let currentKitty = "";

function save() {
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("comments", JSON.stringify(comments));
  localStorage.setItem("typingComment", JSON.stringify(typingComment));
  localStorage.setItem("currentKitty", JSON.stringify(currentKitty));
  //   console.log(comments);
}

function loadState() {
  score = JSON.parse(localStorage.getItem("score"));
  comments = JSON.parse(localStorage.getItem("comments"));
  typingComment = JSON.parse(localStorage.getItem("typingComment"));
  currentKitty = JSON.parse(localStorage.getItem("currentKitty"));

  const catPic = document.createElement("img");

  catPic.src = currentKitty;
  catPic.id = "picture";

  document
    .getElementById("footer")
    .insertAdjacentElement("beforebegin", catPic);
}

function getKitty() {
  const catPic = document.createElement("img");

  fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .then((data) => {
      const url = data[0].url;
      currentKitty = url;
      catPic.src = url;
      catPic.id = "picture";
      save();
      document
        .getElementById("footer")
        .insertAdjacentElement("beforebegin", catPic);
    })
    .catch(() => {
      alert("shit broke!");
    });
}

function byeKitty() {
  score = 0;
  comments = [];
  typingComment = "";
  populateComments();
  loadScore();

  document.getElementById("picture").remove();
}

function populateComments() {
  document.querySelectorAll("li").forEach((thing) => {
    thing.remove();
  });
  if (comments === null) {
    comments = [];
    save();
  }

  comments.forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = comment;
    document.getElementById("comments").appendChild(commentElement);
  });
}

function loadScore() {
  const scoreLabel = document.getElementById("popularity");
  scoreLabel.innerHTML = "Popularity: " + score;
}

window.onload = () => {
  const title = document.createElement("h1");
  document.getElementById("footer").insertAdjacentElement("beforebegin", title);
  title.innerHTML = "Kitten Pic";

  if (localStorage.getItem("score")) {
    loadState();
  } else {
    getKitty();
  }
  loadScore();
  populateComments();
  save();

  document.getElementById("new-cat").addEventListener("click", () => {
    byeKitty();
    getKitty();
    save();
  });

  document.getElementById("comment-button").addEventListener("click", () => {
    const inputBox = document.getElementById("input");
    const comment = inputBox.value;

    comments.push(comment);
    inputBox.value = "";
    populateComments();
    save();
  });

  document.getElementById("updoot").addEventListener("click", () => {
    score++;
    loadScore();
    save();
  });

  document.getElementById("downdoot").addEventListener("click", () => {
    if (score > 0) {
      score--;
    }
    loadScore();
    save();
  });
};
