import styled from 'styled-components';
import { SimpleButton } from '../../components';

/*#region -- Authentication*/
const FormContainer = styled.form`
    width: 100%;
    height: auto;
`;
const AwaitingResponse = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0 auto; 
    text-align: center;
    opacity: 0.5;
    background-color: var(--content-bg-color);
`;
const BasicLabel = styled.label`
    width: 100%;
    ${({labelWidth})=> labelWidth === 'half' && `
        width: 45%;
        margin-right: 15px;
        display: inline-block;
    `}
    p {
        margin-bottom: 5px;
    }
    *:last-child {
        margin-bottom: 15px;
    }
`;
const BasicInput = styled.input`
    width: 100%;
    height: 30px;
    padding: 5px 10px;
    border: none;
    &[disabled] {
        opacity: 0.75;
    }
`;
const SubmitButton = styled(SimpleButton.Std)`
    margin-top: 25px;
`;
export {
    FormContainer,
    AwaitingResponse,
    BasicLabel,
    BasicInput,
    SubmitButton
}
/*#endregion*/
