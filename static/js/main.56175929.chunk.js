(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,function(e,t,n){e.exports=n.p+"static/media/clock-ticking-sound.453d2b1c.mp3"},,function(e,t,n){e.exports=n(16)},,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(2),l=n.n(r),s=(n(14),n(4)),o=n(3),u=n.n(o),i=function(e,t,n){var a=new Date,c=30*a.getHours(),r=6*a.getMinutes(),l=6*a.getSeconds();(e.current||t.current||n.current)&&(e.current.style.transform="rotate(".concat(c+r/12,"deg)"),t.current.style.transform="rotate(".concat(r,"deg)"),n.current.style.transform="rotate(".concat(l,"deg)"))};n(15);var m=function(){var e=Object(a.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1],l=Object(a.useRef)(null),o=Object(a.useRef)(null),m=Object(a.useRef)(null),d=Object(a.useRef)(null);return Object(a.useEffect)(function(){i(o,m,d),r(!0);var e=setInterval(function(){return i(o,m,d)},1e3);return function(){return clearInterval(e)}},[]),c.a.createElement("div",{className:"App"},c.a.createElement("div",{className:"container"}," ",c.a.createElement("div",{className:"circle"}),c.a.createElement("div",{className:"circle"}),c.a.createElement("div",{className:"clock"},new Array(60).fill("").map(function(e,t){var n="rotate(".concat(6*(t+1),"deg)");return c.a.createElement("div",{key:t,className:"graduations",style:{transform:n}},c.a.createElement("div",{className:"stick"}))}),c.a.createElement("div",{className:"indicator"},c.a.createElement("div",{ref:o,className:"hand hour"}),c.a.createElement("div",{ref:m,className:"hand minute"}),c.a.createElement("div",{ref:d,className:"hand second"})))),c.a.createElement("audio",{ref:l,src:u.a,autoPlay:n}))},d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then(function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,l=t.getTTFB;n(e),a(e),c(e),r(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(m,null))),d()}],[[5,1,2]]]);
//# sourceMappingURL=main.56175929.chunk.js.map