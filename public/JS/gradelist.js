var list = document.getElementsByClassName("button");

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    location.href = "/grading";
  });
}
