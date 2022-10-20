export default {
	async fetch(request) {
		try {
			const { readable, writable } = new TransformStream()
			const writer = writable.getWriter()
			writer.ready
				.then(() => {
					console.log('writing')
					const byteArray = new TextEncoder().encode('Hello streaming world!\r\n\r\nMy-Trailed-Header: hellooooo')
					return writer.write(byteArray)
				})
				.then(() => {
					console.log('closing')
					return writer.close()
				})
				.then(() => {
					console.log('chunks written')
				})
				.catch(error => {
					console.log('error while writing:', error)
				})

			const headers = new Headers()
			headers.append('My-Normal-Header', 'up here at the top')
			headers.append('Trailer', 'My-Trailed-Header')
			return new Response(readable, { headers })
		} catch (e) {
			return new Response(JSON.stringify({
				name: e.name,
				message: e.message,
				stack: e.stack,
			}), { headers: { 'content-type': 'application/json' } })
		}
	},
}

