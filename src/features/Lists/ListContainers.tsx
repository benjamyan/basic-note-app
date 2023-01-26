import React, { useEffect, useRef }  from 'react';
import { useClientContext, useNoteContext, noteUtils } from '../../providers';
import * as utils from '../../utils';
import SingleNoteListItem from './SingleListItem';
import {
	StdNoteList, 
	NoteHistory
} from './__todoStyles';

interface ListContentParams { 
	/** An array of note _nid values */
	noteIdList: string[];
	/** Optional param to add to the className attribute */
	givenName?: string;
};

/** Incomplete function for memozid component rendering */
const shouldRenderParent = (prev: any, next: any): boolean=> {
	console.log(prev)
	console.log(next)
	return true
};

/** The logic for rendering out a `<ul>` of notes from given array of filtered notes
 * @givenName The desired name for CSS class purposes; strictly to identify in CSS
 * @notes An array of userNotesContext items passed to the function. Parent component should manage logic for handing the array over.
 */
const ListContent = ({ noteIdList=[] , givenName='valid' }: ListContentParams): any => {
	const { noteContext, dispatchNoteContextEvent } = useNoteContext();
	
	return (
		<>
			{ noteIdList.map( (noteId: string, index: number): any => (
					<SingleNoteListItem key={ `SingleNoteListItem_${noteId}_${index}` } noteId={ noteId } noteIsFocused={noteContext.focusedNote === noteId} />
				) 
			)}
		</>
	)
};

/** Memoized Component that displays the active user notes. */
export const MainNoteList = ()=> {
	const { noteContext } = useNoteContext();
	// const { clientAction } = useClientContext();

	return (
		<StdNoteList> 
			{ noteContext.focusedNote === 'NEW' &&
				<SingleNoteListItem noteIsFocused key={ `SingleNoteListItem_NEW` } noteId={ noteContext.focusedNote } /* className={ 'new_note-item' } */ />
			}
			<ListContent key={'mainoteline_active'} givenName={ 'active' } noteIdList={ noteUtils.filterByActive } />
		</StdNoteList>
	);
}

/** Memoized component for showing the users 'completed' notes */
export const HistoryNoteList = ()=> {
	const completed = noteUtils.filterByCompleted;
	const historyIsEmpty = completed.length === 0;
	const htmlDetailsRef = useRef<HTMLDetailsElement>(null);
	
	useEffect(()=> {
		/** Collapses details tag if user removes last notes */
		if (historyIsEmpty && htmlDetailsRef.current?.open) {
			htmlDetailsRef.current.open = false;
		} 
	}, [ completed ]);

	return (
		<NoteHistory ref={ htmlDetailsRef } isDisabled={ historyIsEmpty }>
			<summary>
				<span>{ historyIsEmpty ? 'History empty' : 'Note history' }</span>
				<hr style={{ width:'100%', display:'inline-block' }} />
			</summary>
			<StdNoteList>
				<ListContent 
					givenName={'completed'}
					noteIdList={ completed }
				/>
			</StdNoteList>
		</NoteHistory>
	);
}
