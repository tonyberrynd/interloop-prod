angular.module("coil.loginCtrl",[]).controller("loginCtrl",function(o){function n(o){for(var n=0,t=r.length;n<t;n++)r[n].id=o.pop()}function t(){for(var o=[],n=0;n<e;++n)o[n]=n;return a(o)}function a(o){var n,t,a=o.length;if(a)for(;--a;)t=Math.floor(Math.random()*(a+1)),n=o[t],o[t]=o[a],o[a]=n;return o}o.data={},o.myInterval=15e3,o.noWrapSlides=!1,o.active=0;var r=o.slides=[],e=0;o.addSlide=function(){var o=600+r.length+1;r.push({image:"//unsplash.it/"+o+"/300",text:["Nice image","Awesome photograph","That is so cool","I love that"][r.length%4],id:e++})},o.randomize=function(){n(t())};for(var i=0;i<3;i++)o.addSlide()});