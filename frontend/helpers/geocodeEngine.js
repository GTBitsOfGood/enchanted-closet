export function geocode(address) {
	return new Promise((resolve, reject) => {
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API}`, {
			headers: {
				'Accept': 'application/json'
			}
		})
		.then(response => response.json())
		.then(json => {
			if (json && json.results && json.results.length > 0 && json.results[0] && json.results[0].geometry) {
				return resolve(json.results[0].geometry.location);
			} else {
				return reject(new Error('Address Not Found'));
			}
		})
		.catch(e => reject(e));
	});
}
