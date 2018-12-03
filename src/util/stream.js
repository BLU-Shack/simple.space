module.exports = (request, limit = 1048576) => {
	return new Promise((resolve, reject) => {
		if (!request.headers['content-type']) reject(411);
		let data = '';
		request.on('data', d => {
			if (Buffer.byteLength(data) > limit) {
				request.connection.abort();
				reject(413);
			}
			data += d;
		});

		request.once('error', reject);
		request.once('end', () => resolve(JSON.parse(data)));
	});
};