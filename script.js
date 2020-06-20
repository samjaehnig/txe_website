
function switchAnswer(qnumber) {
  if(document.getElementById(qnumber).style.display == "block") {
    document.getElementById(qnumber).style.display = "none";
  } else {
    document.getElementById(qnumber).style.display = "block";
  }
}
