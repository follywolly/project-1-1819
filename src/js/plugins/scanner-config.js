/*global: Quagga*/

const config = {}
// Create the QuaggaJS config object for the live stream
config.liveStream = {
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
config.file = Object.assign(
	{},
	config.liveStream,
	{
		inputStream: {
			size: 800
		}
	}
)


// Once a barcode had been read successfully, stop quagga and
// close the modal after a second to let the user notice where
// the barcode had actually been found.


// Call Quagga.decodeSingle() for every file selected in the
// file input
// $('#livestream_scanner input:file').on('change', (e) => {
// 	if (e.target.files && e.target.files.length) {
// 		Quagga.decodeSingle($.extend({}, fileConfig, {src: URL.createObjectURL(e.target.files[0])}), function(result) {alert(result.codeResult.code)})
// 	}
// })

export default config
