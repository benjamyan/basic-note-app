import styled from 'styled-components';

/*#region -- DatePicker*/
const PickerContainer = styled.div`
	width: 50%;
	float: right;
	> * {
		width: 100%;
		overflow: hidden;
	}
`;
const PickerIcon = styled.span`
	content: ' ';
	width: 15px;
	height: 15px;
	margin: 5px 5px 0 0;
	display: inline-block;
	background-image: ${(props)=>props.icon ? props.icon : ''};
	background-repeat: no-repeat;
	background-size: contain;
`;
const DateContainer = styled.div`
	> div {
		width: calc(100% - 25px);
		min-height: 25px;
		> div {
			vertical-align: middle;
		}
	}
`;
const DateIcon = styled(PickerIcon)`
	background-color: blue;
`;
const TimeIcon = styled(PickerIcon)`
	background-color: green;
`;
export {
    PickerContainer,
    DateContainer,
	DateIcon,
	TimeIcon
};
/*#endregion*/

/*#region -- PrioritySelection*/
const SelectContainer = styled.div`
	width: 45%;
	display: inline-block;
	label {
		font-size: 12px;
		margin: 10px 0 6px;
	}
	select {
		width: 90%;
		height: 20px;
		padding: 2px 4px;
		border: none;
		border-radius: 2px;
	}
`;
export {
    SelectContainer
};
/*#endregion*/
