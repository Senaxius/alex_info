var pet_name = $(".petname")
var info_input_1 = $('.info_input_1')
var info_input_2 = $('.info_input_2')
var info_input_3 = $('.info_input_3')
var person_name = $('.person_name')
var preview_pic = $('.preview_pic')
var pic_upload = $('.pic_upload')
var pic_upload_style = $('.pic_upload_style')
var picture_selected = 0

// Live Preview Text
$( "#pet_name" ).keyup(function() {
  $('#preview_name').html($(this).val())
  if ($(this).val() == "") {
    $('#preview_name').html(" - ")
  }
})
$( "#info_input_1" ).keyup(function() {
  $('#info_preview_1').html(" - " + $(this).val())
});
$( "#info_input_2" ).keyup(function() {
  $('#info_preview_2').html(" - " + $(this).val())
});
$( "#info_input_3" ).keyup(function() {
  $('#info_preview_3').html(" - " + $(this).val())
});

// Live Preview Bild
var loadFile = function (event) {
  var img = URL.createObjectURL(event.target.files[0])
  $("#preview_pic").attr("src", img)
  $("#pic_upload_style").css("borderColor", "var(--valid)")
  picture_selected = 1
}

// upload to server
$("#form").submit(async function(event) {
  // prevent auto refresh
  event.preventDefault()

  // check if picture was selected
  if (picture_selected == 0){
    window.alert("Es muss ein Bild ausgewählt sein")
    return
  }

  // store values from input
  const data = {
    tiername: $('#pet_name').val(),
    info_1:   $('#info_input_1').val(),
    info_2:   $('#info_input_2').val(),
    info_3:   $('#info_input_3').val(),
    absender: $('#person_name').val(),
  }
  console.log(data)
  const image = $("#pic_upload").prop('files')[0];
  // image compression
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }
  try {
    var compressed_image = await imageCompression(image, options);
  } catch (error) {
    var compressed_image = image;
  }


  // input auf möglich lennart überprüfen :|
  for (const i in data){
    console.log(data[i])
    let test = data[i].includes("<")
    let test2 = data[i].includes("*")
    let test3 = data[i].includes("SELECT")
    if (test == true || test2 == true || test3 == true){
      window.alert("Lennart, du überlebst diesen tag nicht weiter wenn du versucht hier html rein zu hauen")
      return
    }
  }

  // create formdata
  const formData = new FormData()
  formData.append('pet_image', compressed_image)
  formData.append('tiername', data.tiername)
  formData.append('info_1', data.info_1)
  formData.append('info_2', data.info_2)
  formData.append('info_3', data.info_3)
  formData.append('absender', data.absender)

  // upload formdata to server
  console.log(formData)
  let response = await fetch('https://node.noanus.com/upload', {
    method: 'POST',
    body: formData
  })
    .then(function (response) {
      //handle success
      console.log(response);
      window.alert("Dein Tier wurde erfolgreich eingetragen!")
      window.location = "https://minor.pw/vote.html";
    })
    .catch(function (response) {
      //handle error
      console.log(response);
      window.alert("Irgendwas hat nicht funktioniert, fuck")
    });
})
