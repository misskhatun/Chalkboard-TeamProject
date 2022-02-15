
$(function() {
  var qnum = 0;
  const questioncopy = $(".questionform").clone();
  $("#buttonaddquestion").on("click", () => {
    qnum++;
    questioncopy.clone().appendTo("#container");
    $("#container").contents().last().attr("id", qnum)
  });


  $("body").on("click", ".deletebutton", () => {
    if (qnum == 0) {
      alert("That's a bad idea, my guy.")
    }
    else {
      $("#container").contents().last().remove();
      qnum--;
    }
  })
});