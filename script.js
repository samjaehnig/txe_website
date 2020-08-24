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

function hover(name) {
  document.getElementById("profile_picture_" + name).style.opacity = 0.2;
  document.getElementById("email_" + name).style.display = "block";
  document.getElementById("linkedin_" + name).style.display = "block";
}

function off_hover(name) {
  document.getElementById("email_" + name).style.display = "none";
  document.getElementById("linkedin_" + name).style.display = "none";
  document.getElementById("profile_picture_" + name).style.opacity = 1.0;
}