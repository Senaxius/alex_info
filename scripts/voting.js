//dir of pictures
var dir = window.location.pathname;
dir = dir.substring(0, dir.lastIndexOf('/'));
dir = dir + "/tiere/"

// get grid to fill in pets
grid = $("#grid")

var votes = {
  first: 0,
  second: 0,
  third: 0
}

var ready = [0,0,0]
// get data from db
data = getData().then((data) => {
  // when arrived, create entry for every pet
  for (const i in data) {
    var pet = data[i]
    id = pet.ID
    createPet(id, pet.Name, pet.Info_1, pet.Info_2, pet.Info_3, pet.img)

    // on click of picture
    $("#" + id + "_pic").click(function() {
      id = this.id
      id = id.substring(0, id.indexOf('_'));
      let index = getIndex(data, id)
      src = data[index].img
      $(".zoom-pic").attr("src", dir + src)
      $(".zoom-div").css("top", "10%")
    })

    // on click of first button
    $("#" + id + "_first").click(function() {
      id = this.id
      id = id.substring(0, id.indexOf('_'));
      turn_inactive("#" + id + "_second")
      turn_inactive("#" + id + "_third")
      turn_inactive(".first")
      turn_active($(this), "first")
      // save id to first position
      for (const i in votes) {
        if (votes[i] == id){ votes[i] = 0}
      }
      votes['first'] = id 
    })
    // on click of second button
    $("#" + id + "_second").click(function() {
      id = this.id
      id = id.substring(0, id.indexOf('_'));
      turn_inactive("#" + id + "_first")
      turn_inactive("#" + id + "_third")
      turn_inactive(".second")
      turn_active($(this), "second")
      // save id to second position
      for (const i in votes) {
        if (votes[i] == id){ votes[i] = 0}
      }
      votes['second'] = id 
    })
    // on click of third button
    $("#" + id + "_third").click(function() {
      id = this.id
      id = id.substring(0, id.indexOf('_'));
      turn_inactive("#" + id + "_first")
      turn_inactive("#" + id + "_second")
      turn_inactive(".third")
      turn_active($(this), "third")
      // save id to third position
      for (const i in votes) {
        if (votes[i] == id){ votes[i] = 0}
      }
      votes['third'] = id 
    })
    // on every click of button
    $(".vote-button").click(function() {
      if(Object.values(votes).every(x => x != 0)){
        $(".abschicken").css("background-color", "white")
        $(".abschicken").hover(function(e) { 
          $(this).css("background-color","var(--active)") 
          $(this).css("width","70%") 
        }, function(e) {
          $(this).css("background-color","white") 
          $(this).css("width","50%") 
        })
      }
      else {
        $(".abschicken").css("background-color", "var(--inactive)")
        $(".abschicken").hover(function(e) { 
          $(this).css("background-color","var(--inactive)") 
          $(this).css("width","50%") 
        })
      }
    })
  }
  console.log("done generating")
  $(".abschicken").css("display", "inline")
})

// get data from server function
async function getData() {
  const res = await $.getJSON('https://node.noanus.com/getpet')
  return res
}

// close preview picture on click
$("#zoom_div").click(function () {
  $(this).css("top", "200%");
});

// function to generate pet html from input
function createPet(id, name, info_1, info_2, info_3, img) {
  var pet = 
    '<div class="pet">' +
      '<div class="pic-div">' +
        '<img src="' + dir + img + '" class="pic" id="' + id + "_pic" + '"/>' +
      '</div>' +
      '<div class="info">' +
        '<p class="name">' + name + '</p>' +
        '<p class="beschreibung"> - ' + info_1 + '</p>' +
        '<p class="beschreibung"> - ' + info_2 + '</p>' +
        '<p class="beschreibung"> - ' + info_3 + '</p>' +
      '</div>' +
      '<div class="vote-div">' +
        '<button class="vote-button first" id="' + id + "_first"+ '">1.</button>' +
        '<button class="vote-button second" id="' + id + "_second" + '">2.</button>' +
        '<button class="vote-button third" id="' + id + "_third"+ '">3.</button>' +
      '</div>' +
    '</div>'
  grid.append(pet)
}

function turn_active(id, number) {
  id.css("color", "var(--text2)")
  id.css("background-color", "var(--" + number + ")")
  id.css("transform", "translate(0, -5px)")
  id.css("font-size", "30px")
}
function turn_inactive(number) {
  $(number).css("color", "var(--text2-secondary)")
  $(number).css("font-size", "25px")
  $(number).css("transform", "translate(0, 0)")
  $(number).css("background-color", "var(--article)")
}

// send votes to server on click 
$(".abschicken").click(function(){
  if(Object.values(votes).every(x => x != 0)){
    sendVotes(votes).then((res) => {
      alert(res)
      window.location = "https://minor.pw/ranking.html";
      // location.reload();
    })
  }
})

async function sendVotes(votes){
    const res = await fetch('https://node.noanus.com/sendVote', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(votes)
  });
  return "Deine Wahl wurde erfolgreich abgeschickt"
}

// update grid on change
// const update = new EventSource('https://node.noanus.com/voting_client')
// update.onmessage = function (event) {
//   console.log(event.data)
//   id = event.data
//   data = getData().then((data) => {
//     for (const i in data) {
//       if (data[i].ID == id){
//         console.log("Got event from server: new pet!")
//         pet = data[i]
//         createPet(id, pet.Name, pet.Info_1, pet.Info_2, pet.Info_3, pet.img)
//       }
//     }
//   })
// }
// update.onerror = function () {
//   eventSource.close()
// }

function getIndex(data, ID) {
  for (const i in data) {
    if (data[i].ID == ID){
      return i
    }
  }
}