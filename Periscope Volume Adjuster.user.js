// ==UserScript==
// @name		Periscope Volume Adjuster
// @namespace	http://github.com/FLeXyo
// @version		0.3
// @description	Allows you to adjust the volume of Periscope streams
// @author		FLeX
// @include		*://www.periscope.tv/*
// @include		*://www.pscp.tv/*
// @run-at		document-idle
// @grant		none
// ==/UserScript==
(function () {
	'use strict';
	var overlayBarLeft;
	var volumeSliderContainer = document.createElement("div");
	volumeSliderContainer.class = "VolumeSliderContainer";
	var slider = document.createElement("input");
	slider.id = "volumeSlider";
	slider.type = "range";
	slider.min = 0;
	slider.max = 1;

	slider.class = "slider";
	slider.step = 0.01;

	slider.oninput = function () {
		setVideoVolume(slider.value);
	}

	var checkPageLoadInterval = setInterval(function () {
		if (document.getElementById("volumeSlider") === null)
		{
			volumeSliderContainer.appendChild(slider);			
			overlayBarLeft = document.getElementsByClassName("VideoOverlayRedesign-BottomBar-Left")[0];
			if (overlayBarLeft !== undefined)
			{
				overlayBarLeft.appendChild(volumeSliderContainer);
				var volume = localStorage.getItem("flexyo_pva_volume");
				if (volume === null) slider.value = 1
				else slider.value = volume;
				setVideoVolume(slider.value);
				document.getElementsByClassName("HeartsContainer")[0].outerHTML = ""; //Remove hearts
				document.getElementsByClassName("VideoOverlayRedesign-BackgroundGradient")[0].remove(); //Somebody thought it was a good idea to have an overlay displayed at all times over the video.
			}
		}
	}, 1000);

	function setVideoVolume(volume) {
		for (var i = 0; i < document.getElementsByTagName("video").length; i++) { document.getElementsByTagName("video")[i].volume = volume; }
		localStorage.setItem("flexyo_pva_volume", slider.value);	
	}

})();
