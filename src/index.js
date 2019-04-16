const init = () => {
  // create stylesheet
  const style = document.createElement('style')
  style.innerHTML = `
      .with-perspective {
        -webkit-perspective: 1000px;
        perspective: 1000px;
      }
    `

  // first script tag
  const ref = document.querySelector('script')

  // insert styles
  ref.parentNode.insertBefore(style, ref)

  // FIXME: this can probably be done in a better way
  const isMobile = () => navigator.userAgent
    .match(/Android/i) ||
    navigator.userAgent
      .match(/webOS/i) ||
    navigator.userAgent
      .match(/iPhone/i) ||
    navigator.userAgent
      .match(/iPad/i) ||
    navigator.userAgent
      .match(/iPod/i) ||
    navigator.userAgent
      .match(/BlackBerry/i) ||
    navigator.userAgent
      .match(/Windows Phone/i)

  const applyPerspectiveRotation = (el, x, y) => {
    el.style.transform = `
      rotateX(${x}deg) rotateY(${y}deg)
    `
  }

  const handleOrientationChange = ({ absolute, alpha, beta, gamma }) => {
    // TODO: apply perspective effect on all els with .with-perspective

    // arr of first children of els with .with-perspective
    const els = Array.from(document.getElementsByClassName('with-perspective')).map(el => el.children[0])

    // get device orientation
    const angleX = beta - 70
    const angleY = gamma / -3

    // HACK: avoids strange flip at 0
    if (angleX > 0) {
      // FIXME: avoid freeze
      return
    }

    els.forEach(el => applyPerspectiveRotation(el, angleX, angleY))
  }

  const handleMouseMove = (e) => {
    // mouse pos
    const { pageX, pageY } = e

    // arr of first children of els with .with-perspective
    const els = Array.from(document.getElementsByClassName('with-perspective')).map(el => el.children[0])
    els.forEach(el => {
      const elPos = el.getBoundingClientRect()
  
      // center of img
      const elX = elPos.left + (el.offsetWidth / 2)
      const elY = elPos.top + (el.offsetHeight / 2)
  
      // offset from mouse pos
      const angleX = (elY - pageY) / 25
      const angleY = (elX - pageX) / -25
  
      applyPerspectiveRotation(el, angleX, angleY)
    })
  }

  if (isMobile()) {
    window.addEventListener('deviceorientation', handleOrientationChange, true)
  } else {
    document.addEventListener('mousemove', handleMouseMove, true)
  }
}

window.onload = () => {
  init()
}
