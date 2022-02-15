window.addEventListener("DOMContentLoaded", function() {
  let bttn = document.getElementById("submit");
  bttn.addEventListener("click", checkpw);
});

function checkpw(event) {
  const fname = document.getElementById("firstname");
  const lname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const pw = document.getElementById("password");
  const cpw = document.getElementById("confirmpassword");
  const type = document.querySelector('input[name="accounttype"]:checked');

  let lower = /[a-z]+/;
  let lowercheck = lower.exec(pw.value);
  let upper = /[A-Z]+/;
  let uppercheck = upper.exec(pw.value);
  let digit = /\d/;
  let digitcheck = digit.exec(pw.value);
  let errormessg = "";
  if (fname.value == "" || lname.value == "") errormessg += "Must have a full name.\n";
  if (email.value == "") errormessg += "Must input an email.\n";
  if (pw.value != cpw.value) errormessg += "Passwords must match.\n";
  if (pw.value.length < 8) errormessg += "Password must be atleast 8 characters.\n";
  if (lowercheck === null) errormessg += "Password must contain at least one lowercase character.\n";
  if (uppercheck === null) errormessg += "Password must contain at least one uppercase character.\n";
  if (digitcheck === null) errormessg += "Password must contain at least one digit.\n";
  if (type === null) errormessg += "Must choose account type.\n";
  
  document.getElementById("errormsg").innerText = errormessg;
  if (errormessg != "") event.preventDefault();
}