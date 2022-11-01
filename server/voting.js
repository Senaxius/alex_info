const mariadb = require('mariadb')
var app = require('./server');

// pet api
module.exports = app.get('/getpet', (req, res) => {
  json = getPets().then((json) => {
    test = JSON.parse(json)
    res.status(200).send(json)
  })
})
/*-----------send Votes----------*/
module.exports = app.post('/sendVote', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(ip + ": new Vote")

  var votes = req.body
  if (Object.values(votes).includes(0) == true) {
    console.log("votes not valid")
    res.send("Wahl ist nicht valide")
    return
  }
  // get input
  console.log(req)
  console.log(req.body)
  first = req.body.first
  second = req.body.second
  third = req.body.third
  console.log(first)
  console.log(second)
  console.log(third)

  // add votes to db
  sendVotes(first, "first")
  sendVotes(second, "second")
  sendVotes(third, "third")
  
  res.status(200).send("Wahl erfolgreich abgegeben")
})


//mariadb config
const server = mariadb.createPool({
  host: 'noanus.com',
  port: 41998,
  user: 'gntp',
  database: 'gntp',
  password: 'martin_marcynski_buehlow',
  connectionLimit: 5
})


// insert data into DB
async function sendVotes(id, place) {
  let conn
  conn = await server.getConnection()
  var votes = 0
  if (place == "first") { votes = 3}
  if (place == "second") { votes = 2}
  if (place == "third") { votes = 1}
  const res = await conn.query("UPDATE tiere SET stimmen = `stimmen` + ? WHERE ID = ? ", [votes, id])
  conn.end()
  return
}

// get pets from db
async function getPets() {
  let conn
  var array = []
  conn = await server.getConnection()
  const res = await conn.query("SELECT * FROM tiere")
  var length = Object.keys(res).length - 1
  for (let i = 0; i < length; i++) {
    array.push(res[i])
  }
  var json = JSON.stringify(array)
  conn.end()
  return json
}