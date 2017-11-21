const words = ['New', 'site', 'under', 'construction']
const wordsEl = document.getElementById('words')
const wordInterval = 420
const imgInterval = 110
let wordIndex = -1
let imgIndex = 0
let run

const imgs = document.querySelectorAll('img')
let imgList = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
]

const pics = document.getElementById('pics')

const rndInt = (min, max) => {
  return Math.floor(max - Math.random() * (max - min))
}

const setImgs = () => {
  let prefix = window.innerWidth >= 950 ? 'small' : 'tiny'

  imgs.forEach(img => {
    let i = rndInt(0, imgList.length)
    img.setAttribute('data-src', `assets/${prefix}/${imgList[i]}.png`)
    imgList.splice(i, 1)
  })

  loadImgs()
}

const loadImgs = () => {
  imgs.forEach(img => img.setAttribute('src', img.getAttribute('data-src')))
}

const conEl = document.getElementById('conclusion')

const conclusion = () => {
  conEl.classList.remove('dn')
}

const runImages = (el) => {
  loop(pics, imgInterval, imgIndex, imgs, 'img', conclusion)
}

const finish = el => {
  clearInterval(run)
  el.classList.add('dn')
}

const loop = (el, interval, index, list, type = 'text', callback = false) => {
  run = setInterval(() => {
    index < list.length - 1 ? index++ : clear()

    if (type === 'text') {
      el.innerText = list[index]
    } else {
      list.forEach(img => img.classList.add('op0'))
      list[index].classList.remove('op0')
    }
  }, interval)

  const clear = () => {
    clearInterval(run)
    finish(el)
    if (callback) callback()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setImgs()
  loop(wordsEl, wordInterval, wordIndex, words, 'text', runImages)
}, false)
