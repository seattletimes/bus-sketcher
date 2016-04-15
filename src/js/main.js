require("./lib/social");
require("./lib/ads");
// var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var flip = require("./lib/flip");
var closest = require("./lib/closest");

var playing = null;

var playVideo = function(v) {
  v.currentTime = 0;
  v.play();
  closest(v, ".video-container").classList.add("playing");
};

var stopVideo = function(v) {
  v.pause();
  closest(v, ".video-container").classList.remove("playing");
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

$(".sketch").forEach(el => el.addEventListener("click", onClickVideo));