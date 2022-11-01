var hochladen = 0
var waehlen = 0
var ranking = 0
$(".hochladen").click(function (event) {
  let height = $(this).children('.info-div-bottom').height() + 90 + 10
  if (hochladen == 0){
    hochladen = 0
    waehlen = 0
    ranking = 0
    $(".info-div").css("height", "90px")
    $(this).css("height", height + "px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "180deg")
    hochladen = 1
  }
  else {
    $(this).css("height", "90px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "0deg")
    hochladen = 0
  }
})
$(".waehlen").click(function (event) {
  let height = $(this).children('.info-div-bottom').height() + 90 + 10
  if (waehlen == 0){
    hochladen = 0
    waehlen = 0
    ranking = 0
    $(".info-div").css("height", "90px")
    $(this).css("height", height + "px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "180deg")
    waehlen = 1
  }
  else {
    $(this).css("height", "90px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "0deg")
    waehlen = 0
  }
})
$(".ranking").click(function (event) {
  let height = $(this).children('.info-div-bottom').height() + 90 + 10
  if (ranking == 0){
    hochladen = 0
    waehlen = 0
    ranking = 0
    $(".info-div").css("height", "90px")
    $(this).css("height", height + "px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "180deg")
    ranking = 1
  }
  else {
    $(this).css("height", "90px")
    $(this).children(".info-div-top").children('.info-svg').css("rotate", "0deg")
    ranking = 0
  }
})