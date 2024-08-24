export async function downscaleImage (dataUrl, newWidth, imageType, imageArguments) {
  'use strict'
  var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl

  // Provide default values
  imageType = imageType || 'image/jpeg'
  imageArguments = imageArguments || 0.7

  // Create a temporary image so that we can compute the height of the downscaled image.
  image = await getImage(dataUrl)
  if (image.width > newWidth) {
    oldWidth = image.width
    oldHeight = image.height
    newHeight = Math.floor((oldHeight / oldWidth) * newWidth)
  } else {
    newWidth = image.width
    newHeight = image.height
  }

  // Create a temporary canvas to draw the downscaled image on.
  canvas = document.createElement('canvas')
  canvas.width = newWidth
  canvas.height = newHeight
  ctx = canvas.getContext('2d')

  // Draw the downscaled image on the canvas and return the new data URL.
  ctx.drawImage(image, 0, 0, newWidth, newHeight)
  newDataUrl = canvas.toDataURL(imageType, imageArguments)
  return newDataUrl
}

function getImage (url) {
  return new Promise(function (resolve, reject) {
    var img = new Image()
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(false)
    }
    img.src = url
  })
}
