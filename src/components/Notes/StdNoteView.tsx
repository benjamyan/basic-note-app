import React from 'react';
// import * as ContentFormatting from '../../services/events/contentFormatting';
import {
	NoteTitle,
	NoteMetaWrapper,
	NotePriority,
	NoteDueDate
} from './__noteStyles';

interface FormattedNote {
	title: string,
	priority: string,
	dueDate: string
};

// const StdNoteView = ({ Note }: { Note: { content: GNote.IStdNoteContent } })=> {
const StdNoteView = ({ noteItem }: { noteItem: any/*GNote.IStdNoteContent*/ })=> {
	const formattedNote: GNote.IStdNoteContent = noteItem;
	// const NoteForView: FormattedNote = (
	// 	ContentFormatting.NoteForDisplay(Note.content)
	// );
	return (
		<>
			<NoteTitle>{ formattedNote.title }</NoteTitle>
			<NoteMetaWrapper>
				<NotePriority noteLvl={ formattedNote.priority }>
					{ formattedNote.priority }
				</NotePriority>
				<NoteDueDate>
					{/* {formattedNote.dueDate} */}
				</NoteDueDate>
			</NoteMetaWrapper>
		</>
	);
}

export default StdNoteView
