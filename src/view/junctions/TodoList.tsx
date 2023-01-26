import React from 'react';
import { useNoteContext, noteUtils } from '../../providers';
import { Messages } from '../../components';
import { Lists } from '../../features';
import { 
	NoteListWrapper
} from '../__appStyles';

const TodoNoteListWrapper = ()=> {
	const { focusedNote } = useNoteContext().noteContext;

	// const wrapperClass = function(): string {
	// 	if (focusedNote === 'NEW') {
	// 		return 'new_note';
	// 	} else if (focusedNote !== null) {
	// 		return 'edit_note';
	// 	}
	// 	return '';
	// }();
	
	return (
		<NoteListWrapper /*className={ wrapperClass }*/>
			{ (noteUtils.filterByActive.length === 0 && !focusedNote) &&
				<Messages.NoActiveNotes />
			}
			<Lists.Main />
			<Lists.History />
		</NoteListWrapper>
	);
}
export default TodoNoteListWrapper;

/**
 * This file is called from the main top level ../../App.js compoennt
 * Is the main entry point for our todo list component rendering and logic handling
 * Children from this point forward render out either a <ul> or a <details> tag with children
 * Most of the complex logic is handled via the global Context state
 * 
 * @see SingleNoteListItem <React.Component>
 * -- The only child with state that is decoupled from the global Context
 * -- This components state manages its view (ie. edit, standard-view, etc.)
 * 
 * @export 
 * -- @default > @function TodoNoteListWrapper
 */
/**
 * @function TodoNoteListWrapper
 * Wrapping component for the todo list
 * Takes in no props
 * Maintains its state via the global Context (useClientContext)
 * This component only re-renders to provide a new class
 * 
 * @var wrapperClass
 * Using these classes, we can disable child elements via basic CSS
 * Doing this, we avoid the need to re-render children that arent relevant to a state change
 * CSS here effects:
 * -- Individual notes
 * -- Entire lists
 * -- Events (see 'pointer-events')
 * 
 * @returns 
 * NoteListWrapper <section>
 * ^ MainNoteList - <ul> 
 * ^ HistoryNoteList - <details>
 */
