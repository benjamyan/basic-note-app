/**
 * This files purpose is to act a mediator/router between our client and 
 * our workers.
 */

import Auth from './api/auth';
import Notes from './api/notes';

import NoteActions from './actions/noteActions'
// import User from './user.service';

// const Auth = require('./auth.service');
// const User = require('./user.service');
// const Notes = require('./notes.service');

// import * as Local from './localStorage.helpers';
const Local = require('./storage/localStorage.helpers').default;
const ContentFormatting = require('./events/contentFormatting').default;
const utils = require('../utils');

interface ActionModule {
	token: TokenHolder
};
let _self: ActionModule = {
	token: {}
};

/*#region -- Token storage */
interface TokenHolder {
	access?: string,
	// refresh?: string
	// setToken?: ()=> void
};
const _token: TokenHolder = _self.token;
const setModuleToken = (givenToken: string): void => {
	if (!!givenToken) {
		_self.token.access = givenToken;
	} else {
		delete _self.token.access;
	}
};
/*#endregion*/

/*#region -- Auth actions */
// _self.auth = {};
function setLocalToken(givenToken='') {
	try {
		Local.add('access_token', givenToken);
		setModuleToken(givenToken)
	} catch (err) {
		console.log(err)
		return err;
	}
}
function removeLocalToken() {
	try {
		Local.remove('access_token');
		setModuleToken('');
	} catch (err) {
		console.log(err)
		return err;
	}
}
async function getCurrentUser() {
	/**
	 * Search the localStorage for a token
	 * 
	 * @if token is present
	 * > @return validation API result
	 * @else 
	 * > @return null
	 * 
	 */
	try {
		const localToken = Local.exists('access_token');
		if (!!localToken) {
			/**
			 * @if validation passed
			 * > @return result
			 * @else
			 * > @return flag to prompt login with email
			 */
			// console.log(localToken)
			const validation = await Auth.get_validateUserToken(localToken);
			if (typeof validation === 'object' && validation.complete) {
				setModuleToken(localToken);
			}
			return validation;
		}
		return false;
	} catch (err) {
		console.log(err)
		return false;
	}
}
async function authenticateUser({email, password}) {
	try {
		const authResult = (
			await Auth.post_authenticateCredentials({ email, password })
		);
		if (typeof authResult === 'string') {
			throw utils.err(authResult);
		} else if (authResult instanceof Error) {
			throw authResult;
		} else {
			if (!!authResult.token) {
				setLocalToken(authResult.token);
				_token.access = authResult.token;
				if (authResult.theme) {
					// set the local client theme
				};
				if (authResult.username) {
					// pass the username to client
				};
			} else {
				throw utils.err('An unknown error occured during validation. Please try again.');
			};
		};
		return true;
	} catch (err) {
		console.log(err)
		if (err.__internal__) {
			return err;
		};
		return utils.err('An unknown error occured.');
	}
}
async function registerNewUser({email, password}) {
	console.log("ActionsHandler registerNewUser")
	const registerResult = (
		await Auth.post_registerNewUser({ email, password })
	);
	return registerResult
}
async function logoutCurrentUser() {
	/**
	 * Remove token from local storage
	 * Pass that token to a blacklist
	 */
	removeLocalToken();
	return true;
}
/*#endregion*/

/*#region -- User actions */
// _self.user = {};
function getLocalTheme() {
	const localTheme = Local.exists('theme');
	if (!!localTheme && localTheme.length > 1) {
		return localTheme;
	};
	return 'light';
}
async function changeTheme(theme='') {
	Local.add('theme', theme);
	if (!!_token) {
		// const userAccount = Local.exists('account');
		// await User.put_UserAccount(userAccount._uid,theme);
	};
}
async function getUserAccount(userId='') {
	console.log("ActionsHandler getUserAccount");
	// 619682a77971a578cf65bf80
	return null
	// const user = 
	// 	await fetch(`/api/users/${userId}`)
	// 		.then( res=> res.json() )
	// 		.catch(err=> console.log(err))
	// return user
}
/*#endregion*/

/*#region -- Note actions */
// _self.note = {};
function getLocalNotes() {
	try {
		const localNotes = NoteActions.allLocal;
		return localNotes
	} catch (err) {
		console.log(err)
	}
}
async function syncAllNotes() {
	console.log("ActionsHandler syncNotes");
	//
}
async function addNote(note: GNote.IFulfilledNoteContent) {
	// console.log('ActionsHandler addNote')
    /**
	 * @function addNote
	 * - Adds a new note to the local storage, as well as remote backup
	 * - - local note is appended with its note UUID for easy getting
	 * 
	 * @param note
	 * -- @include _nid <String>
	 * -- @include title <String>
	 * -- @include priorty <Number>
	 * -- @include date_due <String || Date>
	 * 
	 * @returns <Boolean> || <Error>
	 * 
	 */
    try {
		let ChangedNote = ContentFormatting.NoteForStorage(note),
			NoteToAdd = (
				!!_token ? JSON.parse(JSON.stringify(ChangedNote)) : null
			);
		Local.Notes.addNew(
			`note_${note._nid}`, ChangedNote
		);
		if (!!_token.access) {
			await Notes.post_NewNote(NoteToAdd)
		};
		return ChangedNote;
    } catch (err) {
        console.log(err);
        return err;
    };
}
async function updateNote(note={}) {
	// console.log("ActionsHandler updateNote");
	/**
	 * @param noteId <String>
	 * -- noteId specific to local storage
	 * @param noteProps <Object>
	 * -- Object with fields to update note with
	 * -- Only need to include what is being updated
	 * @returns Boolean || err
	 */
	try {
		const UpdatedNote = (
			new ContentFormatting.NoteForStorage(note)
		);
		Local.Notes.update(UpdatedNote._nid, UpdatedNote);
		if (!!_token.access) {
			// const NoteToUpdate = {
			// 	_uid: _token,
			// 	_nid: noteId,
			// 	...noteProps
			// };
			// await Notes.put_NewNote(NoteToUpdate);
		};
		return UpdatedNote;
	} catch (err) {
		console.log(err)
		return err;
	}
}
async function removeNote(noteId='') {
	// console.log("ActionsHandler removeNote");
	/**
	 * @param noteId
	 * -- The local note ID of note to be removed
	 * @returns Boolean || Error
	 */
	try {
		Local.Notes.remove(noteId);
		if (!!_token.access) {
			await Notes.delete_RemoveNote(noteId);
		};
	} catch (err) {
		console.log(err)
		return err;
	}
}
/*#endregion*/

export {
	getLocalTheme,
	changeTheme,
	getCurrentUser,
	authenticateUser,
	registerNewUser,
	logoutCurrentUser,
	getUserAccount,
    addNote,
	updateNote,
	syncAllNotes,
	removeNote,
	getLocalNotes
}
