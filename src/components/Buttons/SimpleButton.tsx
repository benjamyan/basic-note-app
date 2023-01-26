import React from 'react';
import styled from 'styled-components';

const SimpleButton = ({ style={}, className='', ...btnProps }): JSX.Element => {
	const { 
		btnOnClick = ()=>{}, 
		btnRef=null,
		btnText = '', 
		btnName = '', 
		btnType = '',
		btnStyle='',
		btnDisabled = false
	} = btnProps;
	const buttonHtmlAttributes = function() {
		let htmlAttrs = {};
		if (!btnName) {
			if (btnText.indexOf(' ') > -1) {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
				htmlAttrs.name = btnText.split(' ').join('-').toLowerCase();
			} else {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
				htmlAttrs.name = btnText.toLowerCase();
			};
		};
		if (btnDisabled) {
// @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{}'.
			htmlAttrs.disabled = true
		};
		return htmlAttrs
	}();

	return (
		<button
			{ ...buttonHtmlAttributes }
			style={ style }
			className={className}
			children={btnText}
			type={btnType}
			name={btnName}
			// btnStyle={ btnStyle }
			ref={btnRef}
			onClick={btnOnClick.bind(this)}
		/>
	)
};

export const Std = styled(SimpleButton)`
	margin: 0;
	padding: 0;
	text-align: center;
	border: none;
	cursor: pointer;
	${ ({ btnStyle }) => !btnStyle && `
		width: 100%;
		height: 50px;
	`}
	${ ({btnStyle})=> btnStyle === 'naked' && `
		width: auto;
		height: unset;
		padding: 15px 0;
		background-color: transparent;
	`}
	&[disabled] {
		opacity: 0.75;
		cursor: inherit;
		pointer-events: none;
	}
`;
export const Reset = styled(SimpleButton)`
    width: 100%;
    padding: 0;
    margin: 5px 0 10px 0;
    display: block;
    text-align: left;
`;
export const Close = styled(SimpleButton)`
    width: 100%;
    padding: 15px 25px 0 0;
    text-align: right;
    font-family: Helvetica, sans-serif;
    font-size: 26px;
    color: #fff;
	border: none;
	background: transparent;
`;
