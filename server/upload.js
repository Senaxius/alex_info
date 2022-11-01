const mariadb = require('mariadb')
var app = require('./server');

module.exports = app.post('/upload', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // get input
    const tiername = req.body.tiername
    const info_1 = req.body.info_1
    const info_2 = req.body.info_2
    const info_3 = req.body.info_3
    const absender = req.body.absender
    const image = req.files.pet_image
    // get uniqe id from database
    id = getID().then((id) => {
      // print input
      console.log(ip + ": new Pet uploaded")
      console.log("new pet was uploaded: " + id + ": " + tiername)
      console.log("\nReceived new input:")
      console.log("ID:        " + id)
      console.log("Tiername:  " + tiername)
      console.log("Info 1:    " + info_1)
      console.log("Info 2:    " + info_2)
      console.log("Info 3:    " + info_3)
      console.log("Absender:  " + absender)

      // saving picture with unique id
      const filename = req.files.pet_image.name
      const ending = filename.substr(filename.lastIndexOf('.'))
      const img_name = id + ending
      const path = __dirname + '/../tiere/' + img_name
      image.mv(path)
      // sending data to db
      sendDB(id, tiername, info_1, info_2, info_3, absender, img_name)

      // trigger update event for every client
      // emitter.emit("upload", id)
    })
    res.status(200).send({ status: 'received' })
  })

const server = mariadb.createPool({
  host: 'noanus.com',
  port: 41998,
  user: 'gntp',
  database: 'gntp',
  password: 'martin_marcynski_buehlow',
  connectionLimit: 5
})

// get uniquq database id
async function getID() {
  let conn
  conn = await server.getConnection()
  var id = 1
  var res
  while (true) {
    res = await conn.query("SELECT * FROM tiere WHERE ID=?;", id)
    if (res[0] == null) {
      break
    }
    id++
  }
  conn.end()
  return id
}

async function sendDB(id, tiername, info_1, info_2, info_3, absender, img) {
  let conn
  conn = await server.getConnection()
  const res = await conn.query("INSERT INTO tiere (ID, Name, Info_1, Info_2, Info_3, Absender, img, stimmen) value (?, ?, ?, ?, ?, ?, ?, ?)", [id, tiername, info_1, info_2, info_3, absender, img, 0])
  conn.end()
  return
}