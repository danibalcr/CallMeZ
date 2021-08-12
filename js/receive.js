const currentVideo = document.getElementById("video-current");
const remoteVideo = document.getElementById("video-remote");

var peer = new Peer("id-receive");

peer.on("open", function (id) {
  document.getElementById("id-text").innerHTML = `My peer ID is: <b>${id}</b>`;
});

peer.on("call", function (call) {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(
    { video: { width: 720, height: 360 }, audio: false },
    function (mediaStream) {
      currentVideo.srcObject = mediaStream;

      // Answer the call, providing our mediaStream
      call.answer(mediaStream);

      call.on("stream", function (remoteStream) {
        remoteVideo.srcObject = remoteStream;
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});
