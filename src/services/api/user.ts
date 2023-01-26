onmessage = function(event: MessageEvent) {
	console.log('23')
	console.log(event)
	switch (event.data.type) {
		case 'GET': {
			//
		}
		case 'DELETE': {
			//
		}
		default: { // PUT
			//
		}
	}
	// this.postMessage('hi')
}
// _self.postMessage('hiii')

export default {};

// export {
// 	put_UserAccount
// }