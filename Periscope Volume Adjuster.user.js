// ==UserScript==
// @name         Periscope Volume Adjuster
// @namespace    http://github.com/FLeXyo
// @version      0.1
// @description  Allows you to adjust the volume of Periscope streams
// @author       FLeX
// @match        https://www.periscope.tv/*
// @grant        none
// @run-at document-idle
// ==/UserScript==
(function()
 {
    'use strict';
    var buttonDiv;
    var checkPageLoadInterval = setInterval(function()
                                            { buttonDiv = document.getElementsByClassName("GetAppCTA")[0]; var volumeButtonContainer = document.createElement("div");
                                             volumeButtonContainer.className = "AppLink VolumeButtonContainer";
                                             volumeButtonContainer.innerHTML = "<span>Volume</span><br/>";
                                             for (var i = 1; i < 11; i++)
                                             {
                                                 (function(i){
                                                     var volButton = document.createElement('button');
                                                     volButton.id = "volButton" + i;
                                                     volButton.addEventListener("click", function(){document.getElementById('PeriscopeVideoqb').volume = (i * 0.1);}, false);
                                                     volButton.innerText = Math.round( (i * 0.1) * 10 ) / 10;
                                                     volumeButtonContainer.appendChild(volButton);
                                                 }(i));

                                             }
                                             buttonDiv.appendChild(volumeButtonContainer);
                                             if (buttonDiv !== undefined)
                                             {
                                                 clearInterval(checkPageLoadInterval);
                                             }
                                            }, 1000);

})();
