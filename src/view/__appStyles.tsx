import styled from 'styled-components';

/*#region - App container */
export const AppWrapper = styled.div`
    position: relative;
	width: 100%;
    max-width: 500px;
	height: 95vh;
	display: flex;
	flex-direction: column;
    margin: 2.5vh auto 0 auto;
	overflow: hidden;
`;
export const MainContainer = styled.main`
	width: 100%;
    height: calc(100vh - 75px);
    min-height: 75vh;
	display: block;
	text-align: center;
	> * {
		height: calc(100% - 50px);
		padding: 35px 50px;
		display: inline-block;
	}
`;
/*#endregion*/

/*#region -- Modal wrapper */
export const ActionModal = styled.aside`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 11;
    display: none;
    background-color: rgba(0,0,0,0.5);
    > * {
        z-index: 12;
    }
    ${({isActive})=> isActive && `
        display: block !important;
    `}
`;
/*#endregion*/

/*#region -- Todo list wrapper */
export const NoteListWrapper = styled.section`
	&& {
		position: relative;
		width: 100%;
		height: calc(100% - 75px);
		overflow: hidden scroll;
		.new_note-item {
			display: none;
		}
		&.new_note,
		&.edit_note {
			ul {
				li:not(.working),
				li:not(.working) * {
					opacity: 0.75;
					cursor: initial;
					pointer-events: none;
				}
			}
			details,
			details summary {
				pointer-events: none;
				cursor: initial;
				opacity: 0.65;
			}
		}
		&& {
			&.new_note {
				.new_note-item {
					display: block;
					opacity: initial;
					pointer-events: all;
				}
			}
		}
	}
`;
/*#endregion*/
