/*eslint-disable no-unused-vars*/
import React, { useEffect, useRef, Ref  } from 'react';
import validator from 'validator';
// import { /*ActionsHandler,*/ content, utils } from '../../catalog';
import content from '../../config/textContent';
import * as utils from '../../utils';
import { SimpleButton } from '../../components';
import {
    FormContainer,
    BasicLabel,
    BasicInput,
    SubmitButton
} from './__formStyles';

interface GivenFormProps {
    submitStatus: boolean,
    setSubmitStatus?: Function,
    formType?: string,
    setFormType?: Function,
    formError?: string,
    setFormError?: Function
};
interface CustomFormSubmissionEvent {
    target: {
        elements: {
            email: HTMLInputElement,
            password: HTMLInputElement
        }
    },
    preventDefault: Function
};

let formSubmissionHandler = async (
        event: CustomFormSubmissionEvent, 
        formProps: GivenFormProps
    ): Promise<void> => null;
formSubmissionHandler = async (event, formProps)=> {
    event.preventDefault();
    const {
        formType, 
        setFormType, 
        setSubmitStatus, 
        setFormError
    } = formProps;
    setSubmitStatus(true);
    try {
        const { email, password } = event.target.elements;
        if (!validator.isEmail(email.value)) {
            throw utils.err('Invalid email.');
        } else {
            const submissionAction = function() {
                /**
                switch (formType) {
                    case 'REGISTER':
                        return ActionsHandler.registerNewUser;
                    // case 'RESET': 
                    //     return ActionsHandler.resetCredentials;
                    default: // login
                        return ActionsHandler.authenticateUser;
                }
                */
                
            }();
            const submissionData = null;
            // const submissionData = (
            //     await submissionAction({
            //         email: email.value,
            //         password: password.value
            //     })
            // );
            console.log(submissionData)
            if (submissionData instanceof Error) {
                throw submissionData;
            };
            setSubmitStatus(false);
            setFormType('SUCCESS');
        };
    } catch (err) {
        console.log(err)
        const genericMessage: string = 'An unknown error occured. Try again.';
        setSubmitStatus(false);
        if (err.__internal__) {
            setFormError(err.message || genericMessage);
        } else {
            setFormError(genericMessage);
        };
    };
    return;
};

const RegistrationFields = ({ submitStatus }: GivenFormProps): JSX.Element=> {
    return (
        <>
            <BasicLabel>
                <p>Email</p>
                <BasicInput 
                    required
                    type="text" 
                    name="email" 
                    disabled={ submitStatus }
                    title='Invalid email address'
                    // pattern={content.regexp.email.str} 
                />
            </BasicLabel>
            <BasicLabel>
                <p>Password</p>
                <BasicInput 
                    type="password" 
                    name="password"
                    disabled={ submitStatus }
                    title='Invalid special characters'
                    // pattern={content.regexp.password.str}
                />
            </BasicLabel>
            <BasicLabel>
                <p>Confirm password</p>
                <BasicInput 
                    type="password" 
                    disabled={ submitStatus }
                    title='Invalid special characters'
                    // pattern={content.regexp.password.str}
                />
            </BasicLabel>
        </>
    );
}
const LoginFields = ({ submitStatus, setFormType }: GivenFormProps ): JSX.Element=> {
    return (
        <>
            <BasicLabel>
                <p>Email</p>
                <BasicInput 
                    required 
                    type="text" 
                    name='email' 
                    autocomplete='off'
                    disabled={ submitStatus }
                    title='Invalid email address'
                    pattern={content.regexp.email.str} 
                />
            </BasicLabel>
            <BasicLabel>
                <p>Password</p>
                <BasicInput 
                    required 
                    type='password' 
                    name='password' 
                    autocomplete='off'
                    disabled={ submitStatus } 
                    title='Invalid special characters'
                    // pattern={content.regexp.password.str}
                />
                <SimpleButton.Reset 
                    btnStyle={'naked'}
                    btnText={'Forgot your password?'}
                    btnDisabled={ submitStatus }
                    btnOnClick={setFormType.bind(null, 'RESET')}
                />
            </BasicLabel>
        </>
    );
}
const ResetCredentialFields = ({ submitStatus }): JSX.Element=> {
    /**
     * Should send request to API, which then forwards SMTP 
     */
    return (
        <>
            <BasicLabel>
                <p>Email</p>
                <BasicInput 
                    required 
                    type="text" 
                    name='email' 
                    autocomplete='off'
                    disabled={ submitStatus }
                    title='Invalid email address'
                    pattern={content.regexp.email.str} 
                />
            </BasicLabel>
        </>
    )
}

const AuthenticationForm = ({...formProps}: GivenFormProps): JSX.Element=> {
    const { formType, submitStatus } = formProps;
    const _defaultFieldProps: GivenFormProps = {
        submitStatus,
        setFormType: formProps.setFormType
    };
    const formRef: Ref<HTMLFormElement> = useRef();
    const submitRef: Ref<HTMLFormElement> = useRef();
    useEffect( (): void=> {
        [
            formRef.current.querySelectorAll('input'),
            formRef.current.querySelectorAll('select'),
            formRef.current.querySelectorAll('textarea')
        ]
        .map( (child: NodeList)=> Array.from(child) )
        .flat()
        .concat()
        .forEach( (formChild)=> {
            formChild.addEventListener(
                'keydown', 
                (event: KeyboardEvent): void => {
                    if (event.code?.toLowerCase() === 'enter') {
                        event.preventDefault();
                        submitRef.current.click();
                    }
                }
            );
        });
    }, []);
    return (
        <FormContainer 
            ref={ formRef }
            onSubmit={
                (event: CustomFormSubmissionEvent)=> formSubmissionHandler(event,  formProps) 
            }>
                { formType === 'REGISTER' &&
                    <RegistrationFields { ..._defaultFieldProps } />
                }
                { formType === 'LOGIN' &&
                    <LoginFields { ..._defaultFieldProps } />
                }
                { formType === 'RESET' &&
                    <ResetCredentialFields { ..._defaultFieldProps } />
                }
                <SubmitButton 
                    btnType="submit" 
                    btnText={'Submit'}
                    btnRef={ submitRef }
                    btnDisabled={submitStatus}
                />
        </FormContainer>
    );
}
export default AuthenticationForm;
