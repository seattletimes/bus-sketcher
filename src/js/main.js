require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var flip = require("./lib/flip");
var closest = require("./lib/closest");
var debounce = require("./lib/debounce");

var playing = null;

var playVideo = function(v) {
  v.currentTime = 0;
  v.play();
  closest(v, ".video-container").classList.add("playing", "show-spinner");
};

var stopVideo = function(v) {
  v.pause();
  closest(v, ".video-container").classList.remove("playing", "show-spinner");
};

var onClickVideo = function(e) {
  e.stopPropagation();
  var v = this.querySelector("video");
  if (playing && playing != v) {
    stopVideo(playing);
  }
  var self = playing = v;
  if (v.paused) {
    playVideo(v);
  } else {
    stopVideo(v);
  }
};

var onEnded = function(e) {
  playing = null;
  closest(e.target, ".video-container").classList.remove("show-spinner");
};

const SPIN_SIZE = 8;

var updateSpinner = function(e) {
  var ratio = 1 - (e.target.currentTime / e.target.duration);
  if (ratio == 1) ration = .99
  this.clearRect(0, 0, 100, 100);
  if (ratio == 0) return;
  this.beginPath();
  this.arc(SPIN_SIZE, SPIN_SIZE, SPIN_SIZE * .75, Math.PI * 1.5, Math.PI * ratio * 2 - Math.PI * .5);
  this.strokeStyle = "#446";
  this.lineWidth = 4;
  this.stroke();
};

$(".sketch").forEach(function(el) {
  el.addEventListener("click", onClickVideo);
  var video = el.querySelector("video");
  video.addEventListener("ended", onEnded);
  var canvas = el.querySelector(".spinner");
  var context = canvas.getContext("2d");
  context.fillStyle = "#446"
  video.addEventListener("timeupdate", debounce(updateSpinner.bind(context)));
});