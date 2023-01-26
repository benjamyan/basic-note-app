import { useRef } from 'react';
import { randomStr } from '../../utils';

export class DefaultNote implements GNote.IDefaultWorkingNote {
	/**
	 * A baseline note constructor for most of our use cases
	 * Covers anything that is NOT a new note
	 * 
	 * @param key  React key
	 * @param view
	 * The current view of the Note. These can be...
	 * VIEW: Standard view
	 * EDIT: Editing view, displays fields where user can change values
	 * @param content
	 * User set content fields. Title, date_due, completed, etc.
	*/
	key: string;
	view: string;
	content: GNote.IFulfilledNoteContent;
	constructor(view: string, props: GNote.IStdNoteContent) {
		this.key = randomStr();
		this.view = view.toUpperCase();
		this.content = { ...props };
	}
}
// export class NewNoteItem implements GNote.INewWorkingNoteItem {
// 	key: string;
// 	view: string;
// 	content: GNote.INewNoteContent;
// 	constructor() {
// 		this.key = randomStr();
// 		this.view = 'EDIT';
// 		this.content = {
// 			_nid: randomStr()
// 		};
// 	}
// }
export class TodoNoteItem extends DefaultNote implements GNote.IWorkingTodoNote {
	/**
	 * @refactor
	 * - The usage of ref and #_fields is redundant... maybe I'm missing someting?
	 * - Using private fields here isn't necessary
	 * - Having action,type, and view all do differnet things but end up
	 *   in the same place is superfluous
	 */
	_nid: string;
	constructor(noteView: string, noteProps: GNote.IFulfilledNoteContent) {
		/**
		 * @param _nid <String>
		 * The individual notes identifying ID
		 * Used for localStorage aggregation, updating, etc. 
		 * @param fields <Object || null>
		 * @param action <String || null>
 		 * @method type <String>
		 * A way of deliniating the overall type of a note
		 * NEW: A new note
		 * UPDATE: An existing note that is being edited
		 * HISTORY: A note that has been 'completed'
		 * STANDARD: An existing note that meets none of the above params
		 * @method refs <Object || null>
		 * -- @if @view is EDIT
		 * -- > Passes back createRef values, for use in fields needing to be watched
		 * -- > These fields then pass back the refs, and allow us to reference those 
		 * -- > fields to store their values when user accepts changes/additions
		 * -- @else null
		 * @method fieldRefs
		 */
		super(noteView, noteProps);
		this._nid = noteProps._nid;
	}
	// fulfillNote() {
	// 	if (this.view === 'EDIT' && !!this.refs) {
	// 		return {
	// 			_nid: this.content._nid,
	// 			title: this.refs.title.current.value as string,
	// 			priority: this.refs.priority.current.value,
	// 			date_due: this.refs.date_due.current.dataset.value,
	// 			completed: (
	// 				!!this.content.completed ? this.content.completed : 0
	// 			),
	// 			order: (
	// 				!!this.content.order ? this.content.order : undefined
	// 			)
	// 		}
	// 	}
	// 	return null
	// }
	get type() {
		const { title, completed } = this.content;
		switch (this.view) {
			case 'EDIT': {
				if (title === undefined) {
					return 'NEW';
				};
				return 'UPDATE';
			}
			case 'VIEW': {
				if (completed !== undefined && completed !== 0) {
					return 'HISTORY';
				};
				return 'STANDARD';
			}
			default: return null;
		}
	}
	get refs() {
		// if (this.view === 'EDIT') {
			return {
				title: useRef(),
				priority: useRef(),
				date_due: useRef()
			};
		// } else return null;
	}
	get action() {
		if (this.view === 'EDIT') {
			return this.action;
		} else {
			if (!!this.action) {
				delete this.action
			}
			return undefined;
		};
	}
	set action(type: string) {
		if (typeof type === 'string') {
			this.action = type;
		} else {
			console.warn('Action passed to TodoNoteItem was not valid:');
			console.warn(type)
		};
	}
	// get fields() {
	// 	// if (this.view === 'EDIT') {
	// 		return {
	// 			title: this.refs.title.current,
	// 			priority: this.refs.priority.current,
	// 			date_due: this.refs.date_due.current.dataset
	// 		};
	// 	// } else {
	// 	// 	if (!!this.fields) {
	// 	// 		delete this.fields;
	// 	// 	}
	// 	// 	return undefined;
	// 	// }
	// }
	// set fields(ref: GNote.WorkingNoteFieldRefs) {
	// 	if (typeof ref === 'object') {
	// 		const _refFields = {};
	// 		for (const field in ref) {
	// 			_refFields[field] = ref[field];
	// 		}
	// 		this.fields = { ..._refFields } as GNote.WorkingNoteFieldRefs;
	// 	} else {
	// 		console.warn('Fields value passed to TodoNoteList is not valid:');
	// 		console.warn(ref)
	// 	};
	// }
}
