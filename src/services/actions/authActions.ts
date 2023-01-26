/*#region -- Auth actions */
// const _auth = {
//     setLocalToken = (givenToken: string): void => {
//         try {
//             Local.add('access_token', givenToken);
//             setModuleToken(givenToken)
//         } catch (err) {
//             console.log(err)
//             return err;
//         }
//     },
//     removeLocalToken = (): void => {
//         try {
//             Local.remove('access_token');
//             setModuleToken('');
//         } catch (err) {
//             console.log(err)
//             return err;
//         }
//     }
// };

// async function getCurrentUser() {
// 	/**
// 	 * Search the localStorage for a token
// 	 * 
// 	 * @if token is present
// 	 * > @return validation API result
// 	 * @else 
// 	 * > @return null
// 	 * 
// 	 */
// 	try {
// 		const localToken = Local.exists('access_token');
// 		if (!!localToken) {
// 			/**
// 			 * @if validation passed
// 			 * > @return result
// 			 * @else
// 			 * > @return flag to prompt login with email
// 			 */
// 			// console.log(localToken)
// 			const validation = await Auth.get_validateUserToken(localToken);
// 			if (typeof validation === 'object' && validation.complete) {
// 				setModuleToken(localToken);
// 			}
// 			return validation;
// 		}
// 		return false;
// 	} catch (err) {
// 		console.log(err)
// 		return false;
// 	}
// }
// async function authenticateUser({email, password}) {
// 	try {
// 		const authResult = (
// 			await Auth.post_authenticateCredentials({ email, password })
// 		);
// 		if (typeof authResult === 'string') {
// 			throw utils.err(authResult);
// 		} else if (authResult instanceof Error) {
// 			throw authResult;
// 		} else {
// 			if (!!authResult.token) {
// 				_auth.setLocalToken(authResult.token);
// 				_token.access = authResult.token;
// 				if (authResult.theme) {
// 					// set the local client theme
// 				};
// 				if (authResult.username) {
// 					// pass the username to client
// 				};
// 			} else {
// 				throw utils.err('An unknown error occured during validation. Please try again.');
// 			};
// 		};
// 		return true;
// 	} catch (err) {
// 		console.log(err)
// 		if (err.__internal__) {
// 			return err;
// 		};
// 		return utils.err('An unknown error occured.');
// 	}
// }
// async function registerNewUser({email, password}) {
// 	console.log("ActionsHandler registerNewUser")
// 	const registerResult = (
// 		await Auth.post_registerNewUser({ email, password })
// 	);
// 	return registerResult
// }
// async function logoutCurrentUser() {
// 	/**
// 	 * Remove token from local storage
// 	 * Pass that token to a blacklist
// 	 */
// 	removeLocalToken();
// 	return true;
// }
/*#endregion*/

export default {}