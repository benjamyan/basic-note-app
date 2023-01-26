/**
 * https://www.npmjs.com/package/dompurify
 * https://www.npmjs.com/package/validator
 */
import * as utils from '../../utils';

async function post_authenticateCredentials({email, password}) {
	// console.log("ActonsHandler userLogin");
	const authUserLogin = (
		await fetch('/login', {
			method: 'POST',
			headers: {
				Accept: 'text/plain, application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email, 
				password: password
			})
		})
	);
	try {
		const authResponseHeaders = authUserLogin.headers.get("content-type");
		if (authResponseHeaders && authResponseHeaders.indexOf("application/json") !== -1) {
			return authUserLogin.json()
		} else {
			return authUserLogin.text()
		};
	} catch (err) {
		console.log(err)
		return err
	}
}
async function get_validateUserToken(givenToken: string) {
	try {
		if (typeof givenToken !== 'string') {
			throw utils.err('Given parameter must be typeof string');
		} else {
			const authUserLogin = (
				await fetch('/login', {
					method: 'GET',
					headers: {
						Accept: 'text/plain, application/json',
						'token': givenToken
					}
				})
			);
			const authResponseHeaders = authUserLogin.headers.get("content-type");
			if (authResponseHeaders && authResponseHeaders.indexOf("application/json") !== -1) {
				return authUserLogin.json()
			} else {
				return authUserLogin.text()
			};
		};
	} catch (err) {
		console.log(err)
		return err
	}
}
async function post_registerNewUser({email, password}) {
	try {
		const registrationRequest = (
			await fetch('/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email, 
					password: password
				})
			})
			.then((res)=> res.json())
			.catch((err)=> console.log(err))
		);
		const authResponseHeaders = registrationRequest.headers.get("content-type");
		if (authResponseHeaders && authResponseHeaders.indexOf("application/json") !== -1) {
			return registrationRequest.json()
		} else {
			return registrationRequest.text() 
			// return `818022 ${registrationRequest.text()}` 
		};
	} catch (err) {
		console.log(err);
		return err
	}
}

export default {
    post_authenticateCredentials,
	post_registerNewUser,
	get_validateUserToken
}