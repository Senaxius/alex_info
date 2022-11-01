// get notification when new votes received
// const update = new EventSource('https://node.noanus.com/ranking_client')
// update.onmessage = function (event) {
//   console.log(event.data)
// }
// update.onerror = function () {
//   eventSource.close()
// }

// generate Ranking
list = $(".ranking-list")
for (let i = 1; i <= 10; i++) {
  generateRanking(i)
}
var max = 0
// load ranking data
data = getData().then((data) => {
  for (const i in data) {
    pet = data[i]
    id = pet.ID
    votes = parseInt(pet.Stimmen)
    if (votes > max) {
      max = votes
    }
    nummer = parseInt(i) + 1
    editRanking(nummer, pet.Name, votes, max)
  }
  console.log("done generating")
})


// get Voting data
async function getData() {
  const res = await $.getJSON('https://node.noanus.com/ranking')
  var data = res
  return data
}

function generateRanking(id) {
  var pet = 
    '<li class="ranking-pet">' +
      '<div class="ranking-info">' +
        '<p class="ranking-number">' + id + '.</p>' +
        '<p class="ranking-name" id="' + id + '_name"></p>' +
      '</div>' +
      '<div class="ranking-bar-div">' +
        '<div class="ranking-bar ranking-bar-' + id + '" id="' + id + '_bar">' +
          '<p class="ranking-bar-count" id="' + id + '_count"></p>' +
        '</div>' +
      '</div>' +
    '</li>'
  list.append(pet)
}
function editRanking(id, name, votes, max){
  $('#' + id + '_name').text(name)
  $('#' + id + '_count').text(votes)
  width = (votes / max * 100)
  div = $(".ranking-bar-div").width()
  div = parseInt(div)
  width = (div - 60) * (votes / max)
  $('#' + id + '_bar').css("width", width + "px")
  // $('#' + id + '_bar').css("width", width + "%")
}