import React, { useState, useEffect } from 'react';
import content from '../../config/textContent';
import { SimpleButton } from '../../components';
import AuthenticationForm from '../Forms/Authentication';
import {
    LoginContainer,
    InformationArea,
    SubmissionError
} from './__modalStyles';

const TitleMessage = ({formType})=> {
    const {
        login, register, reset
    } = content.views.auth;
    let message;
    switch (formType) {
        case 'LOGIN':
            message = login;
            break;
        case 'REGISTER': 
            message = register;
            break;
        case 'RESET':
            message = reset;
            break;
        default:
            message = 'Uh oh...';
    };
    return (
        <h3>{ message }</h3>
    );
};
const ReferenceButtons = ({ submitStatus, formType, setFormType })=> {
    const _defaults = {
        btnDisabled: submitStatus,
        btnStyle: 'naked'
    };
    switch (formType) {
        case 'LOGIN':
            return (
                <>
                    <SimpleButton.Reset 
                        { ..._defaults }
                        btnText={'Dont have an account?'}
                        btnOnClick={setFormType.bind(null, 'REGISTER')}
                    />
                </>
            );
        case 'REGISTER':
            return (
                <SimpleButton.Reset  
                    { ..._defaults }
                    btnText={'Already have an account?'}
                    btnOnClick={setFormType.bind(null, 'LOGIN')}
                />
            );
        case 'RESET':
            return (
                <SimpleButton.Reset 
                    { ..._defaults }
                    btnText={'<- Go back'}
                    btnOnClick={setFormType.bind(null, 'LOGIN')}
                />
            );
        default:
            return (
                <>An unknown error occured...</>
            );
    }
};

const UserAuthentication = ({setModal, setUser})=> {
    const [formType, setFormType] = useState('LOGIN');
    const [formError, setFormError] = useState('');
    const [submitStatus, setSubmitStatus] = useState(false);
    const _authDefaults = {
        formType,
        setFormType,
        submitStatus,
        setSubmitStatus,
        setFormError
    };

    /*eslint-disable react-hooks/exhaustive-deps*/
    useEffect(()=> {
        if (formType === 'SUCCESS') {
            setUser({
                refresh: true
            });
            setModal('');
        }
    }, [formType]);
    /*eslint-enable react-hooks/exhaustive-deps*/

    return (
        <LoginContainer>
            <TitleMessage formType={formType} />
            <AuthenticationForm { ..._authDefaults } />
            <InformationArea>
                <ReferenceButtons 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ style: { textAlign: string; }; submitStatu... Remove this comment to see the full error message
                    style={{ textAlign:'center' }}
                    submitStatus={submitStatus}
                    formType={ formType }
                    setFormType={ setFormType } 
                />
                <SubmissionError 
                    hasError={formError.length > 0 ? true : false}
                >
                    <p>{ formError }</p>
                </SubmissionError>
            </InformationArea>
        </LoginContainer>
    );
};
export default UserAuthentication
