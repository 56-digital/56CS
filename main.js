var words = ['New', 'site', 'under', 'construction']
var wordsEl = document.getElementById('words')
var wordInterval = 420
var imgInterval = 110
var wordIndex = -1
var imgIndex = 0
var run = void 0

var imgs = document.querySelectorAll('img')
var imgList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

var pics = document.getElementById('pics')

var rndInt = function rndInt (min, max) {
  return Math.floor(max - Math.random() * (max - min))
}

var setImgs = function setImgs () {
  var prefix = window.innerWidth >= 950 ? 'small' : 'tiny'

  imgs.forEach(function (img) {
    var i = rndInt(0, imgList.length)
    img.setAttribute('data-src', 'assets/' + prefix + '/' + imgList[i] + '.png')
    imgList.splice(i, 1)
  })

  loadImgs()
}

var loadImgs = function loadImgs () {
  imgs.forEach(function (img) {
    return img.setAttribute('src', img.getAttribute('data-src'))
  })
}

var conEl = document.getElementById('conclusion')

var conclusion = function conclusion () {
  conEl.classList.remove('dn')
}

var runImages = function runImages (el) {
  loop(pics, imgInterval, imgIndex, imgs, 'img', conclusion)
}

var finish = function finish (el) {
  clearInterval(run)
  el.classList.add('dn')
}

var loop = function loop (el, interval, index, list) {
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'text'
  var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false

  run = setInterval(function () {
    index < list.length - 1 ? index++ : clear()

    if (type === 'text') {
      el.innerText = list[index]
    } else {
      list.forEach(function (img) {
        return img.classList.add('op0')
      })
      list[index].classList.remove('op0')
    }
  }, interval)

  var clear = function clear () {
    clearInterval(run)
    finish(el)
    if (callback) callback()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setImgs()
  loop(wordsEl, wordInterval, wordIndex, words, 'text', runImages)
}, false)
