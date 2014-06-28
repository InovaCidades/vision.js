/*!
 * vision.js 0.1 r35
 * http://github.com/gabrielgfa/vision.js
 * MIT licensed
 *
 * Copyright (C) 2014 Gabriel Garcia, http://gabrielgfa.github.io
 */

video = document.getElementById('video');
canvas = document.getElementById('canvas');

canvas = canvas.getContext('2d');
ccanvas = document.getElementById('comp');
c_ = ccanvas.getContext('2d');

navigator.webkitGetUserMedia({audio:true,video:true},function(stream){
	s = stream;
	video.src = window.webkitURL.createObjectURL(stream);
	video.addEventListener('play',
		function(){setInterval(dump,1000/25)}
	);
},function() {
	console.log('Denied.');
});

var compression = 5;
var height = 0;
var width = 0;

function dump() {
	if(canvas.width!=video.videoWidth){
		width = Math.floor(video.videoWidth/compression);
		height = Math.floor(video.videoHeight/compression);
		canvas.width = ccanvas.width = width;
		canvas.height = ccanvas.height = height;
	}
	canvas.drawImage(video,width,0,-width,height);
	draw = canvas.getImageData(0,0,width,height);
}

function skinfilter() {

	var skin_filter = canvas.getImageData(0,0,width,height);
	var total_pixels = skin_filter.width * skin_filter.height;
	var index_value = total_pixels * 4;


	var count_data_big_array = 0;
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {

			index_value = x+y*width
			r = draw.data[count_data_big_array]
            g = draw.data[count_data_big_array+1]
            b = draw.data[count_data_big_array+2]
            a = draw.data[count_data_big_array+3]

            hsv = rgb2Hsv(r,g,b);
            
            if(((hsv[0] > huemin && hsv[0] < huemax)||(hsv[0] > 0.59 && hsv[0] < 1.0))&&(hsv[1] > satmin && hsv[1] < satmax)&&(hsv[2] > valmin && hsv[2] < valmax)){

	       		skin_filter[count_data_big_array]= r;
				skin_filter[count_data_big_array+1]= g;
				skin_filter[count_data_big_array+2]= b;
				skin_filter[count_data_big_array+3]= a;
	        	} else {

	        	skin_filter.data[count_data_big_array] = 0;
				skin_filter.data[count_data_big_array+1] = 0;
				skin_filter.data[count_data_big_array+2] = 0;
				skin_filter.data[count_data_big_array+3] = 0;
	        	}

            		count_data_big_array=index_value*4;
		}
	}
}

/**
*
*
* Color space transforms.
*
*
*/

function RGBToHSL(r, g, b) {
	
	var min = Math.min(r, g, b),
	var max = Math.max(r, g, b),
	diff = max - min,
	h = 0, s = 0, l = (min + max) / 2;
 
	if (diff != 0) {
		s = l < 0.5 ? diff / (max + min) : diff / (2 - max - min);
 
		h = (r == max ? (g - b) / diff : g == max ? 2 + (b - r) / diff : 4 + (r - g) / diff) * 60;
	}
 
	return [h, s, l];
}


function RGBToHSV(r, g, b) {
	
    r = r/255
    g = g/255
    b = b/255;

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b);

    var h, s, v = max;

    var d = max - min;

    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0;
    }else{

        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
    	}
   		h /= 6;
   	}

    return [h, s, v];
}