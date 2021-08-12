const peer = new Peer();

const contentVideo = document.getElementById("video-container");

peer.on("open", function (id) {
  document.getElementById("id-text").innerHTML = `<span>My peer ID is: </span><b>${id}</b>`;
});

const btnConn = document.getElementById("create-connection");

btnConn.addEventListener('click', function() {
  const idOtherConecction = prompt("Ingresar el ID del Contacto");
  const getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(
    { video: true, audio: true },
    function (mediaStream) {
      const call = peer.call(idOtherConecction, mediaStream);
      createVideoElement(mediaStream);

      call.on("stream", function (remoteStream) {
        createVideoElement(remoteStream);
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
})

function createVideoElement(mediaStream) {
  var video = document.createElement("video");
  video.id = Math.round(Math.random() * 10 * Date.now());
  video.srcObject = mediaStream;
  video.autoplay = true;
  video.muted = false;
  contentVideo.appendChild(video);
  video = "";
}