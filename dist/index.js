'use strict';

// FIXME: this can probably be done in a better way
var isMobile = function isMobile() {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
};

var applyPerspectiveRotation = function applyPerspectiveRotation(el, x, y) {
  el.style.transform = '\n    rotateX(' + x + 'deg) rotateY(' + y + 'deg)\n  ';
};

var handleOrientationChange = function handleOrientationChange(_ref) {
  var absolute = _ref.absolute,
      alpha = _ref.alpha,
      beta = _ref.beta,
      gamma = _ref.gamma;

  // TODO: apply perspective effect on all els with .with-perspective

  // first child of #with-perspective
  var el = document.getElementById('with-perspective').children[0];

  // get device orientation
  var angleX = beta - 70;
  var angleY = gamma / -3;

  // HACK: avoids strange flip at 0
  if (angleX > 0) {
    // FIXME: avoid freeze
    return;
  }

  applyPerspectiveRotation(el, angleX, angleY);
};

var handleMouseMove = function handleMouseMove(e) {
  // mouse pos
  var pageX = e.pageX,
      pageY = e.pageY;

  // first child of #with-perspective

  var el = document.getElementById('with-perspective').children[0];
  var elPos = el.getBoundingClientRect();

  // center of img
  var elX = elPos.left + el.offsetWidth / 2;
  var elY = elPos.top + el.offsetHeight / 2;

  // offset from mouse pos
  var angleX = (elY - pageY) / 25;
  var angleY = (elX - pageX) / -25;

  applyPerspectiveRotation(el, angleX, angleY);
};

if (isMobile()) {
  window.addEventListener('deviceorientation', handleOrientationChange, true);
} else {
  document.addEventListener('mousemove', handleMouseMove, true);
}
