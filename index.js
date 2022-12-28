function openNav() {
   document.getElementById("mySidenav").style.display = "block";
   document.getElementById("box1").style.top = "400px";
   document.getElementById("box1").style.border = "1px solid #fff";
   document.getElementById("box1").style.transform = "scale(1)";
   document.getElementById("row").style.height = "800px";

   // document.getElementById("box1").style.display = "block";
}

function closeNav() {
   document.getElementById("mySidenav").style.display = "none";
   document.getElementById("box1").style.transform = "scale(1)";
   document.getElementById("box1").style.transition = "all 0.7s ease";
   document.getElementById("box1").style.border = "none";
}
