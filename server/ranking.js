const mariadb = require('mariadb')
var app = require('./server');

// ranking data api
module.exports = app.get('/ranking', (req, res) => {
  json = getVotes().then((json) => {
    test = JSON.parse(json)
    res.status(200).send(json)
  })
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

// get votes from db
async function getVotes() {
  let conn
  var array = []
  conn = await server.getConnection()
  const res = await conn.query("SELECT * FROM `tiere` ORDER BY Stimmen DESC")
  var length = Object.keys(res).length - 1
  for (let i = 0; i < length; i++) {
    array.push(res[i])
  }
  var json = JSON.stringify(array)
  conn.end()
  return json
}