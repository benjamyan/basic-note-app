/// <reference path="./.d.ts" />

import React from 'react';
import ReactDOM from 'react-dom';
import App from './view/App';

export interface InitialContentProps {
	user: {
		[key: string]: string | number | any;
	};
	notes: Array<GNote.IStdNoteContent>;
	theme: 'dark' | 'light';
}

(async function init() {
	try {
		// const userAccount = await ActionsHandler.getCurrentUser();
		// const current: InitialContent = {
		// 	user: (
		// 		typeof userAccount === 'object' ? userAccount : {}
		// 	),
		// 	notes: ActionsHandler.getLocalNotes(),
		// 	theme: ActionsHandler.getLocalTheme()
		// };
		const userAccount = {};
		const current: InitialContentProps = {
			user: (
				typeof userAccount === 'object' ? userAccount : {}
			),
			notes: [],
			// notes: services.getLocalNotes(),
			theme: 'dark'
		};
		ReactDOM.render(
			<App { ...current } />,
			document.getElementById('root')
		);
	} catch (err) {
		console.error(err);
	};
})();

/**
 * @urgent
 * Setup auth and register
 * -- Validate all fields before and during API/server calls
 * -- Dont worry about capturing emails right now - just work on tokenization
 * -- Nice to have:
 * -- -- Email registration should send an email to user
 * -- -- Password reset? Can only validate via email...
 * Check for security flaws 
 * -- Input validation
 * -- API/user access
 * Setup subdomain to host app
 * 
 * @todo
 * Some sort of loader/indicator that a remote service is running
 * -- Further; some sort of concurrency handling needs to be setup
 * Review for bugs
 * -- Anything catastrophic needs to be addressed
 * Setup note ordering/reordering
 * -- Have notes reflect original ordering via order added
 * -- Drag-and-drop reordering if possible
 * Make the client application pretty
 * -- Background images, simple style changes
 * Move 'LocalService' functionality into 'ActionsHandler'
 * -- @file App.js 
 * -- -- @function getUserAccount throughout
 * -- -- @function useEffect line 85
 * 
 * @backburner
 * Add in tagging abilities
 * -- Working, personal, chores, etc.
 * Fix date on notes to accomodate:
 * -- Past due items
 * -- Dont show time/eod notice on notes not due same-day
 * Note sorting
 * -- Sort by: priority, due date, user-defined order (drag and drop)
 * Background images 
 * -- Also would be nice if the user could pick their own background
 * Note mass actions
 * -- Select multiple notes to perform a single action on
 * ./services/ActionsHandler is too large
 * -- this is a general file but is spitting out tons of functions
 * -- organize the functions according to relevance
 * -- -- `_self.notes`, `_self.user`, `_self.client`
 * 
 */
