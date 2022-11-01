var r = document.querySelector(":root");

var mode = 1;
let cookie = document.cookie;
if (cookie == "mode=0") { var mode = 0; }

// r.style.setProperty("--speed", "0.4s");

color = document.getElementById("color");
moon = document.getElementById("moon");
sun = document.getElementById("sun");
wave = document.getElementById("wave");
light_background = document.getElementById("light_background");
dark_background = document.getElementById("dark_background");

r.style.setProperty("--speed", "0s");
if (mode == 1){
  addcss("light");
  light_background.style.opacity = "1";
  dark_background.style.opacity = "0";
  moon.style.left = "300px";
  sun.style.left = "0px";
  $(".svg-d").css("opacity","0")
  $(".svg-l").css("opacity","1")
}
else if (mode == 0){
  addcss("dark");
  light_background.style.opacity = "0";
  dark_background.style.opacity = "1";
  moon.style.left = "0px";
  sun.style.left = "-300px";
  $(".svg-d").css("opacity","1")
  $(".svg-l").css("opacity","0")
}
r.style.setProperty("--speed", "0.4s");


color.addEventListener("click", function () {
  if (mode == 0) {
    mode = 1;
    removecss("dark");
    addcss("light");
    light_background.style.opacity = "1";
    dark_background.style.opacity = "0";
    moon.style.left = "300px";
    sun.style.left = "0px";
    document.cookie = "mode=1";
    $(".svg-d").css("opacity","0")
    $(".svg-l").css("opacity","1")
  } else if (mode == 1) {
    mode = 0;
    removecss("light");
    addcss("dark");
    light_background.style.opacity = "0";
    dark_background.style.opacity = "1";
    moon.style.left = "0px";
    sun.style.left = "-300px";
    document.cookie = "mode=0";
    $(".svg-d").css("opacity","1")
    $(".svg-l").css("opacity","0")
  }
});

// Create a function for setting a variable value
function color_set(name, value) {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty(name, value);
}

function addcss(id) {
  var head = document.head;
  var link = document.createElement("link");

  if (id === "light") {
    console.log("light")
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "styles/light.css";
    link.id = "light";
  }
  if (id === "dark") {
    console.log("dark")
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "styles/dark.css";
    link.id = "dark";
  }
  head.appendChild(link);
}
function removecss(id) {
  let head = document.head;
  let style = document.getElementById(id)
  head.removeChild(style)

}