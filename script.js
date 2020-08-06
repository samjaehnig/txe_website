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
