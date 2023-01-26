import * as React from 'react';
import { useNoteContext, noteUtils } from '../../providers';
// import EditNoteItem from '../../components/Notes/EditNoteView';
// import StdNoteItem from '../../components/Notes/StdNoteView';
import DatePickerJunior from '../../components/Fields/DatePicker'
import NoteActions from '../Navigation/NoteActions';
import {
	StyledListItem,
	NoteContentBlock
} from './__todoStyles';
import { NoteDueDate, NoteEditField, NoteMetaWrapper, NotePriority, NoteTitle } from '../../components/Notes/__noteStyles';
import PrioritySelection from '../../components/Fields/PrioritySelection';

type SingleListItemProps = {
	noteId: string;
	noteIsFocused: boolean;
}
export type NoteContentRefs = {
	title: React.MutableRefObject<HTMLTextAreaElement>;
	priority: React.MutableRefObject<HTMLSelectElement>;
	dueDate: React.MutableRefObject<HTMLElement>;
}

/** The rendering point for all single note components */
const SingleListItem = ({ noteId, noteIsFocused }: SingleListItemProps): JSX.Element => {
	const { noteContext, dispatchNoteContextEvent } = useNoteContext();
	
	const _refs: NoteContentRefs = {
		title: React.useRef(null!),
		priority: React.useRef(null!),
		dueDate: React.useRef(null!)
	};
	
	const noteItemInContext = noteUtils.getNoteById(noteId);
	const noteItemOnClickHandler: React.MouseEventHandler<HTMLDivElement> = (_event)=> {
		if (noteIsFocused) {
			return;
		} else if (!noteItemInContext) {
			console.error(`Note item missing from component context state: ${noteId}`);
		} else if (noteItemInContext.completed === 0) {
			dispatchNoteContextEvent({
				type: 'FOCUS',
				payload: {
					_nid: noteId
				}
			});
		}
	};
	
	React.useEffect(()=>{
		console.log(noteId)
		console.log(noteIsFocused)
	}, [])

	if (noteContext.focusedNote === null) {
		return <></>
	}
	return (
		<StyledListItem>
			<NoteActions 
				key={`NoteAction_${noteId || 'newnote'}`} 
				noteItem={ noteContext.focusedNote === 'NEW' ? 'NEW' : noteItemInContext } 
				noteIsFocused={ noteIsFocused } 
				contentRefs={ _refs }
			/>
			<NoteContentBlock onClick={ noteItemOnClickHandler }>
			{ noteIsFocused
				? (
					<div>
						<NoteEditField
							required
							spellCheck="true"
							type="text"
							title="This field is required"
							ref={ _refs.title as any }
							defaultValue={ noteItemInContext?.title || '' }
							placeholder={ "Note title..." }
						/>
						<PrioritySelection 
							ref={ _refs.priority } 
							value={ noteItemInContext?.priority || ''  }
						/>
						<DatePickerJunior 
							ref={ _refs.dueDate } 
							value={ noteItemInContext?.priority || ''  }
						/>
					</div>
				) 
				: (
					<>
						<NoteTitle>{ noteItemInContext?.title || 'missing value'  }</NoteTitle>
						<NoteMetaWrapper>
							<NotePriority /*noteLvl={ noteItemInContext.priority }*/>
								{ noteItemInContext?.priority || 'missing value' }
							</NotePriority>
							<NoteDueDate>
								{/* {formattedNote.dueDate} */}
							</NoteDueDate>
						</NoteMetaWrapper>
					</>
				)
				// ? <EditNoteItem noteItem={ noteItemInContext || null } />
				// : <StdNoteItem noteItem={ noteItemInContext } />
			}
			</NoteContentBlock>
		</StyledListItem>
	)
}
export default React.memo(
	SingleListItem, 
	(prevProps, nextProps)=> {
		if (prevProps.noteIsFocused !== nextProps.noteIsFocused ) {
			console.log('render')
			return false
		}
		console.log('dont render')
		return true
	}
)
