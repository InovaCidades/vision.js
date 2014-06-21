/*!
 * vision.js 0.1 r35
 * http://github.com/gabrielgfa/vision.js
 * MIT licensed
 *
 * Copyright (C) 2014 Gabriel Garcia, http://gabrielgfa.github.io
 */

video = document.getElementById('video');
canvas = document.getElementById('canvas');

_ = canvas.getContext('2d');
ccanvas = document.getElementById('comp');
c_ = ccanvas.getContext('2d');

var compression = 5;
var height = 0;
var width = 0;

function dump(){
	if(canvas.width!=video.videoWidth){
		width = Math.floor(video.videoWidth/compression);
		height = Math.floor(video.videoHeight/compression);
		canvas.width = ccanvas.width = width;
		canvas.height = ccanvas.height = height;
	}
	_.drawImage(video,width,0,-width,height);
	draw = _.getImageData(0,0,width,height);
}