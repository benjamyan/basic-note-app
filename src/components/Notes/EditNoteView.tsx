import * as React from 'react';
import { useNoteContext } from '../../providers';
import DatePickerJunior from '../Fields/DatePicker';
import PrioritySelection from '../Fields/PrioritySelection';
// import { useNoteContexx } from '../../providers';
import { NoteEditField } from './__noteStyles';

const EditNoteItem = ({ noteItem }: any)=> {
	const { focusedNote } = useNoteContext().noteContext;
	const _hasNoteFields = focusedNote !== 'NEW' && !!noteItem
	const _refs = {
		title: React.useRef(undefined),
		priority: React.useRef(undefined),
		dueDate: React.useRef(undefined)
	};

	return (
		<div>
			<NoteEditField
				required
				spellcheck="true"
				type="text"
				title="This field is required"
				ref={ _refs.title }
				defaultValue={ _hasNoteFields ? noteItem.title : null }
				placeholder={ _hasNoteFields ? "Note title..." : null }
			/>
			<PrioritySelection 
				ref={ _refs.priority } 
				value={ _hasNoteFields ? noteItem.priority : '' }
			/>
			<DatePickerJunior 
				ref={ _refs.dueDate } 
				value={ _hasNoteFields ? noteItem.priority : '' }
			/>
		</div>
	);
}
export default EditNoteItem
