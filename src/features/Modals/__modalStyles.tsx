import styled from 'styled-components';
// import { SimpleButton } from '../../components';

/*#region -- General */
// const CloseButton = styled(SimpleButton)`
//     width: 100%;
//     padding: 15px 25px 0 0;
//     text-align: right;
//     font-family: Helvetica, sans-serif;
//     font-size: 26px;
//     color: #fff;
// `;
// export {
//     CloseButton
// }
/*#endregion*/


/*#region -- UserAuth */
const LoginContainer = styled.div`
    position: relative;
    width: 90%;
    height: auto;
    min-height: 400px;
    padding: 50px 50px 75px 50px;
    margin: 25px auto;
    background-color: var(--content-bg-color);
    h3 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 25px;
    }
`;
const InformationArea = styled.div`
    width: 100%;
    height: auto;
    margin-top: 10px;
`;
const SubmissionError = styled.div`
    width: 100%;
    min-height: 56px;
    margin: 25px auto 0 auto;
    p {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        line-height: 17px;
        padding: 10px 25px;
    }
    ${({hasError})=> hasError && `
        border: 1px solid red;
    `}
`;
export {
    LoginContainer,
    InformationArea,
    SubmissionError
}
/*#endregion*/
