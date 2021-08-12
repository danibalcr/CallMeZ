const contentVideo = document.getElementById("video-container");
const btnStartCall = document.getElementById("create-connection");
const constraintsGobal = { video: true, audio: false };
// Se crea la Conexion de Par.
const peer = new Peer();

peer.on("open", function (id) {
  document.getElementById("id-text").innerHTML = `<span>My peer ID is: </span><b>${id}</b>`;
});

btnStartCall.addEventListener("click", async function () {
  const idOtherConecction = prompt("Ingresar el ID del Contacto");
  await startCall(idOtherConecction, constraintsGobal);
});

peer.on("call", async function (call) {
  await receivedCall(call, constraintsGobal);
});

async function startCall(idOtherConecction, constraints) {
  // Obtiene el Medio del Usuario.
  const mediaStream = await getMediaStream(constraints);
  // Crea la Llamada al otro Par.
  const call = peer.call(idOtherConecction, mediaStream);
  // Crea el Elemento de Video
  createVideoElement(mediaStream);
  // Muestra las Conexiones a este Par.
  console.log(peer.connections);
  //Recibe el Media Stream Remoto como Argumento.
  call.on("stream", createVideoElement);
}
async function receivedCall(call, constraints) {
  // Obtiene el Medio del Usuario.
  const mediaStream = await getMediaStream(constraints);
  // Respoonde a la Llamada del Otro Par.
  call.answer(mediaStream);
  // Crea el Elemento de Video
  createVideoElement(mediaStream);
  // Muestra las Conexiones a este Par.
  console.log(peer.connections);
  //Recibe el Media Stream Remoto como Argumento.
  call.on("stream", createVideoElement);
}
/**
 * Obtiene El Media Stream del Usuario.
 @return mediaStream: stream
*/
async function getMediaStream(constraints) {
  try {
    const getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia;
    return await getUserMedia(constraints);
  } catch (err) {
    console.log("Failed to get local stream", err);
  }
}
/**
 * Crea el Lienzo donde se mostrara el Elemento de Video.
*/
function createVideoElement(mediaStream) {
  var video = document.createElement("video");
  video.id = Math.round(Math.random() * 10 * Date.now());
  video.srcObject = mediaStream;
  video.autoplay = true;
  video.muted = false;
  contentVideo.appendChild(video);
  video = "";
}