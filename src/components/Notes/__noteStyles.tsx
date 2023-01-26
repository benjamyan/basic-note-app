import styled from 'styled-components';
import { IFulfilledNoteContent } from '../../types';

/*#region -- NoteStdView */
const NoteTitle = styled.h4`
	width: 100%;
	margin: 0 0 15px 0;
`;
const NoteMetaWrapper = styled.div`
	width: 100%;
	margin-top: auto;
`;
const NotePriority = styled.i`
	width: 40px;
	height: 20px;
	border-radius: 5px;
	text-align: center;
	font-size: 10px;
	line-height: 20px;
	color: var(--text-color);
	background-color: var(--content-bg-color);
`;
// const NotePriority = styled.i`
// 	width: 40px;
// 	height: 20px;
// 	border-radius: 5px;
// 	text-align: center;
// 	font-size: 10px;
// 	line-height: 20px;
// 	color: var(--text-color);
// 	background-color: var(--content-bg-color);
// 	${({noteLvl}: {noteLvl: IFulfilledNoteContent['priority']})=> noteLvl === 'high' && `
// 		color: red;
// 	`}
// `;
const NoteDueDate = styled.p`
	float: right;
	margin: 0;
	font-size: 12px;
	line-height: 20px;
`;
export {
	NoteTitle,
	NoteMetaWrapper,
	NotePriority,
	NoteDueDate
}
/*#endregion*/

/*#region -- NoteEditView */
const NoteEditField = styled.textarea<{ref:React.MutableRefObject<HTMLTextAreaElement>}>`
	width: 100%;
    height: 50px;
	padding: 8px 0 0 7px;
	margin: 0 0 15px;
	resize: none;
	font-size: 12px;
`;
export {
	NoteEditField
}
/*#endregion*/
