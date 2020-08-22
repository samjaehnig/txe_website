function switchAnswer(qname) {
  if(document.getElementById(qname).style.display == "block") {
    document.getElementById(qname).style.display = "none";
  } else {
    document.getElementById(qname).style.display = "block";
  }
}


$(document).ready(function(){

  $.localScroll({
      offset: { top: -100 }
  });    

});


function email_hover(name) {
  document.getElementById("profile_picture_" + name).style.opacity = 0.2;
  document.getElementById("email_" + name).style.display = "block";
  // document.getElementById("").style.display = "visible";
}

function email_off_hover(name) {
  document.getElementById("email_" + name).style.display = "none";
  document.getElementById("profile_picture_" + name).style.opacity = 1.0;
  // document.getElementById("").style.display = "visible";
}