import * as React from 'react';
import { ClientContextProviderValue, ClientContextState } from './types';



const ClientActionContext: React.Context<ClientContextProviderValue> = React.createContext<ClientContextProviderValue>(null!);


// export type ClientProvider = (
//     ({children, notes}: { 
//         children: React.ReactChildren | JSX.Element | JSX.Element[]; 
//         notes: Array<GNote.IFulfilledNoteContent>;
//     })=> React.ChildContextProvider
// )

const ClientProvider = ({ children }: { children: React.ReactChildren | JSX.Element | JSX.Element[] })=> {
    const [ client, setClient ] = React.useState<ClientContextState>({
        action: null,
        theme: 'LIGHT'
    });

    // const dispatchClientUpdate = <T extends keyof ClientContextState>(clientState: T, newValue: ClientContextState[T])=> {
    const dispatchClientUpdate: ClientContextProviderValue['updateClient'] = (clientState, newValue)=> {
        try {
            setClient({
                ...client,
                [clientState]: newValue
            })
        } catch (err) {
            console.error(`Unhandled case when updating client state: ${JSON.stringify(clientState)}`)
            return
        }
    }
    
    return (
        <ClientActionContext.Provider value={{
            /** Watch individual stateful values here; dont watch the whole object. */
            client,
            updateClient: dispatchClientUpdate
        }}>
            { children }
        </ClientActionContext.Provider>
    );
}

/** The current context of the application relevant to notes
 * @null {Null} No current action
 * @LOADING {String} The client is in the loading state
 * @AUTH {String} Client is authenticating/awaiting auth
 * @NOTE {String} Note adding/editing is in progress
 */
const useClientContext = ()=> {
    const clientAction = React.useContext(ClientActionContext);
    return clientAction
}

export {
    ClientProvider,
    useClientContext
}
export type {
    ClientContextState
}
