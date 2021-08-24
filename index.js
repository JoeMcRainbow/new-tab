const contentWindow = document.getElementById('mainContent');

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "<h1 class='notFound'>Whoops! I can't find that page.</h1>'";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("include");
            includeHTML();
          }
        } 
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

function updateContent(toPage){
    if (toPage === 'home'){
        contentWindow.innerHTML = "<div include='./subpages/home.html'></div>";
        includeHTML();
    }
    if (toPage === 'aboutMe'){
        contentWindow.innerHTML = "<div include='./subpages/aboutme.html'></div>";
        includeHTML();
    }
    if (toPage === 'myWork'){
        contentWindow.innerHTML = "<div include='./subpages/work.html'></div>";
        includeHTML();
    }
}