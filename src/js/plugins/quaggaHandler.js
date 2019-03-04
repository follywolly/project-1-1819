class Scanner {
  constructor() {
    // Create the QuaggaJS config object for the live stream
    this.liveStreamConfig = {
    		inputStream: {
    			type : 'LiveStream',
    			constraints: {
    				width: {min: 640},
    				height: {min: 480},
    				aspectRatio: {min: 1, max: 100},
    				facingMode: 'environment' // or 'user' for the front camera
    			}
    		},
    		locator: {
    			patchSize: 'medium',
    			halfSample: true
    		},
    		numOfWorkers: (navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4),
    		decoder: {
    			'readers':[
    				{'format':'ean_reader','config':{}}
    			]
    		},
    		locate: true
    	}
    // The fallback to the file API requires a different inputStream option.
    // The rest is the same
    this.fileConfig = Object.assign(
    	{},
    	liveStreamConfig,
    	{
    		inputStream: {
    			size: 800
    		}
    	}
    )
  }
}

// Make sure, QuaggaJS draws frames an lines around possible
// barcodes on the live stream
Quagga.onProcessed(result => {
	const drawingCtx = Quagga.canvas.ctx.overlay,
		drawingCanvas = Quagga.canvas.dom.overlay

	if (result) {
		if (result.boxes) {
			drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width')), parseInt(drawingCanvas.getAttribute('height')))
			result.boxes.filter(function (box) {
				return box !== result.box
			}).forEach(function (box) {
				Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: 'green', lineWidth: 2})
			})
		}

		if (result.box) {
			Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: '#00F', lineWidth: 2})
		}

		if (result.codeResult && result.codeResult.code) {
			Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3})
		}
	}
})

// Once a barcode had been read successfully, stop quagga and
// close the modal after a second to let the user notice where
// the barcode had actually been found.
Quagga.onDetected(result => {
	if (result.codeResult.code){
		document.querySelector('#scanner__output').innerText = result.codeResult.code
		Quagga.stop()
		setTimeout(() => { document.querySelector('#scanner__modal').classList.remove('active') }, 1000)
	}
})

// Call Quagga.decodeSingle() for every file selected in the
// file input
// $('#livestream_scanner input:file').on('change', (e) => {
// 	if (e.target.files && e.target.files.length) {
// 		Quagga.decodeSingle($.extend({}, fileConfig, {src: URL.createObjectURL(e.target.files[0])}), function(result) {alert(result.codeResult.code)})
// 	}
// })

export {liveStreamConfig, fileConfig}
