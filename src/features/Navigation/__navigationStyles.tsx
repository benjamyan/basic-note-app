import styled from 'styled-components';
import { SimpleButton } from '../../components';

/*#region -- Header navigation */
export const StyledHeader = styled.header`
	width: 100%;
	height: 90px;
	min-height: 75px;
	max-height: 75px;
	// display: flex;
	// flex-direction: row;
	border-bottom: 2px solid var(--body-bg-color);
	> * {
		vertical-align: middle;
	}
`;
export const InfoBanner = styled.div`
    width: 100%;
    padding: 5px;
	margin: 0 0 10px 0;
    border: 2px solid var(--nav-bg-color);
    border-bottom: none;
	background-color: var(--body-bg-color);
    p {
		font-family: sans-serif;
        font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.5px;
        text-align: center;
    }
`;
export const HeaderNav = styled.nav`
	width: calc(100% - 150px);
    display: inline-block;
    text-align: left;
	padding: 0px 50px 0px 25px;
    margin: 0 !important;
	> * {
		width: auto;
        font-size: 13px;
		padding: 0 20px;
		margin: 0;
		display: inline-block;
		cursor: pointer;
        &:first-of-type {
            padding-left: 0;
        }
	}
`;
export const ChangeThemeButton = styled(SimpleButton.Std)`
	width: 125px;
	height: 30px;
	border-radius: 3px;
	font-size: 11px;
	background-color: var(--li-bg-color);
`;
/*#endregion*/

/*#region -- Client action navigation */
export const ButtonContainer = styled.nav`
	&& {
		width: 100%;
		height: 75px;
		display: block;
		text-align: center;
		padding: 0;
		line-height: 67.5px;
	}
`;
export const AddNoteButton = styled(SimpleButton.Std)`
	width: 90%;
    height: 45px;
	font-weight: 500;
	border-radius: 5px;
	${ ({btnActive})=> btnActive && `
		background-color: var(--li-bg-color);
	`}
`;
/*#endregion*/

/*#region -- NoteActions */
export const NoteSelectionWrapper = styled.nav`
	position: absolute;
	width: 15px;
	height: 100%;
	top: 0;
	left: -20px;
	padding-top: 5px;
`;
export const SelectionItem = styled.div`
	position: relative;
	content: ' ';
	display: block;
	width: 100%;
	height: 15px;
	margin-bottom: 7.5px;
	cursor: pointer;
`;
export const CheckboxSelect = styled(SelectionItem)`
	// top: 10px;
	background: yellow;
`;
export const MoveSelect = styled(SelectionItem)`
	// top: unset;
	// bottom: 10px;
	background: green;
	cursor: n-resize;
`;
export const DeleteSelect = styled(SelectionItem)`
	background: red;
`;
/*#endregion*/

