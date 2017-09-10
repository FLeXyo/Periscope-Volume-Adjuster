// ==UserScript==
// @name         Periscope Volume Adjuster
// @namespace    http://github.com/FLeXyo
// @version      0.2
// @description  Allows you to adjust the volume of Periscope streams
// @author       FLeX
// @include        *://www.periscope.tv/*
// @include        *://www.pscp.tv/*
// @grant        none
// @run-at document-idle
// ==/UserScript==
(function()
{
  'use strict';
  var overlayBarLeft;
  var volumeSliderContainer = document.createElement("div");
  volumeSliderContainer.class = "VolumeSliderContainer";
  var slider = document.createElement("input");
  slider.id = "volumeSlider";
  slider.type = "range";
  slider.min = 0;
  slider.max = 1;
  slider.value = 1;
  slider.class = "slider";
  slider.step = 0.1;
  slider.oninput = function()
  {
    for (var i = 0; i < document.getElementsByTagName("video").length; i++) { document.getElementsByTagName("video")[i].volume = slider.value; }
  }
  volumeSliderContainer.appendChild(slider);

  var checkPageLoadInterval = setInterval(function()
  {
    overlayBarLeft = document.getElementsByClassName("VideoOverlayRedesign-BottomBar-Left")[0];
    overlayBarLeft.appendChild(volumeSliderContainer);
    if (overlayBarLeft !== undefined)
    {
      document.getElementsByClassName("HeartsContainer")[0].outerHTML=""; //Remove hearts
      clearInterval(checkPageLoadInterval);
    }
  }, 1000);

})();
