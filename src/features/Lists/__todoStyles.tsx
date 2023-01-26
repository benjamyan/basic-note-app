import styled from 'styled-components';

/*#region -- TodoNoteLists */
export const StdNoteList = styled.ul`
	list-style-type: none;
	width: 100%;
    margin: 0;
`;
export const NoteHistory = styled.details`
	text-align: left;
	margin-top: 50px;
	${({isDisabled}: {isDisabled: boolean})=> isDisabled && `
		opacity: 0.5;
		pointer-events: none;
		cursor: inherit;
		// text-decoration: line-through;
	`}
	summary {
		margin-bottom: 25px;
		cursor: pointer;
	}
	ul {
		opacity: 0.7;
	}
`;
/*#endregion*/

/*#region -- NoteListItem */
const StyledListItem = styled.li`
	position: relative;
	cursor: pointer;
	${ ({ viewType, noteType })=> (
		(viewType === 'EDIT' || noteType === 'HISTORY') && `
			cursor: auto;
		`)
	}
	* {
		vertical-align: top;
		display: inline-block;
	}
	h4 {
		line-height: 1.35;
	}
	&.disabled {
		opacity: 0.5;
		cursor: initial;
		pointer-events: none;
	}
`;
const NoteContentBlock = styled.div`
	width: calc(100% - 10px);
	height: auto;
	min-height: 75px;
	display: flex;
	flex-direction: column;
	text-align: left;
	margin: 0 0 25px auto;
	padding: 10px;
	border-radius: 8px;
	background-color: var(--li-bg-color);
`;
export {
	StyledListItem,
	NoteContentBlock
}
/*#endregion*/
