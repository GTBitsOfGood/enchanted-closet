export const loadAuthState = () => {
	try {
		const serializedAuth = localStorage.getItem('user');
		if (serializedAuth === null) {
			return undefined;
		}

		return JSON.parse(serializedAuth);
	} catch (e) {
		return undefined;
	}
}

export const saveAuthState = state => {
	try {
		const serializedAuth = JSON.stringify(state.user);
		localStorage.setItem('user', serializedAuth);
	} catch (err) {
		// Ignore errors
		console.log(err);
	}
}
